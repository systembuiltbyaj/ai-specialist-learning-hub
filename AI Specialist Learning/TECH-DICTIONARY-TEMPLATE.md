# 🔷 TECHNICAL TERMS DICTIONARY

*Searchable glossary for AI, automation, and tech terms*

---

## 🔍 **HOW TO USE THIS**

1. **Search**: `Ctrl+F` to find any term
2. **Read**: Start with the **Definition**
3. **Understand**: Read **Beginner Explanation**
4. **Apply**: Check **Use Cases**
5. **Learn More**: Follow related terms

---

## **KEY CONCEPTS**

### **Agent**

**Definition**  
An AI system that can perceive its environment, make decisions, and take actions to achieve goals. Agents can operate autonomously.

**Purpose**  
To automate complex tasks that require decision-making and multiple steps.

**Use Cases**
- Email management agent (reads emails, decides on action, sends response)
- Calendar booking agent (understands request, checks availability, books meeting)
- Customer service agent (handles inquiries, escalates if needed)

**Beginner Explanation**  
An agent is like hiring a smart assistant who can think for themselves. Tell it your goal, and it figures out the steps, makes decisions, and completes the task without asking for each step.

**Related Terms**  
Workflow, Assistant, Tool, Function Calling, Automation

**Example**  
> "I need an agent to monitor my inbox and respond to routine emails automatically."

---

### **Workflow**

**Definition**  
A pre-defined sequence of automated steps that execute in order. Unlike agents, workflows follow a fixed path unless you add conditional logic.

**Purpose**  
To automate repetitive, predictable tasks with exact same steps every time.

**Use Cases**
- Send daily digest at 9 AM
- Backup files every night
- Update spreadsheet when form is submitted
- Send notification when new lead is added

**Beginner Explanation**  
A workflow is like a recipe - you define exact steps, and they execute in that order every time. It's perfect for routine tasks that never change.

**Related Terms**  
Agent, Trigger, Action, Conditional Logic, Automation

**Example**  
> "Create a workflow: When email arrives from [address], save attachment to folder, send confirmation reply."

---

### **MCP (Model Context Protocol)**

**Definition**  
A protocol that allows Claude to connect to and use external tools, services, and data sources. MCPs act as "plugins" for Claude.

**Purpose**  
To extend Claude's capabilities beyond text by connecting it to real-world systems.

**Use Cases**
- Google Calendar MCP: Let Claude check your schedule
- GitHub MCP: Let Claude access your code repos
- Gmail MCP: Let Claude read and respond to emails
- Slack MCP: Let Claude post messages to Slack

**Beginner Explanation**  
MCPs are like "power-ups" for Claude. They let Claude do things outside its core abilities - like checking your calendar, sending emails, or accessing files.

**Related Terms**  
API, Integration, Tool, Function Calling, Claude

**Example**  
> "With Google Calendar MCP, Claude can check if you're free before suggesting meeting times."

---

### **API (Application Programming Interface)**

**Definition**  
A set of rules and protocols that allows different software applications to communicate with each other.

**Purpose**  
To enable applications to share data and functionality.

**Use Cases**
- Weather app pulls data from weather API
- Zapier uses APIs to connect apps
- Mobile app retrieves data from server
- Your app calls Claude's API to get AI responses

**Beginner Explanation**  
An API is like a translator between apps. App A wants something from App B - they use the API to talk to each other and exchange data.

**Related Terms**  
MCP, Webhook, Integration, SDK, Endpoint

**Example**  
> "Our app uses the OpenWeather API to get current temperature."

---

### **Webhook**

**Definition**  
A way for an application to send real-time data to another application when something happens.

**Purpose**  
To trigger automatic actions when events occur (real-time notifications).

**Use Cases**
- GitHub sends webhook to Slack when code is pushed
- Stripe sends webhook to your app when payment is received
- Form submission triggers webhook to store data in database
- Zapier uses webhooks to trigger workflows

**Beginner Explanation**  
A webhook is like a doorbell for apps. When something happens (event triggered), one app rings the doorbell (webhook) of another app to say "hey, something happened!"

**Related Terms**  
Trigger, Event, API, Integration, Real-time

**Example**  
> "Set a webhook: When new lead is added to CRM, send notification to Slack."

