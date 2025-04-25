const express = require("express")
const app = express();
const geminiRoutes = require('./routes/gemini.routes');

app.use(express.json());
app.use('/api/gemini', geminiRoutes);

const PORT = process.env.PORT || 80
app.listen(PORT,()=>{
    console.log("running on port: ",PORT)
})