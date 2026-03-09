/**
 * ======================================================================
 * SUPERVISOR PATTERN - COMPLETE IMPLEMENTATION (HINGLISH VERSION)
 * ======================================================================
 * 
 * ███████╗██╗   ██╗██████╗ ███████╗██████╗ ██╗   ██╗██╗███████╗ ██████╗ ██████╗ 
 * ██╔════╝██║   ██║██╔══██╗██╔════╝██╔══██╗██║   ██║██║██╔════╝██╔════╝██╔══██╗
 * ███████╗██║   ██║██████╔╝█████╗  ██████╔╝██║   ██║██║███████╗██║     ██████╔╝
 * ╚════██║██║   ██║██╔═══╝ ██╔══╝  ██╔══██╗╚██╗ ██╔╝██║╚════██║██║     ██╔══██╗
 * ███████║╚██████╔╝██║     ███████╗██║  ██║ ╚████╔╝ ██║███████║╚██████╗██║  ██║
 * ╚══════╝ ╚═════╝ ╚═╝     ╚══════╝╚═╝  ╚═╝  ╚═══╝  ╚═╝╚══════╝ ╚═════╝╚═╝  ╚═╝
 * 
 * ==================== SUPERVISOR PATTERN KYA HAI? =========================
 * 
 * Simple Definition (Hinglish Mein):
 * ──────────────────────────────────────────────────────────────────
 * Supervisor agent ek tarah ka **project manager** hota hai jo 
 * multiple specialized sub-agents ko coordinate karta hai.
 * 
 * KAISE KAAM KARTA HAI:
 * 
 * 1. RECEIVE   : User se request aati hai (Hindi/English mix mein)
 * 2. PLAN      : Request ko chhote tasks mein todta hai
 * 3. DELEGATE  : Har task sahi specialist ko deta hai
 * 4. COORDINATE: Tasks sahi order mein complete karta hai
 * 5. SYNTHESIZE: Sab results ko milake final answer deta hai
 * 
 * REAL LIFE EXAMPLE:
 * ──────────────────────────────────────────────────────────────────
 * OFFICE MEIN:
 * ▸ Project Manager (Supervisor) → Sabko tasks allocate karta hai
 * ▸ Accountant (Calendar Agent)  → Dates aur meetings handle karta hai
 * ▸ Secretary (Email Agent)      → Emails bhejta hai
 * ▸ HR (Contact Agent)           → Employees ke details rakhta hai
 * 
 * YEH PATTERN KYON ZAROORI HAI?
 * ──────────────────────────────────────────────────────────────────
 * 
 * PROBLEM: Ek agent sab kuch nahi kar sakta
 *   ❌ Calendar agent email format nahi janta
 *   ❌ Email agent contacts nahi dhundh sakta
 *   ❌ Contact agent scheduling nahi janta
 *   ❌ Sab tools ek agent ko doge to confuse ho jayega
 * 
 * SOLUTION: Specialized agents with a supervisor
 *   ✓ Calendar Agent: Dates, times, availability (Meetings ka expert)
 *   ✓ Email Agent   : Subject lines, body text, recipients (Communication expert)
 *   ✓ Contact Agent : Logon ko dhundhna, team details (HR expert)
 *   ✓ Supervisor    : Sabko coordinate karta hai (Project Manager)
 * 
 * ==================== VISUAL ARCHITECTURE ===============================
 * 
 *                        USER REQUEST
 *          ("Design team ke liye kal 9am meeting rakho")
 *                             │
 *                             ▼
 *                    ┌───────────────────────┐
 *                    │    SUPERVISOR AGENT   │
 *                    │    (Project Manager)  │
 *                    └─────────┬─────────────┘
 *                              │
 *            ┌─────────────────┼─────────────────┐
 *            │                 │                 │
 *            ▼                 ▼                 ▼
 *    ┌───────────────┐ ┌───────────────┐ ┌───────────────┐
 *    │   CALENDAR    │ │     EMAIL     │ │    CONTACT    │
 *    │    AGENT      │ │    AGENT      │ │    AGENT      │
 *    │  (Accountant) │ │  (Secretary)  │ │     (HR)      │
 *    └───────┬───────┘ └───────┬───────┘ └───────┬───────┘
 *            │                 │                 │
 *            ▼                 ▼                 ▼
 *    ┌───────────────┐ ┌───────────────┐ ┌─────────────────┐
 *    │• event_banao  │ │• email_bhejo  │ │• contacts_dhundo│
 *    │• slots_check  │ └───────────────┘ └─────────────────┘
 *    └───────────────┘
 * 
 * SUPERVISOR KE TOOLS:
 * ┌─────────────────────────────────────────────────────────┐
 * │ schedule_event  →  Calendar Agent ko call karta hai     │
 * │ manage_email    →  Email Agent ko call karta hai        │
 * │ manage_contacts →  Contact Agent ko call karta hai      │
 * └─────────────────────────────────────────────────────────┘
 * 
 * ==================== COMPLETE DATA FLOW (HINGLISH MEIN) ===============
 * 
 * [USER: "Design team ke liye kal 9am meeting rakho aur sabko email bhejo"]
 *    ↓
 * [SUPERVISOR AGENT] - Request aayi
 *    ├─ SOCHTA HAI: Isme contacts, calendar aur email teeno chahiye
 *    ├─ PLAN BANATA HAI: 
 *    │   1. Pehle design team ke contacts lao
 *    │   2. Phir unke saath meeting schedule karo
 *    │   3. Last mein sabko reminder email bhejo
 *    │
 *    ├─ TOOL CALL #1: manage_contacts({ request: "design team ke saare contacts do" })
 *    │   ↓
 *    │   [CONTACT AGENT] - Activate hua
 *    │   ├─ get_contacts({ search: "design" })   // Database mein search kiya
 *    │   ├─ Mil gaya: [
 *    │   │   { name: "Sujoy", email: "sujoy@codersgyan.com" },
 *    │   │   { name: "John", email: "john@codersgyan.com" }
 *    │   │ ]
 *    │   └─ Supervisor ko bataya: "Design team mein 2 log mil gaye"
 *    │
 *    ├─ TOOL CALL #2: schedule_event({ request: "Sujoy aur John ke saath kal 9am meeting rakho" })
 *    │   ↓
 *    │   [CALENDAR AGENT] - Activate hua
 *    │   ├─ Socha: "kal 9am" ka matlab "2025-03-02T09:00:00"
 *    │   ├─ get_available_time_slots() - Check kiya dono free hain?
 *    │   ├─ Mil gaya: 9am free hai!
 *    │   ├─ create_calendar_event() - Meeting bana di
 *    │   └─ Supervisor ko bataya: "Meeting create ho gayi"
 *    │
 *    ├─ TOOL CALL #3: manage_email({ request: "Sujoy aur John ko meeting ki email bhejo" })
 *    │   ↓
 *    │   [EMAIL AGENT] - Activate hua
 *    │   ├─ Email compose kiya:
 *    │   │   To: sujoy@..., john@...
 *    │   │   Subject: "Kal 9am Meeting - Reminder"
 *    │   │   Body: "Hi team, Kal 9am meeting hai..."
 *    │   ├─ send_email() - Email bhej diya
 *    │   └─ Supervisor ko bataya: "Email send ho gaya"
 *    │
 *    └─ FINAL ANSWER DIYA:
 *       "Done! Design team ki meeting kal 9am fix ho gayi. Sujoy aur John ko email bhi bhej diya."
 *    ↓
 * [USER] - Happy!
 * 
 * ==================== AGENT HIERARCHY (Kiski kya zimmedari) =============
 * 
 * LEVEL 1: SUPERVISOR AGENT (Project Manager)
 * ├─ Kaam: High-level planning aur coordination
 * ├─ Tools: schedule_event, manage_email, manage_contacts
 * ├─ Memory: Purani baatein yaad rakhta hai
 * └─ Prompt: Samajhta hai ki kab kaunsa tool use karna hai
 * 
 * LEVEL 2: SPECIALIST AGENTS (Domain Experts)
 * ├─ CALENDAR AGENT (Accountant)
 * │  ├─ Kaam: Dates samajhna, scheduling, availability check
 * │  ├─ Tools: create_calendar_event, get_available_time_slots
 * │  └─ Prompt: "kal subah 9 baje" ko "2024-01-15T09:00:00" mein convert karta hai
 * │
 * ├─ EMAIL AGENT (Secretary)
 * │  ├─ Kaam: Email likhna aur bhejna
 * │  ├─ Tools: send_email
 * │  └─ Prompt: Professional email format mein likhta hai
 * │
 * └─ CONTACT AGENT (HR)
 *    ├─ Kaam: Contacts dhundhna, team membership check
 *    ├─ Tools: get_contacts
 *    └─ Prompt: "design team wale" dhundo to sahi emails laata hai
 * 
 * LEVEL 3: PRIMITIVE TOOLS (Actual kaam karne wale)
 * ├─ create_calendar_event → Google Calendar API call karega (production mein)
 * ├─ get_available_time_slots → Sabke calendars check karega
 * ├─ send_email → Gmail/SendGrid use karega
 * └─ get_contacts → Database se contacts laayega
 */

