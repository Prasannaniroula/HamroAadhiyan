import Message from '../models/messages.models.js';

export const sendMessage = async (req, res) => {
    const {name,email,phone, subject, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ message: "Please fill all the required fields" });
    }

    try {
        const newMessage = new Message({
            name,
            email,
            phone:phone,
            subject: subject || "No Subject",
            message:message,
        });

        await newMessage.save();

        res.status(200).json({ message: "Message sent successfully" });
    } catch (error) {
        console.log("Error sending message:", error.message);
        res.status(500).json({ message: "Server error" });
    }
}