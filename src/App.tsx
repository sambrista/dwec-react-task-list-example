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

  // Handle both create and update operations
  const handleSubmit = (input: string | Task) => {
    if (typeof input === 'string') {
      addTask(input);
    } else {
      updateTask(input);
    }
  };

  if (loading) {
    return <p>Cargando tareas...</p>;
  }

  return (
    <div className="container">
      <h1>CRUD de Tareas</h1>

      <TaskForm
        onSubmit={handleSubmit}
        editingTask={editingTask}
        saving={saving}
      />

      <TaskList
        tasks={tasks}
        onEdit={setEditingTask}
        onDelete={deleteTask}
        saving={saving}
      />
    </div>
  );
}

export default App;