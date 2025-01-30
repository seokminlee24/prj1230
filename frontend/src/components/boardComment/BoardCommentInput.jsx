import { Box, Group, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import { Button } from "../ui/button.jsx";

export function BoardCommentInput({ boardId, onSaveClick }) {
  const [boardComment, setBoardComment] = useState("");

  return (
    <Box>
      <Group>
        <Textarea
          value={boardComment}
          onChange={(e) => setBoardComment(e.target.value)}
        />
        <Button
          onClick={() => {
            setBoardComment("");
            onSaveClick(boardComment);
          }}
        >
          댓글 쓰기
        </Button>
      </Group>
    </Box>
  );
}
