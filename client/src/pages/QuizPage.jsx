import { useEffect, useState } from "react";

import {
    useParams,
    useNavigate
} from "react-router-dom";

import API from "../services/api";

function QuizPage() {

    const { quizId } = useParams();

    const navigate = useNavigate();

    const [questions, setQuestions] = useState([]);

    const [answers, setAnswers] = useState({});

    const [timeLeft, setTimeLeft] = useState(0);

    // FETCH QUESTIONS
    useEffect(() => {

        fetchQuestions();

    }, []);

    const fetchQuestions = async () => {

        try {

            // GET QUESTIONS
            const res = await API.get(
                `/quizzes/${quizId}/questions`
            );

            setQuestions(res.data);

            // GET QUIZ DETAILS
            const quizRes = await API.get(
                `/quizzes`
            );

            const currentQuiz =
                quizRes.data.quizzes.find(
                    q => q._id === quizId
                );

            if (currentQuiz) {

                // CONVERT MINUTES TO SECONDS
                setTimeLeft(
                    currentQuiz.duration * 60
                );

            }

        } catch (error) {

            console.log(error);

        }

    };

    // HANDLE ANSWERS
    const handleOptionChange = (
        questionId,
        option
    ) => {

        setAnswers({
            ...answers,
            [questionId]: option
        });

    };

    // SUBMIT QUIZ
    const handleSubmit = async () => {

        try {

            const formattedAnswers =
                Object.keys(answers).map(
                    (questionId) => ({
                        questionId,
                        answer: answers[questionId]
                    })
                );

            const token =
                localStorage.getItem("token");

            const startedAt =
                localStorage.getItem("startedAt");

            const res = await API.post(
                `/quizzes/${quizId}/submit`,
                {
                    answers: formattedAnswers,
                    startedAt
                },
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            // GO TO RESULT PAGE
            navigate("/result", {
                state: res.data
            });

        } catch (error) {

            alert(error.response.data.message);

        }

    };

    // STORE START TIME
    useEffect(() => {

        localStorage.setItem(
            "startedAt",
            new Date()
        );

    }, []);

    // TIMER COUNTDOWN
    useEffect(() => {

        if (timeLeft <= 0) return;

        const timer = setInterval(() => {

            setTimeLeft((prev) => prev - 1);

        }, 1000);

        return () => clearInterval(timer);

    }, [timeLeft]);

    // AUTO SUBMIT
    useEffect(() => {

        if (
            timeLeft === 0 &&
            questions.length > 0
        ) {

            handleSubmit();

        }

    }, [timeLeft]);

    return (

        <div className="min-h-screen bg-gray-100 p-6">

            <h1 className="text-4xl font-bold mb-8 text-center">
                Quiz
            </h1>

            {/* TIMER */}
            <div className="text-center mb-6">

                <span className="bg-red-500 text-white px-6 py-3 rounded-lg text-xl font-bold">

                    Time Left:
                    {" "}
                    {Math.floor(timeLeft / 60)}
                    :
                    {(timeLeft % 60)
                        .toString()
                        .padStart(2, "0")}

                </span>

            </div>

            {/* QUESTIONS */}
            <div className="space-y-6">

                {
                    questions.map((q, index) => (

                        <div
                            key={q._id}
                            className="bg-white p-6 rounded-xl shadow-md"
                        >

                            <h2 className="text-xl font-bold mb-4">

                                Q{index + 1}.
                                {" "}
                                {q.question}

                            </h2>

                            <div className="space-y-2">

                                {
                                    q.options.map((option) => (

                                        <label
                                            key={option}
                                            className="block"
                                        >

                                            <input
                                                type="radio"
                                                name={q._id}
                                                value={option}
                                                onChange={() =>
                                                    handleOptionChange(
                                                        q._id,
                                                        option
                                                    )
                                                }
                                            />

                                            <span className="ml-2">
                                                {option}
                                            </span>

                                        </label>

                                    ))
                                }

                            </div>

                        </div>

                    ))
                }

            </div>

            {/* SUBMIT BUTTON */}
            <button
                onClick={handleSubmit}
                className="mt-8 bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700"
            >
                Submit Quiz
            </button>

        </div>

    )

}

export default QuizPage