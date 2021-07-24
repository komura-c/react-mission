import { createContext, FC, useState } from "react";

interface LoadingContextProps {
  isLoading: boolean;
  updateLoadingStatus: (value: boolean) => void;
}

const createDefaultLoadingStatus = (): LoadingContextProps => ({
  isLoading: false,
  updateLoadingStatus: value => { }
});

export const LoadingContext = createContext<LoadingContextProps>(createDefaultLoadingStatus());

export const LoadingProvider: FC = props => {
  const [isLoading, setLoadingStatus] = useState<boolean>(false);

  return (
    <LoadingContext.Provider value={{ isLoading, updateLoadingStatus: setLoadingStatus }}>
      {props.children}
    </LoadingContext.Provider>
  );
};
