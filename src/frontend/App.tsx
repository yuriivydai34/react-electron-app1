import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ArticlesPage from "./components/ArticlesPage";
import LoginPage from "./components/LoginPage";
import Home from "./components/Home";
import ChatPage from "./components/ChatPage";
import ArticleDetailPage from "./components/ArticleDetailPage";

const App: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/articles" element={<ArticlesPage />} />
      <Route path="/articles/:id" element={<ArticleDetailPage />} />
      <Route path="/chat" element={<ChatPage />} />
    </Routes>
  </Router>
);

export default App;