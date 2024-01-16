import { useEffect, useReducer } from 'react';
import styled from 'styled-components';
import Loading from 'components/Loading';
import AddTask from 'components/Tasks/AddTask';
import TasksList from 'components/Tasks/TasksList';
import { fetchTasksData } from 'services/dataService';
import { TasksActions, tasksReducer } from 'reducers/tasksReducer';


const Container = styled.div`
  display: flex;
  min-width: 60%;
  align-items: center;
  flex-direction: column;
`;

const Home: React.FC = () => {
  const [{ tasks, isLoading }, dispatch] = useReducer(tasksReducer, { tasks: [], isLoading: true });

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    fetchTasksData(signal)
      .then((tasks) => {
        dispatch({ type: TasksActions.SET_DATA, payload: { tasks, isLoading: false } });
      });

      return () => {
        abortController.abort();
      };
  }, []);

  return (
    <Container>
      <AddTask dispatch={dispatch} />
      {isLoading ? (
        <Loading />
      ) : (
          <TasksList tasks={tasks} dispatch={dispatch} />
      )}
    </Container>
  );
};

export default Home;