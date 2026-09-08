import Header from "../components/Header";
import noAssetsImage from "../assets/no_assets.png";
import laptopImage from "../assets/laptop.png";
import monitorImage from "../assets/monitor.png";
import keyboardImage from "../assets/keyboard.png";
import mouseImage from "../assets/mouse.png";
import dockingImage from "../assets/docking_station.png";
import React, { useEffect, useState } from "react";
import {
  ArrowLeftRight,
  Box,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Eye,
  MoreVertical,
  Package,
  RefreshCcw,
  Search,
  Trash2,
  X,
  XCircle,
} from "lucide-react";

const stats = [
  {
    title: "Total Transfers",
    value: "58",
    subtitle: "All time transfers",
    icon: ArrowLeftRight,
    iconClass: "bg-violet-50 text-violet-600",
  },
  {
    title: "Completed Transfers",
    value: "46",
    subtitle: "This month",
    icon: CheckCircle2,
    iconClass: "bg-emerald-50 text-emerald-600",
  },
  {
    title: "Pending Transfers",
    value: "7",
    subtitle: "Awaiting completion",
    icon: Clock3,
    iconClass: "bg-amber-50 text-amber-500",
  },
  {
    title: "Cancelled Transfers",
    value: "5",
    subtitle: "This month",
    icon: Box,
    iconClass: "bg-blue-50 text-blue-600",
  },
];

const employees = [
  {
    id: "EMP-1087",
    name: "Rahul Sharma",
    department: "Operations",
    initials: "RS",
  },
  {
    id: "EMP-1043",
    name: "Priya Mehta",
    department: "HR",
    initials: "PM",
  },
  {
    id: "EMP-1122",
    name: "Ankit Verma",
    department: "IT Support",
    initials: "AV",
  },
  {
    id: "EMP-1076",
    name: "Vikram Patil",
    department: "Operations",
    initials: "VP",
  },
  {
    id: "EMP-1156",
    name: "Neha Singh",
    department: "Finance",
    initials: "NS",
  },
];

const transferHistory = [
  {
    id: "TR-2024-0058",
    from: employees[0],
    to: employees[1],
    items: 3,
    date: "12 May 2024",
    status: "Pending",
  },
  {
    id: "TR-2024-0057",
    from: employees[2],
    to: employees[3],
    items: 2,
    date: "10 May 2024",
    status: "Completed",
  },
  {
    id: "TR-2024-0056",
    from: employees[4],
    to: employees[2],
    items: 4,
    date: "08 May 2024",
    status: "Completed",
  },
  {
    id: "TR-2024-0055",
    from: employees[1],
    to: employees[4],
    items: 1,
    date: "06 May 2024",
    status: "Cancelled",
  },
  {
    id: "TR-2024-0054",
    from: employees[3],
    to: employees[0],
    items: 5,
    date: "04 May 2024",
    status: "Completed",
  },
  {
    id: "TR-2024-0053",
    from: employees[0],
    to: employees[2],
    items: 2,
    date: "02 May 2024",
    status: "Completed",
  },
  {
    id: "TR-2024-0052",
    from: employees[4],
    to: employees[1],
    items: 1,
    date: "30 Apr 2024",
    status: "Pending",
  },
  {
    id: "TR-2024-0051",
    from: employees[2],
    to: employees[0],
    items: 3,
    date: "28 Apr 2024",
    status: "Completed",
  },
  {
    id: "TR-2024-0050",
    from: employees[1],
    to: employees[3],
    items: 2,
    date: "25 Apr 2024",
    status: "Cancelled",
  },
  {
    id: "TR-2024-0049",
    from: employees[3],
    to: employees[4],
    items: 4,
    date: "22 Apr 2024",
    status: "Completed",
  },
];

