import { useEffect, useState } from 'react';
import type { Task } from '../types/Task';

type TaskFormProps = {
  onSubmit: ((task: Task | string) => void);
  editingTask?: Task | null;
  saving: boolean;
};

function TaskForm({ onSubmit, editingTask = null, saving }: TaskFormProps) {
  const [title, setTitle] = useState(editingTask ? editingTask.title : '');

useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
    } else {
      setTitle('');
    }
  }, [editingTask]);

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSubmit(
      editingTask
        ? { ...editingTask, title } as Task
        : title
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={e => handleTitleChange(e.target.value)}
        placeholder="Nueva tarea"
        key={editingTask?.id || 'new'}
      />
      <button disabled={saving}>
        {saving ? 'Guardando...' : editingTask ? 'Actualizar' : 'Añadir'}
      </button>
    </form>
  );
}

export default TaskForm;