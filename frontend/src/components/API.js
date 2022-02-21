export const getArtworks = async (page) => {
  const artworks = await (
    await fetch(
      `https://openaccess-api.clevelandart.org/api/artworks/?has_image=1&limit=10&page=${page}`
    )
  ).json();
  return artworks.data;
};
