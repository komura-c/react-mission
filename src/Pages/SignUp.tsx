import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { SessionContext } from "../Context/SessionContext";
import { createUser } from "../Lib/Apis"

export const SignUp = () => {
  const tokenContext = useContext(SessionContext);

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isMaskPassword, setIsMaskPassword] = useState<boolean>(true);

  const history = useHistory();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    createUser({ name, email, password })
      .then((res) => {
        if (res.token) {
          history.push('/')
          tokenContext.updateToken(res.token)
        } else {
          throw Error('Unknown response error')
        }
      })
      .catch((err: Error) => {
        console.error(err.message);
      });
    event.preventDefault();
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === 'name') {
      setName(event.target.value)
    }
    if (event.target.name === 'email') {
      setEmail(event.target.value)
    }
    if (event.target.name === 'password') {
      setPassword(event.target.value)
    }
  }

  return (
    <>
      <h1>新規登録画面</h1>
      <h3>User Token: {tokenContext.token}</h3>
      <form className="flex flex-col gap-y-1" onSubmit={handleSubmit}>
        <input
          type="text"
          autoCapitalize="off"
          name="name"
          value={name}
          placeholder="名無し"
          onChange={handleChange}
          className="border-black border-2 bg-white focus:outline-none focus:shadow-outline py-2 px-4 rounded-md w-80 mx-auto"
        />
        <input
          type="email"
          autoCapitalize="off"
          name="email"
          value={email}
          placeholder="メールアドレス"
          onChange={handleChange}
          className="border-black border-2 bg-white focus:outline-none focus:shadow-outline py-2 px-4 rounded-md w-80 mx-auto"
        />
        <input
          type={isMaskPassword ? "password" : "text"}
          autoCapitalize="off"
          name="password"
          value={password}
          placeholder="パスワード"
          onChange={handleChange}
          className="border-black border-2 bg-white focus:outline-none focus:shadow-outline py-2 px-4 rounded-md w-80 mx-auto"
        />
        <button type="button" onClick={() => { setIsMaskPassword(isMaskPassword => !isMaskPassword) }}>👀</button>
        <button type="submit">送信</button>
      </form>
    </>
  )
}
