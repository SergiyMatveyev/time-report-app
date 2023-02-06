import { ChangeEvent, FormEvent, Fragment, useState } from 'react';
import { Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap';
import { TaskStatus } from '../../context/TimeReport/types';
import { v4 as uuid } from 'uuid';
import { ITimeReportTaskWithId } from '../../utils/props.interface';
import { FormFileUploader } from '../formFileUploader/formFileUploader';
import { isValidSpendTime } from '../../utils/form.functions';

export interface TimeReportFormProps {
  columns: {
    [id: string]: {
      name: string;
    };
  };
  taskColumn: string;
  task: ITimeReportTaskWithId | null;
  saveTask: (columnIdNew: string, task: ITimeReportTaskWithId) => void;
  handleModalClose: () => void;
}

export const TimeReportForm = ({
  columns,
  taskColumn,
  task,
  saveTask,
  handleModalClose,
}: TimeReportFormProps): JSX.Element => {
  const [validatedForm, setValidatedForm] = useState(false);
  const [name, setName] = useState(task ? task.name : '');
  const [description, setDescription] = useState(task ? task.content : '');
  const [columnId, setColumnId] = useState(taskColumn);
  const [status, setStatus] = useState(
    task ? task.status : TaskStatus.PENDING.toString()
  );
  const [spendTime, setSpendTime] = useState(task ? task.timeSpend : '');
  const [validateSpendTime, setValidateSpendTime] = useState<{
    message: string;
  } | null>(null);
  const [checklist, setChecklist] = useState<
    { name: string; status: boolean }[] | null
  >(task ? task.checklist : null);
  const [checklistField, setChecklistField] = useState('');
  const [files, setFiles] = useState<FileList | null>(task ? task.files : null);

  const changeFilesHandler = (files: FileList) => {
    setFiles(files);
  };

  const showFilePreview = (): JSX.Element[] | null => {
    if (files && files.length) {
      return Array.from(files).map((file, index) => {
        const src = URL.createObjectURL(file);
        return (
          <div key={file.name + index} className="col-3 image-preview">
            <img src={src} alt={'file'} />
          </div>
        );
      });
    }
    return null;
  };

  const changeNameHandler = (e: ChangeEvent<HTMLInputElement>): void =>
    setName(e.target.value);

  const changeDescriptionHandler = (e: ChangeEvent<HTMLInputElement>): void =>
    setDescription(e.target.value);

  const changeColumnIdHandler = (e: ChangeEvent<HTMLSelectElement>): void =>
    setColumnId(e.target.value);

  const changeStatusHandler = (e: ChangeEvent<HTMLSelectElement>): void =>
    setStatus(e.target.value);

  const changeChecklistItemFieldHandler = (
    e: ChangeEvent<HTMLInputElement>
  ): void => setChecklistField(e.target.value);

  const changeSpendTimeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setSpendTime(e.target.value);
    setValidateSpendTime(isValidSpendTime(e.target.value));
  };

  const addChecklistItemHandler = (): void => {
    if (checklistField.trim() !== '') {
      if (checklist) {
        const cl = [...checklist];
        cl.push({ name: checklistField, status: false });
        setChecklist(cl);
      } else {
        setChecklist([{ name: checklistField, status: false }]);
      }
    }
  };

  const onChangeChecklistItem = (e: ChangeEvent<HTMLInputElement>): void => {
    if (checklist) {
      const index = checklist.findIndex(el => el.name === e.target.value);
      checklist[index].status = e.target.checked ? true : false;
    }
  };

  const removeChecklistItemHandler = (index: number): void => {
    if (checklist) {
      const list = [...checklist];
      list.splice(index, 1);
      setChecklist(list);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    saveTask(columnId, {
      id: task ? task.id : uuid(),
      name,
      content: description,
      status,
      timeSpend: spendTime,
      checklist: checklist,
      files,
    });
    handleModalClose();
    setValidatedForm(true);
  };

  return (
    <Form
      data-testid="time-report-form"
      noValidate
      validated={validatedForm}
      onSubmit={handleSubmit}
      className={'d-flex flex-column align-items-end'}
    >
      <Form.Group className="mb-3 w-100" controlId="addTaskForm.taskName">
        <Form.Label>Task name</Form.Label>
        <Form.Control
          data-testid="taskName"
          type="text"
          name="taskName"
          placeholder="Task name"
          value={name}
          onChange={changeNameHandler}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3 w-100" controlId="addTaskForm.taskContent">
        <Form.Label>Task description</Form.Label>
        <Form.Control
          data-testid="taskContent"
          as="textarea"
          name="taskContent"
          value={description}
          onChange={changeDescriptionHandler}
          rows={2}
          required
        />
      </Form.Group>
      <Container className="w-100 px-0">
        <Row className="mb-3">
          <Form.Group
            as={Col}
            className="mb-3 col-6"
            controlId="addTaskForm.column"
          >
            <Form.Label>Column</Form.Label>
            <Form.Select
              data-testid="taskColumn"
              name="taskColumn"
              aria-label="Default select example"
              value={columnId}
              onChange={changeColumnIdHandler}
            >
              {Object.keys(columns).map(c => (
                <option key={`${c}`} value={c}>
                  {columns[c].name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group
            as={Col}
            className="mb-3 col-6"
            controlId="addTaskForm.taskStatus"
          >
            <Form.Label>Task status</Form.Label>
            <Form.Select
              data-testid="taskStatus"
              name="taskStatus"
              aria-label="Default select example"
              value={status}
              onChange={changeStatusHandler}
            >
              {Object.values(TaskStatus).map((s, i) => (
                <option key={`${s}-${i}`} value={s}>
                  {s}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Row>
      </Container>
      {task ? (
        <Form.Group
          className="mb-3 w-100"
          controlId="addTaskForm.taskTimeSpend"
        >
          <Form.Label>Time spent</Form.Label>
          <Form.Control
            data-testid="taskTimeSpend"
            type="text"
            name="taskTimeSpend"
            placeholder="2d 4h 25m"
            value={spendTime}
            onChange={changeSpendTimeHandler}
            required
          />
          {validateSpendTime ? (
            <div>
              <Form.Text className="text-danger">
                {validateSpendTime.message}
              </Form.Text>
            </div>
          ) : null}
          <Form.Text className="text-muted">
            Use the format: 4d 6h 45m
            <br />
            d = days
            <br />
            h = hours
            <br />
            m = minutes
            <br />1 day = 8 hours
          </Form.Text>
        </Form.Group>
      ) : null}

      {checklist ? (
        <Fragment>
          <Form.Label className="w-100">Task checklist</Form.Label>
          {checklist.map((c, i) => (
            <div key={i} className="d-flex justify-content-between w-100 mb-3">
              <Form.Check
                data-testid="taskStepCheckbox"
                name={'taskStepCheckbox'}
                type={'checkbox'}
                defaultChecked={c.status}
                id={`checkbox-${i}`}
                value={c.name}
                label={`${c.name}`}
                onChange={onChangeChecklistItem}
              />
              <Button
                variant="secondary"
                size="sm"
                onClick={removeChecklistItemHandler.bind(this, i)}
              >
                X
              </Button>
            </div>
          ))}
        </Fragment>
      ) : null}

      <InputGroup className="mb-3">
        <Form.Control
          data-testid="newChecklistItem"
          name="newChecklistItem"
          placeholder="Item name"
          aria-label="newChecklistItem"
          aria-describedby="newChecklistItem"
          value={checklistField}
          onChange={changeChecklistItemFieldHandler}
        />
        <Button
          variant="outline-primary"
          id="newChecklistItem"
          onClick={addChecklistItemHandler}
        >
          Add checklist item
        </Button>
      </InputGroup>
      <FormFileUploader file={files} onChange={changeFilesHandler} />
      <Container className="w-100 mb-3">
        .<Row>{showFilePreview()}</Row>
      </Container>
      <Button type="submit">Save changes</Button>
    </Form>
  );
};
