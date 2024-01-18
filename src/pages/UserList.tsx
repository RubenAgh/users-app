import { useEffect, useReducer } from 'react';
import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';
import Loading from 'components/Loading';
import usePagination from 'hooks/usePagination';
import { UserContext } from 'context/UserContext';
import { fetchUsersData } from 'services/dataService';
import UsersSearch from 'components/UsersList/UsersSearch';
import UsersListContainer from 'containers/UsersListContainer';
import { UserActions, usersReducer } from 'reducers/usersReducer';

const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserList = () => {
  const [searchParams] = useSearchParams();
  const { currentPage, nextPage, prevPage, updateTotalPages, totalPages } = usePagination();
  const [{ users, isLoading, searchTerm, isFetching }, dispatch] = useReducer(
    usersReducer,
    { users: [], isLoading: true, isFetching: true, searchTerm: searchParams.get('search') || '' }
  );

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    dispatch({ type: UserActions.FETCH, payload: true });

    fetchUsersData(signal, currentPage)
      .then(({ data, totalItems }) => {
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
        ) : (
          <>
            <UsersSearch />
            <UsersListContainer />
          </>
        )}
      </TableContainer>
    </UserContext.Provider>
  );
};

export default UserList;