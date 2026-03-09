/**
 * ======================================================================
 * GOOGLE CALENDAR TOOLS - HINGLISH VERSION
 * ======================================================================
 *
 * YEH TOOLS KYA HAIN?
 * ─────────────────────
 * Ye LangChain tools hain jo Google Calendar API ko wrap karte hain.
 * Jab LLM ko lagta hai ki koi action chahiye, to in tools ko name se call karta hai.
 *
 *  ┌──────────────────┬──────────────────────────────────────────┐
 *  │ Tool             │ Yeh kya karta hai                        │
 *  ├──────────────────┼──────────────────────────────────────────┤
 *  │ get-events       │ User ke primary calendar se events dhondhta hai │
 *  │                  │ query aur date range ke hisaab se        │
 *  ├──────────────────┼──────────────────────────────────────────┤
 *  │ create-event     │ Calendar event create karta hai Google    │
 *  │                  │ Meet link ke saath aur attendees ko      │
 *  │                  │ invites bhejta hai                        │
 *  └──────────────────┴──────────────────────────────────────────┘
 *
 * ======================================================================
 * GOOGLE OAUTH2 FLOW (Authentication Kaise Kaam Karta Hai)
 * ======================================================================
 *
 *   ┌──────────────────────────────────────────────────────────────┐
 *   │  Aapka App                  Google OAuth2                    │
 *   │  ─────────                 ────────────                      │
 *   │                                                              │
 *   │  OAuth2Client ──────────► CLIENT_ID aur                      │
 *   │  (CLIENT_ID,              CLIENT_SECRET validate karta hai)  │
 *   │   CLIENT_SECRET,                                             │
 *   │   REDIRECT_URL)                                              │
 *   │       │                                                      │
 *   │       ▼                                                      │
 *   │  setCredentials() ──────► ACCESS_TOKEN use karta hai API     │
 *   │  (ACCESS_TOKEN,            calls ke liye. Jab expire ho      │
 *   │   REFRESH_TOKEN)           jaye to REFRESH_TOKEN se naya     │
 *   │                            ACCESS_TOKEN le leta hai silently │
 *   └──────────────────────────────────────────────────────────────┘
 *
 *  ACCESS_TOKEN    : Short-lived (1 hour). Actual API calls ke liye use hota hai.
 *  REFRESH_TOKEN   : Long-lived. Naya ACCESS_TOKEN lene ke liye use hota hai.
 *  CLIENT_ID/SECRET: Aapke app ki identity, Google Console mein register ki gayi.
 *  REDIRECT_URL    : OAuth consent ke baad Google user ko yahan bhejta hai.
 *
 * ======================================================================
 * KEY CONCEPTS AUR KEYWORDS EXPLAINED (HINGLISH MEIN)
 * ======================================================================
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 1. tool() from @langchain/core/tools                            │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Kya hai: Ek plain async function ko LangChain tool mein wrap    │
 * │          karta hai jise LLM name se call kar sakta hai.         │
 * │                                                                 │
 * │ Parts (Hisse):                                                  │
 * │   1st arg → async function (actual logic)                       │
 * │   2nd arg → metadata object:                                    │
 * │     name        → identifier, LLM is name se tool call karega   │
 * │     description → LLM ko batata hai ki KAB ye tool use karna hai│
 * │     schema      → Zod schema validate karta hai arguments ko    │
 * │                                                                 │
 * │ Code template (Jaise likhenge):                                 │
 * │   export const meraTool = tool(                                 │
 * │     async (params) => {                                         │
 * │       // aapka logic yahan                                      │
 * │       return 'result string';                                   │
 * │     },                                                          │
 * │     {                                                           │
 * │       name:        'mera-tool',                                 │
 * │       description: 'Jab user X karna chahe to call karo.',      │
 * │       schema: z.object({                                        │
 * │         param1: z.string().describe('yeh param kya hai'),       │
 * │       }),                                                       │
 * │     }                                                           │
 * │   );                                                            │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 2. Zod schema in tools                                          │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Kya hai: LLM ko arguments pass karne hote hain tool call karte │
 * │          waqt. Zod schema un arguments ko define aur validate   │
 * │          karta hai. Do kaam karta hai:                         │
 * │          1. Runtime validation (wrong args to error throw)      │
 * │          2. Documentation (LLM .describe() padhti hai)         │
 * │                                                                 │
 * │ Har field mein .describe() lagao — LLM unhe padhti hai.        │
 * │                                                                 │
 * │ Code template:                                                  │
 * │   const schema = z.object({                                     │
 * │     summary:  z.string().describe('Event ka title'),            │
 * │     start: z.object({                                           │
 * │       dateTime: z.string().describe('ISO datetime string'),     │
 * │       timeZone: z.string().describe('IANA timezone string'),    │
 * │     }),                                                         │
 * │     attendees: z.array(z.object({                               │
 * │       email:       z.string(),                                  │
 * │       displayName: z.string().optional(),                       │
 * │     })),                                                        │
 * │   });                                                           │
 * │                                                                 │
 * │   type EventData = z.infer<typeof schema>; // TS type derive    │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 3. google.auth.OAuth2 + setCredentials()                        │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Kya hai: Ek authenticated Google API client banata hai OAuth2   │
 * │          protocol ka use karke.                                 │
 * │                                                                 │
 * │ oauth2Client ko google.calendar() mein pass karte hain taake   │
 * │ har API call authenticated ho. Token refresh automatically      │
 * │ handle hota hai googleapis library se.                          │
 * │                                                                 │
 * │ Code template:                                                  │
 * │   const oauth2Client = new google.auth.OAuth2(                  │
 * │     process.env.GOOGLE_CLIENT_ID,                               │
 * │     process.env.GOOGLE_CLIENT_SECRET,                           │
 * │     process.env.GOOGLE_REDIRECT_URL,                            │
 * │   );                                                            │
 * │                                                                 │
 * │   oauth2Client.setCredentials({                                 │
 * │     access_token:  process.env.GOOGLE_ACCESS_TOKEN,             │
 * │     refresh_token: process.env.GOOGLE_REFRESH_TOKEN,            │
 * │   });                                                           │
 * │                                                                 │
 * │   const calendar = google.calendar({ version: 'v3',            │
 * │                                       auth: oauth2Client });    │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 4. conferenceData (Google Meet auto-creation)                   │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Kya hai: Google Calendar API ko batata hai ki automatically     │
 * │          Google Meet link create karo aur event mein attach     │
 * │          karo.                                                  │
 * │                                                                 │
 * │ conferenceDataVersion: 1  → ye feature enable karne ke liye    │
 * │ requestId: crypto.randomUUID() → unique ID har request ke liye │
 * │            taake retry par duplicate Meet rooms na banen       │
 * │                                                                 │
 * │ Code template:                                                  │
 * │   calendar.events.insert({                                      │
 * │     calendarId:            'primary',                           │
 * │     sendUpdates:           'all',    // email invites          │
 * │     conferenceDataVersion: 1,        // enable Meet creation   │
 * │     requestBody: {                                              │
 * │       summary, start, end, attendees,                           │
 * │       conferenceData: {                                         │
 * │         createRequest: {                                        │
 * │           requestId: crypto.randomUUID(),                       │
 * │           conferenceSolutionKey: { type: 'hangoutsMeet' },      │
 * │         },                                                      │
 * │       },                                                        │
 * │     },                                                          │
 * │   });                                                           │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 5. Tool return values (Tools kya return karte hain)             │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Kya hai: Tools STRING return karte hain. LLM is string ko       │
 * │          ToolMessage ki tarah padhti hai aur apna final reply   │
 * │          banane ke liye use karti hai.                          │
 * │                                                                 │
 * │ Objects/arrays → JSON.stringify() karo return karne se pehle.   │
 * │ Errors → descriptive error string return karo (throw mat karo), │
 * │           taake LLM user ko problem bata sake.                  │
 * │                                                                 │
 * │ Code template:                                                  │
 * │   // Success object ke saath:                                   │
 * │   return JSON.stringify(result);                                │
 * │                                                                 │
 * │   // Success simple message ke saath:                           │
 * │   return \`Event create ho gaya. Meet link: ${response.data.hangoutLink}\`│
 * │                                                                 │
 * │   // Graceful error (throw mat karo — string return karo):      │
 * │   } catch (err) {                                               │
 * │     console.error('Tool error:', err);                          │
 * │     return 'Calendar se connect karne mein failed.';            │
 * │   }                                                             │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ======================================================================
 * COMPLETE EXAMPLE WITH REAL DATA
 * ======================================================================
 * 
 * User (via agent): "Kal meeting banao Sujoy ke saath"
 * 
 * LLM decides: create-event tool call karna hai
 * 
 * LLM calls: create-event with arguments:
 * {
 *   "summary": "Meeting with Sujoy",
 *   "start": {
 *     "dateTime": "2026-03-04T14:00:00",
 *     "timeZone": "Asia/Kolkata"
 *   },
 *   "end": {
 *     "dateTime": "2026-03-04T15:00:00", 
 *     "timeZone": "Asia/Kolkata"
 *   },
 *   "attendees": [
 *     { "email": "sujoy@example.com" }
 *   ]
 * }
 * 
 * Tool executes:
 *   → Google Calendar API call
 *   → conferenceDataVersion: 1 (Meet link create)
 *   → sendUpdates: 'all' (email invites)
 * 
 * Tool returns:
 * "The meeting has been created. Meet link: https://meet.google.com/abc-defg-hij"
 * 
 * LLM reads this and tells user:
 * "Meeting create ho gaya kal 2pm ke liye Sujoy ke saath. 
 *  Meet link: https://meet.google.com/abc-defg-hij"
 * 
 * ======================================================================
 */

