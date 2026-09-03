import React, { useState } from "react";
import Header from "../components/Header";
import {
  Activity,
  Bell,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Download,
  Eye,
  EyeOff,
  FileLock2,
  KeyRound,
  Info,
  LockKeyhole,
  Mail,
  MessageSquare,
  Monitor,
  Package,
  Pencil,
  Settings2,
  ShieldCheck,
  SlidersHorizontal,
  Smartphone,
  Trash2,
  Wrench,
  UserRound,
} from "lucide-react";

const menuItems = [
  {
    id: "profile",
    label: "Profile Information",
    icon: UserRound,
  },
  {
    id: "password",
    label: "Change Password",
    icon: LockKeyhole,
  },
  {
    id: "notifications",
    label: "Notification Settings",
    icon: Bell,
  },
  {
    id: "system",
    label: "System Preferences",
    icon: SlidersHorizontal,
  },
  {
    id: "security",
    label: "Security",
    icon: ShieldCheck,
  },
  {
    id: "activity",
    label: "Activity Log",
    icon: Activity,
  },
];

export default function Settings() {
  const [activeMenu, setActiveMenu] = useState("profile");

  const [twoFactor, setTwoFactor] = useState(false);

  const [preferences, setPreferences] = useState({
    language: "English (US)",
    dateFormat: "DD MMM YYYY",
    timeFormat: "12 Hour (AM/PM)",
    timezone: "(GMT-05:00) Eastern Time (US & Canada)",
  });

  const [passwords, setPasswords] = useState({
    current: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    newPassword: false,
    confirmPassword: false,
  });

  const handlePasswordChange = (key, value) => {
    setPasswords((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const saveSystemPreferences = () => {
    console.log("System Preferences:", preferences);

    // Later:
    // await axios.put("/api/settings/preferences", preferences);
  };

  return (
    <main className="min-h-screen bg-[#f8f9fc] px-4 py-5 font-['Geist',sans-serif] text-slate-900">
      {/* HEADER */}
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-[-0.02em] text-slate-900">{activeMenu === "password" ? "Change Password" : activeMenu === "notifications" ? "Notification Settings" : activeMenu === "system" ? "System Preferences" : activeMenu === "security" ? "Security" : activeMenu === "activity" ? "Activity Log" : "Settings"}</h1>
          <p className="mt-1 text-sm font-normal text-slate-500">{activeMenu === "password" ? "Update your password regularly to keep your account secure." : activeMenu === "notifications" ? "Manage how and when you receive notifications." : activeMenu === "system" ? "Customize inventory behavior and system preferences." : activeMenu === "security" ? "Manage your account security and protection settings." : activeMenu === "activity" ? "Review account and inventory activity across the system." : "Manage your account, preferences and system configurations."}</p>
        </div>
        <Header />
      </div>

      {/* MAIN GRID */}
      <section className="grid grid-cols-[210px_minmax(0,1.55fr)_minmax(300px,0.85fr)] gap-4">
        {/* LEFT MENU */}
        <aside className="rounded-xl border border-slate-200 bg-white p-3">
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = activeMenu === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveMenu(item.id)}
                  className={`flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm font-medium transition ${
                    active
                      ? "bg-violet-50 text-violet-600"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <Icon size={14} />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </aside>

        {activeMenu === "password" ? (
          <ChangePasswordPanel />
        ) : activeMenu === "notifications" ? (
          <NotificationSettingsPanel />
        ) : activeMenu === "system" ? (
          <SystemPreferencesPanel />
        ) : activeMenu === "security" ? (
          <SecurityPanel />
        ) : activeMenu === "activity" ? (
          <ActivityLogPanel />
        ) : (
        <>
        {/* CENTER */}
        <div className="space-y-4">
          {/* PROFILE */}
          <section className="overflow-hidden rounded-xl border border-slate-200 bg-white">
            <div className="flex items-start justify-between border-b border-slate-200 px-4 py-4">
              <div>
                <h2 className="text-base font-semibold">
                  Profile Information
                </h2>

                <p className="mt-1 text-xs font-normal text-slate-500">
                  View and manage your account details.
                </p>
              </div>

              <button className="flex h-8 items-center gap-2 rounded-md border border-violet-300 px-3 text-xs font-semibold text-violet-600 hover:bg-violet-50">
                <Pencil size={12} />
                Request Change
              </button>
            </div>

            <div className="grid grid-cols-[120px_1fr] gap-5 p-4">
              {/* Avatar */}
              <div className="flex items-start justify-center">
                <div className="relative">
                  <div className="grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-slate-700 to-slate-900 text-lg font-semibold text-white">
                    IA
                  </div>

                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-emerald-500" />
                </div>
              </div>

              {/* Details */}
              <div className="grid grid-cols-3 gap-x-8 gap-y-6">
                <ProfileItem
                  label="Full Name"
                  value="Inventory Admin"
                />

                <ProfileItem
                  label="Employee ID"
                  value="INV-ADMIN-001"
                />

                <ProfileItem
                  label="Email Address"
                  value="admin@survilltech.com"
                />

                <ProfileItem
                  label="Phone Number"
                  value="+1 (555) 123-4567"
                />

                <ProfileItem
                  label="Department"
                  value="Inventory Management"
                />

                <ProfileItem
                  label="Role"
                  value="Administrator"
                />

                <ProfileItem
                  label="Joined On"
                  value="15 January 2024"
                />
              </div>
            </div>
          </section>


          {/* PASSWORD */}
          <section className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="mb-4 flex items-start justify-between">
              <div>
                <h2 className="text-base font-semibold">
                  Change Password
                </h2>

                <p className="mt-1 text-xs font-normal text-slate-500">
                  Update your password regularly to keep your account secure.
                </p>
              </div>

              <button className="flex h-8 items-center gap-2 rounded-md border border-violet-300 px-3 text-xs font-semibold text-violet-600 hover:bg-violet-50">
                <LockKeyhole size={12} />
                Change Password
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <PasswordField
                label="Current Password"
                placeholder="Enter current password"
                value={passwords.current}
                visible={showPasswords.current}
                onChange={(value) =>
                  handlePasswordChange("current", value)
                }
                onToggle={() =>
                  setShowPasswords((current) => ({
                    ...current,
                    current: !current.current,
                  }))
                }
              />

              <PasswordField
                label="New Password"
                placeholder="Enter new password"
                value={passwords.newPassword}
                visible={showPasswords.newPassword}
                onChange={(value) =>
                  handlePasswordChange("newPassword", value)
                }
                onToggle={() =>
                  setShowPasswords((current) => ({
                    ...current,
                    newPassword: !current.newPassword,
                  }))
                }
              />

              <PasswordField
                label="Confirm New Password"
                placeholder="Confirm new password"
                value={passwords.confirmPassword}
                visible={showPasswords.confirmPassword}
                onChange={(value) =>
                  handlePasswordChange("confirmPassword", value)
                }
                onToggle={() =>
                  setShowPasswords((current) => ({
                    ...current,
                    confirmPassword: !current.confirmPassword,
                  }))
                }
              />
            </div>
          </section>
        </div>

        {/* RIGHT */}
        <aside className="space-y-4">
          {/* SYSTEM PREFERENCES */}
          <section className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="mb-4">
              <h2 className="text-base font-semibold">
                System Preferences
              </h2>

              <p className="mt-1 text-xs font-normal text-slate-500">
                Customize the system to match your workflow.
              </p>
            </div>

            <div className="space-y-3">
              <SettingsSelect
                label="Language"
                value={preferences.language}
                onChange={(value) =>
                  setPreferences((current) => ({
                    ...current,
                    language: value,
                  }))
                }
                options={[
                  "English (US)",
                  "English (UK)",
                  "Hindi",
                ]}
              />

              <SettingsSelect
                label="Date Format"
                value={preferences.dateFormat}
                onChange={(value) =>
                  setPreferences((current) => ({
                    ...current,
                    dateFormat: value,
                  }))
                }
                options={[
                  "DD MMM YYYY",
                  "DD/MM/YYYY",
                  "MM/DD/YYYY",
                  "YYYY-MM-DD",
                ]}
              />

              <SettingsSelect
                label="Time Format"
                value={preferences.timeFormat}
                onChange={(value) =>
                  setPreferences((current) => ({
                    ...current,
                    timeFormat: value,
                  }))
                }
                options={[
                  "12 Hour (AM/PM)",
                  "24 Hour",
                ]}
              />

              <SettingsSelect
                label="Timezone"
                value={preferences.timezone}
                onChange={(value) =>
                  setPreferences((current) => ({
                    ...current,
                    timezone: value,
                  }))
                }
                options={[
                  "(GMT-05:00) Eastern Time (US & Canada)",
                  "(GMT-06:00) Central Time",
                  "(GMT-07:00) Mountain Time",
                  "(GMT-08:00) Pacific Time",
                ]}
              />
            </div>

            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={saveSystemPreferences}
                className="h-8 rounded-md bg-gradient-to-r from-violet-600 to-indigo-600 px-4 text-xs font-semibold text-white hover:brightness-95"
              >
                Save Changes
              </button>
            </div>
          </section>

          {/* SECURITY */}
          <section className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="mb-4">
              <h2 className="text-base font-semibold">
                Security
              </h2>

              <p className="mt-1 text-xs font-normal text-slate-500">
                Manage your account security settings.
              </p>
            </div>

            <div className="divide-y divide-slate-100">
              <div className="flex min-h-[52px] items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-700">
                    Two-Factor Authentication
                  </p>

                  <p className="mt-1 text-xs font-normal text-slate-400">
                    Add an extra layer of security to your account
                  </p>
                </div>

                <Toggle
                  checked={twoFactor}
                  onChange={() => setTwoFactor((value) => !value)}
                />
              </div>

              <RightLink
                title="Active Sessions"
                subtitle="Manage your active sessions"
              />

              <RightLink
                title="Login History"
                subtitle="View your recent login activity"
              />
            </div>
          </section>

          {/* QUICK ACTIONS */}
          <section className="rounded-xl border border-slate-200 bg-white p-4">
            <h2 className="mb-3 text-base font-semibold">
              Quick Actions
            </h2>

            <div className="space-y-2">
              <QuickAction
                icon={Download}
                title="Download My Data"
                subtitle="Export your account data"
              />

              <QuickAction
                icon={KeyRound}
                title="Deactivate Account"
                subtitle="Temporarily deactivate your account"
              />

              <QuickAction
                icon={FileLock2}
                title="Privacy Policy"
                subtitle="View our privacy policy"
              />
            </div>
          </section>
        </aside>
        </>
        )}
      </section>
    </main>
  );
}

const activityRows = [
  { date: "May 26, 2025", time: "10:24 AM", user: "Inventory Admin", role: "Administrator", initials: "IA", category: "Asset", action: "Created", details: 'Created asset “Dell Monitor 24”', reference: "Asset ID: AST-2456", ip: "192.168.1.45", icon: Activity, tone: "emerald" },
  { date: "May 26, 2025", time: "09:15 AM", user: "Priya Sharma", role: "Inventory Manager", initials: "PS", category: "Asset", action: "Updated", details: 'Updated details of “HP Laptop 15”', reference: "Asset ID: AST-2451", ip: "192.168.1.32", icon: Pencil, tone: "blue" },
  { date: "May 25, 2025", time: "04:48 PM", user: "Rohit Kumar", role: "Team Lead", initials: "RK", category: "Transfer", action: "Transferred", details: 'Transferred “Logitech Keyboard”', reference: "From: HR Dept.  To: Ops Dept.", ip: "192.168.1.28", icon: SlidersHorizontal, tone: "orange" },
  { date: "May 25, 2025", time: "11:30 AM", user: "Anita Verma", role: "HR Manager", initials: "AV", category: "Assignment", action: "Assigned", details: 'Assigned “Dell Monitor 24”', reference: "To: Rahul Singh", ip: "192.168.1.19", icon: UserRound, tone: "violet" },
  { date: "May 24, 2025", time: "03:22 PM", user: "Inventory Admin", role: "Administrator", initials: "IA", category: "Asset", action: "Deleted", details: 'Removed asset “USB Mouse”', reference: "Asset ID: AST-2100", ip: "192.168.1.45", icon: Trash2, tone: "rose" },
  { date: "May 24, 2025", time: "09:05 AM", user: "Neha Patel", role: "Finance Executive", initials: "NP", category: "Security", action: "Login", details: "User logged into the system", reference: "", ip: "192.168.1.33", icon: LockKeyhole, tone: "amber" },
  { date: "May 23, 2025", time: "06:40 PM", user: "Inventory Admin", role: "Administrator", initials: "IA", category: "System", action: "Updated", details: "Updated low stock alert threshold", reference: "New Threshold: 10 items", ip: "192.168.1.45", icon: Settings2, tone: "cyan" },
];

const activityTones = { emerald: "bg-emerald-50 text-emerald-600", blue: "bg-blue-50 text-blue-600", orange: "bg-orange-50 text-orange-600", violet: "bg-violet-50 text-violet-600", rose: "bg-rose-50 text-rose-600", amber: "bg-amber-50 text-amber-600", cyan: "bg-cyan-50 text-cyan-600" };

function ActivityLogPanel() {
  const [category, setCategory] = useState("All Categories");
  const [user, setUser] = useState("All Users");
  const [page, setPage] = useState(1);
  const rows = activityRows.filter((row) => (category === "All Categories" || row.category === category) && (user === "All Users" || row.user === user));
  return (
    <div className="col-span-2 space-y-4">
      <section className="grid grid-cols-[1.15fr_1fr_1fr_auto] items-end gap-4 rounded-xl border border-slate-200 bg-white p-5">
        <label><span className="mb-2 block text-xs font-semibold text-slate-600">Date Range</span><div className="flex h-10 items-center gap-2 rounded-lg border border-slate-200 px-3 text-sm font-medium text-slate-700"><CalendarDays size={15} className="text-slate-500" />May 19, 2025 - May 26, 2025</div></label>
        <PreferenceSelect label="Category" value={category} onChange={setCategory} options={["All Categories", "Asset", "Transfer", "Assignment", "Security", "System"]} className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm font-medium text-slate-700 outline-none" />
        <PreferenceSelect label="User" value={user} onChange={setUser} options={["All Users", "Inventory Admin", "Priya Sharma", "Rohit Kumar", "Anita Verma", "Neha Patel"]} className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm font-medium text-slate-700 outline-none" />
        <button type="button" className="flex h-10 items-center gap-2 rounded-lg border border-violet-300 px-5 text-sm font-semibold text-violet-600 hover:bg-violet-50"><Download size={15} />Export</button>
      </section>
      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="overflow-x-auto"><table className="w-full min-w-[980px] border-collapse"><thead><tr className="bg-slate-50">{["Date & Time", "User", "Category", "Action", "Details", "IP Address"].map((heading) => <th key={heading} className="border-b border-slate-200 px-5 py-4 text-left text-xs font-semibold text-slate-600">{heading}</th>)}</tr></thead>
        <tbody>{rows.map((row, index) => { const Icon = row.icon; return <tr key={`${row.date}-${row.time}`} className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50/60"><td className="px-5 py-3"><div className="flex items-center gap-3"><span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full ${activityTones[row.tone]}`}><Icon size={17} /></span><div><p className="text-sm font-semibold text-slate-800">{row.date}</p><p className="mt-1 text-xs text-slate-500">{row.time}</p></div></div></td><td className="px-5 py-3"><div className="flex items-center gap-3"><span className={`grid h-9 w-9 place-items-center rounded-full text-xs font-bold text-white ${index % 2 ? "bg-slate-700" : "bg-indigo-600"}`}>{row.initials}</span><div><p className="text-sm font-semibold text-slate-800">{row.user}</p><p className="mt-1 text-xs text-slate-500">{row.role}</p></div></div></td><td className="px-5 py-3"><span className={`inline-flex rounded-md px-2.5 py-1.5 text-xs font-semibold ${activityTones[row.tone]}`}>{row.category}</span></td><td className="px-5 py-3 text-sm font-medium text-slate-700">{row.action}</td><td className="px-5 py-3"><p className="text-sm font-medium text-slate-700">{row.details}</p>{row.reference && <p className="mt-1 text-xs text-slate-500">{row.reference}</p>}</td><td className="px-5 py-3 text-xs font-medium text-slate-600">{row.ip}</td></tr>; })}</tbody></table></div>
        {rows.length === 0 && <div className="py-14 text-center text-sm text-slate-500">No activity found for the selected filters.</div>}
        <div className="flex min-h-[64px] items-center justify-between border-t border-slate-100 px-5"><p className="text-xs text-slate-500">Showing 1 to {rows.length} of 45 results</p><div className="flex items-center gap-2"><ActivityPageButton onClick={() => setPage((current) => Math.max(1, current - 1))}><ChevronLeft size={14} /></ActivityPageButton>{[1,2,3].map((number) => <ActivityPageButton key={number} active={page === number} onClick={() => setPage(number)}>{number}</ActivityPageButton>)}<span className="px-1 text-xs text-slate-400">...</span><ActivityPageButton active={page === 7} onClick={() => setPage(7)}>7</ActivityPageButton><ActivityPageButton onClick={() => setPage((current) => Math.min(7, current + 1))}><ChevronRight size={14} /></ActivityPageButton></div></div>
      </section>
    </div>
  );
}

