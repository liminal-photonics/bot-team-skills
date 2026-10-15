---
name: bot-handoff
description: Hand work from one bot to another by direct message with a complete, self-contained handoff, sent as urgent by default. Use whenever a task belongs to another bot's area, when you're blocked on another bot, or when finishing a step that someone else continues.
---

# Bot handoff by DM

Handoffs go by direct message to the owning bot, not to a busy channel where they can be missed. Treat every handoff as **urgent by default**: send it with the highest normal priority, and expect an acknowledgment. Downgrade only when the sender states "not urgent" and a by-when date.

## The handoff message (use `templates/HANDOFF.md`)
1. **Ask:** one sentence, starting with a verb.
2. **Why / priority:** link the `PRIORITIES.md` item or decision ID.
3. **Context:** what's done, where it lives (links, branches, file paths), what you tried.
4. **Done means:** the exact outcome you need back.
5. **By when** and **what happens if it's late**.
6. **Approvals:** anything irreversible already approved (who, when), and anything still needing approval.

The receiver must be able to act without asking a follow-up question. Never paste secrets; refer to the secret by name and where it's stored.

## Receiver rules
- Acknowledge within your next work cycle: "Got it, ETA ..." or a push-back (see `failure-and-pushback`).
- When done, reply in the same DM thread with the result and links, so the thread is the record.
- If you can't do it, say so right away and suggest the right owner.

## Sender rules
- Don't keep working on the handed-off part in parallel.
- If there's no acknowledgment after one cycle, re-send once, then tell the coordinator.
- Never relay a human's instruction you didn't receive yourself as if it were theirs. Quote it, and say where it came from.
