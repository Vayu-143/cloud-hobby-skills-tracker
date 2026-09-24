import { useState } from "react";
import api from "./api";

function Register({ goToLogin }) {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async () => {

        if (!username || !email || !password) {
            alert("Please fill all fields.");
            return;
        }

        try {

            const response = await api.post(
                "/register",
                null,
                {
                    params: {
                        username,
                        email,
                        password
                    }
                }
            );

            alert(response.data.message);

            if (response.data.user_id) {
                goToLogin();
            }

        } catch (error) {

            alert("Registration failed.");
        }
    };


    return (
        <div className="auth-container">

            <div className="auth-card">

                <h1>☁️ Cloud Hobby & Skills Tracker</h1>

                <h2>Create Account</h2>

                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) =>
                        setUsername(e.target.value)
                    }
                />

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                />

                <button onClick={handleRegister}>
                    Register
                </button>

                <p>
                    Already have an account?
                </p>

                <button
                    className="secondary-button"
                    onClick={goToLogin}
                >
                    Back to Login
                </button>

            </div>

        </div>
    );
}

export default Register;