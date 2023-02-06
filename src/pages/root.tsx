import { Col, Container, Row } from 'react-bootstrap';
import { Header } from '../components/header/header';
import { Sidebar } from '../components/sidebar/sidebar';
import { IPropsChildren, IPropsTitle } from '../utils/props.interface';

export const RootPage = ({
  title,
  children,
}: IPropsChildren & IPropsTitle): JSX.Element => {
  return (
    <Container fluid className="h-100">
      <Row className="h-100">
        <Col className={'px-0 col-2 h-100'}>
          <Sidebar />
        </Col>
        <Col className={'px-0 col-10'}>
          <Header title={title} />
          <div className="p-3">{children}</div>
        </Col>
      </Row>
    </Container>
  );
};
