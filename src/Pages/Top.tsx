import { useContext } from "react";
import { Link } from "react-router-dom";
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
      <h1>トップページ</h1>
      <h3>
        {tokenContext.token
          ? `Welcome ${nameContext.name}`
          : <NotLogin />
        }
      </h3>
    </>
  )
}

const NotLogin = () => {
  return (
    <>
      <Link to="/login" className="text-base font-medium text-gray-500 hover:text-gray-900">
        ログイン
      </Link>
      <Link to="/signup" className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
        新規登録
      </Link>
    </>
  )
}
