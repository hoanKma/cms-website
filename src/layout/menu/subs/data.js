import { FaHome, FaImages, FaListAlt, FaThLarge } from 'react-icons/fa';

import { ImNewspaper } from 'react-icons/im';

export const MENU_DATA = [
  {
    title: 'Trang chủ',
    icon: FaHome,
    route: '/'
  },

  // {
  //   title: 'Bài viết ',
  //   icon: FaBookOpen,
  //   sub: [
  //     { title: 'Thể loại', icon: BiCategory, route: '/blog-category' },
  //     {
  //       title: 'Tạo mới Thể loại',
  //       route: '/blog-category/tao-moi',
  //       hiddenMenu: true
  //     },
  //     {
  //       title: 'Cập nhật Thể loại',
  //       route: '/blog-category/cap-nhat',
  //       hiddenMenu: true
  //     },
  //     {
  //       title: 'Chi tiết Thể loại',
  //       route: '/blog-category/chi-tiet',
  //       hiddenMenu: true
  //     },
  //     { title: 'Bài viết', icon: BsFileEarmarkPost, route: '/blog' },
  //     {
  //       title: 'Tạo mới Bài viết',
  //       route: '/blog/tao-moi',
  //       hiddenMenu: true
  //     },
  //     {
  //       title: 'Cập nhật Bài viết',
  //       route: '/blog/cap-nhat',
  //       hiddenMenu: true
  //     },
  //     {
  //       title: 'Chi tiết Bài viết',
  //       route: '/blog/chi-tiet',
  //       hiddenMenu: true
  //     }
  //   ]
  // },
  {
    title: 'Bộ đề',
    icon: ImNewspaper,
    route: '/bo-de'
  },

  {
    title: 'Banner',
    icon: FaImages,
    route: '/banners'
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
