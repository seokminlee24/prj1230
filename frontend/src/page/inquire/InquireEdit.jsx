import { useParams } from "react-router-dom";
import {
  Box,
  Heading,
  Input,
  Spinner,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Field } from "../../components/ui/field.jsx";
import { Button } from "../../components/ui/button.jsx";
import {
  DialogActionTrigger,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTrigger,
} from "../../components/ui/dialog.jsx";

export function InquireEdit() {
  const [inquire, setInquire] = useState(null);
  const { inquireId } = useParams();

  useEffect(() => {
    axios.get(`/api/inquire/${inquireId}`).then((res) => setInquire(res.data));
  }, []);

  const handleSaveClick = () => {
    axios.put("/api/inquire/inquireUpdate", inquire);
  };

  if (inquire === null) {
    return <Spinner />;
  }

  return (
    <Box>
      <Heading>{inquireId}번 문의글 수정</Heading>
      <Stack gap={5}>
        <Field label={"문의 유형"}>
          <select
            value={inquire.inquireCategory}
            onChange={(e) => {
              setInquire({ ...inquire, inquireCategory: e.target.value });
            }}
            style={{
              marginLeft: "-9px",
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #CBD5E0",
            }}
          >
            <option value="all"> 문의 유형 선택</option>
            <option value="declaration"> 신고</option>
            <option value="utilization"> 이용 안내</option>
            <option value="account"> 계정 문의</option>
            <option value="Other"> 기타 문의</option>
          </select>
        </Field>
        <Field label={"제목"}>
          <Input
            value={inquire.inquireTitle}
            onChange={(e) =>
              setInquire({ ...inquire, inquireTitle: e.target.value })
            }
          />
        </Field>
        <Field label={"문의 내용"}>
          <Textarea
            value={inquire.inquireContent}
            onChange={(e) =>
              setInquire({ ...inquire, inquireContent: e.target.value })
            }
          />
        </Field>
        <Box>
          <DialogRoot>
            <DialogTrigger asChild>
              <Button colorPalette={"cyan"} variant={"outline"}>
                저장
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>저장 확인</DialogHeader>
              <DialogBody>
                <p>{inquireId}번 문의글 수정하시겠습니까?</p>
              </DialogBody>
              <DialogFooter>
                <DialogActionTrigger>
                  <Button variant={"outline"}>취소</Button>
                </DialogActionTrigger>
                <Button colorPalette={"blue"} onClick={handleSaveClick}>
                  저장
                </Button>
              </DialogFooter>
            </DialogContent>
          </DialogRoot>
        </Box>
      </Stack>
    </Box>
  );
}
