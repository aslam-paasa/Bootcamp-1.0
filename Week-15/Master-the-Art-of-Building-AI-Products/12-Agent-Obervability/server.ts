import express from 'express';
import { google } from 'googleapis';

const app = express();

const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URL
);


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