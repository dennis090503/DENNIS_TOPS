# The Complete Git & GitHub Guide — From Zero to Real-World Team Workflow

> A practical, scenario-driven guide. Every command comes with what it does, why you'd use it, and what you'll see happen. Work through this top to bottom if you're brand new; use the cheat sheet and decision guide as ongoing references once you know the basics.

---

## LEVEL 1 — Git Basics

### 1. Git Setup — Start From Zero

**What is Git?**
Git is a *version control system* — a program that tracks every change you make to a set of files over time, so you can go back to any earlier version, see who changed what, and combine changes from multiple people without losing anyone's work.

**Git vs GitHub**
- **Git** = the tool that runs on your computer and tracks history. It works with zero internet connection.
- **GitHub** = a website that hosts Git repositories online, so people can share and collaborate on them. Git is the engine; GitHub is one of several parking garages (GitLab and Bitbucket are others).

**Why developers use Git**
- Undo mistakes safely (nothing is really "lost")
- Work on features in isolation (branches) without breaking working code
- Collaborate with others without overwriting each other's work
- See exactly what changed, when, and why

**Version control, simply**
Imagine a document where every time you save, a full snapshot is kept forever, labeled with what changed and why. You can jump to any snapshot, compare two snapshots, or merge two people's snapshots together. That's version control.

**Installing Git on Windows**
1. Go to https://git-scm.com/download/win
2. Download the installer, run it, accept the defaults (they're sane for beginners)
3. This installs **Git Bash**, a terminal that understands Unix-style commands, plus Git itself

**Checking whether Git is installed**
```bash
git --version
```
Expected output: something like `git version 2.44.0.windows.1`. If you get "command not found," Git isn't installed or isn't on your PATH — reinstall and restart your terminal.

**Configuring username and email**
Git stamps every commit with a name and email — this is how history shows "who did what."
```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```
`--global` means this applies to every repository on your machine, not just one.

**Configuring the default branch name**
Modern Git defaults to `main` (older Git used `master`). Set it explicitly so you're consistent:
```bash
git config --global init.defaultBranch main
```

**Git Bash basics**
Git Bash gives you a Unix-like shell on Windows. You'll live in this terminal for nearly everything in this guide.

**Essential terminal commands**

| Command | What it does |
|---|---|
| `cd folder-name` | Change directory (move into a folder) |
| `cd ..` | Move up one folder |
| `ls` | List files/folders in the current directory |
| `pwd` | Print working directory (show where you are) |
| `mkdir name` | Make a new directory |
| `touch file.txt` | Create an empty file |
| `clear` | Clear the terminal screen |
| `rm file.txt` | Delete a file (careful — no recycle bin) |

**Checking your Git configuration**
```bash
git config --list
```
Shows every configured setting, including the username/email you set above.

**Understanding `.gitconfig`**
Your global settings live in a plain text file at `~/.gitconfig` (on Windows, roughly `C:\Users\YourName\.gitconfig`). You can open it in any text editor and see/edit your settings directly.

---

## LEVEL 2 — Local Repository

### 2. Git Fundamentals

**The core Git workflow**
```text
Working Directory → Staging Area → Local Repository → Remote Repository
     (git add)          (git commit)         (git push)
```

| Term | Analogy | What it means |
|---|---|---|
| **Working directory** | Your desk | The actual files you're editing right now |
| **Staging area** (a.k.a. "index") | A shopping cart | Changes you've marked as "ready to be part of the next commit" |
| **Local repository** | A photo album on your shelf | The full committed history stored on your machine |
| **Remote repository** | A shared cloud photo album | The same history hosted online (e.g., GitHub) so others can see/pull it |
| **Commit** | A saved photo with a caption | A permanent snapshot of your staged changes, with a message explaining why |
| **Branch** | A parallel timeline | An independent line of development you can work on without affecting others |
| **HEAD** | "You are here" sign | A pointer to whichever commit/branch you currently have checked out |
| **Repository (repo)** | The whole album + its shelf | The project folder plus its entire tracked history |
| **`.git` folder** | The album's hidden binder | A hidden folder inside your project holding all of Git's tracking data — delete it and you delete the entire history |
| **SHA / hash** | A unique fingerprint | A 40-character ID (e.g., `a1b2c3d...`) that uniquely identifies a commit's exact content |
| **Snapshot** | A photograph, not a diff | Each commit stores the state of *all* tracked files at that point, not just what changed (though Git is smart about storing this efficiently) |

### 3. First Git Repository

```bash
mkdir my-project
cd my-project
git init
```
- `mkdir my-project` — creates a new folder
- `cd my-project` — moves into it
- `git init` — turns this ordinary folder into a Git repository by creating a hidden `.git` folder inside it. Nothing is tracked yet; this just switches Git "on" for this folder.

**Now make a first change:**
```bash
touch index.html
git status
```
`git status` tells you the current state: staged, unstaged, and untracked files. Right now it'll say `index.html` is **untracked** (Git sees it but isn't tracking it yet).

```bash
git add index.html
git status
```
`index.html` moves to **staged** — it's now in the "shopping cart," ready to be committed.

```bash
git commit -m "Initial commit: add index.html"
```
This creates your first permanent snapshot. `-m` lets you pass the commit message inline instead of opening an editor.

```bash
git log
```
Shows your commit history: author, date, message, and the commit's SHA hash.

**What happened, step by step:**
1. `git init` created `.git/` — an empty repository
2. `touch` created a real file Git didn't know about (untracked)
3. `git add` copied that file's current content into the staging area
4. `git commit` took everything staged and sealed it into a permanent, named snapshot
5. `git log` let you see that snapshot in the project's history

---

### 4. Git Basic Commands

#### `git init`
- **Does:** Creates a new, empty Git repository in the current folder.
- **Why:** Needed once, at the start of tracking a project.
- **Syntax:** `git init`
- **Example:** `git init` inside a new project folder.
- **Result:** A `.git/` folder appears; `git status` now works.
- **Common mistake:** Running it inside an already-initialized repo (harmless but pointless), or running it in the wrong folder (creates a stray `.git`).
- **When not to use:** Inside a folder that's already part of another repo (nested repos cause confusion) — use a subfolder or `git submodule` instead.

