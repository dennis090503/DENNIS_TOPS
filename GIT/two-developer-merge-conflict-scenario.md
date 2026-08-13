# Scenario: Two Developers, One Repo — Branching, Creating a Conflict, and Resolving It

This is a full walkthrough you can actually type out and run. It follows two developers — **Dev A (Alice)** and **Dev B (Bob)** — working on the same GitHub repository, from creating their branches through to resolving a real merge conflict.

**Setup:** Both Alice and Bob have cloned the same repo. It contains one file, `app.js`:

```javascript
function greetUser() {
  console.log("Hello, user!");
}
```

Both start from the same `main` branch, at the same commit.

---

## Step 1 — Each developer creates their own branch

Neither dev should edit `main` directly. Each pulls the latest `main`, then branches off it.

**Alice** is asked to change the greeting message.
```bash
git switch main
git pull origin main
git switch -c feature/update-greeting
```

**Bob** is asked to add a name parameter to the same function.
```bash
git switch main
git pull origin main
git switch -c feature/personalized-greeting
```

At this point:
```text
main
 ├── feature/update-greeting        (Alice)
 └── feature/personalized-greeting  (Bob)
```

Both branches start from **the exact same commit** in `app.js`. This is the key ingredient for a conflict — they're about to independently change the *same line*.

---

## Step 2 — Each developer makes a conflicting change

**Alice** edits the `console.log` line:
```javascript
function greetUser() {
  console.log("Welcome back!");
}
```
```bash
git add app.js
git commit -m "feat: update greeting message to 'Welcome back!'"
git push -u origin feature/update-greeting
```

**Bob**, working independently and unaware of Alice's change, edits the *same line* differently:
```javascript
function greetUser(name) {
  console.log(`Hello, ${name}!`);
}
```
```bash
git add app.js
git commit -m "feat: personalize greeting with user's name"
git push -u origin feature/personalized-greeting
```

Both push successfully — pushing to *different* branches never conflicts. The collision only happens when someone tries to combine both branches into one.

---

## Step 3 — Alice's branch merges first (no conflict yet)

Alice opens a Pull Request: `feature/update-greeting` → `main`. It's reviewed and merged normally — since `main` hasn't changed since she branched off, this is a clean **fast-forward merge**.

```bash
git switch main
git pull origin main
```

`main` now contains Alice's version:
```javascript
function greetUser() {
  console.log("Welcome back!");
}
```

---

## Step 4 — Bob's branch now conflicts with `main`

Bob opens his Pull Request: `feature/personalized-greeting` → `main`. GitHub will show **"This branch has conflicts that must be resolved."** Here's why: Bob's branch still thinks the base version of `app.js` looks like the *original* function — but `main` has since moved on to Alice's version. Both changed the same lines differently, so Git can't automatically decide which one is correct.

Bob resolves it locally:
```bash
git switch feature/personalized-greeting
git fetch origin
git merge origin/main
```

Git stops and reports the conflict:
```text
Auto-merging app.js
CONFLICT (content): Merge conflict in app.js
Automatic merge failed; fix conflicts and then commit the result.
```

`app.js` now looks like this:
```javascript
function greetUser<<<<<<< HEAD
(name) {
  console.log(`Hello, ${name}!`);
=======
() {
  console.log("Welcome back!");
>>>>>>> origin/main
}
```

*(The exact shape of the markers depends on how the lines align — in practice it commonly looks like the block below, which is easier to read:)*

```javascript
function greetUser(name) {
<<<<<<< HEAD
  console.log(`Hello, ${name}!`);
=======
  console.log("Welcome back!");
>>>>>>> origin/main
}
```

**Reading the markers:**
- `<<<<<<< HEAD` → the start of *Bob's* current version (his branch, which he has checked out)
- `=======` → the dividing line
- `>>>>>>> origin/main` → the end, labeled with the *incoming* branch — Alice's already-merged change on `main`

---

## Step 5 — Resolving the conflict

Bob needs to decide what the *combined* correct behavior should be. In this case, both changes are valuable — personalization **and** the friendlier wording — so he merges the intent of both rather than blindly picking one side:

```javascript
function greetUser(name) {
  console.log(`Welcome back, ${name}!`);
}
```

He deletes the conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`) entirely — leaving them in is the most common beginner mistake, since the file will no longer even run correctly.

```bash
git add app.js
git status
```
```text
All conflicts fixed but you are still merging.
  (use "git commit" to conclude merge)
```

```bash
git commit
```
Git pre-fills a merge commit message like `Merge branch 'main' into feature/personalized-greeting` — you can keep it or edit it.

```bash
git push origin feature/personalized-greeting
```

Bob's Pull Request now shows as mergeable — GitHub sees the conflict is resolved. It gets reviewed and merged into `main`.

---

## Step 6 — Final state

```text
main:  function greetUser(name) {
         console.log(`Welcome back, ${name}!`);
       }
```

Both Alice's and Bob's intent survived, combined deliberately by a human — which is exactly what Git conflicts are designed to force: a decision point, not a silent overwrite.

---

## Quick command reference for this whole scenario

| Step | Command |
|---|---|
| Create your own branch off latest `main` | `git switch main && git pull && git switch -c feature/your-branch` |
| Commit and push your work | `git add . && git commit -m "..." && git push -u origin feature/your-branch` |
| Pull in the latest `main` to check for conflicts | `git fetch origin && git merge origin/main` |
| See which files are conflicted | `git status` |
| After manually fixing the file | `git add <file>` |
| Finish the merge | `git commit` |
| Push the resolved branch | `git push` |
| Bail out and start over if needed | `git merge --abort` |

## Why this happened (root cause)

Both developers branched from the **same starting point** and edited the **same lines** of the **same file**, and one branch (Alice's) merged into `main` before the other (Bob's) got a chance to. Git conflicts aren't a sign anyone did anything wrong — they're an expected, normal part of two people improving the same area of code independently. The fix is always the same shape: fetch the latest target branch, merge it in locally, manually decide the correct combined result, then commit.

## How to avoid unnecessary conflicts going forward

- **Communicate** when two people are about to touch the same file/area
- **Pull `main` frequently** into your feature branch so conflicts show up small and early, not all at once after weeks of divergence
- **Keep Pull Requests small** — a 20-line PR conflicts far less painfully than a 2,000-line one
- **Merge or rebase your branch onto `main` regularly** while you work, rather than only right before opening the PR
