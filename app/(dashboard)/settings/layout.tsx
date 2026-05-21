import { SettingsNav } from "@/components/settings/settings-nav";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="px-4 py-4 sm:px-5 lg:px-6">
      <h1 className="font-display text-2xl font-bold text-white">Settings</h1>
      <p className="mt-1 text-sm text-gray-400">Manage your account and preferences</p>
      <SettingsNav />
      {children}
    </div>
  );
}
