# 🚀 VS CODE SETUP GUIDE

*Get your AI Specialist Learning System running in 10 minutes*

---

## **STEP 1: Create Folder Structure (2 minutes)**

### **Option A: Using Terminal**

```bash
# Navigate to where you want your system
cd ~/Documents

# Create main folder
mkdir ai-specialist-learning
cd ai-specialist-learning

# Create subfolders
mkdir -p {claude-hub,ai-tools-guide,tech-dictionary,learning-resources,ai-updates}

# Show what was created
ls -la
```

### **Option B: Using File Explorer**
1. Create folder: `ai-specialist-learning`
2. Inside it, create these subfolders:
   - `claude-hub`
   - `ai-tools-guide`
   - `tech-dictionary`
   - `learning-resources`
   - `ai-updates`

---

## **STEP 2: Set Up VS Code (3 minutes)**

### **2.1 Open Your Project**

```bash
# From terminal (if you created via terminal):
code .

# Or:
# - Open VS Code
# - File → Open Folder
# - Select ai-specialist-learning
```

### **2.2 Install Recommended Extensions**

1. **Markdown Preview Enhanced**
   - Open Extensions (Ctrl+Shift+X)
   - Search: "Markdown Preview Enhanced"
   - Click Install
   - Why: Better markdown rendering

2. **Markdown All in One**
   - Search: "Markdown All in One"
   - Click Install
   - Why: TOC, formatting, keyboard shortcuts

3. **Peacock** (Optional)
   - Search: "Peacock"
   - Click Install
   - Why: Color-code folders with your brand yellow!

### **2.3 Customize Your Theme** (Optional)

1. Click gear icon → Settings (or Ctrl+,)
2. Search: "color theme"
3. Try: "One Dark Pro" or "Dracula" (matches dark aesthetic)
4. Search: "font" → Set to your preferred mono font

---

## **STEP 3: Add Template Files (3 minutes)**

### **3.1 Copy Main README**

1. Create new file: `README.md`
   - Right-click in Explorer → New File
   - Name: `README.md`
2. Copy content from: **AI-SPECIALIST-SYSTEM.md** (provided)
3. Paste and save

### **3.2 Add Claude Hub Files**

Inside `claude-hub/` folder, create:
- `README.md` → Copy from **CLAUDE-HUB-README.md**
- `installed-mcps.md` → Copy from **INSTALLED-MCPS-TEMPLATE.md**
- `skills-inventory.md` → Create and fill (template below)
- `best-practices.md` → Create and fill (template below)
- `setup-guide.md` → Create and fill (template below)
- `prompt-templates.md` → Create and fill (template below)
- `code-snippets.md` → Create and fill (template below)

### **3.3 Add AI Tools Files**

Inside `ai-tools-guide/` folder, create:
- `README.md` → Short intro
- `quick-comparisons.md` → Copy from **AI-TOOLS-GUIDE-TEMPLATE.md**
- `claude.md`, `gpt.md`, `gemini.md`, etc. (can fill progressively)

### **3.4 Add Tech Dictionary**

Inside `tech-dictionary/` folder, create:
- `README.md` → Short intro
- `concepts.md` → Copy from **TECH-DICTIONARY-TEMPLATE.md**
- `tools.md` → Create progressively
- `ghl-specific.md` → Create progressively
- `automation.md` → Create progressively

### **3.5 Add Learning Resources**

Inside `learning-resources/` folder, create:
- `README.md` → Short intro
- `claude-learning-path.md` → Copy from **LEARNING-RESOURCES-TEMPLATE.md**
- `ghl-learning-path.md` → Create progressively
- `automation-learning-path.md` → Create progressively
- `projects-portfolio.md` → Create progressively
- `resource-library.md` → Create progressively
- `weekly-goals.md` → Create progressively

### **3.6 Add AI Updates**

Inside `ai-updates/` folder, create:
- `README.md` → Short intro
- `template.md` → Create template for weekly updates
- `2025-W1.md` → Start first week

---

## **STEP 4: Quick Fill-In Templates**

These are minimal templates you can fill in now:

### **skills-inventory.md**
```markdown
# 📋 SKILLS INVENTORY

## Frontend Design Skill
- **Category**: UI/UX
- **What It Does**: Creates production-grade interfaces
- **Link**: [View](https://skills.anthropic.com)
- **Notes**: Great for React
- **Status**: ⭐ Using

## Data Analysis Skill
- **Category**: Analysis
- **What It Does**: Data analysis and visualization
- **Link**: [View](https://skills.anthropic.com)
- **Notes**: Good for reports
- **Status**: ⭐ Learning

[Add more as you discover them]
```

### **best-practices.md**
```markdown
# 🏆 BEST PRACTICES

## Use the Right Model for the Job
**What**: Choose Claude for reasoning, GPT for speed
**When**: Before building with AI
**Example**: Use Claude for code review, GPT for quick answers

## Always Give Context
**What**: Provide relevant context to Claude
**When**: Building agents or complex prompts
**Example**: Tell Claude about your business before asking for help

[Add more patterns as you learn]
```

### **setup-guide.md**
```markdown
# 🔧 SETUP GUIDE

## My Development Environment

### Hardware
- Mac/Windows/Linux: [Your OS]
- RAM: [Your RAM]

### Software
- Node.js: v18+
- npm: Latest

### Installed
- [ ] Claude SDK
- [ ] n8n (local)
- [ ] VS Code extensions
- [ ] API keys configured

### Steps to Set Up Claude
1. Install Node.js
2. Run: npm install @anthropic-ai/sdk
3. Create .env file with ANTHROPIC_API_KEY
4. Test with example code

[Add your actual setup steps]
```

---

