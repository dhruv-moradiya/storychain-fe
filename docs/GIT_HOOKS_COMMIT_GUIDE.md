# Git Hooks & Commit Convention Guide

This guide sets up **pre-commit hooks** to automatically run checks before allowing commits, and establishes a **commit message format** for consistent git history.

---

## Table of Contents

1. [Overview](#overview)
2. [Installation](#installation)
3. [Husky Setup](#husky-setup)
4. [Lint-Staged Setup](#lint-staged-setup)
5. [Commitlint Setup](#commitlint-setup)
6. [Commit Message Format](#commit-message-format)
7. [Complete Configuration](#complete-configuration)
8. [Usage Examples](#usage-examples)

---

## Overview

| Tool            | Purpose                            |
| --------------- | ---------------------------------- |
| **Husky**       | Git hooks management               |
| **lint-staged** | Run linters on staged files only   |
| **commitlint**  | Enforce commit message conventions |

### Flow Diagram

```
git commit
    │
    ▼
┌─────────────────────────┐
│  pre-commit hook        │
│  (lint-staged)          │
│                         │
│  ✓ TypeScript check     │
│  ✓ ESLint               │
│  ✓ Prettier             │
└───────────┬─────────────┘
            │ Pass?
            ▼
┌─────────────────────────┐
│  commit-msg hook        │
│  (commitlint)           │
│                         │
│  ✓ Commit format check  │
└───────────┬─────────────┘
            │ Pass?
            ▼
      Commit Created ✓
```

---

## Installation

Run these commands in **both** repositories:

```bash
# Husky - Git hooks
npm install -D husky

# lint-staged - Run linters on staged files
npm install -D lint-staged

# Commitlint - Commit message linting
npm install -D @commitlint/cli @commitlint/config-conventional
```

---

## Husky Setup

### Initialize Husky

```bash
# Initialize husky (creates .husky directory)
npx husky init
```

This creates:

- `.husky/` directory
- `.husky/pre-commit` file
- Adds `prepare` script to `package.json`

### Create Pre-Commit Hook

Update `.husky/pre-commit`:

```bash
#!/usr/bin/env sh

# Run lint-staged
npx lint-staged

# Run type check on staged files
npm run type-check
```

### Create Commit-Msg Hook

Create `.husky/commit-msg`:

```bash
#!/usr/bin/env sh

npx --no -- commitlint --edit "$1"
```

Make it executable:

```bash
chmod +x .husky/commit-msg
```

---

## Lint-Staged Setup

### Backend Configuration

Add to `package.json`:

```json
{
  "lint-staged": {
    "src/**/*.ts": ["eslint --fix", "prettier --write"]
  }
}
```

Or create `.lintstagedrc.json`:

```json
{
  "src/**/*.ts": ["eslint --fix", "prettier --write"]
}
```

### Frontend Configuration

Add to `package.json`:

```json
{
  "lint-staged": {
    "src/**/*.{ts,tsx}": ["eslint --fix", "prettier --write"],
    "src/**/*.css": ["prettier --write"]
  }
}
```

Or create `.lintstagedrc.json`:

```json
{
  "src/**/*.{ts,tsx}": ["eslint --fix", "prettier --write"],
  "src/**/*.css": ["prettier --write"]
}
```

---

## Commitlint Setup

Create `commitlint.config.js` in the root:

```javascript
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Type must be one of the following
    'type-enum': [
      2,
      'always',
      [
        'feat', // New feature
        'fix', // Bug fix
        'docs', // Documentation only
        'style', // Code style (formatting, semicolons, etc)
        'refactor', // Code refactoring
        'perf', // Performance improvement
        'test', // Adding or updating tests
        'build', // Build system or dependencies
        'ci', // CI/CD configuration
        'chore', // Other changes (maintenance)
        'revert', // Revert a previous commit
      ],
    ],
    // Type must be lowercase
    'type-case': [2, 'always', 'lower-case'],
    // Type cannot be empty
    'type-empty': [2, 'never'],
    // Subject cannot be empty
    'subject-empty': [2, 'never'],
    // Subject must not end with period
    'subject-full-stop': [2, 'never', '.'],
    // Subject max length
    'subject-max-length': [2, 'always', 72],
    // Header max length
    'header-max-length': [2, 'always', 100],
  },
};
```

---

## Commit Message Format

### Structure

```
<type>(<scope>): <subject>

[optional body]

[optional footer(s)]
```

### Types

| Type       | Description      | Example                                          |
| ---------- | ---------------- | ------------------------------------------------ |
| `feat`     | New feature      | `feat(auth): add login with Google`              |
| `fix`      | Bug fix          | `fix(api): resolve null pointer in user service` |
| `docs`     | Documentation    | `docs(readme): update installation steps`        |
| `style`    | Code style       | `style(lint): fix formatting issues`             |
| `refactor` | Code refactoring | `refactor(user): extract validation logic`       |
| `perf`     | Performance      | `perf(query): optimize database queries`         |
| `test`     | Tests            | `test(auth): add unit tests for login`           |
| `build`    | Build/deps       | `build(deps): upgrade typescript to 5.x`         |
| `ci`       | CI/CD            | `ci(github): add lint workflow`                  |
| `chore`    | Maintenance      | `chore: update .gitignore`                       |
| `revert`   | Revert commit    | `revert: feat(auth): add login`                  |

### Scope (Optional)

The scope provides context about what part of the codebase is affected:

- `auth`, `user`, `story`, `chapter` - Feature modules
- `api`, `db`, `config` - Infrastructure
- `ui`, `components` - Frontend specific
- `deps` - Dependencies

### Examples

```bash
# Feature
git commit -m "feat(story): add collaborative editing support"

# Bug fix
git commit -m "fix(auth): resolve token expiration issue"

# With body
git commit -m "feat(chapter): implement auto-save functionality

- Save draft every 30 seconds
- Show save indicator in UI
- Handle offline scenarios"

# Breaking change
git commit -m "feat(api)!: change response format for stories

BREAKING CHANGE: Response now returns data in 'items' instead of 'stories'"

# Multiple scopes
git commit -m "refactor(user,auth): consolidate validation logic"
```

---

## Complete Configuration

### Backend `package.json`

```json
{
  "name": "storychain-be",
  "scripts": {
    "dev": "cross-env NODE_ENV=development tsx watch src/server.ts",
    "build": "tsc",
    "start": "cross-env NODE_ENV=production node dist/server.js",
    "lint": "eslint . --ext .ts",
    "lint:fix": "eslint . --ext .ts --fix",
    "format": "prettier --write \"src/**/*.ts\"",
    "format:check": "prettier --check \"src/**/*.ts\"",
    "type-check": "tsc --noEmit",
    "check-all": "npm run type-check && npm run lint && npm run format:check",
    "prepare": "husky"
  },
  "lint-staged": {
    "src/**/*.ts": ["eslint --fix", "prettier --write"]
  },
  "devDependencies": {
    "husky": "^9.0.0",
    "lint-staged": "^15.0.0",
    "@commitlint/cli": "^19.0.0",
    "@commitlint/config-conventional": "^19.0.0"
  }
}
```

### Frontend `package.json`

```json
{
  "name": "storychain",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
    "format": "prettier --write \"src/**/*.{ts,tsx,css}\"",
    "format:check": "prettier --check \"src/**/*.{ts,tsx,css}\"",
    "type-check": "tsc --noEmit",
    "check-all": "npm run type-check && npm run lint && npm run format:check",
    "prepare": "husky"
  },
  "lint-staged": {
    "src/**/*.{ts,tsx}": ["eslint --fix", "prettier --write"],
    "src/**/*.css": ["prettier --write"]
  },
  "devDependencies": {
    "husky": "^9.0.0",
    "lint-staged": "^15.0.0",
    "@commitlint/cli": "^19.0.0",
    "@commitlint/config-conventional": "^19.0.0"
  }
}
```

### File Structure

```
project-root/
├── .husky/
│   ├── pre-commit        # Runs lint-staged + type-check
│   └── commit-msg        # Runs commitlint
├── commitlint.config.js  # Commit message rules
├── .lintstagedrc.json    # (optional) lint-staged config
└── package.json          # Scripts & lint-staged config
```

---

## Usage Examples

### Successful Commit

```bash
$ git add src/features/user/user.service.ts
$ git commit -m "feat(user): add email verification"

✔ Preparing lint-staged...
✔ Running tasks for staged files...
  ✔ src/**/*.ts — 1 file
    ✔ eslint --fix
    ✔ prettier --write
✔ Applying modifications from tasks...
✔ Type checking...
✔ Commit message meets format requirements

[main abc1234] feat(user): add email verification
 1 file changed, 25 insertions(+)
```

### Failed Commit - Lint Error

```bash
$ git commit -m "feat(user): add feature"

✖ Preparing lint-staged...
✖ Running tasks for staged files...
  ✖ src/**/*.ts — 1 file
    ✖ eslint --fix [FAILED]

ESLint found errors:
  error  'unused' is defined but never used  @typescript-eslint/no-unused-vars

husky - pre-commit hook exited with code 1 (error)
```

### Failed Commit - Bad Message Format

```bash
$ git commit -m "added new feature"

⧗   input: added new feature
✖   subject may not be empty [subject-empty]
✖   type may not be empty [type-empty]

✖   found 2 problems, 0 warnings

husky - commit-msg hook exited with code 1 (error)
```

### Bypass Hooks (Emergency Only)

```bash
# Skip all hooks (use sparingly!)
git commit -m "fix: emergency hotfix" --no-verify
```

---

## Quick Setup Script

Create `setup-hooks.sh` to automate setup:

```bash
#!/bin/bash

echo "Installing dependencies..."
npm install -D husky lint-staged @commitlint/cli @commitlint/config-conventional

echo "Initializing Husky..."
npx husky init

echo "Creating pre-commit hook..."
cat > .husky/pre-commit << 'EOF'
#!/usr/bin/env sh

npx lint-staged
npm run type-check
EOF

echo "Creating commit-msg hook..."
cat > .husky/commit-msg << 'EOF'
#!/usr/bin/env sh

npx --no -- commitlint --edit "$1"
EOF

chmod +x .husky/commit-msg

echo "Creating commitlint config..."
cat > commitlint.config.js << 'EOF'
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', [
      'feat', 'fix', 'docs', 'style', 'refactor',
      'perf', 'test', 'build', 'ci', 'chore', 'revert'
    ]],
    'subject-max-length': [2, 'always', 72],
    'header-max-length': [2, 'always', 100],
  },
};
EOF

echo "Setup complete!"
```

Run with:

```bash
chmod +x setup-hooks.sh
./setup-hooks.sh
```

---

## Summary Checklist

- [ ] Install husky, lint-staged, commitlint
- [ ] Initialize husky (`npx husky init`)
- [ ] Create `.husky/pre-commit` hook
- [ ] Create `.husky/commit-msg` hook
- [ ] Add `lint-staged` config to `package.json`
- [ ] Create `commitlint.config.js`
- [ ] Test with a sample commit
- [ ] Share commit format with team
