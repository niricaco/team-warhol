import React from "react";

const Artworks = () => {
  return (
    <div className="characterHolder">
      {results.map((item) => (
        <Character
          name={item.name}
          image={item.image}
          species={item.species}
          status={item.status}
          gender={item.gender}
          origin={item.origin.name}
          key={item.name}
        />
      ))}
    </div>
  );
};

export default Artworks;
