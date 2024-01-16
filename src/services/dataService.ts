const TASKS_API_BASE_URL = 'https://jsonplaceholder.typicode.com/';
const USERS_API_BASE_URL = 'https://randomuser.me/api/';

export const fetchTasksData = async (signal: AbortSignal, limit: number = 10) => {
  try {
    const response: Response = await fetch(`${TASKS_API_BASE_URL}/todos?_limit=${limit}`, { signal });
    const data = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(`Error fetching data: ${error?.message}`);
  }
};

export const fetchUsersData = async (signal: AbortSignal, currentPage: number, limit: number = 10) => {
  try {
    const response: any = await fetch(`${USERS_API_BASE_URL}/?page=${currentPage}&results=${limit}`, { signal });
    let { info, results } = await response.json();
    
    results = results.map((user: any, idx: number) => ({
      id: user.id.value || idx,
      name: `${user.name.first} ${user.name.last}`,
      email: user.email,
      age: user.dob.age
    }));

    return { data: results, totalItems: info.results * limit };  
  } catch (error: any) {
    throw new Error(`Error fetching data: ${error?.message}`);
  }
};