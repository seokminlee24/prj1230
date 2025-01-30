import { Box, Flex, HStack } from "@chakra-ui/react";
import { Button } from "../ui/button.jsx";

export function BoardCommentItem({ boardComment, onDeleteClick }) {
  return (
    <HStack border={"1px solid black"} m={5}>
      <Box flex={1}>
        <Flex justify={"space-between"}>
          <h3>{boardComment.nickname}</h3>
          <h4>{boardComment.inserted.replace("T", " ")}</h4>
        </Flex>
        <p>{boardComment.boardComment}</p>
      </Box>
      <Box>
        <Button colorPalette={"purple"}>수정</Button>
        <Button
          colorPalette={"red"}
          onClick={() => onDeleteClick(boardComment.boardCommentId)}
        >
          삭제
        </Button>
      </Box>
    </HStack>
  );
}
