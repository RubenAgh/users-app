import { ThemeContext } from 'context/ThemeContext';
import { useContext } from 'react';
import styled from 'styled-components';
import { getStyleFromProps } from 'utils/getStyleFromProps';

const Button = styled.button`
  border: none;
  height: 32px;
  width: 64px;
  border-radius: 20px;
  color: ${props => getStyleFromProps(props, 'themeSwitchBtnColor')};
  background-color: ${props => getStyleFromProps(props, 'themeSwitchBtnBackground')};
  cursor: pointer;
`;

const ThemeButton = () => {
  const { selectedTheme, switchTheme } = useContext(ThemeContext);

  return (
    <Button onClick={() => switchTheme()}>
      {selectedTheme === 'light' ? 'Dark' : 'Light'}
    </Button>
  );
};

export default ThemeButton;