// ======================================================================
// SECTION 1: IMPORTS - Jo libraries use karenge
// ======================================================================
import readline from 'node:readline/promises';      // User se input lene ke liye
import { ChatOpenAI } from '@langchain/openai';      // OpenAI ka model
import { tool, createAgent } from 'langchain';       // Agent banane ke liye
import { MemorySaver } from '@langchain/langgraph';  // Baatein yaad rakhne ke liye
import { z } from 'zod';                             // Data validate karne ke liye

// ======================================================================
// SECTION 2: BASE MODEL - Sab agents ke liye ek hi LLM
// ======================================================================

/**
 * ███╗   ███╗ ██████╗ ██████╗ ███████╗██╗     
 * ████╗ ████║██╔═══██╗██╔══██╗██╔════╝██║     
 * ██╔████╔██║██║   ██║██║  ██║█████╗  ██║     
 * ██║╚██╔╝██║██║   ██║██║  ██║██╔══╝  ██║     
 * ██║ ╚═╝ ██║╚██████╔╝██████╔╝███████╗███████╗
 * ╚═╝     ╚═╝ ╚═════╝ ╚═════╝ ╚══════╝╚══════╝
 * 
 * SAB AGENTS KE LIYE EK HI MODEL KYON?
 * ──────────────────────────────────────────────────────────────────
 * - Consistency - Sab ek jaisa samjhenge
 * - Economical - Ek hi LLM ka bill
 * - Simple - Ek configuration sabke liye
 * 
 * TEMPERATURE 0 KYON RAKHA?
 * ──────────────────────────────────────────────────────────────────
 * - Predictable - Har baar same tarike se kaam karega
 * - Reliable - Galtiyan kam hongi
 * - Consistent - Date parsing har baar same hogi
 */

const model = new ChatOpenAI({
    model: 'gpt-4',  // OpenAI ka model
    temperature: 0,  // 0 temperature = deterministic output
});

// ======================================================================
// SECTION 3: PRIMITIVE TOOLS - Actual kaam karne wale functions
// ======================================================================

/**
 * ████████╗ ██████╗  ██████╗ ██╗     ███████╗
 * ╚══██╔══╝██╔═══██╗██╔═══██╗██║     ██╔════╝
 *    ██║   ██║   ██║██║   ██║██║     ███████╗
 *    ██║   ██║   ██║██║   ██║██║     ╚════██║
 *    ██║   ╚██████╔╝╚██████╔╝███████╗███████║
 *    ╚═╝    ╚═════╝  ╚═════╝ ╚══════╝╚══════╝
 * 
 * STUB IMPLEMENTATIONS KYON?
 * ──────────────────────────────────────────────────────────────────
 * Asli production mein ye APIs call karenge:
 * - Google Calendar API
 * - Gmail API
 * - Company ka contact database
 * 
 * Stubs sirf pattern dikhane ke liye hain, API keys nahi chahiye
 * 
 * ZOD SCHEMAS KYON?
 * ──────────────────────────────────────────────────────────────────
 * - Type safety - Data sahi format mein hai ya nahi
 * - Validation - Runtime pe check hota hai
 * - Documentation - Clearly pata hai kya chahiye
 */

