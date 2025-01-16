import { useState } from "react";
import axios from "axios";
import { Box, Group, Textarea } from "@chakra-ui/react";
import { Button } from "../ui/button.jsx";

export function InquireCommentInput({ inquireId }) {
  const [inquireContent, setInquireContent] = useState("");

  function handleClick() {
    axios
      .post("/api/inquireComment/inquireCommentAdd", {
        inquireId: inquireId,
        inquireContent,
      })
      .then()
      .catch()
      .then();
  }

  return (
    <Box>
      <Group>
        <Textarea
          value={inquireContent}
          onChange={(e) => setInquireContent(e.target.value)}
        />
        <Button onClick={handleClick}>문의 댓글 쓰기</Button>
      </Group>
    </Box>
  );
}
