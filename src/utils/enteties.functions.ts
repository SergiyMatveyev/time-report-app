import { ITimeReportTask } from '../context/TimeReport/types';
import { ITimeReportTaskWithId } from './props.interface';

export const taskWithIdToTask = (
  task: ITimeReportTaskWithId
): ITimeReportTask => {
  return {
    id: task.id,
    name: task.name,
    content: task.content,
    timeSpend: task.timeSpend,
    checklist: task.checklist,
    status: task.status,
    files: task.files,
  };
};
