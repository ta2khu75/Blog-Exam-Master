package ta2khu75.com.webquiz.service;

import org.springframework.web.multipart.MultipartFile;

public interface CrudFileService <D, T, E>{
    E create(T request, MultipartFile file);
    E update(D id,T request, MultipartFile file);
    E read(D id);
    void delete(D id);
}