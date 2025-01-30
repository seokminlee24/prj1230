import { Box, Heading, Stack } from "@chakra-ui/react";
import { BoardCommentInput } from "./BoardCommentInput.jsx";
import { BoardCommentList } from "./BoardCommentList.jsx";
import { useEffect, useState } from "react";
import axios from "axios";

export function BoardCommentContainer({ boardId }) {
  const [boardCommentList, setBoardCommentList] = useState([]);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (!processing) {
      axios
        .get(`/api/boardComment/boardCommentList/${boardId}`)
        .then((res) => res.data)
        .then((data) => setBoardCommentList(data));
    }
  }, [processing]);

  function handleSaveClick(boardComment) {
    setProcessing(true);
    axios
      .post("/api/boardComment/boardCommentAdd", {
        boardId: boardId,
        boardComment: boardComment,
      })
      .then()
      .catch()
      .finally(() => {
        setProcessing(false);
      });
  }

  function handleDeleteClick(boardCommentId) {
    setProcessing(true);
    axios.delete(`/api/boardComment/remove/${boardCommentId}`).finally(() => {
      setProcessing(false);
    });
  }

  return (
    <Box>
      <Stack gap={5}>
        <Heading>댓글</Heading>
        <BoardCommentInput boardId={boardId} onSaveClick={handleSaveClick} />
        <BoardCommentList
          boardId={boardId}
          boardCommentList={boardCommentList}
          onDeleteClick={handleDeleteClick}
        />
      </Stack>
    </Box>
  );
}
