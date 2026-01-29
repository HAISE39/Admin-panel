'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Edit, Trash2, Eye, Copy, Check } from 'lucide-react';

interface Script {
  id: string;
  name: string;
  content: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const [scripts, setScripts] = useState<Script[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingScript, setEditingScript] = useState<Partial<Script> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchScripts();
  }, []);

  const fetchScripts = async () => {
    try {
      const res = await fetch('/api/scripts');
      if (res.status === 401) {
        router.push('/login');
        return;
      }
      const data = await res.json();
      setScripts(data);
    } catch (err) {
      console.error('Failed to fetch scripts');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingScript?.name || !editingScript?.content) return;

    const method = editingScript.id ? 'PUT' : 'POST';
    const url = editingScript.id ? `/api/scripts/${editingScript.id}` : '/api/scripts';

    try {
      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingScript),
      });
      setIsModalOpen(false);
      setEditingScript(null);
      fetchScripts();
    } catch (err) {
      console.error('Failed to save script');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this script?')) return;
    try {
      await fetch(`/api/scripts/${id}`, { method: 'DELETE' });
      fetchScripts();
    } catch (err) {
      console.error('Failed to delete script');
    }
  };

  const copyRawLink = (id: string) => {
    const link = `${window.location.origin}/api/raw/${id}`;
    navigator.clipboard.writeText(link);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-blue-500">INITIALIZING SYSTEM...</div>;

  return (
    <div className="min-h-screen bg-black text-white p-6 font-mono">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-10 border-b border-zinc-800 pb-6">
          <div>
            <h1 className="text-4xl font-bold text-blue-500 tracking-tighter">JULES-CORE</h1>
            <p className="text-zinc-500 text-xs">CLOUD SCRIPT MANAGEMENT v1.0.0</p>
          </div>
          <button
            onClick={() => {
              setEditingScript({ name: '', content: '' });
              setIsModalOpen(true);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-2 transition-all"
          >
            <Plus size={18} /> NEW SCRIPT
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scripts.map((script) => (
            <div key={script.id} className="bg-zinc-900 border border-zinc-800 rounded-lg p-5 hover:border-blue-500/50 transition-colors group">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-zinc-100 truncate pr-2">{script.name}</h3>
                <div className="flex gap-2">
                  <button onClick={() => { setEditingScript(script); setIsModalOpen(true); }} className="text-zinc-500 hover:text-blue-400">
                    <Edit size={16} />
                  </button>
                  <button onClick={() => handleDelete(script.id)} className="text-zinc-500 hover:text-red-400">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div className="bg-black/50 rounded p-3 mb-4 h-24 overflow-hidden relative">
                <code className="text-xs text-zinc-500 leading-tight block">
                  {script.content.substring(0, 150)}...
                </code>
                <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-zinc-900 to-transparent"></div>
              </div>

              <div className="flex items-center justify-between text-[10px] text-zinc-600 uppercase tracking-widest">
                <span>{new Date(script.createdAt).toLocaleDateString()}</span>
                <button
                  onClick={() => copyRawLink(script.id)}
                  className="flex items-center gap-1 text-blue-500 hover:text-blue-400 transition-colors"
                >
                  {copiedId === script.id ? <Check size={12} /> : <Copy size={12} />}
                  {copiedId === script.id ? 'COPIED' : 'COPY RAW LINK'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {scripts.length === 0 && (
          <div className="text-center py-20 border-2 border-dashed border-zinc-800 rounded-xl">
            <p className="text-zinc-500">NO SCRIPTS FOUND IN CLOUD DATABASE</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-zinc-900 border border-zinc-700 rounded-lg w-full max-w-2xl overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-zinc-800 flex justify-between items-center">
              <h2 className="text-xl font-bold text-blue-500">{editingScript?.id ? 'EDIT SCRIPT' : 'CREATE NEW SCRIPT'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-zinc-500 hover:text-white">✕</button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-xs uppercase text-zinc-500 mb-1">Script Name</label>
                <input
                  type="text"
                  value={editingScript?.name}
                  onChange={(e) => setEditingScript({ ...editingScript, name: e.target.value })}
                  className="w-full bg-black border border-zinc-700 p-3 rounded text-white focus:outline-none focus:border-blue-500"
                  placeholder="Example: Auto Headshot"
                  required
                />
              </div>
              <div>
                <label className="block text-xs uppercase text-zinc-500 mb-1">Lua Script Content</label>
                <textarea
                  value={editingScript?.content}
                  onChange={(e) => setEditingScript({ ...editingScript, content: e.target.value })}
                  className="w-full bg-black border border-zinc-700 p-3 rounded text-green-500 font-mono text-sm h-64 focus:outline-none focus:border-blue-500"
                  placeholder="-- Write your Lua code here..."
                  required
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded transition-colors"
                >
                  SAVE TO CLOUD
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 bg-zinc-800 hover:bg-zinc-700 text-white rounded transition-colors"
                >
                  CANCEL
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
