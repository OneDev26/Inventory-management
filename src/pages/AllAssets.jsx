import Header from "../components/Header";
import laptopImage from "../assets/laptop.png";
import monitorImage from "../assets/monitor.png";
import keyboardImage from "../assets/keyboard.png";
import mouseImage from "../assets/mouse.png";
import cpuImage from "../assets/cpu.png";
import chairImage from "../assets/chair.png";
import tableImage from "../assets/work_table.png";
import dockingImage from "../assets/docking_station.png";
import printerImage from "../assets/hp_laser_jet.png";
import headphoneImage from "../assets/headphone.png";
import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Eye,
  Filter,
  MoreVertical,
  PackageCheck,
  Plus,
  Search,
  TriangleAlert,
  CalendarDays,
  ScanBarcode,
  UploadCloud,
  X,
  XCircle,
  Download,
} from "lucide-react";

const summaryCards = [
  {
    title: "Total Assets",
    value: "2,146",
    subtitle: "All assets",
    icon: Box,
    iconClass: "text-violet-600 bg-violet-50",
  },
  {
    title: "Assigned Assets",
    value: "1,624",
    subtitle: "75.6% of total",
    icon: CheckCircle2,
    iconClass: "text-emerald-600 bg-emerald-50",
  },
  {
    title: "Available Assets",
    value: "312",
    subtitle: "14.5% of total",
    icon: PackageCheck,
    iconClass: "text-blue-600 bg-blue-50",
  },
  {
    title: "Under Repair",
    value: "67",
    subtitle: "3.1% of total",
    icon: TriangleAlert,
    iconClass: "text-orange-500 bg-orange-50",
  },
  {
    title: "Lost / Missing",
    value: "45",
    subtitle: "2.2% of total",
    icon: XCircle,
    iconClass: "text-rose-500 bg-rose-50",
  },
];

const assets = [
  {
    asset: "Laptop - Dell Latitude 5420",
    image: laptopImage,
    serial: "SN: LAP5420B001",
    id: "LAP-OPS-0011",
    category: "Laptop",
    department: "IT",
    location: "OPS-WS-015",
    status: "Assigned",
    condition: "Good",
    purchaseDate: "12 Apr 2024",
    assignedTo: "Rahul Sharma",
    employeeId: "EMP-1087",
    avatar: "RS",
  },
  {
    asset: 'Monitor 24" Dell P2422H',
    image: monitorImage,
    serial: "SN: MONP2422H01",
    id: "MON-OPS-0071",
    category: "Monitor",
    department: "Operations",
    location: "OPS-WS-015",
    status: "Assigned",
    condition: "Good",
    purchaseDate: "10 Apr 2024",
    assignedTo: "Rahul Sharma",
    employeeId: "EMP-1087",
    avatar: "RS",
  },
  {
    asset: "Keyboard - Logitech K120",
    image: keyboardImage,
    serial: "SN: KEYK12001",
    id: "KEY-OPS-0168",
    category: "Keyboard",
    department: "Operations",
    location: "OPS-WS-015",
    status: "Assigned",
    condition: "Good",
    purchaseDate: "10 Apr 2024",
    assignedTo: "Rahul Sharma",
    employeeId: "EMP-1087",
    avatar: "RS",
  },
  {
    asset: "Mouse - Logitech M100",
    image: mouseImage,
    serial: "SN: MOUM10001",
    id: "MOU-OPS-0148",
    category: "Mouse",
    department: "Operations",
    location: "OPS-WS-015",
    status: "Assigned",
    condition: "Good",
    purchaseDate: "10 Apr 2024",
    assignedTo: "Rahul Sharma",
    employeeId: "EMP-1087",
    avatar: "RS",
  },
  {
    asset: "CPU - Dell OptiPlex 7010",
    image: cpuImage,
    serial: "SN: DELL7010B01",
    id: "CPU-OPS-0045",
    category: "CPU",
    department: "Operations",
    location: "OPS-WS-015",
    status: "Assigned",
    condition: "Good",
    purchaseDate: "12 Apr 2024",
    assignedTo: "Rahul Sharma",
    employeeId: "EMP-1087",
    avatar: "RS",
  },
  {
    asset: "Ergonomic Chair",
    image: chairImage,
    serial: "SN: CHR938207",
    id: "CHR-OPS-0084",
    category: "Chair",
    department: "Operations",
    location: "OPS-WS-015",
    status: "Available",
    condition: "Good",
    purchaseDate: "05 Apr 2024",
    assignedTo: "",
    employeeId: "",
    avatar: "",
  },
  {
    asset: "Work Table",
    image: tableImage,
    serial: "SN: TBL39208",
    id: "TBL-OPS-0052",
    category: "Table",
    department: "Operations",
    location: "OPS-WS-015",
    status: "Available",
    condition: "Good",
    purchaseDate: "05 Apr 2024",
    assignedTo: "",
    employeeId: "",
    avatar: "",
  },
  {
    asset: "Docking Station WD19S",
    image: dockingImage,
    serial: "SN: DOCKWD1901",
    id: "DOC-OPS-0032",
    category: "Docking Station",
    department: "IT",
    location: "IT-WS-012",
    status: "Under Repair",
    condition: "Minor Issues",
    purchaseDate: "18 Apr 2024",
    assignedTo: "",
    employeeId: "",
    avatar: "",
  },
  {
    asset: "HP LaserJet Pro M404",
    image: printerImage,
    serial: "SN: PRNM40402",
    id: "PRN-HR-0022",
    category: "Printer",
    department: "HR",
    location: "HR-WS-003",
    status: "Assigned",
    condition: "Good",
    purchaseDate: "22 Jan 2024",
    assignedTo: "Priya Sharma",
    employeeId: "EMP-1042",
    avatar: "PS",
  },
  {
    asset: "Jabra Headset Evolve 20",
    image: headphoneImage,
    serial: "SN: JAB-EVOLVE20",
    id: "HST-SALES-0010",
    category: "Headset",
    department: "Sales",
    location: "SLS-WS-007",
    status: "Lost / Missing",
    condition: "-",
    purchaseDate: "15 Mar 2024",
    assignedTo: "",
    employeeId: "",
    avatar: "",
  },
];

