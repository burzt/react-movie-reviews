import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { Star } from "react-bootstrap-icons";
import ReactTextCollapse from "react-text-collapse";
import axios from "axios";
require("dotenv").config();
var Filter = require("bad-words"),
  filter = new Filter();
const tmdbApiKey = process.env.REACT_APP_TMDB_API_KEY;

const TEXT_COLLAPSE_OPTIONS = {
  collapse: false, // default state when component rendered
  collapseText: "...show more", // text to show when collapsed
  expandText: "show less", // text to show when expanded
  minHeight: 100, // component height when closed
  maxHeight: 250, // expanded to
  textStyle: {
    // pass the css for the collapseText and expandText here
    color: "blue",
    fontSize: "12px",
  },
};

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
      })
      .catch((error) => {
        //placeholder image
        movie.poster = "https://via.placeholder.com/75x100";
        setData([...data]);
      });
  };

  useEffect(() => {
    //fetching data from the server
    axios.get("/api").then((response) => {
      setData([...response.data]);
      // censor naughty words >:(
      response.data.forEach((movie) => {
        movie.comment = filter.clean(movie.comment);
        movie.name = filter.clean(movie.name);
      });
      // updating each movie with a poster from the tmdb api
      response.data.forEach((movie) => {
        fetchPoster(movie);
      }, []);
      setIsLoading(false);
    });
  }, [isLoading]);

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
                  className="rounded center-block img-responsive"
                  src={movie.poster}
                  alt={`<${movie.poster} poster>`}
                  width="75"
                  height="100"
                />
              </td>
              <td>{movie.name}</td>
              <td className="">{movie.title}</td>
              <td>
                <div className="d-flex flex-row align-items-center">
                  {movie.rating}
                  <Star size="14" color="#ffc107" />
                </div>
              </td>
              <td>
                {movie.comment.length > 250 ? (
                  <ReactTextCollapse options={TEXT_COLLAPSE_OPTIONS}>
                    {movie.comment}
                  </ReactTextCollapse>
                ) : (
                  <div>{movie.comment}</div>
                )}
              </td>
            </tr>
          ))
        )}
      </tbody>
    </Table>
  );
};

export default MovieTable;
