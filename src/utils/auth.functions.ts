type Response = { message: string };

export const isAuth = (): boolean => {
  const authToken = window.localStorage.getItem('authToken');
  return (
    authToken !== null &&
    authToken !== undefined &&
    authToken.toString().trim() !== ''
  );
};

export const login = async (
  userName: string,
  password: string
): Promise<Response> => {
  return await isUserPresent(userName, password).then(res => {
    if (res.message === 'Success') {
      window.localStorage.setItem('authToken', userName);
    }
    return res;
  });
};

export const logout = (): void => {
  window.localStorage.removeItem('authToken');
};

async function isUserPresent(
  userName: string,
  password: string
): Promise<Response> {
  const fetchedUserData: any = await new Promise<any>(resolve => {
    setTimeout(() => {
      resolve({ userName: 'admin', password: 'admin123456' });
    });
  });

  if (fetchedUserData.userName !== userName)
    return { message: 'Username is incorrect' };
  if (fetchedUserData.password !== password)
    return { message: 'Password is incorrect' };
  return { message: 'Success' };
}
