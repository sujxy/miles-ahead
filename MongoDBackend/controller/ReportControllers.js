import userModel from "../models/User.js";


// const AddReport1 = async (req, res) => {
//     try {
//         const report1_desc = req.body.report1_desc;
//         const userEmail = req.body.email;
//         const scores=({
//             E:req.body.scores.E,
//             A:req.body.scores.A,
//             I:req.body.scores.I,
//             R:req.body.scores.R,
//             C:req.body.scores.C,
//             S:req.body.scores.S,
//         })
//         await userModel.findOneAndUpdate(
//             { email: userEmail },
//             { $set: { report1_desc: report1_desc,scores:scores} },
//             { new: true }
//         )
//         res.staus(200).json({ staus: "success", message: "Report 1 analysis added " })
//     } catch (error) {
//         res.status(500).json({ status: "fail", message: "error from backend" });
//         console.log(error)
//     }
// }

const AddReport1 = async (req, res) => {
    try {
        const { report1_desc, email, scores } = req.body;
        const updatedUser = await userModel.findOneAndUpdate(
            { email: email },
            { $set: { report1_desc: report1_desc, scores: scores } },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ status: "fail", message: "User not found" });
        }

        res.status(200).json({ status: "success", message: "Report 1 analysis added" });
    } catch (error) {
        res.status(500).json({ status: "fail", message: "Error from backend" });
        console.log(error);
    }
};

const AddReport2 = async (req, res) => {
    try {
        const { report2_desc, email } = req.body;
        const updatedUser = await userModel.findOneAndUpdate(
            { email: email },
            { $set: { report2_desc: report2_desc } },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ status: "fail", message: "User not found" });
        }

        res.status(200).json({ status: "success", message: "Report 2 analysis added" });
    } catch (error) {
        res.status(500).json({ status: "fail", message: "Error from backend" });
        console.log(error);
    }
};

const AddReport3 = async (req, res) => {
    try {
        const { report3_desc, email } = req.body;
        const updatedUser = await userModel.findOneAndUpdate(
            { email: email },
            { $set: { report3_desc: report3_desc } },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ status: "fail", message: "User not found" });
        }

        res.status(200).json({ status: "success", message: "Report 3 analysis added" });
    } catch (error) {
        res.status(500).json({ status: "fail", message: "Error from backend" });
        console.log(error);
    }
};




export {AddReport1,AddReport2,AddReport3};