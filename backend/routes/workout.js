const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Workout = require("../model/workoutModel");

// 🟢 Get all workouts
router.get("/", async (req, res) => {
  const workouts = await Workout.find({}).sort({ createdAt: -1 });
  res.status(200).json(workouts);
});

// 🟢 Get single workout
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid ID" });
  }

  const workout = await Workout.findById(id);
  if (!workout) {
    return res.status(404).json({ error: "Workout not found" });
  }

  res.status(200).json(workout);
});

// 🟢 Create a new workout
router.post("/", async (req, res) => {
  const { title, reps, weight } = req.body;

  try {
    const workout = await Workout.create({ title, reps, weight });
    console.log("Workout created:", workout);
    res.status(201).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 🟢 Delete workout
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid ID" });
  }

  const workout = await Workout.findByIdAndDelete(id);
  if (!workout) {
    return res.status(404).json({ error: "Workout not found" });
  }

  res.status(200).json({ message: "Workout deleted" });
});

// 🟢 Update workout
router.patch("/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid ID" });
  }

  const workout = await Workout.findByIdAndUpdate(id, req.body, { new: true });
  if (!workout) {
    return res.status(404).json({ error: "Workout not found" });
  }

  res.status(200).json(workout);
});

module.exports = router;
