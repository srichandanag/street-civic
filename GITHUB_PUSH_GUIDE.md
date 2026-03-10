# 🚀 Push to GitHub - Quick Setup Guide

## Step 1: Create Repository on GitHub

1. Go to https://github.com/new
2. Enter repository name: `street-civic`
3. Description: "Civic issue reporting platform with interactive heatmap - React + Node.js + MongoDB"
4. Choose **Private** or **Public** (Public is better for resume showcase)
5. **Do NOT** initialize with README, .gitignore, or license (we already have these)
6. Click "Create repository"

## Step 2: Add Remote and Push

Run these commands in your terminal (from the project root):

```bash
# Add remote origin
git remote add origin https://github.com/srichandanag/street-civic.git

# Rename branch to main if needed
git branch -M main

# Push to GitHub
git push -u origin main
```

## Step 3: Authentication

You'll be prompted for authentication. Choose one:

### Option A: GitHub Personal Access Token (Recommended)
1. Go to https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Name: "street-civic-push"
4. Select scopes: `repo` (full control of private repositories)
5. Click "Generate token"
6. Copy the token
7. When git asks for password, paste the token

### Option B: SSH Key
1. Check if you have SSH key: `ssh-keygen -t ed25519 -C "srichandanag@users.noreply.github.com"`
2. Add to GitHub: https://github.com/settings/keys
3. Use SSH URL instead: `git remote add origin git@github.com:srichandanag/street-civic.git`

## Step 4: Verify Upload

After pushing, check:
- ✅ Files appear on GitHub repo
- ✅ Heatmap visualization (green dots in code) visible in frontend
- ✅ Professional structure with README

## Repository Features

Your repository will show on GitHub with:
- 📍 Interactive Heatmap (color-coded by severity)
- 🟢 Green visualization for low severity issues
- 🟡 Yellow/Orange for medium severity
- 🔴 Red for high severity issues
- 📊 Complete source code
- 📝 Professional README

---

**Need Help?** GitHub Docs: https://docs.github.com/en/get-started/importing-your-projects-to-github
