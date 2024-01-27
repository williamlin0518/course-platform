import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import StarIcon from "@mui/icons-material/Star";
import PeopleIcon from "@mui/icons-material/People";

function SpecificCategoryPage() {
  const { label } = useParams();
  const [courses, setCourses] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch("http://35.208.222.68:80/category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: label }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const jsonData = await response.json();
      console.log("Fetched data:", jsonData); // Debug log
      setCourses(jsonData.courses_list);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [label]);

  const courseArray = courses.slice(0, 16).map((course, index) => {
    const isHovered = hoveredCard === index;
    const cardStyle = {
      backgroundColor: isHovered ? "#ffcccc" : "lightcoral", // Light red background
      transition: "background-color 0.3s", // Smooth transition for hover effect
      fontWeight: "bold",

      // ... other styles
    };

    return (
      <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
        <Link to={`/course/${course.ID}`} style={{ textDecoration: "none" }}>
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

  return (
    <div className="home-page rel">
      <div className="section section-b rel">
        <h2 className="title s24 fontb">category: {label}</h2>
        <Grid container spacing={2}>
          {courseArray}
        </Grid>
      </div>
    </div>
  );
}

export default SpecificCategoryPage;
