"use client";

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { employeesApi } from '@/lib/api/employees';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';

interface AddEmployeeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddEmployeeDialog({ open, onOpenChange }: AddEmployeeDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    weeklyHours: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await employeesApi.createEmployee({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        role: formData.role,
        weeklyHours: parseInt(formData.weeklyHours),
        hireDate: new Date().toISOString(),
      });

      toast({
        title: "Success",
        description: "Employee added successfully",
      });

      // Reset form and close dialog
      setFormData({
        name: '',
        email: '',
        phone: '',
        role: '',
        weeklyHours: '',
      });
      onOpenChange(false);

    } catch (error) {
      console.error('Error adding employee:', error);
      toast({
        title: "Error",
        description: "Failed to add employee. Please try again.",
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
          <DialogTitle>Add New Employee</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-neutral-800 border border-neutral-700 rounded-xl p-3 text-white"
              required
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-neutral-800 border border-neutral-700 rounded-xl p-3 text-white"
              required
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full bg-neutral-800 border border-neutral-700 rounded-xl p-3 text-white"
              required
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <select
              id="role"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full bg-neutral-800 border border-neutral-700 rounded-xl p-3 text-white"
              required
              disabled={isLoading}
            >
              <option value="">Select a role</option>
              <option value="Store Manager">Store Manager</option>
              <option value="Sales Associate">Sales Associate</option>
              <option value="Cashier">Cashier</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="weeklyHours">Weekly Hours</Label>
            <input
              id="weeklyHours"
              type="number"
              min="0"
              max="168"
              value={formData.weeklyHours}
              onChange={(e) => setFormData({ ...formData, weeklyHours: e.target.value })}
              className="w-full bg-neutral-800 border border-neutral-700 rounded-xl p-3 text-white"
              required
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-purple-600 text-white rounded-xl p-3 font-medium hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
            {isLoading ? 'Adding Employee...' : 'Add Employee'}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}