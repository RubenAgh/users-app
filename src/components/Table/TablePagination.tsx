import { memo } from 'react';
import styled from 'styled-components';
import { Button } from 'components/Tasks/AddTask';

const Container = styled.div`
  display: flex;
  margin: 16px 0;
  align-items: center;
  justify-content: flex-end;

  span {
    margin: 0 8px;
  }
`;

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  isFetching: boolean;
  goToNextPage: () => void;
  gotToPrevPage: () => void;
};

const TablePagination: React.FC<PaginationProps> = ({ currentPage, gotToPrevPage, goToNextPage, totalPages, isFetching }) => (
  <Container>
    <Button
      onClick={gotToPrevPage}
      disabled={currentPage === 1 || isFetching}
    >
      Prev
    </Button>
    <span>
      {currentPage}/{totalPages}
    </span>
    <Button
      onClick={goToNextPage}
      disabled={currentPage === totalPages || isFetching}
    >
      Next
    </Button>
  </Container>
);

export default memo(TablePagination);