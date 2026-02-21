import cors from "cors";
import express from "express";

const app = express()
app.use(express.json())
app.use(cors())

const PORT = 4000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))