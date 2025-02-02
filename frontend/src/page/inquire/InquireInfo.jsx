import {
  Box,
  Flex,
  Heading,
  Input,
  Spinner,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Field } from "../../components/ui/field.jsx";
import { Button } from "../../components/ui/button.jsx";
import { toaster } from "../../components/ui/toaster.jsx";
import {
  DialogActionTrigger,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTrigger,
} from "../../components/ui/dialog.jsx";
import { AuthenticationContext } from "../../components/context/AuthenticationProvider.jsx";
import { InquireCommentContainer } from "../../components/inquireComment/InquireCommentContainer.jsx";

export function InquireInfo() {
  const { id, isAdmin } = useContext(AuthenticationContext);
  const { inquireId } = useParams();
  const [inquire, setInquire] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/api/inquire/${inquireId}`).then((res) => {
      setInquire(res.data);
      console.log(res.data);
    });
  }, []);

  // 문의글 삭제
  function handleDeleteClick() {
    axios
      .delete(`/api/inquire/delete/${inquireId}`)
      .then((res) => res.data)
      .then((data) => {
        toaster.create({
          type: data.message.type,
          description: data.message.text,
        });
        navigate("/inquire/inquireList");
      })
      .catch((e) => {
        const data = e.response.data;
        toaster.create({
          type: data.message.type,
          description: data.message.text,
        });
      });
  }

  // 문의글 수정

  if (inquire == null) {
    return <Spinner />;
  }

  // 카테고리 매핑 설정
  const categoryMap = {
    all: "문의 유형 선택",
    declaration: "신고",
    utilization: "이용 안내",
    account: "계정 문의",
    Other: "기타 문의",
  };

  // 본인 또는 관리자 여부 확인
  const canEditOrDelete = isAdmin || id === inquire.memberId;

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Box width="500px" p={5} boxShadow="lg" borderRadius="md" bg="white">
        <Heading textAlign="center" mb={4}>
          문의 상세 보기
        </Heading>
        <Stack gap={5}>
          <Flex justify="space-between" align="center">
            <Text fontSize="md" fontWeight="bold" width="23%" ml={3}>
              문의 유형
            </Text>
            <Field readOnly>
              <Input
                value={categoryMap[inquire.inquireCategory]}
                width="100px"
                mr={4}
              />
            </Field>
          </Flex>
          <Flex justify="space-between" align="center">
            <Text fontSize="md" fontWeight="bold" width="23%" ml={3}>
              문의 제목
            </Text>
            <Field readOnly>
              <Input value={inquire.inquireTitle} />
            </Field>
          </Flex>
          <Flex justify="space-between" align="center">
            <Text fontSize="md" fontWeight="bold" width="23%" ml={3}>
              작성자
            </Text>
            <Field readOnly>
              <Input value={inquire.inquireWriter} />
            </Field>
          </Flex>
          <Flex justify="space-between" align="center">
            <Text fontSize="md" fontWeight="bold" width="23%" ml={3}>
              작성 일시
            </Text>
            <Field readOnly>
              <Input value={inquire.inserted} type="datetime-local" />
            </Field>
          </Flex>
          <Flex justify="space-between" align="center">
            <Text fontSize="md" fontWeight="bold" width="23%" ml={3}>
              작성 일시
            </Text>
            <Field readOnly>
              <Textarea value={inquire.inquireContent} />
            </Field>
          </Flex>
        </Stack>
        {canEditOrDelete && (
          <Box mt={4} display="flex" justifyContent="space-between" w="100%">
            <DialogRoot>
              <DialogTrigger asChild>
                <Button colorPalette="red" variant="outline" minW="100px">
                  삭제
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>삭제 확인</DialogHeader>
                <DialogBody>
                  <p>{inquire.inquireId}번 삭제하시겠습니까?</p>
                </DialogBody>
                <DialogFooter>
                  <DialogActionTrigger>
                    <Button variant="outline">취소</Button>
                  </DialogActionTrigger>
                  <Button colorPalette="red" onClick={handleDeleteClick}>
                    삭제
                  </Button>
                </DialogFooter>
              </DialogContent>
            </DialogRoot>
            <Button
              colorPalette="cyan"
              minW="100px"
              onClick={() => navigate(`/inquire/inquireEdit/${inquireId}`)}
            >
              수정
            </Button>
          </Box>
        )}
        <hr style={{ margin: "20px 0" }} />
        <InquireCommentContainer inquireId={inquire.inquireId} />
      </Box>
    </Box>
  );
}
