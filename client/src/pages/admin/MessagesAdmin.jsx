import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';

const MessagesAdmin = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const { data } = await api.get('/contact');
      setMessages(data);
    } catch {
      toast.error('Failed to fetch messages');
    } finally {
      setLoading(false);
    }
  };

  const handleMarkRead = async (id) => {
    try {
      await api.patch(`/contact/${id}/read`);
      setMessages((prev) => prev.map((m) => (m._id === id ? { ...m, isRead: true } : m)));
      toast.success('Marked as read');
    } catch {
      toast.error('Failed to update message');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this message?')) return;
    try {
      await api.delete(`/contact/${id}`);
      setMessages((prev) => prev.filter((m) => m._id !== id));
      toast.success('Message deleted');
    } catch {
      toast.error('Failed to delete message');
    }
  };

  const unreadCount = messages.filter((m) => !m.isRead).length;

  if (loading) {
    return <div className="text-on-surface-variant animate-pulse">Loading messages...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-h2">Inbox</h2>
        {unreadCount > 0 && (
          <span className="px-3 py-1 bg-indigo-500 text-white text-sm rounded-full font-ui-element">
            {unreadCount} unread
          </span>
        )}
      </div>

      {messages.length === 0 ? (
        <div className="text-on-surface-variant py-16 text-center border border-dashed border-surface-container-high rounded-xl">
          <span className="material-symbols-outlined text-4xl text-zinc-600 block mb-3">inbox</span>
          No messages yet. They'll appear here when someone fills out the contact form.
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg._id}
              className={`p-6 rounded-xl border transition-colors ${
                msg.isRead
                  ? 'border-surface-container-high bg-transparent'
                  : 'border-indigo-500/40 bg-indigo-500/5'
              }`}
            >
              <div className="flex justify-between items-start mb-3 flex-wrap gap-2">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-on-surface">{msg.name}</span>
                    {!msg.isRead && (
                      <span className="text-xs bg-indigo-500 text-white px-2 py-0.5 rounded-full">New</span>
                    )}
                  </div>
                  <a href={`mailto:${msg.email}`} className="text-sm text-indigo-400 hover:underline">
                    {msg.email}
                  </a>
                </div>
                <span className="text-xs text-zinc-500 mt-1">
                  {new Date(msg.createdAt).toLocaleString()}
                </span>
              </div>

              <p className="text-on-surface-variant text-sm leading-relaxed mb-4 whitespace-pre-line">
                {msg.message}
              </p>

              <div className="flex gap-4">
                {!msg.isRead && (
                  <button
                    onClick={() => handleMarkRead(msg._id)}
                    className="text-sm text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-sm">done_all</span>
                    Mark as read
                  </button>
                )}
                <a
                  href={`mailto:${msg.email}`}
                  className="text-sm text-zinc-400 hover:text-zinc-200 flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-sm">reply</span>
                  Reply
                </a>
                <button
                  onClick={() => handleDelete(msg._id)}
                  className="text-sm text-red-400 hover:text-red-300 flex items-center gap-1 ml-auto"
                >
                  <span className="material-symbols-outlined text-sm">delete</span>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MessagesAdmin;
