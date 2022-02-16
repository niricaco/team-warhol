/*const [xappToken, setXappToken] = useState([]);
const clientID = "efcb8eb8f8778d39695f",
  clientSecret = "bb837994bfd8df9f962b9862c81e3a83",
  apiUrl = "https://api.artsy.net/api/tokens/xapp_token";

const token = async () => {
  const response = await axios.post(apiUrl, {
    client_id: clientID,
    client_secret: clientSecret,
  });
  setXappToken(response.data.token);
};

const load = async () => {
  const response = await axios.get("https://api.artsy.net/api/artworks", {
    headers: { "X-Xapp-Token": xappToken },
  });
  setArtworks(response.data._embedded.artworks);
};

useEffect(() => {
  token();
  load();
}, [xappToken]);
console.log(artworks);

/* {artworks.map((item) => (
  <Artwork
    key={item.id}
    name={item.title}
    image={item.thumbnail}
    species={item.species}
    status={item.status}
    gender={item.gender}
    origin={item.origin.name}
    key={item.name}
  />
))} */
