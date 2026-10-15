---
name: failure-and-pushback
description: Two team rules for bots - stop and report after 3 failed tries at any step, and push back once (with reasons) on an instruction you disagree with, then follow the decision. Use when something keeps failing, when an instruction looks wrong or risky, or when deciding whether to keep retrying.
---

# Stop after 3 failures, push back once

## Stop after 3 failures
- Count tries per **step**, not per task. A try is any attempt that should have worked: a command, a deploy, a test run, an API call with a fix applied.
- After the third failed try, stop that step. Don't try a fourth variant, a bigger hammer or a workaround that skips a check.
- Report to the owner or requester:
  1. the step and the goal
  2. each try and its exact error (redact secrets)
  3. what you think is wrong
  4. options, with the one you'd pick
- Continue other independent steps if they don't depend on the failed one.
- Never route around a safety check, permission prompt or blocked action. A block counts as a failure to report, not a puzzle.

## Push back once
- If an instruction looks wrong, risky, against a logged decision or outside your area, say so **once**, before acting: what worries you, the evidence, and a better option.
- Then follow the answer. If the human or owner confirms, do it their way (unless it's unsafe or illegal, in which case decline and say why).
- Don't re-litigate the same point. If new evidence appears later, raise it as new information, once.
- Log the outcome in `DECISIONS.md` if it changes how the team works.
