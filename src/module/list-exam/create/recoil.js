import { atom } from 'recoil';

export const currentSubjectCreateAtom = atom({
  key: 'currentSubjectCreateExamAtom',
  default: undefined
});

export const questionIdInCreateExamAtom = atom({
  key: 'questionIdInCreateExamAtomKey',
  default: []
});

export const questionIdInCreateExamAtomQueue = atom({
  key: 'questionIdInCreateExamAtomQueue',
  default: []
});
