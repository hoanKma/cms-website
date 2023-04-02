export const REPORT_TYPES = [
  {
    value: 'CongBoThongTin',
    label: 'Công bố thông tin',
    route: 'cong-bo-thong-tin'
  },
  {
    value: 'ThongTinTaiChinh-TaiLieuTrinhBay',
    label: 'Tài liệu trình bày',
    route: 'thong-tin-tai-chinh'
  },
  {
    value: 'ThongTinTaiChinh-BaoCaoTaiChinhNam',
    label: 'BCTC năm',
    route: 'thong-tin-tai-chinh'
  },
  {
    value: 'ThongTinTaiChinh-BaoCaoTaiChinhQuy',
    label: 'BCTC quý',
    route: 'thong-tin-tai-chinh'
  },
  {
    value: 'BaoCaoThuongNien',
    label: 'Báo cáo thường niên',
    route: 'bao-cao-thuong-nien'
  },
  {
    value: 'QuanTriDoanhNghiep-BanCaoBach',
    label: 'Bản cáo bạch',
    route: 'quan-tri-doanh-nghiep'
  },
  {
    value: 'QuanTriDoanhNghiep-DieuLe',
    label: 'Điều lệ',
    route: 'quan-tri-doanh-nghiep'
  },
  {
    value: 'QuanTriDoanhNghiep-QuyCheQuanTri',
    label: 'Quy chế quản trị',
    route: 'quan-tri-doanh-nghiep'
  },
  {
    value: 'QuanTriDoanhNghiep-BaoCaoQuanTri',
    label: 'Báo cáo quản trị',
    route: 'quan-tri-doanh-nghiep'
  }
];

export const ROUTES_DATA = REPORT_TYPES.map((item) => item.route);

export const getTableHeader = (page) => {
  let header = [
    {
      title: 'Tiêu đề',
      field: 'title'
    },
    {
      title: 'Số file đính kèm',
      field: 'fileNum'
    },
    {
      title: 'Thời gian',
      field: 'date'
    }
  ];

  if (['cong-bo-thong-tin', 'quan-tri-doanh-nghiep'].includes(page)) {
    return [
      ...header,
      {
        title: 'Mô tả',
        field: 'description'
      }
    ];
  }

  if (['thong-tin-tai-chinh'].includes(page)) {
    return [
      ...header,
      {
        title: 'Năm',
        field: 'more_info'
      }
    ];
  }

  return header;
};

export const SHOW_DESCRIPTION_ROUTES = ['cong-bo-thong-tin', 'quan-tri-doanh-nghiep'];
export const SHOW_IMAGE_ROUTES = ['bao-cao-thuong-nien'];
export const SHOW_YEAR_ROUTES = ['thong-tin-tai-chinh'];
export const SHOW_TYPE_ROUTES = ['thong-tin-tai-chinh', 'quan-tri-doanh-nghiep'];
export const DISABLE_DATE_ROUTES = ['bao-cao-thuong-nien'];
export const DISABLE_MULTI_UPFILE = ['thong-tin-tai-chinh', 'bao-cao-thuong-nien'];
