import { useEffect, useMemo, useState } from "react";
import { Box, CheckSquare, ChevronLeft, ChevronRight, Clock3, Edit3, Filter, MoreVertical, Package, Plus, Search, UserRound, X } from "lucide-react";
import Header from "../components/Header";
import noAssetsImage from "../assets/no_assets.png";
import laptopImage from "../assets/laptop.png";
import monitorImage from "../assets/monitor.png";
import keyboardImage from "../assets/keyboard.png";
import mouseImage from "../assets/mouse.png";
import dockingImage from "../assets/docking_station.png";

const stats = [
  { title: "Total Employees", value: "128", subtitle: "All active employees", icon: UserRound, style: "bg-violet-50 text-violet-600" },
  { title: "Assigned Employees", value: "96", subtitle: "With assigned inventory", icon: CheckSquare, style: "bg-emerald-50 text-emerald-600" },
  { title: "Not Assigned", value: "32", subtitle: "No inventory assigned", icon: Clock3, style: "bg-amber-50 text-amber-500" },
  { title: "Total Assigned Items", value: "264", subtitle: "Across all employees", icon: Box, style: "bg-blue-50 text-blue-600" },
];

const employees = [
  { name: "Rahul Sharma", id: "EMP-1087", department: "Operations", location: "OPS-WS-01", items: 6, date: "12 May 2024", status: "Active", initials: "RS", avatar: "bg-blue-100 text-blue-700" },
  { name: "Priya Mehta", id: "EMP-1043", department: "HR", location: "HR-WS-02", items: 4, date: "10 May 2024", status: "Active", initials: "PM", avatar: "bg-rose-100 text-rose-700" },
  { name: "Ankit Verma", id: "EMP-1122", department: "IT Support", location: "IT-WS-03", items: 5, date: "09 May 2024", status: "Active", initials: "AV", avatar: "bg-amber-100 text-amber-700" },
  { name: "Neha Singh", id: "EMP-1156", department: "Finance", location: "FIN-WS-01", items: 3, date: "08 May 2024", status: "Active", initials: "NS", avatar: "bg-violet-100 text-violet-700" },
  { name: "Vikram Patil", id: "EMP-1076", department: "Operations", location: "OPS-WS-02", items: 7, date: "07 May 2024", status: "Inactive", initials: "VP", avatar: "bg-cyan-100 text-cyan-700" },
  { name: "Kavya Reddy", id: "EMP-1199", department: "Sales", location: "SALES-WS-01", items: 0, date: "-", status: "Not Assigned", initials: "KR", avatar: "bg-pink-100 text-pink-700" },
];

