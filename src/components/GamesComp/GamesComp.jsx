import "./games-comp.css";
import { useGet } from "../../hooksAndUtils/useFetch";
import { useState } from "react";
import { Link } from "react-router-dom";
import views from "../../assets/Logos/views-logo.png";
import likes from "../../assets/Logos/likes-logo.png";

export const GamesComp = () => {
  const [gamesArticles, setGamesArticles] = useState([]);
  useGet("/api/articles/find?genre=games&limit=2", setGamesArticles);
  console.log(gamesArticles);
  return (
    <div className="gc-container">
      <div className="header-container">
        <Link to={"articles/games"}>
          <h1 className="header-text gc-header-color">Games</h1>
          <div className="comp-divider gc-divider-color"></div>
        </Link>
      </div>
      <div className="article-container">
        {gamesArticles.map((article) => (
          <div className="article-card" key={article._id}>
            <img
              src={article.img}
              alt={article.description}
              className="article-img"
            />
            <div className="text-box">
              <h3 className="multi-line-ellipsis">{article.description}</h3>
              <div className="inter-container">
                <span>
                  <img
                    src={views}
                    alt=""
                    height="10px"
                    style={{ paddingRight: "3px" }}
                  />
                  {article.views}
                </span>
                <span>
                  <img
                    src={likes}
                    alt=""
                    height="10px"
                    style={{ paddingRight: "3px" }}
                  />
                  {article.likes}
                </span>
              </div>
              <Link to={`/articles/${article.slug}`}>
                <p className="read-more-links">Read more..</p>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
