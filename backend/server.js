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


// POST /tasks
app.post('/tasks', async (req, res) => {
  const { family_id, name, description } = req.body;

  if (!family_id || !name) {
    return res.status(400).json({ error: 'Family ID and Task Name are required' });
  }

  const { data, error } = await supabase
    .from('Tasks')
    .insert([{ family_id, name, description }]);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(201).json(data);
});


// PUT /tasks/:id
app.put('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ error: 'Task status is required' });
  }

  const { data, error } = await supabase
    .from('Tasks')
    .update({ status })
    .eq('id', id);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(200).json(data);
});

