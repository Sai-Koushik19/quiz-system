const express = require("express");

const router = express.Router();

const protect =
    require("../middleware/authMiddleware");

const {
    getLeaderboard,
    getUserResults
} = require("../controllers/resultController");


// GET USER RESULT HISTORY
router.get(
    "/my-results",
    protect,
    getUserResults
);


// GET LEADERBOARD
router.get(
    "/:quizId/leaderboard",
    getLeaderboard
);

module.exports = router;