#### `git status`
- **Does:** Shows the state of your working directory and staging area.
- **Why:** Your most-used command — always run this before `add`/`commit` to know what you're about to do.
- **Syntax:** `git status`
- **Example output:**
```text
On branch main
Changes not staged for commit:
  modified:   index.html
Untracked files:
  new-file.txt
```
- **Common mistake:** Ignoring it and committing blindly, which can accidentally include files you didn't mean to.

#### `git add`
- **Does:** Moves changes from the working directory into the staging area.
- **Why:** Lets you choose exactly what goes into the next commit.
- **Syntax:** `git add <file>` / `git add .` / `git add -A`
- **Example:** `git add index.html`
- **Result:** File appears under "Changes to be committed" in `git status`.
- **Common mistake:** Using `git add .` carelessly and staging secrets or build files that shouldn't be tracked.
- **When not to use:** Don't stage generated files (like `node_modules/`) — exclude them via `.gitignore` instead.

**`git add .` vs `git add -A` vs `git add <file>`**

| Command | What it stages |
|---|---|
| `git add <file>` | Only that specific file |
| `git add .` | All new/modified files in the current directory and below (in modern Git, this also includes deletions) |
| `git add -A` | All changes in the *entire* repository, regardless of your current folder |

In modern Git (2.x), `git add .` and `git add -A` behave almost identically when run from the repo root; the difference matters mainly when you're inside a subfolder — `.` is scoped to that subfolder, `-A` is repo-wide.

#### `git commit`
- **Does:** Creates a permanent snapshot of everything currently staged.
- **Why:** This is how history is actually built.
- **Syntax:** `git commit -m "message"`
- **Example:** `git commit -m "fix: correct navbar spacing"`
- **Common mistake:** Vague messages like `git commit -m "fix"` or `"update"` — useless six months later.
- **When not to use:** Don't commit half-finished, broken code to a shared branch like `main`.

**`git commit -m ""` vs `git commit -am ""`**
- `git commit -m "msg"` commits only what's staged.
- `git commit -am "msg"` automatically stages *and* commits all changes to files Git is **already tracking** — but it will **not** pick up brand-new untracked files. Use it as a shortcut only when you're sure you want everything tracked committed as-is.

#### `git log`
- **Does:** Shows commit history.
- **Why:** To review what's happened, find a commit ID, or check who changed what.
- **Syntax:** `git log`, `git log --oneline`
- **Example result:**
```text
commit a1b2c3d4...
Author: Your Name <you@example.com>
Date:   Thu Aug 13 10:00:00 2026
    fix: correct navbar spacing
```

#### `git diff`
- **Does:** Shows line-by-line differences between two states (e.g., working directory vs staging, or two commits).
- **Why:** To review exactly what you changed before committing.
- **Syntax:** `git diff` (unstaged changes), `git diff --staged` (staged changes)
- **Example:** `git diff index.html`

#### `git show`
- **Does:** Shows the full details (message + diff) of a single commit.
- **Syntax:** `git show <commit-hash>`

#### `git rm`
- **Does:** Removes a file from both the working directory and Git tracking, and stages that removal.
- **Syntax:** `git rm filename`
- **Common mistake:** Using plain `rm` (the OS command) instead — that only deletes the file locally; Git will still show it as "deleted" and unstaged. `git rm` does both in one step.

#### `git mv`
- **Does:** Renames or moves a file and stages the rename in one step.
- **Syntax:** `git mv old-name.txt new-name.txt`
- **Why:** Equivalent to `mv` + `git add` (old) + `git add` (new), but atomic and clean in history.

#### `git restore`
- **Does:** Discards changes in your working directory or unstages files (modern replacement for parts of `checkout`).
- **Syntax:** `git restore file` (discard unstaged changes), `git restore --staged file` (unstage, keep changes)
- **Warning:** `git restore file` permanently throws away your uncommitted edits to that file. There's no undo.

#### `git clean`
- **Does:** Deletes **untracked** files (files Git has never seen) from your working directory.
- **Syntax:** `git clean -n` (dry run — always do this first!), `git clean -fd` (force-delete files and directories)
- **⚠️ Dangerous:** `git clean -fd` permanently deletes untracked files with no recovery. Always run `git clean -n` first to preview.

---

### 5. Git Log & History

```bash
git log                                  # full history, most recent first
git log --oneline                        # one line per commit — great for a quick overview
git log --graph                          # ASCII graph showing branch/merge structure
git log --all                            # includes commits on every branch, not just the current one
git log --oneline --graph --decorate --all   # the "power view" most developers alias to something short
```

**Finding things in history:**
- **Previous commits:** `git log` — scroll or use `--oneline` for a scannable list
- **What changed in a commit:** `git show <hash>`
- **Which files changed:** `git show --stat <hash>` or `git diff <hash>~1 <hash>`
- **Commit IDs:** the hash shown next to each entry in `git log` (you only need the first 7 characters usually)
- **Branch history:** `git log --graph --all --oneline` visualizes how branches diverged and merged

---

## LEVEL 3 — Branches

### 6. Git Branches — Complete Guide

**What is a branch?**
A branch is just a movable pointer to a commit. When you "create a branch," you're not copying the whole project — you're adding a new lightweight label that can move independently as you commit.

**Why branches are needed**
So multiple features/fixes can be developed in parallel without one person's unfinished work breaking another's, or breaking the stable `main` code.

**`main`**
The conventional name for the primary, stable branch — typically what's deployed to production.

```bash
git branch                    # list branches, * marks the current one
git branch feature-login      # create a new branch (doesn't switch to it)
git switch feature-login      # switch to it
git switch -c feature-login   # create AND switch in one step (most common)
git checkout feature-login    # older way to switch (still works)
git branch -m old-name new-name   # rename a branch
git branch -d feature-login   # delete a branch (safe — refuses if unmerged)
git branch -D feature-login   # force-delete, even if unmerged (dangerous)
```

**`git switch` vs `git checkout`**
`git checkout` is an older, multipurpose command that both switches branches *and* restores files, which made it confusing. `git switch` (branches) and `git restore` (files) were introduced to split those two jobs apart. Prefer `switch`/`restore` for clarity; you'll still see `checkout` constantly in older tutorials and muscle memory.