---

### **Trigger**

**Definition**  
An event or condition that starts a workflow or automation.

**Purpose**  
To define when an automation should run.

**Use Cases**
- Trigger: Email received → Action: Save attachment
- Trigger: Form submitted → Action: Create lead in CRM
- Trigger: Scheduled time (daily 9 AM) → Action: Send report
- Trigger: Button clicked → Action: Execute workflow

**Beginner Explanation**  
A trigger is the "if" in "if this happens, then do that." It's what starts an automation.

**Related Terms**  
Workflow, Action, Automation, Event, Webhook

**Example**  
> "The trigger is 'new email from [address]' and the action is 'add to spreadsheet.'"

---

### **Function Calling**

**Definition**  
A way to tell Claude about functions your application has, so Claude can call them to perform actions.

**Purpose**  
To let Claude take actions by calling external functions instead of just answering questions.

**Use Cases**
- Claude calls `send_email()` function
- Claude calls `book_calendar()` function
- Claude calls `search_database()` function
- Claude calls `execute_workflow()` function

**Beginner Explanation**  
Function calling is like giving Claude a remote control for your app. Instead of just talking, Claude can press buttons (call functions) to make things happen.

**Related Terms**  
Tool, MCP, Agent, API, Integration

**Example**  
> "Define function: `send_email(to, subject, body)` so Claude can send emails directly."

---

### **Automation**

**Definition**  
Using technology to perform tasks automatically without manual intervention.

**Purpose**  
To save time, reduce errors, and complete repetitive tasks faster.

**Use Cases**
- Email automation: Route emails to right person
- Data automation: Copy data from form to spreadsheet
- Notification automation: Alert you when something happens
- Report automation: Generate and send reports automatically

**Beginner Explanation**  
Automation means getting computers to do work instead of doing it manually. "Set it and forget it."

**Related Terms**  
Workflow, Agent, Integration, Trigger, Action

**Example**  
> "Automate the sales process: New lead → Send welcome email → Add to CRM → Notify team."

---

## **TOOLS & PLATFORMS**

### **Playwright**

**Definition**  
A software library for automating web browser actions (clicking, typing, scrolling, etc.).

**Purpose**  
To automate web browser interactions and testing.

**Use Cases**
- Web scraping (extract data from websites)
- Automated testing (test websites automatically)
- Form automation (fill forms automatically)
- Browser task automation

**Beginner Explanation**  
Playwright is like a robot that controls your web browser. You tell it "click this button" or "type this text" and it does it.

**Related Terms**  
Automation, Web Scraping, Bot, Integration

**Example**  
> "Use Playwright to automatically fill out forms on a website."

---

### **Supabase**

**Definition**  
An open-source Firebase alternative - a backend platform with database, authentication, and real-time features.

**Purpose**  
To manage data, user authentication, and backend logic for applications.

**Use Cases**
- Store user data
- Manage user authentication (login/signup)
- Store documents and files
- Build APIs without writing backend code

**Beginner Explanation**  
Supabase is like having a database and backend server without building it yourself. It handles storing data, user accounts, and more.

**Related Terms**  
Database, Backend, Firebase, Authentication, API

**Example**  
> "Use Supabase to store learning resources and user profiles."

---

### **Vercel**

**Definition**  
A cloud platform for deploying and hosting web applications (especially Next.js apps).

**Purpose**  
To deploy web apps to the internet easily and with high performance.

**Use Cases**
- Deploy a website
- Host a web application
- Deploy a Next.js app
- Automatic deployment from GitHub

**Beginner Explanation**  
Vercel is like hosting your website on the internet. Upload your code, and Vercel makes it accessible to everyone.

**Related Terms**  
Deployment, Hosting, Next.js, GitHub, Cloud

**Example**  
> "Deploy your learning hub website on Vercel in 2 minutes."

---

### **Docker**

**Definition**  
A containerization platform that packages applications with all dependencies into containers.

**Purpose**  
To make applications portable and ensure they run the same on any computer.

**Use Cases**
- Package applications for deployment
- Run applications consistently across computers
- Isolate applications
- Build complex systems with multiple services

**Beginner Explanation**  
Docker is like a shipping container for software. You put your app inside with everything it needs, and it works the same everywhere.

