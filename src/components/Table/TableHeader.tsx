import { useState, memo, useCallback } from 'react';
import styled from 'styled-components';
import { Tr } from '.';

const Th = styled.th`
  padding: 12px;
  text-align: center;
  letter-spacing: .1em;
  text-transform: uppercase;

  span {
    margin-left: 4px;
  }

  &.sortable {
    cursor: pointer;
  }
`;

const Thead = styled.thead`
  @media screen and (max-width: 930px) {
    padding: 0;
    width: 1px;
    height: 1px;
    margin: -1px;
    border: none;
    overflow: hidden;
    position: absolute;
    clip: rect(0 0 0 0);
  }
`;

export interface HeaderProps {
  id: number;
  field: string;
  title: string;
  isSortable: boolean;
}

interface SortStateType {
  type: string;
  field: string;
}

interface HeaderInterface {
  headers: Array<HeaderProps>;
  onSort: (field: string, type: string) => void;
}

const TableHeader: React.FC<HeaderInterface> = ({ headers, onSort }) => {
  const [sortData, setSortData] = useState<SortStateType>({
    field: '',
    type: ''
  });
  
  const handleSort = useCallback((field: string, isSortable: boolean) => {
    if (!isSortable) {
      return null;
    }
    let type = 'desc';
    if (sortData.field !== field || sortData.type === 'desc') {
      type = 'asc';
    }
    onSort(field, type);
    setSortData({ field, type });
  }, [sortData, onSort]);

  const getSortIcon = (field: string, isSortable: boolean) => {
    if (!isSortable) {
      return null;
    }
    if (field !== sortData.field) {
      return <span>&#8593;&#8595;</span>;
    }
    if (sortData.type === 'desc') {
      return <span>&#8595;</span>;
    } else {
      return <span>&#8593;</span>;
    }
  };

  return (
    <Thead>
      <Tr>
        {headers.map(({ id, isSortable, field, title }: HeaderProps) => (
          <Th key={id} className="sortable" onClick={() => handleSort(field, isSortable)}>
            {title}
            {getSortIcon(field, isSortable)}
          </Th>
        ))}
      </Tr>
    </Thead>
  );
};

export default memo(TableHeader);