**Realistic branch layout:**
```text
main
 ├── feature-login
 ├── feature-payment
 └── bugfix-navbar
```
Each branch can be worked on, committed to, and eventually merged back into `main` independently.

---

## LEVEL 4 — GitHub

### 9. GitHub Setup

**What is GitHub**
A cloud platform for hosting Git repositories, adding collaboration features on top: Pull Requests, code review, Issues, Actions (CI/CD), and more.

**Git vs GitHub (recap):** Git = the version control tool. GitHub = a hosting/collaboration service built around Git.

**Creating an account & repository**
1. Sign up at github.com
2. Click "New repository," give it a name
3. Choose **Public** (anyone can see it) or **Private** (only you and invited collaborators)
4. Optionally initialize with a README, `.gitignore`, and LICENSE

**README** — a Markdown file (`README.md`) that explains what the project is, how to install/run it. It's the front page of your repo.

**`.gitignore`** — tells Git which files/folders to never track (covered in depth in section 14).

**LICENSE** — a file declaring how others may legally use your code (MIT, Apache 2.0, GPL, etc.).

**Connecting a local repo to GitHub**
```bash
git remote add origin https://github.com/username/repo-name.git
git remote -v                     # confirm it's set
git push -u origin main
```
- `git remote add origin <url>` — registers a nickname (`origin`) pointing at the GitHub URL. `origin` is just a convention — you could call it anything, but everyone calls the primary remote `origin`.
- `git remote -v` — lists remotes and their URLs (fetch and push).
- `git push -u origin main` — uploads your `main` branch to GitHub and (`-u`) remembers this pairing, so future pushes can just be `git push`.

---

## LEVEL 5 — Collaboration

### 10. Push, Pull & Fetch

| Command | What it does |
|---|---|
| `git fetch` | Downloads new commits/branches from the remote, but does **not** touch your working files or local branches |
| `git pull` | `git fetch` **+** merges (or rebases) those changes into your current branch |
| `git push` | Uploads your local commits to the remote |

**Mental model:** `fetch` = "check the mailbox and bring the mail inside, but don't open it." `pull` = "check the mailbox *and* open/read the mail right now." `push` = "mail your own letters out."

**Realistic example:**
```bash
git fetch origin           # see what's new without changing your files
git log origin/main        # inspect what's new before merging
git pull origin main       # actually bring it in
git push origin main       # send your commits up
```

### 11. Clone an Existing Project

```bash
git clone https://github.com/username/repo-name.git
```
Downloads the entire repository — full history, all branches — into a new folder on your machine.

**Complete workflow after cloning:**
```bash
git clone https://github.com/username/repo-name.git
cd repo-name
git status          # confirm a clean start
git branch -a       # see all branches (local + remote-tracking)
git pull            # make sure you have the very latest
```
This is exactly what a developer does on day one at a new job or when picking up an existing project: clone, inspect, branch, work.

### 12. Remote Repositories

```bash
git remote -v                              # list remotes
git remote add upstream <url>              # add another remote (common when forking)
git remote remove upstream                 # remove a remote
git remote rename origin upstream          # rename a remote
git remote set-url origin <new-url>        # change a remote's URL
```

**Local branches vs remote-tracking branches**
```text
main                    ← your local branch
origin/main             ← Git's local record of where the remote's main was, last time you fetched
feature/login           ← your local branch
origin/feature/login    ← Git's local record of the remote version
```
`origin/main` is **not live** — it only updates when you `fetch` or `pull`. It's a snapshot of "what the remote looked like last time I checked," which is why you can be "behind" without knowing until you fetch.

### 13. GitHub Authentication

GitHub stopped accepting plain account passwords for Git operations (pushing/pulling over HTTPS) years ago, for security — passwords are too easy to phish/leak and don't support fine-grained permissions or expiry.

**HTTPS** — Uses a **Personal Access Token (PAT)** in place of a password. Simple to set up, works everywhere (even restrictive networks), but you must generate/manage tokens in GitHub Settings → Developer settings.

**SSH** — Uses a public/private key pair. You generate a key once, add the public half to GitHub, and never type a password/token again for that machine.

```bash
ssh-keygen -t ed25519 -C "you@example.com"   # generate a new SSH key
ssh-add ~/.ssh/id_ed25519                    # add it to your SSH agent
ssh -T git@github.com                        # test the connection
```
Expected success message: `Hi username! You've successfully authenticated...`

**When to use which:** SSH is more convenient long-term for frequent pushers on a personal machine. HTTPS + PAT is easier on shared/locked-down machines or in CI environments where SSH keys are harder to manage securely.

### 14. `.gitignore`

A `.gitignore` file tells Git which files/folders to never track — dependencies, build output, secrets, editor files.

**Example for Node.js/React:**
```text
node_modules/
dist/
build/
.env
*.log
```

**Java / IntelliJ:**
```text
target/
*.class
.idea/
*.iml
```

**VS Code:**
```text
.vscode/
```

**Environment variables**
`.env` files hold secrets (API keys, database passwords) and should **never** be committed. Always add `.env` to `.gitignore` from day one.

**If a file was already committed before you added it to `.gitignore`:**
`.gitignore` only prevents Git from tracking files it *doesn't already know about*. If a file is already tracked, adding it to `.gitignore` does nothing on its own — Git will keep tracking changes to it.

**To stop tracking it without deleting it locally:**
```bash
git rm --cached path/to/file
git commit -m "chore: stop tracking file, now in .gitignore"
```
`--cached` removes it from Git's tracking and the next commit, but leaves the real file untouched on your disk.

---

## LEVEL 6 — Conflicts

### 7. Merging Branches

```bash
git switch main
git merge feature
```

**Fast-forward merge:** Happens when `main` hasn't moved since you branched off — Git just slides the `main` pointer forward to your feature branch's latest commit. No new commit is created.

**Three-way merge:** Happens when both `main` and your feature branch have new commits since they diverged. Git looks at three points — the common ancestor, and the tip of each branch — and creates a new **merge commit** that combines both histories.

**Merge commit:** A special commit with two parents (instead of one), representing "these two lines of history are now joined."

