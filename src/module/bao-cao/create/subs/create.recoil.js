import { atom } from 'recoil';

export const hasTitleAtom = atom({
  key: 'REPORT_CREATE_HAS_TITLE_ATOM',
  default: false
});

export const hasFileAtom = atom({
  key: 'REPORT_CREATE_HAS_FILE_ATOM',
  default: false
});

export const hasImageAtom = atom({
  key: 'REPORT_CREATE_HAS_IMAGE_ATOM',
  default: false
});

export const hasDateAtom = atom({
  key: 'REPORT_CREATE_HAS_DATE_ATOM',
  default: false
});

export const disableSubmitAtom = atom({
  key: 'REPORT_CREATE_DISABLE_SUBMIT_ATOM',
  default: false
});
