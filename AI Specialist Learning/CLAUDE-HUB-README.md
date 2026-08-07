# 🔷 CLAUDE KNOWLEDGE HUB
## *Your Personal Claude Operating System*

---

## **QUICK OVERVIEW**

This is where you track **everything Claude-related**:
- Installed MCPs (Model Context Protocol servers)
- Available skills
- Setup instructions
- Best practices you've discovered
- Reusable code snippets
- Prompt templates that work

**Use this when:**
- ✓ "What MCPs do I have installed?"
- ✓ "How do I set up X?"
- ✓ "What's that best practice I discovered?"
- ✓ "Show me that code snippet for Claude"

---

## 📑 **FILES IN THIS MODULE**

### **1. installed-mcps.md** 
Your inventory of Model Context Protocol servers

**What to track:**
- MCP Name
- Status (Active / Testing / Archived)
- Setup Instructions
- Use Cases (what you use it for)
- Date Installed
- Notes

**Format:**
```markdown
## Google Calendar MCP
- **Status**: ✅ Active
- **Installed**: Jan 2025
- **Setup**: Connected via OAuth
- **Use Cases**: Schedule checking, meeting context
- **Notes**: Essential for schedule-aware agents
```

---

### **2. skills-inventory.md**
Complete list of Claude skills you've found or created

**What to track:**
- Skill Name
- Category (Frontend Design, Data Analysis, etc.)
- What it does
- Link to documentation
- Your notes

**Format:**
```markdown
## Frontend Design Skill
- **Category**: UI/UX Development
- **What it does**: Creates production-grade frontend interfaces
- **Link**: [View Skill](https://skills.anthropic.com/frontend-design)
- **Your Notes**: Great for React components, use Tailwind CSS
- **Last Used**: [Date]
```

---

### **3. best-practices.md**
Patterns you've discovered that work

**What to track:**
- Practice Name
- Description
- When to use it
- Example
- Resources

**Format:**
```markdown
## Function Calling Pattern for Automation

**What it is:**
Using Claude's tool_use to call external functions

**When to use:**
- Need Claude to interact with external systems
- Building agents that take actions
- Creating workflow automation

**Example:**
```
Prompt: "Book a meeting for 3 PM tomorrow"
Claude returns: tool_use block with calendar_function
Your system: Executes the function
Claude: Confirms booking

