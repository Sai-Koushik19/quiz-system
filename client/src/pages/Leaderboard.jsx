import {
    useEffect,
    useState
} from "react";

import {
    useParams,
    useNavigate
} from "react-router-dom";

import API from "../services/api";

function Leaderboard() {

    const { quizId } = useParams();

    const navigate = useNavigate();

    const [leaders, setLeaders] =
        useState([]);

    // GET USER
    const user = JSON.parse(
        localStorage.getItem("user")
    );

    useEffect(() => {

        fetchLeaderboard();

    }, []);

    const fetchLeaderboard = async () => {

        try {

            const res = await API.get(
                `/results/${quizId}/leaderboard`
            );

            setLeaders(res.data);

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <div className="min-h-screen bg-gray-100 p-6">

            <h1 className="text-4xl font-bold text-center mb-8 text-yellow-600">
                Leaderboard 🏆
            </h1>

            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">

                <table className="w-full">

                    <thead className="bg-gray-200">

                        <tr>

                            <th className="p-4 text-left">
                                Rank
                            </th>

                            <th className="p-4 text-left">
                                Name
                            </th>

                            <th className="p-4 text-left">
                                Score
                            </th>

                            <th className="p-4 text-left">
                                Percentage
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {
                            leaders.map(
                                (
                                    leader,
                                    index
                                ) => (

                                    <tr
                                        key={leader._id}
                                        className="border-b"
                                    >

                                        <td className="p-4 font-bold">
                                            #{index + 1}
                                        </td>

                                        <td className="p-4">
                                            {
                                                leader.userId
                                                    ?.name
                                            }
                                        </td>

                                        <td className="p-4">
                                            {
                                                leader.score
                                            }
                                            /
                                            {
                                                leader.totalQuestions
                                            }
                                        </td>

                                        <td className="p-4">
                                            {
                                                leader.percentage
                                            }%
                                        </td>

                                    </tr>

                                )
                            )
                        }

                    </tbody>

                </table>

            </div>

            <div className="text-center mt-8">

                <button
                    onClick={() => {

                        if (
                            user?.role ===
                            "admin"
                        ) {

                            navigate(
                                "/admin"
                            );

                        } else {

                            navigate(
                                "/dashboard"
                            );

                        }

                    }}
                    className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700"
                >
                    Back to Dashboard
                </button>

            </div>

        </div>

    )

}

export default Leaderboard