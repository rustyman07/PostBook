import { useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Avatar,
  Box,
  IconButton,
  Skeleton,
  Divider,
  TextField,
  InputAdornment,
  Tooltip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import GifBoxIcon from "@mui/icons-material/GifBox";
import ImageIcon from "@mui/icons-material/Image";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

type CardPostProps = {
  item?: string;
  userName?: string;
  userAvatar?: string;
  postTime?: string | Date;
  onRemove?: () => void;
  loading?: boolean;
  imageData?: string | null;
};

type Comment = {
  text: string;
  time: Date;
  avatar: string;
  username: string;
  likes?: number;
};

function CardPost({
  item,
  userName = "Rusty Mendoza",
  userAvatar = "https://i.pravatar.cc/150?img=3",
  postTime = new Date(),
  onRemove,
  loading = false,
  imageData,
}: CardPostProps) {
  const [expanded, setExpanded] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [commentInput, setCommentInput] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [likeCounts, setlikeCounts] = useState(0);
  const [liked, setLiked] = useState(false); // ← Added

  const maxLength = 50;
  const shouldTruncate = item && item.length > maxLength;
  const truncatedText = item?.slice(0, maxLength);

  const handleCommentSubmit = () => {
    if (commentInput.trim()) {
      setComments([
        ...comments,
        {
          text: commentInput.trim(),
          time: new Date(),
          avatar: `https://i.pravatar.cc/150?img=${Math.floor(
            Math.random() * 70 + 1
          )}`,
          username: "Commenter",
          likes: 0,
        },
      ]);
      setCommentInput("");
    }
  };
  const handlePostLike = () => {
    if (liked) {
      setLiked(false);
      setlikeCounts((prev) => prev - 1);
    } else {
      setLiked(true);
      setlikeCounts((prev) => prev + 1);
    }
  };
  const handleCommentLike = (index: number) => {
    setComments((prev) =>
      prev.map((c, i) =>
        i === index ? { ...c, likes: (c.likes || 0) + 1 } : c
      )
    );
  };

  const getFormattedPostTime = () => {
    const time = dayjs(postTime);
    const now = dayjs();
    const seconds = now.diff(time, "second");
    return seconds < 10 ? "Just now" : time.fromNow();
  };

  return (
    <Card
      sx={{
        maxWidth: 600,
        width: "100%",
        margin: "20px auto",
        position: "relative",
        wordBreak: "break-word",
      }}
    >
      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", px: 2, pt: 1 }}>
        {loading ? (
          <Skeleton variant="circular" width={40} height={40} />
        ) : (
          <Avatar src={userAvatar} alt={userName} />
        )}
        <Box sx={{ ml: 2, flex: 1 }}>
          {loading ? (
            <>
              <Skeleton width="80%" height={18} />
              <Skeleton width="40%" height={14} />
            </>
          ) : (
            <>
              <Typography variant="subtitle1" fontWeight="bold">
                {userName}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {getFormattedPostTime()}
              </Typography>
            </>
          )}
        </Box>
        {!loading && (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton aria-label="more options" sx={{ color: "grey.600" }}>
              <MoreHorizIcon fontSize="small" />
            </IconButton>
            <IconButton
              aria-label="remove"
              onClick={onRemove}
              sx={{ color: "grey.600", ml: 0.5 }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
        )}
      </Box>

      {/* Content */}
      <CardContent>
        {loading ? (
          <>
            <Skeleton width="50%" height={28} sx={{ mb: 1 }} />
            <Skeleton width="100%" height={18} />
            <Skeleton width="95%" height={18} />
          </>
        ) : (
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              whiteSpace: "pre-wrap",
              overflowWrap: "break-word",
            }}
          >
            {!expanded && shouldTruncate ? (
              <>
                {truncatedText}
                {"... "}
                <Box
                  component="span"
                  onClick={() => setExpanded(true)}
                  sx={{
                    color: "primary.main",
                    cursor: "pointer",
                    fontWeight: 500,
                    fontSize: "0.875rem",
                    display: "inline",
                  }}
                >
                  See more
                </Box>
              </>
            ) : (
              <>
                {item}
                {shouldTruncate && (
                  <Box
                    component="span"
                    onClick={() => setExpanded(false)}
                    sx={{
                      color: "primary.main",
                      ml: 0.5,
                      cursor: "pointer",
                      fontWeight: 500,
                      fontSize: "0.875rem",
                      display: "inline",
                    }}
                  >
                    See less
                  </Box>
                )}
              </>
            )}
          </Typography>
        )}
      </CardContent>

      {/* Media */}
      {loading ? (
        <Skeleton
          variant="rectangular"
          height={200}
          sx={{ mx: 2, borderRadius: 1 }}
        />
      ) : imageData ? (
        <CardMedia
          component="img"
          image={imageData}
          alt="Uploaded Post"
          sx={{ maxHeight: 400, objectFit: "cover" }}
        />
      ) : null}

      {/* Like & Comment Counts */}
      {!loading && (
        <>
          <Box sx={{ px: 2, pt: 1, pb: 0.5 }}>
            <Typography variant="caption" color="text.secondary">
              {likeCounts} like{likeCounts !== 1 && "s"} • {comments.length}{" "}
              comment{comments.length !== 1 && "s"}
            </Typography>
          </Box>

          <Divider />

          {/* Action Icons */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              px: 2,
              py: 1,
            }}
          >
            <IconButton aria-label="like" onClick={handlePostLike}>
              {liked ? (
                <FavoriteIcon sx={{ color: "red" }} />
              ) : (
                <FavoriteBorderIcon />
              )}
            </IconButton>
            <IconButton
              aria-label="comment"
              onClick={() => setShowComments(!showComments)}
            >
              <ChatBubbleOutlineIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareOutlinedIcon />
            </IconButton>
          </Box>
        </>
      )}

      {/* Comment Section */}
      {showComments && !loading && (
        <Box sx={{ px: 2, pb: 2 }}>
          {/* Comment List */}
          {comments.length > 0 && (
            <Box sx={{ mt: 2 }}>
              {comments.map((comment, index) => (
                <Box key={index} sx={{ display: "flex", mt: 2 }}>
                  <Avatar src={comment.avatar} sx={{ mr: 1 }} />
                  <Box sx={{ flex: 1 }}>
                    <Box
                      sx={{
                        backgroundColor: "#f0f2f5",
                        borderRadius: 2,
                        px: 1.5,
                        py: 1,
                        display: "inline-block",
                      }}
                    >
                      <Typography fontWeight="bold" variant="body2">
                        {comment.username}
                      </Typography>
                      <Typography variant="body2">{comment.text}</Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        gap: 2,
                        pl: 1,
                        mt: 0.5,
                      }}
                    >
                      <Typography variant="caption" color="text.secondary">
                        {dayjs(comment.time).fromNow()}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ fontWeight: 500, cursor: "pointer" }}
                        onClick={() => handleCommentLike(index)}
                      >
                        Like{comment.likes ? ` (${comment.likes})` : ""}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ fontWeight: 500, cursor: "pointer" }}
                      >
                        Reply
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
          )}

          {/* Input */}
          <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
            <Avatar src={userAvatar} sx={{ mr: 1 }} />
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              placeholder="Write a comment..."
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Tooltip title="Emoji">
                      <IconButton size="small">
                        <InsertEmoticonIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="GIF">
                      <IconButton size="small">
                        <GifBoxIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Image">
                      <IconButton size="small">
                        <ImageIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </InputAdornment>
                ),
              }}
            />
            <IconButton
              onClick={handleCommentSubmit}
              sx={{ ml: 1 }}
              disabled={!commentInput.trim()}
            >
              <Typography fontWeight="bold" color="primary">
                ➤
              </Typography>
            </IconButton>
          </Box>
        </Box>
      )}
    </Card>
  );
}

export default CardPost;
