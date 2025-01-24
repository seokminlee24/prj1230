import { useParams } from "react-router-dom";
import {
  Box,
  Heading,
  Input,
  Spinner,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Field } from "../../components/ui/field.jsx";

export function BoardInfo() {
  const { boardId } = useParams();
  const [board, setBoard] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/board/boardInfo/${boardId}`)
      .then((res) => setBoard(res.data));
  }, []);

  if (board === null) {
    return <Spinner />;
  }

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
      </Stack>
    </Box>
  );
}