function ActivityPageButton({ children, active, onClick }) { return <button type="button" onClick={onClick} className={`grid h-9 min-w-9 place-items-center rounded-lg border px-2 text-xs font-semibold ${active ? "border-violet-600 bg-violet-600 text-white" : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"}`}>{children}</button>; }
function SecurityPanel() {
  const [securityOpen, setSecurityOpen] = useState(true);
  const rows = [
    { title: "Two-Factor Authentication (2FA)", subtitle: "Add an extra layer of security to your account.", icon: ShieldCheck, action: <span className="rounded-md bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-600">Enabled</span> },
    { title: "Active Sessions", subtitle: "Manage devices that are currently signed in to your account.", icon: Monitor, action: <span className="text-sm font-semibold text-violet-600">3 Active Sessions</span> },
    { title: "Login Activity", subtitle: "Review your recent login activity and devices.", icon: Activity, action: <span className="text-sm font-semibold text-violet-600">View Activity</span> },
  ];
  return (
    <div className="col-span-2 space-y-4">
      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        {rows.map((row) => { const Icon = row.icon; return <button key={row.title} type="button" className="flex min-h-[92px] w-full items-center gap-4 border-b border-slate-100 px-6 text-left transition hover:bg-slate-50/60"><span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-violet-50 text-violet-600"><Icon size={22} /></span><span className="min-w-0 flex-1"><span className="block text-base font-semibold text-slate-900">{row.title}</span><span className="mt-1 block text-sm text-slate-500">{row.subtitle}</span></span>{row.action}<ChevronRight size={18} className="ml-3 text-slate-600" /></button>; })}
        <div className="border-b border-slate-100">
          <button type="button" onClick={() => setSecurityOpen((open) => !open)} className="flex min-h-[92px] w-full items-center gap-4 px-6 text-left transition hover:bg-slate-50/60"><span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-violet-50 text-violet-600"><Wrench size={22} /></span><span className="min-w-0 flex-1"><span className="block text-base font-semibold text-slate-900">Account Security</span><span className="mt-1 block text-sm text-slate-500">Manage important security and account protection settings.</span></span>{securityOpen ? <ChevronUp size={18} /> : <ChevronRight size={18} />}</button>
          {securityOpen && <div className="mx-6 mb-6 overflow-hidden rounded-xl border border-slate-200 bg-slate-50/40"><div className="flex min-h-[68px] items-center gap-4 border-b border-slate-100 px-5"><LockKeyhole size={20} className="text-slate-600" /><div className="flex-1"><h3 className="text-sm font-semibold">Password Strength</h3><p className="mt-1 text-xs text-slate-500">Your password is strong.</p></div><span className="rounded-md bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-600">Strong</span></div><div className="flex min-h-[68px] items-center gap-4 px-5"><CalendarDays size={20} className="text-slate-600" /><div className="flex-1"><h3 className="text-sm font-semibold">Last Password Change</h3><p className="mt-1 text-xs text-slate-500">May 10, 2025 at 11:30 AM</p></div><span className="text-xs font-medium text-slate-600">16 days ago</span></div></div>}
        </div>
        <button type="button" className="flex min-h-[92px] w-full items-center gap-4 px-6 text-left transition hover:bg-rose-50/40"><span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-rose-50 text-rose-500"><Trash2 size={22} /></span><span className="min-w-0 flex-1"><span className="block text-base font-semibold text-slate-900">Delete Account</span><span className="mt-1 block text-sm text-slate-500">Permanently delete your account and all associated data.</span></span><span className="text-sm font-semibold text-rose-600">Delete Account</span><ChevronRight size={18} className="ml-3 text-slate-600" /></button>
      </section>
      <div className="flex items-center gap-3 rounded-xl border border-blue-200 bg-blue-50/70 px-5 py-4 text-sm text-blue-700"><Info size={19} className="shrink-0" />Keep your account secure by using a strong password and enabling two-factor authentication.</div>
    </div>
  );
}
function SystemPreferencesPanel() {
  const [settings, setSettings] = useState({ language: "English (US)", dateFormat: "MM/DD/YYYY", timeFormat: "12 Hour (AM/PM)", timezone: "(UTC-08:00) Pacific Time", autoApprove: true, threshold: "10", itemsPerPage: "25", dashboard: "Dashboard", timeout: "30 Minutes", sounds: true });
  const update = (key, value) => setSettings((current) => ({ ...current, [key]: value }));
  const selectClass = "h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 outline-none focus:border-violet-300 focus:ring-2 focus:ring-violet-100";
  return (
    <div className="col-span-2 space-y-4">
      <section className="rounded-xl border border-slate-200 bg-white p-5">
        <div className="flex items-start gap-4"><span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-violet-50 text-violet-600"><Settings2 size={22} /></span><div><h2 className="text-base font-semibold">1. General Settings</h2><p className="mt-1 text-xs text-slate-500">Set basic system preferences.</p></div></div>
        <div className="mt-6 grid grid-cols-4 gap-5">
          <PreferenceSelect label="Language" value={settings.language} onChange={(value) => update("language", value)} options={["English (US)", "English (UK)", "Hindi"]} className={selectClass} />
          <PreferenceSelect label="Date Format" value={settings.dateFormat} onChange={(value) => update("dateFormat", value)} options={["MM/DD/YYYY", "DD/MM/YYYY", "DD MMM YYYY"]} className={selectClass} />
          <PreferenceSelect label="Time Format" value={settings.timeFormat} onChange={(value) => update("timeFormat", value)} options={["12 Hour (AM/PM)", "24 Hour"]} className={selectClass} />
          <PreferenceSelect label="Timezone" value={settings.timezone} onChange={(value) => update("timezone", value)} options={["(UTC-08:00) Pacific Time", "(UTC-05:00) Eastern Time", "(UTC+05:30) India Standard Time"]} className={selectClass} />
        </div>
      </section>
      <PreferenceSection number="2" title="Inventory Preferences" subtitle="Set default behaviors for inventory management." icon={Package}>
        <PreferenceToggleRow title="Auto approve asset assignments" subtitle="Automatically approve new asset assignments." checked={settings.autoApprove} onChange={() => update("autoApprove", !settings.autoApprove)} />
        <PreferenceValueRow title="Low stock alert threshold" subtitle="Get notified when stock falls below this number."><div className="flex h-10 w-40 items-center rounded-lg border border-slate-200 px-3"><input value={settings.threshold} onChange={(event) => update("threshold", event.target.value)} className="min-w-0 flex-1 bg-transparent text-sm font-medium outline-none" /><span className="text-xs text-slate-500">items</span></div></PreferenceValueRow>
      </PreferenceSection>
      <PreferenceSection number="3" title="Display Preferences" subtitle="Customize how information is displayed." icon={Monitor}>
        <PreferenceValueRow title="Items per page" subtitle="Select how many records to show per page."><select value={settings.itemsPerPage} onChange={(event) => update("itemsPerPage", event.target.value)} className="h-10 w-40 rounded-lg border border-slate-200 px-3 text-sm font-medium outline-none"><option>10</option><option>25</option><option>50</option></select></PreferenceValueRow>
        <PreferenceValueRow title="Default dashboard view" subtitle="Choose your default landing page."><select value={settings.dashboard} onChange={(event) => update("dashboard", event.target.value)} className="h-10 w-40 rounded-lg border border-slate-200 px-3 text-sm font-medium outline-none"><option>Dashboard</option><option>All Assets</option><option>Reports</option></select></PreferenceValueRow>
      </PreferenceSection>
      <PreferenceSection number="4" title="Other Preferences" subtitle="Other system related preferences." icon={SlidersHorizontal}>
        <PreferenceValueRow title="Session timeout" subtitle="Automatically log out after a period of inactivity."><select value={settings.timeout} onChange={(event) => update("timeout", event.target.value)} className="h-10 w-40 rounded-lg border border-slate-200 px-3 text-sm font-medium outline-none"><option>15 Minutes</option><option>30 Minutes</option><option>1 Hour</option></select></PreferenceValueRow>
        <PreferenceToggleRow title="Enable sound alerts" subtitle="Play sound for important notifications." checked={settings.sounds} onChange={() => update("sounds", !settings.sounds)} />
      </PreferenceSection>
      <button type="button" className="flex h-10 items-center gap-2 rounded-lg bg-violet-600 px-5 text-sm font-semibold text-white shadow-sm hover:bg-violet-700"><FileLock2 size={15} />Save Preferences</button>
    </div>
  );
}

function PreferenceSection({ number, title, subtitle, icon: Icon, children }) {
  return <section className="grid grid-cols-[270px_1fr] rounded-xl border border-slate-200 bg-white p-5"><div className="flex items-start gap-4 border-r border-slate-200 pr-5"><span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-violet-50 text-violet-600"><Icon size={21} /></span><div><h2 className="text-base font-semibold">{number}. {title}</h2><p className="mt-1 text-xs leading-5 text-slate-500">{subtitle}</p></div></div><div className="divide-y divide-slate-100 pl-5">{children}</div></section>;
}

function PreferenceValueRow({ title, subtitle, children }) {
  return <div className="flex min-h-[68px] items-center justify-between gap-4 first:pt-0"><div><h3 className="text-sm font-semibold text-slate-900">{title}</h3><p className="mt-1 text-xs text-slate-500">{subtitle}</p></div>{children}</div>;
}

function PreferenceToggleRow({ title, subtitle, checked, onChange }) {
  return <PreferenceValueRow title={title} subtitle={subtitle}><Toggle checked={checked} onChange={onChange} /></PreferenceValueRow>;
}

function PreferenceSelect({ label, value, onChange, options, className }) {
  return <label><span className="mb-2 block text-xs font-semibold text-slate-600">{label}</span><select value={value} onChange={(event) => onChange(event.target.value)} className={className}>{options.map((option) => <option key={option}>{option}</option>)}</select></label>;
}
function NotificationSettingsPanel() {
  const [channels, setChannels] = useState({ email: true, inApp: true, sms: false });
  const [types, setTypes] = useState({ lowStock: true, assignments: true, transfers: true, repairs: false, announcements: true });
  const toggleChannel = (key) => setChannels((current) => ({ ...current, [key]: !current[key] }));
  const toggleType = (key) => setTypes((current) => ({ ...current, [key]: !current[key] }));
  const channelItems = [
    { id: "email", title: "Email", subtitle: "admin@survilltech.com", icon: Mail, color: "bg-violet-50 text-violet-600" },
    { id: "inApp", title: "In-App", subtitle: "Receive in-app notifications", icon: Smartphone, color: "bg-emerald-50 text-emerald-600" },
    { id: "sms", title: "SMS", subtitle: "+1 (555) 123-4567", icon: MessageSquare, color: "bg-amber-50 text-amber-500" },
  ];
  const typeItems = [
    { id: "lowStock", title: "Low Stock Alerts", subtitle: "Get notified when consumables are running low.", icon: Activity, color: "bg-emerald-50 text-emerald-600" },
    { id: "assignments", title: "Asset Assignments", subtitle: "Get notified when assets are assigned to you or your team.", icon: FileLock2, color: "bg-orange-50 text-orange-500" },
    { id: "transfers", title: "Asset Transfer Updates", subtitle: "Receive updates about asset transfers and approvals.", icon: SlidersHorizontal, color: "bg-blue-50 text-blue-600" },
    { id: "repairs", title: "Repairs & Maintenance", subtitle: "Get notified about repairs and maintenance updates.", icon: Settings2, color: "bg-violet-50 text-violet-600" },
    { id: "announcements", title: "System Announcements", subtitle: "Important system updates and announcements.", icon: Bell, color: "bg-amber-50 text-amber-500" },
  ];

  return (
    <section className="col-span-2 min-h-[620px] rounded-xl border border-slate-200 bg-white p-6">
      <div><h2 className="text-lg font-semibold text-slate-900">Delivery Channels</h2><p className="mt-1 text-sm text-slate-500">Select how you want to receive notifications.</p></div>
      <div className="mt-6 grid grid-cols-3 gap-4">
        {channelItems.map((item) => { const Icon = item.icon; return <article key={item.id} className="flex min-h-[92px] items-center gap-4 rounded-xl border border-slate-200 px-5 py-4"><span className={`grid h-12 w-12 shrink-0 place-items-center rounded-full ${item.color}`}><Icon size={21} /></span><div className="min-w-0 flex-1"><h3 className="text-sm font-semibold text-slate-900">{item.title}</h3><p className="mt-1 truncate text-xs text-slate-500">{item.subtitle}</p></div><Toggle checked={channels[item.id]} onChange={() => toggleChannel(item.id)} /></article>; })}
      </div>
      <div className="my-7 border-t border-slate-100" />
      <div><h2 className="text-lg font-semibold text-slate-900">Notification Types</h2><p className="mt-1 text-sm text-slate-500">Select the important alerts you want to receive.</p></div>
      <div className="mt-5 overflow-hidden rounded-xl border border-slate-200">
        {typeItems.map((item) => { const Icon = item.icon; return <div key={item.id} className="flex min-h-[70px] items-center gap-4 border-b border-slate-100 px-5 py-3 last:border-b-0"><span className={`grid h-11 w-11 shrink-0 place-items-center rounded-full ${item.color}`}><Icon size={19} /></span><div className="min-w-0 flex-1"><h3 className="text-sm font-semibold text-slate-900">{item.title}</h3><p className="mt-1 text-xs text-slate-500">{item.subtitle}</p></div><Toggle checked={types[item.id]} onChange={() => toggleType(item.id)} /></div>; })}
      </div>
      <button type="button" className="mt-7 flex h-10 items-center gap-2 rounded-lg bg-violet-600 px-5 text-sm font-semibold text-white shadow-sm hover:bg-violet-700"><FileLock2 size={15} />Save Changes</button>
    </section>
  );
}
function ChangePasswordPanel() {
  const [values, setValues] = useState({ current: "", next: "", confirm: "" });
  const [visible, setVisible] = useState({ current: false, next: false, confirm: false });
  const update = (key, value) => setValues((current) => ({ ...current, [key]: value }));
  const toggle = (key) => setVisible((current) => ({ ...current, [key]: !current[key] }));
  const requirements = ["At least one uppercase letter (A-Z)", "At least one lowercase letter (a-z)", "At least one number (0-9)", "At least one special character", "Minimum 8 characters"];
  const tips = [["Aa", "Use a mix of uppercase and lowercase letters."], ["123", "Include numbers to make it harder to guess."], ["!@#", "Add special characters for extra security."], ["User", "Avoid using personal information."], ["↻", "Do not reuse old passwords."]];
  return (
    <div className="col-span-2 grid grid-cols-[minmax(0,1.45fr)_minmax(280px,0.85fr)] items-start gap-4">
      <section className="rounded-xl border border-slate-200 bg-white p-6">
        <div className="mb-7"><h2 className="text-lg font-semibold text-slate-900">Change Password</h2><p className="mt-1 text-sm text-slate-500">Please enter your current password and choose a new password.</p></div>
        <div className="space-y-6">
          <PasswordField label="Current Password" placeholder="Enter your current password" value={values.current} visible={visible.current} onChange={(value) => update("current", value)} onToggle={() => toggle("current")} />
          <div><PasswordField label="New Password" placeholder="Enter your new password" value={values.next} visible={visible.next} onChange={(value) => update("next", value)} onToggle={() => toggle("next")} /><p className="mt-2 text-xs text-slate-500">Password must be at least 8 characters long and include:</p><div className="mt-3 space-y-2">{requirements.map((requirement) => <p key={requirement} className="flex items-center gap-2 text-xs text-slate-600"><span className="font-bold text-emerald-500">✓</span>{requirement}</p>)}</div></div>
          <div><PasswordField label="Confirm New Password" placeholder="Re-enter your new password" value={values.confirm} visible={visible.confirm} onChange={(value) => update("confirm", value)} onToggle={() => toggle("confirm")} /><p className="mt-2 text-xs text-slate-500">Re-enter your new password to confirm.</p></div>
        </div>
        <div className="mt-8 flex justify-end gap-3"><button type="button" className="h-10 min-w-32 rounded-lg border border-slate-200 px-5 text-sm font-semibold text-slate-700 hover:bg-slate-50">Cancel</button><button type="button" className="flex h-10 items-center gap-2 rounded-lg bg-violet-600 px-5 text-sm font-semibold text-white hover:bg-violet-700"><LockKeyhole size={15} />Update Password</button></div>
      </section>
      <aside className="space-y-4">
        <section className="rounded-xl border border-slate-200 bg-white p-5"><span className="grid h-12 w-12 place-items-center rounded-full bg-violet-50 text-violet-600"><ShieldCheck size={22} /></span><h2 className="mt-4 text-base font-semibold">Password Tips</h2><p className="mt-1 text-xs text-slate-500">Follow these tips to create a strong password.</p><div className="mt-5 space-y-4">{tips.map(([mark, text]) => <div key={text} className="flex items-center gap-3"><span className="grid h-8 min-w-8 place-items-center rounded-lg bg-violet-50 px-1 text-[10px] font-bold text-violet-600">{mark}</span><p className="text-xs leading-5 text-slate-600">{text}</p></div>)}</div></section>
        <section className="rounded-xl border border-slate-200 bg-white p-5"><span className="grid h-12 w-12 place-items-center rounded-full bg-violet-50 text-violet-600"><Activity size={21} /></span><h2 className="mt-4 text-base font-semibold">Last Password Change</h2><p className="mt-4 text-sm font-medium text-slate-700">12 May 2024, 10:30 AM</p><p className="mt-1 text-xs text-slate-500">by Inventory Admin</p></section>
      </aside>
    </div>
  );
}
function ProfileItem({ label, value }) {
  return (
    <div>
      <p className="text-xs font-normal text-slate-400">
        {label}
      </p>

      <p className="mt-1.5 text-sm font-medium text-slate-700">
        {value}
      </p>
    </div>
  );
}

function Toggle({
  checked,
  onChange,
}) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`relative h-[22px] w-[38px] rounded-full transition ${
        checked
          ? "bg-violet-600"
          : "bg-slate-300"
      }`}
    >
      <span
        className={`absolute top-[3px] h-4 w-4 rounded-full bg-white shadow-sm transition ${
          checked
            ? "left-[19px]"
            : "left-[3px]"
        }`}
      />
    </button>
  );
}

