import Blog from 'module/blog';
import BlogCreate from 'module/blog/create';
import BlogDetail from 'module/blog/detail';
import Home from 'module/demo/main';
import ExamStructure from 'module/exam-structure/exam-structure';
import InfoDetail from 'module/info';
import { Login } from 'module/login-logout';
import Main from 'module/main';
import TeacherAccountCreate from 'module/teacher-account/create';
import TeacherAccountDetail from 'module/teacher-account/detail';
import TeacherAccount from 'module/teacher-account/teacher-account';
import WebviewResultCheck from 'module/webview-result-check/webview-result-check';
import WebviewResult from 'module/webview-result/webview-result';
import Webview from 'module/webview/webview';
import { memo, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { LS_KEY_SB_JWT } from 'util/const';

const AppRoute = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem(LS_KEY_SB_JWT);

  useEffect(() => {
    if (!token) {
      navigate('/dang-nhap');
    }
  }, [navigate, token]);

  return (
    <Routes>
      <Route path="/dang-nhap" element={<Login />} />
      <Route path="/cau-truc-de" element={<ExamStructure />} />

      <Route element={<Main />}>
        <Route index element={<Home />} />

        <Route path="tai-khoan">
          <Route path="" element={<InfoDetail />} />
          <Route path="cap-nhat/:id" element={<TeacherAccountCreate />} />
        </Route>

        <Route path="teacher-account">
          <Route path="" element={<TeacherAccount />} />
          <Route path="tao-moi" element={<TeacherAccountCreate />} />
          <Route path="cap-nhat/:id" element={<TeacherAccountCreate />} />
          <Route path="chi-tiet/:id" element={<TeacherAccountDetail />} />
        </Route>

        <Route path="cau-hoi">
          <Route path="" element={<Blog />} />
          <Route path="tao-moi" element={<BlogCreate />} />
          <Route path="cap-nhat/:id" element={<BlogCreate />} />
          <Route path="chi-tiet/:id" element={<BlogDetail />} />
        </Route>
      </Route>

      <Route path="webview" element={<Webview />} />
      <Route path="webview-result" element={<WebviewResult />} />
      <Route path="webview-result-check" element={<WebviewResultCheck />} />
    </Routes>
  );
};

export default memo(AppRoute);
