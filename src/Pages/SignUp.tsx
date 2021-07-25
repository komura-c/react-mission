import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";

import { SessionContext } from "../Contexts/SessionContext";
import { UserContext } from "../Contexts/UserContext";
import { LoadingContext } from "../Contexts/LoadingContext";

import { createUser } from "../Apis/CreateUser"

import { Input } from "../Components/Input";
import { Loading } from "../Components/Loading";
import { useForm } from "react-hook-form";

type IFormValues = {
  name: string;
  email: string;
  password: string;
}

export const SignUp = () => {
  const tokenContext = useContext(SessionContext);
  const nameContext = useContext(UserContext);
  const isLoadingContext = useContext(LoadingContext);

  const { register, handleSubmit, formState } = useForm<IFormValues>({
    mode: 'onChange'
  });

  const [isMaskPassword, setIsMaskPassword] = useState<boolean>(true);

  const history = useHistory();

  if (isLoadingContext.isLoading) {
    return (
      <Loading />
    )
  }

  const onSubmit = async (formData: IFormValues) => {
    const { name, email, password } = formData;
    isLoadingContext.updateLoadingStatus(true);
    try {
      const { token } = await createUser({ name, email, password });
      if (!token) {
        alert('レスポンスエラーです。再度お試しください。');
        throw Error('Unknown response error');
      }
      history.push('/')
      tokenContext.updateToken(token);
      nameContext.updateName(name);
    } catch (error: unknown) {
      console.error(error);
    } finally {
      isLoadingContext.updateLoadingStatus(false);
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-xl font-bold my-4">新規登録画面</h1>
      <form className="flex flex-col gap-y-3" onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="text"
          name="name"
          label="名前"
          placeholder="名無し"
          register={register}
          required={true}
        />
        <Input
          type="email"
          name="email"
          label="メールアドレス"
          placeholder="test@test.com"
          register={register}
          required={true}
        />
        <div className="relative">
          <Input
            type={isMaskPassword ? "password" : "text"}
            name="password"
            label="パスワード"
            placeholder="●●●●●●"
            register={register}
            required={true}
          />
          <button type="button"
            className="absolute right-4 bottom-2 w-4"
            onClick={() => { setIsMaskPassword(isMaskPassword => !isMaskPassword) }}>
            {isMaskPassword ? '🚫' : '👁'}
          </button>
        </div>
        <button type="submit" disabled={!formState.isValid} className="mt-4 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">送信</button>
      </form>
    </div>
  )
}
