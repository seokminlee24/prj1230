import { Box, Flex } from "@chakra-ui/react";

export function BoardCommentItem({ boardComment }) {
  return (
    <Box boarder={"1px solid black"} m={5}>
      <Flex justify={"space-between"}>
        <h3>{boardComment.nickname}</h3>
        <h4>{boardComment.inserted.replace("T", " ")}</h4>
      </Flex>
      <p>{boardComment.boardComment}</p>
    </Box>
  );
}
