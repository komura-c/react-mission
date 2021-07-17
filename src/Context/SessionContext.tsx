import { createContext, FC, useState } from "react";

interface SessionContextProps {
  token: string;
  updateToken: (value: string) => void;
}

const createDefaultUser = (): SessionContextProps => ({
  token: '',
  updateToken: value => { }
});

export const SessionContext = createContext<SessionContextProps>(createDefaultUser());

export const SessionProvider: FC = props => {
  const [token, setToken] = useState<string>('');

  return (
    <SessionContext.Provider value={{ token, updateToken: setToken }}>
      {props.children}
    </SessionContext.Provider>
  );
};
