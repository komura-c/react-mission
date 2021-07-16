import { createUser } from "../Lib/apis"

export const SignUp = () => {
  createUser('test', 'test@test.com', 'test');
  return (
    <div>新規登録画面</div>
  )
}
