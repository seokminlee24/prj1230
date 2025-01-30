import { Box, Heading, Stack } from "@chakra-ui/react";
import { InquireCommentInput } from "./InquireCommentInput.jsx";
import { InquireCommentList } from "./InquireCommentList.jsx";
import axios from "axios";
import { useEffect, useState } from "react";
import { toaster } from "../ui/toaster.jsx";

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
      .then((res) => res.data.message)
      .then((message) => {
        toaster.create({
          type: message.type,
          description: message.text,
        });
      })
      .finally(() => {
        setProcessing(false);
      });
  }

  function handleDeleteClick(inquireCommentId) {
    setProcessing(true);
    axios
      .delete(`/api/inquireComment/inquireCommentIdRemove/${inquireCommentId}`)
      .then((res) => res.data.message)
      .then((message) => {
        toaster.create({
          type: message.type,
          description: message.text,
        });
      })
      .finally(() => {
        setProcessing(false);
      });
  }

  function handleEditClick(inquireCommentId, inquireComment) {
    setProcessing(true);

    axios
      .put(`/api/inquireComment/inquireCommentEdit`, {
        inquireCommentId,
        inquireComment,
      })
      .then((res) => res.data.message)
      .then((message) => {
        toaster.create({
          type: message.type,
          description: message.text,
        });
      })
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
          onEditClick={handleEditClick}
        />
      </Stack>
    </Box>
  );
}
