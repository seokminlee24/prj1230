import { Box, Flex, HStack } from "@chakra-ui/react";
import { Button } from "../ui/button.jsx";

export function InquireCommentItem({ inquireComment, onDeleteClick }) {
  return (
    <HStack border={"1px solid black"} m={5}>
      <Box flex={1}>
        <Flex justify={"space-between"}>
          <h3>{inquireComment.memberId}</h3>
          <h4>{inquireComment.inserted.replace("T", " ")}</h4>
        </Flex>
        <p>{inquireComment.inquireComment}</p>
      </Box>
      <Box>
        <Button colorPalette={"purple"}>수정</Button>
        <Button
          colorPalette={"red"}
          onClick={() => onDeleteClick(inquireComment.inquireCommentId)}
        >
          삭제
        </Button>
      </Box>
    </HStack>
  );
}
