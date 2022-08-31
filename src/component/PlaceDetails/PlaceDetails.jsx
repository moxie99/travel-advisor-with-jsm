import React from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Chip,
} from "@material-ui/core";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import PhoneIcon from "@material-ui/icons/Phone";
import Rating from "@material-ui/lab/Rating";

import useStyles from "./styles";

const PlaceDetails = ({ place, selected, refProp }) => {
  const classes = useStyles();

  // scroll to the selected card

  if (selected)
    refProp?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  return (
    <Card elevation={7}>
      <CardMedia
        style={{ height: 300 }}
        image={
          place?.photo
            ? place?.photo.images.large.url
            : "https://img.buzzfeed.com/buzzfeed-static/static/2015-03/27/6/enhanced/webdr05/original-22418-1427453181-8.jpg?crop=667:667;167,0"
        }
        title={place?.name}
      />
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {place?.name ? place?.name : "Cuisine De La Creme"}
        </Typography>
        <Box display="flex" justifyContent="space-between">
          <Rating value={Number(place?.rating)} readonly />
          <Typography gutterBottom variant="subtitle1">
            {place?.num_reviews ? place?.num_reviews : "no"} reviews
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="subtitle1">Price</Typography>
          <Typography gutterBottom variant="subtitle1">
            {place?.price ? place?.price : "come make enquiries"}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="subtitle1">Ranking</Typography>
          <Typography gutterBottom variant="subtitle1">
            {place?.ranking ? place?.ranking : "come rank us after experience"}
          </Typography>
        </Box>

        {place?.awards?.map((award, index) => (
          <Box
            my={1}
            display="flex"
            key={award?.display_name ? award?.display_name : place?.name}
            justifyContent="space-between"
            alignItems="center"
          >
            <img src={award?.images.small} alt={award?.display_name} />
            <Typography variant="subtitle2" color="textSecondary">
              {award?.display_name}
            </Typography>
          </Box>
        ))}

        {place?.cuisine?.map(({ name }) => (
          <Chip key={name} size="small" className="classes.chip" label={name} />
        ))}

        {place?.address && (
          <Typography
            gutterBottom
            variant="subtitle2"
            color="textSecondary"
            className={classes.subtitle}
          >
            <LocationOnIcon />{" "}
            {place?.address ? place?.address : "Visit online"}
          </Typography>
        )}
        {place?.phone && (
          <Typography
            gutterBottom
            variant="subtitle2"
            color="textSecondary"
            className={classes.spacing}
          >
            <PhoneIcon /> {place?.phone ? place?.phone : "Visit online"}
          </Typography>
        )}

        <CardActions>
          <Button
            size="small"
            color="primary"
            onClick={() => window.open(place?.web_url, "_blank")}
          >
            Trip Advisor
          </Button>
          <Button
            size="small"
            color="primary"
            onClick={() => window.open(place?.website, "_blank")}
          >
            Website
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default PlaceDetails;
