import { atom } from 'recoil';

export const imagesListAtom = atom({
  key: 'imagesListAtom_Blog',
  default: ''
});

export const hasDescriptionAtom = atom({
  key: 'hasDescriptionAtom_Blog',
  default: false
});

export const hasTitleAtom = atom({
  key: 'hasTitleAtom_Blog',
  default: false
});

export const hasContentAtom = atom({
  key: 'hasContentAtom_Blog',
  default: false
});

export const hasCategoryAtom = atom({
  key: 'hasCategoryAtom_Blog',
  default: false
});

export const errorImageAtom = atom({
  key: 'errorImageAtom_Blog',
  default: false
});

export const errorTitleAtom = atom({
  key: 'errorTitleAtom_Blog',
  default: false
});

export const errorContentAtom = atom({
  key: 'errorContentAtom_Blog',
  default: false
});

export const imagesHTMlListAtom = atom({
  key: 'imagesHTMLListAtom_Blog',
  default: []
});

export const currentSubjectCreateAtom = atom({
  key: 'currentSubjectCreateAtom',
  default: undefined
});

export const correctAnswerAtom = atom({
  key: 'correctAnswerAtom',
  default: 1
});
