import { useQuery } from '@tanstack/react-query';
import queryString from 'query-string';
import { useLocation, useParams } from 'react-router-dom';
import API from 'util/api';
import { getKeywordSearch } from 'util/helper';
import { REPORT_TYPES } from '../subs/data';

export const useQueryTableData = () => {
  const location = useLocation();
  const parsed = queryString.parse(location.search);
  const { page = '1', title, type, year } = parsed;
  const dependencies = Object.entries(parsed).map((item) => item[1]);
  const params = useParams();
  const { page: pageRoute } = params;
  const queryType = type || REPORT_TYPES.find((item) => item.route === pageRoute).value;
  const queryTitle = title ? getKeywordSearch(title) : null; // keyword search
  const queryYear = year ? ` AND more_info:${year}` : '';

  return useQuery(['GET_TABLE_REPORT', pageRoute, ...dependencies], () => {
    return API.request({
      url: '/solr/report/select',
      params: {
        start: (parseInt(page) - 1) * 10,
        rows: 10,
        q: `type:${queryType}${queryYear}`,
        fq: queryTitle ? `title:${queryTitle}` : undefined,
        sort: 'created_date desc'
      }
    });
  });
};
