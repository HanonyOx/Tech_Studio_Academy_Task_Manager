import TaskCard from "../components/TaskCard";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

type Task = {
  _id: string;
  title: string;
  description: string;
  dueDate: string;
  category: string;
  completed: boolean;
};

const MyTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/tasks")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load tasks");
        }

        return response.json();
      })
      .then((data) => {
        setTasks(data.tasks);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id: string) => {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task._id !== id)
    );
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesCategory =
      categoryFilter === "" ||
      task.category.toLowerCase().includes(categoryFilter.toLowerCase());

    const matchesStatus =
      statusFilter === "" ||
      (statusFilter === "completed" && task.completed) ||
      (statusFilter === "pending" && !task.completed);

    return matchesCategory && matchesStatus;
  });

  return (
    <main className="min-h-[80vh] py-10">
      <div className="container mx-auto w-11/12">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:px-10">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Tasks</h1>

            <p className="mt-2 text-gray-500">
              Manage your tasks and keep track of what needs to be done.
            </p>
          </div>

          <Link
            to="/new-task"
            className="w-fit rounded-lg bg-white px-5 py-3 font-semibold text-purple-500 transition-all duration-300 hover:text-purple-700"
          >
            + Add New Task
          </Link>
        </div>

        {/* Filters */}
        <div className="mt-8 flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:flex-row lg:mx-10">
          {/* Category Input */}
          <div className="flex-1">
            <label
              htmlFor="category"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Filter by Category
            </label>

            <input
              id="category"
              type="text"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              placeholder="Enter category..."
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
            />
          </div>

          {/* Completion Status */}
          <div className="flex-1">
            <label
              htmlFor="status"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Filter by Status
            </label>

            <select
              id="status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
            >
              <option value="">All Status</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>

        {/* Tasks */}
        <div className="mt-10">
          <div className="grid gap-5 md:grid-cols-2 lg:px-10">
            {loading ? (
              <div className="col-span-full flex justify-center py-10">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-purple-600"></div>
              </div>
            ) : error ? (
              <p className="col-span-full text-center text-red-500">
                {error}
              </p>
            ) : filteredTasks.length === 0 ? (
              <p className="col-span-full py-10 text-center text-gray-500">
                No tasks match your filters.
              </p>
            ) : (
              filteredTasks.map((task) => (
                <TaskCard
                  key={task._id}
                  _id={task._id}
                  title={task.title}
                  description={task.description}
                  dueDate={task.dueDate}
                  category={task.category}
                  completed={task.completed}
                  onDelete={handleDelete}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default MyTasks;
