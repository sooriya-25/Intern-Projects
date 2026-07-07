import { useEffect, useState } from "react";
import { getMovies } from "../services/omdb";

const useMovies = (search, page) => {
  const [movies, setMovies] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

useEffect(() => {
  const fetchMovies = async () => {
    setLoading(true);
    setError("");

    try {
      const query = search.trim() || "Marvel";

      const data = await getMovies(query, page);
      
      if (data.Response === "True") {
        setMovies(data.Search);
        setTotalResults(Number(data.totalResults));
      } else {
        setMovies([]);
        setTotalResults(0);
        setError(data.Error);
      }
    } catch (err) {
      setMovies([]);
      setError("Something went wrong.");
    }

    setLoading(false);
  };

  fetchMovies();
}, [search, page]);

  return {
    movies,
    totalResults,
    loading,
    error,
  };
};

export default useMovies;