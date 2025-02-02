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
      <Box width="400px" p={5} boxShadow="md" borderRadius="md" bg="white">
        <Heading mb={3} textAlign="center">
          게시판 글 작성
        </Heading>

        <Stack gap={5}>
          <hr />
          <Field>
            <Flex justify="space-between" align="center" w={"100%"}>
              <Text fontSize="md" fontWeight="bold" width="23%" ml={3}>
                제목
              </Text>
              <Input
                value={boardTitle}
                onChange={(e) => setBoardTitle(e.target.value)}
              />
            </Flex>
          </Field>
          <Field>
            <Flex justify="space-between" align="center" w={"100%"}>
              <Text fontSize="md" fontWeight="bold" width="23%" ml={3}>
                본문
              </Text>
              <Textarea
                value={boardContent}
                onChange={(e) => setBoardContent(e.target.value)}
              />
            </Flex>
          </Field>
          <Field>
            <Flex justify="space-between" align="center" w={"100%"}>
              <Text fontSize="md" fontWeight="bold" width="23%" ml={3}>
                장소
              </Text>
              <Input
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
