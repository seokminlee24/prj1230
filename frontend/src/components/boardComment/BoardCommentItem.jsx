import { Box, Flex, HStack, Text, Textarea } from "@chakra-ui/react";
import { Button } from "../ui/button.jsx";
import { useContext, useState } from "react";
import { AuthenticationContext } from "../context/AuthenticationProvider.jsx";
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

function DeleteButton({ onClick }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <DialogRoot open={open} onOpenChange={(e) => setOpen(e.open)}>
        <DialogTrigger asChild>
          <Button colorPalette={"red"}>삭제</Button>
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
              <Button variant={"outline"}>취소</Button>
            </DialogActionTrigger>
            <Button colorPalette={"red"} onClick={onClick}>
              삭제
            </Button>
          </DialogFooter>
        </DialogContent>
      </DialogRoot>
    </>
  );
}

function EditButton({ boardComment, onEditClick }) {
  const [open, setOpen] = useState(false);
  const [newComment, setNewComment] = useState(boardComment.boardComment);
  return (
    <>
      <DialogRoot open={open} onOpenChange={(e) => setOpen(e.open)}>
        <DialogTrigger asChild>
          <Button colorPalette={"purple"}>수정</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>댓글 수정</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <Textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="댓글을 수정하세요"
            />
          </DialogBody>
          <DialogFooter>
            <DialogActionTrigger>
              <Button variant={"outline"}>취소</Button>
            </DialogActionTrigger>
            <Button
              colorPalette={"purple"}
              onClick={() => {
                setOpen(false);
                onEditClick(boardComment.boardCommentId, newComment);
              }}
            >
              수정
            </Button>
          </DialogFooter>
        </DialogContent>
      </DialogRoot>
    </>
  );
}

export function BoardCommentItem({ boardComment, onDeleteClick, onEditClick }) {
  const { isAdmin, hasAccess, id } = useContext(AuthenticationContext);

  return (
    <HStack
      border={"1px solid #e2e8f0"}
      borderRadius={"md"}
      p={4}
      m={3}
      bg={"white"}
      boxShadow={"md"}
      spacing={4}
      alignItems={"start"}
    >
      <Box flex={1}>
        <Flex justify={"space-between"} alignItems={"center"}>
          <Text fontWeight={"bold"}>{boardComment.nickname}</Text>
          <Text fontSize={"sm"} color={"gray.500"}>
            {boardComment.inserted.replace("T", " ")}
          </Text>
        </Flex>
        <hr />
        <Box mt={2} css={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
          {boardComment.boardComment}
        </Box>
        {(boardComment.memberId === id || isAdmin) && (
          <Box mt={2}>
            <Flex justify={"flex-end"} spacing={3}>
              <HStack spacing={3}>
                <EditButton
                  boardComment={boardComment}
                  onEditClick={onEditClick}
                />
                <DeleteButton
                  onClick={() => onDeleteClick(boardComment.boardCommentId)}
                />
              </HStack>
            </Flex>
          </Box>
        )}
      </Box>
    </HStack>
  );
}
