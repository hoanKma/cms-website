import { FaHome, FaImages, FaListAlt, FaThLarge } from 'react-icons/fa';

export const MENU_DATA = [
  {
    title: 'Trang chủ',
    icon: FaHome,
    route: '/'
  },

  {
    title: 'Tài khoản giáo viên',
    icon: FaThLarge,
    route: '/teacher-account'
  },

  {
    title: 'Chi tiết Tài khoản giáo viên',
    route: '/teacher-account/chi-tiet',
    hiddenMenu: true
  },

  {
    title: 'Tạo mới Tài khoản giáo viên',
    route: '/teacher-account/tao-moi',
    hiddenMenu: true
  },
  {
    title: 'Cập nhật Tài khoản giáo viên',
    route: '/teacher-account/cap-nhat',
    hiddenMenu: true
  },

  {
    title: 'Câu hỏi',
    icon: FaListAlt,
    route: '/cau-hoi'
  },

  {
    title: 'Chi tiết Câu hỏi',
    route: '/cau-hoi/chi-tiet',
    hiddenMenu: true
  },

  {
    title: 'Tạo mới Câu hỏi',
    route: '/cau-hoi/tao-moi',
    hiddenMenu: true
  },
  {
    title: 'Cập nhật Câu hỏi',
    route: '/cau-hoi/cap-nhat',
    hiddenMenu: true
  },

  {
    title: 'Đề thi',
    icon: FaImages,
    route: '/exam'
  }
];

export const ROUTE_MENU_DATA = MENU_DATA.map((item) => item)
  .map((item) => item.sub || item)
  .flat();
