import { Box, Heading, Table } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";

export function BoardList() {
  const [boardList, setBoardList] = useState([]);

  useEffect(() => {
    axios
      .get("/api/board/boardList")
      .then((res) => res.data)
      .then((data) => setBoardList(data));
  }, []);
  return (
    <Box>
      <Heading>참여글 리스트</Heading>
      <Table.Root interactive>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader textAlign="center">번호</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="center">제목</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="center">작성자</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="center">작성일시</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {boardList.map((board) => (
            <Table.Row key={board.boardId}>
              <Table.Cell textAlign="center">{board.boardId}</Table.Cell>
              <Table.Cell textAlign="center">{board.boardTitle}</Table.Cell>
              <Table.Cell textAlign="center">{board.boardWriter}</Table.Cell>
              <Table.Cell textAlign="center">
                {board.inserted.replace("T", " ")}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
}
