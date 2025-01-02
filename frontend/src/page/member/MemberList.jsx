import { Box, Table } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";

export function MemberList() {
  const [memberList, setMemberList] = useState([]);

  useEffect(() => {
    // 회원목록 요청
    axios.get("/api/member/list").then((res) => setMemberList(res.data));
  }, []);

  return (
    <Box>
      <h3>회원 목록</h3>

      <Table.Root interactive>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader textAlign="center">ID</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="center">닉네임</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="center">
              가입 날짜
            </Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {memberList.map((member) => (
            <Table.Row key={member.memberId}>
              <Table.Cell textAlign="center">{member.memberId}</Table.Cell>
              <Table.Cell textAlign="center">{member.nickname}</Table.Cell>
              <Table.Cell textAlign="center">
                {member.inserted.replace(/-/g, ".").replace("T", " ")}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
}
