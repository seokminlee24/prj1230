import { Box, Flex, Text, Textarea } from "@chakra-ui/react";
import { Button } from "../ui/button.jsx";
import {
  DialogActionTrigger,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog.jsx";
import { AuthenticationContext } from "../context/AuthenticationProvider.jsx";
import { useContext, useState } from "react";

function EditButton({ inquireComment, onEditClick }) {
  const [open, setOpen] = useState(false);
  const [newInquireComment, setNewInquireComment] = useState(
    inquireComment.inquireComment,
  );

  return (
    <DialogRoot open={open} onOpenChange={(e) => setOpen(e.open)}>
      <DialogTrigger asChild>
        <Button colorPalette="purple" size="sm">
          수정
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>댓글 수정</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Textarea
            value={newInquireComment}
            onChange={(e) => setNewInquireComment(e.target.value)}
          />
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger>
            <Button variant="outline">취소</Button>
          </DialogActionTrigger>
          <Button
            colorPalette="purple"
            onClick={() => {
              setOpen(false);
              onEditClick(inquireComment.inquireCommentId, newInquireComment);
            }}
          >
            수정
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
}

function DeleteButton({ onClick }) {
  const [open, setOpen] = useState(false);
  return (
    <DialogRoot open={open} onOpenChange={(e) => setOpen(e.open)}>
      <DialogTrigger asChild>
        <Button colorPalette="red" size="sm">
          삭제
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>삭제 확인</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Text>댓글을 삭제하시겠습니까?</Text>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger>
            <Button variant="outline">취소</Button>
          </DialogActionTrigger>
          <Button colorPalette="red" onClick={onClick}>
            삭제
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
}

export function InquireCommentItem({
  inquireComment,
  onDeleteClick,
  onEditClick,
}) {
  const { isAdmin } = useContext(AuthenticationContext);
  return (
    <Box
      border="1px solid #ddd"
      borderRadius="8px"
      boxShadow="sm"
      p={4}
      m={3}
      bg="white"
    >
      <Flex justify="space-between" align="center" mb={2}>
        <Text fontWeight="bold">{inquireComment.nickname}</Text>
        <Text fontSize="sm" color="gray.500">
          {inquireComment.inserted.replace("T", " ")}
        </Text>
      </Flex>
      <Box whiteSpace="pre-wrap" p={2} bg="gray.50" borderRadius="md">
        {inquireComment.inquireComment}
      </Box>
      {isAdmin && (
        <Flex justify="flex-end" mt={3} gap={2}>
          <EditButton
            inquireComment={inquireComment}
            onEditClick={onEditClick}
          />
          <DeleteButton
            onClick={() => onDeleteClick(inquireComment.inquireCommentId)}
          />
        </Flex>
      )}
    </Box>
  );
}