**Related Terms**  
Container, Deployment, DevOps, Virtual Machine

**Example**  
> "Use Docker to package your n8n automation server for easy deployment."

---

### **GitHub**

**Definition**  
A platform for version control and collaboration using Git.

**Purpose**  
To manage code, track changes, and collaborate with others.

**Use Cases**
- Store code in repositories
- Track changes to code
- Collaborate on projects
- Deploy code from GitHub

**Beginner Explanation**  
GitHub is like Google Drive for code. You save your code there, track changes, and work with others.

**Related Terms**  
Git, Repository, Version Control, Code, Deployment

**Example**  
> "Push your learning system code to GitHub for version control."

---

### **Vector Database**

**Definition**  
A database optimized for storing and searching vector embeddings (mathematical representations of text/images).

**Purpose**  
To enable semantic search and AI-powered features like "find similar content."

**Use Cases**
- Semantic search (find documents similar to query)
- Recommendation systems (find similar items)
- AI-powered chat with document knowledge base
- Image similarity search

**Beginner Explanation**  
A vector database is like a librarian that finds books by meaning, not just keywords. You ask for "books about AI" and it finds all books about AI, even if they don't have "AI" in the title.

**Related Terms**  
Embeddings, Semantic Search, Database, AI, Machine Learning

**Example**  
> "Use vector database to search through your learning resources by meaning."

---

## **GHL-SPECIFIC TERMS**

### **Workflow**

**Definition** (in GHL context)  
A sequence of automated marketing and sales actions triggered by user events.

**Purpose**  
To automate customer journey without manual intervention.

**Use Cases**
- Welcome sequence for new contacts
- Abandoned cart recovery
- Lead nurture sequences
- Customer onboarding automation

**Beginner Explanation**  
In GHL, a workflow is an automated sequence of marketing actions. New contact joins → automatic welcome email → automatic follow-up → automatic upsell.

---

### **Custom Field**

**Definition**  
Additional data fields you create in GHL to store information specific to your business.

**Purpose**  
To track custom data not available in standard fields (e.g., Favorite Color, Product Purchased, etc.).

**Use Cases**
- Track product preferences
- Store custom metrics
- Segment contacts by custom data
- Personalize communications

**Example**  
Custom field: "Preferred service type" → Use in workflows to send relevant offers

---

### **Smart List**

**Definition**  
A dynamic list that automatically adds/removes contacts based on criteria you define.

**Purpose**  
To automatically segment contacts based on behavior or data.

**Example**  
Smart list: "High-value customers" → Automatically includes anyone who spent $1000+

---

## 📚 **QUICK REFERENCE TABLE**

| Term | Category | Quick Def |
|------|----------|-----------|
| Agent | AI Concepts | AI that makes decisions autonomously |
| Workflow | Automation | Pre-defined sequence of steps |
| MCP | Claude | Protocol for Claude integrations |
| API | Integration | Way apps communicate |
| Webhook | Integration | Real-time event notification |
| Trigger | Automation | Event that starts automation |
| Function Calling | Claude | Way Claude calls external functions |
| Playwright | Tools | Browser automation library |
| Supabase | Tools | Backend & database platform |
| Vercel | Tools | Hosting platform |
| Docker | Tools | Application containerization |
| GitHub | Tools | Code repository platform |
| Vector DB | Tools | Database for AI embeddings |

---

## 🔗 **TERM RELATIONSHIPS**

```
AUTOMATION CONCEPTS:
Trigger → Workflow → Action → Result
Agent → Functions → Actions → Result

CLAUDE & INTEGRATION:
Claude + MCP = Integrated tools
Claude + API = External connections
Claude + Function Calling = Actions taken

GHL CONCEPTS:
Contact → Custom Fields → Smart List → Workflow
```

---

## ✅ **USAGE TIPS**

📌 **When learning new terms:**
1. Read the Definition
2. Check the Beginner Explanation
3. Look at Use Cases
4. Check Related Terms
5. Find an Example

📌 **When confused:**
- Use `Ctrl+F` to search related terms
- Check "Related Terms" section
- Read Beginner Explanation multiple times

---

**Last Updated**: [Date]  
**Terms Added This Week**: [Count]  
**Most Used Term**: [Term]

