import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import logo from "../ui/course-1.png";
import LeftIcon from "@mui/icons-material/ChevronLeftRounded";
import RightIcon from "@mui/icons-material/ChevronRightRounded";

function HomePage() {
  const { isSignedIn, user, isLoaded } = useUser();
  const [popularCourse, setPopularCourse] = useState([]);
  const [recommendationCourse, setRecommendationCourse] = useState(null);

  useEffect(() => {
    document.title = "Home Page";

    const fetchPopularCourse = async () => {
      await fetch("http://34.146.84.112/api/", { method: "GET" })
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
    <div className="card">
      <img src={logo} alt="test" />
      <h1>{course.title}</h1>
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
          {/* TODO: display popular here */}
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
        {/* TODO: display popular here */}
      </div>
      {/* TODO: show things when not signed in */}
    </div>
  );
}

export default HomePage;
