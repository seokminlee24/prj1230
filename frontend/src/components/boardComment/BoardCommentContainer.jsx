import { Box, Heading, Stack } from "@chakra-ui/react";
import { BoardCommentInput } from "./BoardCommentInput.jsx";
import { BoardCommentList } from "./BoardCommentList.jsx";

export function BoardCommentContainer({ boardId }) {
  return (
    <Box>
      <Stack gap={5}>
        <Heading>댓글</Heading>
        <BoardCommentInput boardId={boardId} />
        <BoardCommentList />
      </Stack>
    </Box>
  );
}
