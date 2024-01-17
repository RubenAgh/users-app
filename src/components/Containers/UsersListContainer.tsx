import { useCallback, useContext, useMemo } from 'react';
import Table, { Td, Tr } from 'components/Table';
import { UserContext } from 'context/UserContext';
import TablePagination from 'components/Table/TablePagination';
import { UserActions, UserInterface } from 'reducers/usersReducer';
import { DeleteBtn } from 'components/Tasks/TaskItem';

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

  const filteredUsers: Array<UserInterface> = useMemo(() => {
    if (searchTerm) {
      return users.filter((user: UserInterface) => user.name.toLowerCase().startsWith(searchTerm));
    }

    return users;
  }, [searchTerm, users]);

  const handleSortTable = useCallback((field: string, type: string) => {
    dispatch({ type: UserActions.SORT, payload: { field, type } });
  }, [dispatch]);

  return (
    <>
      <Table
        headerProps={Headers}
        tableCaption="User List"
        isEmpty={!filteredUsers.length}
        onSort={handleSortTable}
      >
        {filteredUsers.map((user: UserInterface) => (
          <Tr key={user.id}>
            <Td data-label="Name">{user.name}</Td>
            <Td data-label="Email">{user.email}</Td>
            <Td data-label="Age">{user.age}</Td>
            <Td data-label="Actions">
              <DeleteBtn onClick={() => deleteUser(user.id)}>
                Delete
              </DeleteBtn>
            </Td>
          </Tr>
        ))}
      </Table>
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