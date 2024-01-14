export enum TasksActions {
  ADD = 'ADD',
  DELETE = 'DELETE',
  UPDATE = 'UPDATE',
  COMPLETE = 'COMPLETE',
  SET_DATA  = 'SET_DATA'
}

export interface TaskItem {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
}

interface TaskAction {
  payload: any;
  type: TasksActions;
}

export interface TasksState {
  isLoading: boolean;
  tasks: Array<TaskItem>;
}

export function tasksReducer(state: TasksState, action: TaskAction) {
  switch (action.type) {
    case TasksActions.SET_DATA:
      return {
        ...action.payload
      };
    case TasksActions.ADD:
      return {
        ...state,
        tasks: [
          ...state.tasks,
          {
            id: Date.now(),
            completed: false,
            title: action.payload
          },
        ],
      };
    case TasksActions.COMPLETE:
      return {
        ...state,
        tasks: state.tasks.map((task: TaskItem) => {
          if (+task.id === +action.payload.id) {
            task.completed = action.payload.value;
          }

          return task;
        }),
      };
    case TasksActions.UPDATE:
      return {
        ...state,
        tasks: state.tasks.map((task: TaskItem) => {
          if (task.id === action.payload.id) {
            task.title = action.payload.title;
          }

          return task;
        }),
      };
    case TasksActions.DELETE:
      return {
        ...state,
        tasks: state.tasks.filter((task: TaskItem) => task.id !== action.payload)
      };
    default:
      return state;
  }
}
