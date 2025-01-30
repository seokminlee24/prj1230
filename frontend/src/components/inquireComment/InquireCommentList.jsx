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
      {inquireCommentList && inquireCommentList.length > 0 ? (
        inquireCommentList.map((inquireComment) => (
          <InquireCommentItem
            key={inquireComment.inquireCommentId}
            inquireComment={inquireComment}
            onDeleteClick={onDeleteClick}
            onEditClick={onEditClick}
          />
        ))
      ) : (
        <Box>아직 관리자가 답변하지 않았습니다.</Box>
      )}
    </Box>
  );
}
