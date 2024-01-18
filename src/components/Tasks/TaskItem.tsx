import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Button, Input } from './AddTask';
import { TaskItem, TasksActions } from 'reducers/tasksReducer';
import { getStyleFromProps } from 'utils/getStyleFromProps';
import { handleEnterKeyPress } from 'utils/enterKeyPressHandler';

const Container = styled.div`
  padding: 8px;
  display: flex;
  margin-bottom: 4px;
  border-radius: 4px;
  align-items: center;
  justify-content: space-between;
  background-color: ${props => getStyleFromProps(props, 'taskItemBackground')};
  span {
    padding: 7px 0;
    max-width: 440px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const ActionsContainer = styled.div`
  margin-left: 16px;

  input[type="checkbox"] {
    margin-right: 16px;
  }

  button:not(:last-of-type) {
    margin-right: 8px;
    background-color: ${props => getStyleFromProps(props, 'btnBackgroundColor')};
  }
  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

export const DeleteBtn = styled.button`
  border: none;
  height: 32px;
  min-width: 64px;
  cursor: pointer;
  border-radius: 4px;
  background-color: ${props => getStyleFromProps(props, 'deleteBtnBackground')};
  color: ${props => getStyleFromProps(props, 'deleteBtnColor')} !important;
`;

interface TaskItemProps {
  task: TaskItem;
  dispatch: React.Dispatch<any>;
};

const TaskItemComponent: React.FC<TaskItemProps> = ({ task, dispatch }) => {
  const editBtnRef = useRef<null | HTMLButtonElement>(null);
  const editInputRef = useRef<null | HTMLInputElement>(null);
  const { title, completed, id } = task;
  const [editValue, setEditValue] = useState('');

  useEffect(() => {
    if (editValue) {
      editInputRef.current?.focus();
    }
  }, [editValue]);

  const handleComplete = () => {
    dispatch({ type: TasksActions.COMPLETE, payload: { id, value: !completed } });
  };

  const handleDelete = () => {
    dispatch({ type: TasksActions.DELETE, payload: id });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditValue(event.target.value);
  };

  const handleSave = () => {
    if (!editValue.trim().length) {
      handleDelete();
    } else {
      dispatch({ type: TasksActions.UPDATE, payload: { id, title: editValue } });
    }
    setEditValue('');
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    handleEnterKeyPress(event, handleSave);
    if (event.code === 'Escape') {
      setEditValue('');
      editBtnRef.current?.focus();
    }
  };

  const switchToEditMode = () => {
    setEditValue(title);
  };

  return (
    <Container>
      {!editValue ? (
        <span>{title}</span>
       ) : (
        <Input
          value={editValue}
          ref={editInputRef}
          onChange={handleChange}
          onKeyDown={handleKeyPress}
        />
      )}
      <ActionsContainer>
        <label htmlFor={`checkbox-${id}`}>Completed</label>
        <input type="checkbox" checked={completed} onChange={handleComplete} id={`checkbox-${id}`} />
        <Button
          ref={editBtnRef}
          onClick={editValue ? handleSave : switchToEditMode}
        >
          {editValue ? 'Save' : 'Edit'}
        </Button>
        <DeleteBtn onClick={handleDelete}>Delete</DeleteBtn>
      </ActionsContainer>
    </Container>
  );
};

export default TaskItemComponent;