import React, { useState } from "react";
import "./List.css";
import NavigateBeforeRoundedIcon from "@mui/icons-material/NavigateBeforeRounded";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";

export default ({ title, items }) => {
  const [scrollX, setScrollX] = useState(0);

  const handleLeftArrow = () => {
    let x = scrollX + Math.round(window.innerWidth / 2);
    if (x > 0) {
      x = 0;
    }
    setScrollX(x);
  };

  const handleRightArrow = () => {
    let x = scrollX - Math.round(window.innerWidth / 2);
    let listW = items.results.length * 150;
    if (window.innerWidth - listW > x) {
      x = (window.innerWidth - listW) - 60;
    }
    setScrollX(x);
  };

  return (
    <div className="list">
      <h2>{title}</h2>
      <div className="list--left" onClick={handleLeftArrow}>
        <NavigateBeforeRoundedIcon style={{ fontSize: 50 }} />
      </div>
      <div className="list--right" onClick={handleRightArrow}>
        <NavigateNextRoundedIcon style={{ fontSize: 50 }} />
      </div>
      <div className="list--listarea">
        <div
          className="list--list"
          style={{
            marginLeft: scrollX,
            width: items.results.length * 150,
          }}
        >
          {items.results.length > 0 &&
            items.results.map((item, key) => (
              <div key={key} className="list--item">
                <img
                  src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
