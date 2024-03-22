import userModel from "../models/User.js";

const AddUserConversation1 = async (req, res) => {
    try {
        const { email, conversation1 } = req.body;
        const updatedUser = await userModel.findOneAndUpdate(
            { email: email },
            { $set: { conversation1: conversation1 } },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ status: "fail", message: "User not found" });
        }

        res.status(200).json({ status: "success", message: "Conversation 1 added to MongoDB" });
    } catch (error) {
        res.status(500).json({ status: "fail", message: "Fail to add Conversation 1 to MongoDB" });
        console.log(error);
    }
};

const AddUserConversation2 = async (req, res) => {
    try {
        const { email, conversation2 } = req.body;
        const updatedUser = await userModel.findOneAndUpdate(
            { email: email },
            { $set: { conversation2: conversation2 } },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ status: "fail", message: "User not found" });
        }

        res.status(200).json({ status: "success", message: "Conversation 2 added to MongoDB" });
    } catch (error) {
        res.status(500).json({ status: "fail", message: "Fail to add Conversation 2 to MongoDB" });
        console.log(error);
    }
};

const AddUserConversation3 = async (req, res) => {
    try {
        const { email, conversation3 } = req.body;
        const updatedUser = await userModel.findOneAndUpdate(
            { email: email },
            { $set: { conversation3: conversation3 } },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ status: "fail", message: "User not found" });
        }

        res.status(200).json({ status: "success", message: "Conversation 3 added to MongoDB" });
    } catch (error) {
        res.status(500).json({ status: "fail", message: "Fail to add Conversation 3 to MongoDB" });
        console.log(error);
    }
};

export { AddUserConversation1, AddUserConversation2, AddUserConversation3 };
