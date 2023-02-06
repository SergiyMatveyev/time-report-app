import { ReactNode, useContext, useState } from 'react';
import { Button } from 'react-bootstrap';
import { TimeReportForm } from '../components/forms/timeReportForm';
import { ModalComponent } from '../components/modals/modal';
import { TimeReportColumn } from '../components/timeReport/column';
import { TimeReportContext } from '../context/TimeReport/context';
import { ITimeReportTask } from '../context/TimeReport/types';
import { taskWithIdToTask } from '../utils/enteties.functions';
import { ITimeReportTaskWithId } from '../utils/props.interface';
import { RootPage } from './root';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

export const TimeReport = () => {
  const context = useContext(TimeReportContext);
  const [showAddTask, setShowAddTask] = useState(false);
  const [showEditTask, setShowEditTask] = useState(false);
  const [editCurrentTask, setEditCurrentTask] =
    useState<ITimeReportTaskWithId | null>(null);
  const [editCurrentColumn, setEditCurrentColumn] = useState('');

  if (context) {
    const addTask = (columnIdCurrent: string, task: ITimeReportTask): void => {
      context.add(columnIdCurrent, task);
    };

    const editTask = (
      columnIdNew: string,
      task: ITimeReportTaskWithId
    ): void => {
      context.edit(
        editCurrentColumn,
        columnIdNew,
        task.id,
        taskWithIdToTask(task)
      );
    };

    const onAddModalShowHandler = () => setShowAddTask(true);
    const onAddModalHideHandler = () => setShowAddTask(false);

    const onEditModalShowHandler = () => setShowEditTask(true);
    const onEditModalHideHandler = () => setShowEditTask(false);

    const onEditTaskHandler = (
      columnId: string,
      task: ITimeReportTaskWithId
    ): void => {
      onEditModalShowHandler();
      setEditCurrentColumn(columnId);
      setEditCurrentTask(task);
    };

    const onRemoveTaskHandler = (columnIdCurrent: string, id: string): void => {
      context.remove(columnIdCurrent, id);
    };

    const onDragEndHandler = (result: DropResult): void => {
      context.dragDrop(result);
    };

    const renderColumns = (column: string): ReactNode => {
      return (
        <TimeReportColumn
          key={column}
          columnData={{
            [column]: {
              name: context.columns[column].name,
              tasks: context.columns[column].tasks,
            },
          }}
          onEdit={onEditTaskHandler}
          onRemove={onRemoveTaskHandler}
        />
      );
    };

    return (
      <RootPage title={'Time report'}>
        <ModalComponent
          title="Add task"
          show={showAddTask}
          handleClose={onAddModalHideHandler}
        >
          <TimeReportForm
            task={null}
            taskColumn={Object.keys(context.columns)[0]}
            columns={context.columns}
            saveTask={addTask}
            handleModalClose={onAddModalHideHandler}
          />
        </ModalComponent>
        {editCurrentTask ? (
          <ModalComponent
            title="Edit task"
            show={showEditTask}
            handleClose={onEditModalHideHandler}
          >
            <TimeReportForm
              task={editCurrentTask}
              taskColumn={editCurrentColumn}
              columns={context.columns}
              saveTask={editTask}
              handleModalClose={onEditModalHideHandler}
            />
          </ModalComponent>
        ) : null}

        <Button className="primary mb-3" onClick={onAddModalShowHandler}>
          Add new task
        </Button>
        <div className="d-flex">
          <DragDropContext onDragEnd={result => onDragEndHandler(result)}>
            {Object.keys(context.columns).map(column => renderColumns(column))}
          </DragDropContext>
        </div>
      </RootPage>
    );
  } else {
    return null;
  }
};
