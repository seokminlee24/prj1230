import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Heading,
  TableBody,
  TableCell,
  TableColumnHeader,
  TableHeader,
  TableRoot,
  TableRow,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button.jsx";

export function InquireList() {
  const [inquireList, setInquireList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/inquire/inquireList")
      .then((res) => res.data)
      .then((data) => {
        setInquireList(data);
      });
  }, []);

  const handleGoInquireAdd = () => {
    navigate("/inquire/inquireAdd");
  };

  function handleRowClick(inquireId) {
    navigate(`/inquire/${inquireId}`);
  }

  // 카테고리 매핑 설정
  const categoryMap = {
    all: "문의 유형 선택",
    declaration: "신고",
    utilization: "이용 안내",
    account: "계정 문의",
    Other: "기타 문의",
  };

  return (
    <Box>
      <Heading>문의글 목록</Heading>
      <Button onClick={handleGoInquireAdd}>문의글 작성</Button>
      <TableRoot interactive>
        <TableHeader>
          <TableRow>
            <TableColumnHeader textAlign="center">번호</TableColumnHeader>
            <TableColumnHeader textAlign="center">제목</TableColumnHeader>
            <TableColumnHeader textAlign="center">작성자</TableColumnHeader>
            <TableColumnHeader textAlign="center">문의유형</TableColumnHeader>
            <TableColumnHeader textAlign="center">작성일시</TableColumnHeader>
          </TableRow>
        </TableHeader>
        <TableBody>
          {inquireList.map((inquire) => (
            <TableRow
              onClick={() => handleRowClick(inquire.inquireId)}
              key={inquire.inquireId}
            >
              <TableCell textAlign="center">{inquire.inquireId}</TableCell>
              <TableCell textAlign="center">{inquire.inquireTitle}</TableCell>
              <TableCell textAlign="center">{inquire.inquireWriter}</TableCell>
              <TableCell textAlign="center">
                {categoryMap[inquire.inquireCategory]}
              </TableCell>
              <TableCell textAlign="center">{inquire.inserted}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TableRoot>
    </Box>
  );
}
