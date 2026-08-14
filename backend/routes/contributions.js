const express = require("express");
const router = express.Router();
const supabase = require("../config/supabase");

// GET all contributions for a specific member
router.get("/:memberId", async (req, res) => {
  const { memberId } = req.params;

  const { data, error } = await supabase
    .from("contributions")
    .select("*")
    .eq("member_id", memberId);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

// POST a new contribution
router.post("/", async (req, res) => {
  const { group_id, member_id, amount } = req.body;

  const { data, error } = await supabase
    .from("contributions")
    .insert([{ group_id, member_id, amount }])
    .select();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(201).json(data);
});

module.exports = router;
