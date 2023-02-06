import { IPropsTitle } from '../../utils/props.interface';

export const Header = ({ title }: IPropsTitle): JSX.Element => {
  return (
    <div className="p-3 bg-light d-flex justify-content-between align-items-center">
      <h1>{title}</h1>
    </div>
  );
};
