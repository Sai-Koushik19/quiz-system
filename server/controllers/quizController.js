const Quiz = require("../models/Quiz");
const Question = require("../models/Question");
const Result = require("../models/Result");
const User = require("../models/User");


// CREATE QUIZ
const createQuiz = async (req, res) => {

    try {

        const {
            title,
            description,
            category,
            difficulty,
            duration
        } = req.body;

        const quiz = await Quiz.create({
            title,
            description,
            category,
            difficulty,
            duration,
            createdBy: req.user.id
        });

        res.status(201).json({
            message: "Quiz created successfully",
            quiz
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


// GET ALL QUIZZES
const getQuizzes = async (req, res) => {

    try {

        const search = req.query.search || "";

        const page = parseInt(req.query.page) || 1;

        const limit = parseInt(req.query.limit) || 5;

        const skip = (page - 1) * limit;

        const filter = {
            title: {
                $regex: search,
                $options: "i"
            }
        };

        const quizzes = await Quiz.find(filter)
            .skip(skip)
            .limit(limit);

        const total = await Quiz.countDocuments(filter);

        res.status(200).json({
            total,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            quizzes
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


// ADD QUESTION
const addQuestion = async (req, res) => {

    try {

        const { quizId } = req.params;

        const {
            question,
            options,
            correctAnswer
        } = req.body;

        const newQuestion = await Question.create({
            quizId,
            question,
            options,
            correctAnswer
        });

        res.status(201).json({
            message: "Question added successfully",
            question: newQuestion
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


// UPDATE QUESTION
const updateQuestion = async (req, res) => {

    try {

        const { questionId } = req.params;

        const updatedQuestion =
            await Question.findByIdAndUpdate(
                questionId,
                req.body,
                { new: true }
            );

        res.status(200).json({
            message:
                "Question updated successfully",
            updatedQuestion
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


// GET QUESTIONS BY QUIZ
const getQuestionsByQuiz = async (req, res) => {

    try {

        const { quizId } = req.params;

        const questions =
            await Question.find({ quizId });

        res.status(200).json(questions);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


// SUBMIT QUIZ
const submitQuiz = async (req, res) => {

    try {

        const { quizId } = req.params;

        const { answers, startedAt } =
            req.body;

        const questions =
            await Question.find({ quizId });

        let score = 0;

        questions.forEach((question) => {

            const userAnswer =
                answers.find(
                    ans =>
                        ans.questionId ==
                        question._id
                );

            if (
                userAnswer &&
                userAnswer.answer ===
                    question.correctAnswer
            ) {
                score++;
            }

        });

        const percentage =
            (score / questions.length) * 100;

        // TIMER
        const submittedAt = new Date();

        const timeTaken =
            Math.floor(
                (
                    submittedAt -
                    new Date(startedAt)
                ) / 1000
            );

        const quiz =
            await Quiz.findById(quizId);

        const allowedTime =
            quiz.duration * 60;

        if (timeTaken > allowedTime) {

            return res.status(400).json({
                message:
                    "Quiz time exceeded"
            });

        }

        const result =
            await Result.create({
                userId: req.user.id,
                quizId,
                score,
                totalQuestions:
                    questions.length,
                percentage,
                startedAt,
                submittedAt,
                timeTaken
            });

        res.status(200).json({
            message:
                "Quiz submitted successfully",
            score,
            totalQuestions:
                questions.length,
            percentage,
            timeTaken,
            result
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


// UPDATE QUIZ
const updateQuiz = async (req, res) => {

    try {

        const { quizId } = req.params;

        const updatedQuiz =
            await Quiz.findByIdAndUpdate(
                quizId,
                req.body,
                { new: true }
            );

        if (!updatedQuiz) {

            return res.status(404).json({
                message: "Quiz not found"
            });

        }

        res.status(200).json({
            message:
                "Quiz updated successfully",
            updatedQuiz
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


// DELETE QUIZ
const deleteQuiz = async (req, res) => {

    try {

        const { quizId } = req.params;

        const deletedQuiz =
            await Quiz.findByIdAndDelete(
                quizId
            );

        if (!deletedQuiz) {

            return res.status(404).json({
                message: "Quiz not found"
            });

        }

        await Question.deleteMany({
            quizId
        });

        await Result.deleteMany({
            quizId
        });

        res.status(200).json({
            message:
                "Quiz deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};
const getAnalytics = async (
    req,
    res
) => {

    try {

        // TOTAL USERS
        const totalUsers =
            await User.countDocuments();

        // TOTAL QUIZZES
        const totalQuizzes =
            await Quiz.countDocuments();

        // TOTAL RESULTS
        const totalAttempts =
            await Result.countDocuments();

        // AVERAGE PERCENTAGE
        const avgResult =
            await Result.aggregate([
                {
                    $group: {
                        _id: null,
                        avgPercentage: {
                            $avg:
                                "$percentage"
                        }
                    }
                }
            ]);

        const averageScore =
            avgResult[0]
                ?.avgPercentage || 0;

        res.status(200).json({
            totalUsers,
            totalQuizzes,
            totalAttempts,
            averageScore:
                averageScore.toFixed(2)
        });

    } catch (error) {

        res.status(500).json({
            message:
                error.message
        });

    }

};


module.exports = {
    createQuiz,
    getQuizzes,
    addQuestion,
    updateQuestion,
    getQuestionsByQuiz,
    submitQuiz,
    updateQuiz,
    deleteQuiz,
    getAnalytics
};