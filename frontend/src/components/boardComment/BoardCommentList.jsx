import { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import axios from "axios";
import { BoardCommentItem } from "./BoardCommentItem.jsx";

export function BoardCommentList({ boardId }) {
  const [boardCommentList, setBoardCommentList] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/boardComment/boardCommentList/${boardId}`)
      .then((res) => res.data)
      .then((data) => setBoardCommentList(data));
  }, []);

  return (
    <Box>
      {boardCommentList.map((boardComment) => (
        <BoardCommentItem
          key={boardComment.inquireCommentId}
          boardComment={boardComment}
        />
      ))}
    </Box>
  );
}
