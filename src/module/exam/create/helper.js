import { useLocation } from 'react-router-dom';

export const typeOptions = [
  {
    value: 'Blog',
    key: '/blog',
    label: 'Bài viết'
  },
  {
    value: 'News',
    key: '/tin-tuc',
    label: 'Tin tức'
  },
  {
    value: 'TrungTamPhanTich',
    key: '/analysis-post',
    label: 'Bài phân tích'
  },
  {
    value: 'analysis-center',
    key: '/analysis-center',
    label: 'Trung tâm phân tích'
  },
  {
    value: 'blog-category',
    key: '/blog-category',
    label: 'Thể loại bài viết'
  }
];

export const useGetType = () => {
  const location = useLocation();

  const stringParts = location.pathname.split('/');
  const result = stringParts[1];

  const type = typeOptions.filter((item) => item.key === `/${result}`);

  return type?.[0];
};
