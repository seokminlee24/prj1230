import { Box, Flex, HStack, Textarea } from "@chakra-ui/react";
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
              value={newInquireComment}
              onChange={(e) => setNewInquireComment(e.target.value)}
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
                onEditClick(inquireComment.inquireCommentId, newInquireComment);
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

export function InquireCommentItem({
  inquireComment,
  onDeleteClick,
  onEditClick,
}) {
  const { hasAccess } = useContext(AuthenticationContext);
  return (
    <HStack border={"1px solid black"} m={5}>
      <Box flex={1}>
        <Flex justify={"space-between"}>
          <h3>{inquireComment.memberId}</h3>
          <h4>{inquireComment.inserted.replace("T", " ")}</h4>
        </Flex>
        <p>{inquireComment.inquireComment}</p>
      </Box>
      {hasAccess(inquireComment.memberId) && (
        <Box>
          <EditButton inquireComment={inquireComment} onEditClick={onEditClick}>
            수정
          </EditButton>
          <DeleteButton
            onClick={() => onDeleteClick(inquireComment.inquireCommentId)}
          >
            삭제
          </DeleteButton>
        </Box>
      )}
    </HStack>
  );
}
