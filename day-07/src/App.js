import { useState, useMemo, useCallback } from "react";
import {
  Layout,
  Typography,
  Button,
  Space,
  Spin,
  Alert,
  Empty,
} from "antd";

import "./App.css";

import SearchBar from "./components/SearchBar";
import MovieList from "./components/MovieList";
import PaginationBar from "./components/PaginationBar";
import FavouriteDrawer from "./components/FavouriteDrawer";
import MovieDetailsModal from "./components/MovieDetailsModal";

import useMovies from "./hooks/useMovies";

const { Header, Content } = Layout;
const { Title } = Typography;

function App() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(null);

  const [favourites, setFavourites] = useState([]);

  const [drawerOpen, setDrawerOpen] = useState(false);

  const [selectedMovie, setSelectedMovie] = useState(null);

  const [modalOpen, setModalOpen] = useState(false);

  const {
    movies,
    totalResults,
    loading,
    error,
  } = useMovies(search, page);

  const favouriteIds = useMemo(() => {
    return new Set(
      favourites.map((movie) => movie.imdbID)
    );
  }, [favourites]);

  const toggleFavourite = useCallback(
    (movie) => {
      if (favouriteIds.has(movie.imdbID)) {
        setFavourites((prev) =>
          prev.filter(
            (fav) => fav.imdbID !== movie.imdbID
          )
        );
      } else {
        setFavourites((prev) => [
          ...prev,
          movie,
        ]);
      }
    },
    [favouriteIds]
  );

  const viewMovie = useCallback((id) => {
    setSelectedMovie(id);
    setModalOpen(true);
  }, []);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Title
          level={3}
          style={{
            color: "#fff",
            margin: 0,
          }}
        >
          Movie Search App
        </Title>

        <Button
          type="primary"
          onClick={() => setDrawerOpen(true)}
        >
          Favourites ({favourites.length})
        </Button>
      </Header>

      <Content
        style={{
          padding: 30,
          maxWidth: 1200,
          margin: "0 auto",
          width: "100%",
        }}
      >
        <Space
          direction="vertical"
          size="large"
          style={{ width: "100%" }}
        >
          <SearchBar
            search={search}
            setSearch={setSearch}
            setPage={setPage}
          />

          {loading && (
            <div
              style={{
                textAlign: "center",
              }}
            >
              <Spin size="large" />
            </div>
          )}

          {!loading && error && (
            <Alert
              type="error"
              message={error}
              showIcon
            />
          )}

          {!loading &&
            !error &&
            search &&
            movies.length === 0 && (
              <Empty description="No Movies Found" />
            )}

          {!loading &&
            !error &&
            movies.length > 0 && (
              <>
                <MovieList
                  movies={movies}
                  favourites={favourites}
                  toggleFavourite={
                    toggleFavourite
                  }
                  viewMovie={viewMovie}
                />

                <PaginationBar
                  currentPage={page}
                  totalResults={totalResults}
                  setPage={setPage}
                />
              </>
            )}
        </Space>

        <FavouriteDrawer
          open={drawerOpen}
          onClose={() =>
            setDrawerOpen(false)
          }
          favourites={favourites}
        />

        <MovieDetailsModal
          open={modalOpen}
          onClose={() =>
            setModalOpen(false)
          }
          movieId={selectedMovie}
        />
      </Content>
    </Layout>
  );
}

export default App;