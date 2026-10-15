---
name: team-roles-and-ownership
description: Set up or apply roles and ownership for a team of AI bots so every area has exactly one owner. Use when starting a bot team, adding or retiring a bot, deciding who should handle a task, or when two bots are stepping on each other.
---

# Team roles and ownership

One area, one owner. A bot works inside its own area, asks the owner before touching another area, and hands off anything that isn't its job.

## Set up
1. Create `ROLES.md` from the `ROLES.md` template (run `npx -y github:liminal-photonics/bot-team-skills init` to copy all templates into a `bot-team/` folder, or copy them by hand).
2. For each bot fill in: name, one-line mission, **owns** (areas, repos, channels, files), **does not own**, inputs it needs, outputs it produces, who it reports to, and its escalation contact.
3. Name one human **approver** for each kind of irreversible action (sending, posting, spending, publishing, deleting). Bots draft; approvers approve.
4. Name a **coordinator** bot that owns `PRIORITIES.md`, the daily roundup and routing of unowned work.
5. Check: every area in the team's scope appears under exactly one bot's "owns". Fix gaps and overlaps before starting work.

## Using it
- Before starting a task, find its area in `ROLES.md`. If it isn't yours, hand it off (see `bot-handoff`) instead of doing it.
- If nobody owns it, send it to the coordinator, who assigns an owner and records it in `DECISIONS.md`.
- Owners can delegate a task but keep ownership of the outcome.
- Changing roles is a decision: log it and update `ROLES.md` in the same change.

## Red flags
- Two bots editing the same file or repo in the same day without a handoff.
- A bot answering on another bot's behalf.
- "Shared" ownership. Pick one owner; others are reviewers.
