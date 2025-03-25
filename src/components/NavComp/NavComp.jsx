import games from "../../assets/Logos/games-logo.png";
import fact from "../../assets/Logos/fact-logo.png";
import animals from "../../assets/Logos/animals-logo.png";
import fun from "../../assets/Logos/fun-logo.png";
import "./nav-comp.css";
import { Link } from "react-router-dom";

export const NavComp = () => {
  return (
    <div className="nav-container">
      <Link to={"/articles/games"}>
        <div className="nav-btn-container games-btn">
          <img src={games} alt="" className="nav-btn-icon" height={21} />
          <p className="nav-btn-text">Games</p>
        </div>
      </Link>
      <Link to={"/articles/facts"}>
        <div className="nav-btn-container fact-btn">
          <img src={fact} alt="" className="nav-btn-icon" height={21} />
          <p className="nav-btn-text">Facts</p>
        </div>
      </Link>
      <Link to={"/articles/animals"}>
        <div className="nav-btn-container animals-btn">
          <img src={animals} alt="" className="nav-btn-icon" height={25} />
          <p className="nav-btn-text">Animals</p>
        </div>
      </Link>
      <Link to={"/articles/fun"}>
        <div className="nav-btn-container fun-btn">
          <img src={fun} alt="" className="nav-btn-icon" height={25} />
          <p className="nav-btn-text">Fun</p>
        </div>
      </Link>
    </div>
  );
};
