import { createGlobalStore } from 'hox';
import { useState } from 'react';

export const [useUser, getUser] = createGlobalStore(() => {
  const [user, setUser] = useState({
    telegramId: 0,
    token: '',
  });

  return {
    user,
    isLogin: user.token !== '',
    token: user.token,
    setUser,
  };
});
