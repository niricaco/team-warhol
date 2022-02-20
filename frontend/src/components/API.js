
export const getArtworks = async page => {
    const artworks = await (
        await fetch(`https://openaccess-api.clevelandart.org/api/artworks/?has_image=1&limit=100&page=${page}`)
    ).json();
    return artworks.data
}

