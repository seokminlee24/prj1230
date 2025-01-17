import { Box, Flex } from "@chakra-ui/react";

export function InquireCommentItem({ inquireComment }) {
  return (
    <Box boarder={"1px solid black"} m={5}>
      <Flex justify={"space-between"}>
        <h3>{inquireComment.memberId}</h3>
        <h4>{inquireComment.inserted.replace("T", " ")}</h4>
      </Flex>
      <p>{inquireComment.inquireComment}</p>
    </Box>
  );
}
