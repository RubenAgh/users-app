import { createContext } from 'react';
import { UserInterface } from 'reducers/usersReducer';

interface UserContextType {
  searchTerm: string;
  isLoading: Boolean;
  totalPages: number;
  currentPage: number;
  isFetching: boolean;
  nextPage: () => void;
  prevPage: () => void;
  dispatch: React.Dispatch<any>;
  users: Array<UserInterface>;
}

export const UserContext = createContext<UserContextType>({ 
  users: [],
  totalPages: 0,
  currentPage: 1,
  searchTerm: '',
  isLoading: false,
  isFetching: false,
  nextPage: () => {},
  prevPage: () => {},
  dispatch: () => {}
});
