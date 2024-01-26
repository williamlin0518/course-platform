import React, { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useUser } from "@clerk/clerk-react"; // Import useUser

function CoursePage() {
  const { courseId } = useParams();
  const { isSignedIn, user } = useUser(); // useUser to check if the user is signed in
  const [courseUrl, setCourseURL] = useState('');

  useEffect(() => {
    const fetchCourseName = async () => {
      try {
        // Fetch the course URL
        const response = await fetch(`http://34.146.84.112/api/course/${courseId}`);
        const data = await response.json();
        setCourseURL(data.url); // Store the URL for redirection

        // If the user is signed in, notify the backend
        if (isSignedIn && user) {
          const token = user.id; // Assuming 'id' is the token, replace with actual token property
          await fetch(`http://34.146.84.112/api/history/${token}/${courseId}`);
          console.log(`http://34.146.84.112/api/history/${token}/${courseId}`);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchCourseName();
  }, [courseId, isSignedIn, user]);

  useEffect(() => {
    // Redirect when the course URL is available
    if (courseUrl) {
      window.location.href = courseUrl;
    }
  }, [courseUrl]);

  return (
    <div>Loading course...</div>
  );
}

export default CoursePage;
