import "./animals-page.css";
import { useGet } from "../../hooksAndUtils/useFetch";
import { useState } from "react";
import { Link } from "react-router-dom";
import views from "../../assets/Logos/views-logo.png";
import likes from "../../assets/Logos/likes-logo.png";
import { NavComp } from "../../components/NavComp/NavComp";

export const AnimalsPage = () => {
  const [animalArticles, setAnimalArticles] = useState([]);
  const [query, setQuery] = useState("");
  useGet("/api/articles/find?genre=animals", setAnimalArticles);
  console.log(animalArticles);
  window.scrollTo(0, 0);

  return (
    <>
      <NavComp />
      <div className="header-container">
        <h1 className="header-text ac-header-color">Animals</h1>
        <div className="comp-divider ac-divider-color"></div>
      </div>
      <div className="article-container article-container-page">
        <input type="text" onChange={(e) => setQuery(e.target.value)} />
        {animalArticles
          .filter((article) => {
            return (
              article.title.toLowerCase().includes(query.toLowerCase()) ||
              article.description.toLowerCase().includes(query.toLowerCase())
            );
          })
          .map((article) => (
            <div className="article-card" key={article}>
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
