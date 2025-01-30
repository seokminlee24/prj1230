import { Box } from "@chakra-ui/react";
import { BoardCommentItem } from "./BoardCommentItem.jsx";

export function BoardCommentList({ boardId, boardCommentList }) {
  return (
    <Box>
      {boardCommentList.map((boardComment) => (
        <BoardCommentItem
          key={boardComment.boardCommentId}
          boardComment={boardComment}
        />
      ))}
    </Box>
  );
}
