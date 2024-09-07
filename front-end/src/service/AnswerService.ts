import instance from "../util/apiInstance";
const basePath = "answer";
export default class AnswerService{
    static create(data:AnswerRequest):Promise<ApiResponse<AnswerResponse>>{
        return instance.post(basePath, data);
    }
    static update(id:number, data:AnswerRequest):Promise<ApiResponse<AnswerResponse>>{
        return instance.put(`${basePath}/${id}`, data);
    }
    static delete(id:number):Promise<ApiResponse<AnswerResponse>>{
        return instance.delete(`${basePath}/${id}`);
    }
    static readByQuizId(id:number):Promise<ApiResponse<AnswerResponse[]>>{
        return instance.get(`${basePath}/quiz/${id}`);
    }
}