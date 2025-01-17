import { Box, Heading, Stack } from "@chakra-ui/react";
import { InquireCommentInput } from "./InquireCommentInput.jsx";
import { InquireCommentList } from "./InquireCommentList.jsx";
import axios from "axios";
import { useEffect, useState } from "react";

export function InquireCommentContainer({ inquireId }) {
  const [inquireCommentList, setInquireCommentList] = useState([]);

  function handleSaveClick(inquireComment) {
    axios
      .post("/api/inquireComment/inquireCommentAdd", {
        inquireId: inquireId,
        inquireComment: inquireComment,
      })
      .then()
      .catch()
      .then();
  }

  useEffect(() => {
    axios
      .get(`/api/inquireComment/inquireList/${inquireId}`)
      .then((res) => res.data)
      .then((data) => setInquireCommentList(data));
  }, []);

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
        />
      </Stack>
    </Box>
  );
}
