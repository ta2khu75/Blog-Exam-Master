import instance from "../util/apiInstance";
const basePath = "comment";
export class CommentService {
    static read(id: string): Promise<ApiResponse<CommentResponse>> {
        return instance.get(`${basePath}/${id}`);
    }
    static create(comment: CommentRequest, file?: File): Promise<ApiResponse<CommentResponse>> {
        const form = new FormData();
        if (file) {
            form.append("image", file)
        }
        form.append("blog", JSON.stringify(comment));
        return instance.post(basePath, form);
    }
    static update(id: string, comment: CommentRequest, file?: File): Promise<ApiResponse<CommentResponse>> {
        const form = new FormData();
        if (file) {
            form.append("image", file)
        }
        form.append("blog", JSON.stringify(comment));
        return instance.post(`${basePath}/${id}`, form);
    }
    static delete(id: string): Promise<ApiResponse<void>> {
        return instance.delete(`${basePath}/${id}`);
    }
}