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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = async () => {
    try {
    setIsLoading(true);
    // a second fetch argument is possible, in which one can specify a specific method
    // to be used. However, the default method is GET, and we want to use 
    // GET, so no extra argument is needed here. // fetch gives us a promise. Hence:
    const response = await fetch('https://swapi.dev/api/film');
      // The API delivers JSON data . The json() method (build-in) converts 
      // the JSON to a Javascript object without string delimiters around the 
      // keys.
    if (!response.ok) {
        // The response object has an OK field, whose value is true or false.
        // If an error occurs on the server, the server does not automatically 
        // return an error message to the client.
        throw new Error('Something went wrong.');
        // throw immediately takes us to the catch block. That is, the rest of the
        // code in the try block will not be executed. This is the synchronous, not 
        // the promise-based stuff.
        // To get the right error message, we need to check this here, after the first
        // asynchronous call, not after the following
        // because a wrong URL for instance, will cause the 
        // API not to send any JSON data.
      }
    const data = await response.json();
      // the json() method delivers a promise again. So we have to chain up ano
      // ther then() call to actually get the data after the promise is returned.
    
      const transformedMovies = (data.results).map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          releaseDate: movieData.release_date,
          openingText: movieData.opening_crawl,
        };
      });
      setMovies(transformedMovies);
    } catch (error) {
      setError(error.message);
    }
    // We want to set isLoading to false no matter what happened before.
    // Hence we call it here, in this place.
      setIsLoading(false);
  };
  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && !error && <p>No movies found.</p> }
        {!isLoading && error && <p>{error}</p>}
        {isLoading && <p>Loading ...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
