import { useState } from "react";
import { Box, Group, Textarea } from "@chakra-ui/react";
import { Button } from "../ui/button.jsx";

export function InquireCommentInput({ inquireId, onSaveClick }) {
  const [inquireComment, setInquireComment] = useState("");

  return (
    <Box>
      <Group>
        <Textarea
          value={inquireComment}
          onChange={(e) => setInquireComment(e.target.value)}
        />
        <Button onClick={() => onSaveClick(inquireComment)}>
          문의 댓글 쓰기
        </Button>
      </Group>
    </Box>
  );
}
