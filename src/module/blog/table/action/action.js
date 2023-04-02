import { Flex } from '@chakra-ui/react';
import { ButtonEdit, ButtonView } from 'component/button';
import DeleteConfirmButton from 'component/delete-confirm-button';
import queryString from 'query-string';
import { memo, useCallback, useMemo } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useDeleteWithMedia } from 'util/hook';

const TableAction = ({ id }) => {
  const location = useLocation();
  const parsed = queryString.parse(location.search);
  const dependencies = Object.entries(parsed).map((item) => item[1]);
  const params = useParams();
  const { page: pageRoute } = params;
  const tableQueryKey = useMemo(() => ['GET_TABLE_BLOG', pageRoute, ...dependencies], [dependencies, pageRoute]);

  const { isLoading, deleteWithMedia } = useDeleteWithMedia(tableQueryKey);

  const onDelete = useCallback(
    () =>
      deleteWithMedia({
        id,
        solrTable: 'news'
      }),
    [deleteWithMedia, id]
  );

  return (
    <Flex alignItems="center" gap={4}>
      <Link to={`chi-tiet/${id}`}>
        <ButtonView />
      </Link>
      <Link to={`cap-nhat/${id}`}>
        <ButtonEdit />
      </Link>
      <DeleteConfirmButton onConfirm={onDelete} isLoading={isLoading} />
    </Flex>
  );
};

export default memo(TableAction);