/**
 * 📅 createCalendarEvent - Meeting schedule karna
 * 
 * PRODUCTION VERSION (Google Calendar API):
 * async ({ title, startTime, endTime, attendees, location }) => {
 *   const event = {
 *     summary: title,
 *     start: { dateTime: startTime, timeZone: 'Asia/Kolkata' },
 *     end: { dateTime: endTime, timeZone: 'Asia/Kolkata' },
 *     attendees: attendees.map(email => ({ email })),
 *     location
 *   };
 *   const response = await googleCalendar.events.insert({
 *     calendarId: 'primary',
 *     requestBody: event
 *   });
 *   return `Event created: ${response.data.htmlLink}`;
 * }
 */
const createCalendarEvent = tool(
    async ({ title, startTime, endTime, attendees, location }) => {
        // Stub - Asli code mein Google Calendar API call hogi
        return `✅ Event create ho gaya: ${title} ${startTime} se ${endTime} tak, ${attendees.length} log`;
    },
    {
        name: 'create_calendar_event',
        description: 'Calendar mein naya event banao. Exact ISO datetime chahiye.',
        schema: z.object({
            title: z.string().describe('Event ka naam, jaise "Design Team Meeting"'),
            startTime: z.string().describe("ISO format: '2024-01-15T14:00:00' - matlab 2pm"),
            endTime: z.string().describe("ISO format: '20201-15T15:00:00' - matlab 3pm"),
            attendees: z.array(z.string()).describe('Jinhe invite karna hai, unke emails'),
            location: z.string().optional().describe('Kahan hona hai meeting? Google Meet ya Office'),
        }),
    }
);

/**
 * ✉️ sendEmail - Email bhejna
 * 
 * PRODUCTION VERSION (SendGrid/Gmail):
 * async ({ to, subject, body, cc }) => {
 *   const msg = {
 *     to: to.join(', '),
 *     cc: cc?.join(', '),
 *     subject,
 *     text: body,
 *     html: body.replace(/\n/g, '<br>')
 *   };
 *   await sgMail.send(msg);
 *   return `Email sent to ${to.join(', ')}`;
 * }
 */
const sendEmail = tool(
    async ({ to, subject, body, cc }) => {
        // Stub - Asli code mein SendGrid/Gmail API call hogi
        return `✅ Email bhej diya: ${to.join(', ')} - Subject: ${subject}`;
    },
    {
        name: 'send_email',
        description: 'Email bhejo. Sahi email addresses chahiye.',
        schema: z.object({
            to: z.array(z.string()).describe('Jinhe email jana hai, unke emails'),
            subject: z.string().describe('Email ka subject line'),
            body: z.string().describe('Email mein kya likhna hai'),
            cc: z.array(z.string()).optional().describe('Aur kisko copy bhejni hai'),
        }),
    }
);

/**
 * ⏰ getAvailableTimeSlots - Calendar availability check
 * 
 * PRODUCTION VERSION:
 * async ({ attendees, date, durationMinutes }) => {
 *   // Har attendee ka calendar query karo API se
 *   // Overlapping free time dhundo
 *   // Available slots return karo
 * }
 */
const getAvailableTimeSlots = tool(
    async ({ attendees, date, durationMinutes }) => {
        // Stub - Asli code mein calendar APIs call hongi
        return JSON.stringify(['09:00', '14:00', '16:00']);  // Example: 9am, 2pm, 4pm free hain
    },
    {
        name: 'get_available_time_slots',
        description: 'Check karo ki given attendees uss din free hain ya nahi.',
        schema: z.object({
            attendees: z.array(z.string()).describe('Jinki availability check karni hai'),
            date: z.string().describe("Date: '2024-01-15' format mein"),
            durationMinutes: z.number().describe('Meeting kitni der ki hai? 30, 60 minutes'),
        }),
    }
);

/**
 * 👥 getContacts - Logon ko dhundhna
 * 
 * PRODUCTION VERSION:
 * async ({ search }) => {
 *   const contacts = await db.query(
 *     'SELECT * FROM contacts WHERE team ILIKE $1 OR name ILIKE $1',
 *     [`%${search}%`]
 *   );
 *   return JSON.stringify(contacts);
 * }
 */
const getContacts = tool(
    async ({ search }) => {
        // Stub - Asli code mein database se contacts laayenge
        return JSON.stringify([
            { id: 1, team: 'design', name: 'Sujoy', email: 'sujoy@codersgyan.com' },
            { id: 2, team: 'design', name: 'John', email: 'john@codersgyan.com' },
            { id: 3, team: 'development', name: 'Kevin', email: 'kevin@codersgyan.com' },
        ]);
    },
    {
        name: 'get_contacts',
        description: 'Contacts ki list lao. Team se ya naam se dhundh sakte ho.',
        schema: z.object({
            search: z.string().describe('Kisko dhundhna hai? Jaise "design" ya "Sujoy"'),
        }),
    }
);

// ======================================================================
// SECTION 4: SPECIALIST AGENTS - Domain Experts (Hinglish Mein)
// ======================================================================

/**
 * ███████╗██████╗ ███████╗ ██████╗██╗ █████╗ ██╗     ██╗███████╗████████╗
 * ██╔════╝██╔══██╗██╔════╝██╔════╝██║██╔══██╗██║     ██║██╔════╝╚══██╔══╝
 * ███████╗██████╔╝█████╗  ██║     ██║███████║██║     ██║███████╗   ██║   
 * ╚════██║██╔═══╝ ██╔══╝  ██║     ██║██╔══██║██║     ██║╚════██║   ██║   
 * ███████║██║     ███████╗╚██████╗██║██║  ██║███████╗██║███████║   ██║   
 * ╚══════╝╚═╝     ╚══════╝ ╚═════╝╚═╝╚═╝  ╚═╝╚══════╝╚═╝╚══════╝   ╚═╝   
 * 
 * ALAG-ALAG AGENTS KYON?
 * ──────────────────────────────────────────────────────────────────
 * Har specialist ka apna kaam hai:
 * - Focused system prompt (bas apna domain janta hai)
 * - Relevant tools only (jo tools use karne hain, bas wahi hain)
 * - Clear responsibility (confuse nahi hota)
 * 
 * REAL LIFE EXAMPLE:
 * - Calendar Agent → Office ka PA (meetings fix karta hai)
 * - Email Agent → Secretary (communication handle karta hai)
 * - Contact Agent → HR department (logon ke details rakhta hai)
 */

