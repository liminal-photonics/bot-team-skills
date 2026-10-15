---
name: ci-minute-conservation
description: Conserve CI minutes on a bot team - run tests locally first, batch pushes, skip CI on docs-only or bot housekeeping commits, and don't add workflows without approval. Use before pushing, when adding or editing CI workflows, or when CI usage or billing is a concern.
---

# CI minute conservation

Bots can push far more often than people. Each push can trigger paid CI. Default to local verification and few pushes.

## Rules
1. **Test locally first.** Run the full test suite on your machine or sandbox before pushing. CI confirms, it doesn't debug.
2. **Batch pushes.** Commit as often as you like, push once per finished unit of work.
3. **Skip CI when it adds nothing:** docs-only, comments, templates, or when the team has paused CI. Use the provider's skip marker in the commit message (for GitHub Actions: `[skip ci]`, also `[ci skip]`, `[no ci]`, `[skip actions]`).
4. **No new workflows** (or new scheduled, matrix or self-triggering jobs) without approval from the person who pays. Treat it as spending under `draft-then-approve`.
5. **Don't retry flaky CI blindly.** Look at the log; after 3 failures, stop and report.
6. **Prefer cheap jobs:** path filters, caching, cancel-in-progress concurrency, the smallest runner, short timeouts.
7. Check remaining minutes weekly and report them in the exec summary when under 25%.

## When CI is out of minutes
Pause pushes that would trigger it, keep testing locally, note it in the roundup, and ask the approver whether to wait, buy minutes or self-host.
