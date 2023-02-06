import { ReactNode } from 'react';
import { ITimeReportTask } from '../context/TimeReport/types';

export interface IPropsChildren {
  children: ReactNode;
}

export interface IPropsTitle {
  title: string;
}

export interface ITimeReportTaskWithId extends ITimeReportTask {
  id: string;
}

export interface ITimeReportTaskWithIdAndPosition
  extends ITimeReportTaskWithId {
  position: number;
}