/**
 * 📅 CALENDAR AGENT - Dates aur meetings ka expert
 * 
 * EXPERTISE:
 * - Natural language dates samajhna ("aglae mangalvar 2 baje")
 * - Timezones handle karna (IST se UTC mein convert)
 * - Multiple logon ki availability check karna
 * - Calendar events create karna
 * 
 * PROMPT DESIGN:
 * "Natural language scheduling requests ko ISO datetime mein convert karo"
 * → Jaise "kal subah 9am" ko "2025-03-02T09:00:00" banana
 */
const CALENDAR_AGENT_PROMPT = `
Tum ek calendar scheduling assistant ho.
Tumhara kaam hai natural language scheduling requests ko samajhna
(jaise 'aglae mangalvar 2 baje' ya 'kal subah 9am meeting').

Pehle get_available_time_slots use karo check karne ke liye ki log free hain ya nahi.
Phir create_calendar_event use karo event banane ke liye.

Hamesha confirm karo ki kya schedule kiya apne final response mein.

Examples:
- User: "kal subah 9am meeting Sujoy ke saath"
- Tum: Pehle check karo ki 9am free hai, phir event banao
`.trim();

const calendarAgent = await createAgent({
    model,
    tools: [createCalendarEvent, getAvailableTimeSlots],
    systemPrompt: CALENDAR_AGENT_PROMPT,
});

/**
 * ✉️ EMAIL AGENT - Communication ka expert
 * 
 * EXPERTISE:
 * - Professional email likhna
 * - Subject line optimize karna
 * - Sahi greeting aur closing
 * - Context ke hisaab se formatting
 * 
 * PROMPT DESIGN:
 * "Natural language requests se professional email compose karo"
 * → Jaise "unhe reminder bhejo" se proper email banana
 */
const EMAIL_AGENT_PROMPT = `
Tum ek email assistant ho.
Natural language requests se professional emails compose karo.

Recipients ka information extract karo (kisiko bhejna hai).
Subject line aur body text appropriately likho.
Send_email tool use karo email bhejne ke liye.

Hamesha confirm karo ki kya bheja apne final response mein.

Examples:
- User: "Sujoy ko meeting ki reminder bhejo"
- Tum: Subject: "Reminder: Meeting Tomorrow", Body: "Hi Sujoy, Just a reminder..."
`.trim();

const emailAgent = await createAgent({
    model,
    tools: [sendEmail],
    systemPrompt: EMAIL_AGENT_PROMPT,
});

/**
 * 👥 CONTACT AGENT - Logon ka expert
 * 
 * EXPERTISE:
 * - Naam se contacts dhundhna
 * - Team ke hisaab se log dhundo
 * - Contact information manage karna
 * 
 * PROMPT DESIGN:
 * "Contacts dhundho ya create karo requirement ke hisaab se"
 * → Jaise "design team ke contacts do" ka answer dena
 */
const CONTACT_AGENT_PROMPT = `
Tum ek contact assistant ho.
Contacts dhundho ya create karo requirement ke hisaab se.
Get_contacts tool use karo contact list lane ke liye.

Examples:
- User: "design team ke saare contacts do"
- Tum: get_contacts use karo search="design" ke saath
`.trim();

const contactAgent = await createAgent({
    model,
    tools: [getContacts],
    systemPrompt: CONTACT_AGENT_PROMPT,
});

// ======================================================================
// SECTION 5: SUPERVISOR TOOLS - Specialist Agents ko wrap karna
// ======================================================================

/**
 * ███████╗██╗   ██╗██████╗ ███████╗██████╗ ██╗   ██╗██╗███████╗ ██████╗ ██████╗ 
 * ██╔════╝██║   ██║██╔══██╗██╔════╝██╔══██╗██║   ██║██║██╔════╝██╔════╝██╔══██╗
 * ███████╗██║   ██║██████╔╝█████╗  ██████╔╝██║   ██║██║███████╗██║     ██████╔╝
 * ╚════██║██║   ██║██╔═══╝ ██╔══╝  ██╔══██╗╚██╗ ██╔╝██║╚════██║██║     ██╔══██╗
 * ███████║╚██████╔╝██║     ███████╗██║  ██║ ╚████╔╝ ██║███████║╚██████╗██║  ██║
 * ╚══════╝ ╚═════╝ ╚═╝     ╚══════╝╚═╝  ╚═╝  ╚═══╝  ╚═╝╚══════╝ ╚═════╝╚═╝  ╚═╝
 * 
 * AGENTS KO TOOLS MEIN WRAP KYON KARTE HAIN?
 * ──────────────────────────────────────────────────────────────────
 * Supervisor directly specialists se baat nahi karta.
 * Har specialist ko ek TOOL ki tarah wrap karte hain jo supervisor call kar sakta hai.
 * 
 * Iske fayde:
 * 1. Clean interface: Supervisor sirf tools dekhta hai
 * 2. Isolation: Specialists alag run hote hain
 * 3. Ordering: Supervisor sequence mein tools call kar sakta hai
 * 4. Error handling: Har tool call alag fail ho sakti hai
 * 
 * REAL LIFE EXAMPLE:
 * CEO (Supervisor) → Department Heads (Tools) → Employees (Specialists)
 * 
 * CEO direct employee se baat nahi karta, department head ke through karta hai
 */

/**
 * 📅 scheduleEvent - Supervisor ke liye calendar tool
 * 
 * Supervisor ko ye nahi janna:
 * - ISO date formats
 * - Availability checking
 * - Attendee management
 * 
 * Bas itna bolega: "kal 9am meeting rakho"
 * Calendar agent saara complexity handle karega
 */
