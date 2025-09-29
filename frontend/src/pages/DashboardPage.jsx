import { useEffect, useMemo, useState } from 'react';
import { api } from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';

export default function DashboardPage() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [query, setQuery] = useState('');
  const [showCompleted, setShowCompleted] = useState('all');
  const [newTitle, setNewTitle] = useState('');
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const params = {};
    if (query) params.q = query;
    if (showCompleted !== 'all') params.completed = showCompleted;
    const res = await api.get('/tasks', { params });
    setTasks(res.data.tasks);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function addTask(e) {
    e.preventDefault();
    if (!newTitle.trim()) return;
    await api.post('/tasks', { title: newTitle.trim() });
    setNewTitle('');
    await load();
  }

  async function toggleTask(task) {
    await api.put(`/tasks/${task._id}`,
      { title: task.title, completed: !task.completed }
    );
    await load();
  }

  async function removeTask(task) {
    await api.delete(`/tasks/${task._id}`);
    await load();
  }

  const filteredInfo = useMemo(() => ({ query, showCompleted }), [query, showCompleted]);

  return (
    <div className="max-w-3xl mx-auto mt-6">
      <div className="bg-white shadow rounded p-4 mb-4">
        <h2 className="text-xl font-semibold">Welcome{user ? `, ${user.name}` : ''}</h2>
        <p className="text-sm text-gray-600">Manage your tasks below.</p>
      </div>

      <div className="bg-white shadow rounded p-4 mb-4">
        <form onSubmit={addTask} className="flex gap-2">
          <input
            className="flex-1 border rounded px-3 py-2"
            placeholder="Add a new task"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <button className="px-4 py-2 rounded bg-gray-900 text-white">Add</button>
        </form>
      </div>

      <div className="bg-white shadow rounded p-4 mb-4">
        <div className="flex flex-col sm:flex-row gap-2 items-center">
          <input
            className="flex-1 border rounded px-3 py-2"
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <select
            className="border rounded px-3 py-2"
            value={showCompleted}
            onChange={(e) => setShowCompleted(e.target.value)}
          >
            <option value="all">All</option>
            <option value="true">Completed</option>
            <option value="false">Active</option>
          </select>
          <button className="px-4 py-2 rounded border" onClick={load}>Apply</button>
        </div>
      </div>

      <div className="bg-white shadow rounded p-4">
        {loading ? (
          <div>Loading...</div>
        ) : tasks.length === 0 ? (
          <div className="text-gray-600">No tasks found.</div>
        ) : (
          <ul className="divide-y">
            {tasks.map((t) => (
              <li key={t._id} className="py-2 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <input type="checkbox" checked={t.completed} onChange={() => toggleTask(t)} />
                  <span className={t.completed ? 'line-through text-gray-500' : ''}>{t.title}</span>
                </div>
                <button className="text-red-600" onClick={() => removeTask(t)}>Delete</button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <pre className="text-xs text-gray-500 mt-4">{JSON.stringify(filteredInfo, null, 2)}</pre>
    </div>
  );
}



