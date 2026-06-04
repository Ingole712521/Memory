# Memact Memory Notes

Memact means act-on-memory.

Memory stores accepted user memory after Wiki review. It keeps the records,
source trails, edits, corrections, deleted/forgotten state, and app-safe
summaries needed for later retrieval.

The Memory engine supports CRUD and RAG-style retrieval:

- create, read, update, and delete memory records
- retrieve memories for a query
- build compact RAG input from allowed memories
- keep raw graph-style access behind a separate permission boundary
- build task context packets for memory-blind local workers

Memory does not check app access, shape category input, or decide what the
user accepts. Access, Context, and Wiki handle those steps before Memory stores
what survives.

## Worker boundary

Memact workers do not receive the full Memory store.

For tasks like onboarding prefill or field mapping, Memory builds a small
`memact.task_context_packet.v0` packet. The packet includes only approved field
fragments for one app and one connection. The current worker is local and
deterministic; future model workers should keep the same packet boundary.
