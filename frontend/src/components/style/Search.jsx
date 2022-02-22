import React, { useState } from 'react'

const Search = (artworks) => {


    const [ inputValue, setInputValue] = useState("")
    
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(`The name you entered was: ${inputValue}`)
    }


    return (
        <form >
            <div>{inputValue}</div> 
            <input 
                list="creator-list" 
                id="searchArt" 
                placeholder="Search for title"
                value={ inputValue } 
                onChange={(e) => setInputValue(e.target.value)}/>

            <datalist id="creator-list">
                {artworks.map((artwork) => {
                    return <option value={artwork.title}/>
                })}
            </datalist> 
            <button type="submit" >Search</button>
        
        </form>

  )
}

export default Search