**Resources:**
- [Claude API Docs on Function Calling](https://docs.anthropic.com)
- Your tested examples

```

---

### **4. setup-guide.md**
Your Claude environment setup instructions

**What to include:**
- API key setup
- Claude Code installation
- MCP server setup
- Development environment config
- Your tech stack

**Format:**
```markdown
## Claude API Setup

### Step 1: Get API Key
1. Go to console.anthropic.com
2. Create new API key
3. Save to .env file

### Step 2: Install SDK
```bash
npm install @anthropic-ai/sdk
```

### Step 3: Configure Environment
- [ ] API key in .env
- [ ] Node.js 18+ installed
- [ ] npm/yarn configured

### Common Issues & Solutions
- Issue: API key not found
  Solution: Check .env path

```

---

### **5. prompt-templates.md**
Reusable Claude prompts for common tasks

**What to track:**
- Template Name
- Use Case
- The Prompt
- Tips & Variations

**Format:**
```markdown
## Agent Initialization Prompt

**Use Case:** Starting a new AI agent

**Template:**
```
You are an expert [ROLE]. Your job is to [PRIMARY TASK].

Tools available: [LIST TOOLS]

Instructions:
1. Analyze the user's request
2. Break it into steps
3. Use tools available
4. Report back with results

When you're done, summarize what you did.
```

**Tips:**
- Always include role + task
- List available tools clearly
- Set expectations for output format

**Variations:**
- For coding agents: Add "Write clean, documented code"
- For analysis: Add "Provide citations for claims"

```

---

### **6. code-snippets.md**
Ready-to-use code for Claude interactions

**What to track:**
- Snippet Name
- Language
- What it does
- The Code
- How to use

**Format:**
```markdown
## Claude API Call with Function Tools

**Language:** JavaScript  
**What it does:** Makes a Claude API call with tool use enabled

**Code:**
```javascript
const Anthropic = require("@anthropic-ai/sdk").default;

const client = new Anthropic();

const message = await client.messages.create({
  model: "claude-3-5-sonnet-20241022",
  max_tokens: 1024,
  tools: [
    {
      name: "get_weather",
      description: "Get current weather",
      input_schema: {
        type: "object",
        properties: {
          location: { type: "string" }
        }
      }
    }
  ],
  messages: [
    { role: "user", content: "What's the weather in NYC?" }
  ]
});

console.log(message.content);
```

**How to use:**
1. Copy the code into your project
2. Install `@anthropic-ai/sdk`
3. Set `ANTHROPIC_API_KEY` environment variable
4. Customize tools array for your use case

**Related:**
- Tool definition format
- Message handling
- Error handling patterns

```

---

## 🚀 **YOUR CURRENT CLAUDE SETUP**

```
╔═════════════════════════════════════════════════════════════╗
║                  CLAUDE ENVIRONMENT STATUS                  ║
╠═════════════════════════════════════════════════════════════╣
║  API Access:           ✅ Configured                        ║
║  Claude Code:          ⏳ To Install                        ║
║  MCPs Installed:       6                                   ║
║                                                             ║
║  Active MCPs:                                              ║
║    1. Google Calendar  (Schedule context)                 ║
║    2. Google Drive     (Document access)                  ║
║    3. Canva            (Design automation)                ║
║    4. Gamma            (Presentation generation)          ║
║    5. Gmail            (Email integration)                ║
║    6. [Your custom MCP] (Custom integration)              ║
║                                                             ║
║  Skills Tracked:       12                                  ║
║  Code Snippets:        8                                   ║
║  Templates:            5                                   ║
╚═════════════════════════════════════════════════════════════╝
```

---

## ✅ **SETUP CHECKLIST**

Before you start building:

- [ ] API key configured
- [ ] SDK installed (`npm install @anthropic-ai/sdk`)
- [ ] MCPs list started
- [ ] First prompt template saved
- [ ] One code snippet tested
- [ ] Best practice documented from learning

---

## 📚 **GETTING STARTED**

### **Week 1: Foundation**
1. Fill `installed-mcps.md` with MCPs you currently have
2. Fill `setup-guide.md` with your exact setup steps
3. Start `best-practices.md` with patterns you're learning
4. Save 2 `code-snippets.md` that you actually use

### **Week 2: Documentation**
1. Add skill descriptions to `skills-inventory.md`
2. Create 3 `prompt-templates.md` for things you build
3. Document common issues in `setup-guide.md`

### **Ongoing**
1. Every time you discover something useful → Add it
2. Every MCP you install → Document it
3. Every prompt that works → Save it as template
4. Every mistake → Add to setup guide

---

## 🔗 **QUICK LINKS**

| File | Purpose | Status |
|------|---------|--------|
| [installed-mcps.md](#) | MCP inventory | 📝 In Progress |
| [skills-inventory.md](#) | Skills tracking | 📝 In Progress |
| [best-practices.md](#) | Patterns discovered | ✅ Started |
| [setup-guide.md](#) | Environment setup | ✅ Started |
| [prompt-templates.md](#) | Reusable prompts | 📝 In Progress |
| [code-snippets.md](#) | Code examples | 📝 In Progress |

---

## 💡 **TIPS**

✅ **Keep it real** - Only document what you're actually using  
✅ **Update weekly** - Spend 15 mins each week adding notes  
✅ **Link everything** - Use markdown links between files  
✅ **Add dates** - Know when you learned something  
✅ **Be specific** - "Useful for X" beats generic descriptions  

---

## 🎯 **YOUR GOAL**

By end of Q1:
- ✅ Know every MCP inside and out
- ✅ 20+ code snippets ready to reuse
- ✅ 10+ best practices documented
- ✅ Can set up Claude environment from scratch
- ✅ Comfortable building Claude agents

---

**Remember:** This is YOUR personal Claude system. It grows as you learn.

