const express = require("express");
const router = express.Router();
const supabase = require("../config/supabase");

// GET all groups
router.get("/", async (req, res) => {
  const { data, error } = await supabase.from("groups").select("*");

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

// POST a new group
router.post("/", async (req, res) => {
  const { name, contribution_amount, frequency, created_by } = req.body;

  const { data, error } = await supabase
    .from("groups")
    .insert([{ name, contribution_amount, frequency, created_by }])
    .select();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(201).json(data);
});

module.exports = router;
