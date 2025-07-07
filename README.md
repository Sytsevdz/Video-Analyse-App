# Video Analyzer App

This is a small React application for annotating YouTube sports videos.

Features include:
- Load a YouTube video via URL.
- Mark moments with keyboard shortcuts or buttons.
- Choose between the `matches_heren`, `matches`, `matches_u21d` and `matches_u21h` tables (via a dropdown) to store and load annotations.
- Download annotations as JSON.
- Switch to Analysis View to play clips per category (15 seconds each). Use the
  space bar to pause/resume and arrow keys to rewind or fast-forward by 5
  seconds.

Create a `.env` file based on `.env.example` and fill in your Supabase credentials. The app reads the URL and API key from the `VITE_SUPABASE_URL` and `VITE_SUPABASE_KEY` variables at build time.
 