const assetTypes = [
  "All Types",
  "Laptop",
  "Monitor",
  "Keyboard",
  "Mouse",
  "CPU",
  "Chair",
  "Table",
  "Docking Station",
  "Printer",
  "Headset",
];

const categories = [
  "All Categories",
  "Laptop",
  "Monitor",
  "Keyboard",
  "Mouse",
  "CPU",
  "Chair",
  "Table",
  "Docking Station",
  "Printer",
  "Headset",
];

const departments = [
  "All Departments",
  "Operations",
  "IT",
  "HR",
  "Sales",
];

const statuses = [
  "All Statuses",
  "Assigned",
  "Available",
  "Under Repair",
  "Lost / Missing",
];

export default function AllAssets() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("All Types");
  const [category, setCategory] = useState("All Categories");
  const [department, setDepartment] = useState("All Departments");
  const [status, setStatus] = useState("All Statuses");
  const [condition, setCondition] = useState("All Conditions");
  const [location, setLocation] = useState("All Locations");
  const [assignment, setAssignment] = useState("All Assignments");
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [page, setPage] = useState(1);
  const [assetModalMounted, setAssetModalMounted] = useState(false);
  const [assetModalVisible, setAssetModalVisible] = useState(false);
  const openAssetModal = () => { setAssetModalMounted(true); requestAnimationFrame(() => requestAnimationFrame(() => setAssetModalVisible(true))); };
  const closeAssetModal = () => { setAssetModalVisible(false); window.setTimeout(() => setAssetModalMounted(false), 240); };
  useEffect(() => {
    if (!assetModalMounted) return undefined;
    const handleKeyDown = (event) => event.key === "Escape" && closeAssetModal();
    document.addEventListener("keydown", handleKeyDown); document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", handleKeyDown); document.body.style.overflow = ""; };
  }, [assetModalMounted]);

  const filteredAssets = useMemo(() => {
    const q = search.trim().toLowerCase();

    return assets.filter((item) => {
      const matchesSearch =
        !q ||
        item.asset.toLowerCase().includes(q) ||
        item.id.toLowerCase().includes(q) ||
        item.serial.toLowerCase().includes(q);

      const matchesType =
        type === "All Types" || item.category === type;

      const matchesCategory =
        category === "All Categories" || item.category === category;

      const matchesDepartment =
        department === "All Departments" ||
        item.department === department;

      const matchesStatus =
        status === "All Statuses" || item.status === status;

      const matchesCondition =
        condition === "All Conditions" || item.condition === condition;

      const matchesLocation =
        location === "All Locations" || item.location === location;

      const matchesAssignment =
        assignment === "All Assignments" ||
        (assignment === "Assigned" ? Boolean(item.assignedTo) : !item.assignedTo);

      return (
        matchesSearch &&
        matchesType &&
        matchesCategory &&
        matchesDepartment &&
        matchesStatus &&
        matchesCondition &&
        matchesLocation &&
        matchesAssignment
      );
    });
  }, [search, type, category, department, status, condition, location, assignment]);

  const extraFilterCount = [
    condition !== "All Conditions",
    location !== "All Locations",
    assignment !== "All Assignments",
  ].filter(Boolean).length;

  const clearFilters = () => {
    setSearch("");
    setType("All Types");
    setCategory("All Categories");
    setDepartment("All Departments");
    setStatus("All Statuses");
    setCondition("All Conditions");
    setLocation("All Locations");
    setAssignment("All Assignments");
  };

  return (
    <main className="min-h-screen bg-[#f8f9fc] px-4 py-5 font-['Geist',sans-serif] text-slate-900">
      {assetModalMounted && <AddAssetModal visible={assetModalVisible} onClose={closeAssetModal} />}
      {/* Header */}
      <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-[-0.02em]">
            All Assets
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            View and manage all assets across the organization.
          </p>
        </div>

        <div className="flex flex-col items-end gap-3"><Header /><div className="flex items-center gap-3">
          <button className="flex h-9 items-center gap-2 rounded-md border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
            <Download size={15} />
            Export
          </button>

          <button type="button" onClick={openAssetModal} className="flex h-9 items-center gap-2 rounded-md bg-gradient-to-r from-violet-600 to-indigo-600 px-4 text-sm font-semibold text-white shadow-sm transition hover:brightness-95">
            <Plus size={15} />
            Add New Asset
          </button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <section className="mb-4 grid grid-cols-5 gap-3">
        {summaryCards.map((card) => {
          const Icon = card.icon;

          return (
            <article
              key={card.title}
              className="flex min-h-[104px] items-center gap-4 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-[0_2px_8px_rgba(15,23,42,0.025)]"
            >
              <span
                className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${card.iconClass}`}
              >
                <Icon size={21} />
              </span>

              <div>
                <p className="text-xs font-medium text-slate-500">
                  {card.title}
                </p>

                <h3 className="mt-1 text-xl font-bold leading-none">
                  {card.value}
                </h3>

                <p className="mt-2 text-xs text-slate-500">
                  {card.subtitle}
                </p>
              </div>
            </article>
          );
        })}
      </section>

      {/* Filters */}
      <section className="mb-3 rounded-xl border border-slate-200 bg-white p-3">
        <div className="relative grid grid-cols-[1.7fr_1fr_1fr_1fr_1fr_auto_auto] items-end gap-3">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-600">
              Search Asset
            </label>

            <div className="flex h-9 items-center gap-2 rounded-md border border-slate-200 px-3">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by asset name, ID, serial number..."
                className="min-w-0 flex-1 bg-transparent text-xs font-medium text-slate-700 outline-none placeholder:text-slate-400"
              />

              <Search size={14} className="text-slate-400" />
            </div>
          </div>

          <FilterSelect
            label="Asset Type"
            value={type}
            setValue={setType}
            options={assetTypes}
          />

          <FilterSelect
            label="Category"
            value={category}
            setValue={setCategory}
            options={categories}
          />

          <FilterSelect
            label="Department"
            value={department}
            setValue={setDepartment}
            options={departments}
          />

          <FilterSelect
            label="Status"
            value={status}
            setValue={setStatus}
            options={statuses}
          />

          <button
            type="button"
            onClick={() => setShowMoreFilters((open) => !open)}
            aria-expanded={showMoreFilters}
            aria-controls="more-asset-filters"
            className={`flex h-9 items-center justify-center gap-2 rounded-md border px-4 text-xs font-semibold text-violet-600 transition hover:bg-violet-50 ${showMoreFilters ? "border-violet-400 bg-violet-50" : "border-violet-200 bg-white"}`}
          >
            <Filter size={14} />
            Filters
            {extraFilterCount > 0 && <span className="grid h-5 min-w-5 place-items-center rounded-full bg-violet-600 px-1 text-[10px] text-white">{extraFilterCount}</span>}
          </button>

          {showMoreFilters && (
            <div id="more-asset-filters" className="absolute right-24 top-full z-20 mt-2 grid w-[620px] grid-cols-3 gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-xl">
              <FilterSelect label="Condition" value={condition} setValue={setCondition} options={["All Conditions", "Good", "Minor Issues", "-"]} />
              <FilterSelect label="Location / Workstation" value={location} setValue={setLocation} options={["All Locations", ...new Set(assets.map((item) => item.location))]} />
              <FilterSelect label="Assignment" value={assignment} setValue={setAssignment} options={["All Assignments", "Assigned", "Unassigned"]} />
            </div>
          )}

          <button
            onClick={clearFilters}
            className="h-9 px-2 text-xs font-semibold text-slate-500 hover:text-slate-800"
          >
            Clear All
          </button>
        </div>
      </section>

      {/* Table */}
      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="overflow-x-auto">
          <table className="min-w-[1180px] w-full border-collapse">
            <thead>
              <tr className="bg-slate-50/80 text-left">
                {[
                  "Asset",
                  "Asset ID",
                  "Category",
                  "Department",
                  "Location / Workstation",
                  "Status",
                  "Condition",
                  "Purchase Date",
                  "Assigned To",
                  "Actions",
                ].map((heading) => (
                  <th
                    key={heading}
                    className="border-b border-slate-200 px-3 py-3 text-xs font-medium text-slate-500"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {filteredAssets.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50/60"
                >
                  <td className="px-3 py-2.5">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-12 shrink-0 overflow-hidden rounded-md bg-slate-50">
                        <img className="h-full w-full object-contain p-0.5" src={item.image} alt={item.asset} />
                      </div>

                      <div>
                        <p className="text-xs font-medium text-slate-800">
                          {item.asset}
                        </p>

                        <p className="mt-0.5 text-[10px] text-slate-400">
                          {item.serial}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-3 py-2.5 text-xs font-medium text-indigo-600">
                    {item.id}
                  </td>

                  <td className="px-3 py-2.5 text-xs font-medium text-slate-700">
                    {item.category}
                  </td>

                  <td className="px-3 py-2.5 text-xs font-medium text-slate-700">
                    {item.department}
                  </td>

                  <td className="px-3 py-2.5 text-xs font-medium text-slate-700">
                    {item.location}
                  </td>

                  <td className="px-3 py-2.5">
                    <StatusBadge status={item.status} />
                  </td>

                  <td className="px-3 py-2.5">
                    <Condition condition={item.condition} />
                  </td>

                  <td className="px-3 py-2.5 text-xs font-medium text-slate-700">
                    {item.purchaseDate}
                  </td>

                  <td className="px-3 py-2.5">
                    {item.assignedTo ? (
                      <div className="flex items-center gap-2.5">
                        <div className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gradient-to-br from-slate-700 to-slate-500 text-[10px] font-medium text-white">
                          {item.avatar}
                        </div>

                        <div>
                          <p className="text-xs font-medium text-slate-700">
                            {item.assignedTo}
                          </p>
                          <p className="text-[10px] text-slate-400">
                            {item.employeeId}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <span className="text-xs text-slate-400">-</span>
                    )}
                  </td>

                  <td className="px-3 py-2.5">
                    <div className="flex items-center gap-1.5">
                      <button className="grid h-7 w-7 place-items-center rounded-md border border-slate-200 text-indigo-600 transition hover:bg-indigo-50">
                        <Eye size={13} />
                      </button>

                      <button className="grid h-7 w-7 place-items-center rounded-md border border-slate-200 text-slate-600 transition hover:bg-slate-50">
                        <MoreVertical size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex min-h-[54px] items-center justify-between border-t border-slate-100 px-4">
          <p className="text-xs text-slate-500">
            Showing 1 to 10 of 2,146 assets
          </p>

          <div className="flex items-center gap-1.5">
            <PageButton>
              <ChevronLeft size={13} />
            </PageButton>

            {[1, 2, 3].map((num) => (
              <PageButton
                key={num}
                active={page === num}
                onClick={() => setPage(num)}
              >
                {num}
              </PageButton>
            ))}

            <span className="px-1 text-xs text-slate-500">...</span>

            <PageButton>215</PageButton>

            <PageButton>
              <ChevronRight size={13} />
            </PageButton>
          </div>
        </div>
      </section>
    </main>
  );
}

function AddAssetModal({ visible, onClose }) {
  const inputClass = "h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100";
  const submit = (event) => { event.preventDefault(); onClose(); };
  return <div onMouseDown={(event) => event.target === event.currentTarget && onClose()} className={`fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 p-4 backdrop-blur-[1px] transition-opacity duration-200 ${visible ? "opacity-100" : "opacity-0"}`}>
    <section role="dialog" aria-modal="true" aria-labelledby="add-asset-title" className={`flex max-h-[calc(100vh-32px)] w-full max-w-[760px] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl transition-all duration-200 ease-out ${visible ? "translate-y-0 scale-100 opacity-100" : "translate-y-5 scale-[0.96] opacity-0"}`}>
      <header className="flex items-start justify-between border-b border-slate-200 px-6 py-5"><div><h2 id="add-asset-title" className="text-xl font-bold">Add New Asset</h2><p className="mt-1 text-sm text-slate-500">Enter asset details to add it to your inventory.</p></div><button type="button" onClick={onClose} aria-label="Close" className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-100"><X size={18}/></button></header>
      <form onSubmit={submit} className="overflow-y-auto px-6 py-5"><h3 className="mb-4 text-sm font-semibold">Asset Information</h3><div className="grid grid-cols-2 gap-x-5 gap-y-4">
        <ModalField label="Asset Name" required><input required placeholder="Enter asset name" className={inputClass}/></ModalField>
        <ModalField label="Asset Type" required><select required defaultValue="" className={inputClass}><option value="" disabled>Select asset type</option><option>Laptop</option><option>Monitor</option><option>Keyboard</option><option>CPU</option></select></ModalField>
        <ModalField label="Asset ID / Tag" required hint="This will be used as a unique identifier."><div className="relative"><input required placeholder="Enter asset ID or scan barcode" className={`${inputClass} pr-10`}/><ScanBarcode size={17} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"/></div></ModalField>
        <ModalField label="Serial Number"><input placeholder="Enter serial number (optional)" className={inputClass}/></ModalField>
        <ModalField label="Category" required><select required defaultValue="" className={inputClass}><option value="" disabled>Select category</option><option>Computer</option><option>Accessory</option><option>Furniture</option></select></ModalField>
        <ModalField label="Brand"><input placeholder="Enter brand (optional)" className={inputClass}/></ModalField><ModalField label="Model"><input placeholder="Enter model (optional)" className={inputClass}/></ModalField><ModalField label="Purchase Date"><ModalDate placeholder="Select purchase date" inputClass={inputClass}/></ModalField><ModalField label="Purchase Cost (₹)"><input type="number" min="0" placeholder="Enter purchase cost (optional)" className={inputClass}/></ModalField><ModalField label="Warranty Expiry"><ModalDate placeholder="Select warranty expiry date (optional)" inputClass={inputClass}/></ModalField>
      </div><h3 className="mb-4 mt-6 text-sm font-semibold">Assignment Details</h3><div className="grid grid-cols-2 gap-x-5 gap-y-4">
        <ModalField label="Department" required><select required defaultValue="" className={inputClass}><option value="" disabled>Select department</option><option>Operations</option><option>HR</option><option>Technical</option><option>Finance</option></select></ModalField><ModalField label="Location / Workstation" required><select required defaultValue="" className={inputClass}><option value="" disabled>Select location or workstation</option><option>OPS-WS-015</option><option>HR-WS-003</option><option>IT-WS-012</option></select></ModalField><ModalField label="Assign To"><select defaultValue="" className={inputClass}><option value="">Select employee (optional)</option><option>Rahul Sharma</option><option>Priya Sharma</option></select></ModalField><ModalField label="Status" required><select defaultValue="Available" className={inputClass}><option>Available</option><option>Assigned</option><option>Under Repair</option></select></ModalField>
      </div><h3 className="mb-4 mt-6 text-sm font-semibold">Additional Information</h3><textarea maxLength={300} rows={3} placeholder="Enter any additional notes (optional)" className="w-full resize-none rounded-lg border border-slate-200 p-3 text-sm font-medium outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100"/><label className="mt-4 flex min-h-[84px] cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-violet-300 bg-violet-50/30 px-4 text-center hover:bg-violet-50"><UploadCloud size={24} className="text-violet-600"/><span className="mt-2 text-sm font-semibold text-violet-600">Upload Asset Image (optional)</span><span className="mt-1 text-xs text-slate-500">Drag and drop or click to browse · JPG, PNG up to 2MB</span><input type="file" accept="image/png,image/jpeg" className="hidden"/></label><footer className="mt-6 flex justify-end gap-3 border-t border-slate-100 pt-5"><button type="button" onClick={onClose} className="h-10 min-w-28 rounded-lg border border-slate-200 px-5 text-sm font-semibold text-slate-700 hover:bg-slate-50">Cancel</button><button type="submit" className="h-10 min-w-28 rounded-lg bg-violet-600 px-5 text-sm font-semibold text-white hover:bg-violet-700">Add Asset</button></footer></form>
    </section></div>;
}
function ModalField({label,required,hint,children}){return <label className="block"><span className="mb-1.5 block text-xs font-semibold text-slate-600">{label}{required&&<span className="ml-1 text-rose-500">*</span>}</span>{children}{hint&&<span className="mt-1.5 block text-[11px] text-slate-500">{hint}</span>}</label>}
function ModalDate({placeholder,inputClass}){return <div className="relative"><input type="text" placeholder={placeholder} className={`${inputClass} pr-10`}/><CalendarDays size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"/></div>}
function FilterSelect({ label, value, setValue, options }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-slate-600">
        {label}
      </label>

      <select
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-xs font-medium text-slate-700 outline-none focus:border-violet-300 focus:ring-2 focus:ring-violet-100"
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    Assigned: "bg-emerald-50 text-emerald-600",
    Available: "bg-blue-50 text-blue-600",
    "Under Repair": "bg-orange-50 text-orange-600",
    "Lost / Missing": "bg-rose-50 text-rose-600",
  };

  return (
    <span
      className={`inline-flex rounded-md px-2 py-1 text-[10px] font-medium ${
        styles[status] || "bg-slate-100 text-slate-600"
      }`}
    >
      {status}
    </span>
  );
}

function Condition({ condition }) {
  if (condition === "-") {
    return <span className="text-xs text-slate-400">-</span>;
  }

  const isGood = condition === "Good";

  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-slate-700">
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          isGood ? "bg-emerald-500" : "bg-orange-500"
        }`}
      />
      {condition}
    </span>
  );
}

function PageButton({ children, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`grid h-8 min-w-8 place-items-center rounded-md border px-2 text-xs font-semibold transition ${
        active
          ? "border-violet-600 bg-violet-600 text-white shadow-sm"
          : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
      }`}
    >
      {children}
    </button>
  );
}



