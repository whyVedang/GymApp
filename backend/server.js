require('dotenv').config()
const express = require('express')
const cors = require("cors")
const mongoose = require("mongoose")

const app = express()
const port = process.env.PORT || 4000

// ✅ Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}))
app.use(express.json()) // 👈 This is the one that enables req.body

// ✅ Logger (optional)
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`)
  next()
})

// ✅ Routes
const workoutRoutes = require("./routes/workout")
app.use('/workouts', workoutRoutes)

// ✅ Base route
app.get('/', (req, res) => {
  res.json({ message: "Server is live 🎉" })
})

// ✅ DB + Start server
mongoose.connect(process.env.MONGOURL)
  .then(() => {
    console.log("Connected to MongoDB")
    app.listen(port, () => console.log(`Server running on port ${port}`))
  })
  .catch((err) => console.log(err))
