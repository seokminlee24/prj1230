package com.example.backend.service.smlBoard;

import com.example.backend.mapper.smlBoard.SmlBoardMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class SmlBoardService {
    final SmlBoardMapper mapper;
}
