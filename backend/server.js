
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS
app.use(cors());

// Supabase client and other middleware
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


// GET /tasks?family_id=1
/*
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
*/
app.get('/tasks', async (req, res) => {
  const family_id = req.query.family_id || 1;  // Use family_id=1 for simplicity

  try {
    const { data, error } = await supabase
      .from('Tasks')
      .select('*')
      .eq('family_id', family_id);  // Filter tasks by family_id

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.status(200).json(data);  // Return tasks for family_id
  } catch (err) {
    console.error('Error fetching tasks:', err);
    res.status(500).json({ error: 'Server error' });
  }
});



// POST /tasks
app.post('/tasks', async (req, res) => {
  const { family_id, name, description, status } = req.body;

  // Ensure all necessary fields are provided
  if (!family_id || !name || !description || !status) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Insert the new task into the database
  const { data, error } = await supabase
    .from('Tasks')
    .insert([{ family_id, name, description, status }])
    .select();

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

// Suggested Tasks Endpoint
app.get('/suggestedtasks', async (req, res) => {
  const { data, error } = await supabase
    .from('suggestedtasks')
    .select('*');

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(200).json(data);
});

// Delete Tasks from task list
app.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error } = await supabase
      .from('Tasks')
      .delete()
      .eq('id', id);  // Delete task based on the task ID

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.status(200).json({ message: 'Task deleted successfully', data });
  } catch (err) {
    console.error('Error deleting task:', err);
    res.status(500).json({ error: 'Server error' });
  }
});
