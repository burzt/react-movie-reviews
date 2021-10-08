import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
require("dotenv").config();
const tmdbApiKey = process.env.REACT_APP_TMDB_API_KEY;

const MovieTable = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPoster = (movie) => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie/?api_key=${tmdbApiKey}&query=${movie.title}`
      )
      .then((response) => {
        movie.poster =
          "http://image.tmdb.org/t/p/w500/" +
          response.data.results[0].poster_path;
        setData([...data]);
      });
  };

  useEffect(() => {
    //fetching data from the server
    axios.get("http://localhost:4000").then((response) => {
      setData([...response.data]);
      response.data.forEach((movie) => {
        fetchPoster(movie);
      }, []);
      setIsLoading(false);
    });
  }, [isLoading]);

  // fix bug with loading poster
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Poster</th>
          <th>Name</th>
          <th>Title</th>
          <th>Rating</th>
          <th>Comment</th>
        </tr>
      </thead>
      <tbody>
        {isLoading ? (
          <tr>
            <td>Loading...</td>
          </tr>
        ) : (
          data.map((movie) => (
            <tr>
              <td>
                <img
                  src={movie.poster}
                  alt={`<${movie.poster} poster>`}
                  width="75"
                  height="100"
                />
              </td>
              <td>{movie.name}</td>
              <td>{movie.title}</td>
              <td>{movie.rating}</td>
              <td>{movie.comment}</td>
            </tr>
          ))
        )}
      </tbody>
    </Table>
  );
};

export default MovieTable;