const scheduleEvent = tool(
    async ({ request }) => {
        // Calendar agent ko request bhejo
        const result = await calendarAgent.invoke({
            messages: [{ role: 'user', content: request }],
        });
        const lastMessage = result.messages[result.messages.length - 1];
        return lastMessage.content;
    },
    {
        name: 'schedule_event',
        description: `
Natural language mein calendar events schedule karo.

Tab use karo jab user meeting banana chahe, reschedule karna chahe, ya availability check karni ho.
Date/time parsing, availability checking, aur event creation sab handle karta hai.

Input: Natural language scheduling request (e.g., 'design team ke saath kal 2pm meeting')
        `.trim(),
        schema: z.object({
            request: z.string().describe('Natural language mein scheduling request'),
        }),
    }
);

/**
 * ✉️ manageEmail - Supervisor ke liye email tool
 * 
 * Supervisor ko ye nahi janna:
 * - Email formatting
 * - Subject line best practices
 * - Professional tone
 * 
 * Bas itna bolega: "unhe reminder bhejo"
 * Email agent saara composition handle karega
 */
const manageEmail = tool(
    async ({ request }) => {
        // Email agent ko request bhejo
        const result = await emailAgent.invoke({
            messages: [{ role: 'user', content: request }],
        });
        const lastMessage = result.messages[result.messages.length - 1];
        return lastMessage.content;
    },
    {
        name: 'manage_email',
        description: `
Natural language mein emails bhejo.

Tab use karo jab user koi notification, reminder, ya general email bhejna chahe.
Recipient extraction, subject generation, aur email composition sab handle karta hai.

Input: Natural language email request (e.g., 'Sujoy ko meeting ki reminder bhejo')
        `.trim(),
        schema: z.object({
            request: z.string().describe('Natural language mein email request'),
        }),
    }
);

/**
 * 👥 manageContacts - Supervisor ke liye contact tool
 * 
 * Supervisor ko ye nahi janna:
 * - Database queries
 * - Team structures
 * - Contact storage
 * 
 * Bas itna bolega: "design team ke contacts do"
 * Contact agent saara lookup handle karega
 */
const manageContacts = tool(
    async ({ request }) => {
        // Contact agent ko request bhejo
        const result = await contactAgent.invoke({
            messages: [{ role: 'user', content: request }],
        });
        const lastMessage = result.messages[result.messages.length - 1];
        return lastMessage.content;
    },
    {
        name: 'manage_contacts',
        description: `
Natural language mein contacts dhundho.

Tab use karo jab user contacts ki list mang raha ho, ya kisi specific contact ke details chahiye.

Input: Natural language contact request (e.g., 'design team ke saare contacts do')
        `.trim(),
        schema: z.object({
            request: z.string().describe('Natural language mein contact request'),
        }),
    }
);

// ======================================================================
// SECTION 6: SUPERVISOR AGENT - The Boss (Project Manager)
// ======================================================================

/**
 * ███████╗██╗   ██╗██████╗ ███████╗██████╗ ██╗   ██╗██╗███████╗ ██████╗ ██████╗ 
 * ██╔════╝██║   ██║██╔══██╗██╔════╝██╔══██╗██║   ██║██║██╔════╝██╔════╝██╔══██╗
 * ███████╗██║   ██║██████╔╝█████╗  ██████╔╝██║   ██║██║███████╗██║     ██████╔╝
 * ╚════██║██║   ██║██╔═══╝ ██╔══╝  ██╔══██╗╚██╗ ██╔╝██║╚════██║██║     ██╔══██╗
 * ███████║╚██████╔╝██║     ███████╗██║  ██║ ╚████╔╝ ██║███████║╚██████╗██║  ██║
 * ╚══════╝ ╚═════╝ ╚═╝     ╚══════╝╚═╝  ╚═╝  ╚═══╝  ╚═╝╚══════╝ ╚═════╝╚═╝  ╚═╝
 * 
 * SUPERVISOR KA KAAM:
 * 1. Poori user request samajhna
 * 2. Chhote-chhote tasks mein todna
 * 3. Sahi order decide karna
 * 4. Sequence mein tools call karna
 * 5. Sab results milake ek answer dena
 * 
 * PROMPT KA MATLAB:
 * ──────────────────────────────────────────────────────────────────
 * 
 * "You can schedule calendar events and send emails."
 * → Supervisor kya kar sakta hai (scope define kiya)
 * 
 * "To send emails/notifications, first call the manage_contacts tool to get email addresses."
 * → IMPORTANT ORDERING - Pehle contacts lao, phir email bhejo
 * 
 * "Break down user requests into appropriate tool calls"
 * → Planning - Complex request ko chhote parts mein todna
 * 
 * "When a request involves multiple actions, use multiple tools in sequence"
 * → Multi-step coordination
 * 
 * MEMORY SAVER KYON?
 * ──────────────────────────────────────────────────────────────────
 * - Conversation yaad rakhta hai multiple turns tak
 * - Previous tool results yaad rehte hain
 * - User se baat karte waqt context maintain hota hai
 * 
 * Example: User bole "John ke saath meeting rakho"
 * 1. Supervisor manage_contacts call karega John ka email lene ke liye
 * 2. Woh email yaad rakhega
 * 3. Phir schedule_event call karega ussi email ke saath
 */
const SUPERVISOR_PROMPT = `
Tum ek helpful personal assistant ho.
Tum calendar events schedule kar sakte ho aur emails bhej sakte ho.

IMPORTANT: Emails bhejne se PEHLE hamesha manage_contacts tool call karo email addresses lene ke liye.

User requests ko chhote tasks mein todo aur sahi order mein tools call karo.
Agar request mein multiple actions hain, to sequence mein multiple tools use karo.

Examples:
- User: "design team ke liye kal meeting rakho aur unhe email bhejo"
  Tumhara plan:
  1. Pehle manage_contacts("design team ke contacts do")
  2. Phir schedule_event("design team ke saath kal meeting")
  3. Phir manage_email("design team ko meeting ki email bhejo")

Hamesha final response mein batao ki kya kiya.
`.trim();

