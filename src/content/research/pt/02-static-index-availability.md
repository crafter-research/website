---
title: "A API do Estado falhou em 38% dos nossos requests"
description: "Medimos três fontes de dados do Estado peruano contra índices binários estáticos. A diferença de velocidade era esperada. A de disponibilidade não."
abstract: |
  Medimos três fontes de dados do Estado peruano contra índices binários servidos como arquivos imutáveis. A diferença de velocidade era esperada: microssegundos contra dezenas de milissegundos.

  A de disponibilidade não. Um endpoint oficial falhou em 380 de 1.000 requests enquanto a cópia estática não falhou em nenhum. Para qualquer processo que faz várias consultas seguidas, esse é o número que decide se o trabalho termina.
date: 2026-08-18
status: result
urlSlug: static-index-availability
lang: pt
project: static-index-poc
author: railly
tags: [data-infrastructure, benchmarks, government-data, agents, availability]
---

## O problema dos adaptadores

A Crafter Research mantém adaptadores de linha de comando para dados do Estado peruano: SUNAT para registros tributários, BCRP para séries macroeconômicas, JNE para candidatos eleitorais, e vários outros. Todos compartilham uma fraqueza que demoramos a nomear. Cada um é cliente de uma fonte que não controlamos, então herda todas as falhas dessa fonte e não acrescenta resiliência própria. Quando o upstream está lento, o adaptador está lento. Quando o upstream se recusa, o adaptador se recusa.

A alternativa é parar de ler a fonte no momento da consulta. Buscar uma vez de forma agendada, compilar num artefato imutável, e servir esse artefato como arquivos estáticos. As consultas então batem num arquivo, não num servidor do Estado.

Construímos três provas de conceito para descobrir se essa troca vale a pena, e quanto custa.

## O que construímos

As três implementam o mesmo formato somente-leitura: um shard binário de registros, um índice de largura fixa ordenado por chave, e um arquivo de overflow para chaves que legitimamente apontam para mais de um registro. Uma consulta faz busca binária no índice pequeno em memória, depois lê apenas os bytes que o índice aponta. Sobre HTTP isso é um range request; em disco é uma leitura posicional. O tamanho do dataset quase não afeta o custo da consulta porque o arquivo grande nunca é lido inteiro.

O layout completo está documentado em [FORMAT.md](https://github.com/crafter-research/static-index-poc/blob/main/FORMAT.md), e os pipelines e benchmarks estão em [static-index-poc](https://github.com/crafter-research/static-index-poc).

Uma decisão de design generaliza para além deste trabalho. A chave do índice é um inteiro de 32 bits derivado da chave do registro, e como você a deriva decide se o índice fica balanceado. Os documentos de identidade peruanos têm oito dígitos e são convertidos direto. Os códigos de série do BCRP são alfanuméricos, então passam por hash. Mas um prefixo da chave é quase sempre a escolha errada: quase todo RUC peruano (o identificador tributário) começa com `10` ou `20`, então dividir pelo prefixo produz dois baldes enormes em vez de muitos pequenos. Derive a chave contra a distribuição real, não contra a que parece natural.

## As medições

Mil consultas por método, abril de 2026.

| Dataset | Registros | Warm p50 | Fonte oficial p50 | Erros da fonte |
| --- | ---: | ---: | ---: | ---: |
| JNE candidatos 2026 | 9.065 | 0,05 ms | 90,32 ms | 0 / 1000 |
| BCRP séries macro | 16.945 | 0,07 ms | 28,98 ms | **380 / 1000** |

As colunas de latência são o resultado esperado e o menos interessante. Ninguém precisava de um benchmark para saber que ler um arquivo local ganha de uma viagem de ida e volta a um servidor do Estado.

A coluna de erros é o achado. O endpoint do BCRP devolveu uma resposta utilizável em 620 de 1.000 requests. Não devagar: simplesmente não devolveu. A cópia estática respondeu a todos.

Essa distinção importa mais do que parece à primeira vista. Uma mediana de 29 milissegundos parece tolerável, e se o trabalho for uma consulta só, é mesmo. Mas uma taxa de falha de 38% por request não fica em 38% ao longo de uma sequência. Dez consultas dependentes nessa taxa terminam mais ou menos uma vez a cada cem. O sistema não degrada, ele para de terminar.

## O que não conseguimos construir

A terceira prova de conceito é um resultado negativo que vale publicar.

A SUNEDU mantém o registro nacional de diplomas universitários. Sua consulta pública fica atrás de um token Cloudflare Turnstile, um bearer token, e um captcha de imagem, e o portal de dados abertos publica apenas datasets educacionais agregados, não o registro em si. Sondamos cada caminho e não recuperamos nada utilizável em massa. O formato funciona sobre um fixture sintético; não há dataset para colocar dentro dele.

A lição é sobre escopo. Uma primitiva de leitura deixa uma fonte acessível mais rápida e mais confiável. Não faz nada por uma fonte que não será lida. Engenharia de disponibilidade não substitui acesso.

## O que ainda está fraco

**Nenhum número de CDN.** Todos os valores warm acima são leitura de disco local. O argumento inteiro para esta primitiva se apoia em servir artefatos a partir de um CDN, e um range request frio contra um não foi medido. Enquanto não for, nenhuma afirmação sobre latência servida por CDN cabe aqui, incluindo a nossa.

**Benchmarks antigos.** Estas execuções são de abril de 2026 e descrevem as fontes como elas se comportavam então. As colunas de erro em particular devem se mover.

**Nenhum dataset publicado.** O índice do JNE é chaveado pelos números de documento de identidade de candidatos eleitorais. Esses registros são públicos sob a lei eleitoral peruana, mas um índice baixável e consultável por documento de identidade é um artefato diferente de um dataset publicado, e merece sua própria análise jurídica em vez de herdar a que escrevemos para [muniscan](https://github.com/crafter-research/muniscan), cujos sujeitos são municípios e não pessoas. O repositório entrega pipelines e benchmarks; qualquer um pode reconstruir o índice rodando o scrape.

**Nada roda em produção.** Estas são provas de conceito. Se o padrão sobrevive a um build noturno, a deriva da fonte, e a um artefato que ninguém está olhando é exatamente o que uma prova de conceito não pode dizer.

## O que mudou

Começamos medindo velocidade e esperávamos que a resposta fosse sobre velocidade. Ela foi sobre se a resposta chega. Argumentos de confiabilidade a favor de cache costumam ser feitos no abstrato; este tem um número junto, e o número é maior que o argumento de latência que ele substituiu.
