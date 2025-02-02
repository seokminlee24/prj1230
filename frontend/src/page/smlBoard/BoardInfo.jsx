import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Heading,
  HStack,
  Input,
  Spinner,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
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
import { BoardCommentContainer } from "../../components/boardComment/BoardCommentContainer.jsx";

export function BoardInfo() {
  const { id, isAdmin, login } = useContext(AuthenticationContext);
  const { boardId } = useParams();
  const [board, setBoard] = useState(null);
  const [join, setJoin] = useState({ join: false, count: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/api/board/boardInfo/${boardId}`)
      .then((res) => setBoard(res.data));
  }, []);

  const handleDeleteClick = () => {
    axios
      .delete(`/api/board/delete/${boardId}`)
      .then((res) => res.data)
      .then((data) => {
        toaster.create({
          type: data.message.type,
          description: data.message.text,
        });
        navigate("/board/boardList");
      })
      .catch((e) => {
        const data = e.response.data;
        toaster.create({
          type: data.message.type,
          description: data.message.text,
        });
      });
  };

  useEffect(() => {
    axios
      .get(`/api/board/like/${boardId}`)
      .then((res) => res.data)
      .then((data) => setJoin(data));
  }, []);

  if (board === null) {
    return <Spinner />;
  }

  const handleJoinClick = () => {
    axios
      .post("/api/board/join", {
        boardId: boardId,
      })
      .then((res) => res.data)
      .then((data) => setJoin(data))
      .catch()
      .finally();
  };

  // 본인 또는 관리자 여부 확인
  const canEditOrDelete = isAdmin || id === board.memberId;

  return (
    <Box
      p={6}
      maxW="900px"
      margin="auto"
      borderRadius="lg"
      bg="white"
      boxShadow="lg"
    >
      {/* 게시물 제목과 작성자 및 작성일시 */}
      <HStack justify="space-between" mb={5}>
        <Box>
          <Heading size="lg" fontWeight="bold" color="gray.800">
            {board.boardTitle}
          </Heading>
          <HStack justify="start" spacing={2}>
            <Text fontSize="sm" color="gray.600">
              작성자: {board.boardWriter}
            </Text>
            <Text fontSize="sm" color="gray.600">
              |
            </Text>
            <Text fontSize="sm" color="gray.600">
              닐찌: {new Date(board.inserted).toLocaleDateString()}
            </Text>
          </HStack>
        </Box>

        {/* 참가 버튼과 참여자 수 */}
        <HStack spacing={4}>
          {id && (
            <Button
              onClick={handleJoinClick}
              colorScheme={join.join ? "red" : "blue"}
              _hover={{ bg: join.join ? "red.600" : "blue.600" }}
              px={6}
            >
              {join.join ? "참가취소" : "참가"}
            </Button>
          )}
          <Text fontSize="sm" color="gray.600">
            참여자 수: {join.count}
          </Text>
        </HStack>
      </HStack>
      <hr />
      <Stack spacing={5} mt={4}>
        {/* 내용 */}
        <Field label={"내용"} readOnly>
          <Textarea
            value={board.boardContent}
            isReadOnly
            border="2px solid #e2e8f0"
            borderRadius="md"
            padding={3}
            _focus={{ borderColor: "blue.400" }}
            resize="vertical"
          />
        </Field>

        {/* 장소 */}
        <Field label={"장소"} readOnly>
          <Input
            value={board.boardPlace}
            isReadOnly
            border="2px solid #e2e8f0"
            borderRadius="md"
            padding={3}
            _focus={{ borderColor: "blue.400" }}
          />
        </Field>

        {/* 수정 및 삭제 버튼 */}
        {canEditOrDelete && (
          <Box display="flex" justifyContent="center" gap={4}>
            <DialogRoot>
              <DialogTrigger asChild>
                <Button colorScheme="red" variant="outline" size="sm">
                  삭제
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>삭제 확인</DialogHeader>
                <DialogBody>
                  <Text>{board.boardId}번 게시글을 삭제하시겠습니까?</Text>
                </DialogBody>
                <DialogFooter>
                  <DialogActionTrigger>
                    <Button variant="outline" size="sm">
                      취소
                    </Button>
                  </DialogActionTrigger>
                  <Button
                    colorScheme="red"
                    size="sm"
                    onClick={handleDeleteClick}
                  >
                    삭제
                  </Button>
                </DialogFooter>
              </DialogContent>
            </DialogRoot>

            <Button
              colorScheme="cyan"
              onClick={() => navigate(`/board/boardEdit/${boardId}`)}
              size="sm"
            >
              수정
            </Button>
          </Box>
        )}
      </Stack>

      <hr style={{ marginTop: "20px", marginBottom: "20px" }} />

      {/* 댓글 컴포넌트 */}
      <BoardCommentContainer boardId={board.boardId} />
    </Box>
  );
}
