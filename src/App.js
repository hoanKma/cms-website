import '@toast-ui/editor/dist/toastui-editor.css';
import { BrowserRouter } from 'react-router-dom';
import AppRoute from 'route';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <AppRoute />
    </BrowserRouter>
  );
}

export default App;
