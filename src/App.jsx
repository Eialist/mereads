import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { FrontPage } from "./pages/FrontPage/FrontPage";
import { ArticlePage } from "./pages/ArticlePage/ArticlePage";
import { FunPage } from "./pages/FunPage/FunPage";
import { FactPage } from "./pages/FactPage/FactPage";
import { AnimalsPage } from "./pages/AnimalsPage/AnimalsPage";
import { GamesPage } from "./pages/GamesPage/GamesPage";
import { ContactPage } from "./pages/ContactPage/ContactPage";
import { AboutPage } from "./pages/AboutPage/AboutPage";
import { CreditPage } from "./pages/CreditsPage/CreditPage";
// import { GenrePage } from "./pages/GenrePage/GenrePage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<FrontPage />} />
          <Route path="/articles/:slug" element={<ArticlePage />} />
          {/* <Route path="/articles/:genre" element={<GenrePage />} /> */}
          <Route path="/articles/fun" element={<FunPage />} />
          <Route path="/articles/facts" element={<FactPage />} />
          <Route path="/articles/animals" element={<AnimalsPage />} />
          <Route path="/articles/games" element={<GamesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about-mereads" element={<AboutPage />} />
          <Route path="/credits" element={<CreditPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
