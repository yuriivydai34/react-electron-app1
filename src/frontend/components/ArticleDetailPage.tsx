import { useNavigate } from "react-router-dom";

function ArticleDetailPage() {
  const navigate = useNavigate();

  return (
    <div>
      <nav style={{ display: "flex", gap: 8, marginBottom: 24 }}>
        <button onClick={() => navigate("/articles")}>Go to Articles</button>
      </nav>
      <h1>Article Detail Page</h1>
    </div>
  );
}

export default ArticleDetailPage;
