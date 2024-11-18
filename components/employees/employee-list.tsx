"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { MoreVertical, Mail, Phone, Clock, Loader2 } from 'lucide-react';
import { RemoveEmployeeDialog } from './remove-employee-dialog';
import { employeesApi, Employee } from '@/lib/api/employees';
import { useToast } from '@/components/ui/use-toast';

interface EmployeeListProps {
  searchQuery: string;
}

export function EmployeeList({ searchQuery }: EmployeeListProps) {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false);
  const { toast } = useToast();

  const fetchEmployees = async () => {
    try {
      setIsLoading(true);
      const response = await employeesApi.getEmployees('active');
      setEmployees(response.documents as Employee[]);
    } catch (error) {
      console.error('Error fetching employees:', error);
      toast({
        title: "Error",
        description: "Failed to fetch employees",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {filteredEmployees.length === 0 ? (
        <div className="text-center py-8 text-neutral-400">
          {searchQuery ? "No employees found matching your search" : "No employees added yet"}
        </div>
      ) : (
        filteredEmployees.map((employee) => (
          <div
            key={employee.id}
            className="bg-neutral-800/50 rounded-2xl p-4 flex items-center justify-between group"
          >
            <div className="flex items-center gap-4">
              <Image
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(employee.name)}&background=random`}
                alt={employee.name}
                width={48}
                height={48}
                className="rounded-xl"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-medium">{employee.name}</h3>
                  <span className="text-xs px-2 py-1 bg-green-500/10 text-green-500 rounded-full">
                    {employee.role}
                  </span>
                </div>
                <div className="flex items-center gap-4 mt-1">
                  <div className="flex items-center gap-1 text-sm text-neutral-400">
                    <Mail className="w-4 h-4" />
                    {employee.email}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-neutral-400">
                    <Phone className="w-4 h-4" />
                    {employee.phone}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-neutral-400">
                    <Clock className="w-4 h-4" />
                    {employee.weeklyHours}h/week
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setSelectedEmployee(employee);
                setIsRemoveDialogOpen(true);
              }}
              className="p-2 hover:bg-neutral-700 rounded-xl opacity-0 group-hover:opacity-100 transition-all"
            >
              <MoreVertical className="w-5 h-5 text-neutral-400" />
            </button>
          </div>
        ))
      )}

      {selectedEmployee && (
        <RemoveEmployeeDialog
          employee={selectedEmployee}
          open={isRemoveDialogOpen}
          onOpenChange={setIsRemoveDialogOpen}
          onEmployeeRemoved={fetchEmployees}
        />
      )}
    </div>
  );
}