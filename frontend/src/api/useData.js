import React, { useEffect, useState } from "react";
import { useFetch } from "./useFetch.js";
import { mainUrls } from "./dataRoutes.js";

/**
     Fetch data from an open-source API. It returns json containing pagination.
     The json contains an `info` and a `results` property. The `info` contains every information about the pagination,
     the `results` contains the locations objects situated in the given page number in the pagination.
     *
     * @param pageNum integer that gives the pagination page number. The json `info` property contains how many pages are.
     */
export const useArtworks = (xappToken = 1) => {
  const [locations, setUrl] = useFetch(mainUrls.artworks, {
    headers: { "X-Xapp-Token": xappToken },
  });
  useEffect(() => {
    setUrl(mainUrls.locations, {
      headers: { "X-Xapp-Token": xappToken },
    });
  }, [xappToken]);
  return locations === undefined ? "Loading..." : locations;
};
