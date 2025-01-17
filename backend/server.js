const express = require("express");
const { createClient } = require("@supabase/supabase-js");
const cors = require("cors"); // Only require cors once

const app = express();
const port = 3001; // Port for the server

// Supabase URL and Service Role Key
const supabaseUrl = "https://zlpubqduegguuqeheysx.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpscHVicWR1ZWdndXVxZWhleXN4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMzc0ODAyNCwiZXhwIjoyMDQ5MzI0MDI0fQ.Q9q5ZQFcDteEdg0ocgGCyK8uMlG973heyQyNJUwIde0";
const supabase = createClient(supabaseUrl, supabaseKey);

// Middleware
app.use(cors()); // Use cors middleware here

// API endpoint to fetch last sign-in users
app.get('/api/last-sign-ins', async (req, res) => {
  try {
    // SQL Query to join and filter the data
    const query = `
      SELECT u.name, au.email, au.last_sign_in_at
      FROM auth.users au
      JOIN users u ON au.email = u.email
      WHERE au.last_sign_in_at >= current_date
      AND au.last_sign_in_at < current_date + interval '1 day';
    `;

    // Run the raw SQL query using Supabase
    const { data, error } = await supabase.rpc('raw_sql', { query });

    if (error) {
      console.error('Error fetching last sign-ins:', error.message);
      return res.status(500).json({ error: error.message });
    }

    // Send the response back to the frontend
    res.status(200).json(data);
  } catch (err) {
    console.error('Error in API:', err.message);
    res.status(500).json({ error: 'Unable to fetch data' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
