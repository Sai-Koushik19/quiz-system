const express = require("express");

const router = express.Router();

const protect =
    require("../middleware/authMiddleware");

const Result =
    require("../models/Result");


// GET USER RESULTS
router.get(
    "/:quizId/leaderboard",
    async (req, res) => {

        try {

            const { quizId } =
                req.params;

            const leaders =
                await Result.find({
                    quizId
                })
                .populate(
                    "userId",
                    "name"
                )
                .sort({
                    percentage: -1
                });

            res.status(200).json(
                leaders
            );

        } catch (error) {

            res.status(500).json({
                message:
                    error.message
            });

        }

    }
);

module.exports = router;