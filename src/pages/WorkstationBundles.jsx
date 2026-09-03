import Header from "../components/Header";
import workstationBundleImage from "../assets/workstation_bundle.png";
import laptopImage from "../assets/laptop.png";
import monitorImage from "../assets/monitor.png";
import keyboardImage from "../assets/keyboard.png";
import mouseImage from "../assets/mouse.png";
import cpuImage from "../assets/cpu.png";
import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  BriefcaseBusiness,
  ChevronRight,
  Clock3,
  Edit3,
  Filter,
  FlaskConical,
  Headphones,
  Laptop,
  Layers3,
  Monitor,
  MoreVertical,
  PackageCheck,
  Plus,
  Search,
  UploadCloud,
  X,
} from "lucide-react";

const stats = [
  {
    title: "Total Bundles",
    value: "6",
    subtitle: "Active workstation bundles",
    icon: Box,
    iconClass: "bg-violet-50 text-violet-600",
  },
  {
    title: "Active Bundles",
    value: "5",
    subtitle: "Ready to assign",
    icon: PackageCheck,
    iconClass: "bg-emerald-50 text-emerald-600",
  },
  {
    title: "In Use",
    value: "24",
    subtitle: "Assigned to employees",
    icon: Clock3,
    iconClass: "bg-amber-50 text-amber-500",
  },
  {
    title: "Total Items in Bundles",
    value: "36",
    subtitle: "Across all bundles",
    icon: Layers3,
    iconClass: "bg-blue-50 text-blue-600",
  },
];

const bundleData = [
  {
    id: 1,
    name: "Standard Operations Setup",
    description:
      "CPU with dual monitors, keyboard, mouse and basic accessories.",
    items: 6,
    inUse: 12,
    usageLabel: "Employees",
    status: "Active",
    icon: Monitor,
    iconClass: "bg-violet-50 text-violet-600",
  },
  {
    id: 2,
    name: "HR Laptop Bundle",
    description:
      "Laptop with docking station and essential accessories.",
    items: 4,
    inUse: 6,
    usageLabel: "Employees",
    status: "Active",
    icon: Laptop,
    iconClass: "bg-emerald-50 text-emerald-600",
  },
  {
    id: 3,
    name: "Manager Workstation",
    description:
      "High performance setup for managers with ergonomic chair.",
    items: 7,
    inUse: 3,
    usageLabel: "Employees",
    status: "Active",
    icon: BriefcaseBusiness,
    iconClass: "bg-amber-50 text-amber-600",
  },
  {
    id: 4,
    name: "Basic Desk Setup",
    description:
      "Single monitor setup with keyboard and mouse.",
    items: 4,
    inUse: 2,
    usageLabel: "Employees",
    status: "Active",
    icon: Monitor,
    iconClass: "bg-sky-50 text-sky-600",
  },
  {
    id: 5,
    name: "Support Executive Bundle",
    description:
      "Optimized setup for support team with headset.",
    items: 5,
    inUse: 1,
    usageLabel: "Employee",
    status: "Active",
    icon: Headphones,
    iconClass: "bg-rose-50 text-rose-500",
  },
  {
    id: 6,
    name: "Temporary Setup",
    description:
      "Basic temporary workstation for short-term use.",
    items: 4,
    inUse: 0,
    usageLabel: "Employees",
    status: "Inactive",
    icon: FlaskConical,
    iconClass: "bg-cyan-50 text-cyan-600",
  },
];

