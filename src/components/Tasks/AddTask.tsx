import { memo, useState } from 'react';
import styled from 'styled-components';
import { TasksActions } from 'reducers/tasksReducer';
import { getStyleFromProps } from 'utils/getStyleFromProps';
import { handleEnterKeyPress } from 'utils/enterKeyPressHandler';

export const Input = styled.input`
  width: 60%;
  height: 32px;
  padding: 8px;
  border: none;
  outline: none;
  border-radius: 4px;
  color: ${props => getStyleFromProps(props, 'textColor')};
  background-color: ${props => getStyleFromProps(props, 'inputBackground')};

  &::placeholder {
    color: ${props => getStyleFromProps(props, 'textColor')};
  }
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 32px;
  justify-content: center;

  button {
    margin-left: 16px;
  }
`;

export const Button = styled.button`
  border: none;
  height: 32px;
  cursor: pointer;
  min-width: 64px;
  border-radius: 4px;
  color: ${props => getStyleFromProps(props, 'btnColor')};
  background-color: ${props => getStyleFromProps(props, 'btnBackgroundColor')};
  &:disabled {
    cursor: not-allowed;
    background-color: ${props => getStyleFromProps(props, 'disabledBtnBackground')};
  }
`;

interface AddTaskProps {
  dispatch: React.Dispatch<any>;
};

const AddTask: React.FC<AddTaskProps> = ({ dispatch }) => {
  const [title, setTitle] = useState('');
  
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const addTask = () => {
    if (title.trim()) {
      dispatch({ type: TasksActions.ADD, payload: title });
      setTitle('');
    }
  };

  return (
    <Container>
      <Input 
        value={title}
        onChange={handleTitleChange}
        placeholder="Type task name..."
        onKeyDown={(e) => handleEnterKeyPress(e, addTask)}
      />
      <Button onClick={addTask} disabled={!title.trim().length}>Add Task</Button>
    </Container>
  );
};

export default memo(AddTask);