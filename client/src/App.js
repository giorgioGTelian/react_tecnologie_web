import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Layout from './pages/layout';
import Pomodoro from './pages/pomodoro/Pomodoro';
import Calendar from './pages/calendar/calendar';
import NotFound from './pages/NotFound';
import About from './pages/about/About';
import SignIn from './pages/signin/signin';
import SignUp from './pages/signup/signup';
import PasswordResetCover from './pages/forgot_password/PasswordResetCover';
import EditorMain from './pages/editor/EditorMain';
import SettingsPomodoro from './pages/pomodoro/components/Settings';

const defaultTheme = createTheme();

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route element={<Layout />} >
              <Route path="/" element={<Navigate to="/calendar" />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/pomodoro" element={<Pomodoro />} />
              <Route path="/about" element={<About />} /> 
              <Route path="*" element={<NotFound />} /> 
              <Route path="/editorMain" element={<EditorMain />} />
              <Route path="/settings" element={<SettingsPomodoro />} />
            </Route>
            <Route path="/registrati" element={<SignUp />} />
            <Route path="/password-reset" element={<PasswordResetCover />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;