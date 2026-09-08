import React, { useState } from "react";
import {
  CalendarDays,
  Pencil,
} from "lucide-react";

import Header from "../components/Header";
import EditProfileModal, { initials } from "../components/EditProfileModal";

export default function Profile() {
  const [editorOpen, setEditorOpen] = useState(false);
  const [profile, setProfile] = useState({
    fullName: "Inventory Admin",
    employeeId: "INV-ADMIN-001",
    email: "admin@survilltech.com",
    phone: "+1 (555) 123-4567",
    role: "Administrator",
    department: "Inventory Management",
    joiningDate: "2024-01-15",
    photo: "",
    accountStatus: "Active",
    jobTitle: "Inventory Administrator",
    workLocation: "Head Office",
    about:
      "Responsible for managing inventory, asset tracking, and system administration.",
  });

  return (
    <main className="min-h-screen bg-[#f8f9fc] px-4 py-5 font-['Geist',sans-serif] text-slate-900">
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-[-0.025em]">
            My Profile
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            View and manage your personal information.
          </p>
        </div>

        <Header />
      </div>

      {/* ================= PROFILE INFORMATION ================= */}
      <section className="mb-4 rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-[0_2px_8px_rgba(15,23,42,0.02)]">
        {/* Card Header */}
        <div className="flex items-start justify-between border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-base font-semibold text-slate-900">
              Profile Information
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Your personal and work information.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setEditorOpen(true)}
            className="flex h-9 items-center gap-2 rounded-md bg-gradient-to-r from-violet-600 to-indigo-600 px-4 text-sm font-medium text-white shadow-sm transition hover:brightness-95"
          >
            <Pencil size={13} />
            Edit Profile
          </button>
        </div>

        {/* Profile Content */}
        <div className="grid grid-cols-1 xl:grid-cols-[225px_minmax(0,1fr)] gap-6 pt-5">
          {/* LEFT PROFILE */}
          <div className="flex min-h-[245px] flex-col items-center justify-center border-b border-slate-200 px-5 pb-5 xl:border-b-0 xl:border-r xl:pb-0">
            <div className="grid h-[96px] w-[96px] place-items-center overflow-hidden rounded-full bg-gradient-to-br from-slate-800 to-slate-950 text-3xl font-medium text-white shadow-sm">
              {profile.photo ? <img src={profile.photo} alt={profile.fullName} className="h-full w-full object-cover" /> : initials(profile.fullName)}
            </div>

            <h3 className="mt-4 text-base font-semibold text-slate-900">
              {profile.fullName}
            </h3>

            <span className="mt-2 inline-flex items-center gap-1.5 rounded-md bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-600">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Active
            </span>
          </div>

          {/* RIGHT PROFILE DETAILS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <ProfileField
              label="Full Name"
              value={profile.fullName}
            />

            <ProfileField
              label="Employee ID"
              value={profile.employeeId}
            />

            <ProfileField
              label="Email Address"
              value={profile.email}
            />

            <ProfileField
              label="Phone Number"
              value={profile.phone}
            />

            <ProfileField
              label="Role"
              value={profile.role}
            />

            <ProfileField
              label="Department"
              value={profile.department}
            />

            {/* Joining Date */}
            <div>
              <p className="mb-1.5 text-xs font-medium text-slate-500">
                Date of Joining
              </p>

              <div className="flex h-[44px] items-center gap-3 rounded-md border border-slate-200 bg-slate-50/70 px-3">
                <CalendarDays
                  size={14}
                  className="text-slate-500"
                />

                <span className="text-sm font-medium text-slate-700">
                  {new Date(`${profile.joiningDate}T00:00:00`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
                </span>
              </div>
            </div>

            {/* Status */}
            <div>
              <p className="mb-1.5 text-xs font-medium text-slate-500">
                Account Status
              </p>

              <div className="flex h-[44px] items-center gap-2 rounded-md border border-slate-200 bg-slate-50/70 px-3">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />

                <span className="text-sm font-medium text-slate-700">
                  {profile.accountStatus}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WORK INFORMATION ================= */}
      <section className="mb-4 rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-[0_2px_8px_rgba(15,23,42,0.02)]">
        <div>
          <h2 className="text-base font-semibold text-slate-900">
            Work Information
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Your work details in the organization.
          </p>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-5">
          <ProfileField
            label="Job Title"
            value={profile.jobTitle}
          />

          <ProfileField
            label="Work Location"
            value={profile.workLocation}
          />
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section className="rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-[0_2px_8px_rgba(15,23,42,0.02)]">
        <div>
          <h2 className="text-base font-semibold text-slate-900">
            About
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            A short description about yourself.
          </p>
        </div>

        <div className="mt-3 min-h-[70px] rounded-md border border-slate-200 bg-slate-50/70 px-4 py-3">
          <p className="text-sm leading-5 text-slate-700">
            {profile.about}
          </p>
        </div>
      </section>
      {editorOpen && <EditProfileModal profile={profile} onSave={setProfile} onClose={() => setEditorOpen(false)} />}
    </main>
  );
}

/* =========================================================
   REUSABLE FIELD
========================================================= */

function ProfileField({ label, value }) {
  return (
    <div>
      <p className="mb-1.5 text-xs font-medium text-slate-500">
        {label}
      </p>

      <div className="flex h-[44px] items-center rounded-md border border-slate-200 bg-slate-50/70 px-3">
        <span className="text-sm font-medium text-slate-700">
          {value}
        </span>
      </div>
    </div>
  );
}