﻿# Yeme Mobile App
## Git Workflow Rules

### 1. Cloning the Repository

Clone the repository from GitHub:

```bash
git clone https://github.com/YEMECOMPANY/yeme-mobile.git
cd yeme-mobile
```

### 2. Always Start from the `dev` Branch

Before starting any work, switch to the latest `dev` branch:

```bash
git checkout dev
git pull origin dev
```

### 3. Do Not Use the `main` Branch

- Do not switch to or work on the `main` branch.
- Do not create new branches from `main`.
- Do not attempt to push code to `main`.
- The `main` branch is protected. Only the tech lead can merge into it.

### 4. Create a Feature Branch from `dev`

Create a new feature branch from `dev` for your task:

```bash
git checkout -b feature/your-task-name
```

Example:

```bash
git checkout -b feature/login-screen
```

### 5. Push Your Feature Branch

Push your branch to GitHub:

```bash
git push origin feature/your-task-name
```

### 6. Create a Pull Request (PR)

- Go to the GitHub repository
- Open a new Pull Request from `feature/your-task-name` **into `dev`**
- **Make sure the base branch is set to `dev`, not `main`**
- Add a clear title and description of your changes
- Tag @aniketdebnath

### 7. Wait for Review and Approval

Do not merge your PR before it's approved.

### Important Guidelines

- Never push directly to `main` or `dev`. Both are protected.
- Always branch off from `dev` only.
- One task = one branch = one PR.
- Write clear and meaningful commit messages.
- Use branch prefixes: `feature/*` for features, `bugfix/*` for bug fixes.

### Accidental Push into Protected Branches

- If you create a branch from `main`, your PR will be rejected.
- If you try to push to `main` or `dev`, GitHub will block it.

### Troubleshooting

If you accidentally created a branch from `main`, delete it and start over from `dev`:

```bash
git checkout dev
git pull origin dev
git checkout -b feature/correct-branch
```

For any issues or questions, contact your team lead.
