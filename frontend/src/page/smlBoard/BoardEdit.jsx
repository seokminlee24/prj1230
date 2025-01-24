import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Heading,
  Input,
  Spinner,
  Stack,
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

export function BoardEdit() {
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

  return (
    <Box>
      <Heading>참여글 수정</Heading>
      <Stack gap={5}>
        <Field label={"제목"}>
          <Input
            value={board.boardTitle}
            onChange={(e) => setBoard({ ...board, boardTitle: e.target.value })}
          />
        </Field>
        <Field label={"본문"}>
          <Textarea
            value={board.boardContent}
            onChange={(e) =>
              setBoard({ ...board, boardContent: e.target.value })
            }
          />
        </Field>
        <Field label={"장소"}>
          <Input
            value={board.boardPlace}
            onChange={(e) => setBoard({ ...board, boardPlace: e.target.value })}
          />
        </Field>
        <Box>
          <DialogRoot
            open={dialogOpen}
            onOpenChange={(e) => setDialogOpen(e.open)}
          >
            <DialogTrigger asChild>
              <Button colorPalette={"cyan"} variant={"outline"}>
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
                  <Button variant={"outline"}>취소</Button>
                </DialogActionTrigger>
                <Button
                  loading={progress}
                  colorPalette={"blue"}
                  onClick={handleSaveClick}
                >
                  저장
                </Button>
              </DialogFooter>
            </DialogContent>
          </DialogRoot>
        </Box>
      </Stack>
    </Box>
  );
}
