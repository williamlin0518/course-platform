import React, { useEffect, useState } from "react";
import { useUser, useAuth } from "@clerk/clerk-react";

function MyCoursesPage() {
    const { isSignedIn, user } = useUser();
    const [userData, setUserData] = useState(null);
    const [token, setToken] = useState("");
    const { getToken } = useAuth();

    useEffect(() => {
        document.title = "My Courses";

        const fetchUserData = async () => {
            if (user && user.fullName) {
                try {
                    const response = await fetch(`http://34.146.84.112/${user.fullName}`);
                    const data = await response.json();
                    setUserData(data);
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            }

            try {
                const token = await getToken();
                setToken(token);
            } catch (error) {
                console.error("Error getting token:", error);
            }
        };

        fetchUserData();
    }, [user, getToken]); // Dependency on user and getToken

    if (isSignedIn) {
        return (
            <div className="app-page rel">
                <h1 className="page-title s24 fontb c333">My Courses</h1>
                <div>Hello {user.fullName}!</div>
                <div>Token: {token}</div>
                <div>{userData && <p>{userData.message}</p>}</div>
            </div>
        );
    }
    
    return <div>Not signed in</div>;
}

export default MyCoursesPage;
