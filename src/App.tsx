import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/navbar";
import Createpost from "./components/Createpost";
import ModalPost from "./components/ModalPost";
import CardPost from "./components/CardPost";
import { Container, Typography } from "@mui/material";

function App() {
  const [open, setOpen] = useState<boolean>(false);
  const [post, setPost] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // States for Createpost & ModalPost

  const [feelingOpen, setFeelingOpen] = useState(false); // for future use
  const [imageData, setImageData] = useState<string | null>(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setImageData(null); // Clear imageData on close
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Navbar />

      <Createpost
        setOpen={setOpen}
        setFeelingOpen={setFeelingOpen}
        setImageData={setImageData}
      />

      <ModalPost
        open={open}
        handleClose={handleClose}
        post={post}
        setPost={setPost}
        imageData={imageData}
        setImageData={setImageData}
      />

      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Welcome to Postbook
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Share your thoughts and experiences with the world!
        </Typography>

        {loading ? (
          <>
            <CardPost key="skeleton-1" loading />
            <CardPost key="skeleton-2" loading />
            <CardPost key="skeleton-3" loading />
          </>
        ) : post.length > 0 ? (
          post.map((item, index) => (
            <CardPost key={index} item={item} imageData={imageData} />
          ))
        ) : (
          <Typography variant="body1" color="textSecondary">
            No posts available. Create your first post!
          </Typography>
        )}
      </Container>
    </>
  );
}

export default App;
