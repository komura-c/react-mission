import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { SessionContext } from "../Context/SessionContext";
import { UserContext } from "../Context/UserContext";

import { createUser } from "../Apis/CreateUser"

import { Input } from "../Components/Input";

export const SignUp = () => {
  const tokenContext = useContext(SessionContext);
  const nameContext = useContext(UserContext);

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isMaskPassword, setIsMaskPassword] = useState<boolean>(true);

  const history = useHistory();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    try {
      history.push('/')
      const { token } = await createUser({ name, email, password });
      if (!token) {
        alert('レスポンスエラーです。再度お試しください。');
        throw Error('Unknown response error');
      }
      tokenContext.updateToken(token);
      nameContext.updateName(name);
    } catch (error: unknown) {
      console.error(error);
    }
    event.preventDefault();
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.id === 'name') {
      return setName(event.target.value)
    }
    if (event.target.id === 'email') {
      return setEmail(event.target.value)
    }
    if (event.target.id === 'password') {
      return setPassword(event.target.value)
    }
  }

  return (
    <>
      <h1>新規登録画面</h1>
      <form className="flex flex-col gap-y-2 w-96 mx-auto" onSubmit={handleSubmit}>
        <Input
          type="text"
          id="name"
          value={name}
          label="名前"
          placeholder="名無し"
          onChange={handleChange}
        />
        <Input
          type="email"
          id="email"
          value={email}
          label="メールアドレス"
          placeholder="test@test.com"
          onChange={handleChange}
        />
        <div className="relative">
          <Input
            type={isMaskPassword ? "password" : "text"}
            id="password"
            value={password}
            label="パスワード"
            placeholder="●●●●●●"
            onChange={handleChange}
          />
          <button type="button"
            className="absolute right-4 bottom-2 w-4"
            onClick={() => { setIsMaskPassword(isMaskPassword => !isMaskPassword) }}>
            {isMaskPassword ? '🚫' : '👁'}
          </button>
        </div>
        <button type="submit">送信</button>
      </form>
    </>
  )
}
