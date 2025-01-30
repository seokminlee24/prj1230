import { Box } from "@chakra-ui/react";
import { BoardCommentItem } from "./BoardCommentItem.jsx";

export function BoardCommentList({
  boardId,
  boardCommentList,
  onDeleteClick,
  onEditClick,
}) {
  return (
    <Box>
      {boardCommentList.map((boardComment) => (
        <BoardCommentItem
          key={boardComment.boardCommentId}
          boardComment={boardComment}
          onDeleteClick={onDeleteClick}
          onEditClick={onEditClick}
        />
      ))}
    </Box>
  );
}
