import { useState } from 'react';
import type { Task } from '../types/Task';

type TaskFormProps = {
  onAdd: ((title: string) => void);
  onEdit: ((task: Task) => void);
  onCancelEdit: (() => void);
  editingTask?: Task | null;
  saving: boolean;
};

function TaskForm({ onAdd, onEdit, onCancelEdit, editingTask = null, saving }: TaskFormProps) {
  const [title, setTitle] = useState(editingTask ? editingTask.title : '');

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (editingTask) {
      onEdit({ ...editingTask, title } as Task);
    } else {
      onAdd(title);
    }
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
      {editingTask && <button disabled={saving} onClick={onCancelEdit}>Cancelar</button>}
    </form>
  );
}

export default TaskForm;