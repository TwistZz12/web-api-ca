import React from "react";
import ActorCard from "../actorCard";

const CastList = ({ cast }) => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
      {cast.map((actor) => (
        <ActorCard key={actor.id} actor={actor} />
      ))}
    </div>
  );
};

export default CastList;
