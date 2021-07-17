import { createContext, FC, useState } from "react";

interface SessionContextProps {
  token: string;
  updateToken: (value: string) => void;
}

const createDefaultToken = (): SessionContextProps => ({
  token: '',
  updateToken: value => { }
});

export const SessionContext = createContext<SessionContextProps>(createDefaultToken());

export const SessionProvider: FC = props => {
  const [token, setToken] = useState<string>('');

  return (
    <SessionContext.Provider value={{ token, updateToken: setToken }}>
      {props.children}
    </SessionContext.Provider>
  );
};