**When merge conflicts occur:** When both branches changed the *same lines* of the *same file* differently, Git can't automatically decide which version is correct and stops, asking you to resolve it.

**Example:**
```text
main
   \
    feature
```
```bash
git switch main
git merge feature
```
If no conflicting changes exist, Git creates a merge commit (or fast-forwards) automatically and you're done.

### 8. Merge Conflicts — VERY IMPORTANT

Say both `main` and `feature` changed the same line in `app.js`. Running `git merge feature` produces:

```text
<<<<<<< HEAD
console.log("Version from main");
=======
console.log("Version from feature");
>>>>>>> feature
```

**What each marker means:**
- `<<<<<<< HEAD` — start of *your current branch's* version (the one you're merging *into*)
- `=======` — the dividing line between the two versions
- `>>>>>>> feature` — end marker, labeled with the *other* branch's name (the one being merged *in*)

**How to resolve manually:**
1. Open the file in your editor
2. Decide what the final code should be — keep one side, the other, or a blend of both
3. **Delete the conflict markers themselves** (`<<<<<<<`, `=======`, `>>>>>>>`) — leaving them in is a very common beginner mistake
4. Save the file

**Complete the merge:**
```bash
git status              # confirm which files still have conflicts
git add .                # stage the resolved file(s)
git commit               # completes the merge (Git pre-fills a merge commit message)
```

**To back out entirely and try again later:**
```bash
git merge --abort
```
Returns everything to exactly how it was before you ran `merge` — no partial state left behind.

**Conflicts by file type:**
- **JavaScript / React:** Conflicts usually appear inside function bodies or JSX blocks — read both versions carefully; sometimes both changes are needed side by side, not just "pick one."
- **Java:** Similar — watch for conflicts in import statements or method signatures, which are easy to resolve wrong if you only look at one side.
- **JSON:** Very conflict-prone because it's structurally strict — a stray comma or brace left behind after removing markers will break parsing. Validate the JSON after resolving.
- **`package-lock.json`:** Almost always safe to regenerate rather than hand-merge — see Scenario 22 below.

---

## LEVEL 7 — Undo & Recovery

### 16–17. Undoing Changes — Complete Guide

**The three "undo" commands, at a glance**

| Command | Affects | Use when |
|---|---|---|
| `git restore` | Working directory / staging area only | You haven't committed yet |
| `git reset` | Moves the branch pointer, optionally staging/working dir too | You want to rewrite **local, unpushed** history |
| `git revert` | Creates a *new* commit that undoes an old one | You need to undo a commit that's already **shared/pushed** |

**Undo unstaged changes (discard edits, not yet added):**
```bash
git restore file.txt
```
Permanently throws away uncommitted edits to that file — back to the last commit's version.

**Unstage a file (keep the edits, just remove from staging):**
```bash
git restore --staged file.txt
```

**Diagram of what reset touches:**
```text
HEAD (branch pointer)
  ↓
Commit history
  ↓
Staging Area
  ↓
Working Directory
```

**`git reset --soft HEAD~1`** — Moves HEAD back one commit, but keeps everything staged. Use when: you committed too early and want to add more before re-committing.

**`git reset --mixed HEAD~1`** (the default if you just type `git reset HEAD~1`) — Moves HEAD back one commit and **unstages** the changes, but keeps them in your working directory. Use when: you want to reorganize what goes into which commit.

**`git reset --hard HEAD~1`** — Moves HEAD back one commit **and deletes the changes entirely** from your working directory too. Use when: you're absolutely certain you want that commit's changes gone completely.

**⚠️ Why `git reset --hard` is dangerous:** It doesn't just "uncommit" — it throws away the actual file changes with no confirmation prompt. If those changes weren't pushed anywhere and you didn't note the commit hash, they can be very hard to find again (though `git reflog`, covered below, is often a lifesaver).

**Safely undoing a commit that's already pushed / shared:**
```bash
git revert <commit-hash>
```
This creates a **new** commit that applies the exact opposite change of the target commit. History moves forward, nothing is erased — safe for branches other people are also using.

**Why not just `reset` a shared branch?** If you `reset` a branch that others have already pulled, their local history and the remote's history now disagree. The next `push` requires `--force`, which can silently discard other people's commits. `revert` avoids all of this because it never rewrites existing history — it only adds to it.

**Example:**
```text
A → B → C          (C is broken)
git revert C
A → B → C → D      (D reverses C's changes; C still visible in history)
```

---

## LEVEL 8 — Rebase & Advanced Git

### 19. Git Rebase

**What is rebase?** Instead of creating a merge commit that ties two histories together, rebase takes your branch's commits and **replays them one by one on top of** another branch's latest commit — producing a clean, linear history as if you'd started your work later than you actually did.

**Merge vs rebase**

| | Merge | Rebase |
|---|---|---|
| History shape | Preserves branching, adds a merge commit | Linear — looks like it all happened in sequence |
| Commit hashes | Unchanged | **Rewritten** for every replayed commit |
| Safe on shared branches? | Yes | Only on **your own, unpushed** commits |

**Why teams use rebase:** A cleaner, easier-to-read `git log` — no tangle of merge commits for every small feature.

```bash
git switch feature
git rebase main
```
Replays `feature`'s commits on top of the current tip of `main`.

**Interactive rebase — cleaning up messy commits:**
```bash
git rebase -i HEAD~3
```
Opens an editor listing your last 3 commits, each with a keyword you can change:

| Keyword | Effect |
|---|---|
| `pick` | Keep the commit as-is |
| `reword` | Keep the changes, but let you edit the commit message |
| `edit` | Pause here so you can amend the commit's content |
| `squash` | Merge this commit into the one above it, combining messages |
| `fixup` | Like squash, but discards this commit's message entirely |
| `drop` | Delete this commit entirely |

**Example:** you made 3 sloppy commits (`wip`, `fix typo`, `actually fix it`) while building one feature — squash them into a single clean `feat: add login validation` commit before opening a Pull Request.

### 20. Rebase Conflicts

