/**
 * 3. GOOGLE CALENDAR TOOL LAYER
 *
 *    This file is responsible for:
 *    1. Connecting to Google Calendar using OAuth2
 *    2. Defining tools that the Assistant can use
 *
 *    The Assistant DOES NOT directly call Google APIs.
 *    Instead: Assistant → ToolNode → Tool → Google Calendar API
 *
 *    We define two tools:
 *    • get-events   → Fetch events
 *    • create-event → Create a new meeting
 *
 * Each tool:
 *   - Has a name
 *   - Has a description
 *   - Has a strict input schema (Zod validation)
 *   - Executes real Google Calendar API calls
 */

import { tool } from '@langchain/core/tools';
import { google } from 'googleapis';
import z from 'zod';

/**
 * Step 1: Setup Google OAuth2 Authentication
 *
 * We create an OAuth2 client using:
 *   - Client ID
 *   - Client Secret
 *   - Redirect URL
 *
 * Then attach:
 *   - Access Token
 *   - Refresh Token
 *
 * This allows secure communication with Google APIs.
 */
const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URL
);

oauth2Client.setCredentials({
    access_token: process.env.GOOGLE_ACCESS_TOKEN,
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

/**
 * Create Google Calendar instance
 * This object is used to call calendar.events.list() and insert().
 */
const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

/**
 * Step 2: Define get-events Tool
 *
 * Purpose:
 *   Fetch events from Google Calendar.
 *
 * Input Required:
 *   - q       → search query
 *   - timeMin → start datetime
 *   - timeMax → end datetime
 *
 * Flow:
 *   Assistant generates tool call →
 *   Tool executes →
 *   Google Calendar returns events →
 *   Tool simplifies data →
 *   Tool returns JSON string back to Assistant
 */
type Params = {
    q: string;
    timeMin: string;
    timeMax: string;
};

export const getEventsTool = tool(
    async (params) => {
        const { q, timeMin, timeMax } = params as Params;

        try {
            const response = await calendar.events.list({
                calendarId: 'primary',
                q: q,
                timeMin,
                timeMax,
            });

            const result = response.data.items?.map((event) => {
                return {
                    id: event.id,
                    summary: event.summary,
                    status: event.status,
                    organiser: event.organizer,
                    start: event.start,
                    end: event.end,
                    attendees: event.attendees,
                    meetingLink: event.hangoutLink,
                    eventType: event.eventType,
                };
            });

            return JSON.stringify(result);
        } catch (err) {
            console.log('Calendar Fetch Error:', err);
        }

        return 'Failed to connect to the calendar.';
    },
    {
        name: 'get-events',
        description: 'Call to get the calendar events.',
        schema: z.object({
            q: z
                .string()
                .describe(
                    "The query to be used to get events from google calendar. It can be one of these values: summary, description, location, attendees display name, attendees email, organiser's name, organiser's email"
                ),
            timeMin: z.string().describe('The from datetime to get events.'),
            timeMax: z.string().describe('The to datetime to get events.'),
        }),
    }
);

/**
 * Step 3: Define create-event Schema (Input Validation)
 *
 * We use Zod to strictly define what the Assistant
 * is allowed to send to this tool.
 *
 * Required:
 *   - summary (event title)
 *   - start datetime + timezone
 *   - end datetime + timezone
 *   - attendees array (displayName is now optional to handle
 *     cases where the user doesn't provide a name)
 *
 * FIX: `displayName` is now `.optional()` so the LLM can omit it
 * when only an email is known. Previously this caused a 400 error:
 * "missing properties: 'displayName'"
 */
type Attendee = {
    email: string;
    displayName?: string; // FIX: made optional
};

const createEventSchema = z.object({
    summary: z.string().describe('The title of the event'),
    start: z.object({
        dateTime: z.string().describe('The date time of start of the event.'),
        timeZone: z.string().describe('Current IANA timezone string.'),
    }),
    end: z.object({
        dateTime: z.string().describe('The date time of end of the event.'),
        timeZone: z.string().describe('Current IANA timezone string.'),
    }),
    attendees: z.array(
        z.object({
            email: z.string().describe('The email of the attendee'),
            displayName: z
                .string()
                .optional()
                .describe('The name of the attendee. Optional if not known.'),
        })
    ),
});

/**
 * Step 4: Define create-event Tool
 *
 * Purpose:
 *   Create a new meeting in Google Calendar.
 *
 * Features:
 *   - Inserts event
 *   - Sends invite to attendees
 *   - Automatically creates Google Meet link
 *
 * Flow:
 *   Assistant generates structured input →
 *   Tool validates using Zod →
 *   Tool calls calendar.events.insert() →
 *   Google creates event →
 *   Tool returns confirmation message
 */
type EventData = z.infer<typeof createEventSchema>;

export const createEventTool = tool(
    async (eventData) => {
        const { summary, start, end, attendees } = eventData as EventData;

        try {
            /* Google Calendar API: docs */ 
            const response = await calendar.events.insert({
                calendarId: 'primary',
                sendUpdates: 'all',
                conferenceDataVersion: 1,
                requestBody: {
                    summary,
                    start,
                    end,
                    attendees,
                    conferenceData: {
                        createRequest: {
                            requestId: crypto.randomUUID(),
                            conferenceSolutionKey: {
                                type: 'hangoutsMeet',
                            },
                        },
                    },
                },
            });

            if (response.status === 200 || response.status === 201) {
                return `The meeting has been created. Meet link: ${response.data.hangoutLink ?? 'N/A'}`;
            }

            return "Couldn't create a meeting.";
        } catch (err) {
            console.log('Calendar Create Error:', err);
            return 'Failed to create the meeting due to an error.';
        }
    },
    {
        name: 'create-event',
        description: 'Call to create the calendar events.',
        schema: createEventSchema,
    }
);