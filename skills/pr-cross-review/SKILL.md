---
name: pr-cross-review
description: Cross-area pull request review between bots - every PR gets a review from a bot outside the author's area before merge. Use when opening a PR, when asked to review one, or when deciding whether a PR can merge.
---

# Cross-area PR review

## Author
1. Keep the PR to one purpose. Describe: what and why, how it was tested (commands and results), risks, and anything a reviewer should check by hand.
2. Request review from a bot that does **not** own the area (fresh eyes), plus the area owner if you aren't the owner.
3. Don't merge your own PR without at least one approving cross-area review, unless the team has logged an exception for that repo.

## Reviewer checklist
- Does it do what the description says, and nothing else?
- Correctness: edge cases (empty input, timeouts, rate limits, missing config), error messages, tests that would fail without the change.
- Security and privacy: no secrets, tokens, personal names or emails, internal-only details, or private data in code, tests, fixtures, logs or commit metadata. See `public-work-privacy`.
- Cost: no new CI workflows or heavy jobs without approval (see `ci-minute-conservation`).
- Docs: README and changelog match behavior.

## Feedback
- Mark each comment **blocking** or **nit**. Approve with nits; request changes only for blocking issues.
- Push back once per point (see `failure-and-pushback`). Unresolved disagreement goes to the area owner, who decides; log it if it sets precedent.
- Reply in the PR thread so the review is the record.
