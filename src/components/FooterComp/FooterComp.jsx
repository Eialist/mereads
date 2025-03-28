import "./footer-comp.css";
import logo from "../../assets/Logos/mr-yellowgreen.png";

export const FooterComp = () => {
  return (
    <div className="footer-container">
      <img src={logo} alt="" width="60px" />
      <div className="footer-text-container">
        <h3>Contact</h3>
        <p>
          If you want to reach out to me, report bugs or just send your requests
          for new articles
        </p>
        <h3>About MeReads</h3>
        <p>Read more about the creator of this site and my other projects. </p>
      </div>
    </div>
  );
};
