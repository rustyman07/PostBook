import React, { useRef } from "react";
import {
  Box,
  Card,
  CardContent,
  Button,
  Avatar,
  IconButton,
  Stack,
  Tooltip,
  Divider,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import ImageIcon from "@mui/icons-material/Image";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";

type CreatePostProps = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentImage: React.Dispatch<React.SetStateAction<string | null>>;
};

function CreatePost({ setOpen, setCurrentImage }: CreatePostProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleOpen = () => setOpen(true);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setCurrentImage(result);
        setTimeout(() => setOpen(true), 0);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <Card
        sx={{
          width: "100%",
          maxWidth: 600,
          mt: 6,
          borderRadius: 1,

          backgroundColor: "#fff",
        }}
      >
        <CardContent sx={{ p: 2 }}>
          <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
            <Avatar
              alt="Rusty Mendoza"
              src="/static/images/avatar/1.jpg"
              sx={{ width: 48, height: 48 }}
            />
            <Button
              onClick={handleOpen}
              variant="outlined"
              fullWidth
              sx={{
                justifyContent: "flex-start",
                textTransform: "none",
                pl: 2,
                pr: 2,
                py: 1.2,
                borderRadius: "30px",
                borderColor: grey[300],
                color: grey[600],
                backgroundColor: grey[100],
                fontWeight: 500,
                "&:hover": {
                  backgroundColor: grey[200],
                  borderColor: grey[400],
                },
              }}
            >
              What's on your mind?
            </Button>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Stack direction="row" spacing={4} justifyContent="center">
            <Tooltip title="Photo/Video" arrow>
              <IconButton onClick={handleImageClick} sx={{ color: "#1877f2" }}>
                <ImageIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Emoji" arrow>
              <IconButton onClick={handleOpen} sx={{ color: "#f7b928" }}>
                <InsertEmoticonIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Feeling/Activity" arrow>
              <IconButton sx={{ color: "#45bd62" }}>
                <EmojiEmotionsIcon />
              </IconButton>
            </Tooltip>
          </Stack>

          {/* Hidden file input */}
          <input
            type="file"
            accept="image/*"
            hidden
            ref={fileInputRef}
            onChange={(e) => {
              handleFileChange(e);
              e.target.value = "";
            }}
          />
        </CardContent>
      </Card>
    </Box>
  );
}

export default CreatePost;
