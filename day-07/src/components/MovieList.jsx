import { Row, Col } from "antd";
import MovieCard from "./MovieCard";

function MovieList({
  movies,
  favourites,
  toggleFavourite,
  viewMovie,
}) {
  return (
    <Row gutter={[20, 20]}>
      {movies.map((movie) => (
        <Col
          xs={24}
          sm={12}
          md={8}
          lg={6}
          key={movie.imdbID}
        >
          <MovieCard
            movie={movie}
            favourites={favourites}
            toggleFavourite={toggleFavourite}
            viewMovie={viewMovie}
          />
        </Col>
      ))}
    </Row>
  );
}

export default MovieList;