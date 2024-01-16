import { lazy, Suspense } from 'react';
import styled from 'styled-components';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Loading from 'components/Loading';
import { useTheme } from 'hooks/useTheme';
import Theme from 'components/StyledTheme';
import Header from 'components/Header/Header';
import { ThemeContext } from 'context/ThemeContext';
import { getStyleFromProps } from 'utils/getStyleFromProps';

const Container = styled.div`
  display: flex;
  padding: 32px;
  justify-content: center;
  height: calc(100vh - 99px);
  background-color: ${props => getStyleFromProps(props, 'contentBackground')};
  @media screen and (max-width: 930px) {
    padding: 16px;
  }
`;

const PageWrapper = styled.div`
  display: flex;
  width: 100%;
  overflow: scroll;
  padding: 32px 16px;
  border-radius: 8px;
  justify-content: center;
  color: ${props => getStyleFromProps(props, 'textColor')};
  background-color: ${props => getStyleFromProps(props, 'pageBackground')};
  
`;

const Home = lazy(() => import('pages/Home'));
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
                    <Route path="/" element={getLazyPage(Home)} />
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
