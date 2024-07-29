const ChatModel = require('../models/chatModel.js')

const getChats = (req, res) => {
    ChatModel
        .find()
        .then((chats) => {
            res.status(200).json(chats)
        })
        .catch((error) => {
            res.status(500).json({ message: 'Error retrieving chats', error: error })
        })
}

const createChat = (req, res) => {
    const chatData = req.body
    const newChat = new ChatModel(chatData)

    newChat.save()
        .then(() => {
            res.status(201).json({ message: 'Chat added successfully' })
        })
        .catch(error => {
            res.status(500).json({ message: 'Error adding chat', error: error })
        })
}

const addMessage = (req, res) => {
    const { chatId } = req.params
    const newMessage = req.body

    ChatModel.findByIdAndUpdate(
        chatId,
        { $push: { messages: newMessage } },
        { new: true }
    )
        .then(updatedChat => res.status(200).json(updatedChat))
        .catch(error => {
            console.error('Error adding message:', error)
            res.status(500).json({ message: 'Error adding message', error: error })
        })
}

const editChat = (req, res) => {
    const { chatId } = req.params
    const { name, surname } = req.body

    console.log('Received data:', { chatId, name, surname })

    ChatModel.findByIdAndUpdate(
        chatId,
        { name, surname },
        { new: true }
    )
        .then(updatedChat => {
            if (!updatedChat) {
                return res.status(404).json({ message: 'Chat not found' })
            }
            console.log('Updated chat:', updatedChat)
            res.status(200).json(updatedChat)
        })
        .catch(error => {
            console.error('Error updating Chat:', error)
            res.status(500).json({ message: 'Error updating Chat', error })
        })
}

const deleteChat = (req, res) => {
    const chatId = req.params._id
    ChatModel
        .findByIdAndDelete(chatId)
        .then(() => {
            res.status(200).json({ message: 'Chat deleted successfully' })
        })
        .catch((error) => {
            res.status(500).json({ message: 'Error deleting chat', error: error })
        })
}

module.exports = { getChats, createChat, addMessage, editChat, deleteChat }