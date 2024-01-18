import { useEffect, useReducer, useState, Suspense } from 'react';
import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';
import Loading from 'components/Loading';
import usePagination from 'hooks/usePagination';
import { UserContext } from 'context/UserContext';
import { fetchUsersData } from 'services/dataService';
import { UserActions, usersReducer } from 'reducers/usersReducer';

const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserList = () => {
  const [searchParams] = useSearchParams();
  const [UserListComponent, setUserListComponent] = useState<React.FC | null>(null);
  const { currentPage, nextPage, prevPage, updateTotalPages, totalPages } = usePagination();
  const [{ users, isLoading, searchTerm, isFetching }, dispatch] = useReducer(
    usersReducer,
    { users: [], isLoading: true, isFetching: true, searchTerm: searchParams.get('search') || '' }
  );

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    const asyncLoad = async () => {
      try {
        const module = await import('containers/UsersListContainer');
        const dynamicComponent = module.default;
        setUserListComponent(() => dynamicComponent);
      } catch (error) {
        throw new Error(`Error on loading dynamic component: ${error}`);
      }
    };

    dispatch({ type: UserActions.FETCH, payload: true });

    fetchUsersData(signal, currentPage)
      .then(({ data, totalItems }) => {
        asyncLoad();
        updateTotalPages(totalItems);
        dispatch({ type: UserActions.SET_DATA, payload: { users: data } });
      });

    return () => {
      abortController.abort();
    };
  }, [currentPage, updateTotalPages]);
  
  return (
    <UserContext.Provider
      value={{
        users,
        dispatch,
        nextPage,
        prevPage,
        isLoading,
        totalPages,
        searchTerm,
        isFetching,
        currentPage
      }}
    >
      <TableContainer>
        {isLoading ? (
          <Loading />
        ) : 
          <Suspense fallback={<div>Component is fetching</div>}>
            {UserListComponent && <UserListComponent />}
          </Suspense>
        }
      </TableContainer>
    </UserContext.Provider>
  );
};

export default UserList;