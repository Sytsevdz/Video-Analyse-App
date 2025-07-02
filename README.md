# Video Analyzer App

This is a small React application for annotating YouTube sports videos.

Features include:
- Load a YouTube video via URL.
- Mark moments with keyboard shortcuts or buttons.
- Choose between the `matches_heren` and `matches` tables (via a dropdown) to store and load annotations.
- Download annotations as JSON.

The app has the Supabase URL and API key configured directly in `src/supabaseClient.js` for the ACC environment, so no extra environment variables are required.

Running `npm run build` will generate a simple `dist` folder containing the HTML and source files so the app can be served as static assets.
 
