import { useLocation, Link } from "react-router-dom";

function ResultPage() {

    const location = useLocation();

    const result = location.state;

    return (

        <div className="min-h-screen bg-gray-100 flex items-center justify-center">

            <div className="bg-white p-10 rounded-xl shadow-lg w-[500px] text-center">

                <h1 className="text-4xl font-bold text-green-600 mb-6">
                    Quiz Result 🎉
                </h1>

                <div className="space-y-4 text-xl">

                    <p>

                        <span className="font-bold">
                            Score:
                        </span>

                        {" "}
                        {result?.score}
                        /
                        {result?.totalQuestions}

                    </p>

                    <p>

                        <span className="font-bold">
                            Percentage:
                        </span>

                        {" "}
                        {result?.percentage}%

                    </p>

                    <p>

                        <span className="font-bold">
                            Time Taken:
                        </span>

                        {" "}
                        {result?.timeTaken}
                        {" "}
                        seconds

                    </p>

                </div>

                <Link to="/dashboard">

                    <button
                        className="mt-8 bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700"
                    >
                        Back to Dashboard
                    </button>

                </Link>

            </div>

        </div>

    )

}

export default ResultPage