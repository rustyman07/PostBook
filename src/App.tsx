import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/navbar";
import Createpost from "./components/Createpost";
import ModalPost from "./components/ModalPost";
import CardPost from "./components/CardPost";
import { Container, Typography } from "@mui/material";

// Define Post type
type PostType = {
  text: string;
  imageData: string | null;
  postTime: string | Date;
};

function App() {
  const [open, setOpen] = useState<boolean>(false);
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState<string | null>(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setCurrentImage(null);
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

      <Createpost setOpen={setOpen} setCurrentImage={setCurrentImage} />

      <ModalPost
        open={open}
        handleClose={handleClose}
        posts={posts}
        setPosts={setPosts}
        currentImage={currentImage}
        setCurrentImage={setCurrentImage}
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
        ) : posts.length > 0 ? (
          posts
            .map((post, index) => (
              <CardPost
                key={index}
                item={post.text}
                imageData={post.imageData}
                postTime={post.postTime}
              />
            ))
            .reverse()
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