export default function AssetTransfers() {
  const [page, setPage] = useState(1);
  const [transferRows, setTransferRows] = useState(transferHistory);
  const [selectedTransfer, setSelectedTransfer] = useState(null);
  const [openActionId, setOpenActionId] = useState(null);
  const [transferModalMounted, setTransferModalMounted] = useState(false);
  const [transferModalVisible, setTransferModalVisible] = useState(false);
  const openTransferModal = () => { setTransferModalMounted(true); requestAnimationFrame(() => requestAnimationFrame(() => setTransferModalVisible(true))); };
  const closeTransferModal = () => { setTransferModalVisible(false); window.setTimeout(() => setTransferModalMounted(false), 240); };
  useEffect(() => {
    if (!transferModalMounted) return undefined;
    const handleKeyDown = (event) => event.key === "Escape" && closeTransferModal();
    document.addEventListener("keydown", handleKeyDown); document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", handleKeyDown); document.body.style.overflow = ""; };
  }, [transferModalMounted]);

  useEffect(() => {
    if (!openActionId) return undefined;
    const closeMenu = () => setOpenActionId(null);
    document.addEventListener("click", closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, [openActionId]);

  const updateTransferStatus = (transferId, status) => {
    setTransferRows((rows) => rows.map((transfer) => transfer.id === transferId ? { ...transfer, status } : transfer));
    setOpenActionId(null);
  };

  const removeTransfer = (transferId) => {
    setTransferRows((rows) => rows.filter((transfer) => transfer.id !== transferId));
    setOpenActionId(null);
  };

  const createTransfer = (transfer) => {
    setTransferRows((rows) => [transfer, ...rows]);
    setPage(1);
    closeTransferModal();
  };

  return (
    <main className="min-h-screen bg-[#f8f9fc] px-4 py-5 font-['Geist',sans-serif] text-slate-900">
      {transferModalMounted && <CreateTransferModal visible={transferModalVisible} onClose={closeTransferModal} onCreate={createTransfer} />}
      {selectedTransfer && <TransferDetailsModal transfer={selectedTransfer} onClose={() => setSelectedTransfer(null)} />}
      {/* PAGE HEADER */}
      <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Asset Transfers</h1>
          <p className="mt-1 text-sm font-normal text-slate-500">Transfer assets from one employee or location to another.</p>
        </div>
        <div className="flex flex-col items-end gap-3">
          <Header />
          <button
            type="button"
            onClick={openTransferModal}
            className="flex h-9 items-center justify-center gap-2 rounded-md bg-gradient-to-r from-violet-600 to-indigo-600 px-4 text-sm font-semibold text-white shadow-sm transition hover:brightness-95"
          >
            <ArrowLeftRight size={15} />
            Create Transfer
          </button>
        </div>
      </div>

      {/* KPI CARDS */}
      <section className="mb-4 grid grid-cols-4 gap-3">
        {stats.map((card) => {
          const Icon = card.icon;

          return (
            <article
              key={card.title}
              className="flex min-h-[96px] items-center gap-4 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-[0_2px_8px_rgba(15,23,42,0.025)]"
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

                <p className="mt-2 text-[10px] text-slate-500">
                  {card.subtitle}
                </p>
              </div>
            </article>
          );
        })}
      </section>


      {/* HISTORY */}
      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="flex min-h-[49px] items-center justify-between border-b border-slate-200 px-4">
          <h2 className="text-sm font-semibold">
            Transfer History
          </h2>

          <button type="button" onClick={() => setPage(1)} className="h-8 rounded-md border border-violet-200 px-4 text-[10px] font-medium text-violet-600 hover:bg-violet-50">
            View All
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[950px] border-collapse">
            <thead>
              <tr className="bg-slate-50/80">
                {[
                  "Transfer ID",
                  "From",
                  "To",
                  "Items",
                  "Transfer Date",
                  "Status",
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
              {transferRows.map((transfer, index) => (
                <tr
                  key={transfer.id}
                  className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50/60"
                >
                  {/* ID */}
                  <td className="px-4 py-3 text-xs font-medium text-indigo-600">
                    {transfer.id}
                  </td>

                  {/* FROM */}
                  <td className="px-4 py-3">
                    <EmployeeCell
                      employee={transfer.from}
                    />
                  </td>

                  {/* TO */}
                  <td className="px-4 py-3">
                    <EmployeeCell
                      employee={transfer.to}
                    />
                  </td>

                  {/* ITEMS */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <Box
                        size={12}
                        className="text-violet-600"
                      />

                      <span className="text-xs text-slate-700">
                        {transfer.items}{" "}
                        {transfer.items === 1
                          ? "Item"
                          : "Items"}
                      </span>
                    </div>
                  </td>

                  {/* DATE */}
                  <td className="px-4 py-3 text-xs text-slate-600">
                    {transfer.date}
                  </td>

                  {/* STATUS */}
                  <td className="px-4 py-3">
                    <TransferStatus
                      status={transfer.status}
                    />
                  </td>

                  {/* ACTIONS */}
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button type="button" onClick={() => setSelectedTransfer(transfer)} aria-label={`View ${transfer.id}`} className="grid h-8 w-8 place-items-center rounded-md border border-slate-200 text-indigo-600 hover:bg-indigo-50">
                        <Eye size={13} />
                      </button>

                      <div className="relative">
                        <button type="button" onClick={(event) => { event.stopPropagation(); setOpenActionId((current) => current === transfer.id ? null : transfer.id); }} aria-label={`Manage ${transfer.id}`} className="grid h-8 w-8 place-items-center rounded-md border border-slate-200 text-slate-500 hover:bg-slate-50">
                          <MoreVertical size={14} />
                        </button>
                        {openActionId === transfer.id && <div onClick={(event) => event.stopPropagation()} className={`absolute right-0 z-30 w-44 overflow-hidden rounded-lg border border-slate-200 bg-white py-1.5 shadow-xl ${index >= transferRows.length - 2 ? "bottom-10" : "top-10"}`}>
                          {transfer.status !== "Completed" && <TransferAction label="Mark Completed" color="text-emerald-600" onClick={() => updateTransferStatus(transfer.id, "Completed")} />}
                          {transfer.status !== "Pending" && <TransferAction label="Mark Pending" color="text-amber-600" onClick={() => updateTransferStatus(transfer.id, "Pending")} />}
                          {transfer.status !== "Cancelled" && <TransferAction label="Cancel Transfer" color="text-rose-600" onClick={() => updateTransferStatus(transfer.id, "Cancelled")} />}
                          <div className="my-1 border-t border-slate-100" />
                          <TransferAction icon={Trash2} label="Delete Transfer" color="text-rose-600" onClick={() => removeTransfer(transfer.id)} />
                        </div>}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="flex min-h-[58px] items-center justify-between border-t border-slate-100 px-4">
          <p className="text-[10px] text-slate-500">
            Showing 1 to 10 of 58 transfers
          </p>

          <div className="flex items-center gap-1.5">
            <PaginationButton onClick={() => setPage((current) => Math.max(1, current - 1))}>
              <ChevronLeft size={12} />
            </PaginationButton>

            {[1, 2, 3].map((number) => (
              <PaginationButton
                key={number}
                active={page === number}
                onClick={() => setPage(number)}
              >
                {number}
              </PaginationButton>
            ))}

            <span className="px-1 text-[10px] text-slate-400">
              ...
            </span>

            <PaginationButton onClick={() => setPage(12)}>
              12
            </PaginationButton>

            <PaginationButton onClick={() => setPage((current) => Math.min(12, current + 1))}>
              <ChevronRight size={12} />
            </PaginationButton>
          </div>
        </div>
      </section>
    </main>
  );
}

const transferableAssets = [
  { id: "LAP-OPS-0011", name: "Laptop - Dell Latitude 5420", category: "Laptop", image: laptopImage },
  { id: "MON-OPS-0071", name: 'Monitor 24” Dell P2422H', category: "Monitor", image: monitorImage },
  { id: "KEY-OPS-0168", name: "Keyboard - Logitech K120", category: "Keyboard", image: keyboardImage },
  { id: "MOU-OPS-0148", name: "Mouse - Logitech M100", category: "Mouse", image: mouseImage },
  { id: "DOC-OPS-0032", name: "Docking Station WD19S", category: "Docking Station", image: dockingImage },
];
function CreateTransferModal({visible,onClose,onCreate}) {
  const [from,setFrom]=useState(employees[0].id); const [to,setTo]=useState(employees[1].id); const [query,setQuery]=useState(""); const [category,setCategory]=useState("All Categories"); const [selected,setSelected]=useState([]); const [transferDate,setTransferDate]=useState("2024-05-12"); const [error,setError]=useState("");
  const inputClass="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100";
  const results=transferableAssets.filter((asset)=>(category==="All Categories"||asset.category===category)&&asset.name.toLowerCase().includes(query.toLowerCase()));
  const toggle=(id)=>setSelected((items)=>items.includes(id)?items.filter((item)=>item!==id):[...items,id]);
  const submit=(event)=>{event.preventDefault();if(from===to){setError("Transfer from and transfer to must be different employees.");return;}if(selected.length===0){setError("Select at least one asset to transfer.");return;}const fromEmployee=employees.find((employee)=>employee.id===from);const toEmployee=employees.find((employee)=>employee.id===to);onCreate({id:`TR-${new Date().getFullYear()}-${String(Date.now()).slice(-4)}`,from:fromEmployee,to:toEmployee,items:selected.length,itemIds:selected,date:new Date(`${transferDate}T00:00:00`).toLocaleDateString("en-GB",{day:"2-digit",month:"short",year:"numeric"}),status:"Pending"});};
  return <div onMouseDown={(event)=>event.target===event.currentTarget&&onClose()} className={`fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 p-4 backdrop-blur-[1px] transition-opacity duration-200 ${visible?"opacity-100":"opacity-0"}`}><section role="dialog" aria-modal="true" className={`flex max-h-[calc(100vh-32px)] w-full max-w-[760px] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl transition-all duration-200 ease-out ${visible?"translate-y-0 scale-100 opacity-100":"translate-y-5 scale-[0.96] opacity-0"}`}>
    <header className="flex items-start justify-between border-b border-slate-200 px-6 py-5"><div><h2 className="text-xl font-bold">Create Asset Transfer</h2><p className="mt-1 text-sm text-slate-500">Transfer assets from one employee or location to another.</p></div><button type="button" onClick={onClose} className="grid h-9 w-9 place-items-center rounded-lg text-slate-500 hover:bg-slate-100"><X size={18}/></button></header>
    <form onSubmit={submit} className="overflow-y-auto px-6 py-5"><div className="grid grid-cols-[1fr_40px_1fr] items-end gap-3"><TransferSelect label="Transfer From" required value={from} onChange={setFrom}/><button type="button" onClick={()=>{const old=from;setFrom(to);setTo(old)}} className="mb-0.5 grid h-10 w-10 place-items-center rounded-lg border border-violet-200 text-violet-600 hover:bg-violet-50"><ArrowLeftRight size={16}/></button><TransferSelect label="Transfer To" required value={to} onChange={setTo}/></div>
      <div className="mt-4 grid grid-cols-2 gap-4"><ModalDateField label="Transfer Date" required value={transferDate} onChange={setTransferDate} inputClass={inputClass}/><ModalDateField label="Expected Date (Optional)" inputClass={inputClass}/></div><label className="mt-4 block"><span className="mb-1.5 block text-xs font-semibold text-slate-600">Notes (Optional)</span><textarea maxLength={300} rows={3} placeholder="Add a note or reason for this transfer..." className="w-full resize-none rounded-lg border border-slate-200 p-3 text-sm outline-none focus:border-violet-400"/></label>
      <div className="my-6 border-t border-slate-200"/><h3 className="mb-4 text-sm font-semibold">Select Assets / Items</h3><div className="grid grid-cols-[1fr_160px_160px] gap-3"><div className="relative"><input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search assets by name, ID or type..." className={`${inputClass} pr-10`}/><Search size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"/></div><select value={category} onChange={(e)=>setCategory(e.target.value)} className={inputClass}><option>All Categories</option>{[...new Set(transferableAssets.map((asset)=>asset.category))].map((item)=><option key={item}>{item}</option>)}</select><select defaultValue="Available Only" className={inputClass}><option>Available Only</option></select></div>
      <div className="mt-4 min-h-[230px] overflow-hidden rounded-xl border border-violet-200 bg-violet-50/20">{query||selected.length?<div className="p-3">{results.map((asset)=><label key={asset.id} className="flex cursor-pointer items-center gap-3 rounded-lg border-b border-slate-100 bg-white px-3 py-2.5 last:border-0 hover:bg-slate-50"><input type="checkbox" checked={selected.includes(asset.id)} onChange={()=>toggle(asset.id)} className="h-4 w-4 accent-violet-600"/><img src={asset.image} alt="" className="h-9 w-9 object-contain"/><div className="min-w-0 flex-1"><p className="text-sm font-semibold">{asset.name}</p><p className="mt-1 text-xs text-violet-600">{asset.id}</p></div><span className="text-xs text-slate-500">{asset.category}</span></label>)}</div>:<div className="flex h-[230px] flex-col items-center justify-center text-center"><img src={noAssetsImage} alt="No assets selected" className="h-28 w-28 object-contain"/><p className="mt-2 text-sm font-semibold">No assets selected</p><p className="mt-1 text-xs text-slate-500">Search and select assets from the list above to add to this transfer.</p></div>}</div>
      {error && <p className="mt-4 rounded-lg bg-rose-50 px-3 py-2 text-xs font-medium text-rose-600">{error}</p>}
      <footer className="mt-6 flex justify-end gap-3 border-t border-slate-100 pt-5"><button type="button" onClick={onClose} className="h-10 min-w-24 rounded-lg border border-slate-200 px-4 text-sm font-semibold text-slate-700 hover:bg-slate-50">Cancel</button><button type="submit" className="flex h-10 min-w-32 items-center justify-center gap-2 rounded-lg bg-violet-600 px-5 text-sm font-semibold text-white hover:bg-violet-700"><ArrowLeftRight size={15}/>Create Transfer</button></footer>
    </form></section></div>;
}
function TransferSelect({label,required,value,onChange}){return <label><span className="mb-1.5 block text-xs font-semibold text-slate-600">{label}{required&&<span className="ml-1 text-rose-500">*</span>}</span><select value={value} onChange={(e)=>onChange(e.target.value)} className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium outline-none focus:border-violet-400">{employees.map((employee)=><option key={employee.id} value={employee.id}>{employee.name} · {employee.department}</option>)}</select></label>}
function ModalDateField({label,required,value,onChange,inputClass}){return <label><span className="mb-1.5 block text-xs font-semibold text-slate-600">{label}{required&&<span className="ml-1 text-rose-500">*</span>}</span><div className="relative"><CalendarDays size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/><input type="date" required={required} value={value} onChange={(event)=>onChange?.(event.target.value)} className={`${inputClass} pl-9`}/></div></label>}
function TransferAction({icon:Icon,label,color,onClick}){return <button type="button" onClick={onClick} className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs font-medium text-slate-700 hover:bg-slate-50">{Icon&&<Icon size={14} className={color}/>}<span className={!Icon?color:""}>{label}</span></button>}
function TransferDetailsModal({ transfer, onClose }) {
  const [visible, setVisible] = useState(false);
  const assets = transfer.itemIds?.map((id) => transferableAssets.find((asset) => asset.id === id)).filter(Boolean) ?? transferableAssets.slice(0, transfer.items);

  const handleClose = () => {
    setVisible(false);
    window.setTimeout(onClose, 220);
  };

  useEffect(() => {
    requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
    const handleKeyDown = (event) => event.key === "Escape" && handleClose();
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, []);

  return <div onMouseDown={(event) => event.target === event.currentTarget && handleClose()} className={`fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 p-4 backdrop-blur-[1px] transition-opacity duration-200 ${visible ? "opacity-100" : "opacity-0"}`}><section className={`w-full max-w-[600px] overflow-hidden rounded-2xl bg-white shadow-2xl transition-all duration-200 ease-out ${visible ? "translate-y-0 scale-100 opacity-100" : "translate-y-5 scale-[0.96] opacity-0"}`}><header className="flex items-start justify-between border-b border-slate-200 px-6 py-5"><div><h2 className="text-xl font-bold">Transfer Details</h2><p className="mt-1 text-sm text-slate-500">{transfer.id}</p></div><button type="button" onClick={handleClose} className="grid h-9 w-9 place-items-center rounded-lg text-slate-500 transition hover:bg-slate-100"><X size={18}/></button></header><div className="p-6"><div className="grid grid-cols-2 gap-4 rounded-xl bg-slate-50 p-4"><div><p className="text-[10px] font-semibold uppercase text-slate-400">From</p><EmployeeCell employee={transfer.from}/></div><div><p className="text-[10px] font-semibold uppercase text-slate-400">To</p><EmployeeCell employee={transfer.to}/></div><div><p className="text-[10px] font-semibold uppercase text-slate-400">Transfer date</p><p className="mt-2 text-sm font-medium">{transfer.date}</p></div><div><p className="text-[10px] font-semibold uppercase text-slate-400">Status</p><div className="mt-2"><TransferStatus status={transfer.status}/></div></div></div><h3 className="mb-3 mt-5 text-sm font-semibold">Transferred Items ({transfer.items})</h3><div className="max-h-60 overflow-y-auto rounded-xl border border-slate-200">{assets.map((asset) => <div key={asset.id} className="flex items-center gap-3 border-b border-slate-100 p-3 last:border-0"><img src={asset.image} alt="" className="h-9 w-9 object-contain"/><div><p className="text-xs font-semibold">{asset.name}</p><p className="mt-1 text-[10px] text-violet-600">{asset.id}</p></div></div>)}</div></div></section></div>;
}function EmployeeCell({ employee }) {
  return (
    <div className="flex items-center gap-2.5">
      <Avatar initials={employee.initials} />

      <div>
        <p className="text-xs font-medium text-slate-800">
          {employee.name}
        </p>

        <p className="mt-0.5 text-[10px] text-slate-400">
          {employee.id} - {employee.department}
        </p>
      </div>
    </div>
  );
}

function Avatar({ initials }) {
  return (
    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gradient-to-br from-slate-700 to-slate-500 text-[10px] font-semibold text-white">
      {initials}
    </span>
  );
}

function TransferStatus({ status }) {
  const styles = {
    Pending:
      "bg-amber-50 text-amber-600",
    Completed:
      "bg-emerald-50 text-emerald-600",
    Cancelled:
      "bg-rose-50 text-rose-600",
  };

  return (
    <span
      className={`inline-flex min-w-[60px] items-center justify-center rounded-md px-2 py-1 text-[10px] font-medium ${styles[status]}`}
    >
      {status}
    </span>
  );
}

function PaginationButton({
  children,
  active,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className={`grid h-8 min-w-8 place-items-center rounded-md border px-2 text-[10px] font-medium transition ${
        active
          ? "border-violet-600 bg-violet-600 text-white shadow-sm"
          : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
      }`}
    >
      {children}
    </button>
  );
}


