import { Box, Heading, Stack } from "@chakra-ui/react";
import { InquireCommentInput } from "./InquireCommentInput.jsx";
import { InquireCommentList } from "./InquireCommentList.jsx";
import axios from "axios";
import { useEffect, useState } from "react";

export function InquireCommentContainer({ inquireId }) {
  const [inquireCommentList, setInquireCommentList] = useState([]);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (!processing) {
      axios
        .get(`/api/inquireComment/inquireList/${inquireId}`)
        .then((res) => res.data)
        .then((data) => setInquireCommentList(data));
    }
  }, [processing]);

  function handleSaveClick(inquireComment) {
    setProcessing(true);
    axios
      .post("/api/inquireComment/inquireCommentAdd", {
        inquireId: inquireId,
        inquireComment: inquireComment,
      })
      .finally(() => {
        setProcessing(false);
      });
  }

  function handleDeleteClick(inquireCommentId) {
    setProcessing(true);
    axios
      .delete(`/api/inquireComment/inquireCommentIdRemove/${inquireCommentId}`)
      .finally(() => {
        setProcessing(false);
      });
  }

  return (
    <Box>
      <Stack gap={5}>
        <Heading>문의글 답변</Heading>
        <InquireCommentInput
          inquireId={inquireId}
          onSaveClick={handleSaveClick}
        />
        <InquireCommentList
          inquireId={inquireId}
          inquireCommentList={inquireCommentList}
          onDeleteClick={handleDeleteClick}
        />
      </Stack>
    </Box>
  );
}
