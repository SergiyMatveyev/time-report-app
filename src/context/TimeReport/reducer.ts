import { TimeReportActions } from './action.types';
import { add, dragDrop, edit, remove } from './functions';
import { ITimeReport, ITimeReportAction } from './types';

export const TimeReportReducer = (
  state: ITimeReport,
  action: ITimeReportAction
): ITimeReport => {
  switch (action.type) {
    case TimeReportActions.ADD:
      if (!action.payload.columnIdCurrent) return state;
      if (!action.payload.data) return state;
      return add(state, action.payload.columnIdCurrent, action.payload.data);
    case TimeReportActions.CHANGE:
      if (!action.payload.columnIdCurrent) return state;
      if (!action.payload.columnIdNew) return state;
      if (!action.payload.taskId) return state;
      if (!action.payload.data) return state;
      return edit(
        state,
        action.payload.columnIdCurrent,
        action.payload.columnIdNew,
        action.payload.taskId,
        action.payload.data
      );
    case TimeReportActions.REMOVE:
      if (!action.payload.columnIdCurrent) return state;
      if (!action.payload.taskId) return state;
      return remove(
        state,
        action.payload.columnIdCurrent,
        action.payload.taskId
      );
    case TimeReportActions.DRAG_DROP:
      if (!action.payload.destination) return state;
      if (!action.payload.source) return state;
      return dragDrop(state, {
        destination: action.payload.destination,
        source: action.payload.source,
      });
    default:
      return state;
  }
};
