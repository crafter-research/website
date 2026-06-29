---
title: "衡量我们的法律检索是否真的有效"
description: "我们在 21,000 条秘鲁法律规范之上构建了一个 hybrid-RAG 助手。然后我们对它进行了衡量，随着评估越来越严格，结论改变了三次。"
abstract: |
  我们在 21,000 条秘鲁法律规范之上构建了一个 hybrid-RAG 助手。然后我们对它进行了衡量，随着评估越来越严格，结论改变了三次。

  任何人都能搭一个 RAG。很少有人衡量它是否有效。这是衡量我们系统的记录，也是看着答案随着衡量改进而变化的记录。
date: 2026-06-18
status: result
urlSlug: measuring-legal-retrieval
lang: zh
project: legalize-pe
author: railly
tags: [retrieval, evaluacion, rag, ablation, legal-nlp]
---

## 系统

[legalize-pe](https://legalize-pe.crafter.ing) 是一个开放的、用 git 版本化的秘鲁法律规范语料库：约 21,000 个 markdown 文档，包括全国以及 26 个地区辖区。在它之上我们构建了 [amicus](https://amicus.crafter.ing)，一个用通俗西班牙语回答并引用规范的法律研究助手。

本记录中的一切都可复现。语料库位于 [legalize-pe](https://github.com/crafter-research/legalize-pe)，其检索引擎位于 [legalize-pe-engine](https://github.com/crafter-research/legalize-pe-engine)。评估框架、gold set 以及下面每一项指标都来自 [amicus-eval](https://github.com/crafter-research/amicus-eval)，一个你可以自己重新运行的开放基准。还有一个 [amicus-sdk](https://github.com/crafter-research/amicus-sdk)（`@crafter/amicus` CLI 和 MCP 服务器）可以直接查询语料库。

检索是最难的部分。这个 pipeline 堆叠了三个部件：

```
query → [expand] → [混合检索：FTS + embeddings，由 RRF 融合] → [rerank] → answer
```

Reciprocal Rank Fusion 是黏合剂。它合并关键词排名和向量排名，不看它们的原始分数，只看它们的位置：

```typescript
// Reciprocal Rank Fusion：按位置而非分数合并两个排序列表。
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

- **FTS**：西班牙语全文检索（关键词匹配）。
- **embeddings**：在 pgvector 上的语义检索。
- **RRF**：Reciprocal Rank Fusion，合并两个排名。
- **expand**：把口语化查询改写成法律术语。
- **rerank**：一个 LLM 重新排序候选项，优先选择核心规范而非其细则。

本记录要回答的问题：**这些部件中哪一个真正承载了结果？**

## 小评估的陷阱

我们第一次衡量时，有一个 19 条 query→norm 配对的 gold set，由一个人标注。消融表说了一件很惊人的事：生产环境中的完整 pipeline（`best`）*并不是*最佳配置。混合检索加上查询扩展（`rrf+expand`，无 rerank）胜过它。

这是一条好推文。结果它也是错的。

gold set 太小，而且由单一评判者标注。所以我们扩大了它，并改变了方法以防范我们自己的偏见。

## 两位标注者，盲标

我们构建了一张 50 条 query→norm 候选的表，分布在六个分层（口语、技术、多规范、核心-vs-细则、地方、范围外）。然后**两个模型独立且盲标地标注它**，谁都没看到预期答案，也没看到对方的标注：

- Claude (Opus)
- Codex (gpt-5.5, 高推理)

它们一致的地方，配对自动成为 gold。它们分歧的地方，由人类通过阅读规范原文来仲裁（而不是挑一个偏好）。两位标注者之间的一致度本身就是一种衡量：衡量每个分层有多难。

| 分层 | 标注者间一致度 |
|---|---:|
| 技术-法律 | 100% |
| 范围外 | 100% |
| 口语 | 92% |
| 多规范 | 86% |
| 核心-vs-细则 | 86% |
| **地方** | **22%** |

这个 22% 是一个发现，不是一个失败。两位称职的标注者，阅读同一个语料库，在正确的地方规范上九次只一致两次。地方语料库*本质上是模糊的*：许多条例处理通用事项（"宣布为公共利益"），在不同年份和机构间重用编号，且没有唯一正确答案。我们衡量了这种模糊性，而不是假设它。

## 结论变了

这是诚实的部分。我们在逐步改进的 gold set 上把同一个消融跑了三次：

| Config (MRR) | $N=19$，1 评判 | $N=28$，2 评判 | $N=35$，+地方 |
|---|---:|---:|---:|
| fts（仅关键词） | 0.092 | 0.090 | 0.089 |
| vec（仅 embeddings） | 0.495 | 0.538 | 0.511 |
| rrf（混合） | 0.367 | 0.400 | 0.401 |
| rrf+expand | **0.755** | 0.656 | 0.605 |
| rrf+rerank | 0.657 | 0.819 | **0.792** |
| best（完整 pipeline） | 0.657 | **0.862** | 0.761 |

从上到下读 `rrf+expand` 和 `best` 这两行。故事自己改写了：

- **$N=19$**："expand 才是关键；生产 pipeline 不是最优的。"
- **$N=28$**："不，完整 pipeline 占上风。"
- **$N=35$**："承载结果的部件是 **rerank**。`rrf+rerank`（0.792）略胜完整的 `best` pipeline（0.761）。"

于是结论落在了 rerank 上，以及一个二阶要点：在 $N=35$ 时，在 rerank 之上再加查询扩展并没有帮助。不带 expand 的 `rrf+rerank` 配置得分略高于 `best`。我们把这个差距（0.792 vs 0.761）读作宽置信区间内的噪声，而不是 expand 有害的证据。诚实的说法是：一旦有了 rerank，expand 就是中性的，而不是第一次跑出来显得的那个承载结果的部件。

那第一次跑出的爆款发现（*你的生产 pipeline 因为 expand 而不是最优的*）是一个小型、单一标注者 gold set 的产物。它在扩大规模时死掉了。如果我们当时发布了它，我们就发布了噪声。

## 每次跑都活下来的

两个结果挺过了 $N=19$、$N=28$ 和 $N=35$。这些才是值得信任的：

1. **FTS 单独用在自然语言上几乎没用**（MRR ~0.09）。一条完整问句形式的查询迫使所有关键词同时匹配，于是召回崩溃。FTS 只在范围外分层挣得一席之地，在那里它比任何其他配置都更经常正确地弃答（该分层很小，所以把这读作方向，而非精确比率）。

2. **embeddings 单独用胜过朴素混合**（vec 0.51 > rrf 0.40）。把一个强语义检索器与一个坏的关键词检索器融合会*降低*结果。纯 RRF 按排名位置给每个列表加权，没有任何关于每个检索器有多可信的信号，所以 FTS 的差排名把垃圾候选注入融合列表的顶部，把好的向量命中往下挤。当一个检索器弱得多时，无权重融合会把好的那个一起拖下去。这是反直觉的那个，也是最稳健的。

## 教训

> 把你的 baseline 调到痛为止。消融到你知道哪个组件承载结果为止：通常是一个，而且通常不是你会猜的那个。

我们把实验跑了三次。结论只有在 baseline 不再有噪声时才停止移动。第一个数字感觉像一个结果。它衡量的是我们的 gold set，而不是我们的系统。

## 诚实的局限

- **N=35 很小。** 置信区间很宽。这些是信号，还不是可发表的结果。
- **团队里没有律师。** 时效、废止以及哪条规范优先被标为 `needs_lawyer` 并从确定集中排除。分歧的仲裁是通过阅读文本完成的，由非律师完成，并如实标注。
- **三条地方查询被丢弃**，作为不可标注的（通用事项，无唯一正确规范）。这个丢弃就是把 22% 一致度变成了具体的东西。

下一个里程碑：把 gold 扩到 100 以上，为 `needs_lawyer` 集拿到法律验证，然后重跑。语料库、[评估框架](https://github.com/crafter-research/amicus-eval)和 gold set 全都是开放的，所以你可以复现这些数字，或者把它们推翻。
