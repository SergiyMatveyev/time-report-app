/* eslint-disable testing-library/prefer-screen-queries */
import { cleanup, fireEvent, render } from '@testing-library/react';
import {
  TimeReportForm,
  TimeReportFormProps,
} from '../../../components/forms/timeReportForm';
import { ITimeReportTaskWithId } from '../../../utils/props.interface';
import '@testing-library/jest-dom/extend-expect';
import { TaskStatus } from '../../../context/TimeReport/types';

afterEach(cleanup);

function renderTimeReportForm(props: Partial<TimeReportFormProps> = {}) {
  const defaultProps: TimeReportFormProps = {
    columns: {},
    taskColumn: '',
    task: null,
    saveTask(columnIdNew: string, task: ITimeReportTaskWithId) {
      return;
    },
    handleModalClose() {
      return;
    },
  };

  return render(<TimeReportForm {...defaultProps} {...props} />);
}

describe('<TimeReportForm />', () => {
  test('Should display blank form', async () => {
    const { findByTestId } = renderTimeReportForm();

    // eslint-disable-next-line testing-library/prefer-screen-queries
    const timeReportForm = await findByTestId('time-report-form');

    expect(timeReportForm).toHaveFormValues({
      taskName: '',
      taskContent: '',
      taskColumn: undefined,
      taskStatus: TaskStatus.PENDING.toString(),
    });
  });

  test('Should display filled form', async () => {
    const { findByTestId } = renderTimeReportForm({
      columns: {
        column1: {
          name: 'In progress',
        },
      },
      taskColumn: 'column1',
      task: {
        id: 'task 1',
        name: 'Task 4',
        content: 'Task 4 content',
        status: TaskStatus.PENDING,
        timeSpend: '1d 30m',
        checklist: [
          { name: 'Create Router 1', status: true },
          { name: 'Create Router 2', status: false },
        ],
        files: null,
      },
    });

    // eslint-disable-next-line testing-library/prefer-screen-queries
    const timeReportForm = await findByTestId('time-report-form');

    expect(timeReportForm).toHaveFormValues({
      taskName: 'Task 4',
      taskContent: 'Task 4 content',
      taskColumn: 'column1',
      taskStatus: TaskStatus.PENDING.toString(),
      taskTimeSpend: '1d 30m',
      taskStepCheckbox: ['Create Router 1'],
    });
  });

  test('should allow save task', async () => {
    const saveTask = jest.fn();
    const { findByTestId } = renderTimeReportForm({
      taskColumn: 'column1',
      saveTask,
    });

    const timeReportForm = await findByTestId('time-report-form');
    const taskName = await findByTestId('taskName');
    const content = await findByTestId('taskContent');
    const status = await findByTestId('taskStatus');

    fireEvent.change(taskName, { target: { value: 'Task name' } });
    fireEvent.change(content, { target: { value: 'Task test content' } });
    fireEvent.change(status, { target: { value: TaskStatus.DONE.toString() } });

    fireEvent.submit(timeReportForm);

    expect(saveTask).toHaveBeenCalledWith('column1', {
      id: expect.anything(),
      name: 'Task name',
      content: 'Task test content',
      status: TaskStatus.DONE.toString(),
      timeSpend: '',
      checklist: null,
      files: null,
    });
  });
});
