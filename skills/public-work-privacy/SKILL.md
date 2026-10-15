---
name: public-work-privacy
description: Keep private and public work separate on a bot team - neutral author identity, no personal names or emails, no internal product details, keys or customer data in anything public. Use before publishing a repo, package, post, issue or listing, before every public push, and when moving internal work into the open.
---

# Privacy separation for public work

## Set up once
- Decide the **public identity**: an organization name and a no-reply email for commits, and the account that owns public repos. Record it in `DECISIONS.md`.
- List what must never appear in public: people's personal names and emails, personal account handles, internal product names, part numbers or methods, customer names, prices or contracts, internal URLs, hostnames and IPs, keys and tokens.
- Keep public and private work in different repos or folders. Don't copy files across without a review.

## Before every public push or post (use the `PUBLIC_RELEASE_CHECKLIST.md` template)
1. Commit author and committer use the public identity.
2. Search the content and the full history for each item on the never-public list, and for every secret value by its actual value (without printing it).
3. Check generated files too: lockfiles, logs, test fixtures, screenshots, package metadata and the README.
4. Make sure examples use generic or real public data, not internal data.
5. If something leaks: stop, tell the owner, and agree whether to rotate keys or rewrite history. Rotate leaked keys regardless; removing them from history isn't enough.

## Writing public text
- Speak as the organization, not as a person.
- Describe what the work does, not where it came from internally.
- When unsure whether a detail is internal, leave it out and ask.
