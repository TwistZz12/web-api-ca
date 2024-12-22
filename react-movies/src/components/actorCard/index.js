import React from "react";
import { Link } from "react-router-dom";

const ActorCard = ({ actor }) => {
  return (
    <Link to={`/actor/${actor.id}`}>
    <div style={{ margin: "10px", textAlign: "center" }}>
      <img
        src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
        alt={actor.name}
        style={{ borderRadius: "8px" }}
      />
      <h4>{actor.name}</h4>
      <p>{actor.character}</p>
    </div>
    </Link>
  );
};

export default ActorCard;
