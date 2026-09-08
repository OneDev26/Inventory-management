import { Link } from "react-router-dom";
import Header from "../components/Header";
import FilterSelect from "../components/FilterSelect";
import PageButton from "../components/PageButton";
import React, { useEffect, useMemo, useState } from "react";
import {
  BriefcaseBusiness,
  Building2,
  ChevronLeft,
  ChevronRight,
  CircleDollarSign,
  Download,
  Edit3,
  ExternalLink,
  Filter,
  MoreVertical,
  Package,
  Plus,
  Search,
  Users,
  Wrench,
  XCircle,
  X,
} from "lucide-react";

const stats = [
  {
    title: "Total Departments",
    value: "5",
    subtitle: "All departments",
    icon: BriefcaseBusiness,
    iconClass: "bg-violet-50 text-violet-600",
  },
  {
    title: "Total Employees",
    value: "111",
    subtitle: "Across all departments",
    icon: Users,
    iconClass: "bg-emerald-50 text-emerald-600",
  },
  {
    title: "Assigned Assets",
    value: "1,624",
    subtitle: "Total assigned assets",
    icon: Package,
    iconClass: "bg-cyan-50 text-cyan-600",
  },
  {
    title: "Under Repair",
    value: "67",
    subtitle: "Assets under repair",
    icon: Wrench,
    iconClass: "bg-orange-50 text-orange-500",
  },
  {
    title: "Damaged Assets",
    value: "98",
    subtitle: "Damaged assets",
    icon: XCircle,
    iconClass: "bg-rose-50 text-rose-500",
  },
];

const departmentData = [
  {
    id: "DEP-OPS",
    name: "Operations",
    icon: BriefcaseBusiness,
    iconClass: "bg-blue-50 text-blue-600",
    employees: 45,
    assignedAssets: 620,
    assignedPercent: "78.2%",
    availableAssets: 35,
    availablePercent: "4.3%",
    underRepair: 8,
    repairPercent: "1.0%",
    damaged: 12,
    damagedPercent: "1.5%",
    lost: 6,
    lostPercent: "0.7%",
    assetValue: "₹ 1.28 Cr",
    status: "Active",
  },
  {
    id: "DEP-HR",
    name: "HR",
    icon: Users,
    iconClass: "bg-violet-50 text-violet-600",
    employees: 18,
    assignedAssets: 135,
    assignedPercent: "69.2%",
    availableAssets: 18,
    availablePercent: "9.2%",
    underRepair: 2,
    repairPercent: "1.0%",
    damaged: 2,
    damagedPercent: "1.0%",
    lost: 0,
    lostPercent: "0.0%",
    assetValue: "₹ 28.45 L",
    status: "Active",
  },
  {
    id: "DEP-TECH",
    name: "Technical",
    icon: Building2,
    iconClass: "bg-cyan-50 text-cyan-600",
    employees: 22,
    assignedAssets: 198,
    assignedPercent: "72.5%",
    availableAssets: 28,
    availablePercent: "10.3%",
    underRepair: 7,
    repairPercent: "2.6%",
    damaged: 5,
    damagedPercent: "1.8%",
    lost: 4,
    lostPercent: "1.5%",
    assetValue: "₹ 54.32 L",
    status: "Active",
  },
  {
    id: "DEP-FIN",
    name: "Finance",
    icon: CircleDollarSign,
    iconClass: "bg-orange-50 text-orange-500",
    employees: 16,
    assignedAssets: 112,
    assignedPercent: "70.4%",
    availableAssets: 10,
    availablePercent: "6.3%",
    underRepair: 1,
    repairPercent: "0.6%",
    damaged: 1,
    damagedPercent: "0.6%",
    lost: 1,
    lostPercent: "0.6%",
    assetValue: "₹ 19.75 L",
    status: "Active",
  },
  {
    id: "DEP-MGT",
    name: "Management",
    icon: BriefcaseBusiness,
    iconClass: "bg-emerald-50 text-emerald-600",
    employees: 10,
    assignedAssets: 86,
    assignedPercent: "66.7%",
    availableAssets: 8,
    availablePercent: "6.2%",
    underRepair: 0,
    repairPercent: "0.0%",
    damaged: 0,
    damagedPercent: "0.0%",
    lost: 0,
    lostPercent: "0.0%",
    assetValue: "₹ 8.62 L",
    status: "Active",
  },
];

