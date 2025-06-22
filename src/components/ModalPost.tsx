import React, { useRef, useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Divider,
  Button,
  Stack,
  IconButton,
} from "@mui/material";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import ImageIcon from "@mui/icons-material/Image";
import EmojiPicker from "emoji-picker-react";
import type { EmojiClickData } from "emoji-picker-react";

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 3,
  p: 3,
};

type UploadModalProps = {
  open: boolean;
  handleClose: () => void;
  post?: string[];
  setPost?: React.Dispatch<React.SetStateAction<string[]>>;
  imageData?: string | null;
  setImageData?: React.Dispatch<React.SetStateAction<string | null>>;
};

export default function ModalPost({
  open,
  handleClose,
  setPost,
  imageData,
  setImageData,
}: UploadModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const [text, setText] = useState<string>("");
  const [image, setImage] = useState<string | null>(imageData || null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  // Update local image state when parent passes imageData
  useEffect(() => {
    if (imageData) {
      setImage(imageData);
    }
  }, [imageData]);

  const handleSubmit = () => {
    if (setPost && text.trim()) {
      setPost((prev) => [...prev, text]);
      setText("");
      setImage(null);
      setImageData?.(null);
      handleClose();
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImage(result);
        setImageData?.(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEmojiSelect = (emojiData: EmojiClickData) => {
    const cursorPos = textRef.current?.selectionStart || text.length;
    const newText =
      text.slice(0, cursorPos) + emojiData.emoji + text.slice(cursorPos);
    setText(newText);
    setShowEmojiPicker(false);

    setTimeout(() => {
      textRef.current?.focus();
      if (textRef.current) {
        textRef.current.selectionStart = cursorPos + emojiData.emoji.length;
        textRef.current.selectionEnd = cursorPos + emojiData.emoji.length;
      }
    }, 0);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6" fontWeight="bold" mb={1}>
          Create a Post
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <TextField
          placeholder="What's on your mind?"
          value={text}
          onChange={(e) => setText(e.target.value)}
          multiline
          inputRef={textRef}
          variant="outlined"
          rows={6}
          fullWidth
          InputProps={{
            sx: {
              borderRadius: 2,
              backgroundColor: "#f9f9f9",
              "& fieldset": { border: "none" },
              "&:hover": {
                backgroundColor: "#f5f5f5",
              },
            },
          }}
        />

        {image && (
          <Box mt={2}>
            <img
              src={image}
              alt="Preview"
              style={{ maxWidth: "100%", borderRadius: 8 }}
            />
          </Box>
        )}

        <Stack direction="row" alignItems="center" spacing={1} mt={2}>
          <IconButton
            onClick={() => fileInputRef.current?.click()}
            color="primary"
          >
            <ImageIcon />
          </IconButton>
          <input
            type="file"
            hidden
            ref={fileInputRef}
            accept="image/*"
            onChange={(e) => {
              handleImageChange(e);
              e.target.value = "";
            }}
          />
          <IconButton onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
            <InsertEmoticonIcon />
          </IconButton>
        </Stack>

        {showEmojiPicker && (
          <Box mt={2} sx={{ zIndex: 999 }}>
            <EmojiPicker
              onEmojiClick={(emoji) => handleEmojiSelect(emoji)}
              width="100%"
              height={300}
            />
          </Box>
        )}

        <Stack direction="row" spacing={2} justifyContent="flex-end" mt={3}>
          <Button
            onClick={handleClose}
            variant="outlined"
            color="secondary"
            sx={{ textTransform: "none", borderRadius: 2, px: 3 }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={!text.trim()}
            sx={{
              textTransform: "none",
              borderRadius: 2,
              px: 3,
              backgroundColor: "#1976d2",
              ":hover": {
                backgroundColor: "#155fa0",
              },
            }}
          >
            Post
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}
