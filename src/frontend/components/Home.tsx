import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();

  const [nodeVersion, setNodeVersion] = useState<string | undefined>(undefined);

  const updateNodeVersion = useCallback(
    async () => setNodeVersion(await backend.nodeVersion("Hello from App.tsx!")),
    []
  );

  const connectToDatabase = useCallback(async () => {
    try {
      const db = await backend.connectToDatabase();
      console.log("Connected to the database:", db);
    } catch (error) {
      console.error("Error connecting to the database:", error);
    }
  }, []);

  // Function to handle file input change
  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const files = event.target.files;
    const token = localStorage.getItem("jwt");
    if (files) {
      const formData = new FormData();
      Array.from(files).forEach((file) => {
        formData.append("files", file);
      });
      // Upload the files using fetch or any other method
      fetch(`${import.meta.env.VITE_API_URL}/api/upload`, {
        method: "POST",
        body: formData,
        headers: {
          // Add any necessary headers here, e.g., authorization
          "Authorization": `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Upload successful:", data);
        })
        .catch((error) => {
          console.error("Error uploading files:", error);
        });
    }
  }

  return (
    <div>
      <button onClick={updateNodeVersion}>
        Node version is {nodeVersion}
      </button>
      <button onClick={connectToDatabase}>
        Connect to Database
      </button>
      <nav style={{ display: "flex", gap: 8, marginBottom: 24 }}>
        <button onClick={() => navigate("/articles")}>Go to Articles</button>
        <button onClick={() => navigate("/chat")}>Go to Chat</button>
      </nav>
      <h1>Home Page</h1>
      <input type="file" onChange={handleFileChange} />
    </div>
  );
};

export default Home;
