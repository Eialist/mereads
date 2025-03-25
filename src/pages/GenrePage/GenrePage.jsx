import { useGet } from "../../hooksAndUtils/useFetch";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import views from "../../assets/Logos/views-logo.png";
import likes from "../../assets/Logos/likes-logo.png";

export const GenrePage = () => {
  const { genre } = useParams();
  const [articles, setArticles] = useState([]);
  const [query, setQuery] = useState("");
  useGet(`http://localhost:6789/api/articles/${genre}`, setArticles);
  console.log(articles);
  console.log(genre);
  return (
    <>
      <div className="header-container">
        <h1 className="header-text fun-header-color">Animals</h1>
        <div className="comp-divider fun-divider-color"></div>
      </div>
      <div className="article-container article-container-page">
        <input type="text" onChange={(e) => setQuery(e.target.value)} />
        {articles
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
                    <img src={views} alt="" height="10px" />
                    {article.views}
                  </span>
                  <span>
                    <img src={likes} alt="" height="10px" />
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
