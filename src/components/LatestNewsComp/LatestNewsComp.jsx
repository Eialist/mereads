import { useState } from "react";
import "./latest-news-comp.css";
import { useGet } from "../../hooksAndUtils/useFetch.js";
import likes from "../../assets/Logos/likes-logo.png";
import views from "../../assets/Logos/views-logo.png";
import { Link } from "react-router-dom";

export const LatestNewsComp = () => {
  const [articles, setArticles] = useState([]);
  useGet("/api/articles/latest", setArticles);
  return (
    <>
      <h1 className="lnc-header-text">Latest News</h1>
      <div className="lnc-article-container">
        {articles.map((article) => (
          <div key={article._id} className="lnc-article-card">
            <Link to={`/articles/${article.slug}`}>
              <img
                src={article.img}
                alt={article.description}
                className="lnc-art-img"
              />
              <div className="lnc-inter-container">
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

              <h3 className="multi-line-ellipsis lnc-text">
                {article.description}
              </h3>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default LatestNewsComp;
