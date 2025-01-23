import { useState } from "react";
import { Box, Heading } from "@chakra-ui/react";

export function BoardAdd() {
  const [boardTitle, setBoardTitle] = useState("");
  const [boardContent, setBoardContent] = useState("");
  const [boardPlace, setBoardPlace] = useState("");
  const [boardWriter, setBoardWriter] = useState("");

  return (
    <Box>
      <Heading>게시판 글 작성</Heading>
    </Box>
  );
}
