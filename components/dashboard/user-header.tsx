"use client";

import { Bell } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';
import Image from 'next/image';

export function UserHeader() {
  const { user } = useAuth();

  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-3">
        <Image
          src={user?.avatarUrl || 'https://ui-avatars.com/api/?name=' + (user?.name || 'User')}
          alt={user?.name || 'User'}
          width={40}
          height={40}
          className="rounded-full"
        />
        <div>
          <h1 className="text-xl font-semibold">Welcome Back {user?.name || 'User'}!</h1>
          <p className="text-sm text-neutral-400">Joined 6 months ago</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 rounded-xl hover:bg-neutral-800">
          <Bell className="w-5 h-5 text-neutral-400" />
        </button>
        <button className="px-4 py-1 bg-green-500/10 text-green-500 rounded-full text-sm">
          2 NEW UPDATES
        </button>
      </div>
    </div>
  );
}