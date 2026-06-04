# Task Context Workers

Memact can use small local workers to help apps use approved memory.

These workers are not personal AI agents. They do not receive a full user profile.

The only input is a `memact.task_context_packet.v0` packet. That packet contains a small list of approved memory fragments for one job, one app, and one connection.

## What a worker can see

A worker can see only:

- the target app id
- the connection id
- the task purpose
- approved field fragments such as `diet.preference` or `diet.allergy`
- the source label for each fragment

## What a worker must not see

A worker must not receive:

- full profiles
- raw app activity dumps
- raw capture events
- unapproved memory
- unrelated categories
- sensitive fields unless they were explicitly allowed for this task

## Current worker

The current worker is `TemplateContextWorker`.

It does not call OpenAI, Anthropic, Gemini, or any cloud model. It creates a simple structured output from the approved packet.

This makes the architecture testable without paid AI APIs.

## Future workers

Future workers can plug into the same interface:

- `OpenAIContextWorker`
- `LocalModelContextWorker`
- `EmbeddingContextWorker`

They should not change the permission model. They still receive only the task packet, not the full memory store.

## Semantic matching placeholder

`semantic-matching.mjs` contains a small local matcher for field mapping.

Example:

- app field: `food restrictions`
- Memact fields: `diet.preference`, `diet.allergy`

This can later be replaced with lightweight local embeddings, but the output must stay user-reviewable.
