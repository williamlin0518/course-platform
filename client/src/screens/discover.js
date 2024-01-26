import React, { useEffect, useState } from "react";
import SearchBar from "../comps/SearchBar";
import ResponsiveGrid from "../comps/ResponsiveGrid";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import { Link } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import PeopleIcon from "@mui/icons-material/People";

function DiscoverPage() {
  useEffect(() => {
    document.title = "Discover";
  });

  const [hoveredCard, setHoveredCard] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (searchTerm) => {
    if (searchTerm === ""){
        return;
    }
    try {
      const response = await fetch("http://35.208.222.68:80/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: searchTerm }),
      });
      const jsonData = await response.json();
      setSearchResults(jsonData.courses_list);
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };

  const searchResultsArray = searchResults.slice(0, 16).map((course, index) => {
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

  return (
    <div className="app-page rel">
      <h1 className="page-title s24 fontb c333">Discover</h1>
      <Box sx={{ mt: 4 }}>
        {" "}
        {/* Increased top margin */}
        <SearchBar onSearch={handleSearch} />
      </Box>

      {searchResults.length > 0 ? (
        <div className="section section-b rel">
          <Grid container spacing={2}>
            {searchResultsArray}
          </Grid>
        </div>
      ) : (
        <Box textAlign="center" mt={5}>
          <SearchIcon fontSize="large" color="primary" />
          <Typography variant="h6" sx={{ color: "#FF0000" }}>
            {" "}
            {/* Red color */}
            Start by searching for something
          </Typography>
        </Box>
      )}
    </div>
  );
}

export default DiscoverPage;
