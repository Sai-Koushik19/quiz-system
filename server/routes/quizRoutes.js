const express = require("express");

const router = express.Router();

const protect =
    require("../middleware/authMiddleware");

const adminOnly =
    require("../middleware/adminMiddleware");

const {
    createQuiz,
    getQuizzes,
    addQuestion,
    updateQuestion,
    getQuestionsByQuiz,
    submitQuiz,
    updateQuiz,
    deleteQuiz
} = require("../controllers/quizController");


// CREATE QUIZ
router.post(
    "/",
    protect,
    adminOnly,
    createQuiz
);


// GET ALL QUIZZES
router.get("/", getQuizzes);


// UPDATE QUIZ
router.put(
    "/:quizId",
    protect,
    adminOnly,
    updateQuiz
);


// DELETE QUIZ
router.delete(
    "/:quizId",
    protect,
    adminOnly,
    deleteQuiz
);


// ADD QUESTION
router.post(
    "/:quizId/questions",
    protect,
    adminOnly,
    addQuestion
);


// UPDATE QUESTION
router.put(
    "/questions/:questionId",
    protect,
    adminOnly,
    updateQuestion
);


// GET QUESTIONS
router.get(
    "/:quizId/questions",
    getQuestionsByQuiz
);


// SUBMIT QUIZ
router.post(
    "/:quizId/submit",
    protect,
    submitQuiz
);


module.exports = router;