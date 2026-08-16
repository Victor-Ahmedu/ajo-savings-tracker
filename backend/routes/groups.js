const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const supabase = require("../config/supabase");
const verifyGroupPin = require("../utils/verifyPin");

// GET all groups (never expose pin_hash)
router.get("/", async (req, res) => {
  const { data, error } = await supabase
    .from("groups")
    .select("id, name, contribution_amount, frequency, created_by, created_at");

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

// GET a single group by ID (never expose pin_hash)
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from("groups")
    .select("id, name, contribution_amount, frequency, created_by, created_at")
    .eq("id", id)
    .single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

// POST a new group
router.post("/", async (req, res) => {
  const { name, contribution_amount, frequency, created_by, pin } = req.body;

  if (!pin || pin.length < 4) {
    return res
      .status(400)
      .json({ error: "A PIN of at least 4 digits is required." });
  }

  const pin_hash = await bcrypt.hash(pin, 10);

  const { data, error } = await supabase
    .from("groups")
    .insert([{ name, contribution_amount, frequency, created_by, pin_hash }])
    .select("id, name, contribution_amount, frequency, created_by, created_at");

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(201).json(data);
});

// POST verify a group's PIN
router.post("/:id/verify-pin", async (req, res) => {
  const { id } = req.params;
  const { pin } = req.body;

  const valid = await verifyGroupPin(id, pin);

  res.json({ valid });
});

module.exports = router;
