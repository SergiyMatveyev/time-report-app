import { Fragment, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuth } from '../utils/auth.functions';
import { IPropsChildren } from '../utils/props.interface';

export const Middleware = (props: IPropsChildren): JSX.Element => {
  const userIsLogin = isAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userIsLogin) {
      navigate('/login');
    }
  }, [userIsLogin, navigate]);

  return <Fragment>{props.children}</Fragment>;
};
