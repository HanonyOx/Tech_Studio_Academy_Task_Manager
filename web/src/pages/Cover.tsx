import { Link } from "react-router-dom";

const Cover = () => {
  return (
    <main className="min-h-[80vh] flex items-center justify-center">
      <div className="w-11/12 container mx-auto flex flex-col lg:flex-row items-center">
        {/* Text side */}
        <div className="w-full lg:w-[50%] lg:px-10 my-4 lg:my-0">
          <h1 className="text-5xl font-bold">
            Manage your Tasks on <br />
            <span className="text-purple-600">TaskDuty</span>
          </h1>

          <p className="mt-5 text-gray-600">
            Welcome to TaskDuty — your simple space for organizing tasks,
            managing priorities, and keeping track of what needs to get done.
            Whether it’s an important work assignment, a personal goal, or
            something urgent, TaskDuty helps you stay focused, manage your time,
            and turn your to-do list into completed tasks.
          </p>

          <Link
            to="/tasks"
            className="mt-6 inline-block rounded-lg bg-purple-600 px-6 py-3 text-white cursor-pointer transition-all duration-300 hover:bg-purple-700"
          >
            Go To My Task
          </Link>
        </div>

        {/* Image side */}
        <div className="w-full lg:w-[45%] h-[50%] lg:h-[70vh] flex justify-center lg:justify-end pb-10 lgb-0">
          <img
            src="/Hero.png"
            alt="TaskDuty"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </main>
  );
};

export default Cover;
