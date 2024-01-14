import { useContext } from 'react';
import { ThemeProvider } from 'styled-components';
import { ThemeContext } from 'context/ThemeContext';

const theme: object = {
  light: {
    contentBackground: '#ededf0',
    pageBackground: '#f2f2fa',
    headerBackground: '#e5e6eb',
    textColor: '#343d46',
    themeSwitchBtnBackground: '#252526',
    themeSwitchBtnColor: '#e5e6eb',
    inputBackground: '#e4e4ed',
    deleteBtnBackground: '#cc2a36',
    btnBackgroundColor: '#8b8b94',
    btnColor: '#eeeeee',
    deleteBtnColor: '#f2f2fa',
    taskItemBackground: '#e5e6eb',
    disabledBtnBackground: '#c7c7c9'
  },
  dark: {
    contentBackground: '#3e3e42',
    pageBackground: '#535357',
    headerBackground: '#252526',
    textColor: '#eeeeee',
    themeSwitchBtnBackground: '#e5e6eb',
    themeSwitchBtnColor: '#252526',
    inputBackground: '#8b8b94',
    taskItemBackground: '#787880',
    deleteBtnBackground: '#d11141',
    deleteBtnColor: '#eeeeee',
    btnBackgroundColor: '#e5e6eb',
    btnColor: '#343d46',
    disabledBtnBackground: '#cccccc'
  }
};

const Theme = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  const { selectedTheme } = useContext(ThemeContext);
  return (
    <ThemeProvider theme={{ ...theme, selectedTheme }}>{children}</ThemeProvider>
  );
};

export default Theme;