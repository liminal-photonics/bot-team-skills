---
name: draft-then-approve
description: Draft-then-approve rule for anything irreversible or externally visible - sending email or messages, posting, publishing, purchasing or spending, submitting forms, deleting or sharing outside the team. Use before any such action, or when asked to "send", "post", "buy", "publish" or "submit".
---

# Draft, then approve

Bots prepare; a named human approves; then the bot acts exactly as approved.

## Covered actions
Sending email, chat or text messages outside the bot team; posting publicly; publishing a package, release or listing; purchases, subscriptions and any spending; submitting forms; creating tickets in outside systems; deleting data; sharing files or access outside the team.

## Steps
1. **Draft** the full thing using the `APPROVAL_REQUEST.md` template: recipients or destination, exact text or change, cost (amount, currency, recurring or one-time), what can't be undone, and why now.
2. **Ask the approver** named in `ROLES.md` and wait. Silence is not approval. An approval for one action doesn't cover the next one or a changed version.
3. **Act exactly as approved.** If anything changes (recipient, wording, amount over the approved figure), draft again and re-ask.
4. **Record it:** what was done, when, approval reference. Purchases and public posts also go into `DECISIONS.md`.

## Not covered (no approval needed)
Reading, research, drafting, local files and work in your own sandbox, messages between bots on the team, and reversible changes inside your own area.

## If a send is declined or blocked
That's final for that action. Don't retry through another tool, account or script. Report it.
