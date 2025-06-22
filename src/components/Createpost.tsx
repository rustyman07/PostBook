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
} from "@mui/material";
import { grey } from "@mui/material/colors";
import ImageIcon from "@mui/icons-material/Image";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";

type CreatePostProps = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;

  setFeelingOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setImageData: React.Dispatch<React.SetStateAction<string | null>>;
};

function CreatePost({
  setOpen,
  setFeelingOpen,
  setImageData,
}: CreatePostProps) {
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
        setImageData(result);

        // Force modal open AFTER state sets
        setTimeout(() => setOpen(true), 0);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Card
        sx={{
          maxWidth: "600px",
          width: "60%",
          margin: "50px auto",
        }}
      >
        <CardContent
          sx={{
            p: 2,
            "&:last-child": {
              paddingBottom: 2,
            },
          }}
        >
          <Box sx={{ display: "flex", gap: 1 }}>
            <Avatar alt="User" src="/static/images/avatar/1.jpg" />
            <Button
              onClick={handleOpen}
              sx={{
                width: "100%",
                borderRadius: "9999px",
                borderColor: grey[300],
                color: grey[600],
                "&:hover": {
                  borderColor: grey[400],
                  backgroundColor: grey[100],
                  color: grey[700],
                },
              }}
              variant="outlined"
              size="medium"
            >
              Create a post
            </Button>
          </Box>

          <Box mt={2}>
            <Divider sx={{ mb: 1 }} />
            <Stack direction="row" spacing={2} justifyContent="center">
              <Tooltip title="Photo/Video">
                <IconButton onClick={handleImageClick}>
                  <ImageIcon color="primary" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Emoji">
                <IconButton onClick={handleOpen}>
                  <InsertEmoticonIcon color="warning" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Feeling/Activity">
                <IconButton onClick={() => setFeelingOpen(true)}>
                  <EmojiEmotionsIcon color="success" />
                </IconButton>
              </Tooltip>
            </Stack>
          </Box>

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
