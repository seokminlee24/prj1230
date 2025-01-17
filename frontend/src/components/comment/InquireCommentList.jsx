import { Box } from "@chakra-ui/react";
import { InquireCommentItem } from "./InquireCommentItem.jsx";

export function InquireCommentList({
  inquireId,
  inquireCommentList,
  onDeleteClick,
}) {
  return (
    <Box>
      {inquireCommentList.map((inquireComment) => (
        <InquireCommentItem
          key={inquireComment.inquireId}
          inquireComment={inquireComment}
          onDeleteClick={onDeleteClick}
        />
      ))}
    </Box>
  );
}