Just like merging, replaying a commit can conflict with the new base:
```bash
git rebase main
# CONFLICT (content): Merge conflict in app.js
git status                  # see what's conflicted
# edit the file, remove conflict markers
git add .
git rebase --continue        # resume replaying the remaining commits
```
If it gets messy:
```bash
git rebase --abort           # bail out completely, back to pre-rebase state
```

**Merge conflicts vs rebase conflicts:** A merge conflict happens once, resolved with a single commit. A rebase conflict can happen **repeatedly** — once for each commit being replayed — since Git applies them one at a time. This is why rebasing many commits with conflicting changes can feel tedious; each stop requires its own resolve-and-continue.

### 21. Cherry-Pick

```bash
git cherry-pick <commit-hash>
```
Applies **one specific commit** from another branch onto your current branch, without merging the whole branch.

**When it's useful:**
- A bug fix landed on another branch, and you need just that fix — not everything else on that branch
- Backporting a fix from `main` into an older `release/1.0` branch

**Cherry-pick conflicts:** Resolved exactly like merge conflicts — edit, `git add .`, then `git cherry-pick --continue` (or `--abort` to cancel).

### 22. Git Tags

```bash
git tag                                        # list tags
git tag v1.0.0                                 # lightweight tag on current commit
git tag -a v1.0.0 -m "Release 1.0.0"           # annotated tag (recommended — stores author/date/message)
git push origin v1.0.0                         # push a single tag
git push origin --tags                         # push all tags
```

**Semantic versioning:** `MAJOR.MINOR.PATCH` — e.g., `2.4.1`.
- **MAJOR** — breaking changes
- **MINOR** — new features, backward-compatible
- **PATCH** — bug fixes only

---

## LEVEL 9 — Real-World Scenarios

### 15. Git Stash

```bash
git stash               # save uncommitted changes, restore a clean working directory
git stash list           # see all stashed sets
git stash pop             # re-apply the most recent stash AND remove it from the stash list
git stash apply           # re-apply the most recent stash but KEEP it in the list too
git stash drop             # delete a specific stash without applying it
git stash clear             # delete all stashes
```

**Scenario 1 — mid-feature, need to fix production now:**
```bash
git stash                       # shelve your in-progress feature work
git switch main
git pull
git switch -c hotfix/urgent-bug
# fix, commit, push, PR, merge...
git switch feature-you-were-on
git stash pop                   # bring your work back exactly as you left it
```

**Scenario 2 — uncommitted changes, need to switch branches:**
Git normally blocks a branch switch if it would overwrite uncommitted changes. Stash first:
```bash
git stash
git switch other-branch
```

**Scenario 3 — stash only selected files:**
```bash
git stash push -m "wip: header only" -- header.css
```

**When to use stash:** Quick, temporary shelving of messy/incomplete work you're not ready to commit yet.
**When NOT to use it:** As a substitute for commits on anything you care about long-term — stashes are easy to forget, lose track of, or accidentally drop.

### 25. Common Real-World Scenarios (Full Playbook)

**Scenario 1 — I accidentally committed the wrong file.**
Cause: staged/committed with `git add .` without checking `git status` first.
```bash
git reset --soft HEAD~1        # undo the commit, keep everything staged
git restore --staged wrong-file.txt   # unstage the unwanted file
git commit -m "correct commit message"
```
Safest solution: `--soft` reset (nothing is deleted). Dangerous alternative: `--hard` reset would also delete the file's contents.

**Scenario 2 — I committed `.env`.**
```bash
git rm --cached .env
echo ".env" >> .gitignore
git add .gitignore
git commit -m "chore: remove .env from tracking"
```
⚠️ If it was already **pushed**, the secret is compromised — rotate/revoke those credentials immediately. Removing the file from future commits does not erase it from history; that requires rewriting history with tools like `git filter-repo` (an advanced, disruptive operation — treat leaked secrets as burned and rotate them rather than relying on history rewrites).

**Scenario 3 — I made changes on the wrong branch (not yet committed).**
```bash
git stash
git switch correct-branch
git stash pop
```

**Scenario 4 — I forgot to create a branch before coding.**
If not yet committed:
```bash
git switch -c feature/correct-branch-name
```
Your uncommitted changes come along automatically. If you already committed to `main` by mistake, see Scenario 28.

**Scenario 5 — I need to undo my last commit (not pushed yet).**
```bash
git reset --soft HEAD~1     # keep changes staged
# or
git reset --mixed HEAD~1    # keep changes unstaged
```

**Scenario 6 — I need to undo a commit that was already pushed.**
```bash
git revert <commit-hash>
git push
```
Safest solution: `revert`. Dangerous alternative: `git reset --hard` + `git push --force` rewrites shared history and can wipe out others' work.

**Scenario 7 — I accidentally deleted a file.**
If not committed yet:
```bash
git restore deleted-file.txt
```
If already committed after deletion, find the last commit that had it and restore it:
```bash
git log -- path/to/file.txt
git checkout <commit-hash>~1 -- path/to/file.txt
```

**Scenario 8 — I deleted a branch accidentally.**
```bash
git reflog                          # find the commit the branch pointed to
git branch recovered-branch <hash>  # recreate it
```

**Scenario 9 — Uncommitted changes but need to switch branches.**
```bash
git stash
git switch other-branch
```

**Scenario 10 — I have a merge conflict.**
See Level 6, Section 8 above — resolve manually, `git add .`, `git commit`.

**Scenario 11 — I have a rebase conflict.**
See Section 20 above — resolve, `git add .`, `git rebase --continue` (or `--abort`).

**Scenario 12 — Someone pushed changes to the branch while I was working.**
```bash
git fetch origin
git rebase origin/main      # or: git pull --rebase
```
Rebasing your local, unpushed commits on top of the new remote commits keeps history linear.

**Scenario 13 — My local branch is behind remote.**
```bash
git pull
```

**Scenario 14 — My local branch and remote have diverged.**
```bash
git status                         # Git tells you: "have X and Y different commits each"
git pull --rebase                  # replay your commits on top of theirs (cleanest)
# or, if you prefer a merge commit:
git pull                           # will create a merge commit
```

**Scenario 15 — I pushed to the wrong branch.**
```bash
git push origin --delete wrong-branch      # remove the bad push
git switch correct-branch
git push origin correct-branch
```
(Only do this if no one else has already pulled the wrong branch.)

