import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";

function HomePage() {
  const { isSignedIn, user, isLoaded } = useUser();
  const [popularCourse, setPopularCourse] = useState([]);
  const [recommendationCourse, setRecommendationCourse] = useState(null);

  useEffect(() => {
    document.title = "Home Page";

    const fetchPopularCourse = async () => {
      await fetch("http://localhost:3002", { method: "GET" })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((jsonData) => {
          setPopularCourse(jsonData.course);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };

    // const fetchRecommendationCourse = async () => {
    //   await fetch("https://www.google.com.tw/?hl=zh-TW")
    //     .then((response) => {
    //       if (response.ok) {
    //         return response.json();
    //       }
    //     })
    //     .then((jsonData) => {
    //       // TODO: set data to array
    //       setRecommendationCourse(jsonData);
    //     })
    //     .catch((error) => {
    //       console.error("Error fetching data:", error);
    //     });
    // };

    fetchPopularCourse();
    // if (isSignedIn) {
    //   fetchRecommendationCourse();
    // }
  }, []);

    const popularCourseArray = popularCourse.map((course) => (
      // TODO: map course to html
      <div className="courseCard">
        <img src={course.img_src} />
        <div className="courseContainer" style={{backgroundColor: "White"}}>
          <h2>
            <b>{course.title}</b>
          </h2>
          <p>{course.headline}</p>
        </div>
        <div className="courseContainer">
          <p>Course Instructor: {course.instructor_str}</p>
          <p className="rating">Rating: {course.rating} / 5.0</p>
          <p>Enrollment: {course.enrollment}</p>
          <p>Language: {course.language}</p>
        </div>
      </div>
    ));
  //   const recommendationCourseArray = [];
  //   if (isSignedIn) {
  //     recommendationCourseArray = recommendationCourse.map((course) => (
  //       // TODO: map course to html
  //       <div></div>
  //     ));
  //   }

    if (isSignedIn) {
      return (
        <div className="home-page rel">
          <div className="section section-b rel">
            <h2 className="title s24 fontb">
              Popular <span className="fontn">This Week</span>
            </h2>
            <div className="scroll-container">{popularCourseArray}</div>
          </div>

          {/* <div className="section section-b rel">
              <h2 className="title s24 fontb">
                Recommendation <span className="fontn">For You</span>
              </h2>
              <div class="scroll-container">{recommendationCourseArray}</div>
            </div> */}
        </div>
      );
    }
    return (
      <div className="home-page rel">
        <div className="section section-b rel">
          <h2 className="title s24 fontb">
            Popular <span className="fontn">This Week</span>
          </h2>
          <div className="scroll-container">{popularCourseArray}</div>
        </div>
        {/* TODO: show things when not signed in */}
      </div>
    );
//   return (
//     <div className="app-page rel">
//       <h1 className="page-title s24 fontb c333">Discover</h1>
//     </div>
//   );
}

export default HomePage;
