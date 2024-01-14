import styled from 'styled-components';
import TaskItemComponent from './TaskItem';
import { TaskItem } from 'reducers/tasksReducer';

const Container = styled.div`
  width: 100%;
  overflow: scroll;
  padding: 0 16px;
`;

interface TaskListProps {
  tasks: Array<TaskItem>;
  dispatch: React.Dispatch<any>;
};

const TasksList: React.FC<TaskListProps> = ({ tasks, dispatch }) => {
  return (
    <Container>
      {tasks.map((task: TaskItem) => (
        <TaskItemComponent key={task.id} task={task} dispatch={dispatch} />
      ))}
    </Container>
  );
};

export default TasksList;