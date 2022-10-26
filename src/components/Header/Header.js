import "./header.css"
import Axios from "axios";
import React, { useState } from 'react'
const API_KEY = "3d34edc9";

function Header() {
    const[searchQuery, updateSearchQuery] = useState();
    const [movieList, updateMovieList] = useState([]);
    // const [selectedMovie, onMovieSelect] = useState();
    const [timeoutId, updateTimeoutId] = useState();

    const fetchData = async (searchString) => {
        const response = await Axios.get(
            `https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`,
        );
        console.log(response);
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
    )
}

export default Header