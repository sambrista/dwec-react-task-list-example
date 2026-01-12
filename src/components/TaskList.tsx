import type { Task } from '../types/Task';

type TaskListProps = {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
  saving: boolean;
};

function TaskList({ tasks, onEdit, onDelete, saving }: TaskListProps) {
  return (
    <ul>
      {tasks.map(task => (
        <li key={task.id}>
          {task.title}
          <div>
            <button onClick={() => onEdit(task)} disabled={saving}>✏️</button>
            <button onClick={() => onDelete(task.id)} disabled={saving}>❌</button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
