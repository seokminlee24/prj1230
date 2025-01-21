import { Box, HStack, Table } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "../../components/ui/pagination.jsx";

export function MemberList() {
  const [memberList, setMemberList] = useState([]);
  const [count, setCount] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();
    // 회원목록 요청
    axios
      .get("/api/member/list", {
        params: searchParams,
        signal: controller.signal,
      })
      .then((res) => res.data)
      .then((data) => {
        setMemberList(data.list);
        setCount(data.count);
      });
    return () => {
      controller.abort();
    };
  }, [searchParams]);

  // page 번호
  const pageParam = searchParams.get("page") ? searchParams.get("page") : "1";
  const page = Number(pageParam);

  function handleRowClick(memberId) {
    navigate(`/member/${memberId}`);
  }

  function handlePageChange(e) {
    console.log(e.page);
    const nextSearchParams = new URLSearchParams(searchParams);
    nextSearchParams.set("page", e.page);
    setSearchParams(nextSearchParams);
  }

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
          {memberList.length === 0 ? (
            <Table.Row>
              <Table.Cell colSpan={3} textAlign="center">
                회원 가입자들이 없습니다.
              </Table.Cell>
            </Table.Row>
          ) : (
            memberList.map((member) => (
              <Table.Row
                onClick={() => handleRowClick(member.memberId)}
                key={member.memberId}
              >
                <Table.Cell textAlign="center">{member.memberId}</Table.Cell>
                <Table.Cell textAlign="center">{member.nickname}</Table.Cell>
                <Table.Cell textAlign="center">
                  {member.inserted.replace("T", " ")}
                </Table.Cell>
              </Table.Row>
            ))
          )}
        </Table.Body>
      </Table.Root>
      <Box display="flex" justifyContent="center" alignItems="center" mt={4}>
        <PaginationRoot
          onPageChange={handlePageChange}
          count={count}
          pageSize={10}
          page={page}
        >
          <HStack>
            <PaginationPrevTrigger />
            <PaginationItems />
            <PaginationNextTrigger />
          </HStack>
        </PaginationRoot>
      </Box>
    </Box>
  );
}
