import type { GlossaryTerm, GlossaryCategory } from "@/app/lib/types";

// Glossary adapted from BrewedOps (https://brewedops.com/glossary) — 58 terms.
export const GLOSSARY_CATEGORIES: GlossaryCategory[] = [
  {
    "key": "AI & Agents",
    "color": "#A78BFA"
  },
  {
    "key": "Code & Build",
    "color": "#10B981"
  },
  {
    "key": "Web & Servers",
    "color": "#3B82F6"
  },
  {
    "key": "Data",
    "color": "#F59E0B"
  },
  {
    "key": "Marketing & Ops",
    "color": "#EC4899"
  }
];

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    "term": "LLM",
    "fullName": "Large Language Model",
    "category": "AI & Agents",
    "tagline": "The brain behind ChatGPT, Claude, and Gemini.",
    "eli5": "An LLM is a program that has been shown so much text from the internet (books, articles, code, conversations) that it learned the patterns of how humans write. When you ask it a question, it doesn't look up the answer - it predicts, one word at a time, what would naturally come next. Do that fast enough and it produces full sentences, essays, even working code.",
    "analogy": "Imagine someone who read every book in every library, then got really good at finishing your sentences. They don't \"know\" facts in their head - they've just seen so many similar sentences that the next word feels obvious to them.",
    "example": "When you ask ChatGPT \"What's the capital of France?\", it's not looking it up. It's noticed that across millions of texts, \"Paris\" almost always follows that question."
  },
  {
    "term": "Prompt",
    "fullName": "",
    "category": "AI & Agents",
    "tagline": "The instructions you give an AI.",
    "eli5": "A prompt is whatever you type into an AI - your question, your task, any context you include. The exact wording matters a LOT, because the AI has nothing to go on except those words. Vague prompt = vague answer. Specific prompt with examples = useful answer.",
    "analogy": "Like asking a freelancer to design you a logo. \"Make me a logo\" gets you something generic. \"Make me a logo for a coffee shop, dark colors, vintage diner feel, no graphics with cups\" gets you something usable.",
    "example": "\"Write a poem\" -> generic poem. \"Write a 4-line poem about Monday mornings, in the voice of a tired barista\" -> something specific and good."
  },
  {
    "term": "Token",
    "fullName": "",
    "category": "AI & Agents",
    "tagline": "The chunks of text an AI counts.",
    "eli5": "AIs don't see words the way you do - they break text into smaller pieces called tokens. Common short words (\"the\", \"and\") are 1 token. Long or rare words get split into 2-3 tokens. Almost every AI service charges by the token and limits how many you can send at once.",
    "analogy": "Like text messages back when you paid per character. A token is the smallest billable chunk.",
    "example": "Roughly 100 tokens equals 75 English words. A normal email is 200-400 tokens. A long article might be 5,000."
  },
  {
    "term": "Context Window",
    "fullName": "",
    "category": "AI & Agents",
    "tagline": "How much an AI can hold in mind at once.",
    "eli5": "The context window is how many tokens an AI can pay attention to in a single conversation. Anything beyond that gets dropped. If you've ever felt like ChatGPT \"forgot\" what you said earlier in a long chat, that's why - the start of the conversation slid out of its window.",
    "analogy": "Like a whiteboard with limited space. You can keep writing, but old stuff has to be erased to make room for new stuff.",
    "example": "Modern models hold 100K-1M tokens (a small novel). Older models held only a few thousand - that's why early chatbots forgot things so fast."
  },
  {
    "term": "Hallucination",
    "fullName": "",
    "category": "AI & Agents",
    "tagline": "When an AI makes things up confidently.",
    "eli5": "Sometimes an AI invents facts, citations, links, or function names that sound completely real but don't actually exist. It's not trying to lie - it's just predicting what plausible text looks like, and plausible-looking text isn't always true. The fix is to verify anything that matters: dates, numbers, names, code references.",
    "analogy": "Like a confident new hire who doesn't want to admit they don't know something, so they make up an answer that sounds reasonable.",
    "example": "Asking an AI for a quote from a book and it gives you a beautifully written passage that the author never actually wrote."
  },
  {
    "term": "RAG",
    "fullName": "Retrieval-Augmented Generation",
    "category": "AI & Agents",
    "tagline": "AI that looks things up before answering.",
    "eli5": "Instead of relying on what the AI memorized when it was trained (which can be old or wrong), RAG fetches fresh, relevant information from a source you control - your company docs, a database, a website - and gives it to the AI as part of the prompt. The AI then answers using that real information.",
    "analogy": "Like the difference between a friend giving you trivia from memory versus that same friend Googling it first then answering. Same person, way more reliable.",
    "example": "A customer support chatbot that answers from your actual help articles (not whatever the AI learned during training) is using RAG."
  },
  {
    "term": "Embedding",
    "fullName": "",
    "category": "AI & Agents",
    "tagline": "Turning text into numbers so AI can compare meaning.",
    "eli5": "An embedding turns a piece of text into a long list of numbers that represents its meaning. Sentences with similar meanings end up with similar number patterns. This is how AI can tell that \"puppy\" and \"dog\" are related, or find articles \"about the same topic\" without exact keyword matches.",
    "analogy": "Like giving every word and sentence GPS coordinates in a giant \"meaning map.\" Words about love cluster together. Words about cooking cluster somewhere else.",
    "example": "Spotify's \"songs you might like\" works on similar embedding math - songs you love and new songs get scored on how close their patterns are."
  },
  {
    "term": "Fine-tuning",
    "fullName": "",
    "category": "AI & Agents",
    "tagline": "Teaching an AI extra skills with your data.",
    "eli5": "Take a general AI and train it more on your specific examples until it gets really good at one specific task. The AI keeps everything it already learned, but adjusts to favor your style, format, or vocabulary.",
    "analogy": "Like sending a college graduate to an industry-specific bootcamp. They already know how to learn - you're just teaching them the language of your field.",
    "example": "Most projects don't actually need fine-tuning anymore - good prompts plus RAG usually work as well. Reach for fine-tuning when you need a very specific tone or format the AI can't reliably hit on its own."
  },
  {
    "term": "Agent",
    "fullName": "",
    "category": "AI & Agents",
    "tagline": "An AI that takes actions, not just chats.",
    "eli5": "A regular AI just talks back. An agent has tools - it can read files, browse websites, run code, send messages, edit databases. It plans steps, takes them, sees what happened, and adjusts. The line between \"chatbot\" and \"agent\" is whether it can actually do things in the real world.",
    "analogy": "A chatbot is a friend who gives you advice over the phone. An agent is a friend who hangs up, drives over, and fixes the problem.",
    "example": "You ask: \"Find this week's lowest grocery prices in my area and add the items to a shopping list.\" A chatbot tells you how to do it. An agent goes, finds the prices, builds the list, and shares it with you."
  },
  {
    "term": "MCP",
    "fullName": "Model Context Protocol",
    "category": "AI & Agents",
    "tagline": "A universal plug for AI tools.",
    "eli5": "MCP is a standard format for connecting any AI to any tool or data source. Without it, every AI vendor would need to build a custom integration with every tool. With it, you write the connection once (an \"MCP server\") and any MCP-compatible AI can use it.",
    "analogy": "Like USB-C. Before USB-C, every device needed its own cable. After, one cable type works with phones, laptops, headphones, monitors. MCP is doing that for AI integrations.",
    "example": "A GitHub MCP server lets any AI read your pull requests, leave comments, and merge branches without each AI company having to build that integration themselves."
  },
  {
    "term": "Vibe Coding",
    "fullName": "",
    "category": "AI & Agents",
    "tagline": "Building software by describing what you want.",
    "eli5": "Instead of typing every line of code yourself, you describe what you want in plain English and let an AI write the code for you. You read what it produced, test it, point out what's wrong, and iterate until it works. You're less of a typist and more of a director.",
    "analogy": "Like the difference between writing a novel longhand and dictating one to a professional ghostwriter. The story is yours; the typing is theirs.",
    "example": "Tools like Claude Code, Cursor, and v0 let people without traditional CS degrees ship working apps because the AI handles the syntax while the human handles the intent."
  },
  {
    "term": "System Prompt",
    "fullName": "",
    "category": "AI & Agents",
    "tagline": "The hidden instructions that shape every AI conversation.",
    "eli5": "Before you type your first message, the AI is already reading a hidden setup message that tells it who it is, how to behave, what it can and can't do. ChatGPT's system prompt makes it polite and helpful. A custom AI tutor's system prompt could make it patient and ask follow-up questions.",
    "analogy": "Like the first day of a new job. Before any customer walks in, your manager tells you the rules: \"Always greet by name. Don't discuss prices. Smile.\" That briefing shapes everything that follows.",
    "example": "When you build your own AI assistant, the system prompt is where you define its personality, expertise, and rules - and the user can't see it."
  },
  {
    "term": "API",
    "fullName": "Application Programming Interface",
    "category": "Code & Build",
    "tagline": "How two pieces of software talk to each other.",
    "eli5": "An API is a defined way for one app to ask another app for information or actions. Your weather app doesn't track the weather itself - it asks a weather API. Your Uber app doesn't calculate routes - it asks Google Maps' API. The asking app says \"give me X\" in a specific format, and the answering app sends \"X\" back in a specific format.",
    "analogy": "Like a drive-thru. You don't go into the kitchen. You speak into a speaker (the API) using the menu's exact item names, and the food comes out the window. You don't need to know how the kitchen works - just what to ask for.",
    "example": "When you \"Sign in with Google\" on a new website, that website is calling Google's API to verify your identity."
  },
  {
    "term": "Webhook",
    "fullName": "",
    "category": "Code & Build",
    "tagline": "An automatic phone call between apps.",
    "eli5": "A regular API call is like you calling someone to ask \"anything new?\" A webhook flips that around - the other app calls YOU the moment something happens, so you don't have to keep checking. You give the other app a URL, they hit it whenever the event you care about occurs.",
    "analogy": "Like the difference between checking your mailbox every hour to see if a package arrived, and having the delivery person ring your doorbell when it does. Same outcome, way less effort.",
    "example": "Stripe sends a webhook the instant a customer pays, so your system can fulfill the order immediately. Without webhooks, you'd have to keep asking \"did anyone pay yet?\" every minute."
  },
  {
    "term": "CLI",
    "fullName": "Command Line Interface",
    "category": "Code & Build",
    "tagline": "Running programs by typing commands.",
    "eli5": "A CLI is a black-screen terminal where you type text commands instead of clicking buttons. It looks scary and old-school, but it's often the fastest, most precise way to control your computer. Every developer tool eventually shows up as a CLI because it's easier to script and automate than clicking through menus.",
    "analogy": "Like the difference between using a TV remote and learning the actual button codes. Slower to start, way more powerful once you know them.",
    "example": "Typing `npm install` to add a JavaScript library, or `git push` to upload your code to GitHub - both are CLI commands."
  },
  {
    "term": "IDE",
    "fullName": "Integrated Development Environment",
    "category": "Code & Build",
    "tagline": "A souped-up text editor for writing code.",
    "eli5": "An IDE is a text editor with superpowers built specifically for coding: autocomplete, syntax highlighting, error detection, debugging, version control, and a built-in terminal - all in one window. VS Code is the most popular one. Cursor is VS Code with AI built in.",
    "analogy": "Like the difference between writing in Notepad and writing in Microsoft Word. Notepad just stores letters. Word catches your spelling, formats headings, and tracks changes.",
    "example": ""
  },
  {
    "term": "Git",
    "fullName": "",
    "category": "Code & Build",
    "tagline": "A time machine for your project.",
    "eli5": "Git tracks every change you make to your files. Every save creates a snapshot you can return to. You can see exactly what changed yesterday, undo a change from last week, or run two versions of the project side by side. It's how teams of developers can work on the same code without constantly overwriting each other.",
    "analogy": "Like Google Docs version history, but for any folder of files - and dramatically more powerful because it tracks why each change was made.",
    "example": "You broke something today. With Git, you can ask \"what changed since yesterday?\" and see exactly what to undo."
  },
  {
    "term": "GitHub",
    "fullName": "",
    "category": "Code & Build",
    "tagline": "A website for storing and sharing code projects.",
    "eli5": "GitHub is where teams put their code so everyone on the team can pull it down, make changes, and push them back. It's also a giant social network for code - you can browse other people's projects, suggest improvements, and use it as a portfolio when applying for jobs.",
    "analogy": "Like Google Drive for code, but with built-in tools for reviewing changes and merging work from many people.",
    "example": "When a tutorial says \"clone this repo,\" they mean download a copy of someone's GitHub project to your computer."
  },
  {
    "term": "Repo",
    "fullName": "Repository",
    "category": "Code & Build",
    "tagline": "A folder of code that Git is tracking.",
    "eli5": "A repo is a project folder plus the entire history of every change anyone has made to it. Open the folder and it looks normal. Look under the hood, and there's a hidden record of every save, who made it, and when.",
    "analogy": "A regular folder is a snapshot. A repo is a folder plus a security camera that recorded everything that ever happened inside it.",
    "example": ""
  },
  {
    "term": "Branch",
    "fullName": "",
    "category": "Code & Build",
    "tagline": "A parallel copy where you experiment safely.",
    "eli5": "A branch lets you make changes to your project without touching the live version. You build the new feature on the branch, test it, fix issues - and only when it's ready do you merge it back into the main project. If the experiment goes wrong, you just throw the branch away.",
    "analogy": "Like writing a draft of an essay in a separate document instead of editing the final version directly. The original stays safe while you mess around.",
    "example": "Standard practice: a branch named `main` is what users see, and feature branches like `add-dark-mode` are works in progress."
  },
  {
    "term": "Commit",
    "fullName": "",
    "category": "Code & Build",
    "tagline": "A saved snapshot of your code, with a note.",
    "eli5": "A commit is a checkpoint. You group some related changes, write a short message describing what you did, and save it. Later, you (or anyone else) can read those messages to understand the project's history. Good commits are small and tell a story; bad commits are huge and titled \"stuff.\"",
    "analogy": "Like saving your progress in a video game with a note: \"got the key from the dragon.\" Now you can come back to that exact spot later.",
    "example": ""
  },
  {
    "term": "Pull Request",
    "fullName": "PR",
    "category": "Code & Build",
    "tagline": "\"Hey team, please merge my changes.\"",
    "eli5": "When you finish work on a branch, you open a pull request: a formal proposal to merge your changes into the main code. Your teammates can read every change line by line, leave comments, request fixes, and approve. It's how teams keep quality high before changes go live.",
    "analogy": "Like submitting an article to an editor before it gets published. Nothing goes live until someone signs off.",
    "example": ""
  },
  {
    "term": "Deploy",
    "fullName": "",
    "category": "Code & Build",
    "tagline": "Pushing your code from your laptop to a live server.",
    "eli5": "Writing code on your computer is one thing. Deploying means actually putting that code on a server somewhere on the internet so other people can use it. Modern services (Vercel, Netlify, Heroku) automate this - you push to GitHub and they handle the rest. Older setups require you to manually upload files and restart things.",
    "analogy": "Like the difference between writing a screenplay and actually putting a movie in theaters. The script needs to get from your desk into the world.",
    "example": ""
  },
  {
    "term": "Localhost",
    "fullName": "",
    "category": "Code & Build",
    "tagline": "Your own computer pretending to be a website.",
    "eli5": "When you run a development server, your computer hosts the app at a special internal address (usually localhost:3000 or similar). Only you can see it. It exists so you can test changes safely before deploying to the real internet.",
    "analogy": "Like rehearsing a play in your living room before the public show. Same play, no audience yet.",
    "example": ""
  },
  {
    "term": "Framework",
    "fullName": "",
    "category": "Code & Build",
    "tagline": "A pre-built skeleton for your app.",
    "eli5": "Frameworks handle the boring foundational work (how pages connect, how data flows, how the UI updates) so you can focus on what makes your app unique. React, Vue, Next.js, Django, Rails - all frameworks. They have rules and patterns you follow, in exchange for huge head starts.",
    "analogy": "Like buying a furnished apartment instead of building a house from raw lumber. You give up some choices in exchange for not having to figure everything out from scratch.",
    "example": ""
  },
  {
    "term": "Library",
    "fullName": "",
    "category": "Code & Build",
    "tagline": "Pre-written code you import and use.",
    "eli5": "Why write everything from scratch when someone already solved that exact problem? A library is a chunk of reusable code published online for anyone to use. Need to draw a chart? Use Chart.js. Need icons? Use Lucide. NPM, the JavaScript package registry, has 3 million+ libraries.",
    "analogy": "Frameworks are the apartment building. Libraries are the IKEA furniture you put in it. You compose your app from many small libraries.",
    "example": ""
  },
  {
    "term": "Component",
    "fullName": "",
    "category": "Code & Build",
    "tagline": "A reusable piece of UI.",
    "eli5": "Modern websites are built from components - self-contained pieces of interface that you can drop in anywhere. A \"button\" component, a \"navigation bar\" component, a \"user card\" component. You define each one once, then reuse it across your whole app. Change it in one place and it updates everywhere.",
    "analogy": "Like LEGO bricks. Each brick is simple and identical wherever it appears, but you can combine many to build anything.",
    "example": ""
  },
  {
    "term": "Frontend",
    "fullName": "",
    "category": "Code & Build",
    "tagline": "What users see and click.",
    "eli5": "The frontend is the visible part of any app: the buttons, layouts, animations, colors, forms. It runs inside the user's browser (or phone). Frontend code is what you'd see if you \"view source\" on any web page. Made with HTML, CSS, and JavaScript.",
    "analogy": "Frontend is the dining room of a restaurant - tables, decor, menus, the experience.",
    "example": ""
  },
  {
    "term": "Backend",
    "fullName": "",
    "category": "Code & Build",
    "tagline": "The invisible engine behind every app.",
    "eli5": "The backend runs on servers, far away from the user. It handles the stuff that doesn't belong in the user's browser: storing data, processing payments, checking passwords, sending emails. The frontend asks the backend questions; the backend answers.",
    "analogy": "Backend is the kitchen. The diner never goes inside, but every order eventually comes from there.",
    "example": ""
  },
  {
    "term": "TypeScript",
    "fullName": "",
    "category": "Code & Build",
    "tagline": "JavaScript that catches typos before they crash.",
    "eli5": "Plain JavaScript happily lets you do nonsense like multiplying a number by a piece of text - then crashes at runtime. TypeScript adds type labels (this variable is a number, that one is text) so the editor catches those mistakes BEFORE you ship. Slightly more typing upfront, dramatically fewer bugs in production.",
    "analogy": "Like spell-check for code. Yes, it occasionally complains about things you meant to do, but it catches a hundred real mistakes for every false alarm.",
    "example": ""
  },
  {
    "term": "HTTP/HTTPS",
    "fullName": "",
    "category": "Web & Servers",
    "tagline": "The language browsers use to talk to servers.",
    "eli5": "Every time you visit a website, your browser sends an HTTP request: \"Please send me the page at this address.\" The server responds with the page's content. HTTPS is the same thing with one big upgrade: the request is encrypted, so anyone listening to the connection (your coffee shop's wifi, for instance) can't read what you're sending.",
    "analogy": "HTTP is sending a postcard - anyone in the post office can read it. HTTPS is sending a sealed envelope.",
    "example": "The lock icon next to a URL means HTTPS. No lock = anyone on the network could intercept your password."
  },
  {
    "term": "DNS",
    "fullName": "Domain Name System",
    "category": "Web & Servers",
    "tagline": "The internet's phone book.",
    "eli5": "Computers find each other on the internet using numbers (IP addresses, like 142.250.80.78). Humans remember names. DNS is the system that translates names like \"google.com\" into the actual numbers your computer needs. It happens invisibly every time you type a URL.",
    "analogy": "Imagine if you had to dial 7-digit phone numbers to reach friends. DNS is contacts - you tap the name, it dials the number for you.",
    "example": "When DNS breaks, websites become unreachable even though they're running fine. The \"site\" exists, your computer just can't find its address."
  },
  {
    "term": "Domain",
    "fullName": "",
    "category": "Web & Servers",
    "tagline": "The name people type to reach a website.",
    "eli5": "A domain is the human-readable address you rent yearly from a domain registrar. The domain points (via DNS) to wherever your site is actually hosted. You don't own the domain forever - if you stop paying the renewal fee, someone else can buy it.",
    "analogy": "",
    "example": "You own the rights to use \"yourname.com\" as long as you keep paying the registrar. The site behind the name can move servers, but the name keeps pointing wherever you tell it."
  },
  {
    "term": "VPS",
    "fullName": "Virtual Private Server",
    "category": "Web & Servers",
    "tagline": "A computer in the cloud you rent for cheap.",
    "eli5": "A VPS is a slice of a real, physical server, with its own operating system and full admin access. You pay $5-50/month and get to install whatever software you want. It's the sweet spot between cheap shared hosting (limited control) and expensive dedicated servers (overkill for most things).",
    "analogy": "Like renting an apartment instead of a hotel room (shared hosting) or buying a whole house (dedicated server). Same building as other tenants, but the inside is yours.",
    "example": ""
  },
  {
    "term": "CDN",
    "fullName": "Content Delivery Network",
    "category": "Web & Servers",
    "tagline": "A network of servers worldwide that delivers content fast.",
    "eli5": "Without a CDN, every visitor to your site has to reach your one server - which might be slow if they're far away. A CDN automatically copies your images, videos, and static files to dozens of servers around the world, so each visitor gets the closest copy. Pages load way faster.",
    "analogy": "Like a popular store opening branches in every major city instead of making everyone drive to one giant warehouse.",
    "example": "Cloudflare and Vercel both work as CDNs. Most images and videos you load on the modern web come through one."
  },
  {
    "term": "Cookie",
    "fullName": "",
    "category": "Web & Servers",
    "tagline": "A tiny note your browser stores per website.",
    "eli5": "Cookies are small bits of data that a website can save in your browser. Every time you visit that same site again, your browser sends the cookie back automatically - which is how the site remembers your login, your cart, your dark-mode preference. Some cookies are useful. Others track you across the web for ads, which is why every site asks for cookie consent now.",
    "analogy": "Like a coat-check ticket. The website hands you a stub when you arrive; you show it next time so they can pull up your stuff.",
    "example": ""
  },
  {
    "term": "Auth",
    "fullName": "Authentication",
    "category": "Web & Servers",
    "tagline": "Proving you are who you say you are.",
    "eli5": "Authentication is logging in - proving you're YOU. Authorization is what you're allowed to do once logged in - admins can edit, regular users can only read. People constantly mix the two up. Modern apps usually use tokens (small strings) instead of re-checking passwords on every action.",
    "analogy": "Authentication is the bouncer checking your ID at the club door. Authorization is what wristband color you got - VIP, regular, or staff.",
    "example": ""
  },
  {
    "term": "OAuth",
    "fullName": "",
    "category": "Web & Servers",
    "tagline": "\"Sign in with Google\" magic.",
    "eli5": "OAuth lets you log into a new app using your existing Google/Apple/Facebook/GitHub account, WITHOUT giving the new app your password. The new app asks Google \"is this person legit?\" Google asks you \"is it OK if this app sees your email?\" If you say yes, the app gets a temporary token, never your actual password.",
    "analogy": "Like a hotel keycard for one room. The hotel doesn't hand out master keys - they make a temporary card that only works for what you need.",
    "example": "Every \"Sign in with X\" button works this way. Spotify asking to access your Facebook friends, an app asking to read your Google Calendar - all OAuth."
  },
  {
    "term": "JWT",
    "fullName": "JSON Web Token",
    "category": "Web & Servers",
    "tagline": "A login pass that proves it hasn't been tampered with.",
    "eli5": "A JWT is a string that contains your identity and what you're allowed to do, signed by the server. Once you log in, the server hands you the token. You include it with every future request, and the server can trust it without re-checking the database every time. It's how modern apps stay logged in for days without you re-entering your password.",
    "analogy": "Like an event wristband with a hologram. The bouncer doesn't need to call HQ to verify you - the hologram proves the wristband is real.",
    "example": ""
  },
  {
    "term": "Cron",
    "fullName": "",
    "category": "Web & Servers",
    "tagline": "A scheduled job: run X at this time.",
    "eli5": "Cron is the standard way to schedule automated tasks on a server: \"send me a sales report every Monday at 9 AM,\" \"back up the database every night at 2 AM,\" \"delete temp files every hour.\" It uses a quirky 5-character syntax that's been the standard for 40+ years.",
    "analogy": "Like a kitchen timer that never stops resetting. You set it once, it runs forever.",
    "example": "The expression \"0 9 * * MON\" means \"9 AM every Monday.\" Mysterious-looking, but every backend developer eventually learns to read it."
  },
  {
    "term": "nginx",
    "fullName": "",
    "category": "Web & Servers",
    "tagline": "The traffic cop in front of your web app.",
    "eli5": "Nginx (pronounced \"engine-x\") sits between the public internet and your actual app. It handles HTTPS encryption, serves static files (images, CSS) really fast, can route /api requests to one app and /home requests to another, and fends off some basic attacks. Almost every production website has nginx (or its cousin, Caddy) in front of it.",
    "analogy": "Like a hotel concierge. Guests don't walk into the kitchen, the office, or the housekeeping room directly - the concierge directs each request to the right place.",
    "example": ""
  },
  {
    "term": "pm2",
    "fullName": "",
    "category": "Web & Servers",
    "tagline": "A babysitter that keeps your Node app running.",
    "eli5": "When you start a Node.js app, it runs as a process. If it crashes (and it will, eventually), the website goes down until someone notices. PM2 watches your process, restarts it instantly if it crashes, lets you check logs, and starts it back up after the server reboots. Pretty much non-negotiable for production Node apps.",
    "analogy": "Like an autopilot for your app. If anything goes wrong, it grabs the wheel before the plane stalls.",
    "example": ""
  },
  {
    "term": "Cache",
    "fullName": "",
    "category": "Web & Servers",
    "tagline": "A saved copy that loads way faster.",
    "eli5": "Computing things from scratch is slow. Caching saves the result of expensive work somewhere fast - your browser, your CDN, your server's memory - so the next time someone asks for the same thing, you just hand back the saved copy. Done well, caching makes apps feel instant. Done poorly, caches go stale and you see old data when you didn't expect to.",
    "analogy": "Like meal-prepping for the week. The cooking happens once; the eating is fast for days.",
    "example": "Your browser caches images so re-visiting a site doesn't re-download them. CDNs cache pages so distant users don't wait for the original server."
  },
  {
    "term": "Database",
    "fullName": "",
    "category": "Data",
    "tagline": "An organized place to store data.",
    "eli5": "A database is a structured place to store data so you can quickly find, add, update, and connect it. Spreadsheets are technically databases. Excel is a database. The web runs on more powerful databases - SQLite, PostgreSQL, MySQL, MongoDB - that can handle millions of rows and thousands of users at once.",
    "analogy": "Like the difference between a stack of receipts in a shoebox and a tax filing cabinet with labeled folders. Same data, hugely different ability to find what you need.",
    "example": ""
  },
  {
    "term": "SQL",
    "fullName": "Structured Query Language",
    "category": "Data",
    "tagline": "The language for asking databases questions.",
    "eli5": "SQL is how you talk to most databases. You write a question in a specific format and the database returns the matching rows. It's been the standard for 50 years and works on basically every relational database, so learning it once is a permanent skill.",
    "analogy": "Like the search bar in Gmail. You type a query, the system filters down to matching items.",
    "example": "\"SELECT name, email FROM users WHERE created_at > '2024-01-01'\" means \"give me the name and email of every user created after Jan 1, 2024.\""
  },
  {
    "term": "NoSQL",
    "fullName": "",
    "category": "Data",
    "tagline": "Databases that don't use SQL.",
    "eli5": "NoSQL databases store flexible documents instead of rigid tables. You can drop in any shape of data without designing a schema first, which is great when your needs are still evolving. Trade-off: complex relationships between data are harder to express and slower to query than in SQL databases.",
    "analogy": "SQL is a spreadsheet with strict columns. NoSQL is a notebook where each page can look totally different.",
    "example": "Popular NoSQL databases: MongoDB, Firebase Firestore, DynamoDB. Often used for chat messages, activity feeds, or any data where shape varies."
  },
  {
    "term": "Schema",
    "fullName": "",
    "category": "Data",
    "tagline": "The shape and structure of your data.",
    "eli5": "A schema defines what each piece of data should look like: which fields exist, what type each one is, what's required vs optional. \"A user has a name (text), age (number), and signup date (timestamp), and email is required\" - that's a schema. Changing it after you have real data is delicate.",
    "analogy": "Like a form template. Everyone who fills it out has to follow the same blanks.",
    "example": ""
  },
  {
    "term": "Migration",
    "fullName": "",
    "category": "Data",
    "tagline": "Updating your database structure safely.",
    "eli5": "When you want to add a new column or rename a table on a database that's already in production with real data, you can't just change it - you'd break things. A migration is a script that transforms the old structure into the new one without losing data. Migrations are versioned and applied in order so every environment ends up the same.",
    "analogy": "Like remodeling a house while people are living in it. You can't just knock down the walls - you need a plan that keeps the house livable through every step.",
    "example": ""
  },
  {
    "term": "JSON",
    "fullName": "JavaScript Object Notation",
    "category": "Data",
    "tagline": "The format almost every API uses.",
    "eli5": "JSON is a simple, readable way to write structured data: keys, values, nested groups. Web APIs send and receive JSON. Config files use JSON. It's readable to humans and trivial for code to parse, which is why it took over.",
    "analogy": "",
    "example": "{\"name\": \"Sarah\", \"level\": 50, \"items\": [\"potion\", \"key\"]} - that's JSON. Curly braces hold objects, square brackets hold lists, strings get quotes."
  },
  {
    "term": "CSV",
    "fullName": "Comma-Separated Values",
    "category": "Data",
    "tagline": "Spreadsheet-like data in a plain text file.",
    "eli5": "A CSV is the simplest possible data format: each line is a row, commas separate the columns. Excel, Google Sheets, every database, every analytics tool can read and write CSVs. When you need to move tabular data between two systems that don't share a fancy connector, you fall back to CSV.",
    "analogy": "",
    "example": "Exporting any sheet from Google Sheets gives you a CSV. Most \"import contacts\" features expect CSV."
  },
  {
    "term": "CRM",
    "fullName": "Customer Relationship Management",
    "category": "Marketing & Ops",
    "tagline": "Software for managing leads, customers, and conversations.",
    "eli5": "A CRM is your business's memory: every lead, every email sent, every call logged, every deal's status. Without one, you forget who said yes to what when, and customers fall through the cracks. Salesforce, HubSpot, Pipedrive, GoHighLevel are all CRMs.",
    "analogy": "Like a contact list, except every contact also has a complete history of every interaction your team has ever had with them.",
    "example": ""
  },
  {
    "term": "GHL",
    "fullName": "GoHighLevel",
    "category": "Marketing & Ops",
    "tagline": "An all-in-one CRM popular with agencies.",
    "eli5": "GoHighLevel bundles CRM + funnels + email + SMS + automation + booking + courses into one platform aimed at marketing agencies. Its big differentiator is white-labeling - agencies can resell GHL under their own brand and pocket the price difference. That's why so many \"agency software\" platforms are quietly built on it.",
    "analogy": "",
    "example": ""
  },
  {
    "term": "A2P",
    "fullName": "Application-to-Person",
    "category": "Marketing & Ops",
    "tagline": "SMS compliance system in the US.",
    "eli5": "In the US, when an app sends text messages to people, carriers require it to register as A2P (Application-to-Person), as opposed to P2P (a real person texting another person). Skipping A2P registration gets your messages blocked or rate-limited. The registration process is annoying but mandatory if you're sending business SMS.",
    "analogy": "",
    "example": "If you're building any app that texts users (appointment reminders, OTP codes, marketing), A2P is one of the first hurdles you hit."
  },
  {
    "term": "SaaS",
    "fullName": "Software as a Service",
    "category": "Marketing & Ops",
    "tagline": "Subscription software you use through your browser.",
    "eli5": "Instead of buying software once and installing it on your computer (the old way), you pay monthly to access SaaS software through a website. Notion, Slack, Spotify, Netflix, Google Workspace, Salesforce - all SaaS. The recurring-revenue model is why basically every modern startup wants to be SaaS.",
    "analogy": "Like the difference between buying a DVD and subscribing to Netflix. Same content access, very different business models.",
    "example": ""
  },
  {
    "term": "MVP",
    "fullName": "Minimum Viable Product",
    "category": "Marketing & Ops",
    "tagline": "The smallest version of your idea that delivers value.",
    "eli5": "Don't build everything before showing real people. Ship the absolute minimum that solves one problem for one type of user. Watch how they actually use it. Learn what was wrong with your assumptions. Iterate. Most products fail because they launched too late and bloated with features nobody wanted.",
    "analogy": "Like opening a food truck before opening a five-star restaurant. You'll learn what people actually order before you commit to a real kitchen.",
    "example": ""
  },
  {
    "term": "KPI",
    "fullName": "Key Performance Indicator",
    "category": "Marketing & Ops",
    "tagline": "The few metrics that actually matter.",
    "eli5": "A KPI is one of the small handful of numbers you watch to know if your business or project is winning. The mistake is tracking too many metrics - a real KPI list is short and ruthless. Pick the 3-5 numbers that, if they go up, mean things are working.",
    "analogy": "",
    "example": "For a SaaS: monthly recurring revenue, churn rate, signup conversion. For a creator: subscriber count, watch-through rate, click-through to monetization."
  },
  {
    "term": "Funnel",
    "fullName": "",
    "category": "Marketing & Ops",
    "tagline": "The path from \"stranger\" to \"paying customer.\"",
    "eli5": "A funnel is a sequence of steps a potential customer goes through: see ad, click ad, land on your page, opt in, get a sequence of emails, see a pitch, click checkout, pay. It's called a funnel because most people drop off at each step - the visual is wide at the top, narrow at the bottom. Optimizing each step makes the whole thing more profitable.",
    "analogy": "Like a kitchen sieve, but for prospects. Most leads escape; a few make it all the way through.",
    "example": ""
  },
  {
    "term": "Lead Magnet",
    "fullName": "",
    "category": "Marketing & Ops",
    "tagline": "Free thing you offer in exchange for an email.",
    "eli5": "A lead magnet is a guide, template, checklist, video, or mini-course given away free in exchange for someone's name and email. It pulls strangers into your funnel by trading something useful upfront. Good lead magnets solve a small, specific problem that hints at the bigger problem your paid product solves.",
    "analogy": "",
    "example": "\"5-minute SEO checklist\" -> later sells SEO consulting. \"Sample meal prep plan\" -> later sells a full meal-planning app."
  }
];
