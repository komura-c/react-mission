import { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

import { SessionContext } from "../Contexts/SessionContext";
import { UserContext } from "../Contexts/UserContext";
import { LoadingContext } from "../Contexts/LoadingContext";

import { loginUser } from "../Apis/LoginUser";
import { getUser } from "../Apis/GetUser";

import { ErrorResponse } from "../Models/ErrorResponse";

import { Input } from "../Components/Input";
import { Loading } from "../Components/Loading";

type IFormValues = {
  email: string;
  password: string;
}

export const Login = () => {
  const tokenContext = useContext(SessionContext);
  const nameContext = useContext(UserContext);
  const isLoadingContext = useContext(LoadingContext);

  const { register, handleSubmit, formState: { isDirty, isValid, errors } } = useForm<IFormValues>({
    mode: 'onChange'
  });

  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isMaskPassword, setIsMaskPassword] = useState<boolean>(true);

  const history = useHistory();

  if (isLoadingContext.isLoading) {
    return (
      <Loading />
    )
  }

  const onSubmit = async (formData: IFormValues) => {
    const { email, password } = formData;
    isLoadingContext.updateLoadingStatus(true);
    try {
      const { token } = await loginUser({ email, password });
      if (!token) {
        alert('レスポンスエラーです。再度お試しください。');
        throw Error('Unknown response error');
      }
      history.push('/')
      tokenContext.updateToken(token);
      const userData = await getUser(token);
      nameContext.updateName(userData.name);
    } catch (err: unknown) {
      const error = err as ErrorResponse;
      setErrorMessage(error.ErrorMessageJP);
    } finally {
      isLoadingContext.updateLoadingStatus(false);
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-center text-xl font-bold my-4">ログイン</h1>
      {errorMessage && (
        <p className='mb-2 text-center text-medium font-bold text-red-500'>{errorMessage}</p>
      )}
      <form className="flex flex-col gap-y-3" onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="email"
          name="email"
          label="メールアドレス"
          placeholder="test@test.com"
          register={register}
          required={true}
          error={errors.email}
        />
        <div className="relative">
          <Input
            type={isMaskPassword ? "password" : "text"}
            name="password"
            label="パスワード"
            placeholder="●●●●●●"
            register={register}
            required={true}
            error={errors.password}
          />
          <button type="button"
            className="absolute right-4 top-11 w-4"
            onClick={() => { setIsMaskPassword(isMaskPassword => !isMaskPassword) }}>
            {isMaskPassword ? '🚫' : '👁'}
          </button>
        </div>
        <button type="submit" disabled={!isDirty || !isValid} className={"mt-4 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"}>送信</button>
      </form>
      <div className="flex mt-6 justify-center text-sm">
        <Link to="/signup" className="text-blue-400 hover:text-blue-500">新規登録はこちら</Link>
      </div>
    </div>
  )
}
