# Video Analyzer App

This is a small React application for annotating YouTube sports videos.

Features include:
- Load a YouTube video via URL.
- Mark moments with keyboard shortcuts or buttons.
- Store annotations in Supabase using the `matches_heren` table.
- Download annotations as JSON.

The app has the Supabase URL and API key configured directly in `src/supabaseClient.js` for the ACC environment, so no extra environment variables are required.
