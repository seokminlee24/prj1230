import { useState } from "react";
import axios from "axios";
import { Box, Group, Textarea } from "@chakra-ui/react";
import { Button } from "../ui/button.jsx";

export function InquireCommentInput({ inquireId }) {
  const [inquireComment, setInquireComment] = useState("");

  function handleClick() {
    axios
      .post("/api/inquireComment/inquireCommentAdd", {
        inquireId: inquireId,
        inquireComment,
      })
      .then()
      .catch()
      .then();
  }

  return (
    <Box>
      <Group>
        <Textarea
          value={inquireComment}
          onChange={(e) => setInquireComment(e.target.value)}
        />
        <Button onClick={handleClick}>문의 댓글 쓰기</Button>
      </Group>
    </Box>
  );
}
