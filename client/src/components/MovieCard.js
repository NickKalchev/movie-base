import React, { useState } from "react";
import "../stylesheets/MovieCard.css";
import noImage from "../images/sorry-image-not-available.png";
import {
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
} from "@material-ui/core";

function MovieCard({ title, image, year }) {
  const [hover, setHover] = useState(false);

  return (
    <Card
      className="movieCard"
      raised={hover}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <CardActionArea className="movieCard__cardActionArea">
        <CardMedia
          title={`${title}`}
          width="100%"
          component="img"
          loading="eager"
          alt={`${title} image`}
          image={image !== "N/A" ? image : noImage}
        />
        <CardContent className="movieCard__cardContent">
          <h2>{title}</h2>
          <h3>{year}</h3>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default MovieCard;
