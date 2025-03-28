import { useEffect, useState } from "react";
import { useGet } from "../../hooksAndUtils/useFetch";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import oLogo from "../../assets/Logos/orange-logo.png";
import bLogo from "../../assets/Logos/blue-logo.png";
import pLogo from "../../assets/Logos/d-pink-logo.png";
import gLogo from "../../assets/Logos/green-logo.png";
import views from "../../assets/Logos/views-logo.png";
import likesLogo from "../../assets/Logos/likes-logo.png";
import clickLike from "../../assets/Logos/icons8-heart-64.png";
import "./article-page.css";

export const ArticlePage = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState({});
  const [likes, setLikes] = useState();
  const [isLiked, setIsLiked] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState({});
  useGet(`/api/articles/${slug}`, (data) => {
    setArticle(data), setLikes(data.likes);
  });

  // window.scrollTo(0, 0);

  const handleAnswerClick = (selected, correct, questionIndex) => {
    setSelectedAnswer((prev) => ({
      ...prev,
      [questionIndex]: selected === correct,
    }));
  };

  useEffect(() => {
    const lastVisit = localStorage.getItem(`article_${slug}_lastVisit`);
    const currentTime = new Date().getTime();
    if (!lastVisit || currentTime - lastVisit > 86400000) {
      localStorage.setItem(`article_${slug}_lastVisit`, currentTime);
      fetch("/api/articles/addview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ slug: slug }),
      });
    }
  });

  let logoSrc;
  if (article.genre === "fun") {
    logoSrc = gLogo;
  } else if (article.genre === "facts") {
    logoSrc = bLogo;
  } else if (article.genre === "animals") {
    logoSrc = oLogo;
  } else if (article.genre === "games") {
    logoSrc = pLogo;
  }

  const colors = ["orange-bg", "blue-bg", "green-bg", "brown-bg"];

  let articleId = article._id;
  const handleLikeToggle = async () => {
    const articleLiked = localStorage.getItem(`article_${articleId}_liked`);
    try {
      if (articleLiked === "true") {
        await fetch("/api/articles/deleteLike", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ articleId, likes: likes }),
        });
        setLikes((prevLikes) =>
          typeof prevLikes === "number" && prevLikes > 0 ? prevLikes - 1 : 0
        );

        localStorage.setItem(`article_${articleId}_liked`, "false");
        setIsLiked(false);
      } else {
        await fetch("/api/articles/addLike", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ articleId, likes: likes }),
        });
        setLikes((prevLikes) =>
          typeof prevLikes === "number" && prevLikes >= 0 ? prevLikes + 1 : 0
        );
        localStorage.setItem(`article_${articleId}_liked`, "true");
        setIsLiked(true);
      }
    } catch (error) {
      console.error("Error updating like:", error);
    }
    console.log(isLiked);
  };

  return (
    <div className="article-container" style={{ gap: 0 }}>
      <Link to={"/"}>
        <div className="fp-header">
          <img src={logoSrc} alt="" className="s-logo" />
        </div>
      </Link>
      <div key={article._id} className="article-box bg-white">
        <div className="article-img-container">
          <img src={article.img} alt="" className="s-article-img" />
          <img
            src={clickLike}
            alt=""
            className="like-logo"
            onClick={() => handleLikeToggle()}
          />
        </div>
        <div className="text-box">
          <h2 className="s-article-title">{article.title}</h2>
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
                src={likesLogo}
                alt=""
                height="10px"
                style={{ paddingRight: "3px" }}
              />
              {likes}
            </span>
          </div>
          <div
            dangerouslySetInnerHTML={{ __html: article.text }}
            className="article-body-text"
          />
          {article.questions ? (
            <div>
              <h3>Questions on the text</h3>
              {article.questions.map((question, questionIndex) => (
                <div
                  key={questionIndex}
                  className="article-question-text"
                  style={{ marginTop: "1em" }}>
                  <div>
                    <strong>{question.question}</strong>
                  </div>
                  {question.options.map((answer, index) => (
                    <div
                      key={answer + index}
                      className={`article-answers ${
                        colors[index % colors.length]
                      }`}
                      onClick={() =>
                        handleAnswerClick(
                          answer,
                          question.correctAnswer,
                          questionIndex
                        )
                      }>
                      {answer}
                    </div>
                  ))}
                  {selectedAnswer[questionIndex] !== undefined && (
                    <p>
                      {selectedAnswer[questionIndex]
                        ? "✅ Correct!"
                        : "❌ Incorrect"}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            false
          )}
        </div>
        <div className="text-box"></div>
      </div>
    </div>
  );
};
