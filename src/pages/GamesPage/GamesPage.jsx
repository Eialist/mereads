import "./games-page.css";
import { useGet } from "../../hooksAndUtils/useFetch";
import { useState } from "react";
import { Link } from "react-router-dom";
import views from "../../assets/Logos/views-logo.png";
import likes from "../../assets/Logos/likes-logo.png";
import logo from "../../assets/Logos/mr-pink.png";
import { NavComp } from "../../components/NavComp/NavComp";

export const GamesPage = () => {
  const [gamesArticles, setGamesArticles] = useState([]);
  const [query, setQuery] = useState("");
  useGet("/api/articles/find?genre=games", setGamesArticles);
  console.log(gamesArticles);

  return (
    <>
      <Link to={"/"}>
        <div className="page-logo">
          <img src={logo} alt="" />
        </div>
      </Link>
      <NavComp />
      <div className="header-container">
        <h1 className="header-text games-header-color">Games</h1>
        <div className="comp-divider games-divider-color"></div>
      </div>
      <div className="article-container article-container-page">
        <input
          type="text"
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
          placeholder="Search..."
        />
        {gamesArticles
          .filter((article) => {
            return (
              article.title.toLowerCase().includes(query.toLowerCase()) ||
              article.description.toLowerCase().includes(query.toLowerCase())
            );
          })
          .map((article) => (
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
    </>
  );
};
