"use client";

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-neutral-900 pl-20">
      <div className="max-w-6xl mx-auto p-8">
        <div className="flex items-center gap-4 mb-8">
          <Link 
            href="/dashboard" 
            className="p-2 hover:bg-neutral-800 rounded-xl transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-semibold">Settings</h1>
        </div>

        <div className="bg-neutral-800/50 rounded-2xl p-6">
          <h2 className="text-lg font-medium mb-4">Coming Soon</h2>
          <p className="text-neutral-400">Settings page is under development.</p>
        </div>
      </div>
    </div>
  );
}