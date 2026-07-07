import { Card, Typography, Button, Space } from "antd";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const { Title, Text } = Typography;

function MovieCard({
  movie,
  favourites,
  toggleFavourite,
  viewMovie,
}) {
  const isFavourite = favourites.some(
    (fav) => fav.imdbID === movie.imdbID
  );

  return (
    <Card
      hoverable
      cover={
        <img
          src={
            movie.Poster !== "N/A"
              ? movie.Poster
              : "https://via.placeholder.com/300x450?text=No+Image"
          }
          alt={movie.Title}
          style={{
            height: 400,
            objectFit: "cover",
          }}
        />
      }
    >
      <Title level={5}>{movie.Title}</Title>

      <Text>{movie.Year}</Text>

      <Space
        style={{
          marginTop: 15,
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <Button
          type="primary"
          onClick={() => viewMovie(movie.imdbID)}
        >
          View Details
        </Button>

        <IconButton
          color="error"
          onClick={() => toggleFavourite(movie)}
        >
          {isFavourite ? (
            <FavoriteIcon />
          ) : (
            <FavoriteBorderIcon />
          )}
        </IconButton>
      </Space>
    </Card>
  );
}

export default MovieCard;