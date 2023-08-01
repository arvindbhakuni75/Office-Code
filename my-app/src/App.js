import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [movies, setMovies] = useState(null);
  const [name, setName] = useState("");
  const [year, setYear] = useState("");

  const [movieId, setMovieId] = useState(null);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetch("/api/movies")
      .then((res) => res.json())
      .then((json) => setMovies(json.movies))
      .catch((err) => console.log(err));
  }, []);

  const submitForm = async (e) => {
    e.preventDefault();

    if(updating) {
      updateMovie()
    } else {
      createMovie()
    } 
  };

  const createMovie = async () => {
    try {
      const res = await fetch("/api/movies", {
        method: "POST",
        body: JSON.stringify({ name, year }),
      });
      const json = await res.json();

      setMovies([]);
      setName("");
      setYear("");
    } catch (err) {
      console.log(err);
    }
  }

  const updateMovie = async () => {
    try {
      const res = await fetch(`/api/movies/${movieId}`, {
        method: 'PATCH',
        body: JSON.stringify({ name, year }),
      })
      const json = await res.json()

      const moviesCopy = [...movies]
      const index = movies.findIndex((m) => m.id === movieId)
      moviesCopy[index] = json.movies

      setMovies(moviesCopy)
      setName('')
      setYear('')
      setUpdating(false)
      setMovieId(null)
    } catch (err) {
      console.log(err)
    }
  }

  const editMovie = async (id) => {
    fetch(`/api/movies/${id}`)
    .then((res) => res.json())
    .then((json) => {
      setName(json.movies.name)
      setYear(json.movies.year)
      setMovieId(id)
      setUpdating(true)
    })
    .catch((err) => console.log(err));
  }

  const deleteMovie = async (id) => {
    try {
      await fetch(`/api/movies/${id}`, { method: 'DELETE'})
      setMovies(movies.filter(m => m.id !== id))
    } catch (err) {
      console.log(err)
    } 
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col">
          <h1 className="fw-normal text-center my-3">Movies</h1>
          <div className="my-4">
            <form onSubmit={submitForm}>
              <div className="row">
                <div className="col-5">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="col-5">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Year"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                  />
                </div>
                <div className="col-2">
                  <button type="submit" className="btn btn-success">
                    { updating ? "Update" : "Create"}
                  </button>
                </div>
              </div>
            </form>
          </div>
          {movies?.length > 0 ? (
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Year</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {movies?.map((item, i) => {
                  return (
                    <tr key={i}>
                      <td>{item?.id}</td>
                      <td>{item?.name}</td>
                      <td>{item?.year}</td>
                      <td>
                        <button onClick={() => editMovie(item.id)} className="btn btn-warning me-3">Update</button>
                        <button onClick={() => deleteMovie(item.id)} className="btn btn-danger">Delete</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <p>No Movies</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
