import { Col } from 'react-bootstrap';
import { TimeReportTask } from './task';
import { ITimeReportTaskWithId } from '../../utils/props.interface';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { ITimeReportColumn } from '../../context/TimeReport/types';

export const TimeReportColumn = ({
  columnData,
  onEdit,
  onRemove,
}: {
  columnData: ITimeReportColumn;
  onEdit: (columnId: string, task: ITimeReportTaskWithId) => void;
  onRemove: (columnId: string, id: string) => void;
}) => {
  const columnId = Object.keys(columnData)[0];

  return (
    <Col className="col-4 px-1">
      <h3 className="mb-3">{columnData[columnId].name}</h3>
      <Droppable droppableId={columnId}>
        {(provided, snapshot) => {
          return (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{
                background: snapshot.isDraggingOver ? 'lightblue' : '',
                minHeight: 500,
              }}
            >
              {columnData[columnId].tasks.map((t, index) => {
                return (
                  <Draggable key={t.id} draggableId={t.id} index={index}>
                    {(provided, snapshot) => {
                      return (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <TimeReportTask
                            key={`${t.name}-${index}`}
                            {...t}
                            onEdit={onEdit.bind(this, columnId, t)}
                            onRemove={onRemove.bind(this, columnId, t.id)}
                          />
                        </div>
                      );
                    }}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          );
        }}
      </Droppable>
    </Col>
  );
};