// ======================================================================
// SECTION 1: IMPORTS
// ======================================================================
import { tool } from '@langchain/core/tools';
import { google } from 'googleapis';
import z from 'zod';

// ======================================================================
// SECTION 2: GOOGLE OAUTH2 CLIENT
// ======================================================================
//
// Ek shared client dono tools use karte hain.
// googleapis automatically token refresh handle karta hai jab ACCESS_TOKEN expire ho.

const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URL,
);

oauth2Client.setCredentials({
    access_token: process.env.GOOGLE_ACCESS_TOKEN,
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

// ======================================================================
// SECTION 3: GET EVENTS TOOL - Events Dhondhne Ka Tool
// ======================================================================
//
// User ke primary calendar mein query + date range ke hisaab se search karta hai.
// Matching events ka JSON string return karta hai (title, time, attendees, Meet link).

export const getEventsTool = tool(
    async (params) => {
        const { q, timeMin, timeMax } = params as {
            q: string;
            timeMin: string;
            timeMax: string;
        };

        try {
            const response = await calendar.events.list({
                calendarId: 'primary',
                q,
                timeMin,
                timeMax,
            });

            const result = response.data.items?.map((event) => ({
                id: event.id,
                summary: event.summary,
                status: event.status,
                organiser: event.organizer,
                start: event.start,
                end: event.end,
                attendees: event.attendees,
                meetingLink: event.hangoutLink,
                eventType: event.eventType,
            }));

            return JSON.stringify(result);
        } catch (err) {
            console.error('Calendar Fetch Error:', err);
            return 'Calendar se connect karne mein failed.';
        }
    },
    {
        name: 'get-events',
        description: 'Calendar events dhondho query aur date range ke hisaab se.',
        schema: z.object({
            q: z.string().describe(
                "Search query. Match ho sakta hai: summary, description, location, attendee display name/email, ya organiser name/email."
            ),
            timeMin: z.string().describe('Date range ka start. ISO datetime string.'),
            timeMax: z.string().describe('Date range ka end. ISO datetime string.'),
        }),
    }
);

// ======================================================================
// SECTION 4: CREATE EVENT TOOL - Naya Event Banane Ka Tool
// ======================================================================
//
// Naya calendar event create karta hai with:
//   - Google Meet link (conferenceDataVersion: 1)
//   - Saare attendees ko email invites (sendUpdates: 'all')
//   - Unique requestId prevents duplicate Meet rooms on retries

const createEventSchema = z.object({
    summary: z.string().describe('Event ka title'),
    start: z.object({
        dateTime: z.string().describe('Event start hone ka time, ISO datetime string'),
        timeZone: z.string().describe('IANA timezone string, jaise "Asia/Kolkata"'),
    }),
    end: z.object({
        dateTime: z.string().describe('Event khatam hone ka time, ISO datetime string'),
        timeZone: z.string().describe('IANA timezone string, jaise "Asia/Kolkata"'),
    }),
    attendees: z.array(
        z.object({
            email: z.string().describe('Attendee ka email address'),
            displayName: z.string().optional().describe('Attendee ka naam. Optional.'),
        })
    ),
});

type EventData = z.infer<typeof createEventSchema>;

export const createEventTool = tool(
    async (eventData) => {
        const { summary, start, end, attendees } = eventData as EventData;

        try {
            const response = await calendar.events.insert({
                calendarId: 'primary',
                sendUpdates: 'all',   // attendees ko email invites bhejta hai
                conferenceDataVersion: 1,        // Google Meet enable karta hai
                requestBody: {
                    summary,
                    start,
                    end,
                    attendees,
                    conferenceData: {
                        createRequest: {
                            requestId: crypto.randomUUID(), // unique ID har request ke liye
                            conferenceSolutionKey: {
                                type: 'hangoutsMeet',
                            },
                        },
                    },
                },
            });

            if (response.status === 200 || response.status === 201) {
                return `Meeting create ho gaya. Meet link: ${response.data.hangoutLink ?? 'N/A'}`;
            }

            return "Meeting create nahi ho saka.";
        } catch (err) {
            console.error('Calendar Create Error:', err);
            return 'Meeting create karne mein error aaya.';
        }
    },
    {
        name: 'create-event',
        description: 'Naya Google Calendar event banao Meet link ke saath aur invites bhejo.',
        schema: createEventSchema,
    }
);