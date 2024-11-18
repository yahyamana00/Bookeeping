"use client";

import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { SidebarNav } from "@/components/dashboard/sidebar-nav";
import { UserHeader } from "@/components/dashboard/user-header";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { StatsGrid } from "@/components/dashboard/stats-grid";
import { ActivityChart } from "@/components/dashboard/activity-chart";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { ContactsList } from "@/components/dashboard/contacts-list";
import { SendMoney } from "@/components/dashboard/send-money";

export default function DashboardPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/auth/login');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-neutral-900">
      <SidebarNav />
      
      <div className="ml-16 p-8">
        <div className="max-w-7xl mx-auto grid grid-cols-12 gap-8">
          <div className="col-span-8">
            <UserHeader />
            <QuickActions />
            <StatsGrid />
            <div className="grid grid-cols-2 gap-8">
              <ActivityChart />
              <RecentActivity />
            </div>
          </div>
          
          <div className="col-span-4">
            <div className="sticky top-8">
              <ContactsList />
              <SendMoney />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}