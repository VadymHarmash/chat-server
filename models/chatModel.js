const mongoose = require('mongoose')

const Schema = mongoose.Schema

const chatSchema = new Schema({
    avatar: String,
    name: String,
    surname: String,
    messages: [
        {
            sender: String,
            text: String,
            date: { type: Date, default: Date.now },
        }
    ]
})

const ChatModel = mongoose.model('Chat', chatSchema)
module.exports = ChatModel