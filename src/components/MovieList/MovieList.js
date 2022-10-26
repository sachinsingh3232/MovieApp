import React, { useState } from 'react'
import MovieCard from "../MovieCard/MovieCard";
import Details from "../Details/Details"
import "./movieList.css"
import Axios from "axios";
const API_KEY = "3d34edc9";

const MovieList = () => {
    const [searchQuery, updateSearchQuery] = useState();
    const [MovieList, updateMovieList] = useState([]);
    const [selectedMovie, onMovieSelect] = useState();
    const [timeoutId, updateTimeoutId] = useState();

    const fetchData = async (searchString) => {
        const response = await Axios.get(
            `https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`,
        );
        console.log(response.data.Search);
        updateMovieList(response.data.Search);
    };
    const onTextChange = (e) => {
        // onMovieSelect("")
        clearTimeout(timeoutId);
        updateSearchQuery(e.target.value);
        const timeout = setTimeout(() => fetchData(e.target.value), 500);
        updateTimeoutId(timeout);
    };
    return (
        <div className="main">
            <div className="header">
                <div id="Appname">
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5KVHxT71ITuzT-U5VOVrLNq_0wcsL6RLo5lz52wFTgXnEYtrLiVARwAEfwgIPkaXEg9M&usqp=CAU"
                        alt=""
                    />
                    MovieApp
                </div>
                <div id="Search">
                    <input type="search" placeholder="Search" value={searchQuery} onChange={onTextChange} />
                </div>
            </div>
            {selectedMovie && <Details selectedMovie={selectedMovie} onMovieSelect={onMovieSelect} />}
            <div className="movielist">
                {MovieList?.length ? MovieList.map((movie, index) => (<MovieCard key={index} movie={movie} onMovieSelect={onMovieSelect} />)) 
                :<img className='home' src="https://cdn.pixabay.com/photo/2012/04/14/13/58/negative-34025__340.png" alt="Search Movie Here"/>}
            </div>
        </div>
    )
}

export default MovieList