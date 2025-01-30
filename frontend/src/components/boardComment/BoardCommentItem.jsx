import { Box, Flex, HStack, Textarea } from "@chakra-ui/react";
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
            <p>댓글을 삭제하시겠습니까?</p>
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
    <HStack border={"1px solid black"} m={5}>
      <Box flex={1}>
        <Flex justify={"space-between"}>
          <h3>{boardComment.nickname}</h3>
          <h4>{boardComment.inserted.replace("T", " ")}</h4>
        </Flex>
        <p>{boardComment.boardComment}</p>
      </Box>
      {(boardComment.memberId === id || isAdmin) && (
        <Box>
          <EditButton boardComment={boardComment} onEditClick={onEditClick}>
            수정
          </EditButton>
          <DeleteButton
            onClick={() => onDeleteClick(boardComment.boardCommentId)}
          >
            삭제
          </DeleteButton>
        </Box>
      )}
    </HStack>
  );
}
