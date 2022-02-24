export const getArtworks = async (page, search) => {
  const api = await (
    await fetch(
      `https://openaccess-api.clevelandart.org/api/artworks/?has_image=1&limit=10&page=${page}${search}`
    )
  ).json();
  return api.data;
};

export const backend_source = () => {
  const sourceTarget_local = "http://localhost:4000";
  const sourceTarget_remote = "https://warhol-frontend-backend.sloppy.zone";
  return sourceTarget_remote;
};
