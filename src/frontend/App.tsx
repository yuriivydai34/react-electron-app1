import React from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import ArticlesPage from "./ArticlesPage";
import LoginPage from "./LoginPage";


const Home: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div>
      <nav style={{ display: "flex", gap: 8, marginBottom: 24 }}>
        <button onClick={() => navigate("/articles")}>Go to Articles</button>
      </nav>
      <h1>Home Page</h1>
    </div>
  );
};

const App: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/articles" element={<ArticlesPage />} />
    </Routes>
  </Router>
);

export default App;