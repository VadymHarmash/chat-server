require('dotenv').config()

const express = require('express')
const app = express()
const chatController = require('./controllers/chatController')
const connectDB = require('./db')

const PORT = process.env.PORT || 5000

app.use(express.json())

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-type,Accept,X-Custom-Header");

    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    next();
})

connectDB()

app.get('/chats', chatController.getChats)
app.post('/chats', chatController.createChat)
app.post('/chats/:chatId/messages', chatController.addMessage)
app.post('/chats/:chatId', chatController.editChat)
app.delete('/chats/:_id', chatController.deleteChat)

app.listen(PORT, (err) => err ? console.log(err) : console.log(`Listening port ${PORT}`))