**Scenario 16 — Several small commits I want to combine.**
```bash
git rebase -i HEAD~3
# mark the extra commits as "squash" or "fixup"
```

**Scenario 17 — I need only one commit from another branch.**
```bash
git cherry-pick <commit-hash>
```

**Scenario 18 — I accidentally ran `git reset --hard`.**
```bash
git reflog                    # find the commit hash from before the reset
git reset --hard <hash>       # restore to it
```
This works because `reflog` tracks where HEAD has been, even after a `--hard` reset — the old commit isn't deleted immediately, just unreferenced.

**Scenario 19 — I need to find who changed a particular line.**
```bash
git blame path/to/file.txt
```

**Scenario 20 — I need to find which commit introduced a bug.**
```bash
git bisect start
git bisect bad                 # current commit is broken
git bisect good <old-hash>     # this older commit was fine
# Git checks out a midpoint commit; test it, then:
git bisect good   # or
git bisect bad
# repeat until Git identifies the exact commit
git bisect reset               # return to where you started
```

**Scenario 21 — I cloned a repository and cannot push.**
Likely cause: you don't have write access, or you're not authenticated. Check:
```bash
git remote -v
ssh -T git@github.com
```
Fix: request collaborator access, or fork the repo and push to your fork instead, then open a Pull Request.

**Scenario 22 — Conflicts in `package-lock.json`.**
Safest fix — don't hand-merge a huge generated file:
```bash
git checkout --theirs package-lock.json    # or --ours, depending which side you trust
npm install                                 # regenerate it cleanly
git add package-lock.json
git commit
```

**Scenario 23 — I changed files but `git status` doesn't show them.**
Likely cause: the file is already listed in `.gitignore`, or you're looking in the wrong directory (`pwd` to check).

**Scenario 24 — Git is tracking a file that's now in `.gitignore`.**
```bash
git rm --cached path/to/file
git commit -m "chore: stop tracking file now covered by .gitignore"
```

**Scenario 25 — I need to rename a branch.**
```bash
git branch -m old-name new-name
git push origin -u new-name
git push origin --delete old-name
```

**Scenario 26 — I need to delete a remote branch.**
```bash
git push origin --delete branch-name
```

**Scenario 27 — I need to change the remote repository URL.**
```bash
git remote set-url origin https://github.com/user/new-repo.git
```

**Scenario 28 — I accidentally committed directly to `main`.**
If not pushed yet:
```bash
git branch feature/correct-branch      # create a branch pointing at the same commit
git reset --hard origin/main           # move main back to match the remote
git switch feature/correct-branch      # your commit now lives safely here
```

**Scenario 29 — I need to temporarily save work without committing.**
```bash
git stash
```

**Scenario 30 — I need to recover a deleted/lost commit.**
```bash
git reflog
git checkout <hash>          # inspect it
git branch recovered <hash>  # or bring it back permanently as a branch
```

---

### 26. Git Reflog

```bash
git reflog
```
Shows a chronological log of everywhere `HEAD` has pointed on your machine — every commit, checkout, reset, rebase, and merge — even ones no longer reachable from any branch.

**Why it's a lifesaver:** Commands like `reset --hard` or a botched rebase feel destructive, but the old commits usually aren't deleted right away — they just become unreferenced. `reflog` shows you their hashes so you can point a branch back at them.

**Recovering from:**
- **Accidental reset:** `git reflog` → find the pre-reset hash → `git reset --hard <hash>`
- **Deleted branch:** `git reflog` → find the last commit on that branch → `git branch recovered <hash>`
- **Lost commit (e.g., after amending):** same pattern — find the hash, recreate a branch there
- **Bad rebase:** `git reflog` → find the commit hash from *before* the rebase started → `git reset --hard <hash>`

Reflog entries expire eventually (default ~90 days for reachable commits, ~30 for unreachable), but for anything recent, it's your safety net.

### 27. Git Bisect

Already demonstrated in Scenario 20 above. In short: `git bisect` performs a binary search through your commit history, checking out midpoint commits and asking you "good or bad?" until it narrows down the exact commit that introduced a bug — much faster than manually checking commits one by one.

### 28. Git Blame

```bash
git blame path/to/file.txt
```
Shows, line by line, which commit (and author) last modified each line.

**When it's useful:** Understanding *why* a line of code exists — pair it with `git show <hash>` on the commit it points to, to read the original reasoning in the commit message.

**Use it to understand history, not to assign personal blame** — code changes for many legitimate reasons (refactors, requirements changes, bug fixes), and "blame" in the everyday sense is rarely the right lens for a shared codebase.

### 29. Git Diff — Advanced

```bash
git diff                    # unstaged changes vs the last commit
git diff --staged           # staged changes vs the last commit
git diff HEAD                # everything (staged + unstaged) vs the last commit
git diff branch1 branch2     # everything different between two branches
```

---

## LEVEL 10 — Professional Workflow

### 23. GitHub Pull Requests

```text
clone
  ↓
create branch
  ↓
make changes
  ↓
commit
  ↓
push branch
  ↓
create Pull Request
  ↓
code review
  ↓
changes requested → update branch → push again
  ↓
approvals
  ↓
merge PR
  ↓
delete branch
```

- **Pull Request (PR):** A request to merge one branch into another, opened on GitHub, that lets others review the diff before it lands.
- **Code review:** Teammates read your diff and comment on it.
- **Review comments:** Inline notes on specific lines.
- **Approvals:** Reviewers formally sign off before merge is allowed (often required by branch protection rules).
- **Merge / Squash and merge / Rebase and merge:** Three ways GitHub can combine a PR into the target branch — a normal merge commit, one squashed commit combining the whole PR, or replaying each commit individually (linear history).
- **Close PR (without merging):** Used when the change is abandoned.
- **Delete branch:** Common cleanup step after a PR merges — the feature branch has served its purpose.

### 24. Real-World Team Workflow

**Common branch naming conventions:**
```text
main         — stable, deployable code
develop      — integration branch (in Git Flow-style setups)
feature/*    — new features, e.g. feature/user-profile
bugfix/*     — non-urgent fixes
hotfix/*     — urgent production fixes
```

