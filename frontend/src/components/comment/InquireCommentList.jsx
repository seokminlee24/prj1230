import { Box } from "@chakra-ui/react";
import { InquireCommentItem } from "./InquireCommentItem.jsx";

export function InquireCommentList({
  inquireId,
  inquireCommentList,
  onDeleteClick,
  onEditClick,
}) {
  return (
    <Box>
      {inquireCommentList.map((inquireComment) => (
        <InquireCommentItem
          key={inquireComment.inquireCommentId}
          inquireComment={inquireComment}
          onDeleteClick={onDeleteClick}
          onEditClick={onEditClick}
        />
      ))}
    </Box>
  );
}
