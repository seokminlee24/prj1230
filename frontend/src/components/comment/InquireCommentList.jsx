import { useEffect, useState } from "react";
import axios from "axios";
import { Box } from "@chakra-ui/react";
import { InquireCommentItem } from "./InquireCommentItem.jsx";

export function InquireCommentList({ inquireId }) {
  const [inquireCommentList, setInquireCommentList] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/inquireComment/inquireList/${inquireId}`)
      .then((res) => res.data)
      .then((data) => setInquireCommentList(data));
  }, []);

  return (
    <Box>
      {inquireCommentList.map((inquireComment) => (
        <InquireCommentItem
          key={inquireComment.inquireId}
          inquireComment={inquireComment}
        />
      ))}
    </Box>
  );
}
