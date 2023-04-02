import { atom } from 'recoil';

// Only used for <Banner>
export const BannerSliderPositionAtom = atom({
  key: 'BANNER_SLIDER_POSITION',
  default: 1
});

/**
 * Open/close the login popup.
 * Should not be directly used to open popup.
 * Use the function returned from useShowLoginPopup() instead.
 */
export const IsLoginPopupOpenAtom = atom({
  key: 'IsLoginPopupOpenAtom',
  default: false
});
