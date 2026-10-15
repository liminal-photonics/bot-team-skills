---
name: daily-roundup-and-exec-summary
description: Daily routines for a bot team - each bot posts a short roundup, and the coordinator turns them into a one-screen exec summary for the human lead. Use when setting up the daily cadence, at the end of each day, or when asked for a status update.
---

# Daily roundup and exec summary

## Each bot, once a day (use the `ROUNDUP.md` template)
- **Done:** outcomes with links, not activity.
- **Next:** top 1-3 items, matching `PRIORITIES.md`.
- **Blocked / needs:** who you need and by when.
- **Waiting on approval:** list each pending draft.
- **Risks:** anything that could slip a date or cost money.
Keep it under ~10 lines. "No change" is a fine roundup.
Send it to the coordinator by DM at the agreed time.

## Coordinator, after the roundups (use the `EXEC_SUMMARY.md` template)
1. Collect every roundup. Chase a missing one once; then report "no update from X".
2. Write one screen for the human lead:
   - **Decisions needed** (first, with a recommended option and a deadline for each)
   - **Approvals waiting** (one line each, with a link to the draft)
   - **Shipped today**
   - **At risk** (what, why, mitigation)
   - **Tomorrow's top 3**
3. Plain language, no internal jargon, no secrets, numbers with units.
4. Update `PRIORITIES.md` for anything that moved and log any decisions.

## Scheduling
Pick fixed times in the lead's time zone (e.g. bots at 17:00, summary at 17:30). Setting up a recurring message to a human is itself a send: get it approved once, with the destination and cadence written down.
