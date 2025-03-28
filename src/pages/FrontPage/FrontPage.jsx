import "./frontpage.css";
import logo from "../../assets/Logos/MeReadsLogoVertical.png";
import games from "../../assets/Logos/games-logo.png";
import fact from "../../assets/Logos/fact-logo.png";
import animals from "../../assets/Logos/animals-logo.png";
import fun from "../../assets/Logos/fun-logo.png";
import { LatestNewsComp } from "../../components/LatestNewsComp/LatestNewsComp.jsx";
import { NavComp } from "../../components/NavComp/NavComp";
import { PopReadsComp } from "../../components/PopularReadsComp/PopReadsComp";
import { GamesComp } from "../../components/GamesComp/GamesComp.jsx";
import { FactsComp } from "../../components/FactsComp/FactsComp.jsx";
import { Link } from "react-router-dom";
import { FunComp } from "../../components/FunComp/FunComp.jsx";
import { AnimalsComp } from "../../components/AnimalsComp/AnimalsComp.jsx";
// import { FooterComp } from "../../components/FooterComp/FooterComp.jsx";

export const FrontPage = () => {
  let gamesLink = "games";
  let funLink = "fun";
  let factsLink = "facts";
  let animalsLink = "animals";

  return (
    <>
      <div className="fp-container">
        <div className="fp-title-container">
          <img src={logo} alt="The ESL-page logo" className="fp-logo" />
          <div className="fp-text-container">
            <h2 className="fp-header-title">What do you want to read?</h2>
            <Link to={`/articles/${gamesLink}`}>
              <button className="fp-tc-button games-btn">
                <div className="fp-btn-div">
                  <img src={games} alt="" height="20px" />
                  <p style={{ color: "#DF5F20" }}>Games</p>
                </div>
              </button>
            </Link>
            <Link to={`/articles/${factsLink}`}>
              <button className="fp-tc-button fact-btn">
                <div className="fp-btn-div">
                  <img src={fact} alt="" height="20px" />
                  <p style={{ color: "#CDE8F4" }}>Facts</p>
                </div>
              </button>
            </Link>
            <Link to={`/articles/${animalsLink}`}>
              <button className="fp-tc-button animals-btn">
                <div className="fp-btn-div">
                  <img src={animals} alt="" height="30px" />
                  <p style={{ color: "#F5F2F2" }}>Animals</p>
                </div>
              </button>
            </Link>
            <Link to={`/articles/${funLink}`}>
              <button className="fp-tc-button fun-btn">
                <div className="fp-btn-div">
                  <img src={fun} alt="" height="25px" />
                  <p style={{ color: "#D0CF3F" }}>Fun</p>
                </div>
              </button>
            </Link>
          </div>
        </div>
        <LatestNewsComp />
        <NavComp />
        <PopReadsComp />
        <GamesComp />
        <FactsComp />
        <FunComp />
        <AnimalsComp />
        {/* <FooterComp /> */}
      </div>
    </>
  );
};
