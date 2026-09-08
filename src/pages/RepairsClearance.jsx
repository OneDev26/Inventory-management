import PageButton from "../components/PageButton";
import Header from "../components/Header";
import clearanceBoxImage from "../assets/clearance_box.png";
import monitorImage from "../assets/monitor.png";
import keyboardImage from "../assets/keyboard.png";
import laptopImage from "../assets/laptop.png";
import mouseImage from "../assets/mouse.png";
import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Eye,
  MoreVertical,
  Plus,
  Search,
  Trash2,
  Wrench,
  UploadCloud,
  X,
  XCircle,
} from "lucide-react";

const repairStats = [
  {
    title: "Total Repair Requests",
    value: "24",
    subtitle: "All time",
    icon: Wrench,
    iconClass: "bg-violet-50 text-violet-600",
  },
  {
    title: "In Progress",
    value: "9",
    subtitle: "Currently in repair",
    icon: Clock3,
    iconClass: "bg-amber-50 text-amber-500",
  },
  {
    title: "Completed Repairs",
    value: "12",
    subtitle: "This month",
    icon: CheckCircle2,
    iconClass: "bg-emerald-50 text-emerald-600",
  },
  {
    title: "Waiting for Parts",
    value: "3",
    subtitle: "Pending parts",
    icon: XCircle,
    iconClass: "bg-rose-50 text-rose-500",
  },
];

const repairs = [
  {
    id: "RP-2024-0024",
    image: monitorImage,
    asset: 'Dell 24" Monitor',
    serial: "SN: DMP24AB5678",
    assetType: "Monitor",
    reportedBy: "Rahul Sharma",
    department: "Operations",
    initials: "RS",
    issue: "Display flickering intermittently",
    status: "In Progress",
    priority: "High",
    reportedOn: "12 May 2024",
  },
  {
    id: "RP-2024-0023",
    image: keyboardImage,
    asset: "Logitech Keyboard K120",
    serial: "SN: KB120X9876",
    assetType: "Keyboard",
    reportedBy: "Priya Mehta",
    department: "HR",
    initials: "PM",
    issue: "Some keys not working",
    status: "Waiting for Parts",
    priority: "Medium",
    reportedOn: "10 May 2024",
  },
  {
    id: "RP-2024-0022",
    image: laptopImage,
    asset: "Dell Latitude 5420",
    serial: "SN: DL5420Z1122",
    assetType: "Laptop",
    reportedBy: "Ankit Verma",
    department: "IT Support",
    initials: "AV",
    issue: "Laptop overheating",
    status: "Completed",
    priority: "Low",
    reportedOn: "08 May 2024",
  },
  {
    id: "RP-2024-0021",
    image: mouseImage,
    asset: "Logitech Mouse M100",
    serial: "SN: M5100P6654",
    assetType: "Mouse",
    reportedBy: "Neha Singh",
    department: "Finance",
    initials: "NS",
    issue: "Scroll wheel not working",
    status: "In Progress",
    priority: "High",
    reportedOn: "07 May 2024",
  },
  {
    id: "RP-2024-0020", image: laptopImage, asset: "Dell Latitude 7430", serial: "SN: DL7430X2218", assetType: "Laptop", reportedBy: "Vikram Patil", department: "Operations", initials: "VP", issue: "Battery drains quickly", status: "Waiting for Parts", priority: "Medium", reportedOn: "06 May 2024",
  },
  {
    id: "RP-2024-0019", image: monitorImage, asset: 'Dell 27" Monitor', serial: "SN: DMP27C4532", assetType: "Monitor", reportedBy: "Kavya Reddy", department: "Sales", initials: "KR", issue: "Screen has dead pixels", status: "In Progress", priority: "High", reportedOn: "05 May 2024",
  },
  {
    id: "RP-2024-0018", image: keyboardImage, asset: "Logitech Keyboard MX Keys", serial: "SN: MXKEY44321", assetType: "Keyboard", reportedBy: "Arjun Das", department: "IT Support", initials: "AD", issue: "Wireless connection drops", status: "Completed", priority: "Low", reportedOn: "04 May 2024",
  },
  {
    id: "RP-2024-0017", image: mouseImage, asset: "Logitech Mouse M185", serial: "SN: M185P7710", assetType: "Mouse", reportedBy: "Priya Mehta", department: "HR", initials: "PM", issue: "Left button double-clicking", status: "Completed", priority: "Medium", reportedOn: "03 May 2024",
  },];

