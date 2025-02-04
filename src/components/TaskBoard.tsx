import { useState, ChangeEvent } from "react";
import DeleteButton from "./DeleteButton";
import UpdateTask from "./UpdateTask";
import { Task } from "../types/task";

const TaskBoard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [textInput, setTextInput] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTextInput(event.target.value);
  };

  const handleEditClick = (task: Task) => {
    setIsEditing(true);
    setCurrentTask(task);
  };

  const updateTask = (taskId: number, updatedText: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, text: updatedText } : task
    );

    setTasks(updatedTasks);
    setIsEditing(false);
    setCurrentTask(null);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setCurrentTask(null);
  };

  const handleAddTask = () => {
    if (textInput.trim() === "") return;

    const newTask: Task = {
      id: Date.now(),
      text: textInput,
    };

    setTasks([...tasks, newTask]);
    setTextInput("");
  };

  const deleteTask = (taskId: number) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  return (
    <div className="flex flex-col items-center font-franklin">
      <h1 className="text-gray-700 my-8 text-2xl">Task Tracker</h1>
      {!isEditing && (
        <>
          <input
            type="text"
            placeholder="Enter a task..."
            value={textInput}
            onChange={handleInputChange}
            className="px-8 py-4 text-base rounded-xl w-2/5 mb-8 mr-2 bg-white border-2 border-gray-300"
          />
          <button
            onClick={handleAddTask}
            className="px-8 py-4 bg-blue-600 text-white border-none cursor-pointer text-base rounded-xl"
          >
            Add task
          </button>
        </>
      )}
      <ul className="my-8 mx-12 p-8 w-full text-xl text-gray-700 list-none border-t-2 border-black text-center">
        {tasks.map((task) => (
          <li key={task.id} className="my-8">
            {task.text}
            <DeleteButton taskId={task.id} deleteTask={deleteTask} />
            <button
              className="px-8 py-4 bg-purple-800 text-white border-none cursor-pointer text-base mr-2.5 rounded-xl"
              onClick={() => handleEditClick(task)}
            >
              Edit
            </button>
          </li>
        ))}
      </ul>
      {isEditing && currentTask && (
        <UpdateTask
          task={currentTask}
          updateTask={updateTask}
          cancelEdit={cancelEdit}
        />
      )}
    </div>
  );
};

export default TaskBoard;
