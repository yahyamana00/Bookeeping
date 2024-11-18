"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Users } from 'lucide-react';

const employees = [
  { 
    id: '1',
    name: 'Sarah Wilson',
    image: 'https://ui-avatars.com/api/?name=Sarah+Wilson&background=random',
    role: 'Store Manager'
  },
  { 
    id: '2',
    name: 'Michael Chen',
    image: 'https://ui-avatars.com/api/?name=Michael+Chen&background=random',
    role: 'Sales Associate'
  },
  { 
    id: '3',
    name: 'Emma Davis',
    image: 'https://ui-avatars.com/api/?name=Emma+Davis&background=random',
    role: 'Cashier'
  },
  { 
    id: '4',
    name: 'James Miller',
    image: 'https://ui-avatars.com/api/?name=James+Miller&background=random',
    role: 'Sales Associate'
  },
];

export function ContactsList() {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium">Active Employees</h3>
        <Link 
          href="/dashboard/employees"
          className="text-xs text-neutral-400 hover:text-white transition-colors flex items-center gap-1"
        >
          <Users className="w-3 h-3" />
          View All
        </Link>
      </div>

      <div className="space-y-2">
        {employees.map((employee) => (
          <div 
            key={employee.id}
            className="flex items-center gap-3 p-2 rounded-xl hover:bg-neutral-800/50 transition-colors"
          >
            <Image
              src={employee.image}
              alt={employee.name}
              width={32}
              height={32}
              className="rounded-full"
            />
            <div>
              <p className="text-sm font-medium">{employee.name}</p>
              <p className="text-xs text-neutral-400">{employee.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}