## **STEP 5: Connect Everything (2 minutes)**

### **5.1 Create Internal Links**

In your main `README.md`, change links from:
```markdown
👉 **[Open Claude Hub →](./claude-hub/README.md)**
```

To (they already should be in the provided templates).

### **5.2 Test Navigation**

1. Open `README.md`
2. Hover over a link with Ctrl held
3. Click to jump to that file
4. Use breadcrumb at top to go back

### **5.3 Set Up Sidebar**

1. Right-click on `claude-hub` folder → "Collapse All"
2. Do this for folders you're not currently working on
3. Keeps sidebar clean

---

## **STEP 6: Optional - Add Version Control**

### **Initialize Git** (Optional but recommended)

```bash
# In your ai-specialist-learning folder
git init

# Create .gitignore
echo "node_modules/\n.env\n.DS_Store" > .gitignore

# First commit
git add .
git commit -m "Initial learning system setup"
```

### **Benefits**
✅ Track changes to your learning over time  
✅ Easy to revert if you mess up  
✅ Can push to GitHub to back up  

---

## **STEP 7: Keyboard Shortcuts**

These shortcuts make navigation fast:

| Shortcut | Action |
|----------|--------|
| `Ctrl+P` | Quick file search |
| `Ctrl+Shift+F` | Search across all files |
| `Ctrl+F` | Search in current file |
| `Ctrl+K Z` | Zen mode (focus mode) |
| `Ctrl+B` | Toggle sidebar |
| `Ctrl+/` | Toggle line comment |
| `Ctrl+Click` | Follow link |

**Pro tip**: Use `Ctrl+P` to jump to any file instantly

---

## **STEP 8: Daily Workflow**

### **Opening Your System**

```bash
# From any terminal:
cd ~/Documents/ai-specialist-learning
code .

# Or create VS Code shortcut:
# File → Add Folder to Workspace
# Then save as .code-workspace file
```

### **Daily Routine**

```
1. Open main README.md
2. Check "Quick Stats" section
3. Jump to module you need (Ctrl+P)
4. Make updates
5. Save (Ctrl+S)
```

### **Weekly Routine**

```
1. Update weekly goals
2. Add new terms to dictionary
3. Note what you learned
4. Plan next week
```

---

## **STEP 9: VS Code Settings (Optional)**

Create `.vscode/settings.json` for better markdown experience:

```json
{
  "markdown.preview.fontFamily": "Georgia, 'Times New Roman', Times, serif",
  "markdown.preview.fontSize": 14,
  "markdown.preview.lineHeight": 1.6,
  "[markdown]": {
    "editor.fontSize": 13,
    "editor.wordWrap": "on",
    "editor.fontFamily": "Fira Code, Courier New"
  },
  "editor.formatOnSave": true,
  "files.autoSave": "afterDelay",
  "files.autoSaveDelay": 1000
}
```

---

## **QUICK CHECKLIST**

Complete these to have a working system:

- [ ] Created folder structure
- [ ] Opened in VS Code
- [ ] Installed 2 markdown extensions
- [ ] Copied main README.md
- [ ] Created claude-hub files (minimum 3 files)
- [ ] Created ai-tools files (minimum 1 file)
- [ ] Created tech-dictionary files (minimum 1 file)
- [ ] Created learning-resources files (minimum 1 file)
- [ ] Tested navigation (clicked links)
- [ ] Added content to at least 1 file

---

## **TROUBLESHOOTING**

### **"Can't find file" when clicking link**

**Solution**: Make sure file path in markdown matches actual file path. Check:
- Correct folder name (case-sensitive on Mac/Linux)
- Correct file extension (.md)
- File actually exists

Example fix:
```markdown
❌ [Link](./claude-Hub/README.md)  → Wrong folder name
✅ [Link](./claude-hub/README.md)  → Correct
```

### **Markdown preview not showing**

**Solution**: 
1. Click "Preview" button in top right of editor
2. Or press: `Ctrl+Shift+V`

### **Extensions not installing**

**Solution**:
1. Try restarting VS Code
2. Check internet connection
3. Update VS Code to latest version

### **Files not saving**

**Solution**: Check that auto-save is enabled
- File → Auto Save (should have checkmark)

---

## **NEXT STEPS AFTER SETUP**

1. **Today**: Complete setup from this guide
2. **Tomorrow**: Fill in your actual information (MCPs, learning stats, etc.)
3. **This week**: Add your first learning notes
4. **Next week**: Update weekly and start tracking progress

---

## **TIPS FOR SUCCESS**

✅ **Start small** - Don't try to fill everything at once  
✅ **Use what you build** - Reference it daily  
✅ **Update weekly** - 15 mins per week keeps it fresh  
✅ **Link ideas** - Connect related concepts  
✅ **Search often** - Ctrl+Shift+F is your friend  
✅ **Review monthly** - See how much you've learned  

---

## **YOUR COMPETITIVE ADVANTAGE**

You now have:
- ✅ Organized learning system
- ✅ Centralized reference for all AI/automation knowledge
- ✅ Easy way to track progress
- ✅ Searchable dictionary of 100+ concepts
- ✅ Personal operating system for your skills

Most people just hope they remember. You're building a **system**.

---

**Setup Time**: ~10 minutes  
**Start Learning**: Immediately after  
**ROI**: 10x faster learning over next 6 months  

---

## 🎯 **READY?**

1. Open Terminal
2. Run the commands from Step 1
3. Follow Steps 2-5
4. Start learning!

Remember: The system only works if you use it. Update it weekly, and by end of 2025, you'll have built an incredible resource that shows your entire learning journey.

---

**Questions?** Check VS Code docs: https://code.visualstudio.com/docs

**Let's go** 🚀

