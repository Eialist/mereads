import { useState } from "react";
import { useGet } from "../../hooksAndUtils/useFetch";
import "./pop-reads-comp.css";
import { Link } from "react-router-dom";
import views from "../../assets/Logos/views-logo.png";
import likes from "../../assets/Logos/likes-logo.png";

export const PopReadsComp = () => {
  const [popArticles, setPopArticles] = useState([]);
  useGet("/api/articles/popular", setPopArticles);
  console.log(popArticles);
  return (
    <>
      <div className="header-container">
        <h1 className="header-text prc-header-color">Popular Reads</h1>
        <div className="comp-divider prc-divider-color"></div>
      </div>
      <div className="article-container">
        {popArticles.map((article, index) => (
          <div key={article._id + index}>
            {index === 0 ? (
              <div className="prc-article-f-card">
                <img
                  src={article.img}
                  alt={article.description}
                  className="prc-art-img"
                />
                <div className="text-box">
                  <h3 className="title-header-text">{article.description}</h3>
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
                  <p className="multi-line-ellipsis">{article.text}</p>
                  <Link to={`/articles/${article.slug}`}>
                    <p className="read-more-links">Read more..</p>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="article-card">
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
            )}
          </div>
        ))}
      </div>
    </>
  );
};
