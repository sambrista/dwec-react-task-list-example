import type { Task } from '../types/Task';

type TaskListProps = {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
  saving: boolean;
};

function TaskList({ tasks, onEdit, onDelete, saving }: TaskListProps) {
  return (
    <ul className="task-list">
      {tasks.map(task => (
        <li key={task.id}>
          <span className="task-title">{task.title}</span>
          <div>
            <button className="edit" onClick={() => onEdit(task)} disabled={saving}>✏️</button>
            <button className="delete" onClick={() => onDelete(task.id)} disabled={saving}>❌</button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
