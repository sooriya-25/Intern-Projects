import axios from "axios";

const API_KEY = process.env.REACT_APP_OMDB_API_KEY;
const BASE_URL = process.env.REACT_APP_BASE_URL;

export const getMovies = async (search, page = 0) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        apikey: API_KEY,
        s: search,
        page,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};

export const getMovieDetails = async (id) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        apikey: API_KEY,
        i: id,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
};