const Result = require("../models/Result");


// GET LEADERBOARD
const getLeaderboard = async (req, res) => {

    try {

        const { quizId } = req.params;

        const leaderboard = await Result.find({ quizId })
        .populate("userId", "name email")
        .sort({ score: -1 });

        res.status(200).json(leaderboard);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


// GET USER RESULT HISTORY
const getUserResults = async (req, res) => {

    try {

        const results = await Result.find({
            userId: req.user.id
        })
        .populate("quizId", "title category")
        .sort({ createdAt: -1 });

        res.status(200).json(results);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


module.exports = {
    getLeaderboard,
    getUserResults
};