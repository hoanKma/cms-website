import { atomFamily } from 'recoil';

export const fileListAtom = atomFamily({
  key: 'FILE_LIST_ATOM',
  default: []
});

export const fileListDeletedAtom = atomFamily({
  key: 'FILE_LIST_DELETED_ATOM',
  default: []
});

export const fileListRejectAtom = atomFamily({
  key: 'FILE_LIST_REJECT_ATOM',
  default: []
});

export const countChangeAtom = atomFamily({
  key: 'COUNT_CHANGE_ATOM',
  default: 0
});
