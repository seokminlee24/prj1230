package com.example.backend.service.inquire;

import com.example.backend.dto.inquire.Inquire;
import com.example.backend.mapper.inquire.InquireMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;

@Service
@Transactional
@RequiredArgsConstructor
public class InquireService {
    final InquireMapper mapper;

    public boolean inquireAdd(Inquire inquire) {
        int cnt = mapper.insert(inquire);
        return cnt == 1;
    }

    public Map<String, Object> inquireList(Integer page) {
        //mapper.selectInquireAll();
        mapper.selectInquirePage((page - 1) * 10);
        return Map.of("inquireList", mapper.selectInquirePage((page - 1) * 10), "count", mapper.inquireCountAll());
    }

    public Inquire getInquire(Integer inquireId) {
        return mapper.selectByInquireId(inquireId);
    }

    public boolean validate(Inquire inquire) {
        boolean inquireTitle = inquire.getInquireTitle().trim().length() > 0;
        boolean inquireContent = inquire.getInquireContent().trim().length() > 0;

        return inquireTitle && inquireContent;
    }

    public boolean inquireRemove(int inquireId) {
        int cnt = mapper.inquireDeleteByInquireId(inquireId);
        return cnt == 1;
    }

    public boolean inquireUpdate(Inquire inquire) {
        int cnt = mapper.inquireUpdate(inquire);
        return cnt == 1;
    }
}
