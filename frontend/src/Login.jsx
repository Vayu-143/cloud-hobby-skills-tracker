import { useState } from "react";
import api from "./api";

function Login({ onLogin, goToRegister }) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {

        if (!username || !password) {
            alert("Please enter username and password.");
            return;
        }

        try {

            const response = await api.post("/login", null, {
                params: {
                    username,
                    password
                }
            });

            if (response.data.success) {

                localStorage.setItem(
                    "user",
                    JSON.stringify(response.data)
                );

                onLogin(response.data);

            } else {

                alert(response.data.message);
            }

        } catch (error) {

            alert("Login failed.");
        }
    };


    return (
        <div className="auth-container">

            <div className="auth-card">

                <h1>☁️ Cloud Hobby & Skills Tracker</h1>

                <h2>Login</h2>

                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) =>
                        setUsername(e.target.value)
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

                <button onClick={handleLogin}>
                    Login
                </button>

                <p>
                    Don't have an account?
                </p>

                <button
                    className="secondary-button"
                    onClick={goToRegister}
                >
                    Create Account
                </button>

            </div>

        </div>
    );
}

export default Login;