const express = require("express");
const router = express.Router();
const supabase = require("../config/supabase");
const verifyGroupPin = require("../utils/verifyPin");

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

// POST a new contribution (requires group PIN)
router.post("/", async (req, res) => {
  const { group_id, member_id, amount, pin } = req.body;

  const valid = await verifyGroupPin(group_id, pin);

  if (!valid) {
    return res.status(403).json({ error: "Incorrect PIN." });
  }

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