const supervisorAgent = await createAgent({
    model,
    tools: [scheduleEvent, manageEmail, manageContacts],
    systemPrompt: SUPERVISOR_PROMPT,
    checkpointer: new MemorySaver(),  // Conversation memory ke liye
});

// ======================================================================
// SECTION 7: COMPLETE EXECUTION EXAMPLE (Real Data ke saath)
// ======================================================================

/**
 * 🎬 COMPLETE RUNTHROUGH - REAL EXAMPLE
 * 
 * User: "Design team ke liye kal 9am meeting rakho aur sabko email bhejo"
 * 
 * ──────────────────────────────────────────────────────────────────
 * STEP 1: SUPERVISOR REQUEST RECEIVE KARTA HAI
 * ──────────────────────────────────────────────────────────────────
 * 
 * Input: { messages: [{ role: 'user', content: query }] }
 * Thread ID: '1' (conversation memory ke liye)
 * 
 * Supervisor analysis:
 * "Isme teen kaam hain:"
 * - Design team contacts lao (kisiko email bhejna hai?)
 * - Calendar event banao (kal 9am meeting)
 * - Email notification bhejo (sabko reminder)
 * 
 * Sahi order:
 * 1. Pehle contacts lao (emails chahiye)
 * 2. Phir meeting banao (emails use karke)
 * 3. Phir emails bhejo (same emails par)
 * 
 * ──────────────────────────────────────────────────────────────────
 * STEP 2: SUPERVISOR manage_contacts CALL KARTA HAI
 * ──────────────────────────────────────────────────────────────────
 * 
 * Tool Call: manage_contacts({ request: "design team ke saare contacts do" })
 *    ↓
 * [CONTACT AGENT ACTIVATED]
 *    ↓
 * Agent sochta hai: "design" search karna hai
 *    ↓
 * Tool Call: get_contacts({ search: "design" })
 *    ↓
 * Database se mila: [
 *   { id: 1, team: 'design', name: 'Sujoy', email: 'sujoy@codersgyan.com' },
 *   { id: 2, team: 'design', name: 'John', email: 'john@codersgyan.com' }
 * ]
 *    ↓
 * Contact agent batata hai: "Design team mein 2 log mil gaye: sujoy@codersgyan.com, john@codersgyan.com"
 *    ↓
 * Supervisor ko result mila
 * 
 * Supervisor memory mein save kiya: design team emails = [sujoy@..., john@...]
 * 
 * ──────────────────────────────────────────────────────────────────
 * STEP 3: SUPERVISOR schedule_event CALL KARTA HAI
 * ──────────────────────────────────────────────────────────────────
 * 
 * Tool Call: schedule_event({ request: "Sujoy aur John ke saath kal 9am design standup rakho" })
 *    ↓
 * [CALENDAR AGENT ACTIVATED]
 *    ↓
 * Agent parse karta hai: "kal 9am" → date calculate karo
 *    ↓
 * Calculate kiya: kal = 2025-03-02, 9am = 09:00
 *    ↓
 * Tool Call: get_available_time_slots({
 *   attendees: ["sujoy@...", "john@..."],
 *   date: "2025-03-02",
 *   durationMinutes: 60
 * })
 *    ↓
 * APIs se mila: ["09:00", "14:00", "16:00"]  (9am free hai!)
 *    ↓
 * Tool Call: create_calendar_event({
 *   title: "Design Standup",
 *   startTime: "2025-03-02T09:00:00",
 *   endTime: "2025-03-02T10:00:00",
 *   attendees: ["sujoy@...", "john@..."],
 *   location: "Google Meet"
 * })
 *    ↓
 * Google Calendar API se mila: "Event created: Design Standup..."
 *    ↓
 * Calendar agent batata hai: "Design standup kal 9am schedule ho gaya"
 *    ↓
 * Supervisor ko result mila
 * 
 * ──────────────────────────────────────────────────────────────────
 * STEP 4: SUPERVISOR manage_email CALL KARTA HAI
 * ──────────────────────────────────────────────────────────────────
 * 
 * Tool Call: manage_email({ request: "Sujoy aur John ko kal 9am meeting ki email bhejo" })
 *    ↓
 * [EMAIL AGENT ACTIVATED]
 *    ↓
 * Agent compose karta hai:
 * To: ["sujoy@...", "john@..."]
 * Subject: "Reminder: Design Standup Tomorrow at 9am"
 * Body: "Hi team,\n\nJust a reminder about our design standup tomorrow at 9am.\n\nThanks!"
 *    ↓
 * Tool Call: send_email({ to: [...], subject: "...", body: "..." })
 *    ↓
 * SendGrid API se mila: "Email sent to sujoy@..., john@..."
 *    ↓
 * Email agent batata hai: "Email reminders bhej diye Sujoy aur John ko"
 *    ↓
 * Supervisor ko result mila
 * 
 * ──────────────────────────────────────────────────────────────────
 * STEP 5: SUPERVISOR FINAL RESPONSE BANATA HAI
 * ──────────────────────────────────────────────────────────────────
 * 
 * Sab results combine kiya:
 * "Done! Design team ki meeting kal 9am fix ho gayi.
 *  Sujoy (sujoy@codersgyan.com) aur John (john@codersgyan.com) ko calendar invite bhej diya.
 *  Unko email reminder bhi bhej diya."
 * 
 * ──────────────────────────────────────────────────────────────────
 * USER KO FINAL OUTPUT
 * ──────────────────────────────────────────────────────────────────
 * 
 * "Done! Design team ki meeting kal 9am fix ho gayi. Sujoy aur John ko email bhi bhej diya."
 */

// ======================================================================
// SECTION 8: INTERACTIVE MAIN FUNCTION
// ======================================================================

/**
 * ███╗   ███╗ █████╗ ██╗███╗   ██╗
 * ████╗ ████║██╔══██╗██║████╗  ██║
 * ██╔████╔██║███████║██║██╔██╗ ██║
 * ██║╚██╔╝██║██╔══██║██║██║╚██╗██║
 * ██║ ╚═╝ ██║██║  ██║██║██║ ╚████║
 * ╚═╝     ╚═╝╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝
 * 
 * INTERACTIVE COMMAND-LINE INTERFACE
 * 
 * FEATURES:
 * - Continuous conversation (same thread_id)
 * - Memory persists across turns
 * - Real-time streaming of agent steps
 * - '/bye' se exit
 */

