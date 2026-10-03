import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '@/lib/api';
import { 
  Plus, 
  Pencil, 
  Trash2, 
  Eye, 
  EyeOff,
  Loader2,
  Calendar,
  AlertTriangle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { 
  getAllEventsAdmin, 
  subscribeToEventsAdmin, 
  setFirestoreEventPublish, 
  deleteFirestoreEvent 
} from '@/lib/eventsService';

interface Event {
  id: string;
  title: string;
  start_date: string;
  published: boolean | number;
  snapshare_enabled: boolean | number;
}

export default function AdminEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Delete dialog state
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let isMounted = true;

    // Attach real-time listener for Firestore events collection
    const unsubscribe = subscribeToEventsAdmin(
      (firestoreEvents) => {
        if (isMounted) {
          setEvents(firestoreEvents as any);
          setLoading(false);
        }
      },
      async (_err) => {
        // Fallback to one-time fetch or server API
        try {
          const data = await getAllEventsAdmin();
          if (isMounted) setEvents(data as any);
        } catch {
          try {
            const apiData = await api.get<Event[]>('/api/admin/events');
            if (isMounted) setEvents(apiData || []);
          } catch (apiErr: any) {
            if (isMounted) setError(apiErr.message || 'Failed to load events');
          }
        } finally {
          if (isMounted) setLoading(false);
        }
      }
    );

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  const handleTogglePublish = async (id: string, currentStatus: boolean | number) => {
    const newStatus = !Boolean(currentStatus === true || currentStatus === 1);
    try {
      // 1. Update Firestore document
      await setFirestoreEventPublish(id, newStatus);
      // 2. Also notify server endpoint if running
      try {
        if (!newStatus) {
          await api.post(`/api/admin/events/${id}/unpublish`, {});
        } else {
          await api.post(`/api/admin/events/${id}/publish`, {});
        }
      } catch {
        // Server endpoint optional
      }
      setEvents(events.map(e => e.id === id ? { ...e, published: newStatus } : e));
    } catch (err) {
      console.error('Failed to toggle status', err);
      alert('Failed to update event status');
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      setIsDeleting(true);
      // 1. Delete from Firestore
      await deleteFirestoreEvent(deleteId);
      // 2. Also call server endpoint to clean associated media relations if any
      try {
        await api.delete(`/api/admin/events/${deleteId}`);
      } catch {
        // Server endpoint optional
      }
      setEvents(events.filter(e => e.id !== deleteId));
      setDeleteId(null);
    } catch (err) {
      console.error('Failed to delete event:', err);
      alert('Failed to delete event');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-dark-brown mb-2">Events Management</h1>
          <p className="text-dark-brown/60">Create, edit, and manage all your events.</p>
        </div>
        <Button asChild>
          <Link to="/admin/events/new">
            <Plus className="w-4 h-4" />
            Create New Event
          </Link>
        </Button>
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 p-6 rounded-2xl flex items-center gap-3">
          <AlertTriangle className="w-5 h-5" />
          <p>{error}</p>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 text-deep-red animate-spin" />
        </div>
      ) : (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-sm uppercase tracking-wider font-bold text-dark-brown/60">
                  <th className="p-4 pl-6">Title</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">SnapShare</th>
                  <th className="p-4 pr-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {events.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-dark-brown/60">
                      No events found. Create one to get started!
                    </td>
                  </tr>
                ) : (
                  events.map((event) => (
                    <tr key={event.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="p-4 pl-6 font-bold text-dark-brown">
                        {event.title}
                      </td>
                      <td className="p-4 text-dark-brown/70 flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {new Date(event.start_date).toLocaleDateString()}
                      </td>
                      <td className="p-4">
                        <Badge variant={event.published ? 'default' : 'secondary'}>
                          {event.published ? 'Published' : 'Draft'}
                        </Badge>
                      </td>
                      <td className="p-4">
                        {event.snapshare_enabled ? (
                          <Badge variant="festival">Enabled</Badge>
                        ) : (
                          <span className="text-sm text-gray-400">Disabled</span>
                        )}
                      </td>
                      <td className="p-4 pr-6">
                        <div className="flex items-center justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleTogglePublish(event.id, event.published)}
                            title={event.published ? 'Unpublish' : 'Publish'}
                          >
                            {event.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </Button>
                          <Button variant="ghost" size="icon" asChild title="Edit">
                            <Link to={`/admin/events/${event.id}`}>
                              <Pencil className="w-4 h-4" />
                            </Link>
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            onClick={() => setDeleteId(event.id)}
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <Dialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Event</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this event? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setDeleteId(null)}>Cancel</Button>
            <Button variant="default" onClick={handleDelete} disabled={isDeleting}>
              {isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Delete'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