**Branching strategies:**
- **Feature branching:** Every piece of work gets its own branch off `main`, merged via PR when done. Simple, works for most teams.
- **Git Flow:** A stricter model with long-lived `main` and `develop` branches, plus `feature/`, `release/`, and `hotfix/` branches. Good for projects with scheduled releases.
- **Trunk-based development:** Everyone commits small, frequent changes directly (or via very short-lived branches) into `main`, often behind feature flags. Favored by teams practicing continuous deployment.

**A typical developer's morning:**
```bash
git switch main
git pull
git switch -c feature/login
```

**Throughout the day:**
```bash
git status
git add .
git commit -m "feat: add login form validation"
git push
```

---

## Cheat Sheet: Comparisons of Commonly Confused Commands

| Pair | Difference |
|---|---|
| `git reset` vs `git revert` | `reset` rewrites history by moving the branch pointer (safe only locally); `revert` adds a new commit that undoes an old one (safe on shared branches) |
| `git merge` vs `git rebase` | `merge` preserves branch structure with a merge commit; `rebase` replays commits for linear history, rewriting hashes |
| `git pull` vs `git fetch` | `fetch` only downloads; `pull` downloads **and** integrates (merge or rebase) |
| `git restore` vs `git reset` | `restore` affects only the working directory/staging area for specific files; `reset` moves the branch pointer itself (can affect commits) |
| `git stash apply` vs `git stash pop` | `apply` re-applies a stash and **keeps** it in the list; `pop` re-applies and **removes** it |
| `git switch` vs `git checkout` | `switch` only changes branches; `checkout` is the older, multi-purpose command that also restores files (ambiguous, being phased out for clarity) |

---

## Git Commands Cheat Sheet

**Setup**
- `git config --global user.name "..."` — set your name
- `git config --global user.email "..."` — set your email
- `git config --list` — view all settings

**Create Repository**
- `git init` — start tracking a folder
- `git clone <url>` — copy an existing remote repo locally

**Basic Workflow**
- `git status` — see current state
- `git add <file>` — stage a file
- `git commit -m "msg"` — save a snapshot
- `git log` — view history
- `git diff` — see unstaged changes

**Branches**
- `git branch` — list branches
- `git switch -c name` — create and switch to a branch
- `git branch -d name` — delete a merged branch
- `git branch -m new-name` — rename current branch

**Remote**
- `git remote -v` — list remotes
- `git push -u origin main` — push and set upstream
- `git pull` — fetch + integrate
- `git fetch` — download only

**Merge**
- `git merge branch` — combine another branch into the current one
- `git merge --abort` — cancel an in-progress merge

**Rebase**
- `git rebase main` — replay commits onto another branch
- `git rebase -i HEAD~N` — interactively edit last N commits
- `git rebase --continue` / `--abort` — resume or cancel

**Stash**
- `git stash` — shelve uncommitted changes
- `git stash pop` — reapply and remove the latest stash

**Undo**
- `git restore file` — discard unstaged changes
- `git reset --soft HEAD~1` — undo commit, keep staged
- `git revert <hash>` — safely undo a shared commit

**Recovery**
- `git reflog` — see everywhere HEAD has been
- `git bisect start` — binary-search for a bad commit

**GitHub**
- `git remote add origin <url>` — link to GitHub
- Pull Request — propose merging a branch on GitHub

**Debugging**
- `git blame file` — see who last changed each line
- `git show <hash>` — view a specific commit's full diff

---

## Which Git Command Should I Use? (Decision Guide)

| I want to... | Use |
|---|---|
| Undo local, uncommitted changes | `git restore` |
| Undo a commit that's already public/shared | `git revert` |
| Temporarily save work without committing | `git stash` |
| Bring in just one commit from another branch | `git cherry-pick` |
| Find a commit I thought I lost | `git reflog` |
| Combine several messy commits into one | `git rebase -i` |
| See who wrote a specific line | `git blame` |
| Find which commit introduced a bug | `git bisect` |
| Check what changed before I commit | `git diff` |
| Update my branch from a teammate's pushed work | `git pull` (or `fetch` + `rebase`) |
| Completely discard a commit and its changes locally | `git reset --hard` (only if unpushed!) |

---

## Practice Projects

**Project 1 — Personal Git Repository**
Create a small project folder, and practice the full basic loop:
```bash
git init
git add .
git commit -m "initial commit"
git switch -c feature/styling
# make a change
git add .
git commit -m "feat: add styling"
git switch main
git merge feature/styling
git push
```

**Project 2 — Team Simulation**
Clone the same repo into two separate folders (pretend to be "Dev A" and "Dev B"). Have each create a branch, make conflicting edits to the same file, push, and open Pull Requests against each other's changes. Practice resolving the resulting conflict and completing a real code review/merge cycle.

**Project 3 — Git Disaster Recovery**
Intentionally: commit to the wrong branch, create a merge conflict, run `git reset --hard` on something you didn't mean to, and delete a branch you needed. Then use this guide's Level 9 scenarios and `git reflog` to recover everything. This builds real confidence that mistakes in Git are (almost always) recoverable.

---

## Interview Preparation

### Beginner
**What is Git?**
- Simple answer: A tool that tracks changes to files over time so you can review, undo, and collaborate on them.
- Technical: A distributed version control system where every clone contains the full project history, not just a pointer to a central server.

**Git vs GitHub?**
- Simple: Git is the tool; GitHub is a website that hosts Git repositories and adds collaboration features.

**What is a commit?**
- Simple: A saved snapshot of your project at a point in time, with a message explaining the change.
- Technical: An immutable object identified by a SHA-1/SHA-256 hash, referencing a tree of file states and a pointer to its parent commit(s).

**What is staging?**
- Simple: A holding area where you choose exactly which changes will go into the next commit.

**What is a branch?**
- Simple: An independent line of development.
- Technical: A lightweight, movable pointer to a specific commit.

### Intermediate
**Merge vs rebase?**
- Merge preserves history exactly as it happened, including a merge commit; rebase rewrites commits to create a linear history. Merge is safe anywhere; rebase should stay on unpushed/local commits (or be done carefully, by agreement, on shared branches).