const clearances = [
  {
    id: "CL-2024-0015",
    employee: "Vikram Patil",
    employeeId: "EMP-1076",
    initials: "VP",
    department: "Operations",
    lastWorkingDay: "15 May 2024",
    initiatedOn: "12 May 2024",
    items: 5,
    status: "In Progress",
  },
  {
    id: "CL-2024-0014",
    employee: "Kavya Reddy",
    employeeId: "EMP-1199",
    initials: "KR",
    department: "Sales",
    lastWorkingDay: "10 May 2024",
    initiatedOn: "10 May 2024",
    items: 3,
    status: "Completed",
  },
  {
    id: "CL-2024-0013",
    employee: "Arjun Das",
    employeeId: "EMP-1033",
    initials: "AD",
    department: "IT Support",
    lastWorkingDay: "05 May 2024",
    initiatedOn: "05 May 2024",
    items: 4,
    status: "Pending",
  },
  {
    id: "CL-2024-0012", employee: "Neha Singh", employeeId: "EMP-1156", initials: "NS", department: "Finance", lastWorkingDay: "02 May 2024", initiatedOn: "01 May 2024", items: 2, status: "Completed",
  },
  {
    id: "CL-2024-0011", employee: "Rahul Sharma", employeeId: "EMP-1087", initials: "RS", department: "Operations", lastWorkingDay: "30 Apr 2024", initiatedOn: "28 Apr 2024", items: 6, status: "Completed",
  },
  {
    id: "CL-2024-0010", employee: "Priya Mehta", employeeId: "EMP-1043", initials: "PM", department: "HR", lastWorkingDay: "28 Apr 2024", initiatedOn: "27 Apr 2024", items: 3, status: "In Progress",
  },
  {
    id: "CL-2024-0009", employee: "Ankit Verma", employeeId: "EMP-1122", initials: "AV", department: "IT Support", lastWorkingDay: "25 Apr 2024", initiatedOn: "24 Apr 2024", items: 5, status: "Cancelled",
  },
  {
    id: "CL-2024-0008", employee: "Meera Joshi", employeeId: "EMP-1204", initials: "MJ", department: "Admin", lastWorkingDay: "22 Apr 2024", initiatedOn: "20 Apr 2024", items: 4, status: "Pending",
  },];

