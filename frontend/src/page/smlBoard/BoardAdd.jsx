import { useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import axios from "axios";
import { Field } from "../../components/ui/field.jsx";
import { Button } from "../../components/ui/button.jsx";
import { toaster } from "../../components/ui/toaster.jsx";
import { useNavigate } from "react-router-dom";

export function BoardAdd() {
  const [boardTitle, setBoardTitle] = useState("");
  const [boardContent, setBoardContent] = useState("");
  const [boardPlace, setBoardPlace] = useState("");
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
        navigate("/board/boardList");
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

  const disabled = !(
    boardTitle.trim().length > 0 &&
    boardContent.trim().length > 0 &&
    boardPlace.trim().length > 0
  );

  return (
    <Box display="flex" justifyContent="center">
      <Box
        width="90%"
        maxWidth="600px"
        p={6}
        boxShadow="lg"
        borderRadius="lg"
        bg="white"
      >
        <Heading mb={4} textAlign="center">
          게시판 글 작성
        </Heading>

        <Stack gap={6}>
          <hr />
          <Field>
            <Flex justify="space-between" align="center" w="100%">
              <Text fontSize="md" fontWeight="bold" width="20%" ml={3}>
                제목
              </Text>
              <Input
                width="75%"
                value={boardTitle}
                onChange={(e) => setBoardTitle(e.target.value)}
              />
            </Flex>
          </Field>
          <Field>
            <Flex justify="space-between" align="center" w="100%">
              <Text fontSize="md" fontWeight="bold" width="20%" ml={3}>
                본문
              </Text>
              <Textarea
                width="75%"
                value={boardContent}
                onChange={(e) => setBoardContent(e.target.value)}
              />
            </Flex>
          </Field>
          <Field>
            <Flex justify="space-between" align="center" w="100%">
              <Text fontSize="md" fontWeight="bold" width="20%" ml={3}>
                장소
              </Text>
              <Input
                width="75%"
                value={boardPlace}
                onChange={(e) => setBoardPlace(e.target.value)}
              />
            </Flex>
          </Field>
          <Box textAlign="center">
            <Button
              disabled={disabled}
              loading={progress}
              onClick={handleSaveClick}
            >
              저장
            </Button>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}
