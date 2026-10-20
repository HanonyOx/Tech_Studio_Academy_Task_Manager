import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import API_URL from "../config";

type Task = {
  _id: string;
  title: string;
  description: string;
  dueDate: string;
  category: string;
  completed: boolean;
};

const EditTask = () => {
  const [task, setTask] = useState<Task | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/login", { replace: true });
          return;
        }

        const response = await fetch(`${API_URL}/tasks/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch task.");
        }

        setTask(data.task);
        setTitle(data.task.title);
        setDescription(data.task.description);
        setDueDate(data.task.dueDate);
        setCategory(data.task.category);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Something went wrong while loading the task.",
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      void fetchTask();
    } else {
      setError("Task ID is missing.");
      setLoading(false);
    }
  }, [id, navigate]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!task || !id) {
      setError("Task could not be found.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login", { replace: true });
        return;
      }

      const taskData = {
        title,
        description,
        dueDate,
        category,
        completed: task.completed,
      };

      const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(taskData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update task.");
      }

      navigate("/tasks", { replace: true });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while updating the task.",
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <main className="flex min-h-[80vh] items-center justify-center px-4">
        {" "}
        <p className="text-gray-500">Loading task...</p>{" "}
      </main>
    );
  }

  if (!task) {
    return (
      <main className="min-h-[80vh] px-4 py-10">
        {" "}
        <div className="mx-auto w-11/12 max-w-3xl">
          {" "}
          <p role="alert" className="mb-5 text-red-600">
            {error || "Task not found."}{" "}
          </p>
          <Link
            to="/tasks"
            className="inline-flex items-center gap-2 font-semibold text-purple-600 hover:text-purple-800"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Tasks
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[80vh] py-10">
      {" "}
      <div className="mx-auto w-11/12 max-w-3xl">
        {" "}
        <h1 className="flex items-center gap-2 text-3xl font-bold text-gray-900">
          {" "}
          <Link
            to="/tasks"
            aria-label="Back to tasks"
            className="text-purple-600 hover:text-purple-800"
          >
            {" "}
            <ArrowLeft className="h-6 w-6" />{" "}
          </Link>
          Edit Task{" "}
        </h1>
        <p className="mt-2 text-gray-500">Edit your task details here.</p>
        {error && (
          <p
            role="alert"
            className="mt-5 rounded-lg bg-red-50 p-3 text-sm text-red-600"
          >
            {error}
          </p>
        )}
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div>
            <label
              htmlFor="title"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Task Title
            </label>

            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Description
            </label>

            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label
              htmlFor="dueDate"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Due Date
            </label>

            <input
              id="dueDate"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label
              htmlFor="category"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Category
            </label>

            <input
              id="category"
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-purple-500"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full rounded-lg bg-purple-600 px-5 py-3 font-semibold text-white transition-colors duration-300 hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? "Updating Task..." : "Update Task"}
          </button>
        </form>
      </div>
    </main>
  );
};

export default EditTask;
