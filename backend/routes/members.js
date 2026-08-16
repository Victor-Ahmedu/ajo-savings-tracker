const express = require('express');
const router = express.Router();
const supabase = require('../config/supabase');
const verifyGroupPin = require('../utils/verifyPin');

// GET all members of a group (includes both pending and approved)
router.get('/:groupId', async (req, res) => {
  const { groupId } = req.params;

  const { data, error } = await supabase
    .from('members')
    .select('*')
    .eq('group_id', groupId);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

// POST a join request (status defaults to 'pending')
router.post('/', async (req, res) => {
  const { group_id, name } = req.body;

  const { data, error } = await supabase
    .from('members')
    .insert([{ group_id, name, status: 'pending' }])
    .select();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(201).json(data);
});

// PATCH approve a pending member (requires group PIN)
router.patch('/:id/approve', async (req, res) => {
  const { id } = req.params;
  const { group_id, pin } = req.body;

  const valid = await verifyGroupPin(group_id, pin);

  if (!valid) {
    return res.status(403).json({ error: 'Incorrect PIN.' });
  }

  const { data, error } = await supabase
    .from('members')
    .update({ status: 'approved' })
    .eq('id', id)
    .select();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

module.exports = router;