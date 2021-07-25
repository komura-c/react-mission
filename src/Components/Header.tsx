import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="relative bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
          <div className="justify-start">
            <Link to="/" className="text-base font-medium text-gray-500 hover:text-gray-900">
              📚Bookage
            </Link>
          </div>
          <div className="flex items-center justify-end md:flex-1">
            <Link to="/login" className="text-base font-medium text-gray-500 hover:text-gray-900">
              ログイン
            </Link>
            <Link to="/signup" className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
              新規登録
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
