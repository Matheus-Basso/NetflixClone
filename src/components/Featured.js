import React from "react";
import "./Featured.css";

export default ({ item }) => {
  let date = new Date(item.first_air_date);
  let genres = [];
  for(let i in item.genres) {
    genres.push(item.genres[i].name);
  }
  let description = item.overview;
  if(description.length > 200) {
    description = description.substring(0, 200)+'...';
  }
  return (
    <section
      className="featured"
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`,
      }}
    >
      <div className="featured--vertical">
        <div className="featured--horizontal">
          <div className="featured--title">{item.original_name}</div>
          <div className="featured--info">
            <div className="featured--points">{item.vote_average} points</div>
            <div className="featured--year">{date.getFullYear()}</div>
            <div className="featured--seasons">
              {item.number_of_seasons} season{item.number_of_seasons > 1 && "s"}
            </div>
            <div className="featured--description">{description}</div>
            <div className="featured--buttons">
              <a className="featured--watchbutton" href={`/watch/${item.id}`}>► Watch</a>
              <a className="featured--listbutton" href={`/list/add/${item.id}`}>+ To List</a>
            </div>
            <div className="featured--genres">
              <strong>Genres: </strong> {genres.join(', ')}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
