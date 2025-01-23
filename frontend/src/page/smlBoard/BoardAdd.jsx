import { useState } from "react";
import { Box, Heading, Input, Stack, Textarea } from "@chakra-ui/react";
import axios from "axios";
import { Field } from "../../components/ui/field.jsx";
import { Button } from "../../components/ui/button.jsx";

export function BoardAdd() {
  const [boardTitle, setBoardTitle] = useState("");
  const [boardContent, setBoardContent] = useState("");
  const [boardPlace, setBoardPlace] = useState("");
  const [boardWriter, setBoardWriter] = useState("");

  const handleSaveClick = () => {
    axios.post("/api/board/boardAdd", {
      boardTitle,
      boardContent,
      boardPlace,
    });
  };

  return (
    <Box>
      <Heading>게시판 글 작성</Heading>
      <Stack gap={5}>
        <Field label={"제목"}>
          <Input
            value={boardTitle}
            onChange={(e) => setBoardTitle(e.target.value)}
          />
        </Field>
        <Field label={"본문"}>
          <Textarea
            value={boardContent}
            onChange={(e) => setBoardContent(e.target.value)}
          />
        </Field>
        <Field label={"장소"}>
          <Input
            value={boardPlace}
            onChange={(e) => setBoardPlace(e.target.value)}
          />
        </Field>
        <Box>
          <Button onClick={handleSaveClick}>저장</Button>
        </Box>
      </Stack>
    </Box>
  );
}
