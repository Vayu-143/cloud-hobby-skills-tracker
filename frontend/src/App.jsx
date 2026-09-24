import { useEffect, useState } from "react";

import api from "./api";
import Login from "./Login";
import Register from "./Register";


function App() {

    // =====================================================
    // USER
    // =====================================================

    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("user"))
    );

    const [showRegister, setShowRegister] = useState(false);


    // =====================================================
    // DATA
    // =====================================================

    const [skills, setSkills] = useState([]);
    const [goals, setGoals] = useState([]);
    const [practice, setPractice] = useState([]);


    // =====================================================
    // FORM DATA
    // =====================================================

    const [skillName, setSkillName] = useState("");
    const [skillLevel, setSkillLevel] = useState("Beginner");

    const [goalTitle, setGoalTitle] = useState("");

    const [practiceSkill, setPracticeSkill] = useState("");
    const [practiceHours, setPracticeHours] = useState("");


    // =====================================================
    // LOAD DATA
    // =====================================================

    useEffect(() => {

        if (user) {
            loadData();
        }

    }, [user]);


    const loadData = async () => {

        try {

            const skillsResponse =
                await api.get("/skills");

            const goalsResponse =
                await api.get("/goals");

            const practiceResponse =
                await api.get("/practice");


            setSkills(skillsResponse.data);

            setGoals(goalsResponse.data);

            setPractice(practiceResponse.data);

        } catch (error) {

            console.error(
                "Error loading data:",
                error
            );

        }
    };


    // =====================================================
    // ADD SKILL
    // =====================================================

    const addSkill = async () => {

        if (!skillName.trim()) {

            alert("Please enter a skill name.");

            return;
        }


        try {

            await api.post(
                "/skills",
                null,
                {
                    params: {
                        name: skillName,
                        level: skillLevel
                    }
                }
            );


            setSkillName("");

            loadData();

        } catch (error) {

            console.error(error);

            alert("Failed to add skill.");

        }
    };


    // =====================================================
    // ADD GOAL
    // =====================================================

    const addGoal = async () => {

        if (!goalTitle.trim()) {

            alert("Please enter a goal.");

            return;
        }


        try {

            await api.post(
                "/goals",
                null,
                {
                    params: {
                        title: goalTitle
                    }
                }
            );


            setGoalTitle("");

            loadData();

        } catch (error) {

            console.error(error);

            alert("Failed to add goal.");

        }
    };


    // =====================================================
    // ADD PRACTICE
    // =====================================================

    const addPractice = async () => {

        if (
            !practiceSkill.trim() ||
            !practiceHours
        ) {

            alert(
                "Please enter skill and practice hours."
            );

            return;
        }


        try {

            await api.post(
                "/practice",
                null,
                {
                    params: {
                        skill: practiceSkill,
                        hours: Number(practiceHours)
                    }
                }
            );


            setPracticeSkill("");

            setPracticeHours("");

            loadData();

        } catch (error) {

            console.error(error);

            alert("Failed to save practice.");

        }
    };


    // =====================================================
    // LOGOUT
    // =====================================================

    const logout = () => {

        localStorage.removeItem("user");

        setUser(null);

        setShowRegister(false);
    };


    // =====================================================
    // LOGIN / REGISTER SCREEN
    // =====================================================

    if (!user) {

        if (showRegister) {

            return (
                <Register
                    goToLogin={() =>
                        setShowRegister(false)
                    }
                />
            );
        }


        return (
            <Login
                onLogin={(userData) => {

                    localStorage.setItem(
                        "user",
                        JSON.stringify(userData)
                    );

                    setUser(userData);

                }}

                goToRegister={() =>
                    setShowRegister(true)
                }
            />
        );
    }


    // =====================================================
    // DASHBOARD
    // =====================================================

    return (

        <div className="container">

            {/* HEADER */}

            <header>

                <div className="top-bar">

                    <div>

                        <h1>
                            ☁️ Cloud Hobby & Skills Tracker
                        </h1>

                        <p>
                            Welcome, {user.username}
                        </p>

                    </div>


                    <button
                        className="logout-button"
                        onClick={logout}
                    >
                        Logout
                    </button>

                </div>

            </header>


            {/* DASHBOARD STATISTICS */}

            <div className="dashboard">

                <div className="stat">

                    <h2>
                        {skills.length}
                    </h2>

                    <p>
                        Skills
                    </p>

                </div>


                <div className="stat">

                    <h2>
                        {goals.length}
                    </h2>

                    <p>
                        Goals
                    </p>

                </div>


                <div className="stat">

                    <h2>
                        {practice.length}
                    </h2>

                    <p>
                        Practice Sessions
                    </p>

                </div>

            </div>


            {/* ADD SKILL */}

            <section className="card">

                <h2>
                    ➕ Add Skill
                </h2>


                <input
                    type="text"
                    placeholder="Enter skill name"
                    value={skillName}
                    onChange={(e) =>
                        setSkillName(e.target.value)
                    }
                />


                <select
                    value={skillLevel}
                    onChange={(e) =>
                        setSkillLevel(e.target.value)
                    }
                >

                    <option value="Beginner">
                        Beginner
                    </option>

                    <option value="Intermediate">
                        Intermediate
                    </option>

                    <option value="Advanced">
                        Advanced
                    </option>

                </select>


                <button onClick={addSkill}>
                    Add Skill
                </button>

            </section>


            {/* SKILLS */}

            <section className="card">

                <h2>
                    💡 My Skills
                </h2>


                {skills.length === 0 ? (

                    <p>
                        No skills added yet.
                    </p>

                ) : (

                    skills.map((skill) => (

                        <div
                            className="item"
                            key={skill.id}
                        >

                            <strong>
                                {skill.name}
                            </strong>

                            <span>
                                {skill.level}
                            </span>

                        </div>

                    ))

                )}

            </section>


            {/* ADD GOAL */}

            <section className="card">

                <h2>
                    🎯 Add Goal
                </h2>


                <input
                    type="text"
                    placeholder="Example: Learn Python"
                    value={goalTitle}
                    onChange={(e) =>
                        setGoalTitle(e.target.value)
                    }
                />


                <button onClick={addGoal}>
                    Add Goal
                </button>

            </section>


            {/* GOALS */}

            <section className="card">

                <h2>
                    📋 My Goals
                </h2>


                {goals.length === 0 ? (

                    <p>
                        No goals added yet.
                    </p>

                ) : (

                    goals.map((goal) => (

                        <div
                            className="item"
                            key={goal.id}
                        >

                            <strong>
                                {goal.title}
                            </strong>

                            <span>
                                {goal.status}
                            </span>

                        </div>

                    ))

                )}

            </section>


            {/* RECORD PRACTICE */}

            <section className="card">

                <h2>
                    📚 Record Practice
                </h2>


                <input
                    type="text"
                    placeholder="Skill name"
                    value={practiceSkill}
                    onChange={(e) =>
                        setPracticeSkill(e.target.value)
                    }
                />


                <input
                    type="number"
                    min="1"
                    placeholder="Practice hours"
                    value={practiceHours}
                    onChange={(e) =>
                        setPracticeHours(e.target.value)
                    }
                />


                <button onClick={addPractice}>
                    Save Practice
                </button>

            </section>


            {/* PRACTICE HISTORY */}

            <section className="card">

                <h2>
                    📈 Practice History
                </h2>


                {practice.length === 0 ? (

                    <p>
                        No practice sessions yet.
                    </p>

                ) : (

                    practice.map((item) => (

                        <div
                            className="item"
                            key={item.id}
                        >

                            <strong>
                                {item.skill}
                            </strong>

                            <span>
                                {item.hours} hours
                            </span>

                        </div>

                    ))

                )}

            </section>

        </div>
    );
}


export default App;