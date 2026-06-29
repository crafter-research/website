---
title: "Medir se nossa busca jurídica realmente funciona"
description: "Construímos um assistente hybrid-RAG sobre 21.000 normas jurídicas peruanas. Depois medimos, e a conclusão mudou três vezes conforme a avaliação ficou mais rigorosa."
abstract: |
  Construímos um assistente hybrid-RAG sobre 21.000 normas jurídicas peruanas. Depois medimos, e a conclusão mudou três vezes conforme a avaliação ficou mais rigorosa.

  Qualquer um monta um RAG. Poucos medem se funciona. Este é o registro de medir o nosso, e de ver a resposta mudar conforme a medição melhorava.
date: 2026-06-18
status: result
urlSlug: measuring-legal-retrieval
lang: pt
project: legalize-pe
author: railly
tags: [retrieval, evaluacion, rag, ablation, legal-nlp]
---

## O sistema

[legalize-pe](https://legalize-pe.crafter.ing) é um corpus aberto e versionado em git da legislação peruana: ~21.000 documentos markdown, nacional mais 26 jurisdições regionais. Em cima dele construímos [amicus](https://amicus.crafter.ing), um assistente de pesquisa jurídica que responde em espanhol claro e cita a norma.

Tudo neste registro é reproduzível. O corpus vive em [legalize-pe](https://github.com/crafter-research/legalize-pe) e seu motor de retrieval em [legalize-pe-engine](https://github.com/crafter-research/legalize-pe-engine). O harness de avaliação, o gold set e cada métrica abaixo saem de [amicus-eval](https://github.com/crafter-research/amicus-eval), um benchmark aberto que você pode rodar de novo. Há também um [amicus-sdk](https://github.com/crafter-research/amicus-sdk) (o CLI `@crafter/amicus` e servidor MCP) para consultar o corpus direto.

O retrieval é a parte difícil. O pipeline empilha três peças:

```
query → [expand] → [busca híbrida: FTS + embeddings, fundidos por RRF] → [rerank] → resposta
```

Reciprocal Rank Fusion é a cola. Mistura os rankings de palavra e de vetor sem olhar seus scores crus, só suas posições:

```typescript
// Reciprocal Rank Fusion: mistura duas listas ordenadas por posição, não por score.
const RRF_K = 60;

function fuse(lists: string[][], k = RRF_K): string[] {
  const scores = new Map<string, number>();

  for (const ranking of lists) {
    ranking.forEach((docId, rank) => {
      const contribution = 1 / (k + rank + 1);
      scores.set(docId, (scores.get(docId) ?? 0) + contribution);
    });
  }

  return [...scores.entries()]
    .sort(([, a], [, b]) => b - a)
    .map(([docId]) => docId);
}

const fused = fuse([ftsResults, vectorResults]);
console.log(`fused ${fused.length} candidates`);
```

- **FTS**: busca de texto completo em espanhol (por palavra).
- **embeddings**: busca semântica sobre pgvector.
- **RRF**: Reciprocal Rank Fusion, mistura os dois rankings.
- **expand**: reescreve uma consulta coloquial em termos jurídicos.
- **rerank**: um LLM reordena candidatos, preferindo a norma núcleo ao seu regulamento.

A pergunta que este registro responde: **qual dessas peças realmente carrega o resultado?**

## A armadilha da avaliação pequena

Na primeira vez que medimos, tínhamos um gold set de 19 pares consulta→norma, anotado por uma pessoa. A tabela de ablations dizia algo chamativo: o pipeline completo em produção (`best`) *não* era a melhor configuração. A busca híbrida mais expansão de consulta (`rrf+expand`, sem rerank) ganhava dele.

Isso é um bom tweet. Também acabou sendo falso.

O gold set era muito pequeno e anotado por um único juiz. Então o escalamos, e mudamos o método para nos defender do nosso próprio viés.

## Dois anotadores, às cegas

Montamos uma planilha de 50 candidatos consulta→norma em seis estratos (coloquial, técnico, multi-norma, núcleo-vs-regulamento, subnacional, fora de escopo). Depois **dois modelos a anotaram de forma independente e às cegas**, nenhum viu a resposta esperada nem a anotação do outro:

- Claude (Opus)
- Codex (gpt-5.5, raciocínio alto)

Onde coincidiam, o par virava gold automaticamente. Onde divergiam, um humano arbitrava lendo o texto da norma (não escolhendo um favorito). O acordo entre os dois anotadores é em si uma medição: de quão difícil é cada estrato.

| Estrato | Acordo entre anotadores |
|---|---:|
| técnico-jurídico | 100% |
| fora de escopo | 100% |
| coloquial | 92% |
| multi-norma | 86% |
| núcleo-vs-regulamento | 86% |
| **subnacional** | **22%** |

Esse 22% é um achado, não uma falha. Dois anotadores competentes, lendo o mesmo corpus, coincidem na norma subnacional correta só duas em nove vezes. O corpus regional é *intrinsecamente ambíguo*: muitas ordenanças tratam matérias genéricas ("declaração de interesse público"), reutilizam números entre anos e órgãos, e não têm uma única resposta correta. Medimos a ambiguidade em vez de assumi-la.

## A conclusão mudou

Aqui está a parte honesta. Rodamos a mesma ablation três vezes, sobre gold sets cada vez melhores:

| Config (MRR) | $N=19$, 1 juiz | $N=28$, 2 juízes | $N=35$, +subnacional |
|---|---:|---:|---:|
| fts (só palavras) | 0.092 | 0.090 | 0.089 |
| vec (só embeddings) | 0.495 | 0.538 | 0.511 |
| rrf (híbrido) | 0.367 | 0.400 | 0.401 |
| rrf+expand | **0.755** | 0.656 | 0.605 |
| rrf+rerank | 0.657 | 0.819 | **0.792** |
| best (pipeline completo) | 0.657 | **0.862** | 0.761 |

Leia as linhas `rrf+expand` e `best` de cima a baixo. A história se reescreveu sozinha:

- **$N=19$**: "expand é o que importa; o pipeline em produção não é ótimo".
- **$N=28$**: "não, o pipeline completo domina".
- **$N=35$**: "a peça que carrega o resultado é o **rerank**. `rrf+rerank` (0.792) leva vantagem sobre o pipeline completo `best` (0.761)".

Então a conclusão assentou no rerank, e num ponto de segunda ordem: com $N=35$, adicionar expansão de consulta em cima do rerank não ajuda. A config `rrf+rerank` sem expand pontua um pouco mais alto que `best`. Lemos esse gap (0.792 vs 0.761) como ruído dentro de um intervalo de confiança amplo, não como evidência de que expand prejudique. O claim honesto é que expand é neutro uma vez que o rerank está em jogo, não a peça que carrega o resultado como a primeira corrida fez parecer.

O achado viral dessa primeira corrida (*seu pipeline em produção não é ótimo por culpa do expand*) era um artefato de um gold pequeno, de um único anotador. Morreu ao escalar. Se tivéssemos publicado, teríamos publicado ruído.

## O que sobreviveu a cada corrida

Dois resultados aguentaram $N=19$, $N=28$ e $N=35$. Esses são os confiáveis:

1. **FTS sozinho é quase inútil com linguagem natural** (MRR ~0.09). Uma consulta em forma de pergunta completa obriga todas as palavras-chave a aparecerem ao mesmo tempo, então o recall colapsa. FTS só ganha seu lugar no estrato fora de escopo, onde se abstém corretamente com mais frequência que qualquer outra config (o estrato é pequeno, então leia isso como direção, não como taxa precisa).

2. **Embeddings sozinhos ganham do híbrido ingênuo** (vec 0.51 > rrf 0.40). Fundir um bom retriever semântico com um léxico quebrado *degrada* o resultado. RRF puro pondera cada lista por posição de rank e não tem sinal de quão confiável é cada retriever, então o ranking ruim do FTS injeta candidatos lixo no topo da lista fundida e empurra para baixo os bons hits vetoriais. Quando um retriever é muito mais fraco, a fusão sem pesos arrasta o bom junto. Este é o contraintuitivo, e é o mais robusto.

## A lição

> Afine seus baselines até doer. Ablacione até saber qual componente carrega o resultado: costuma ser um, e costuma não ser o que você adivinharia.

Rodamos o experimento três vezes. A conclusão só parou de mudar quando o baseline parou de ser ruidoso. O primeiro número parecia um resultado. Era uma medição do nosso gold set, não do nosso sistema.

## Limitações honestas

- **N=35 é pequeno.** Os intervalos de confiança são amplos. São sinais, ainda não resultados publicáveis.
- **Não há advogado na equipe.** Vigência, revogação e qual norma prevalece foram marcadas `needs_lawyer` e excluídas do conjunto firme. A arbitragem das divergências foi feita lendo texto, por não-advogados, e está marcada como tal.
- **Três consultas subnacionais foram descartadas** como não-anotáveis (matéria genérica, sem norma única correta). Esse descarte é o 22% de acordo tornado concreto.

Próximo milestone: escalar o gold além de 100, conseguir validação jurídica do conjunto `needs_lawyer`, e re-rodar. O corpus, o [harness de avaliação](https://github.com/crafter-research/amicus-eval) e o gold set são todos abertos, então você pode reproduzir esses números ou quebrá-los.
