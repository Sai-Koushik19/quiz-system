import {
    useEffect,
    useState
} from "react";

import {
    Link
} from "react-router-dom";

import API from "../services/api";

function History() {

    const [results, setResults] =
        useState([]);

    useEffect(() => {

        fetchResults();

    }, []);

    const fetchResults = async () => {

        try {

            const token =
                localStorage.getItem(
                    "token"
                );

            const res =
                await API.get(
                    "/results/my-results",
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

            setResults(res.data);

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <div className="min-h-screen bg-gray-100 p-6">

            <h1 className="text-4xl font-bold text-center mb-8">
                Quiz History 📜
            </h1>

            <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">

                <table className="w-full">

                    <thead className="bg-gray-200">

                        <tr>

                            <th className="p-4 text-left">
                                Quiz
                            </th>

                            <th className="p-4 text-left">
                                Category
                            </th>

                            <th className="p-4 text-left">
                                Score
                            </th>

                            <th className="p-4 text-left">
                                Percentage
                            </th>

                            <th className="p-4 text-left">
                                Date
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {
                            results.map(
                                (result) => (

                                <tr
                                    key={result._id}
                                    className="border-b"
                                >

                                    <td className="p-4">
                                        {
                                            result.quizId?.title
                                        }
                                    </td>

                                    <td className="p-4">
                                        {
                                            result.quizId?.category
                                        }
                                    </td>

                                    <td className="p-4">
                                        {
                                            result.score
                                        }
                                        /
                                        {
                                            result.totalQuestions
                                        }
                                    </td>

                                    <td className="p-4">
                                        {
                                            result.percentage
                                        }%
                                    </td>

                                    <td className="p-4">
                                        {
                                            new Date(
                                                result.createdAt
                                            ).toLocaleDateString()
                                        }
                                    </td>

                                </tr>

                            ))
                        }

                    </tbody>

                </table>

            </div>

            <div className="text-center mt-8">

                <Link to="/dashboard">

                    <button
                        className="bg-blue-600 text-white px-8 py-3 rounded-lg"
                    >
                        Back
                    </button>

                </Link>

            </div>

        </div>

    )

}

export default History