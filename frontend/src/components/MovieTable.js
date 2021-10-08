import { useState, useEffect, useCallback } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
require("dotenv").config();
const tmdbApiKey = process.env.REACT_APP_TMDB_API_KEY;

const MovieTable = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Using axios to fetch data from the API
  const fetchData = useCallback(async () => {
    axios.get("http://localhost:4000").then((res) => {
      setData(res.data);
      setIsLoading(false);
    });
  }, [isLoading]);

  // Fetch poster from TMDB
  // const fetchPoster = (movie) => {
  //   axios
  //     .get(
  //       `https://api.themoviedb.org/3/search/movie/?api_key=${tmdbApiKey}&query=${movie.title}`
  //     )
  //     .then((res) => {
  //       console.log(
  //         "https://image.tmdb.org/t/p/w500" + res.data.results[0].poster_path
  //       );
  //       return res.data.results[0].poster_path;
  //     });
  // };

  // const renderMovieTable = (data, isLoading) => {
  //   if (!isLoading) {
  //     data.map((movie) => {
  //       // console.log(movie);
  //       return (
  //         // const poster = fetchPoster(movie);
  //         <tr>
  //           {/* <td>
  //           <img
  //             src={`https://image.tmdb.org/t/p/w500${poster}`}
  //             alt={movie.title}
  //             width="100"
  //             height="100"
  //           />
  //         </td> */}
  //           <td>{movie.name}</td>
  //           <td>{movie.title}</td>
  //           <td>{movie.rating}</td>
  //           <td>{movie.comment}</td>
  //         </tr>
  //       );
  //     });
  //   } else {
  //     return (
  //       <tr>
  //         <td>Loading...</td>
  //       </tr>
  //     );
  //   }
  // };

  // Using useEffect to update UI when data changes
  useEffect(() => {
    fetchData();
    // renderMovieTable(data, isLoading);
  }, [fetchData]);

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          {/* <th>Poster</th> */}
          <th>Name</th>
          <th>Title</th>
          <th>Rating</th>
          <th>Comment</th>
        </tr>
      </thead>
      <tbody>
        {data.map((movie) => (
          <tr>
            <td>{movie.name}</td>
            <td>{movie.title}</td>
            <td>{movie.rating}</td>
            <td>{movie.comment}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default MovieTable;
