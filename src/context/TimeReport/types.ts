import { DraggableLocation } from 'react-beautiful-dnd';
import { TimeReportActions } from './action.types';

export enum TaskStatus {
  PENDING = 'Pending',
  IN_PROGRESS = 'In progress',
  DONE = 'Done',
}

export enum TaskInfo {
  EXTRA_WORK = 'Extra work',
  EXTRA_TASK = 'Extra task',
}

export interface ITimeReportTask {
  id: string;
  name: string;
  content: string;
  status: string;
  timeSpend: string;
  checklist: { name: string; status: boolean }[] | null;
  files: FileList | null;
}

export interface ITimeReportColumn {
  [id: string]: {
    name: string;
    tasks: ITimeReportTask[];
  };
}

export interface ITimeReport {
  columns: ITimeReportColumn;
}

export interface ITimeReportAction {
  type: TimeReportActions;
  payload: {
    columnIdCurrent?: string;
    columnIdNew?: string;
    taskId?: string;
    destination?: DraggableLocation;
    source?: DraggableLocation;
    data?: ITimeReportTask;
  };
}

export interface ITimeReportContext extends ITimeReport {
  add: (columnIdCurrent: string, task: ITimeReportTask) => void;
  edit: (
    columnIdCurrent: string,
    columnIdNew: string,
    taskId: string,
    data: ITimeReportTask
  ) => void;
  remove: (columnId: string, id: string) => void;
  dragDrop: (result: any) => void;
}
