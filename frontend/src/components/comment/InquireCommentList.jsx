import { Box } from "@chakra-ui/react";
import { InquireCommentItem } from "./InquireCommentItem.jsx";

export function InquireCommentList({ inquireId, inquireCommentList }) {
  return (
    <Box>
      {inquireCommentList.map((inquireComment) => (
        <InquireCommentItem
          key={inquireComment.inquireId}
          inquireComment={inquireComment}
        />
      ))}
    </Box>
  );
}
