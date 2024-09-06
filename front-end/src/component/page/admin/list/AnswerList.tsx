import { useEffect, useState } from "react";
import { Button, Checkbox, Radio, Space } from "antd";
import { toast } from "react-toastify";
import AnswerService from "../../../../service/AnswerService";
import ModalElement from "../../../element/ModalElement";
import PopoverActionElement from "../../../element/PopoverActionElement";
import AnswerForm from "../../../element/form/AnswerForm";
type Props = {
  quizResponse: QuizResponse;
};
const AnswerList = ({ quizResponse }: Props) => {
  const [answerResponseList, setAnswerResponseList] = useState<
    AnswerResponse[]
  >([]);
  const [open, setOpen] = useState(false);
  const [answerResponse, setAnswerResponse] = useState<AnswerResponse>();
  useEffect(() => {
    fetchAnswerByQuizId();
  }, []);
  const fetchAnswerByQuizId = () => {
    AnswerService.readByQuizId(quizResponse.id).then((d) => {
      setAnswerResponseList(d.data);
      setOpen(false);
    });
  };
  const handleDeleteClick = (data: AnswerResponse) => {
    AnswerService.delete(data.id).then((d) => {
      if (d.success) {
        toast.success("Successfully to delete");
        fetchAnswerByQuizId();
      } else {
        toast.error(d.message_error);
      }
    });
  };
  const handleEditClick = (data: AnswerResponse) => {
    setOpen(true);
    setAnswerResponse(data);
  };
  const handleAddClick = () => {
    setOpen(true);
    setAnswerResponse(undefined);
  };
  return (
    <>
      {quizResponse.quiz_type == "SINGLE_CHOICE" && (
        <Radio.Group value={true}>
          <Space direction="vertical">
            {answerResponseList.map((answer) => (
              <PopoverActionElement
                title="Action Answer"
                key={`popover-radio-${answer.id}`}
                data={answer}
                handleDeleteClick={handleDeleteClick}
                handleEditClick={handleEditClick}
              >
                <Radio
                  disabled
                  className="d-block"
                  defaultChecked={answer.correct}
                  value={answer.correct}
                >
                  {answer.answer}
                </Radio>
              </PopoverActionElement>
            ))}
          </Space>
        </Radio.Group>
      )}
      {quizResponse.quiz_type == "MULTIPLE_CHOICE" && (
        <Space direction="vertical">
          {answerResponseList.map((answer) => (
            <PopoverActionElement
              key={`popover-radio-${answer.id}`}
              data={answer}
              handleDeleteClick={handleDeleteClick}
              handleEditClick={handleEditClick}
              title="Action Answer"
            >
              <Checkbox disabled checked={answer.correct} value={answer.id}>
                {answer.answer}
              </Checkbox>
            </PopoverActionElement>
          ))}
        </Space>
      )}
      <Button className="d-block" onClick={() => handleAddClick()}>
        Add Answer
      </Button>
      <ModalElement open={open} handleCancel={() => setOpen(false)}>
        <AnswerForm
          answerResponse={answerResponse}
          quizResponse={quizResponse}
          refresh={fetchAnswerByQuizId}
        />
      </ModalElement>
    </>
  );
};

export default AnswerList;