**Pull vs fetch?**
- `fetch` downloads changes without touching your working files; `pull` downloads and immediately integrates them.

**Reset vs revert?**
- `reset` moves the branch pointer and can discard history/changes (dangerous if shared); `revert` adds a new commit undoing an old one (safe for shared history).

**What is cherry-pick?**
- Applying one specific commit from one branch onto another, without merging everything else.

**What is stash?**
- A way to temporarily shelve uncommitted changes so you can switch context, then restore them later.

### Advanced
**What is reflog?**
- A local log of everywhere HEAD has pointed, used to recover commits that are no longer reachable from any branch — e.g., after a bad `reset --hard`.

**How do you resolve merge conflicts?**
- Open the conflicting file(s), manually choose/combine the correct content, remove the `<<<<<<<`/`=======`/`>>>>>>>` markers, `git add` the resolved file(s), then complete the merge with `git commit` (or `git rebase --continue` for rebases).

**What happens during `git pull`?**
- Git performs a `fetch` (downloading new commits from the remote) followed by either a `merge` or a `rebase` (depending on config) into your current branch.

**What is HEAD?**
- A pointer to the commit you currently have checked out — normally it points at the tip of whatever branch you're on.

**What is a detached HEAD?**
- A state where HEAD points directly at a specific commit instead of a branch — common when checking out an old commit to inspect it. Any new commits made here aren't attached to a branch and can be lost unless you create a branch to hold them.

### Scenario-Based
**How do you recover a deleted commit?**
- `git reflog` to find its hash, then `git branch recovered-branch <hash>` (or `git reset --hard <hash>` if it belongs on your current branch).

**What is `.gitignore`?**
- A file listing patterns for files/folders Git should never track — dependencies, secrets, build artifacts.

**What is a Pull Request?**
- A GitHub feature that proposes merging one branch into another and provides a space for code review before that merge happens.

---

## GitHub Best Practices

- Keep a clear **README** explaining what the project is and how to run it
- Use a thoughtful **`.gitignore`** from day one — added *after* secrets leak is too late
- Turn on **branch protection** for `main` (require PRs, require review approval, block force-pushes)
- Never commit **secrets** — use environment variables and a secrets manager
- Write **small, focused Pull Requests** — easier and faster to review
- Use **Issues** to track bugs/features, and link PRs to the Issues they resolve
- Cut **Releases** with semantic-versioned tags at meaningful milestones

## GitHub Actions — Beginner Introduction

**CI/CD** — Continuous Integration (automatically testing/building every change) and Continuous Delivery/Deployment (automatically shipping changes that pass).

**GitHub Actions** — GitHub's built-in automation system, defined in YAML files under `.github/workflows/`.

- **Workflow** — a full automated process, triggered by an event
- **Job** — a group of steps that run together, typically on one virtual machine
- **Step** — a single action or command within a job
- **Trigger** — the event that starts a workflow (e.g., a push, a Pull Request)

**Example workflow:**
```yaml
name: CI

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4
      - run: npm install
      - run: npm test
```

Line by line:
- `name: CI` — a label for this workflow, shown in GitHub's UI
- `on: push: branches: [main]` — run this workflow every time someone pushes to `main`
- `jobs: build:` — defines a job named "build"
- `runs-on: ubuntu-latest` — run it on a fresh Ubuntu virtual machine
- `steps:` — the sequence of actions:
  - `uses: actions/checkout@v4` — checks out your repo's code onto that VM
  - `run: npm install` — installs dependencies
  - `run: npm test` — runs your test suite; if any test fails, the workflow (and the PR/commit) is marked failed

## Git GUI Tools

- **Git Bash** — the terminal you've been using throughout this guide; the most transparent way to learn what's really happening
- **VS Code's built-in Git integration** — a visual diff/staging panel inside your editor, great once you understand the underlying commands
- **GitHub Desktop** — a simplified, beginner-friendly GUI specifically for GitHub workflows
- **Other GUI tools** — Sourcetree, GitKraken, and others, offering visual branch graphs and drag-and-drop staging

**Before relying on GUIs:** Learn the terminal commands first. GUIs hide what's actually happening, which makes conflicts, rebases, and recovery scenarios much harder to reason about when something goes wrong. Once the concepts are solid, a GUI is just a faster way to do the same things.

## Commit Best Practices

- **Atomic commits** — each commit should represent one logical change, easy to review and revert independently
- **Small commits** — easier to review, bisect, and revert than giant ones
- **What NOT to commit** — secrets, `node_modules`/build output, personal editor config, large binaries
- **Commit frequency** — commit whenever you reach a coherent, working (or at least sensible) checkpoint — don't wait until the whole feature is "done"
- **Conventional commits** — a common message format:
```text
feat: add login form
fix: resolve navbar overflow
docs: update README
refactor: simplify authentication logic
```
`feat` = new feature, `fix` = bug fix, `docs` = documentation, `refactor` = code restructuring without behavior change. This format makes history scannable and can even auto-generate changelogs.

---

## Final Learning Path (Recap)

```text
LEVEL 1  — Git Basics                    ✅ Setup, config, terminal
LEVEL 2  — Local Repository               ✅ init, add, commit, log, diff
LEVEL 3  — Branches                       ✅ create, switch, rename, delete
LEVEL 4  — GitHub                         ✅ remotes, push, connecting a repo
LEVEL 5  — Collaboration                  ✅ push/pull/fetch, clone, auth, .gitignore
LEVEL 6  — Conflicts                      ✅ merges, conflict markers, resolution
LEVEL 7  — Undo & Recovery                ✅ restore, reset, revert
LEVEL 8  — Rebase & Advanced Git          ✅ rebase, cherry-pick, tags
LEVEL 9  — Real-World Scenarios           ✅ 30 scenarios, reflog, bisect, blame
LEVEL 10 — Professional Workflow          ✅ PRs, branching strategies, CI/CD
Practice Projects + Interview Prep + Cheat Sheet
```

You now have everything needed to work confidently in a real development team: creating and managing repositories, branching and merging, collaborating through GitHub, resolving conflicts, undoing mistakes safely, and recovering lost work when things go wrong. The single best way to make this stick is Practice Project 3 — deliberately break things, then fix them using this guide.