export default function RepairsClearance() {
  const [tab, setTab] = useState("repairs");
  const [repairRows, setRepairRows] = useState(repairs);
  const [clearanceRows, setClearanceRows] = useState(clearances);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [openActionId, setOpenActionId] = useState(null);

  const [repairStatus, setRepairStatus] = useState("All Status");
  const [repairCategory, setRepairCategory] = useState("All Categories");
  const [repairSearch, setRepairSearch] = useState("");
  const [repairModalMounted, setRepairModalMounted] = useState(false);
  const [repairModalVisible, setRepairModalVisible] = useState(false);
  const openRepairModal = () => { setRepairModalMounted(true); requestAnimationFrame(() => requestAnimationFrame(() => setRepairModalVisible(true))); };
  const closeRepairModal = () => { setRepairModalVisible(false); window.setTimeout(() => setRepairModalMounted(false), 240); };
  useEffect(() => {
    if (!repairModalMounted) return undefined;
    const handleKeyDown = (event) => event.key === "Escape" && closeRepairModal();
    document.addEventListener("keydown", handleKeyDown); document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", handleKeyDown); document.body.style.overflow = ""; };
  }, [repairModalMounted]);

  const [clearanceStatus, setClearanceStatus] = useState("All Status");
  const [clearanceDepartment, setClearanceDepartment] =
    useState("All Departments");
  const [clearanceSearch, setClearanceSearch] = useState("");

  useEffect(() => {
    if (!openActionId) return undefined;
    const close = () => setOpenActionId(null);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [openActionId]);

  const changeStatus = (type, id, status) => {
    const setter = type === "repair" ? setRepairRows : setClearanceRows;
    setter((rows) => rows.map((row) => row.id === id ? { ...row, status } : row));
    setOpenActionId(null);
  };
  const deleteRow = (type, id) => {
    const setter = type === "repair" ? setRepairRows : setClearanceRows;
    setter((rows) => rows.filter((row) => row.id !== id));
    setOpenActionId(null);
  };

  const filteredRepairs = useMemo(() => {
    const q = repairSearch.trim().toLowerCase();

    return repairRows.filter((item) => {
      const searchMatch =
        !q ||
        item.id.toLowerCase().includes(q) ||
        item.asset.toLowerCase().includes(q) ||
        item.reportedBy.toLowerCase().includes(q) ||
        item.issue.toLowerCase().includes(q);

      const statusMatch =
        repairStatus === "All Status" || item.status === repairStatus;

      const categoryMatch =
        repairCategory === "All Categories" ||
        item.assetType === repairCategory;

      return searchMatch && statusMatch && categoryMatch;
    });
  }, [repairSearch, repairStatus, repairCategory, repairRows]);

  const filteredClearances = useMemo(() => {
    const q = clearanceSearch.trim().toLowerCase();

    return clearanceRows.filter((item) => {
      const searchMatch =
        !q ||
        item.id.toLowerCase().includes(q) ||
        item.employee.toLowerCase().includes(q) ||
        item.employeeId.toLowerCase().includes(q);

      const statusMatch =
        clearanceStatus === "All Status" ||
        item.status === clearanceStatus;

      const departmentMatch =
        clearanceDepartment === "All Departments" ||
        item.department === clearanceDepartment;

      return searchMatch && statusMatch && departmentMatch;
    });
  }, [
    clearanceSearch,
    clearanceStatus,
    clearanceDepartment,
    clearanceRows,
  ]);

  return (
    <main className="min-h-screen bg-[#f8f9fc] px-4 py-5 font-['Geist',sans-serif] text-slate-900">
      {repairModalMounted && <NewRepairModal visible={repairModalVisible} onClose={closeRepairModal} />}
      {selectedRecord && <RecordDetailsModal type={selectedRecord.type} item={selectedRecord.item} onClose={() => setSelectedRecord(null)} />}
      {/* HEADER */}
      <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Repairs &amp; Clearance</h1>
          <p className="mt-1 text-sm font-normal text-slate-500">Manage asset repairs and employee clearance process.</p>
        </div>
        <Header />
      </div>

      {/* TOP TABS */}
      <div className="mb-3 flex border-b border-slate-200">
        <button
          onClick={() => setTab("repairs")}
          className={`border-b-2 px-6 pb-3 text-sm font-medium ${
            tab === "repairs"
              ? "border-violet-600 text-violet-600"
              : "border-transparent text-slate-500"
          }`}
        >
          Repairs
        </button>

        <button
          onClick={() => setTab("clearance")}
          className={`border-b-2 px-6 pb-3 text-sm font-medium ${
            tab === "clearance"
              ? "border-violet-600 text-violet-600"
              : "border-transparent text-slate-500"
          }`}
        >
          Clearance / End of Service
        </button>
      </div>

      {tab === "repairs" && <>
      {/* KPI CARDS */}
      <section className="mb-4 grid grid-cols-4 gap-3">
        {repairStats.map((card) => {
          const Icon = card.icon;

          return (
            <article
              key={card.title}
              className="flex min-h-[92px] items-center gap-4 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-[0_2px_8px_rgba(15,23,42,0.025)]"
            >
              <span
                className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${card.iconClass}`}
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

      {/* REPAIRS */}
      <section className="mb-4 overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="flex items-center justify-between gap-4 px-4 py-3">
          <h2 className="text-sm font-semibold">
            Repairs
          </h2>

          <div className="flex items-center gap-2">
            <SimpleSelect
              value={repairStatus}
              setValue={setRepairStatus}
              options={[
                "All Status",
                "In Progress",
                "Waiting for Parts",
                "Completed",
              ]}
              width="w-[130px]"
            />

            <SimpleSelect
              value={repairCategory}
              setValue={setRepairCategory}
              options={[
                "All Categories",
                "Monitor",
                "Keyboard",
                "Laptop",
                "Mouse",
              ]}
              width="w-[140px]"
            />

            <div className="flex h-9 w-[170px] items-center gap-2 rounded-md border border-slate-200 px-3">
              <input
                value={repairSearch}
                onChange={(e) =>
                  setRepairSearch(e.target.value)
                }
                placeholder="Search repairs..."
                className="min-w-0 flex-1 bg-transparent text-xs outline-none placeholder:text-slate-400"
              />

              <Search size={13} className="text-slate-400" />
            </div>

            <button type="button" onClick={openRepairModal} className="flex h-9 items-center gap-2 rounded-md bg-gradient-to-r from-violet-600 to-indigo-600 px-4 text-xs font-semibold text-white shadow-sm hover:brightness-95">
              <Plus size={13} />
              New Repair Request
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[950px] border-collapse">
            <thead>
              <tr className="bg-slate-50/80">
                {[
                  "Request ID",
                  "Asset",
                  "Reported By",
                  "Issue",
                  "Status",
                  "Priority",
                  "Reported On",
                  "Actions",
                ].map((heading) => (
                  <th
                    key={heading}
                    className="border-b border-slate-200 px-4 py-3 text-left text-[10px] font-medium text-slate-500"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {filteredRepairs.map((repair, index) => (
                <tr
                  key={repair.id}
                  className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50/60"
                >
                  <td className="px-4 py-3 text-xs font-medium text-indigo-600">
                    {repair.id}
                  </td>

                  <td className="px-4 py-3">
                    <AssetCell item={repair} />
                  </td>

                  <td className="px-4 py-3">
                    <EmployeeCell
                      name={repair.reportedBy}
                      department={repair.department}
                      initials={repair.initials}
                    />
                  </td>

                  <td className="max-w-[180px] px-4 py-3 text-xs leading-4 text-slate-600">
                    {repair.issue}
                  </td>

                  <td className="px-4 py-3">
                    <RepairStatus status={repair.status} />
                  </td>

                  <td className="px-4 py-3">
                    <PriorityBadge priority={repair.priority} />
                  </td>

                  <td className="px-4 py-3 text-xs text-slate-600">
                    {repair.reportedOn}
                  </td>

                  <td className="px-4 py-3">
                    <RowActions type="repair" item={repair} index={index} total={filteredRepairs.length} open={openActionId === repair.id} onToggle={(event) => { event.stopPropagation(); setOpenActionId((value) => value === repair.id ? null : repair.id); }} onView={() => setSelectedRecord({ type: "repair", item: repair })} onStatus={(status) => changeStatus("repair", repair.id, status)} onDelete={() => deleteRow("repair", repair.id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <TableFooter
          text="Showing 1 to 8 of 24 repairs"
          totalPage="6"
        />
      </section>

      </>}

      {tab === "clearance" && <>
      {/* CLEARANCE */}
      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="flex items-center justify-between gap-4 px-4 py-3">
          <h2 className="text-sm font-semibold">
            Clearance / End of Service
          </h2>

          <div className="flex items-center gap-2">
            <SimpleSelect
              value={clearanceStatus}
              setValue={setClearanceStatus}
              options={[
                "All Status",
                "In Progress",
                "Completed",
                "Pending",
                "Cancelled",
              ]}
              width="w-[130px]"
            />

            <SimpleSelect
              value={clearanceDepartment}
              setValue={setClearanceDepartment}
              options={[
                "All Departments",
                "Operations",
                "Sales",
                "IT Support",
                "HR",
                "Finance",
                "Admin",
              ]}
              width="w-[140px]"
            />

            <label className="relative"><CalendarDays size={13} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /><input type="date" aria-label="Last working day" className="h-9 w-[155px] rounded-md border border-slate-200 bg-white pl-9 pr-3 text-xs font-medium text-slate-700 outline-none" /></label>

            <div className="flex h-9 w-[185px] items-center gap-2 rounded-md border border-slate-200 px-3">
              <input
                value={clearanceSearch}
                onChange={(e) =>
                  setClearanceSearch(e.target.value)
                }
                placeholder="Search clearance..."
                className="min-w-0 flex-1 bg-transparent text-xs outline-none placeholder:text-slate-400"
              />

              <Search size={13} className="text-slate-400" />
            </div>

            <button className="flex h-9 items-center gap-2 rounded-md bg-gradient-to-r from-violet-600 to-indigo-600 px-4 text-xs font-semibold text-white shadow-sm hover:brightness-95">
              <Plus size={13} />
              New Clearance
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] border-collapse">
            <thead>
              <tr className="bg-slate-50/80">
                {[
                  "Clearance ID",
                  "Employee",
                  "Department",
                  "Last Working Day",
                  "Assets to Return",
                  "Status",
                  "Initiated On",
                  "Actions",
                ].map((heading) => (
                  <th
                    key={heading}
                    className="border-b border-slate-200 px-4 py-3 text-left text-[10px] font-medium text-slate-500"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {filteredClearances.map((item, index) => (
                <tr
                  key={item.id}
                  className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50/60"
                >
                  <td className="px-4 py-3 text-xs font-medium text-indigo-600">
                    {item.id}
                  </td>

                  <td className="px-4 py-3">
                    <EmployeeCell
                      name={item.employee}
                      employeeId={item.employeeId}
                      initials={item.initials}
                    />
                  </td>

                  <td className="px-4 py-3 text-xs text-slate-600">
                    {item.department}
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <CalendarDays
                        size={12}
                        className="text-slate-400"
                      />
                      {item.lastWorkingDay}
                    </div>
                  </td>

                  <td className="px-4 py-3">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <Box
                          size={12}
                          className="text-violet-600"
                        />

                        <span className="text-xs text-slate-700">
                          {item.items} Items
                        </span>
                      </div>

                      <button type="button" onClick={() => setSelectedRecord({ type: "clearance", item })} className="mt-1 text-[10px] font-medium text-violet-600 hover:underline">
                        View Items
                      </button>
                    </div>
                  </td>

                  <td className="px-4 py-3">
                    <ClearanceStatus status={item.status} />
                  </td>

                  <td className="px-4 py-3 text-xs font-medium text-slate-600">{item.initiatedOn}</td>

                  <td className="px-4 py-3">
                    <RowActions type="clearance" item={item} index={index} total={filteredClearances.length} open={openActionId === item.id} onToggle={(event) => { event.stopPropagation(); setOpenActionId((value) => value === item.id ? null : item.id); }} onView={() => setSelectedRecord({ type: "clearance", item })} onStatus={(status) => changeStatus("clearance", item.id, status)} onDelete={() => deleteRow("clearance", item.id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <TableFooter
          text="Showing 1 to 8 of 18 clearance records"
          totalPage="6"
        />
      </section>

      <section className="mt-4 grid items-center gap-6 rounded-xl border border-violet-100 bg-gradient-to-r from-violet-50/70 via-white to-violet-50/60 px-6 py-5 lg:grid-cols-[1.5fr_1fr]">
        <div className="flex items-center gap-5">
          <div className="h-24 w-40 shrink-0 overflow-hidden rounded-lg"><img className="h-full w-full object-contain" src={clearanceBoxImage} alt="Clearance return box" /></div>
          <div><h2 className="text-sm font-semibold text-slate-800">Clearance Process</h2><p className="mt-2 max-w-xl text-xs font-normal leading-5 text-slate-500">Ensure all assigned assets are returned and all dues are cleared before completing the end of service.</p></div>
        </div>
        <div className="space-y-3 text-xs font-medium text-slate-600"><p>▣ &nbsp; Initiate clearance for an employee</p><p>▣ &nbsp; Track asset return and clearance status</p><p>▣ &nbsp; Generate clearance report after completion</p></div>
      </section>
      </>}    </main>
  );
}

function NewRepairModal({ visible, onClose }) {
  const [assetId,setAssetId]=useState(""); const chosen=repairs.find((item)=>item.id===assetId); const inputClass="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100";
  return <div onMouseDown={(event)=>event.target===event.currentTarget&&onClose()} className={`fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 p-4 backdrop-blur-[1px] transition-opacity duration-200 ${visible?"opacity-100":"opacity-0"}`}><section role="dialog" aria-modal="true" className={`flex max-h-[calc(100vh-32px)] w-full max-w-[760px] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl transition-all duration-200 ease-out ${visible?"translate-y-0 scale-100 opacity-100":"translate-y-5 scale-[0.96] opacity-0"}`}>
    <header className="flex items-start justify-between border-b border-slate-200 px-6 py-5"><div><h2 className="text-xl font-bold">New Repair Request</h2><p className="mt-1 text-sm text-slate-500">Create a new repair request for a faulty asset.</p></div><button type="button" onClick={onClose} className="grid h-9 w-9 place-items-center rounded-lg text-slate-500 hover:bg-slate-100"><X size={18}/></button></header>
    <form onSubmit={(event)=>{event.preventDefault();onClose()}} className="overflow-y-auto"><RepairStep number="1" title="Asset Details"><div className="grid grid-cols-2 gap-5"><RepairField label="Asset" required><select required value={assetId} onChange={(e)=>setAssetId(e.target.value)} className={inputClass}><option value="">Select an asset</option>{repairs.map((item)=><option key={item.id} value={item.id}>{item.asset}</option>)}</select></RepairField><RepairField label="Asset ID / Serial Number"><input readOnly value={chosen?`${chosen.id} · ${chosen.serial}`:""} placeholder="Auto-filled" className={`${inputClass} bg-slate-50 text-slate-500`}/></RepairField><RepairField label="Category"><select value={chosen?.assetType||""} onChange={()=>{}} className={inputClass}><option value="">Select category</option><option>{chosen?.assetType}</option></select></RepairField><RepairField label="Location / Workstation"><select defaultValue="" className={inputClass}><option value="">Select location</option><option>OPS-WS-015</option><option>HR-WS-003</option><option>IT-WS-012</option></select></RepairField></div></RepairStep>
      <RepairStep number="2" title="Issue Details"><div className="grid grid-cols-2 gap-5"><RepairField label="Issue" required><textarea required maxLength={300} rows={4} placeholder="Describe the issue..." className="w-full resize-none rounded-lg border border-slate-200 p-3 text-sm outline-none focus:border-violet-400"/></RepairField><div className="space-y-4"><RepairField label="Priority" required><select required defaultValue="" className={inputClass}><option value="">Select priority</option><option>High</option><option>Medium</option><option>Low</option></select></RepairField><RepairField label="Issue Type"><select defaultValue="" className={inputClass}><option value="">Select issue type</option><option>Hardware</option><option>Software</option><option>Physical Damage</option></select></RepairField></div><RepairField label="Issue Reported By" required><select required defaultValue="" className={inputClass}><option value="">Select employee</option><option>Rahul Sharma</option><option>Priya Mehta</option><option>Ankit Verma</option><option>Neha Singh</option></select></RepairField><RepairField label="Reported On"><div className="relative"><CalendarDays size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/><input type="date" defaultValue="2024-05-12" className={`${inputClass} pl-9`}/></div></RepairField></div></RepairStep>
      <RepairStep number="3" title="Additional Information"><div className="grid grid-cols-2 gap-5"><RepairField label="Attach Photo (Optional)"><label className="flex min-h-[110px] cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-violet-300 bg-violet-50/30"><UploadCloud size={25} className="text-violet-600"/><span className="mt-2 text-sm font-semibold text-violet-600">Click to upload or drag and drop</span><span className="mt-1 text-xs text-slate-500">PNG, JPG up to 5MB</span><input type="file" accept="image/png,image/jpeg" className="hidden"/></label></RepairField><RepairField label="Notes (Optional)"><textarea maxLength={300} rows={4} placeholder="Add any additional notes..." className="min-h-[110px] w-full resize-none rounded-xl border border-slate-200 p-3 text-sm outline-none focus:border-violet-400"/></RepairField></div></RepairStep>
      <footer className="flex justify-end gap-3 px-6 py-4"><button type="button" onClick={onClose} className="h-10 min-w-24 rounded-lg border border-slate-200 px-4 text-sm font-semibold text-slate-700 hover:bg-slate-50">Cancel</button><button type="submit" className="flex h-10 min-w-44 items-center justify-center gap-2 rounded-lg bg-violet-600 px-5 text-sm font-semibold text-white hover:bg-violet-700"><Wrench size={15}/>Create Repair Request</button></footer>
    </form></section></div>;
}
function RepairStep({number,title,children}){return <section className="border-b border-slate-200 px-6 py-5"><h3 className="mb-4 flex items-center gap-2 text-sm font-semibold"><span className="grid h-6 w-6 place-items-center rounded-full bg-violet-600 text-xs font-bold text-white">{number}</span>{title}</h3>{children}</section>}
function RepairField({label,required,children}){return <label className="block"><span className="mb-1.5 block text-xs font-semibold text-slate-600">{label}{required&&<span className="ml-1 text-rose-500">*</span>}</span>{children}</label>}
function AssetCell({ item }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-10 w-12 shrink-0 overflow-hidden rounded-md bg-slate-50">
        <img className="h-full w-full object-contain p-0.5" src={item.image} alt={item.asset} />
      </span>

      <div>
        <p className="text-xs font-medium text-slate-800">
          {item.asset}
        </p>

        <p className="mt-0.5 text-[10px] text-slate-400">
          {item.serial}
        </p>
      </div>
    </div>
  );
}

function EmployeeCell({
  name,
  department,
  employeeId,
  initials,
}) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gradient-to-br from-slate-700 to-slate-500 text-[10px] font-semibold text-white">
        {initials}
      </span>

      <div>
        <p className="text-xs font-medium text-slate-800">
          {name}
        </p>

        <p className="mt-0.5 text-[10px] text-slate-400">
          {employeeId || department}
        </p>
      </div>
    </div>
  );
}

function RepairStatus({ status }) {
  const styles = {
    "In Progress": "bg-amber-50 text-amber-600",
    "Waiting for Parts": "bg-blue-50 text-blue-600",
    Completed: "bg-emerald-50 text-emerald-600",
  };

  return (
    <span
      className={`inline-flex rounded-md px-2.5 py-1 text-[10px] font-medium ${styles[status]}`}
    >
      {status}
    </span>
  );
}

function ClearanceStatus({ status }) {
  const styles = {
    "In Progress": "bg-amber-50 text-amber-600",
    Completed: "bg-emerald-50 text-emerald-600",
    Pending: "bg-slate-100 text-slate-600",
    Cancelled: "bg-rose-50 text-rose-600",
  };

  return (
    <span
      className={`inline-flex min-w-[62px] justify-center rounded-md px-2.5 py-1 text-[10px] font-medium ${styles[status]}`}
    >
      {status}
    </span>
  );
}

function PriorityBadge({ priority }) {
  const styles = {
    High: "bg-rose-50 text-rose-600",
    Medium: "bg-amber-50 text-amber-600",
    Low: "bg-emerald-50 text-emerald-600",
  };

  return (
    <span
      className={`inline-flex min-w-[48px] justify-center rounded-md px-2 py-1 text-[10px] font-medium ${styles[priority]}`}
    >
      {priority}
    </span>
  );
}

function RowActions({ type, item, index, total, open, onToggle, onView, onStatus, onDelete }) {
  const statuses = type === "repair" ? ["In Progress", "Waiting for Parts", "Completed"] : ["Pending", "In Progress", "Completed", "Cancelled"];
  return <div className="flex items-center gap-2"><button type="button" onClick={onView} className="grid h-8 w-8 place-items-center rounded-md border border-slate-200 text-indigo-600 hover:bg-indigo-50"><Eye size={13}/></button><div className="relative"><button type="button" onClick={onToggle} className="grid h-8 w-8 place-items-center rounded-md border border-slate-200 text-slate-500 hover:bg-slate-50"><MoreVertical size={14}/></button>{open && <div onClick={(event) => event.stopPropagation()} className={`absolute right-0 z-30 w-48 origin-top-right animate-[repair-menu-in_160ms_ease-out] rounded-lg border border-slate-200 bg-white py-1.5 shadow-xl ${index >= total - 2 ? "bottom-10" : "top-10"}`}>{statuses.filter((status) => status !== item.status).map((status) => <button key={status} type="button" onClick={() => onStatus(status)} className="block w-full px-3 py-2 text-left text-xs font-medium hover:bg-slate-50">Mark {status}</button>)}<div className="my-1 border-t border-slate-100"/><button type="button" onClick={onDelete} className="flex w-full items-center gap-2 px-3 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50"><Trash2 size={14}/>Delete Record</button></div>}</div></div>;
}
function RecordDetailsModal({ type, item, onClose }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
    const handleKeyDown = (event) => event.key === "Escape" && handleClose();
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", handleKeyDown); document.body.style.overflow = ""; };
  }, []);
  const handleClose = () => { setVisible(false); window.setTimeout(onClose, 220); };
  const repair = type === "repair";
  return <div onMouseDown={(event) => event.target === event.currentTarget && handleClose()} className={`fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 p-4 backdrop-blur-[1px] transition-opacity duration-200 ${visible ? "opacity-100" : "opacity-0"}`}><section className={`w-full max-w-[620px] rounded-2xl bg-white shadow-2xl transition-all duration-200 ease-out ${visible ? "translate-y-0 scale-100 opacity-100" : "translate-y-5 scale-[0.96] opacity-0"}`}><header className="flex justify-between border-b border-slate-200 px-6 py-5"><div><h2 className="text-xl font-bold">{repair ? "Repair Request Details" : "Clearance Details"}</h2><p className="mt-1 text-sm text-slate-500">{item.id}</p></div><button type="button" onClick={handleClose} className="grid h-9 w-9 place-items-center rounded-lg transition hover:bg-slate-100"><X size={18}/></button></header><div className="p-6">{repair ? <AssetCell item={item}/> : <EmployeeCell name={item.employee} employeeId={item.employeeId} initials={item.initials}/>}<div className="mt-5 grid grid-cols-2 gap-4 rounded-xl bg-slate-50 p-4"><Detail label="Department" value={item.department}/><Detail label={repair ? "Reported On" : "Last Working Day"} value={repair ? item.reportedOn : item.lastWorkingDay}/><Detail label={repair ? "Issue" : "Assets to Return"} value={repair ? item.issue : `${item.items} Items`}/><Detail label="Status" value={item.status}/></div></div></section></div>;
}
function Detail({ label, value }) { return <div><p className="text-[10px] font-semibold uppercase text-slate-400">{label}</p><p className="mt-2 text-xs font-medium text-slate-700">{value}</p></div>; }

function SimpleSelect({
  value,
  setValue,
  options,
  width,
}) {
  return (
    <select
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className={`${width} h-9 rounded-md border border-slate-200 bg-white px-3 text-xs font-medium text-slate-700 outline-none focus:border-violet-300`}
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
  );
}

function TableFooter({ text, totalPage }) {
  return (
    <div className="flex min-h-[56px] items-center justify-between border-t border-slate-100 px-4">
      <p className="text-[10px] text-slate-500">
        {text}
      </p>

      <div className="flex items-center gap-1.5">
        <PageButton textSize="tiny">
          <ChevronLeft size={12} />
        </PageButton>

        <PageButton textSize="tiny" active>
          1
        </PageButton>

        <PageButton textSize="tiny">
          2
        </PageButton>

        <PageButton textSize="tiny">
          3
        </PageButton>

        <span className="px-1 text-[10px] text-slate-400">
          ...
        </span>

        <PageButton textSize="tiny">
          {totalPage}
        </PageButton>

        <PageButton textSize="tiny">
          <ChevronRight size={12} />
        </PageButton>
      </div>
    </div>
  );
}

