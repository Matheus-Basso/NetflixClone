import React, { useEffect, useState } from "react";
import "./App.css";
import Tmdb from "./Tmdb";
import List from "./components/List";
import Featured from "./components/Featured";
import Header from "./components/Header";

function App() {
  const [movieList, setMovieList] = useState([]);
  const [topData, setTopData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(() => {
    const loadAll = async () => {
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      let originals = list.filter((i) => i.slug === "originals");
      let randomChosen = Math.floor(
        Math.random() * (originals[0].items.results.length - 1)
      );
      let chosen = originals[0].items.results[randomChosen];
      let chosenData = await Tmdb.getInfo(chosen.id, "tv");
      console.log(chosenData);
      setTopData(chosenData);
    };

    loadAll();
  }, []);

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 10) {
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    };

    window.addEventListener("scroll", scrollListener);
    return () => {
      window.removeEventListener("scroll", scrollListener);
    };
  }, []);

  return (
    <>
      <div className="page">
        <Header black={blackHeader} />
        {topData && <Featured item={topData} />}
        <section className="lists">
          {movieList.map((item, key) => (
            <List key={key} title={item.title} items={item.items} />
          ))}
        </section>
        <footer>
          Image rights for <strong>Netflix</strong>
          <br />
          Data taken from <strong>themoviedb.org</strong>
          <br />
          <br />
          Made by: <br />
          Matheus Basso <br />
          <a href="https://www.linkedin.com/in/matheus-basso-5a2194223/">
            <img
              className="footer--linkedin"
              src={require("./assets/linkedin.png")}
              alt="LinkedIn"
            />
          </a>
          <a href="https://github.com/Matheus-Basso">
            <img
              className="footer--github"
              src={require("./assets/github.png")}
              alt="GitHub"
            />
          </a>
        </footer>
        {movieList.length <= 0 && (
          <div className="loading">
            <img
              src="https://i.gifer.com/origin/36/36527397c208b977fa3ef21f68c0f7b2.gif"
              alt="Loading"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default App;
