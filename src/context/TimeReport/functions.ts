import { ITimeReport, ITimeReportTask } from './types';
import { DraggableLocation } from 'react-beautiful-dnd';

export const add = (
  state: ITimeReport,
  columnId: string,
  task: ITimeReportTask
): ITimeReport => {
  const columns = { ...state.columns };
  columns[columnId].tasks.push(task);
  return {
    columns,
  };
};

export const edit = (
  state: ITimeReport,
  columnIdPrev: string,
  columnIdNew: string,
  taskID: string,
  task: ITimeReportTask
): ITimeReport => {
  const columns = { ...state.columns };
  if (columnIdPrev !== columnIdNew) {
    columns[columnIdPrev].tasks.splice(
      columns[columnIdPrev].tasks.findIndex(e => e.id === taskID),
      1
    );
    columns[columnIdNew].tasks.push(task);
  } else {
    columns[columnIdNew].tasks[
      columns[columnIdPrev].tasks.findIndex(e => e.id === taskID)
    ] = task;
  }
  return {
    columns,
  };
};

export const remove = (
  state: ITimeReport,
  columnIdCurrent: string,
  id: string
): ITimeReport => {
  const columns = { ...state.columns };
  columns[columnIdCurrent].tasks.splice(
    columns[columnIdCurrent].tasks.findIndex(e => e.id === id),
    1
  );
  return {
    columns,
  };
};

export const dragDrop = (
  state: ITimeReport,
  {
    destination,
    source,
  }: {
    destination: DraggableLocation;
    source: DraggableLocation;
  }
): ITimeReport => {
  const columns = { ...state.columns };

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];

    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.tasks];
    const destItems = [...destColumn.tasks];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);

    columns[source.droppableId].tasks = sourceItems;
    columns[destination.droppableId].tasks = destItems;
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.tasks];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    columns[source.droppableId].tasks = copiedItems;
  }
  return { columns };
};