function PasswordField({
  label,
  placeholder,
  value,
  visible,
  onChange,
  onToggle,
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-slate-500">
        {label}
      </label>

      <div className="flex h-9 items-center rounded-md border border-slate-200 bg-white px-3">
        <input
          type={visible ? "text" : "password"}
          value={value}
          onChange={(e) =>
            onChange(e.target.value)
          }
          placeholder={placeholder}
          className="min-w-0 flex-1 bg-transparent text-sm font-medium outline-none placeholder:text-slate-400"
        />

        <button
          type="button"
          onClick={onToggle}
          className="text-slate-400 hover:text-violet-600"
        >
          {visible ? (
            <EyeOff size={13} />
          ) : (
            <Eye size={13} />
          )}
        </button>
      </div>
    </div>
  );
}

function SettingsSelect({
  label,
  value,
  onChange,
  options,
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-slate-500">
        {label}
      </label>

      <select
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 outline-none focus:border-violet-300 focus:ring-2 focus:ring-violet-100"
      >
        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

function RightLink({
  title,
  subtitle,
}) {
  return (
    <button
      type="button"
      className="flex min-h-[52px] w-full items-center justify-between text-left"
    >
      <div>
        <p className="text-sm font-medium text-slate-700">
          {title}
        </p>

        <p className="mt-1 text-xs font-normal text-slate-400">
          {subtitle}
        </p>
      </div>

      <ChevronRight
        size={13}
        className="text-slate-400"
      />
    </button>
  );
}

function QuickAction({
  icon: Icon,
  title,
  subtitle,
}) {
  return (
    <button
      type="button"
      className="flex min-h-[48px] w-full items-center gap-3 rounded-md border border-slate-100 px-3 text-left transition hover:bg-slate-50"
    >
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-violet-50 text-violet-600">
        <Icon size={14} />
      </span>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-slate-700">
          {title}
        </p>

        <p className="mt-0.5 text-xs font-normal text-slate-400">
          {subtitle}
        </p>
      </div>

      <ChevronRight
        size={13}
        className="text-slate-400"
      />
    </button>
  );
}









