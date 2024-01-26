import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import StarIcon from "@mui/icons-material/Star";
import PeopleIcon from "@mui/icons-material/People";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useAuth } from "@clerk/clerk-react";
function HomePage() {
  const { isSignedIn, user, isLoaded } = useUser();
  const [popularCourse, setPopularCourse] = useState([]);
  const [recommendationCourse, setRecommendationCourse] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const { getToken } = useAuth();

  const fetchPopularCourse = async () => {
    try {
      const response = await fetch("http://34.146.84.112/api/", {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const jsonData = await response.json();
      console.log("Fetched data:", jsonData); // Debug log
      setPopularCourse(jsonData.course);
    } catch (error) {
      console.error("Error fetching popular courses:", error);
    }
  };

  const postTokenToBackend = async () => {
    if (isSignedIn) {
      try {
        const token = await getToken();
        const response = await fetch("http://34.146.84.112/api/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Response data:", data);
      } catch (error) {
        console.error("Error posting token to backend:", error);
      }
    }
  };

  useEffect(() => {
    document.title = "Home Page";
    fetchPopularCourse();
    postTokenToBackend();
  }, [isSignedIn]);

  const popularCourseArray = popularCourse.slice(0, 16).map((course, index) => {
    const isHovered = hoveredCard === index;
    const cardStyle = {
      backgroundColor: isHovered ? "#ffcccc" : "lightcoral", // Light red background
      transition: "background-color 0.3s", // Smooth transition for hover effect
      fontWeight: "bold",

      // ... other styles
    };

    return (
      <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
        <Link to={`/course/${course.cid}`} style={{ textDecoration: "none" }}>
          <Card
            style={cardStyle}
            onMouseEnter={() => setHoveredCard(index)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <CardMedia
              component="img"
              height="140"
              image={course.img_src} // Fallback to logo if course.img_src is not available
              alt={course.title}
            />
            <CardContent style={{ height: "200px" }}>
              <Typography gutterBottom variant="h5" component="div">
                {course.title}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                <StarIcon style={{ verticalAlign: "middle", color: "gold" }} />{" "}
                {course.rating}
                <br />
                <PeopleIcon style={{ verticalAlign: "middle" }} />{" "}
                {course.enrollment}
                <br />
                {course.description}
              </Typography>
            </CardContent>
          </Card>
        </Link>
      </Grid>
    );
  });

  //   const recommendationCourseArray = [];
  //   if (isSignedIn) {
  //     recommendationCourseArray = recommendationCourse.map((course) => (
  //       // TODO: map course to html
  //       <div></div>
  //     ));
  //   }

  // if (isSignedIn) {
  //   return (
  //     <div className="home-page rel">
  //       <div className="section section-b rel">
  //         <h2 className="title s24 fontb">
  //           Popular <span className="fontn">This Week</span>
  //         </h2>
  //         {/* TODO: display popular here */}
  //       </div>

  //       {/* <div className="section section-b rel">
  //             <h2 className="title s24 fontb">
  //               Recommendation <span className="fontn">For You</span>
  //             </h2>
  //             <div class="scroll-container">{recommendationCourseArray}</div>
  //           </div> */}
  //     </div>
  //   );
  // }
  return (
    <div className="home-page rel">
      <div className="section section-b rel">
        <h2 className="title s24 fontb">
          <StarBorderIcon
            style={{
              verticalAlign: "middle",
              color: "orange",
              marginRight: "8px",
            }}
          />
          Popular <span className="fontn">This Week</span>
        </h2>
        <Grid container spacing={2}>
          {popularCourseArray}
        </Grid>
      </div>
      {/* Other sections */}
    </div>
  );
}

export default HomePage;
