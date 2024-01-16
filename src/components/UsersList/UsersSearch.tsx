import { useCallback, useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Search from 'components/Search';
import useDebounce from 'hooks/useDebounce';
import { UserContext } from 'context/UserContext';
import { UserActions } from 'reducers/usersReducer';

const UsersSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { dispatch, isLoading } = useContext(UserContext);
  const [searchParams, setSearchParams] = useSearchParams();
  
  useEffect(() => {
    const searchValue = searchParams.get('search');
    if (searchValue) {
      setSearchTerm(searchValue);
    }
  }, [searchParams]);

  const handleSearch = useDebounce(useCallback((term: string) => {
    dispatch({ type: UserActions.SEARCH, payload: { value: term.toLowerCase() } });
  }, [dispatch]), 500);

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim();
    const params = new URLSearchParams({ search: value });
    setSearchTerm(value);
    handleSearch(value);
    setSearchParams(params);
    if (!value) {
      searchParams.delete('search');
      setSearchParams(searchParams);
    }
  }, [handleSearch, searchParams, setSearchParams]); 

  return (
    <Search
      searchTerm={searchTerm}
      onChange={handleChange}
      isDisabled={!!isLoading}
      inputPlaceholder="Search..."
    />
  );
};

export default UsersSearch;