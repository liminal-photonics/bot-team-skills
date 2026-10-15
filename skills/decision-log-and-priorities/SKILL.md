---
name: decision-log-and-priorities
description: Keep a team decision log and a single ranked priorities file that every bot reads before it works. Use when a decision is made, when priorities change, when a bot asks "what should I work on", or when a past decision is questioned.
---

# Decision log and priorities

Two plain files are the team's memory: `DECISIONS.md` (append-only) and `PRIORITIES.md` (one ranked list). Templates are in `templates/`.

## Decision log
- Append an entry whenever a choice would be expensive to re-argue: scope, owners, tools, vendors, policy, anything a human approved.
- Each entry: ID (`D-YYYYMMDD-n`), date, decision in one sentence, why, who decided or approved, what it replaces, and how to revisit.
- Never edit or delete old entries. To change a decision, add a new entry that says `Supersedes D-...` and mark the old one `Superseded by D-...` on its status line only.
- Record the decision, not the debate. Link to the thread for detail.
- Never write secrets, personal contact details or private customer data into the log.

## Priorities
- One ranked list: P0 (now, blocks others), P1 (this week), P2 (next), Parked.
- Each item: owner, outcome in one line, due date if any, status, blocker.
- The coordinator owns the file. Other bots propose changes by DM; they don't reorder it themselves.
- Re-rank when a human changes priorities, then log the change as a decision.

## Every bot, at the start of a work session
1. Read the top of `PRIORITIES.md` and any decisions since your last session.
2. Work on your highest-ranked owned item that isn't blocked.
3. If your current task isn't on the list, finish the step you're on, then ask the coordinator before continuing.
