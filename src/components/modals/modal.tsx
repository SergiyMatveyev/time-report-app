import { Modal } from 'react-bootstrap';
import { IPropsChildren } from '../../utils/props.interface';

export const ModalComponent = (
  props: IPropsChildren & {
    title: string;
    show: boolean;
    handleClose: () => void;
  }
): JSX.Element => {
  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.children}</Modal.Body>
    </Modal>
  );
};
