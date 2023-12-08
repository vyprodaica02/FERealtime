/* eslint-disable @typescript-eslint/no-unused-vars */
import { Link } from "react-router-dom";
const App = () => {
  return (
    <div className="flex items-center justify-between p-4 h-16 bg-blue-500 border rounded-md">
      <div>
        <span>avata</span>
      </div>
      <div>
        <ul className="flex gap-2">
          <li>
            <Link to="/">đăng nhập</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default App;
