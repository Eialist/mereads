import "./footer-comp.css";
import logo from "../../assets/Logos/mr-white.png";
import { Link } from "react-router-dom";

export const FooterComp = () => {
  return (
    <div className="footer-container">
      <img src={logo} alt="" width="60px" />
      <div className="footer-text-container">
        <div>
          <Link to={"/contact"}>
            <h3 className="footer-header">Contact</h3>
          </Link>
          <p>
            If you want to reach out to me, report bugs or just send your
            requests for new articles.
          </p>
        </div>
        <div>
          <Link to={"/about-mereads"}>
            <h3 className="footer-header">About MeReads</h3>
          </Link>
          <p>
            Read more about the creator of this site and my other projects.{" "}
          </p>
        </div>
        <div>
          <Link to={"/credits"}>
            <h3 className="footer-header">Credits</h3>
          </Link>
          <p>Here you can find a list of all the assets credits.</p>
        </div>
      </div>
    </div>
  );
};
