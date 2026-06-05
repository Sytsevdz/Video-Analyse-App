# Video Analyzer App

This is a small React application for annotating YouTube sports videos.

Features include:
- Load a YouTube video via URL (supports regular and `/live/` links).
- Mark moments with keyboard shortcuts or buttons.
- Store and load annotations per team in the `matches` Supabase table.
- Download annotations as JSON.
- Switch to Analysis View to play clips per category (15 seconds each). Use the
  space bar to pause/resume and arrow keys to rewind or fast-forward by 5
  seconds.

Create a `.env` file based on `.env.example` and fill in your Supabase credentials. The app reads the URL and API key from the `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` variables at build time. Restart the dev server after changing these values.
 
