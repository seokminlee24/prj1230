package com.example.backend.service.inquire;

import com.example.backend.mapper.inquire.InquireMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class InquireService {
    InquireMapper mapper;
}
