import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Flex,
  Heading,
  Input,
  Spinner,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import axios from "axios";
import { Field } from "../../components/ui/field.jsx";
import { Button } from "../../components/ui/button.jsx";
import { toaster } from "../../components/ui/toaster.jsx";
import {
  DialogActionTrigger,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTrigger,
} from "../../components/ui/dialog.jsx";
import { AuthenticationContext } from "../../components/context/AuthenticationProvider.jsx";

export function BoardEdit() {
  const { id, isAdmin } = useContext(AuthenticationContext);
  const [board, setBoard] = useState(null);
  const [progress, setProgress] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const { boardId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/api/board/boardInfo/${boardId}`)
      .then((res) => setBoard(res.data));
  }, []);

  const handleSaveClick = () => {
    setProgress(true);
    axios
      .put("/api/board/boardUpdate", board)
      .then((res) => res.data)
      .then((data) => {
        toaster.create({
          type: data.message.type,
          description: data.message.text,
        });
        navigate(`/board/boardInfo/${board.boardId}`);
      })
      .catch((e) => {
        const message = e.response.data.message;
        toaster.create({
          type: message.type,
          description: message.text,
        });
      })
      .finally(() => {
        setProgress(false);
        setDialogOpen(false);
      });
  };

  if (board === null) {
    return <Spinner />;
  }

  // 본인 또는 관리자 여부 확인
  const canEdit = isAdmin || id === board.memberId;

  const disabled = !(
    board.boardTitle.trim().length > 0 &&
    board.boardContent.trim().length > 0 &&
    board.boardPlace.trim().length > 0
  );

  return (
    <Box
      maxWidth="800px"
      mx="auto"
      p={8}
      boxShadow="lg"
      borderRadius="lg"
      bg="white"
    >
      <Heading textAlign="center" mb={5}>
        참여글 수정
      </Heading>
      <Stack gap={6}>
        <hr />
        <Field>
          <Flex justify="space-between" align="center" w={"100%"}>
            <Text fontSize="md" fontWeight="bold" width="10%" ml={3}>
              제목
            </Text>
            <Input
              size="lg"
              value={board.boardTitle}
              onChange={(e) =>
                setBoard({ ...board, boardTitle: e.target.value })
              }
            />
          </Flex>
        </Field>
        <Field>
          <Flex justify="space-between" align="center" w={"100%"}>
            <Text fontSize="md" fontWeight="bold" width="10%" ml={3}>
              본문
            </Text>
            <Textarea
              size="lg"
              height="200px"
              value={board.boardContent}
              onChange={(e) =>
                setBoard({ ...board, boardContent: e.target.value })
              }
            />
          </Flex>
        </Field>
        <Field>
          <Flex justify="space-between" align="center" w={"100%"}>
            <Text fontSize="md" fontWeight="bold" width="10%" ml={3}>
              장소
            </Text>
            <Input
              size="lg"
              value={board.boardPlace}
              onChange={(e) =>
                setBoard({ ...board, boardPlace: e.target.value })
              }
            />
          </Flex>
        </Field>
        {canEdit && (
          <Box textAlign="center">
            <DialogRoot
              open={dialogOpen}
              onOpenChange={(e) => setDialogOpen(e.open)}
            >
              <DialogTrigger asChild>
                <Button
                  w={"75%"}
                  disabled={disabled}
                  colorPalette="cyan"
                  variant="outline"
                >
                  저장
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>저장 확인</DialogHeader>
                <DialogBody>
                  <p>{boardId}번 문의글 수정하시겠습니까?</p>
                </DialogBody>
                <DialogFooter>
                  <DialogActionTrigger>
                    <Button variant="outline">취소</Button>
                  </DialogActionTrigger>
                  <Button
                    loading={progress}
                    colorPalette="blue"
                    onClick={handleSaveClick}
                  >
                    저장
                  </Button>
                </DialogFooter>
              </DialogContent>
            </DialogRoot>
          </Box>
        )}
      </Stack>
    </Box>
  );
}
