import React, { useEffect } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import ButtonBase from "@mui/material/ButtonBase";
import { useHistory } from "react-router-dom";

// Importing some icons from Material-UI
import CodeIcon from "@mui/icons-material/Code";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ComputerIcon from "@mui/icons-material/Computer";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import MusicNoteIcon from "@mui/icons-material/MusicNote";

// Styled Paper component for each grid item
const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
  backgroundColor: "lightgray", // Change to gray background color
  "&:hover": {
    backgroundColor: "gray", // Darker gray on hover
    transform: "scale(1.05)", // Slight zoom effect on hover
    transition: "transform 0.3s ease-in-out, background-color 0.3s ease-in-out",
  },
  width: "80%",
  height: "80%",
}));

function CategoriesPage() {
  useEffect(() => {
    document.title = "Categories";
  });
  const history = useHistory();
  const handleCategoryClick = (label) => {
    // Navigate based on category label
    history.push(`/cates/${label}`);
  };
  const Label = styled("p")(({ theme }) => ({
    marginTop: theme.spacing(1),

    height: "3em", // Fixed height for the label
    width: "100%",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  }));

  const StyledIcon = styled("div")(({ theme }) => ({
    color: "red", // Red color for the icon
  }));
  // Array of categories with labels and corresponding icons
  const categories = [
    { label: "Development", Icon: CodeIcon },
    { label: "Business", Icon: BusinessCenterIcon },
    { label: "Finance", Icon: AttachMoneyIcon },
    { label: "IT", Icon: ComputerIcon },
    { label: "Design", Icon: DesignServicesIcon },
    { label: "Marketing", Icon: LocalOfferIcon },
    { label: "Health", Icon: FavoriteIcon },
    { label: "Fitness", Icon: FitnessCenterIcon },
    { label: "Music", Icon: MusicNoteIcon },
  ];

  return (
    <div className="app-page rel">
      <h1 className="page-title s24 fontb c333">Categories</h1>
      <Box sx={{ flexGrow: 1, mt: 4 }}>
        <Grid container spacing={2}>
          {categories.map((category, index) => (
            <Grid item xs={4} key={index} sx={{ height: "100%" }}>
              <ButtonBase
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onClick={() => handleCategoryClick(category.label)}
              >
                <Item>
                  <StyledIcon>
                    <category.Icon fontSize="large" />
                  </StyledIcon>
                  <Label>{category.label}</Label>
                </Item>
              </ButtonBase>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
}

export default CategoriesPage;
