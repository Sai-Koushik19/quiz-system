import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import API from "../services/api";

function Login() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
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

            const res = await API.post(
                "/auth/login",
                formData
            );

            // STORE TOKEN
            localStorage.setItem(
                "token",
                res.data.token
            );

            // STORE USER
            localStorage.setItem(
                "user",
                JSON.stringify(res.data.user)
            );

            alert("Login successful");

            // ROLE-BASED REDIRECT
            if (res.data.user.role === "admin") {

                navigate("/admin");

            } else {

                navigate("/dashboard");

            }

        } catch (error) {

            alert(error.response.data.message);

        }

    };

   return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-200 px-4">

        <div className="w-full max-w-md bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl p-8 border border-gray-200">

            <div className="text-center mb-8">

                <h1 className="text-5xl font-extrabold text-blue-700 tracking-wide">
                    QuizVerse
                </h1>

                <p className="text-gray-500 mt-2">
                    Welcome back! Login to continue
                </p>

            </div>

            <form
                onSubmit={handleSubmit}
                className="space-y-5"
            >

                <div>

                    <label className="block text-gray-700 mb-2 font-medium">
                        Email
                    </label>

                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
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
                        className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        onChange={handleChange}
                    />

                </div>

                <button
                    className="w-full bg-blue-600 text-white p-3 rounded-xl font-semibold hover:bg-blue-700 hover:scale-[1.02] transition duration-300 shadow-md"
                >
                    Login
                </button>

            </form>

            <p className="text-center text-gray-600 mt-6">

                Don't have an account?

                <Link
                    to="/register"
                    className="text-blue-600 font-semibold ml-2 hover:underline"
                >
                    Register
                </Link>

            </p>

        </div>

    </div>

)

}

export default Login