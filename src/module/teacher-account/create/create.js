import { Flex } from '@chakra-ui/react';
import { ButtonBack, ButtonSubmit } from 'component/button';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQueryUserInfoByID } from '../query';
import { useResetAtom } from './custom-hook';
import { useMutationCreateTeacherAccount } from './mutate';
import Avatar from './subs/avatar';
import Fullname from './subs/fullname';
import Password from './subs/password';
import SelectType from './subs/select-type';
import Username from './subs/username';

const TeacherAccountCreate = () => {
  const avatarRef = useRef();
  const fullnameRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const selectTypeRef = useRef();

  const params = useParams();
  const { id } = params;
  const navigate = useNavigate();

  const [avaUrl, setAvaUrl] = useState('');

  const resetAtom = useResetAtom();

  const onGoBack = useCallback(() => navigate(-1), [navigate]);

  const { mutate: createTeacherAccount, isLoading: loadingCreate } = useMutationCreateTeacherAccount();

  const { data: userInfobyId, isLoading, isError } = useQueryUserInfoByID(id);
  console.log('userInfobyId', userInfobyId);

  // const loadingAction = useMemo(() => loadingCreate || loadingUpdate, [loadingCreate, loadingUpdate]);

  useEffect(() => {
    resetAtom();
  }, [resetAtom]);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const fullName = fullnameRef?.current?.get();
      const username = usernameRef?.current?.get();
      const password = passwordRef?.current?.get();
      const avaUrl = avatarRef?.current?.getAva();
      const subjectIds = selectTypeRef?.current?.get().map((item) => {
        return item.id;
      });

      if (id) {
        // update
        const params = {
          id
        };
      } else {
        //add
        const params = {
          fullName,
          username,
          password,
          subjectIds,
          role: 'TEACHER',
          status: 'ACTIVE',
          avatar: avaUrl.url
        };

        createTeacherAccount(params);
      }
    },
    [createTeacherAccount, id]
  );

  // if (id) {
  //   if (loadingDetail) {
  //     return <LoadingScreen />;
  //   }

  //   if (error || errorMedia || !infoDetail) {
  //     return <ErrorScreen message={error.message} />;
  //   }
  // }

  return (
    <Flex w="full">
      <Flex w={2 / 3} mx="auto" mt={10} flexDirection="column">
        <form onSubmit={onSubmit}>
          <Avatar ref={avatarRef} />
          <Fullname ref={fullnameRef} />
          <SelectType ref={selectTypeRef} />
          <Username ref={usernameRef} />
          <Password ref={passwordRef} />

          <Flex justifyContent="center" mt={5} mb={10} gap={4}>
            <ButtonBack onClick={onGoBack} />

            <ButtonSubmit title={id ? 'Cập nhật' : 'Tạo mới'} isLoading={loadingCreate} />
          </Flex>
        </form>
      </Flex>
    </Flex>
  );
};

export default memo(TeacherAccountCreate);
