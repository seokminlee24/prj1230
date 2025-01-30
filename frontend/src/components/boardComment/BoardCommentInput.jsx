import { Box, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { Button } from "../ui/button.jsx";

export function BoardCommentInput({ boardId }) {
  const [boardComment, setBoardComment] = useState("");

  function handleSaveClick() {
    axios
      .post("/api/boardComment/boardCommentAdd", {
        boardId: boardId,
        boardComment,
      })
      .then()
      .catch()
      .finally();
  }

  return (
    <Box>
      <Textarea
        value={boardComment}
        onChange={(e) => setBoardComment(e.target.value)}
      />
      <Button onClick={handleSaveClick}>댓글 쓰기</Button>
    </Box>
  );
}
