package ta2khu75.com.webquiz.service.impl;

import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import ta2khu75.com.webquiz.entity.Exam;
import ta2khu75.com.webquiz.entity.request.ExamRequest;
import ta2khu75.com.webquiz.entity.response.ExamResponse;
import ta2khu75.com.webquiz.enviroment.FolderEnvironment;
import ta2khu75.com.webquiz.exception.NotFoundException;
import ta2khu75.com.webquiz.mapper.ExamMapper;
import ta2khu75.com.webquiz.repository.ExamRepository;
import ta2khu75.com.webquiz.service.CloudinaryService;
import ta2khu75.com.webquiz.service.ExamService;

import java.io.IOException;
import java.util.Map;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ExamServiceImpl implements ExamService {
    ExamRepository repository;
    ExamMapper mapper;
    CloudinaryService cloudinaryService;
    @Override
    public ExamResponse create(@Valid ExamRequest examRequest, MultipartFile file) throws IOException {
        Exam exam=mapper.toEntity(examRequest);
        Map map=cloudinaryService.uploadFile(file, FolderEnvironment.EXAM_FOLDER);
        exam.setImagePath((String) map.get("url"));
        repository.save(exam);
        return mapper.toResponse(repository.save(exam));
    }
    @Override
    public ExamResponse update(Long id, @Valid ExamRequest examRequest, MultipartFile file) throws IOException {
        Exam exam=repository.findById(id).orElseThrow(()->new NotFoundException("Could not found exam with id: "+id));
        mapper.update(examRequest,exam);
        if(file!=null && file.isEmpty()){
            Map map=cloudinaryService.uploadFile(file, FolderEnvironment.EXAM_FOLDER);
            exam.setImagePath((String) map.get("url"));
        }
        return mapper.toResponse(repository.save(exam));
    }
    @Override
    public ExamResponse read(Long id) {
        Exam exam=repository.findById(id).orElseThrow(()->new NotFoundException("Could not found exam with id: "+id));
        return mapper.toResponse(exam);
    }

    @Override
    public void delete(Long id) {
        repository.deleteById(id);
    }

    @Override
    public Page<ExamResponse> readPage(Pageable pageable) {
        return repository.findAll(pageable).map((exam)->mapper.toResponse(exam));
    }
}