export default function WorkstationBundles() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [bundleModalMounted, setBundleModalMounted] = useState(false);
  const [bundleModalVisible, setBundleModalVisible] = useState(false);
  const openBundleModal = () => { setBundleModalMounted(true); requestAnimationFrame(() => requestAnimationFrame(() => setBundleModalVisible(true))); };
  const closeBundleModal = () => { setBundleModalVisible(false); window.setTimeout(() => setBundleModalMounted(false), 240); };
  useEffect(() => {
    if (!bundleModalMounted) return undefined;
    const handleKeyDown = (event) => event.key === "Escape" && closeBundleModal();
    document.addEventListener("keydown", handleKeyDown); document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", handleKeyDown); document.body.style.overflow = ""; };
  }, [bundleModalMounted]);

  const filteredBundles = useMemo(() => {
    const q = search.trim().toLowerCase();

    return bundleData.filter((bundle) => {
      const matchesSearch =
        !q ||
        bundle.name.toLowerCase().includes(q) ||
        bundle.description.toLowerCase().includes(q);

      const matchesStatus =
        statusFilter === "All" || bundle.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  return (
    <main className="min-h-screen bg-[#f8f9fc] px-4 py-5 font-['Geist',sans-serif] text-slate-900">
      {bundleModalMounted && <CreateBundleModal visible={bundleModalVisible} onClose={closeBundleModal} />}
      {/* Header */}
      <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-[-0.02em]">
            Workstation Bundles
          </h1>

          <p className="mt-1 text-sm font-normal text-slate-500">
            Create and manage standard workstation bundles for easy inventory assignment.
          </p>
        </div>

        <div className="flex flex-col items-end gap-3"><Header /><button type="button" onClick={openBundleModal} className="flex h-9 items-center gap-2 rounded-md bg-gradient-to-r from-violet-600 to-indigo-600 px-4 text-sm font-semibold text-white shadow-sm transition hover:brightness-95">
          <Plus size={14} />
          Create Bundle
        </button></div>
      </div>

      {/* KPI Cards */}
      <section className="mb-4 grid grid-cols-4 gap-3">
        {stats.map((card) => {
          const Icon = card.icon;

          return (
            <article
              key={card.title}
              className="flex min-h-[92px] items-center gap-4 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-[0_2px_8px_rgba(15,23,42,0.025)]"
            >
              <span
                className={`grid h-11 w-11 shrink-0 place-items-center rounded-lg ${card.iconClass}`}
              >
                <Icon size={20} />
              </span>

              <div>
                <p className="text-xs font-medium text-slate-500">
                  {card.title}
                </p>

                <h3 className="mt-1 text-xl font-bold leading-none">
                  {card.value}
                </h3>

                <p className="mt-2 text-[10px] text-slate-500">
                  {card.subtitle}
                </p>
              </div>
            </article>
          );
        })}
      </section>

      {/* Main table card */}
      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        {/* Top Bar */}
        <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
          <h2 className="text-sm font-semibold">
            All Workstation Bundles
          </h2>

          <div className="flex items-center gap-2">
            <div className="flex h-9 w-[230px] items-center gap-2 rounded-md border border-slate-200 bg-white px-3">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search bundles..."
                className="min-w-0 flex-1 bg-transparent text-xs font-medium outline-none placeholder:text-slate-400"
              />

              <Search size={13} className="text-slate-400" />
            </div>

            <div className="relative">
              <button className="flex h-9 items-center gap-2 rounded-md border border-violet-200 bg-white px-4 text-xs font-semibold text-violet-600 hover:bg-violet-50">
                <Filter size={13} />
                Filter
              </button>

              {/* Demo filter toggle */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
              >
                <option value="All">All</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-[900px] w-full border-collapse">
            <thead>
              <tr className="bg-slate-50/80 text-left">
                <th className="border-b border-slate-200 px-4 py-3 text-xs font-medium text-slate-500">
                  Bundle Name
                </th>

                <th className="border-b border-slate-200 px-4 py-3 text-xs font-medium text-slate-500">
                  Description
                </th>

                <th className="border-b border-slate-200 px-4 py-3 text-xs font-medium text-slate-500">
                  Items
                </th>

                <th className="border-b border-slate-200 px-4 py-3 text-xs font-medium text-slate-500">
                  In Use
                </th>

                <th className="border-b border-slate-200 px-4 py-3 text-xs font-medium text-slate-500">
                  Status
                </th>

                <th className="border-b border-slate-200 px-4 py-3 text-xs font-medium text-slate-500">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredBundles.map((bundle) => {
                const Icon = bundle.icon;

                return (
                  <tr
                    key={bundle.id}
                    className="border-b border-slate-100 last:border-b-0 transition hover:bg-slate-50/70"
                  >
                    {/* Bundle Name */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg ${bundle.iconClass}`}>
                          <Icon size={17} strokeWidth={1.9} />
                        </span>

                        <p className="text-xs font-medium text-slate-800">
                          {bundle.name}
                        </p>
                      </div>
                    </td>

                    {/* Description */}
                    <td className="max-w-[300px] px-4 py-3">
                      <p className="text-xs font-normal leading-4 text-slate-500">
                        {bundle.description}
                      </p>
                    </td>

                    {/* Items */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5 text-xs font-medium text-slate-700">
                        <Box size={12} className="text-violet-600" />
                        {bundle.items} Items
                      </div>
                    </td>

                    {/* In Use */}
                    <td className="px-4 py-3">
                      <p className="text-xs font-medium text-slate-800">
                        {bundle.inUse}
                      </p>

                      <p className="mt-0.5 text-[10px] text-slate-400">
                        {bundle.usageLabel}
                      </p>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-3">
                      <StatusBadge status={bundle.status} />
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button className="grid h-8 w-8 place-items-center rounded-md border border-slate-200 text-slate-500 transition hover:border-violet-200 hover:bg-violet-50 hover:text-violet-600">
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

              {filteredBundles.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="py-12 text-center text-xs text-slate-400"
                  >
                    No workstation bundles found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Bottom Info Panel */}
      <section className="mt-4 grid grid-cols-[1.6fr_1fr] items-center gap-6 rounded-xl border border-violet-100 bg-gradient-to-r from-violet-50/70 via-white to-violet-50/60 px-6 py-5">
        {/* Left */}
        <div className="flex items-center gap-5">
          {/* Illustration placeholder */}
          <div className="flex h-[90px] w-[135px] shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-violet-100 to-slate-50">
            <img className="h-full w-full object-contain p-2" src={workstationBundleImage} alt="Workstation bundle illustration" />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-800">
              What are Workstation Bundles?
            </h3>

            <p className="mt-2 max-w-[480px] text-xs leading-5 text-slate-500">
              Workstation bundles are predefined sets of assets and accessories
              that make it easy to assign standard setups to employees. Create
              once, use many times.
            </p>
          </div>
        </div>

        {/* Benefits */}
        <div className="space-y-3">
          <BenefitText>
            Save time by assigning pre-built setups
          </BenefitText>

          <BenefitText>
            Ensure consistency across teams
          </BenefitText>

          <BenefitText>
            Easy to manage and update
          </BenefitText>
        </div>
      </section>
    </main>
  );
}

const bundleAssets = [
  { id: "LAP-OPS-0011", name: "Laptop - Dell Latitude 5420", category: "Laptop", image: laptopImage },
  { id: "MON-OPS-0071", name: 'Monitor 24” Dell P2422H', category: "Monitor", image: monitorImage },
  { id: "KEY-OPS-0168", name: "Keyboard - Logitech K120", category: "Keyboard", image: keyboardImage },
  { id: "MOU-OPS-0148", name: "Mouse - Logitech M100", category: "Mouse", image: mouseImage },
  { id: "CPU-OPS-0045", name: "CPU - Dell OptiPlex 7010", category: "CPU", image: cpuImage },
];
function CreateBundleModal({visible,onClose}) {
  const [selected,setSelected]=useState([]); const [query,setQuery]=useState(""); const [category,setCategory]=useState("All Categories");
  const shown=bundleAssets.filter((item)=>(category==="All Categories"||item.category===category)&&item.name.toLowerCase().includes(query.toLowerCase()));
  const toggle=(id)=>setSelected((items)=>items.includes(id)?items.filter((item)=>item!==id):[...items,id]);
  const inputClass="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100";
  return <div onMouseDown={(event)=>event.target===event.currentTarget&&onClose()} className={`fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 p-4 backdrop-blur-[1px] transition-opacity duration-200 ${visible?"opacity-100":"opacity-0"}`}><section role="dialog" aria-modal="true" className={`flex max-h-[calc(100vh-32px)] w-full max-w-[780px] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl transition-all duration-200 ease-out ${visible?"translate-y-0 scale-100 opacity-100":"translate-y-5 scale-[0.96] opacity-0"}`}>
    <header className="flex items-start justify-between border-b border-slate-200 px-6 py-5"><div><h2 className="text-xl font-bold">Create New Bundle</h2><p className="mt-1 text-sm text-slate-500">Create a workstation bundle by adding a name, description and selecting items.</p></div><button type="button" onClick={onClose} className="grid h-9 w-9 place-items-center rounded-lg text-slate-500 hover:bg-slate-100"><X size={18}/></button></header>
    <form onSubmit={(event)=>{event.preventDefault();onClose()}} className="overflow-y-auto">
      <ModalStep number="1" title="Basic Information"><div className="grid grid-cols-2 gap-5"><BundleField label="Bundle Name" required><input required placeholder="Enter bundle name" className={inputClass}/></BundleField><BundleField label="Description"><textarea maxLength={200} rows={2} placeholder="Enter bundle description" className="w-full resize-none rounded-lg border border-slate-200 p-3 text-sm font-medium outline-none focus:border-violet-400"/></BundleField></div></ModalStep>
      <ModalStep number="2" title="Select Items"><div className="mb-3 grid grid-cols-[1.25fr_0.9fr] gap-4"><div className="relative"><input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search assets by name, ID or type..." className={`${inputClass} pr-10`}/><Search size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"/></div><select value={category} onChange={(e)=>setCategory(e.target.value)} className={inputClass}><option>All Categories</option><option>Laptop</option><option>Monitor</option><option>Keyboard</option><option>Mouse</option><option>CPU</option></select></div>
        <div className="overflow-hidden rounded-lg border border-slate-200"><div className="grid grid-cols-[36px_1.6fr_1fr_1fr_0.7fr] bg-slate-50 px-3 py-2.5 text-xs font-semibold text-slate-500"><span/><span>Asset</span><span>Asset ID</span><span>Category</span><span>Available</span></div>{shown.map((item)=><label key={item.id} className="grid min-h-[52px] cursor-pointer grid-cols-[36px_1.6fr_1fr_1fr_0.7fr] items-center border-t border-slate-100 px-3 py-2 hover:bg-slate-50"><input type="checkbox" checked={selected.includes(item.id)} onChange={()=>toggle(item.id)} className="h-4 w-4 accent-violet-600"/><span className="flex items-center gap-3"><img src={item.image} alt="" className="h-8 w-8 object-contain"/><span className="text-xs font-semibold text-slate-800">{item.name}</span></span><span className="text-xs font-medium text-violet-600">{item.id}</span><span className="text-xs text-slate-600">{item.category}</span><span className="w-fit rounded bg-emerald-50 px-2 py-1 text-[10px] font-semibold text-emerald-600">Available</span></label>)}<div className="flex items-center justify-between border-t border-slate-100 px-3 py-2.5 text-xs text-slate-500"><span>{selected.length} items selected</span><button type="button" onClick={()=>setSelected([])} className="font-semibold text-violet-600">Clear Selection</button></div></div>
      </ModalStep>
      <ModalStep number="3" title="Bundle Settings"><div className="grid grid-cols-2 gap-4"><BundleField label="Default Location"><select defaultValue="" className={inputClass}><option value="">Select location (optional)</option><option>Main Office</option><option>Operations</option><option>HR Office</option></select></BundleField><BundleField label="Applicable Department"><select defaultValue="" className={inputClass}><option value="">Select department (optional)</option><option>Operations</option><option>HR</option><option>Technical</option></select></BundleField><BundleField label="Bundle Image (Optional)"><label className="flex min-h-[78px] cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-violet-300 bg-violet-50/30"><UploadCloud size={20} className="text-violet-600"/><span className="mt-1 text-xs font-semibold text-violet-600">Upload image</span><span className="mt-1 text-[10px] text-slate-500">JPG, PNG up to 2MB</span><input type="file" className="hidden" accept="image/png,image/jpeg"/></label></BundleField><BundleField label="Notes (Optional)"><textarea maxLength={200} rows={3} placeholder="Enter any additional notes" className="w-full resize-none rounded-lg border border-slate-200 p-3 text-sm outline-none focus:border-violet-400"/></BundleField></div></ModalStep>
      <footer className="flex justify-end gap-3 border-t border-slate-200 px-6 py-4"><button type="button" onClick={onClose} className="h-10 min-w-24 rounded-lg border border-slate-200 px-4 text-sm font-semibold text-slate-700 hover:bg-slate-50">Cancel</button><button type="submit" className="h-10 min-w-28 rounded-lg bg-violet-600 px-5 text-sm font-semibold text-white hover:bg-violet-700">Create Bundle</button></footer>
    </form></section></div>;
}
function ModalStep({number,title,children}){return <section className="border-b border-slate-200 px-6 py-5"><h3 className="mb-4 flex items-center gap-2 text-sm font-semibold"><span className="grid h-6 w-6 place-items-center rounded-full bg-violet-600 text-xs font-bold text-white">{number}</span>{title}</h3>{children}</section>}
function BundleField({label,required,children}){return <label className="block"><span className="mb-1.5 block text-xs font-semibold text-slate-600">{label}{required&&<span className="ml-1 text-rose-500">*</span>}</span>{children}</label>}
function StatusBadge({ status }) {
  if (status === "Active") {
    return (
      <span className="inline-flex rounded-md bg-emerald-50 px-2.5 py-1 text-[10px] font-medium text-emerald-600">
        Active
      </span>
    );
  }

  return (
    <span className="inline-flex rounded-md bg-slate-100 px-2.5 py-1 text-[10px] font-medium text-slate-500">
      Inactive
    </span>
  );
}

function BenefitText({ children }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="grid h-5 w-5 shrink-0 place-items-center rounded-md bg-violet-50 text-violet-600">
        <Box size={11} />
      </span>

      <p className="text-xs font-normal text-slate-600">
        {children}
      </p>
    </div>
  );
}



