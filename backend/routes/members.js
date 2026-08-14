const express = require("express");
const router = express.Router();
const supabase = require("../config/supabase");

// GET all members of a specific group
router.get("/:groupId", async (req, res) => {
  const { groupId } = req.params;

  const { data, error } = await supabase
    .from("members")
    .select("*")
    .eq("group_id", groupId);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

// POST a new member to a group
router.post("/", async (req, res) => {
  const { group_id, name } = req.body;

  const { data, error } = await supabase
    .from("members")
    .insert([{ group_id, name }])
    .select();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(201).json(data);
});

module.exports = router;
