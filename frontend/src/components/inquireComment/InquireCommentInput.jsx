import { useContext, useState } from "react";
import { Box, Flex, Textarea } from "@chakra-ui/react";
import { Button } from "../ui/button.jsx";
import { AuthenticationContext } from "../context/AuthenticationProvider.jsx";

export function InquireCommentInput({ inquireId, onSaveClick }) {
  const [inquireComment, setInquireComment] = useState("");
  const { isAuthenticated, isAdmin } = useContext(AuthenticationContext);

  if (!isAdmin) {
    return null; // 관리자가 아닐 경우 컴포넌트 렌더링하지 않음
  }

  return (
    <Box>
      <Flex alignItems="stretch">
        <Textarea
          flex="1"
          resize="vertical" // 세로로 크기 조정 가능하게 설정
          value={inquireComment}
          disabled={!isAuthenticated}
          placeholder={isAuthenticated ? "" : "로그인 후 댓글을 남겨주세요."}
          borderRadius="md 0 0 md"
          onChange={(e) => setInquireComment(e.target.value)}
        />
        <Button
          flex="0 1 auto" // 버튼의 크기를 유동적으로 설정
          h="auto" // 버튼 높이를 자동으로 맞춤
          disabled={!isAuthenticated}
          onClick={() => {
            setInquireComment("");
            onSaveClick(inquireComment);
          }}
          borderRadius="0 md md 0"
        >
          문의 댓글 쓰기
        </Button>
      </Flex>
    </Box>
  );
}