async function main() {
    console.log("\n" + "=".repeat(60));
    console.log("🤖 SUPERVISOR AGENT PATTERN DEMO (HINGLISH VERSION)");
    console.log("=".repeat(60));
    console.log("\n📋 SYSTEM KYA KAR SAKTA HAI:");
    console.log("   • 📅 Calendar scheduling (dates, times, availability)");
    console.log("   • ✉️ Email composition aur sending");
    console.log("   • 👥 Contact lookup by name ya team");
    console.log("   • 🔄 Multi-step task coordination");
    console.log("\n💬 TRY KARO:");
    console.log("   • 'Design team ke liye kal subah 9am meeting rakho'");
    console.log("   • 'Sujoy ko ek email bhejo project ke baare mein'");
    console.log("   • 'Development team ke saare contacts do'");
    console.log("   • 'John ke saath meeting rakho aur use reminder bhejo'\n");

    // Same thread_id = conversation memory
    const config = { configurable: { thread_id: '1' } };

    const rl = readline.createInterface({ 
        input: process.stdin, 
        output: process.stdout 
    });

    while (true) {
        const query = await rl.question('\n👤 Aap: ');

        if (query.toLowerCase() === '/bye') {
            console.log('\n🤖 Assistant: Shukriya! Fir milenge. Goodbye!\n');
            break;
        }

        if (query.toLowerCase() === '/help') {
            console.log('\n📚 COMMANDS:');
            console.log('   • /bye - Exit karo');
            console.log('   • /help - Yeh help message');
            console.log('\n💡 EXAMPLES:');
            console.log('   • "Design team meeting kal 9am"');
            console.log('   • "Sujoy ko email bhejo"');
            console.log('   • "Development team contacts do"');
            continue;
        }

        console.log('\n🤖 Assistant soch raha hai...\n');

        try {
            const stream = await supervisorAgent.stream(
                {
                    messages: [{ role: 'user', content: query }],
                },
                config
            );

            let stepCount = 0;
            let finalResponse = '';

            for await (const step of stream) {
                stepCount++;
                
                // Har step ko display karo
                for (const [key, value] of Object.entries(step)) {
                    if (value && typeof value === 'object' && 'messages' in value) {
                        const messages = value.messages;
                        const lastMessage = messages[messages.length - 1];
                        
                        if (lastMessage) {
                            const role = lastMessage._getType?.() || 'unknown';
                            const content = lastMessage.content || '';
                            
                            if (role === 'ai' && content) {
                                console.log(`   🤖 [Step ${stepCount}]: ${content.substring(0, 150)}...`);
                            }
                            
                            // Final response save karo
                            if (stepCount > 1 && content) {
                                finalResponse = content;
                            }
                        }
                    }
                }
            }

            // Final response show karo
            if (finalResponse) {
                console.log('\n📢 FINAL ANSWER:');
                console.log(`   ${finalResponse}`);
            }

        } catch (error: any) {
            console.error('\n❌ Error aaya:', error.message);
            console.log('   Phir se try karo ya /bye likho');
        }

        console.log('\n' + '-'.repeat(60));
    }

    rl.close();
}

// ======================================================================
// SECTION 9: ERROR HANDLING AUR STARTUP
// ======================================================================

/**
 * GLOBAL ERROR HANDLER
 * Koi bhi unhandled error catch karta hai
 */
process.on('unhandledRejection', (error) => {
    console.error('\n❌ Unhandled rejection:', error);
    process.exit(1);
});

process.on('uncaughtException', (error) => {
    console.error('\n❌ Uncaught exception:', error);
    process.exit(1);
});

/**
 * APPLICATION START KARO
 */
console.log("\n🚀 Supervisor Pattern Demo start ho raha hai...");
console.log("⏳ Agents aur tools initialize ho rahe hain...\n");

// Process command line arguments
const args = process.argv.slice(2);
if (args.includes('--help') || args.includes('-h')) {
    console.log(`
USAGE: node supervisor-pattern.js [OPTIONS]

OPTIONS:
  --help, -h     Yeh help message dikhao
  --version, -v  Version number dikhao

EXAMPLES:
  node supervisor-pattern.js
  node supervisor-pattern.js --help
    `);
    process.exit(0);
}

if (args.includes('--version') || args.includes('-v')) {
    console.log('Supervisor Pattern Demo v1.0.0');
    process.exit(0);
}

// Main function call with error handling
main().catch((error) => {
    console.error("\n💥 Fatal error in main:", error);
    process.exit(1);
});

// ======================================================================
// APPENDIX: COMPLETE SUPERVISOR ARCHITECTURE SUMMARY
// ======================================================================

