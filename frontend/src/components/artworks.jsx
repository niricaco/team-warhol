import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style/artworks.css";
import "./style/pagination.css";
import Artwork from "./artwork";
import { getArtworks, getArtworks_title } from "./API";
import e from "cors";

const Artworks = () => {
    const [artworks, setArtworks] = useState([]);
    const [page, setPage] = useState(1);
    const [searchTitle, setSearchTitle] = useState("");
    const [loading, setLoading] = useState(true);
    const [searchUrl, setSearchUrl] = useState(undefined);
    
    const handleScroll = event => {
        const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
        
        if (scrollHeight - scrollTop === clientHeight ) {
            setPage(prev => prev + 1);
        }
    }
    
    const load = async () => {
        setLoading(true);
        const newArtworks = await getArtworks(page, searchUrl);
        setArtworks(newArtworks);
        setLoading(false);
        //console.log(artworks);
    };

    useEffect(() => {
        load();
    }, [page]);
    
    useEffect(() => {
        load();
    }, [searchUrl]);
    
    const goSearch = (e) => {
        e.preventDefault();
        setSearchUrl(searchTitle.length < 3 ? undefined : `&q=${searchTitle}`);
    }

    const display = artworks.map((item) => {
        return (
            <Artwork
                title={item.title}
                index={item.accession_number}
                image={item.images.web.url}
                creator={
                    item.creators.length > 0
                    ? item.creators[0].description
                    : "Creator unknown"
                }
                date={item.creation_date}
                desc={item.wall_description}
                funfact={item.fun_fact}
            />
        );
    });


    return (
        <>
            <form className="searchbar">
                
                <h2><label>Search for title:</label></h2>
                <input 
                    list="creator-list" 
                    id="searchArt" 
                    placeholder="Search for title"
                    value={ searchTitle } 
                    onChange={(e) => setSearchTitle(e.target.value)}/>

                <datalist id="creator-list">
                    {artworks.map((artwork) => {
                        return <option value={artwork.title}/>
                    })}
                </datalist> 
                <button className="serviceButtons" disabled={searchTitle.length >= 3 || searchTitle.length === 0 ? false : true} onClick={(e) => goSearch(e)}>Search</button>
            <hr className="separator"/>
        
            </form>


            <div className="grid" onScroll={handleScroll}>{display}</div>
            {loading && <h2 className="loading">Please wait, the gallery is loading...</h2>}


        </>
    );
};

export default Artworks;




/*
 "https://openaccess-api.clevelandart.org/api/artworks/?has_image=1&limit=10&artists=John%Constable" 


onClick={() => loadartwork(item.accession_number, item.title, item.creators[0].description, item.images.web.url, item.fun_fact, item.creation_date, item.wall_description )}>

{<Artwork
                    title={item.title}
                    image={item.images.web.url}
                    creator={item.creators[0].description}
                    date={item.creation_date}
                    desc={item.wall_description}
                    funfact={item.fun_fact}
                  />}
*/

//console.log(artworks);
//const titleList = artworks.map((item) => item.title);
//console.log(titleList);

//képek az images -> web -> url utvonalon

//const accessNumList = artworks.map((item) => item.accession_number);
//console.log(accessNumList);
//kép elérése: https://openaccess-cdn.clevelandart.org/1915.534/1915.534_web.jpg <--- '1915.534', ezt mind a két helyen {} az accessNumList

/* <ol></ol>
        {artworks.map((item) => (
          <li key={item.accession_number}>{item.title}</li>
        ))}
      </ol> */



       /*
            <label for="ice-cream-choice">Choose a flavor:</label>
            <input list="ice-cream-flavors" id="ice-cream-choice" name="ice-cream-choice" />

            <datalist id="ice-cream-flavors">
                <option value="Chocolate">
                <option value="Coconut">
                <option value="Mint">
                <option value="Strawberry">
                <option value="Vanilla">
            </datalist>
            */