export default function EmployeeAssignment() {
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All Departments");
  const [location, setLocation] = useState("All Locations");
  const [status, setStatus] = useState("All Status");
  const [page, setPage] = useState(1);
  const [assignModalMounted, setAssignModalMounted] = useState(false);
  const [assignModalVisible, setAssignModalVisible] = useState(false);
  const openAssignModal = () => { setAssignModalMounted(true); requestAnimationFrame(() => requestAnimationFrame(() => setAssignModalVisible(true))); };
  const closeAssignModal = () => { setAssignModalVisible(false); window.setTimeout(() => setAssignModalMounted(false), 240); };
  useEffect(() => {
    if (!assignModalMounted) return undefined;
    const handleKeyDown = (event) => event.key === "Escape" && closeAssignModal();
    document.addEventListener("keydown", handleKeyDown); document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", handleKeyDown); document.body.style.overflow = ""; };
  }, [assignModalMounted]);

  const filtered = useMemo(() => employees.filter((employee) => {
    const q = search.trim().toLowerCase();
    return (!q || employee.name.toLowerCase().includes(q) || employee.id.toLowerCase().includes(q)) &&
      (department === "All Departments" || employee.department === department) &&
      (location === "All Locations" || employee.location === location) &&
      (status === "All Status" || employee.status === status);
  }), [search, department, location, status]);

  return <main className="min-h-screen bg-[#f8f9fc] p-4 text-slate-900">
    {assignModalMounted && <AssignInventoryModal visible={assignModalVisible} onClose={closeAssignModal} />}
    <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
      <div><h1 className="text-2xl font-bold tracking-tight">Employee Assignments</h1><p className="mt-1 text-sm font-normal text-slate-500">View employees and manage their assigned inventory.</p></div>
      <Header />
    </div>

    <section className="mb-4 grid grid-cols-2 gap-3 xl:grid-cols-4">
      {stats.map(({ title, value, subtitle, icon: Icon, style }) => <article key={title} className="flex min-h-[104px] items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-[0_2px_8px_rgba(15,23,42,0.025)]">
        <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl ${style}`}><Icon size={23} strokeWidth={2} /></span>
        <div><p className="text-xs font-medium text-slate-500">{title}</p><h2 className="mt-1 text-xl font-bold leading-none">{value}</h2><p className="mt-2 text-[10px] font-normal text-slate-500">{subtitle}</p></div>
      </article>)}
    </section>

    <section className="mb-4 rounded-xl border border-slate-200 bg-white p-3">
      <div className="grid items-end gap-3 lg:grid-cols-[1fr_1fr_1fr_1.25fr_auto_auto]">
        <Select label="Department" value={department} onChange={setDepartment} options={["All Departments", "Operations", "HR", "IT Support", "Finance", "Sales"]} />
        <Select label="Work Location" value={location} onChange={setLocation} options={["All Locations", "OPS-WS-01", "OPS-WS-02", "HR-WS-02", "IT-WS-03", "FIN-WS-01", "SALES-WS-01"]} />
        <Select label="Status" value={status} onChange={setStatus} options={["All Status", "Active", "Inactive", "Not Assigned"]} />
        <label className="flex h-9 items-center gap-2 rounded-md border border-slate-200 px-3 text-slate-400"><input value={search} onChange={(e) => setSearch(e.target.value)} className="min-w-0 flex-1 bg-transparent text-xs font-medium text-slate-700 outline-none placeholder:text-slate-400" placeholder="Search employees..." /><Search size={14} /></label>
        <button className="flex h-9 items-center gap-2 rounded-md border border-violet-200 px-4 text-xs font-semibold text-violet-600 hover:bg-violet-50"><Filter size={14} />Filter</button>
        <button type="button" onClick={openAssignModal} className="flex h-9 items-center gap-2 whitespace-nowrap rounded-md bg-gradient-to-r from-violet-600 to-indigo-600 px-4 text-sm font-semibold text-white shadow-sm"><Plus size={15} />Assign Inventory</button>
      </div>
    </section>

    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <div className="overflow-x-auto"><table className="w-full min-w-[980px] border-collapse">
        <thead><tr className="bg-slate-50/80 text-left">{["Employee", "Department", "Work Location", "Assigned Items", "Last Assigned", "Status", "Actions"].map((title) => <th key={title} className="border-b border-slate-200 px-4 py-3 text-xs font-medium text-slate-500">{title}</th>)}</tr></thead>
        <tbody>{filtered.map((employee) => <tr key={employee.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/60">
          <td className="px-4 py-3"><div className="flex items-center gap-3"><span className={`grid h-9 w-9 place-items-center rounded-full text-xs font-semibold ${employee.avatar}`}>{employee.initials}</span><div><p className="text-xs font-medium text-slate-800">{employee.name}</p><p className="mt-0.5 text-[10px] font-normal text-slate-400">{employee.id}</p></div></div></td>
          <td className="px-4 py-3 text-xs font-medium text-slate-700">{employee.department}</td>
          <td className="px-4 py-3 text-xs font-medium text-slate-700">{employee.location}</td>
          <td className="px-4 py-3"><div className="flex items-center gap-1.5 text-xs font-medium text-slate-700"><Package size={13} className="text-violet-600" />{employee.items ? `${employee.items} Items` : "-"}</div><button className="mt-1 text-[10px] font-semibold text-indigo-600">{employee.items ? "View Items" : "No items"}</button></td>
          <td className="px-4 py-3 text-xs font-medium text-slate-700">{employee.date}</td>
          <td className="px-4 py-3"><StatusBadge status={employee.status} /></td>
          <td className="px-4 py-3"><div className="flex gap-2"><button className="grid h-8 w-8 place-items-center rounded-md border border-slate-200 text-violet-600 hover:bg-violet-50"><Edit3 size={14} /></button><button className="grid h-8 w-8 place-items-center rounded-md border border-slate-200 text-slate-500 hover:bg-slate-50"><MoreVertical size={14} /></button></div></td>
        </tr>)}</tbody>
      </table></div>
      <div className="flex min-h-[58px] items-center justify-between border-t border-slate-100 px-4"><p className="text-[10px] font-normal text-slate-500">Showing 1 to {filtered.length} of 96 employees</p><div className="flex items-center gap-1.5"><PageButton><ChevronLeft size={14} /></PageButton>{[1,2,3].map((n) => <PageButton key={n} active={page === n} onClick={() => setPage(n)}>{n}</PageButton>)}<span className="px-1 text-xs text-slate-400">...</span><PageButton>16</PageButton><PageButton><ChevronRight size={14} /></PageButton></div></div>
    </section>
  </main>;
}

const assignableAssets = [
  { id: "LAP-OPS-0011", name: "Laptop - Dell Latitude 5420", category: "Laptop", image: laptopImage },
  { id: "MON-OPS-0071", name: 'Monitor 24” Dell P2422H', category: "Monitor", image: monitorImage },
  { id: "KEY-OPS-0168", name: "Keyboard - Logitech K120", category: "Keyboard", image: keyboardImage },
  { id: "MOU-OPS-0148", name: "Mouse - Logitech M100", category: "Mouse", image: mouseImage },
  { id: "DOC-OPS-0032", name: "Docking Station WD19S", category: "Docking Station", image: dockingImage },
];
function AssignInventoryModal({visible,onClose}) {
  const [employee,setEmployee]=useState("Rahul Sharma"); const [assignmentType,setAssignmentType]=useState("assets"); const [selected,setSelected]=useState([]); const [query,setQuery]=useState(""); const [category,setCategory]=useState("All Categories");
  const shown=assignableAssets.filter((asset)=>(category==="All Categories"||asset.category===category)&&asset.name.toLowerCase().includes(query.toLowerCase()));
  const toggle=(id)=>setSelected((items)=>items.includes(id)?items.filter((item)=>item!==id):[...items,id]);
  const selectedAssets=assignableAssets.filter((asset)=>selected.includes(asset.id));
  const inputClass="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100";
  return <div onMouseDown={(event)=>event.target===event.currentTarget&&onClose()} className={`fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 p-4 backdrop-blur-[1px] transition-opacity duration-200 ${visible?"opacity-100":"opacity-0"}`}><section role="dialog" aria-modal="true" className={`flex max-h-[calc(100vh-32px)] w-full max-w-[940px] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl transition-all duration-200 ease-out ${visible?"translate-y-0 scale-100 opacity-100":"translate-y-5 scale-[0.96] opacity-0"}`}>
    <header className="flex items-start justify-between border-b border-slate-200 px-6 py-5"><div><h2 className="text-xl font-bold">Assign Inventory</h2><p className="mt-1 text-sm text-slate-500">Select an employee and assign assets or a workstation bundle.</p></div><button type="button" onClick={onClose} className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-100"><X size={18}/></button></header>
    <form onSubmit={(event)=>{event.preventDefault();onClose()}} className="overflow-y-auto">
      <AssignStep number="1" title="Select Employee"><div className="grid grid-cols-3 gap-4"><ModalSelect label="Employee" value={employee} onChange={setEmployee} options={["Rahul Sharma","Priya Mehta","Ankit Verma","Neha Singh"]}/><ModalSelect label="Department" value="All Departments" onChange={()=>{}} options={["All Departments"]}/><ModalSelect label="Work Location" value="All Locations" onChange={()=>{}} options={["All Locations"]}/></div><div className="mt-4 flex items-center gap-3 rounded-xl bg-slate-50 p-3"><span className="grid h-10 w-10 place-items-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600">{employee.split(" ").map((word)=>word[0]).join("")}</span><div className="flex-1"><p className="text-sm font-semibold">{employee}</p><p className="mt-1 text-xs text-slate-500">EMP-1087 · Operations</p></div><div className="text-xs text-slate-500"><span className="font-semibold text-slate-800">6</span> Items · <button type="button" className="font-semibold text-violet-600">View Details</button></div><span className="rounded bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-600">Active</span></div></AssignStep>
      <AssignStep number="2" title="Choose Assignment Type"><div className="grid grid-cols-2 gap-4"><TypeCard active={assignmentType==="assets"} onClick={()=>setAssignmentType("assets")} icon={Package} title="Select Assets" subtitle="Assign individual assets to the employee."/><TypeCard active={assignmentType==="bundle"} onClick={()=>setAssignmentType("bundle")} icon={Box} title="Assign Bundle" subtitle="Assign a pre-defined workstation bundle."/></div></AssignStep>
      <AssignStep number="3" title="Select Assets"><div className="grid grid-cols-[1.7fr_0.75fr] gap-4"><div><div className="mb-3 grid grid-cols-[1fr_150px] gap-3"><div className="relative"><input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search assets by name, ID or type..." className={`${inputClass} pr-10`}/><Search size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"/></div><select value={category} onChange={(e)=>setCategory(e.target.value)} className={inputClass}><option>All Categories</option>{[...new Set(assignableAssets.map((asset)=>asset.category))].map((item)=><option key={item}>{item}</option>)}</select></div><div className="overflow-hidden rounded-lg border border-slate-200"><div className="grid grid-cols-[34px_1.6fr_1fr_1fr_0.7fr] bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-500"><span/><span>Asset</span><span>Asset ID</span><span>Category</span><span>Status</span></div>{shown.map((asset)=><label key={asset.id} className="grid min-h-[50px] cursor-pointer grid-cols-[34px_1.6fr_1fr_1fr_0.7fr] items-center border-t border-slate-100 px-3 py-2 hover:bg-slate-50"><input type="checkbox" checked={selected.includes(asset.id)} onChange={()=>toggle(asset.id)} className="h-4 w-4 accent-violet-600"/><span className="flex items-center gap-2"><img src={asset.image} alt="" className="h-8 w-8 object-contain"/><span className="text-xs font-semibold">{asset.name}</span></span><span className="text-[11px] font-medium text-violet-600">{asset.id}</span><span className="text-xs text-slate-600">{asset.category}</span><span className="w-fit rounded bg-emerald-50 px-2 py-1 text-[10px] font-semibold text-emerald-600">Available</span></label>)}</div></div>
        <aside className="min-h-[330px] rounded-xl border border-slate-200 bg-slate-50/40 p-4"><div className="flex justify-between"><h3 className="text-sm font-semibold">Selected Assets ({selected.length})</h3>{selected.length>0&&<button type="button" onClick={()=>setSelected([])} className="text-xs font-semibold text-violet-600">Clear All</button>}</div>{selectedAssets.length===0?<div className="flex h-[260px] flex-col items-center justify-center text-center"><img src={noAssetsImage} alt="No assets selected" className="h-28 w-28 object-contain"/><p className="mt-3 text-sm font-semibold">No assets selected</p><p className="mt-1 text-xs text-slate-500">Select assets from the list to assign.</p></div>:<div className="mt-4 space-y-2">{selectedAssets.map((asset)=><div key={asset.id} className="flex items-center gap-2 rounded-lg bg-white p-2"><img src={asset.image} alt="" className="h-9 w-9 object-contain"/><div className="min-w-0 flex-1"><p className="truncate text-xs font-semibold">{asset.name}</p><p className="text-[10px] text-slate-500">{asset.id}</p></div><button type="button" onClick={()=>toggle(asset.id)} className="text-rose-500"><X size={15}/></button></div>)}</div>}</aside></div></AssignStep>
      <AssignStep number="4" title="Additional Information (Optional)"><textarea maxLength={300} rows={3} placeholder="Enter any additional notes for this assignment..." className="w-full resize-none rounded-lg border border-slate-200 p-3 text-sm outline-none focus:border-violet-400"/></AssignStep>
      <footer className="flex justify-end gap-3 border-t border-slate-200 px-6 py-4"><button type="button" onClick={onClose} className="h-10 min-w-24 rounded-lg border border-slate-200 px-4 text-sm font-semibold text-slate-700 hover:bg-slate-50">Cancel</button><button type="submit" className="h-10 min-w-32 rounded-lg bg-violet-600 px-5 text-sm font-semibold text-white hover:bg-violet-700">Assign Inventory</button></footer>
    </form></section></div>;
}
function AssignStep({number,title,children}){return <section className="border-b border-slate-200 px-6 py-5"><h3 className="mb-4 flex items-center gap-2 text-sm font-semibold"><span className="grid h-6 w-6 place-items-center rounded-full bg-violet-600 text-xs font-bold text-white">{number}</span>{title}</h3>{children}</section>}
function ModalSelect({label,value,onChange,options}){return <label><span className="mb-1.5 block text-xs font-semibold text-slate-600">{label}</span><select value={value} onChange={(e)=>onChange(e.target.value)} className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium outline-none focus:border-violet-400">{options.map((option)=><option key={option}>{option}</option>)}</select></label>}
function TypeCard({active,onClick,icon:Icon,title,subtitle}){return <button type="button" onClick={onClick} className={`flex items-center gap-3 rounded-xl border p-4 text-left transition ${active?"border-violet-500 bg-violet-50/60 ring-1 ring-violet-200":"border-slate-200 hover:bg-slate-50"}`}><span className="grid h-10 w-10 place-items-center rounded-full bg-violet-50 text-violet-600"><Icon size={18}/></span><span><span className="block text-sm font-semibold">{title}</span><span className="mt-1 block text-xs text-slate-500">{subtitle}</span></span></button>}
function Select({ label, value, onChange, options }) { return <label><span className="mb-1.5 block text-xs font-medium text-slate-600">{label}</span><select value={value} onChange={(e) => onChange(e.target.value)} className="h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-xs font-medium text-slate-700 outline-none focus:border-violet-300">{options.map((option) => <option key={option}>{option}</option>)}</select></label>; }
function StatusBadge({ status }) { const style = status === "Active" ? "bg-emerald-50 text-emerald-600" : status === "Inactive" ? "bg-slate-100 text-slate-600" : "bg-amber-50 text-amber-600"; return <span className={`inline-flex rounded-md px-2.5 py-1 text-[10px] font-medium ${style}`}>{status}</span>; }
function PageButton({ children, active, onClick }) { return <button onClick={onClick} className={`grid h-8 min-w-8 place-items-center rounded-md border px-2 text-xs font-semibold ${active ? "border-violet-600 bg-violet-600 text-white" : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"}`}>{children}</button>; }

