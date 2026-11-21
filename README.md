# Mlola Prove starter

A tiny shop, one change request, and a proof on every pull request.

[Mlola Prove](https://mlola.com/prove) holds a change to its approved change
request. Each acceptance criterion is proven by your test report, your API or
a real browser, without a model judging. The proof says what held, with its
evidence, and the short list of what a person still has to look at.

## See it

The change request is [CR-1](docs/cr/CR-1.md): the code SAVE10 takes 10% off.
Its contract, approved on `main`, is [`contracts/CR-1.json`](contracts/CR-1.json).
Two pull requests implement it. Both are left open so you can read their proofs:

| Pull request | Tests | Page | Proof |
| --- | --- | --- | --- |
| [#1 First attempt](../../pull/1) | pass | shows "Total: 90" | **not proven**: `GET /api/cart` still says 100, so checkout would charge full price |
| [#2 The fix](../../pull/2) | pass | shows "Total: 90" | **proven**, with the brand team's UAT and the edited tests left for a person |

The first attempt is the kind of change an agent reports as "done, all tests
pass". A reviewer skimming the diff, or an end-to-end test looking for
"Total: 90", would let it through. The contract asks the API whether the
discount was kept, and it was not.

## How it works

[`.github/workflows/prove.yml`](.github/workflows/prove.yml) has two jobs:

1. **`prove`** runs the change: its tests (as JUnit), the shop, and
   [`mlolahq/prove-action`](https://github.com/mlolahq/prove-action). It holds
   no secrets, because the change's code runs there.
2. **`seal`** runs none of the change's code. It checks each proof again,
   signs it with `MLOLA_RECEIPT_KEY`, posts it on the pull request, and is the
   check that gates the merge.

Why two jobs, and what a proof does and does not establish:
[the trust model](https://mlola.com/prove/docs/trust-model).

## Check a proof yourself

Download the `mlola-proof` artifact from a pull request's run, then:

```bash
npx -y -p @mlola/browser-cli@0.19.0 mlola receipt check proof/CR-1/proof.json \
  --contract contracts/CR-1.json --trust ed25519:KEY_ID --commit <the run's commit>
```

No browser, network or model is needed. The check recomputes every verdict
from what the proof recorded, so an edited proof is caught.

## Try it

**Here, on your machine** (Node 22, Google Chrome):

```bash
git checkout pr-2-fix         # or pr-1-first-attempt
npm test                      # writes reports/junit.xml
npm start &                   # the shop on http://127.0.0.1:3000
npx -y -p @mlola/browser-cli@0.19.0 mlola prove contracts/CR-1.json --base main
```

**On a fork:** fork this repository, enable Actions on the fork (its Actions
tab), and open a pull request in it from `pr-1-first-attempt` or
`pr-2-fix` to `main`. Without a `MLOLA_RECEIPT_KEY` secret the proofs are
checked and stay unsigned. To sign them, create a key
(`npx -y -p @mlola/browser-cli@0.19.0 mlola receipt keygen`) and store its
private key as that secret.

**On your own repository:** write a contract for your next change
([how](https://mlola.com/prove/docs/prove-a-change#contract), or let a model
draft one with `mlola contract draft`), copy the workflow, and point
`base-url` at your app.

## License

MIT
