import { createContext, FC, useState } from "react";

interface UserContextProps {
  name: string;
  updateName: (value: string) => void;
}

const createDefaultUser = (): UserContextProps => ({
  name: '',
  updateName: value => { }
});

export const UserContext = createContext<UserContextProps>(createDefaultUser());

export const UserProvider: FC = props => {
  const [name, setName] = useState<string>('');

  return (
    <UserContext.Provider value={{ name, updateName: setName }}>
      {props.children}
    </UserContext.Provider>
  );
};
