import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import API from "../services/api";

function Dashboard() {

    const navigate = useNavigate();

    const [quizzes, setQuizzes] = useState([]);

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    useEffect(() => {

        fetchQuizzes();

    }, []);

    const fetchQuizzes = async () => {

        try {

            const res = await API.get("/quizzes");

            setQuizzes(res.data.quizzes);

        } catch (error) {

            console.log(error);

        }

    };

    const logout = () => {

        localStorage.removeItem("token");

        localStorage.removeItem("user");

        navigate("/");

    };

    return (

        <div className="min-h-screen bg-gray-100">

            {/* Navbar */}
            <div className="bg-white shadow-md p-4 flex justify-between items-center">

                <h1 className="text-2xl font-bold text-blue-600">
                    Quiz Dashboard
                </h1>

                <div className="flex items-center gap-4">

                    <p className="font-semibold">
                        Welcome, {user?.name}
                    </p>

                    <button
                        onClick={logout}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg"
                    >
                        Logout
                    </button>

                </div>

            </div>

            {/* Quiz List */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {
                    quizzes.map((quiz) => (

                        <div
                            key={quiz._id}
                            className="bg-white p-6 rounded-xl shadow-md"
                        >

                            <h2 className="text-2xl font-bold mb-2">
                                {quiz.title}
                            </h2>

                            <p className="text-gray-600 mb-2">
                                {quiz.description}
                            </p>

                            <p className="mb-1">
                                Category: {quiz.category}
                            </p>

                            <p className="mb-1">
                                Difficulty: {quiz.difficulty}
                            </p>

                            <p className="mb-4">
                                Duration: {quiz.duration} mins
                            </p>

                           <Link
                 to={`/quiz/${quiz._id}`}
                >

        <button
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
            Start Quiz
        </button>

        </Link>
        <Link to="/history">

    <button
        className="bg-purple-600 text-white px-6 py-3 rounded-lg"
    >
        View History
    </button>

</Link>
        <Link
    to={`/leaderboard/${quiz._id}`}
>

    <button
        className="w-full mt-3 bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600"
    >
        View Leaderboard
    </button>

</Link>

                        </div>

                    ))
                }

            </div>

        </div>

    )

}

export default Dashboard