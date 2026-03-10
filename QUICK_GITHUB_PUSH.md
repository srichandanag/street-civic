# 🚀 QUICK GITHUB PUSH (2 Minutes)

## Step 1️⃣: Create Repo on GitHub

1. Go to **https://github.com/new**
2. **Repository name**: `street-civic`
3. **Description**: `Civic issue reporting platform with interactive heatmap - React + Node.js + MongoDB`
4. **Public** (for resume showcase)
5. ⚠️ **Uncheck** "Add .gitignore" and "Add README" (we have them)
6. Click **Create repository**

---

## Step 2️⃣: Push Your Code

Copy-paste these commands in your terminal:

```bash
cd "C:\Users\G.Srichandana\OneDrive\Documents\road\street-civic"

git remote add origin https://github.com/srichandanag/street-civic.git

git push -u origin main
```

---

## Step 3️⃣: When Git Asks for Password

You'll see:
```
Username for 'https://github.com': 
Password for 'https://srichandanag@github.com':
```

**Do this:**
1. Go to https://github.com/settings/tokens
2. Click **"Generate new token (classic)"**
3. Name it: `street-civic`
4. Check: ☑️ **repo**
5. Click **Generate token**
6. **Copy the token** (looks like: `ghp_` followed by alphanumeric)
7. Paste into terminal when asked for password
8. Hit Enter

---

## Step 4️⃣: Verify Success ✅

Check your repo at:
```
https://github.com/srichandanag/street-civic
```

You should see:
- ✅ All folders (frontend, backend)
- ✅ All files (README.md, package.json, etc.)
- ✅ Git history
- ✅ Green contributions

---

## 🎯 That's It!

Your Street Civic platform is now on GitHub! 🎉

**Next:**
- Share link in resume
- Test locally first (run `npm run dev`)
- Deploy to cloud (Vercel + Railway)

---

## 🆘 If Something Goes Wrong

**"fatal: remote origin already exists"**
```bash
git remote remove origin
git remote add origin https://github.com/srichandanag/street-civic.git
```

**"fatal: 'origin' does not appear to be a 'git' repository"**
```bash
# Make sure you're in street-civic folder
cd "C:\Users\G.Srichandana\OneDrive\Documents\road\street-civic"
git status  # Should work now
```

**Authentication failed**
- Use GitHub token (not password)
- Token from: https://github.com/settings/tokens

---

**Questions?** GitHub Help: https://docs.github.com/en
