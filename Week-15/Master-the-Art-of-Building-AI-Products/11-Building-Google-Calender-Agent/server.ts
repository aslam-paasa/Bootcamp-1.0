/**
 * 2. GOOGLE OAUTH AUTHORIZATION SERVER
 *
 * Purpose:
 * This small Express server is responsible for:
 *   1. Redirecting user to Google login
 *   2. Receiving authorization code
 *   3. Exchanging code for access & refresh tokens
 *
 * Flow:
 *   Browser → /auth → Google Login
 *   Google  → /callback?code=XXXX
 *   Server  → Exchange code for tokens
 *   Tokens  → Stored in .env
 *
 * Important:
 * - access_token  → Used to call Google APIs (short-lived)
 * - refresh_token → Used to generate new access tokens (long-lived)
 *
 * Without this step, your calendar tools cannot work.
 */

import express from 'express';
import { google } from 'googleapis';

const app = express();

/**
 * Step 1: Create OAuth Client
 *
 * We give Google:
 *   - Client ID
 *   - Client Secret
 *   - Redirect URL
 *
 * These values come from Google Cloud Console.
 * This client helps us talk to Google securely.
 */
const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URL
);

/**
 * Step 2: /auth Route
 *
 * When someone opens: http://localhost:3600/auth
 * We:
 *   1. Create a Google login link using googleapis
 *   2. Redirect user to that link
 *
 * Important options:
 *   - scope          : Defines what access we want (Google Calendar)
 *   - access_type    : 'offline' gives us a refresh_token
 *   - prompt         : 'consent' forces Google to show permission screen
 */
app.get('/auth', (req, res) => {
    const scopes = ['https://www.googleapis.com/auth/calendar'];

    const url = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        prompt: 'consent',
        scope: scopes,
    });

    console.log('Redirecting to Google OAuth URL:', url);
    res.redirect(url);
});

/**
 * Step 3: /callback Route
 *
 * You do NOT manually call /callback.
 * After login, Google redirects to: http://localhost:3600/callback?code=XXXX
 *
 * Then we:
 *   1. Extract the code from the query string
 *   2. Exchange it via oauth2Client.getToken(code)
 *   3. Print tokens to the console so you can copy them into .env
 *
 * The response includes:
 *   - access_token  : used to call Google APIs (like calendar)
 *   - refresh_token : used to regenerate access_token when expired
 *   - expiry_date   : timestamp when access_token expires
 *
 * After this step, paste the tokens into your .env file.
 */
app.get('/callback', async (req, res) => {
    try {
        const code = req.query.code as string;

        if (!code) {
            res.status(400).send('Missing authorization code.');
            return;
        }

        const { tokens } = await oauth2Client.getToken(code);

        console.log('\n✅ Tokens received — copy these into your .env:\n');
        console.log(`GOOGLE_ACCESS_TOKEN=${tokens.access_token}`);
        console.log(`GOOGLE_REFRESH_TOKEN=${tokens.refresh_token}`);
        console.log('\nFull token object:', tokens);

        res.send('Connected ✅ Tokens printed to console. You can close this tab now.');
    } catch (err) {
        console.error('Token exchange error:', err);
        res.status(500).send('Failed to exchange token.');
    }
});

app.listen(3600, () => console.log('OAuth server running on http://localhost:3600'));