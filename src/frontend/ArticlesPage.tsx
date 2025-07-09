import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type Article = {
  id: number;
  title: string;
  description: string;
};

const ArticlesPage: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");

    if (!jwt) {
      navigate("/login");
      return;
    }

    fetch("http://localhost:1337/api/articles", {
      headers: jwt ? { Authorization: `Bearer ${jwt}` } : {},
    })
      .then((res) => res.json())
      .then((data) => {
        setArticles(data.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [navigate]);

  if (loading) return <div>Loading...</div>;

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    navigate("/login");
  };

  return (
    <div>
      <nav style={{ display: "flex", gap: 8, marginBottom: 24 }}>
        <button onClick={handleLogout}>Logout</button>
        <button onClick={() => navigate("/")}>Go to /</button>
      </nav>
      <h1>Articles</h1>
      <ul>
        {articles.map((article) => (
          <li key={article.id}>
            <h2>{article.title}</h2>
            <p>{article.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArticlesPage;