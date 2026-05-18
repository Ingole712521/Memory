# Memact description

**Permissioned intent infrastructure for apps.**

```text
Understand what users are trying to do.
```

Memact is infrastructure that helps apps predict user intent from approved digital activity, without giving them raw access to a user's private data.

This repo is the Memory layer. It stores what survives: semantic evidence, schema packets, intent hypotheses, evidence links, corrections, forgetting actions, and scoped retrieval context.

## System position

```text
Website manages -> Access gates -> Capture records -> Inference understands -> Schema groups -> Intent predicts -> Memory stores -> Apps consume
```

Memory decides what survives and what can be retrieved later. It stores intent results after Intent predicts them. It does not capture browser data, infer meaning from raw pages, predict current intent, or expose raw graph data unless Access grants the right scope.

## What this repo owns

- activity memory
- semantic evidence memory
- schema memory
- intent memory
- source/theme memory
- memory graph and evidence links
- corrections, forgetting, and retrieval context

## What this repo does not own

- browser/page capture
- semantic inference from raw captures
- schema formation
- current intent prediction
- app-facing permission checks

## Copy rules

Use:

- "Permissioned intent infrastructure for apps."
- "Understand what users are trying to do."
- "approved digital activity"
- "retained evidence"
- "schema memories"
- "permissioned intent context"

Avoid:

- generic AI wrapper language
- vague memory-plugin language
- raw-data export framing
- claims that apps get the whole memory graph
- open-source wording unless the repo license explicitly says so
