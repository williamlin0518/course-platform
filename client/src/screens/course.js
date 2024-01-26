import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

function CoursePage() {
  const { courseId } = useParams();
  const history = useHistory();
  const [courseUrl, setCourseURL] = useState('');

  useEffect(() => {
    const fetchCourseName = async () => {
      try {
        const response = await fetch(`http://34.146.84.112/api/course/${courseId}`);
        const data = await response.json();
        
        window.location.href = data.url; // Redirect to Udemy url
        
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchCourseName();
  }, [courseId]);

  
  // Optional: Loading or intermediate state before redirect
  return (
    <div>Loading course...</div>
  );
}

export default CoursePage;
