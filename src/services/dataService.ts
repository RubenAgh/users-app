const API_BASE_URL = 'https://jsonplaceholder.typicode.com/';

export const fetchTasksData = async (limit = 10) => {
  try {
    const response = await fetch(`${API_BASE_URL}/todos?_limit=${limit}`);
    const data = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(`Error fetching data: ${error?.message}`);
  }
};