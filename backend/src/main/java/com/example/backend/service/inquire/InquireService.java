package com.example.backend.service.inquire;

import com.example.backend.dto.inquire.Inquire;
import com.example.backend.mapper.inquire.InquireMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class InquireService {
    final InquireMapper mapper;

    public void inquireAdd(Inquire inquire) {
        /*int cnt = mapper.insert(inquire);
        return cnt == 1;*/
        mapper.insert(inquire);
    }

    public List<Inquire> inquireList() {
        return mapper.selectInquireAll();
    }
}
