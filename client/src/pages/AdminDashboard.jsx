import {
    useState,
    useEffect
} from "react";

import {
    useNavigate
} from "react-router-dom";

import API from "../services/api";

function AdminDashboard() {

    const navigate = useNavigate();

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    // QUIZ FORM
    const [formData, setFormData] =
        useState({
            title: "",
            description: "",
            category: "",
            difficulty: "",
            duration: ""
        });

    // QUIZZES
    const [quizzes, setQuizzes] =
        useState([]);

    // EDIT QUIZ
    const [editingQuiz, setEditingQuiz] =
        useState(null);

    // QUESTION FORM
    const [questionData, setQuestionData] =
        useState({
            quizId: "",
            question: "",
            option1: "",
            option2: "",
            option3: "",
            option4: "",
            correctAnswer: ""
        });

    // QUESTIONS
    const [questions, setQuestions] =
        useState([]);

    // EDIT QUESTION
    const [
        editingQuestion,
        setEditingQuestion
    ] = useState(null);

    // FETCH QUIZZES
    useEffect(() => {

        fetchQuizzes();

    }, []);

    const fetchQuizzes = async () => {

        try {

            const res =
                await API.get("/quizzes");

            setQuizzes(
                res.data.quizzes
            );

        } catch (error) {

            console.log(error);

        }

    };

    // FETCH QUESTIONS
    const fetchQuestions = async (
        quizId
    ) => {

        try {

            const res = await API.get(
                `/quizzes/${quizId}/questions`
            );

            setQuestions(res.data);

        } catch (error) {

            console.log(error);

        }

    };

    // HANDLE QUIZ INPUT
    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]:
                e.target.value
        });

    };

    // HANDLE QUESTION INPUT
    const handleQuestionChange = (
        e
    ) => {

        setQuestionData({
            ...questionData,
            [e.target.name]:
                e.target.value
        });

        // FETCH QUESTIONS
        if (
            e.target.name === "quizId"
        ) {

            fetchQuestions(
                e.target.value
            );

        }

    };

    // EDIT QUIZ
    const handleEditClick = (
        quiz
    ) => {

        setEditingQuiz(quiz);

        setFormData({
            title: quiz.title,
            description:
                quiz.description,
            category: quiz.category,
            difficulty:
                quiz.difficulty,
            duration: quiz.duration
        });

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    };

    // CREATE / UPDATE QUIZ
    const handleSubmit = async (
        e
    ) => {

        e.preventDefault();

        try {

            const token =
                localStorage.getItem(
                    "token"
                );

            // UPDATE QUIZ
            if (editingQuiz) {

                await API.put(
                    `/quizzes/${editingQuiz._id}`,
                    formData,
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

                alert(
                    "Quiz updated successfully"
                );

            }

            // CREATE QUIZ
            else {

                await API.post(
                    "/quizzes",
                    formData,
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

                alert(
                    "Quiz created successfully"
                );

            }

            // RESET FORM
            setFormData({
                title: "",
                description: "",
                category: "",
                difficulty: "",
                duration: ""
            });

            setEditingQuiz(null);

            fetchQuizzes();

        } catch (error) {

            alert(
                error.response?.data
                    ?.message ||
                "Something went wrong"
            );

        }

    };

    // EDIT QUESTION
    const handleEditQuestion = (
        question
    ) => {

        setEditingQuestion(
            question
        );

        setQuestionData({
            quizId:
                question.quizId,
            question:
                question.question,
            option1:
                question.options[0],
            option2:
                question.options[1],
            option3:
                question.options[2],
            option4:
                question.options[3],
            correctAnswer:
                question.correctAnswer
        });

        window.scrollTo({
            top: 400,
            behavior: "smooth"
        });

    };

    // ADD / UPDATE QUESTION
    const handleQuestionSubmit =
        async (e) => {

            e.preventDefault();

            try {

                const token =
                    localStorage.getItem(
                        "token"
                    );

                // UPDATE QUESTION
                if (
                    editingQuestion
                ) {

                    await API.put(
                        `/quizzes/questions/${editingQuestion._id}`,
                        {
                            question:
                                questionData.question,

                            options: [
                                questionData.option1,
                                questionData.option2,
                                questionData.option3,
                                questionData.option4
                            ],

                            correctAnswer:
                                questionData.correctAnswer
                        },
                        {
                            headers: {
                                Authorization:
                                    `Bearer ${token}`
                            }
                        }
                    );

                    alert(
                        "Question updated successfully"
                    );

                }

                // ADD QUESTION
                else {

                    await API.post(
                        `/quizzes/${questionData.quizId}/questions`,
                        {
                            question:
                                questionData.question,

                            options: [
                                questionData.option1,
                                questionData.option2,
                                questionData.option3,
                                questionData.option4
                            ],

                            correctAnswer:
                                questionData.correctAnswer
                        },
                        {
                            headers: {
                                Authorization:
                                    `Bearer ${token}`
                            }
                        }
                    );

                    alert(
                        "Question added successfully"
                    );

                }

                fetchQuestions(
                    questionData.quizId
                );

                setEditingQuestion(
                    null
                );

                setQuestionData({
                    quizId: "",
                    question: "",
                    option1: "",
                    option2: "",
                    option3: "",
                    option4: "",
                    correctAnswer: ""
                });

            } catch (error) {

                alert(
                    error.response?.data
                        ?.message ||
                    "Something went wrong"
                );

            }

        };

    // DELETE QUIZ
    const handleDeleteQuiz =
        async (quizId) => {

            try {

                const token =
                    localStorage.getItem(
                        "token"
                    );

                await API.delete(
                    `/quizzes/${quizId}`,
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

                alert(
                    "Quiz deleted successfully"
                );

                fetchQuizzes();

            } catch (error) {

                alert(
                    error.response?.data
                        ?.message ||
                    "Something went wrong"
                );

            }

        };

    // LOGOUT
    const logout = () => {

        localStorage.removeItem(
            "token"
        );

        localStorage.removeItem(
            "user"
        );

        navigate("/");

    };

    return (

        <div className="min-h-screen bg-gray-100 p-6">

            {/* NAVBAR */}
            <div className="bg-white shadow-md p-4 rounded-xl flex justify-between items-center mb-8">

                <h1 className="text-3xl font-bold text-red-600">
                    Admin Dashboard
                </h1>

                <div className="flex items-center gap-4">

                    <p className="font-semibold">
                        Welcome Admin,
                        {" "}
                        {user?.name}
                    </p>

                    <button
                        onClick={logout}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg"
                    >
                        Logout
                    </button>

                </div>

            </div>

            {/* CREATE QUIZ */}
            <div className="bg-white p-8 rounded-xl shadow-md mb-10">

                <h2 className="text-2xl font-bold mb-6">

                    {
                        editingQuiz
                            ? "Edit Quiz"
                            : "Create Quiz"
                    }

                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >

                    <input
                        type="text"
                        name="title"
                        placeholder="Quiz Title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full border p-3 rounded-lg"
                    />

                    <textarea
                        name="description"
                        placeholder="Description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full border p-3 rounded-lg"
                    />

                    <input
                        type="text"
                        name="category"
                        placeholder="Category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full border p-3 rounded-lg"
                    />

                    <select
                        name="difficulty"
                        value={formData.difficulty}
                        onChange={handleChange}
                        className="w-full border p-3 rounded-lg"
                    >

                        <option value="">
                            Select Difficulty
                        </option>

                        <option value="Easy">
                            Easy
                        </option>

                        <option value="Medium">
                            Medium
                        </option>

                        <option value="Hard">
                            Hard
                        </option>

                    </select>

                    <input
                        type="number"
                        name="duration"
                        placeholder="Duration (minutes)"
                        value={formData.duration}
                        onChange={handleChange}
                        className="w-full border p-3 rounded-lg"
                    />

                    <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">

                        {
                            editingQuiz
                                ? "Update Quiz"
                                : "Create Quiz"
                        }

                    </button>

                </form>

            </div>

            {/* ADD QUESTION */}
            <div className="bg-white p-8 rounded-xl shadow-md mb-10">

                <h2 className="text-2xl font-bold mb-6">

                    {
                        editingQuestion
                            ? "Edit Question"
                            : "Add Question"
                    }

                </h2>

                <form
                    onSubmit={handleQuestionSubmit}
                    className="space-y-4"
                >

                    <select
                        name="quizId"
                        value={questionData.quizId}
                        onChange={handleQuestionChange}
                        className="w-full border p-3 rounded-lg"
                    >

                        <option value="">
                            Select Quiz
                        </option>

                        {
                            quizzes.map((quiz) => (

                                <option
                                    key={quiz._id}
                                    value={quiz._id}
                                >
                                    {quiz.title}
                                </option>

                            ))
                        }

                    </select>

                    <textarea
                        name="question"
                        placeholder="Enter Question"
                        value={questionData.question}
                        onChange={handleQuestionChange}
                        className="w-full border p-3 rounded-lg"
                    />

                    <input
                        type="text"
                        name="option1"
                        placeholder="Option 1"
                        value={questionData.option1}
                        onChange={handleQuestionChange}
                        className="w-full border p-3 rounded-lg"
                    />

                    <input
                        type="text"
                        name="option2"
                        placeholder="Option 2"
                        value={questionData.option2}
                        onChange={handleQuestionChange}
                        className="w-full border p-3 rounded-lg"
                    />

                    <input
                        type="text"
                        name="option3"
                        placeholder="Option 3"
                        value={questionData.option3}
                        onChange={handleQuestionChange}
                        className="w-full border p-3 rounded-lg"
                    />

                    <input
                        type="text"
                        name="option4"
                        placeholder="Option 4"
                        value={questionData.option4}
                        onChange={handleQuestionChange}
                        className="w-full border p-3 rounded-lg"
                    />

                    <input
                        type="text"
                        name="correctAnswer"
                        placeholder="Correct Answer"
                        value={questionData.correctAnswer}
                        onChange={handleQuestionChange}
                        className="w-full border p-3 rounded-lg"
                    />

                    <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700">

                        {
                            editingQuestion
                                ? "Update Question"
                                : "Add Question"
                        }

                    </button>

                </form>

            </div>

            {/* MANAGE QUESTIONS */}
            <div className="bg-white p-8 rounded-xl shadow-md mb-10">

                <h2 className="text-2xl font-bold mb-6">
                    Manage Questions
                </h2>

                <div className="space-y-4">

                    {
                        questions.map((q) => (

                            <div
                                key={q._id}
                                className="border p-4 rounded-lg"
                            >

                                <h3 className="font-bold text-lg">
                                    {q.question}
                                </h3>

                                <ul className="list-disc ml-6 mt-2">

                                    {
                                        q.options.map((option) => (

                                            <li key={option}>
                                                {option}
                                            </li>

                                        ))
                                    }

                                </ul>

                                <p className="mt-2 text-green-600 font-semibold">

                                    Correct:
                                    {" "}
                                    {q.correctAnswer}

                                </p>

                                <button
                                    onClick={() =>
                                        handleEditQuestion(q)
                                    }
                                    className="mt-3 bg-yellow-500 text-white px-4 py-2 rounded-lg"
                                >
                                    Edit Question
                                </button>

                            </div>

                        ))
                    }

                </div>

            </div>

            {/* MANAGE QUIZZES */}
            <div className="bg-white p-8 rounded-xl shadow-md">

                <h2 className="text-2xl font-bold mb-6">
                    Manage Quizzes
                </h2>

                <div className="space-y-4">

                    {
                        quizzes.map((quiz) => (

                            <div
                                key={quiz._id}
                                className="border p-4 rounded-lg flex justify-between items-center"
                            >

                                <div>

                                    <h3 className="text-xl font-bold">
                                        {quiz.title}
                                    </h3>

                                    <p>
                                        {quiz.category}
                                    </p>

                                </div>

                                <div className="flex gap-2">

                                    <button
                                        onClick={() =>
                                            handleEditClick(quiz)
                                        }
                                        className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() =>
                                            navigate(
                                                `/leaderboard/${quiz._id}`
                                            )
                                        }
                                        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                                    >
                                        Leaderboard
                                    </button>

                                    <button
                                        onClick={() =>
                                            handleDeleteQuiz(
                                                quiz._id
                                            )
                                        }
                                        className="bg-red-500 text-white px-4 py-2 rounded-lg"
                                    >
                                        Delete
                                    </button>

                                </div>

                            </div>

                        ))
                    }

                </div>

            </div>

        </div>

    )

}

export default AdminDashboard