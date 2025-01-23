import { useState } from "react";
import { Box, Heading, Input, Stack, Textarea } from "@chakra-ui/react";
import axios from "axios";
import { Field } from "../../components/ui/field.jsx";
import { Button } from "../../components/ui/button.jsx";
import { toaster } from "../../components/ui/toaster.jsx";
import { useNavigate } from "react-router-dom";

export function BoardAdd() {
  const [boardTitle, setBoardTitle] = useState("");
  const [boardContent, setBoardContent] = useState("");
  const [boardPlace, setBoardPlace] = useState("");
  const [boardWriter, setBoardWriter] = useState("");
  const [progress, setProgress] = useState(false);
  const navigate = useNavigate();

  const handleSaveClick = () => {
    setProgress(true);
    axios
      .post("/api/board/boardAdd", {
        boardTitle,
        boardContent,
        boardPlace,
      })
      .then((res) => res.data)
      .then((data) => {
        const message = data.message;
        toaster.create({
          description: message.text,
          type: message.type,
        });
      })
      .catch((e) => {
        const message = e.response.data.message;
        toaster.create({
          description: message.text,
          type: message.type,
        });
      })
      .finally(() => {
        setProgress(false);
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
          <Button loading={progress} onClick={handleSaveClick}>
            저장
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}
