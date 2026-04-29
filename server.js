import express from "express"
import { callAgent } from "./agent.js"

const app = express()
app.use(express.json())
app.use(express.static("public"))

app.get("/api/test", async (req, res) => {

    const result = await callAgent()

    res.json({response:result});
});

app.post("/api/chat", async(req,res) => {
  const { prompt } = req.body
  const result = await callAgent(prompt)
  res.json(result)
})

app.listen(3000, ()=> console.log("started"))