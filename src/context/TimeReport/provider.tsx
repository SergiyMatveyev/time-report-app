import { useReducer } from 'react';
import { IPropsChildren } from '../../utils/props.interface';
import { TimeReportReducer } from './reducer';
import {
  ITimeReport,
  ITimeReportAction,
  ITimeReportTask,
  TaskStatus,
} from './types';
import { TimeReportActions } from './action.types';
import { TimeReportContext } from './context';
import { v4 as uuid } from 'uuid';
import { DropResult } from 'react-beautiful-dnd';

const columnsIds = new Array<string>(3).fill('').map(e => uuid());
const tasksIds = new Array<string>(6).fill('').map(e => uuid());

export const initialState: ITimeReport = {
  columns: {
    [columnsIds[0]]: {
      name: 'To do',
      tasks: [
        {
          id: tasksIds[0],
          name: 'Task 1',
          content: 'Task 1 content',
          status: TaskStatus.PENDING,
          timeSpend: '2d 1h 3m',
          checklist: [{ name: 'Create Router', status: true }],
          files: null,
        },
        {
          id: tasksIds[1],
          name: 'Task 2',
          content: 'Task 2 content',
          status: TaskStatus.IN_PROGRESS,
          timeSpend: '30m',
          checklist: null,
          files: null,
        },
        {
          id: tasksIds[2],
          name: 'Task 3',
          content: 'Task 3 content',
          status: TaskStatus.DONE,
          timeSpend: '10m',
          checklist: null,
          files: null,
        },
      ],
    },
    [columnsIds[1]]: {
      name: 'In progress',
      tasks: [
        {
          id: tasksIds[3],
          name: 'Task 4',
          content: 'Task 4 content',
          status: TaskStatus.PENDING,
          timeSpend: '1d 30m',
          checklist: null,
          files: null,
        },
        {
          id: tasksIds[4],
          name: 'Task 5',
          content: 'Task 5 content',
          status: TaskStatus.PENDING,
          timeSpend: '2h 10m',
          checklist: null,
          files: null,
        },
      ],
    },
    [columnsIds[2]]: {
      name: 'Done',
      tasks: [
        {
          id: tasksIds[5],
          name: 'Task 6',
          content: 'Task 6 content',
          status: TaskStatus.PENDING,
          timeSpend: '1d 30m',
          checklist: null,
          files: null,
        },
      ],
    },
  },
};

export const TimeReportProvider = ({ children }: IPropsChildren) => {
  const [state, dispatch] = useReducer<
    React.Reducer<ITimeReport, ITimeReportAction>
  >(TimeReportReducer, initialState);

  const add = (columnIdCurrent: string, data: ITimeReportTask) => {
    dispatch({
      type: TimeReportActions.ADD,
      payload: { columnIdCurrent, data },
    });
  };

  const edit = (
    columnIdCurrent: string,
    columnIdNew: string,
    taskId: string,
    data: ITimeReportTask
  ) => {
    dispatch({
      type: TimeReportActions.CHANGE,
      payload: { columnIdCurrent, columnIdNew, taskId, data },
    });
  };

  const dragDrop = (result: DropResult) => {
    const destination = result.destination;
    const source = result.source;
    if (destination && typeof destination !== 'undefined') {
      dispatch({
        type: TimeReportActions.DRAG_DROP,
        payload: { destination, source },
      });
    }
  };

  const remove = (columnIdCurrent: string, taskId: string) => {
    dispatch({
      type: TimeReportActions.REMOVE,
      payload: { columnIdCurrent, taskId },
    });
  };

  return (
    <TimeReportContext.Provider
      value={{ ...state, add, edit, remove, dragDrop }}
    >
      {children}
    </TimeReportContext.Provider>
  );
};
