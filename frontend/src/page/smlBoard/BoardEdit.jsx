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
    axios.put("/api/board/boardUpdate", board);
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
          <Textarea
            value={board.boardPlace}
            onChange={(e) => setBoard({ ...board, boardPlace: e.target.value })}
          />
        </Field>
        <Box>
          <Button onClick={handleSaveClick}>저장</Button>
        </Box>
      </Stack>
    </Box>
  );
}
