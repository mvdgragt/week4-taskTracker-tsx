export interface Task {
  id: number;
  text: string;
}

export interface DeleteButtonProps {
  taskId: number;
  deleteTask: (id: number) => void;
}

export interface UpdateTaskProps {
  task: Task;
  updateTask: (id: number, text: string) => void;
  cancelEdit: () => void;
}
