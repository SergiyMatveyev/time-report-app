import { MouseEventHandler } from 'react';
import { Button, Card } from 'react-bootstrap';
import { ITimeReportTask } from '../../context/TimeReport/types';

export const TimeReportTask = (
  props: ITimeReportTask & {
    onEdit: MouseEventHandler<HTMLButtonElement>;
    onRemove: MouseEventHandler<HTMLButtonElement>;
  }
) => {
  return (
    <Card className="mb-1">
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Text>{props.content}</Card.Text>
        {props.checklist ? (
          <div className="text-secondary mb-3">
            {props.checklist.filter(i => i.status === true).length}
            &nbsp;/&nbsp;{props.checklist.length}
          </div>
        ) : null}

        <div className="d-flex justify-content-between">
          <Button variant="warning" size="sm" onClick={props.onEdit}>
            Edit task
          </Button>
          <Button variant="danger" size="sm" onClick={props.onRemove}>
            Delete task
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};
