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
            <TableRow key={inquire.inquireId}>
              <TableCell textAlign="center">{inquire.inquireId}</TableCell>
              <TableCell textAlign="center">{inquire.inquireTitle}</TableCell>
              <TableCell textAlign="center">{inquire.inquireWriter}</TableCell>
              <TableCell textAlign="center">
                {inquire.inquireCategory}
              </TableCell>
              <TableCell textAlign="center">{inquire.inserted}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TableRoot>
    </Box>
  );
}
