const express = require('express');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// GET /tasks?family_id=1
app.get('/tasks', async (req, res) => {
  const { family_id } = req.query;

  if (!family_id) {
    return res.status(400).json({ error: 'Family ID is required' });
  }

  const { data, error } = await supabase
    .from('Tasks')
    .select('*')
    .eq('family_id', family_id);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(200).json(data);
});

