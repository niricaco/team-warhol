import React, { useState, useEffect } from "react";

const mainUrls = {
  characters: "https://rickandmortyapi.com/api/character/?page=",
  /* locations: "https://rickandmortyapi.com/api/location/?page=", */
};

/**
     Fetch data from the given url. If it can't get any data from the url, than it writes a message into the console.
     *
     * @param initUrl string that gives the route that the function fetch data from.
     */
const useFetch = (initUrl) => {
  const [url, setUrl] = useState(initUrl);
  const [data, setData] = useState(undefined);

  useEffect(() => {
    fetch(url)
      .then((response) => {
        if (response.status !== 200) return "There must be a problem";
        return response.json();
      })
      .then((json) => setData(json));
  }, [url]);

  return [data, setUrl];
};

/**
     Fetch data from an open-source API. It returns json containing pagination.
     The json contains an `info` and a `results` property. The `info` contains every information about the pagination,
     the `results` contains the characters objects situated in the given page number in the pagination.
     *
     * @param pageNum integer that gives the pagination page number. The json `info` property contains how many pages are.
     */
export const useCharacters = (pageNum = 1) => {
  const [characters, setUrl] = useFetch(mainUrls.characters + pageNum);
  useEffect(() => {
    setUrl(mainUrls.characters + pageNum);
  }, [pageNum]);
  return characters === undefined ? "Loading..." : characters;
};

/**
     Fetch data from an open-source API. It returns json containing pagination.
     The json contains an `info` and a `results` property. The `info` contains every information about the pagination,
     the `results` contains the locations objects situated in the given page number in the pagination.
     *
     * @param pageNum integer that gives the pagination page number. The json `info` property contains how many pages are.
     */
/* export const useLocations = (pageNum = 1) => {
  const [locations, setUrl] = useFetch(mainUrls.locations + pageNum);
  useEffect(() => {
    setUrl(mainUrls.locations + pageNum);
  }, [pageNum]);
  return locations === undefined ? "Loading..." : locations;
}; */
