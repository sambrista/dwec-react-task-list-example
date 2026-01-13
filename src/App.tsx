import { useEffect, useState } from 'react';
import { taskService } from './services/taskService';
import type { Task } from './types/Task';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // READ
  useEffect(() => {
    taskService.getAll()
      .then(setTasks)
      .finally(() => setLoading(false));
  }, []);

  // CREATE
  const addTask = (title: string) => {
    setSaving(true);
    taskService.create({ title, completed: false })
      .then(task => setTasks([...tasks, task]))
      .finally(() => setSaving(false));
  };

  // UPDATE
  const updateTask = (task: Task) => {
    setSaving(true);
    taskService.update(task)
      .then(updated =>
        setTasks(tasks.map(t => t.id === updated.id ? updated : t))
      )
      .finally(() => {
        setSaving(false);
        setEditingTask(null);
      });
  };

  // DELETE
  const deleteTask = (id: number) => {
    setSaving(true);
    taskService.delete(id)
      .then(() => setTasks(tasks.filter(t => t.id !== id)))
      .finally(() => setSaving(false));
  };

  // --- NUEVO: Separar los formularios ---
  const handleAddSubmit = (task: string | Task) => {
    addTask(task as string);
  };

  const handleEditSubmit = (task: string | Task) => {
    updateTask(task as Task);
  };

  if (loading) {
    return <p>Cargando tareas...</p>;
  }

  return (
    <div className="container" style={{ display: 'flex', gap: '40px', padding: '40px', flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: '300px' }}>
        <h2>Añadir Tarea</h2>
        <TaskForm
          onSubmit={handleAddSubmit}
          saving={saving}
          key="add-form" // clave distinta para evitar reutilización de estado
        />
      </div>

      <div style={{ flex: 1, minWidth: '300px' }}>
        <h2>Editar Tarea</h2>
        <TaskForm
          onSubmit={handleEditSubmit}
          editingTask={editingTask}
          saving={saving}
          key={editingTask ? editingTask.id : 'edit-form'} // fuerza reinicio al cambiar tarea
        />
      </div>

      <div style={{ width: '100%', marginTop: '40px' }}>
        <h2>Lista de Tareas</h2>
        <TaskList
          tasks={tasks}
          onEdit={setEditingTask}
          onDelete={deleteTask}
          saving={saving}
        />
      </div>
    </div>
  );
}

export default App;
