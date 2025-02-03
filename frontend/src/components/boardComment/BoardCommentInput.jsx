import { Box, Flex, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import { Button } from "../ui/button.jsx";

export function BoardCommentInput({ boardId, onSaveClick }) {
  const [boardComment, setBoardComment] = useState("");

  return (
    <Box my={4}>
      <Flex direction="row" align="stretch" spacing={4}>
        <Textarea
          value={boardComment}
          onChange={(e) => setBoardComment(e.target.value)}
          placeholder="댓글을 입력하세요"
          size="sm"
          borderColor="gray.300"
          focusBorderColor="purple.500"
          flex="1" // Textarea가 남은 공간을 차지하게 함
          height="100px" // 텍스트 영역의 높이를 기본으로 지정
          marginRight={0} // 버튼과 딱 붙게 하기 위해 마진을 0으로 설정
          resize="vertical" // 텍스트 영역 크기 조정 가능
        />
        <Button
          colorPalette={"purple"}
          onClick={() => {
            setBoardComment("");
            onSaveClick(boardComment);
          }}
          isDisabled={!boardComment.trim()} // 댓글이 비어있는 경우 비활성화
          height="auto" // 버튼 높이를 자동으로 텍스트 영역과 맞춤
          ml={0} // 텍스트 영역과 버튼 사이의 마진을 0으로 설정
          p="0 12px" // 버튼 안쪽 패딩 설정 (가로)
        >
          댓글 쓰기
        </Button>
      </Flex>
    </Box>
  );
}
