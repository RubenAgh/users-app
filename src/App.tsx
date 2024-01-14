import { lazy, Suspense } from 'react';
import styled from 'styled-components';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Home from 'pages/Home';
import Loading from 'components/Loading';
import { useTheme } from 'hooks/useTheme';
import Theme from 'components/StyledTheme';
import Header from 'components/Header/Header';
import { ThemeContext } from 'context/ThemeContext';
import { getStyleFromProps } from 'utils/getStyleFromProps';

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 64px 32px 32px 32px;
  height: calc(100vh - 99px);
  background-color: ${props => getStyleFromProps(props, 'contentBackground')};
`;

const PageWrapper = styled.div`
  display: flex;
  min-width: 80%;
  padding: 32px 16px;
  border-radius: 8px;
  justify-content: center;
  color: ${props => getStyleFromProps(props, 'textColor')};
  background-color: ${props => getStyleFromProps(props, 'pageBackground')};
`;

const NotFound = lazy(() => import('pages/NotFound'));
const UserList = lazy(() => import('pages/UserList'));
const UserDetails = lazy(() => import('pages/UserDetails'));

const getLazyPage = (Component: React.FC) => (
  <Suspense fallback={<Loading />}>
    <Component />
  </Suspense>
);

const App: React.FC = () => {
  const { selectedTheme, switchTheme } = useTheme();
  return (
    <ThemeContext.Provider value={{ selectedTheme, switchTheme }}>
      <Theme>
        <Router>
            <Header />
            <Container>
                <PageWrapper>
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/user-list" element={getLazyPage(UserList)} />
                  <Route path="/user-list/:id" element={getLazyPage(UserDetails)} />
                  <Route path="*" element={getLazyPage(NotFound)} />
              </Routes>
                </PageWrapper>
            </Container>
        </Router>
      </Theme>
    </ThemeContext.Provider>
  );
}

export default App;
