import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  // const dummyMovies = [
  //   {
  //     id: 1,
  //     title: 'Some Dummy Movie',
  //     openingText: 'This is the opening text of the movie',
  //     releaseDate: '2021-05-18',
  //   },
  //   {
  //     id: 2,
  //     title: 'Some Dummy Movie 2',
  //     openingText: 'This is the second opening text of the movie',
  //     releaseDate: '2021-05-19',
  //   },
  // ];
  const [movies, setMovies] = useState([]);

  const fetchMoviesHandler = (props) => {
    // a second fetch argument is possible, in which one can specify a specific method
    // to be used. However, the default method is GET, and we want to use 
    // GET, so no extra argument is needed here. // fetch gives us a promise. Hence:
    fetch('https://swapi.dev/api/films').then((response) => {
      // The API delivers JSON data . The json() method (build-in) converts 
      // the JSON to a Javascript object without string delimiters around the 
      // keys.
      return response.json()
      // the json() method delivers a promise again. So we have to chain up ano
      // ther then() call to actually get the data after the promise is returned.
    }).then((data) => {
      const transformedMovies = (data.results).map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          releaseDate: movieData.release_date,
          openingText: movieData.opening_crawl,
        };
      });
      setMovies(transformedMovies);
    });
  };

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;
