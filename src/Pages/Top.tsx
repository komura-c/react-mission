import { useContext } from "react";
import { SessionContext } from "../Contexts/SessionContext";
import { UserContext } from "../Contexts/UserContext";
import { LoadingContext } from "../Contexts/LoadingContext";

import { Loading } from "../Components/Loading";

export const Top = () => {
  const tokenContext = useContext(SessionContext);
  const nameContext = useContext(UserContext);
  const isLoadingContext = useContext(LoadingContext);

  if (isLoadingContext.isLoading) {
    return (
      <Loading />
    )
  }

  return (
    <>
      <h1 className="text-center text-xl font-bold my-4">トップページ</h1>
      <h3>
        {tokenContext.token && `こんにちは ${nameContext.name}さん`}
      </h3>
    </>
  )
}
