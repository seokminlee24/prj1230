import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Flex,
  Heading,
  HStack,
  Input,
  Spinner,
  Stack,
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
  const { id, isAdmin } = useContext(AuthenticationContext);
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
    <Box>
      <Heading>{boardId} 번 게시물 </Heading>
      <Stack gap={5}>
        <Field label={"제목"} readOnly>
          <Input value={board.boardTitle} />
        </Field>
        <Field label={"내용"} readOnly>
          <Textarea value={board.boardContent} />
        </Field>
        <Field label={"장소"} readOnly>
          <Input value={board.boardPlace} />
        </Field>
        <Field label={"작성자"} readOnly>
          <Input value={board.boardWriter} />
        </Field>
        <Field label={"작성일시"} readOnly>
          <Input type={"datetime-local"} readOnly value={board.inserted} />
        </Field>
        <Flex>
          <HStack>
            <Button
              onClick={handleJoinClick}
              colorPalette={join.join ? "red" : "blue"}
            >
              {join.join ? "참가취소" : "참가"}
            </Button>
            <Box>
              <Heading>{join.count}</Heading>
            </Box>
          </HStack>
        </Flex>
        {canEditOrDelete && (
          <Box>
            <DialogRoot>
              <DialogTrigger asChild>
                <Button colorPalette={"red"} variant={"outline"}>
                  삭제
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>삭제 확인</DialogHeader>
                <DialogBody>
                  <p>{board.boardId}번 삭제하시겠습니까?</p>
                </DialogBody>
                <DialogFooter>
                  <DialogActionTrigger>
                    <Button variant={"outline"}>취소</Button>
                  </DialogActionTrigger>
                  <Button colorPalette={"red"} onClick={handleDeleteClick}>
                    삭제
                  </Button>
                </DialogFooter>
              </DialogContent>
            </DialogRoot>

            <Button
              colorPalette={"cyan"}
              onClick={() => navigate(`/board/boardEdit/${boardId}`)}
            >
              수정
            </Button>
          </Box>
        )}
      </Stack>

      <hr />
      <BoardCommentContainer boardId={board.boardId} />
    </Box>
  );
}
