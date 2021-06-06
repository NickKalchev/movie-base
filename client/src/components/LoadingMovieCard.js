import React from "react";
import { Card, CardContent, CardActionArea } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import "../stylesheets/LoadingMovieCard.css";

function LoadingMovieCard() {
  return (
    <Card className="loadingMovieCard" raised>
      <Skeleton
        className="loadingMovieCard__mainSkeleton"
        animation="wave"
        variant="rect"
      />
      <CardContent className="loadingMovieCard__cardContent">
        <Skeleton animation="wave" width="150px" />
        <Skeleton animation="wave" width="80px" />
      </CardContent>
      <CardActionArea className="loadingMovieCard__cardActionArea">
        <Skeleton animation="wave" variant="rect" width="270px" height="30px" />
      </CardActionArea>
    </Card>
  );
}

export default LoadingMovieCard;
