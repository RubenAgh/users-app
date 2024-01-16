import { memo } from 'react';
import styled from 'styled-components';
import { UserInterface } from 'reducers/usersReducer';
import { DeleteBtn } from 'components/Tasks/TaskItem';
import TableHeader, { HeaderProps } from './TableHeader';
import { getStyleFromProps } from 'utils/getStyleFromProps';



const StyledTable = styled.table`
  margin: 0;
  padding: 0;
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
  border: 1px solid ${props => getStyleFromProps(props, 'tableBorderColor')};
  @media screen and (max-width: 930px) {
    border: 0;
  }
`;

const Caption = styled.caption`
  font-size: 24px;
  margin: 0 0 16px;
`;

export const Tr = styled.tr`
  padding: 8px;
  background-color: ${props => getStyleFromProps(props, 'tableRowBackground')};
  border: 1px solid ${props => getStyleFromProps(props, 'tableRowBorderColor')};
  @media screen and (max-width: 930px) {
    display: block;
    margin-bottom: 16px;
    border-bottom: 3px solid ${props => getStyleFromProps(props, 'tableRowBorderColor')};
  }
`;

const Td = styled.td`
  padding: 12px;
  text-align: center;
  @media screen and (max-width: 930px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: right;
    border-bottom: 1px solid ${props => getStyleFromProps(props, 'tableRowBorderColor')};

    &::before {
      content: attr(data-label);
      float: left;
      font-weight: bold;
      text-transform: uppercase;
    }

    &:last-child {
      border-bottom: 0;
    }
  }

`;

const NoData = styled.div`
  margin: 32px 0;
  display: flex;
  justify-content: center;
`;


interface TableProps {
  tableCaption: string;
  headerProps: Array<HeaderProps>;
  getData: () => Array<UserInterface>;
  handleDelete: (id: number) => void;
  onSort: (field: string, type: string) => void;
}

const Table: React.FC<TableProps> = ({ tableCaption, getData, handleDelete, headerProps, onSort }) => {
  const data = getData();

  return (
    <>
      <StyledTable>
        <Caption>{tableCaption}</Caption>
        <TableHeader headers={headerProps} onSort={onSort} />
        <tbody>
          {data.map((user: UserInterface) => (
            <Tr key={user.id}>
              <Td data-label="Name">{user.name}</Td>
              <Td data-label="Email">{user.email}</Td>
              <Td data-label="Age">{user.age}</Td>
              <Td data-label="Actions">
                <DeleteBtn onClick={() => handleDelete(user.id)}>
                  Delete
                </DeleteBtn>
              </Td>
            </Tr>
          ))}
        </tbody>
      </StyledTable>
      {!data.length && (
        <NoData>
          No data...
        </NoData>
      )}
    </>
  );
}

export default memo(Table);