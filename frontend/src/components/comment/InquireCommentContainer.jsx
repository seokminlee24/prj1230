import { Box, Heading, Stack } from "@chakra-ui/react";
import { InquireCommentInput } from "./InquireCommentInput.jsx";
import { InquireCommentList } from "./InquireCommentList.jsx";

export function InquireCommentContainer({ inquireId }) {
  return (
    <Box>
      <Stack gap={5}>
        <Heading>문의글 답변</Heading>
        <InquireCommentInput inquireId={inquireId} />
        <InquireCommentList />
      </Stack>
    </Box>
  );
}
