import { Box } from "@chakra-ui/react";
import { BoardCommentItem } from "./BoardCommentItem.jsx";

export function BoardCommentList({ boardId, boardCommentList, onDeleteClick }) {
  return (
    <Box>
      {boardCommentList.map((boardComment) => (
        <BoardCommentItem
          key={boardComment.boardCommentId}
          boardComment={boardComment}
          onDeleteClick={onDeleteClick}
        />
      ))}
    </Box>
  );
}