/**
 * 📌 SUPERVISOR PATTERN SUMMARY (HINGLISH MEIN)
 * ======================================================================
 * 
 * ┌─────────────────────────────────────────────────────────────────┐
 * │                     THREE-TIER ARCHITECTURE                     │
 * ├─────────────────────────────────────────────────────────────────┤
 * │                                                                  │
 * │  TIER 1: SUPERVISOR (Project Manager)                           │
 * │  ├─ Kaam: High-level planning aur coordination                  │
 * │  ├─ Tools: schedule_event, manage_email, manage_contacts        │
 * │  ├─ Memory: Conversation context (thread_id)                    │
 * │  └─ Prompt: Samajhta hai kab kaunsa tool use karna hai          │
 * │                                                                  │
 * │  TIER 2: SPECIALIST AGENTS (Domain Experts)                     │
 * │  ├─ Calendar Agent: Dates, times, availability (Accountant)     │
 * │  ├─ Email Agent: Composition, formatting, sending (Secretary)   │
 * │  └─ Contact Agent: Lookup, team membership, details (HR)        │
 * │                                                                  │
 * │  TIER 3: PRIMITIVE TOOLS (Actual Actions)                       │
 * │  ├─ create_calendar_event (Google Calendar API)                 │
 * │  ├─ get_available_time_slots (Calendar API)                     │
 * │  ├─ send_email (Gmail/SendGrid)                                 │
 * │  └─ get_contacts (Database)                                     │
 * │                                                                  │
 * └─────────────────────────────────────────────────────────────────┘
 * 
 * 📊 DATA KAISE FLOW HOTA HAI
 * ======================================================================
 * 
 * User Request ("Design team meeting kal 9am")
 *    ↓
 * SUPERVISOR (Tier 1)
 *    ├─ "Pehle contacts chahiye"
 *    ├─ "Phir meeting banao" 
 *    ├─ "Phir email bhejo"
 *    ↓
 * schedule_event TOOL (wraps Tier 2)
 *    ↓
 * CALENDAR AGENT (Tier 2)
 *    ├─ "Kal 9am ka matlab 2025-03-02T09:00:00"
 *    ├─ "Check karo availability"
 *    ├─ "Event banao"
 *    ↓
 * create_calendar_event TOOL (Tier 3)
 *    ↓
 * Google Calendar API (returns success)
 *    ↓
 * Result wapas aata hai upar ki taraf
 * 
 * 🔥 COMPLETE EXECUTION CYCLE
 * ======================================================================
 * 
 * Phase 1: Understanding
 * - Supervisor request samajhta hai
 * - Decide karta hai kaunse specialists chahiye
 * - Order decide karta hai
 * 
 * Phase 2: Contact Resolution
 * - manage_contacts call karta hai
 * - Email addresses leta hai
 * - Memory mein store karta hai
 * 
 * Phase 3: Calendar Operation
 * - schedule_event call karta hai
 * - Resolved emails pass karta hai
 * - Confirmation leta hai
 * 
 * Phase 4: Email Notification
 * - manage_email call karta hai
 * - Same emails use karta hai
 * - Send confirmation leta hai
 * 
 * Phase 5: Response Synthesis
 * - Sab results combine karta hai
 * - User-friendly format mein likhta hai
 * - Final answer deta hai
 * 
 * 🎯 IMPORTANT INSIGHTS
 * ======================================================================
 * 
 * 1. SEPARATION OF CONCERNS
 *    • Har agent sirf apna domain janta hai
 *    • Kisi agent ko sab kuch nahi janna
 *    • Clean interfaces between tiers
 * 
 * 2. TOOL-AS-AGENT WRAPPER
 *    • Supervisor sirf simple tools dekhta hai
 *    • Har tool ke andar agent ki complexity chhupi hai
 *    • Natural language in, result out
 * 
 * 3. ORDER MATTERS
 *    • Contacts before calendar (emails chahiye)
 *    • Calendar before email (meeting details chahiye)
 *    • Prompt explicitly teaches ordering
 * 
 * 4. MEMORY ENABLES COORDINATION
 *    • First tool ke results second tool ke liye available
 *    • Same info baar-baar nahi lena padta
 *    • Natural conversation flow
 * 
 * 5. STUB IMPLEMENTATIONS
 *    • Pattern works without real APIs
 *    • Easy to swap in production code
 *    • Concept clear hota hai
 * 
 * 🚀 PRODUCTION MEIN KYA BADLEGA?
 * ======================================================================
 * 
 * 1. Stubs ki jagah real APIs:
 *    • Google Calendar API
 *    • Gmail API / SendGrid
 *    • PostgreSQL / MongoDB for contacts
 * 
 * 2. Aur specialists add kar sakte hain:
 *    • Task management (Todoist, Jira)
 *    • File storage (Google Drive)
 *    • Messaging (Slack, Teams)
 * 
 * 3. Supervisor ko aur smart bana sakte hain:
 *    • Parallel tool execution
 *    • Error recovery strategies
 *    • User confirmation for critical actions
 * 
 * 4. Monitoring add kar sakte hain:
 *    • Tool usage tracking
 *    • Performance metrics
 *    • Cost per request
 * 
 * 💬 REAL LIFE USE CASES
 * ======================================================================
 * 
 * 1. VIRTUAL ASSISTANT:
 *    "Kal subah 9am meeting rakho, team ko email bhejo, aur Slack pe reminder daalo"
 * 
 * 2. EVENT PLANNER:
 *    "Agle mahine 15 tarikh ko birthday party plan karo, sabko invite bhejo, aur cake order karo"
 * 
 * 3. PROJECT MANAGER:
 *    "Naya task banao, assignee ko assign karo, aur due date se pehle reminder bhejo"
 * 
 * 4. TRAVEL PLANNER:
 *    "Mumbai ki flight book karo, hotel confirm karo, aur itinerary email karo"
 * 
 * ======================================================================
 * 🎉 IMPLEMENTATION COMPLETE - SUPERVISOR PATTERN SAMJHA GAYE?
 * ======================================================================
 * 
 * ✅ THREE-TIER ARCHITECTURE
 *   • Supervisor (boss)
 *   • Specialists (experts)
 *   • Primitive tools (actual work)
 * 
 * ✅ CLEAN SEPARATION
 *   • Har agent ka apna domain
 *   • Tools wrapped as agent interfaces
 *   • Natural language throughout
 * 
 * ✅ PROPER ORDERING
 *   • Contacts before calendar
 *   • Calendar before email
 *   • Prompt-enforced sequence
 * 
 * ✅ MEMORY MANAGEMENT
 *   • Thread_id for conversation
 *   • Results persist between calls
 *   • Natural multi-turn interactions
 * 
 * YEH PATTERN USE KARKE HUM BANA SAKTE HAIN:
 * - Smart assistants (Alexa, Google Assistant jaisa)
 * - Enterprise bots (Company ke internal use ke liye)
 * - Personal automation (Apne daily tasks automate karne ke liye)
 * 
 * SIMPLE WORDS MEIN:
 * Supervisor pattern = Project Manager + Team of Experts
 * 
 * ======================================================================
 */

// Export all agents and tools for external use
export {
    supervisorAgent,
    calendarAgent,
    emailAgent,
    contactAgent,
    scheduleEvent,
    manageEmail,
    manageContacts,
    createCalendarEvent,
    sendEmail,
    getAvailableTimeSlots,
    getContacts,
    model
};