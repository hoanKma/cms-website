import {
  Button,
  Flex,
  FormControl,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay
} from '@chakra-ui/react';
import FieldLabel from 'component/field-label';
import { memo, useMemo, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { subjectAtom } from 'state-management/subject';
import { currentSubjectCreateAtom, questionIdInCreateExamAtom, questionIdInCreateExamAtomQueue } from '../recoil';
import ChangeOrderQuestion from './change-order-question';
import ModalAddQuestion from './modal-add-question';

const CreateQuestion = () => {
  const subject = useRecoilValue(subjectAtom);

  const [questionIdInCreate, setQuestionIdInCreate] = useRecoilState(questionIdInCreateExamAtom);

  const currentSubjectCreate = useRecoilValue(currentSubjectCreateAtom);

  const questionIdInCreateExamQueue = useRecoilValue(questionIdInCreateExamAtomQueue);

  const subject123 = useMemo(
    () => subject.find((item) => item.id === currentSubjectCreate) || {},
    [currentSubjectCreate, subject]
  );

  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // xử lý khi submit form
    setQuestionIdInCreate((prev) => [...prev, ...questionIdInCreateExamQueue]);
    handleCloseModal();
  };

  return (
    <Flex flexDirection="column" my={5}>
      <FieldLabel title="Danh sách câu hỏi" isRequired />
      {questionIdInCreate.length < subject123?.questionNumber && (
        <Button my={5} onClick={handleOpenModal}>
          Thêm câu hỏi
        </Button>
      )}

      <Modal isOpen={isOpen} onClose={handleCloseModal} size={'xl'}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Thêm câu hỏi</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <ModalAddQuestion currentSubjectCreate={currentSubjectCreate} />
            </FormControl>
          </ModalBody>
          <Button type="submit" form="form" onClick={handleSubmit}>
            Thêm
          </Button>
        </ModalContent>
      </Modal>
      <form id="form" onSubmit={handleSubmit} />

      <ChangeOrderQuestion questionList={questionIdInCreate} />
    </Flex>
  );
};

export default memo(CreateQuestion);
