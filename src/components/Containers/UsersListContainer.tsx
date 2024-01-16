import { useCallback, useContext } from 'react';
import Table from 'components/Table';
import { UserContext } from 'context/UserContext';
import TablePagination from 'components/Table/TablePagination';
import { UserActions, UserInterface } from 'reducers/usersReducer';

const Headers = [
  { id: 1,title: 'Name', isSortable: true, field: 'name' },
  { id: 2, title: 'Email', isSortable: false, field: 'email' },
  { id: 3, title: 'Age', isSortable: true, field: 'age' },
  { id: 4, title: 'Actions', isSortable: false, field: 'actions' },
];

const UsersListContainer: React.FC = () => {
  const {
    users,
    dispatch,
    prevPage,
    nextPage,
    totalPages,
    searchTerm,
    isFetching,
    currentPage
  } = useContext(UserContext);

  const deleteUser = useCallback((id: number) => {
    dispatch({ type: UserActions.DELETE, payload: { id } });
  }, [dispatch]);

  const getUsers: () => Array<UserInterface> = () => {
    if (searchTerm) {
      return users.filter((user: UserInterface) => user.name.toLowerCase().startsWith(searchTerm));
    }

    return users;
  };

  const handleSortTable = useCallback((field: string, type: string) => {
    dispatch({ type: UserActions.SORT, payload: { field, type } });
  }, [dispatch]);


  return (
    <>
      <Table
        getData={getUsers}
        headerProps={Headers}
        tableCaption="User List"
        onSort={handleSortTable}
        handleDelete={deleteUser}
      />
      <TablePagination
        totalPages={totalPages}
        goToNextPage={nextPage}
        isFetching={isFetching}
        gotToPrevPage={prevPage}
        currentPage={currentPage}
      />
    </>
  );
};

export default UsersListContainer;