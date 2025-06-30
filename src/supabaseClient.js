import { createClient } from '@supabase/supabase-js';

// Direct Supabase credentials for the ACC environment
const supabaseUrl = 'https://nbsrkypcjkevncgzepqs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzIiwicmVmIjoibmJzcmt5cGNqa2V2bmNnemVwcXMiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTc1MDM0MjU0MCwiZXhwIjoyMDY1OTE4NTQwfQ.eIrHOXCzCfquju-LJibDjZZfVLt4hPQMNitY1kaO8jE';

export const supabase = createClient(supabaseUrl, supabaseKey);