export default function Departments() {
  const [status, setStatus] = useState("All Status");
  const [department, setDepartment] = useState("All Departments");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [departmentModalMounted, setDepartmentModalMounted] = useState(false);
  const [departmentModalVisible, setDepartmentModalVisible] = useState(false);

  const openDepartmentModal = () => {
    setDepartmentModalMounted(true);
    requestAnimationFrame(() => requestAnimationFrame(() => setDepartmentModalVisible(true)));
  };

  const closeDepartmentModal = () => {
    setDepartmentModalVisible(false);
    window.setTimeout(() => setDepartmentModalMounted(false), 240);
  };

  useEffect(() => {
    if (!departmentModalMounted) return undefined;
    const handleKeyDown = (event) => event.key === "Escape" && closeDepartmentModal();
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [departmentModalMounted]);

  const filteredDepartments = useMemo(() => {
    const q = search.trim().toLowerCase();

    return departmentData.filter((item) => {
      const matchesSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.id.toLowerCase().includes(q);

      const matchesStatus =
        status === "All Status" || item.status === status;

      const matchesDepartment =
        department === "All Departments" ||
        item.name === department;

      return matchesSearch && matchesStatus && matchesDepartment;
    });
  }, [search, status, department]);

  const clearFilters = () => {
    setStatus("All Status");
    setDepartment("All Departments");
    setSearch("");
  };

  return (
    <main className="min-h-screen bg-[#f8f9fc] px-4 py-5 font-['Geist',sans-serif] text-slate-900">
      {departmentModalMounted && (
        <AddDepartmentModal visible={departmentModalVisible} onClose={closeDepartmentModal} />
      )}
      {/* HEADER */}
      <div className="mb-5 flex items-start justify-between gap-5">
        <div>
          <h1 className="text-2xl font-bold tracking-[-0.025em]">
            Departments
          </h1>

          <div className="mt-1 flex items-center gap-2 text-xs">
            <button className="font-medium text-violet-600">
              Dashboard
            </button>

            <ChevronRight size={11} className="text-slate-400" />

            <span className="text-slate-500">
              Departments
            </span>
          </div>

          <p className="mt-2 text-sm text-slate-500">
            View and manage all departments and their asset summary.
          </p>
        </div>

        <div className="flex flex-col items-end gap-3">
          <Header />

          <div className="flex items-center gap-3">
            <button className="flex h-9 items-center gap-2 rounded-md bg-violet-600 px-4 text-sm font-semibold text-white shadow-sm hover:bg-violet-700">
              <Download size={13} />
              Export
            </button>

            <button type="button" onClick={openDepartmentModal} className="flex h-9 items-center gap-2 rounded-md bg-gradient-to-r from-violet-600 to-indigo-600 px-4 text-sm font-semibold text-white shadow-sm hover:brightness-95">
              <Plus size={13} />
              Add Department
            </button>
          </div>
        </div>
      </div>

      {/* KPI CARDS */}
      <section className="mb-4 grid grid-cols-5 gap-3">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <article
              key={item.title}
              className="flex min-h-[92px] items-center gap-4 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-[0_2px_8px_rgba(15,23,42,0.025)]"
            >
              <span
                className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${item.iconClass}`}
              >
                <Icon size={18} />
              </span>

              <div>
                <p className="text-xs font-medium text-slate-500">
                  {item.title}
                </p>

                <h3 className="mt-1 text-xl font-bold leading-none">
                  {item.value}
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  {item.subtitle}
                </p>
              </div>
            </article>
          );
        })}
      </section>

      {/* MAIN CARD */}
      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        {/* FILTER TOOLBAR */}
        <div className="flex items-center justify-between gap-4 border-b border-slate-200 p-3">
          <div className="grid flex-1 grid-cols-[180px_190px_minmax(220px,1fr)] gap-3">
            <FilterSelect
              size="compact"
              value={status}
              setValue={setStatus}
              options={[
                "All Status",
                "Active",
                "Inactive",
              ]}
            />

            <FilterSelect
              size="compact"
              value={department}
              setValue={setDepartment}
              options={[
                "All Departments",
                "Operations",
                "HR",
                "Technical",
                "Finance",
                "Management",
              ]}
            />

            <div className="flex h-9 max-w-[300px] items-center gap-2 rounded-md border border-slate-200 px-3">
              <Search size={12} className="text-slate-400" />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search departments..."
                className="min-w-0 flex-1 bg-transparent text-xs outline-none placeholder:text-slate-400"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={clearFilters}
              className="h-9 rounded-md border border-slate-200 bg-white px-4 text-xs font-medium text-slate-600 hover:bg-slate-50"
            >
              Clear Filters
            </button>

            <button className="flex h-9 items-center gap-2 rounded-md border border-slate-200 bg-white px-4 text-xs font-medium text-slate-600 hover:bg-slate-50">
              <Filter size={12} />
              Filters
            </button>
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1180px] border-collapse">
            <thead>
              <tr className="bg-slate-50/80">
                {[
                  "Department",
                  "Employees",
                  "Assigned Assets",
                  "Available Assets",
                  "Under Repair",
                  "Damaged",
                  "Lost",
                  "Asset Value",
                  "Status",
                  "Actions",
                ].map((heading) => (
                  <th
                    key={heading}
                    className="border-b border-slate-200 px-4 py-3 text-left text-xs font-medium text-slate-500"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {filteredDepartments.map((item) => {
                const Icon = item.icon;

                return (
                  <tr
                    key={item.id}
                    className="border-b border-slate-100 last:border-b-0 transition hover:bg-slate-50/60"
                  >
                    {/* Department */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <span
                          className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg ${item.iconClass}`}
                        >
                          <Icon size={14} />
                        </span>

                        <div>
                          <p className="text-xs font-semibold text-slate-800">
                            {item.name}
                          </p>

                          <p className="mt-0.5 text-[10px] text-slate-400">
                            {item.id}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Employees */}
                    <td className="px-4 py-3 text-xs text-slate-700">
                      {item.employees}
                    </td>

                    {/* Assigned */}
                    <td className="px-4 py-3">
                      <Metric
                        value={item.assignedAssets}
                        percent={item.assignedPercent}
                        color="text-slate-800"
                      />
                    </td>

                    {/* Available */}
                    <td className="px-4 py-3">
                      <Metric
                        value={item.availableAssets}
                        percent={item.availablePercent}
                        color="text-blue-600"
                      />
                    </td>

                    {/* Repair */}
                    <td className="px-4 py-3">
                      <Metric
                        value={item.underRepair}
                        percent={item.repairPercent}
                        color="text-orange-500"
                      />
                    </td>

                    {/* Damaged */}
                    <td className="px-4 py-3">
                      <Metric
                        value={item.damaged}
                        percent={item.damagedPercent}
                        color="text-rose-500"
                      />
                    </td>

                    {/* Lost */}
                    <td className="px-4 py-3">
                      <Metric
                        value={item.lost}
                        percent={item.lostPercent}
                        color="text-slate-700"
                      />
                    </td>

                    {/* Value */}
                    <td className="px-4 py-3 text-xs font-medium text-slate-700">
                      {item.assetValue}
                    </td>

                    {/* Status */}
                    <td className="px-4 py-3">
                      <span className="inline-flex rounded-md bg-emerald-50 px-2.5 py-1 text-[10px] font-medium text-emerald-600">
                        {item.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button className="grid h-8 w-8 place-items-center rounded-md border border-slate-200 text-violet-600 transition hover:bg-violet-50">
                          <Edit3 size={13} />
                        </button>

                        <button className="grid h-8 w-8 place-items-center rounded-md border border-slate-200 text-slate-500 transition hover:bg-slate-50">
                          <MoreVertical size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {filteredDepartments.length === 0 && (
                <tr>
                  <td
                    colSpan={10}
                    className="py-12 text-center text-[10px] text-slate-400"
                  >
                    No departments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* TABLE FOOTER */}
        <div className="flex min-h-[56px] items-center justify-between border-t border-slate-100 px-4">
          <p className="text-xs text-slate-500">
            Showing 1 to 5 of 5 departments
          </p>

          <div className="flex items-center gap-1.5">
            <PageButton
              onClick={() =>
                setPage((current) => Math.max(1, current - 1))
              }
            >
              <ChevronLeft size={12} />
            </PageButton>

            <PageButton
              active={page === 1}
              onClick={() => setPage(1)}
            >
              1
            </PageButton>

            <PageButton
              onClick={() =>
                setPage((current) => current + 1)
              }
            >
              <ChevronRight size={12} />
            </PageButton>
          </div>
        </div>
      </section>

      {/* BOTTOM INFO */}
      <section className="mt-5 flex min-h-[72px] items-center justify-between rounded-xl border border-violet-100 bg-gradient-to-r from-violet-50/60 via-white to-blue-50/50 px-5">
        <div className="flex items-center gap-4">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-violet-100 text-violet-600">
            <Building2 size={17} />
          </span>

          <div>
            <h3 className="text-sm font-semibold text-slate-800">
              About Department Overview
            </h3>

            <p className="mt-1 text-xs text-slate-500">
              This section provides a summary of all departments with employee
              count, asset distribution, and asset status overview.
            </p>
          </div>
        </div>

        <button className="flex h-8 items-center gap-2 rounded-md border border-violet-200 bg-white px-4 text-xs font-medium text-violet-600 hover:bg-violet-50">
          Learn More
          <ExternalLink size={11} />
        </button>
      </section>
    </main>
  );
}

function AddDepartmentModal({ visible, onClose }) {
  const [description, setDescription] = useState("");
  const inputClass = "h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-100";

  const submit = (event) => {
    event.preventDefault();
    onClose();
  };

  return (
    <div
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
      className={`fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 p-4 font-['Geist',sans-serif] backdrop-blur-[1px] transition-opacity duration-200 ${visible ? "opacity-100" : "opacity-0"}`}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-department-title"
        className={`flex max-h-[calc(100vh-32px)] w-full max-w-[620px] flex-col overflow-hidden rounded-xl bg-white shadow-2xl transition-all duration-200 ease-out ${visible ? "translate-y-0 scale-100 opacity-100" : "translate-y-5 scale-[0.96] opacity-0"}`}
      >
        <header className="flex items-start justify-between border-b border-slate-200 px-6 py-5">
          <div>
            <h2 id="add-department-title" className="text-xl font-bold text-slate-900">Add Department</h2>
            <p className="mt-1 text-xs text-slate-500">Create a new department to organize assets and employees.</p>
          </div>
          <button type="button" onClick={onClose} aria-label="Close add department" className="grid h-8 w-8 place-items-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-800">
            <X size={18} />
          </button>
        </header>

        <form onSubmit={submit} className="overflow-y-auto px-6 py-5">
          <div className="space-y-4">
            <DepartmentField label="Department Name" required>
              <input name="departmentName" required placeholder="Enter department name" className={inputClass} />
            </DepartmentField>

            <DepartmentField label="Department Code" required hint="E.g. DEP-OPS, DEP-HR (will be auto-generated if left blank)">
              <input name="departmentCode" required placeholder="Enter unique department code" className={inputClass} />
            </DepartmentField>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <DepartmentField label="Department Head">
                <select name="departmentHead" defaultValue="" className={inputClass}>
                  <option value="" disabled>Select department head</option>
                  <option>Rahul Sharma</option>
                  <option>Priya Sharma</option>
                  <option>Amit Patel</option>
                </select>
              </DepartmentField>
              <DepartmentField label="Email (Optional)">
                <input name="email" type="email" placeholder="Enter email address" className={inputClass} />
              </DepartmentField>
              <DepartmentField label="Phone (Optional)">
                <input name="phone" type="tel" placeholder="Enter phone number" className={inputClass} />
              </DepartmentField>
              <DepartmentField label="Location (Optional)">
                <input name="location" placeholder="Enter department location" className={inputClass} />
              </DepartmentField>
            </div>

            <DepartmentField label="Description (Optional)">
              <div className="relative">
                <textarea name="description" value={description} onChange={(event) => setDescription(event.target.value)} maxLength={200} rows={3} placeholder="Enter department description" className="w-full resize-none rounded-lg border border-slate-200 bg-white p-3 pb-7 text-sm font-medium text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-100" />
                <span className="absolute bottom-2 right-3 text-[10px] text-slate-400">{description.length}/200</span>
              </div>
            </DepartmentField>

            <fieldset>
              <legend className="mb-2 text-xs font-semibold text-slate-700">Department Status</legend>
              <div className="space-y-3">
                <StatusChoice value="Active" description="Department is active and can be assigned assets." defaultChecked />
                <StatusChoice value="Inactive" description="Department is inactive and cannot be assigned assets." />
              </div>
            </fieldset>
          </div>

          <footer className="-mx-6 -mb-5 mt-5 flex justify-end gap-3 border-t border-slate-200 px-6 py-4">
            <button type="button" onClick={onClose} className="h-10 rounded-lg border border-slate-200 px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">Cancel</button>
            <button type="submit" className="flex h-10 items-center gap-2 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 px-5 text-sm font-semibold text-white shadow-sm transition hover:brightness-95">
              <Building2 size={15} />
              Create Department
            </button>
          </footer>
        </form>
      </section>
    </div>
  );
}

function DepartmentField({ label, required = false, hint, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold text-slate-700">
        {label}{required && <span className="ml-1 text-rose-500">*</span>}
      </span>
      {children}
      {hint && <span className="mt-1.5 block text-[10px] text-slate-500">{hint}</span>}
    </label>
  );
}

function StatusChoice({ value, description, defaultChecked = false }) {
  return (
    <label className="flex cursor-pointer items-start gap-2.5">
      <input type="radio" name="departmentStatus" value={value} defaultChecked={defaultChecked} className="mt-0.5 h-4 w-4 accent-violet-600" />
      <span>
        <span className="block text-xs font-semibold text-slate-700">{value}</span>
        <span className="mt-0.5 block text-[10px] text-slate-500">{description}</span>
      </span>
    </label>
  );
}
function Metric({
  value,
  percent,
  color,
}) {
  return (
    <div>
      <p className={`text-[10px] font-semibold ${color}`}>
        {value}
      </p>

      <p className="mt-1 text-[10px] text-slate-400">
        ({percent})
      </p>
    </div>
  );
}

