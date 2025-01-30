import { useContext, useState } from "react";
import { Box, Group, Textarea } from "@chakra-ui/react";
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
      <Group>
        <Textarea
          value={inquireComment}
          disabled={!isAuthenticated}
          placeholder={isAuthenticated ? "" : "로그인 후 댓글을 남겨주세요."}
          onChange={(e) => setInquireComment(e.target.value)}
        />
        <Button
          disabled={!isAuthenticated}
          onClick={() => {
            setInquireComment("");
            onSaveClick(inquireComment);
          }}
        >
          문의 댓글 쓰기
        </Button>
      </Group>
    </Box>
  );
}
