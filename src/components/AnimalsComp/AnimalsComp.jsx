import "./animals-comp.css";
import { useGet } from "../../hooksAndUtils/useFetch";
import { useState } from "react";
import { Link } from "react-router-dom";
import views from "../../assets/Logos/views-logo.png";
import likes from "../../assets/Logos/likes-logo.png";

export const AnimalsComp = () => {
  const [animalArticles, setAnimalArticles] = useState([]);
  useGet("/api/articles/find?genre=animals&limit=2", setAnimalArticles);
  console.log(animalArticles);

  return (
    <div className="ac-container">
      <div className="header-container">
        <Link to={"/articles/animals"}>
          <h1 className="header-text ac-header-color">Animals</h1>
          <div className="comp-divider ac-divider-color"></div>
        </Link>
      </div>
      <div className="article-container">
        {animalArticles.map((article) => (
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
