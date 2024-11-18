"use client";

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { AlertTriangle, Loader2 } from 'lucide-react';
import { employeesApi, Employee } from '@/lib/api/employees';
import { useToast } from '@/components/ui/use-toast';

interface RemoveEmployeeDialogProps {
  employee: Employee;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEmployeeRemoved: () => void;
}

export function RemoveEmployeeDialog({ 
  employee, 
  open, 
  onOpenChange,
  onEmployeeRemoved
}: RemoveEmployeeDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [reason, setReason] = useState('');
  const [notes, setNotes] = useState('');
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await employeesApi.terminateEmployee(
        employee.id,
        reason as 'fired' | 'quit' | 'no-show',
        notes
      );

      toast({
        title: "Success",
        description: "Employee removed successfully",
      });

      onEmployeeRemoved();
      onOpenChange(false);
    } catch (error) {
      console.error('Error removing employee:', error);
      toast({
        title: "Error",
        description: "Failed to remove employee",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-neutral-900 border-neutral-800">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-500">
            <AlertTriangle className="w-5 h-5" />
            Remove Employee
          </DialogTitle>
        </DialogHeader>

        <div className="mb-6">
          <p className="text-neutral-400">
            Are you sure you want to remove <span className="text-white">{employee.name}</span>? 
            This action cannot be undone.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="reason">Reason for Removal</Label>
            <select
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full bg-neutral-800 border border-neutral-700 rounded-xl p-3 text-white"
              required
              disabled={isLoading}
            >
              <option value="">Select a reason</option>
              <option value="fired">Fired</option>
              <option value="quit">Quit</option>
              <option value="no-show">No Show</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="w-full bg-neutral-800 border border-neutral-700 rounded-xl p-3 text-white"
              placeholder="Add any relevant details..."
              disabled={isLoading}
            />
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
              className="flex-1 bg-neutral-800 text-white rounded-xl p-3 font-medium hover:bg-neutral-700 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-red-600 text-white rounded-xl p-3 font-medium hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
              {isLoading ? 'Removing...' : 'Remove Employee'}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}