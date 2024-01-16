export enum UserActions {
  SORT = 'SORT',
  FETCH = 'FETCH',
  DELETE = 'DELETE',
  SEARCH = 'SEARCH',
  SET_DATA  = 'SET_DATA'
}

export interface UserInterface {
  id: number;
  age: number;
  name: string;
  email: string;
}

interface UserAction {
  payload: any;
  type: UserActions;
}

export interface UsersState {
  searchTerm: string;
  isLoading: boolean;
  users: Array<UserInterface>;
  isFetching: boolean;
}

export function usersReducer(state: UsersState, action: UserAction) {
  switch (action.type) {
    case UserActions.FETCH: 
      return {
        ...state,
        isFetching: action.payload
      }
    case UserActions.SET_DATA:
      return {
        ...state,
        ...action.payload,
        isLoading: false,
        isFetching: false
      };
    case UserActions.SORT:
      return {
        ...state,
        users: state.users.sort((a: UserInterface, b: UserInterface) => {
          const {
            type,
            field,
          }: { type: "asc" | "desc"; field: "age" | "name" } = action.payload;
          if (field === 'age') {
            if (type === 'asc') {
              return a[field] - b[field];
            } else {
              return b[field] - a[field];
            }
          } else {
            if (type === 'asc') {
              return a[field].localeCompare(b[field]);
            } else {
              return b[field].localeCompare(a[field]);
            }
          }
        })
      };
    case UserActions.SEARCH:
      return {
        ...state,
        searchTerm: action.payload.value
      };
    case UserActions.DELETE:
      return {
        ...state,
        users: state.users.filter((user: UserInterface) => user.id !== action.payload.id)
      };
    default:
      return state;
  }
}
