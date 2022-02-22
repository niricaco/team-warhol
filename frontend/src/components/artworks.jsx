import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style/artworks.css";
import "./style/pagination.css";
import Artwork from "./artwork";
import { getArtworks, getArtworks_title } from "./API";

const Artworks = () => {
    const [artworks, setArtworks] = useState([]);
    const [page, setPage] = useState(1);
    const [title, setTitle] = useState("a");
    const [loading, setLoading] = useState(true);

    const [ inputValue, setInputValue] = useState("")
    
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(`The name you entered was: ${inputValue}`)
    }

    const handleScroll = event => {
        const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;

        if (scrollHeight - scrollTop === clientHeight ) {
            setPage(prev => prev + 1);
        }
    }

    const load = async () => {
        //setLoading(true);
        const newArtworks = await getArtworks(page);
        setArtworks((prev) => [...prev, ...newArtworks]);
        //setLoading(false);
        console.log(artworks);
    };

    
    const load_title = async () => {
        //setLoading(true);
        const newArtworks_title = await getArtworks_title(title);
        setArtworks((prev) => [prev, newArtworks_title]);
        //setLoading(false);
        console.log(artworks);
    };

    useEffect(() => {
        load();
    }, [page]);

    /*useEffect(() => {
        load_title();
    }, [title]);*/

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
                
                <label>Search for title:</label>
                <input 
                    list="creator-list" 
                    id="searchArt" 
                    placeholder="Search for title"
                    value={ title } 
                    onChange={(e) => setTitle(e.target.value)}/>

                <datalist id="creator-list">
                    {artworks.map((artwork) => {
                        return <option value={artwork.title}/>
                    })}
                </datalist> 
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