import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import API from "../services/api";

function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await API.post("/auth/register", formData);

            alert("Registration successful");

            navigate("/");

        } catch (error) {

            alert(error.response.data.message);

        }

    };

   return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-white to-green-200 px-4">

        <div className="w-full max-w-md bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl p-8 border border-gray-200">

            <div className="text-center mb-8">

                <h1 className="text-5xl font-extrabold text-green-700 tracking-wide">
                    QuizVerse
                </h1>

                <p className="text-gray-500 mt-2">
                    Create your account and start playing
                </p>

            </div>

            <form
                onSubmit={handleSubmit}
                className="space-y-5"
            >

                <div>

                    <label className="block text-gray-700 mb-2 font-medium">
                        Name
                    </label>

                    <input
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                        onChange={handleChange}
                    />

                </div>

                <div>

                    <label className="block text-gray-700 mb-2 font-medium">
                        Email
                    </label>

                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                        onChange={handleChange}
                    />

                </div>

                <div>

                    <label className="block text-gray-700 mb-2 font-medium">
                        Password
                    </label>

                    <input
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                        onChange={handleChange}
                    />

                </div>

                <button
                    className="w-full bg-green-600 text-white p-3 rounded-xl font-semibold hover:bg-green-700 hover:scale-[1.02] transition duration-300 shadow-md"
                >
                    Register
                </button>

            </form>

            <p className="text-center text-gray-600 mt-6">

                Already have an account?

                <Link
                    to="/"
                    className="text-green-600 font-semibold ml-2 hover:underline"
                >
                    Login
                </Link>

            </p>

        </div>

    </div>

)

}

export default Register