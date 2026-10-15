# Bot Team Skills

Skills and fill-in templates for running a **team of AI bots** that work alongside people. They're generic: they don't assume any company, tool stack or chat app.

No MCP server, no API keys. Install the plugin and the skills become available to your agent. A small optional CLI copies the templates into your project.

## Skills

| Skill | Use it for |
|---|---|
| `team-roles-and-ownership` | One owner per area, named human approvers, a coordinator bot, a `ROLES.md` with no gaps or overlaps |
| `decision-log-and-priorities` | Append-only `DECISIONS.md` and one ranked `PRIORITIES.md` that every bot reads before working |
| `bot-handoff` | Self-contained handoffs by direct message, urgent by default, with acknowledgment and a single re-send |
| `failure-and-pushback` | Stop and report after 3 failed tries at a step; push back once with reasons, then follow the decision |
| `draft-then-approve` | Sends, posts, publishing, purchases, form submissions, deletion and outside sharing: draft, get approval, act exactly as approved |
| `daily-roundup-and-exec-summary` | A short daily roundup from each bot and a one-screen exec summary for the human lead, decisions first |
| `pr-cross-review` | Every PR reviewed by a bot outside the author's area, with a checklist and blocking/nit labels |
| `ci-minute-conservation` | Test locally, batch pushes, `[skip ci]` where it adds nothing, no new workflows without approval |
| `public-work-privacy` | A neutral public identity, a never-public list, and a pre-push leak check over content and history |

## Templates

`ROLES.md`, `DECISIONS.md`, `PRIORITIES.md`, `HANDOFF.md`, `APPROVAL_REQUEST.md`, `ROUNDUP.md`, `EXEC_SUMMARY.md`, `PUBLIC_RELEASE_CHECKLIST.md`

Copy them into a `bot-team/` folder (existing files are never overwritten unless you pass `--force`):

```
npx -y github:liminal-photonics/bot-team-skills init            # ./bot-team/
npx -y github:liminal-photonics/bot-team-skills init docs/team  # a folder you choose
npx -y github:liminal-photonics/bot-team-skills list
```

## Getting started

1. Run `init`, then ask your agent: "Set up roles for a team of three bots: research, engineering, and ops." It fills in `ROLES.md`.
2. Add the first decisions and priorities.
3. Tell every bot to follow these skills: read priorities at the start of each session, hand off by DM, stop after 3 failures, and draft-then-approve anything irreversible.
4. Schedule the daily roundup and exec summary (that schedule is itself a send, so approve it once).

## Development

```
npm test        # offline checks: skill frontmatter, cross-references, templates, manifest, CLI
npm run live    # fresh npx install of the published package (set SPEC=github:...#<sha> to pin)
```

## License

MIT © Liminal Photonics
