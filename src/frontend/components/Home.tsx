import { useNavigate } from "react-router-dom";

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

export default Home;