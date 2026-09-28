import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div className="border-b border-b-gray-300 sticky top-0 z-50 bg-white">
      <div className="w-11/12 mx-auto container lg:flex lg:justify-between lg:my-4 lg:px-10 flex justify-between my-3">
        <Link
          to="/"
          className="lside lg:flex lg:items-center lg:justify-center lg:gap-1 cursor-pointer flex justify-center items-center gap-1"
        >
          <img src="/logo.svg" alt="" className="w-10 h-10" />
          <h1 className="font-bold text-2xl text-purple-950">TaskDuty</h1>
        </Link>

        {/* Right Side  */}
        <div className="rside lg:flex lg:justify-center lg:items-center lg:gap-7 flex gap-2 justify-center items-center">
          <Link
            to="/new-task"
            className="font-semibold transition-all duration-300 hover:text-purple-700 relative after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-purple-500 after:transition-all after:duration-300 hover:after:w-full hidden lg:flex"
          >
            New Task
          </Link>
          <Link
            to="/tasks"
            className="font-semibold transition-all duration-300 hover:text-purple-700  relative after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-purple-500 after:transition-all after:duration-300 hover:after:w-full hidden lg:flex"
          >
            All Tasks
          </Link>

          <img src="/logo.svg" alt="" className="w-7 h-7 rounded-full " />

          {/* For Mobile */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
       
      </div>
      {isMenuOpen && (
  <div className="border-t border-gray-200 px-6 py-4 lg:hidden">
    <div className="flex flex-col gap-4">
      <Link
        to="/new-task"
        onClick={() => setIsMenuOpen(false)}
        className="font-semibold text-gray-700 transition-colors hover:text-purple-700"
      >
        New Task
      </Link>

      <Link
        to="/tasks"
        onClick={() => setIsMenuOpen(false)}
        className="font-semibold text-gray-700 transition-colors hover:text-purple-700"
      >
        All Tasks
      </Link>
    </div>
  </div>
)}
    </div>
    

    
  );
};

export default Navbar;
