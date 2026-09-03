import Header from "../components/Header";
import noAssetsImage from "../assets/no_assets.png";
import laptopImage from "../assets/laptop.png";
import monitorImage from "../assets/monitor.png";
import keyboardImage from "../assets/keyboard.png";
import mouseImage from "../assets/mouse.png";
import dockingImage from "../assets/docking_station.png";
import React, { useEffect, useMemo, useState } from "react";
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
];

export default function AssetTransfers() {
  const [fromEmployee, setFromEmployee] = useState(employees[0]);
  const [toEmployee, setToEmployee] = useState(employees[1]);

  const [transferDate, setTransferDate] = useState("2024-05-12");
  const [expectedDate, setExpectedDate] = useState("");

  const [notes, setNotes] = useState("");
  const [page, setPage] = useState(1);
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

  const [selectedItems, setSelectedItems] = useState([
    "Laptop",
    "Mouse",
    "Keyboard",
  ]);

  const canSubmit = useMemo(() => {
    return (
      fromEmployee &&
      toEmployee &&
      transferDate &&
      selectedItems.length > 0
    );
  }, [
    fromEmployee,
    toEmployee,
    transferDate,
    selectedItems,
  ]);

  const handleReset = () => {
    setFromEmployee(employees[0]);
    setToEmployee(employees[1]);
    setTransferDate("2024-05-12");
    setExpectedDate("");
    setNotes("");
    setSelectedItems([
      "Laptop",
      "Mouse",
      "Keyboard",
    ]);
  };

  const handleCreateTransfer = () => {
    const payload = {
      from: fromEmployee,
      to: toEmployee,
      transferDate,
      expectedDate,
      selectedItems,
      notes,
    };

    console.log("Create Transfer:", payload);

    // Later:
    // await axios.post("/api/inventory/transfers", payload);
  };

  return (
    <main className="min-h-screen bg-[#f8f9fc] px-4 py-5 font-['Geist',sans-serif] text-slate-900">
      {transferModalMounted && <CreateTransferModal visible={transferModalVisible} onClose={closeTransferModal} />}
      {/* PAGE HEADER */}
      <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Asset Transfers</h1>
          <p className="mt-1 text-sm font-normal text-slate-500">Transfer assets from one employee or location to another.</p>
        </div>
        <Header />
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

      {/* CREATE TRANSFER */}
      <section className="mb-4 rounded-xl border border-slate-200 bg-white p-4">
        <h2 className="text-sm font-semibold text-slate-800">
          Create New Asset Transfer
        </h2>

        {/* TOP FORM ROW */}
        <div className="mt-4 grid grid-cols-[1fr_34px_1fr_1fr_1fr] items-start gap-4">
          {/* FROM */}
          <EmployeeSelector
            label="Transfer From"
            required
            employee={fromEmployee}
            setEmployee={setFromEmployee}
            options={employees}
          />

          {/* Swap button */}
          <button
            type="button"
            onClick={() => {
              const currentFrom = fromEmployee;
              setFromEmployee(toEmployee);
              setToEmployee(currentFrom);
            }}
            className="mt-[22px] grid h-9 w-9 place-items-center rounded-md border border-violet-200 bg-white text-violet-600 hover:bg-violet-50"
          >
            <ArrowLeftRight size={14} />
          </button>

          {/* TO */}
          <EmployeeSelector
            label="Transfer To"
            required
            employee={toEmployee}
            setEmployee={setToEmployee}
            options={employees}
          />

          {/* TRANSFER DATE */}
          <DateField
            label="Transfer Date"
            required
            value={transferDate}
            setValue={setTransferDate}
          />

          {/* EXPECTED DATE */}
          <DateField
            label="Expected Date (Optional)"
            value={expectedDate}
            setValue={setExpectedDate}
          />
        </div>

        {/* SECOND ROW */}
        <div className="mt-4 grid grid-cols-[1.05fr_0.95fr] gap-5">
          {/* Assets */}
          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-600">
              Assets / Items
              <span className="ml-0.5 text-rose-500">
                *
              </span>
            </label>

            <div className="flex min-h-[58px] items-center justify-between rounded-md border border-slate-200 px-3">
              <div className="flex items-center gap-3">
                <span className="grid h-8 w-8 place-items-center rounded-md bg-violet-50 text-violet-600">
                  <Package size={15} />
                </span>

                <div>
                  <p className="text-xs font-medium text-slate-800">
                    {selectedItems.length} Items Selected
                  </p>

                  <p className="mt-1 text-[10px] text-slate-400">
                    {selectedItems.join(", ")}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedItems([])}
                  className="grid h-7 w-7 place-items-center text-slate-400 hover:text-rose-500"
                >
                  <X size={14} />
                </button>

                <button
                  type="button"
                  className="h-8 rounded-md border border-violet-200 px-4 text-[10px] font-medium text-violet-600 hover:bg-violet-50"
                >
                  View Items
                </button>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-600">
              Notes (Optional)
            </label>

            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add a note or reason for this transfer..."
              className="min-h-[58px] w-full resize-none rounded-md border border-slate-200 px-3 py-2.5 text-xs font-medium text-slate-700 outline-none placeholder:text-slate-400 focus:border-violet-300 focus:ring-2 focus:ring-violet-100"
            />
          </div>
        </div>

        {/* BUTTONS */}
        <div className="mt-4 flex justify-end gap-3">
          <button
            type="button"
            onClick={handleReset}
            className="h-9 min-w-[100px] rounded-md border border-slate-300 bg-white px-4 text-xs font-medium text-slate-700 hover:bg-slate-50"
          >
            Reset
          </button>

          <button
            type="button"
            disabled={!canSubmit}
            onClick={openTransferModal}
            className="flex h-9 min-w-[150px] items-center justify-center gap-2 rounded-md bg-gradient-to-r from-violet-600 to-indigo-600 px-4 text-xs font-semibold text-white shadow-sm hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ArrowLeftRight size={13} />
            Create Transfer
          </button>
        </div>
      </section>

      {/* HISTORY */}
      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="flex min-h-[49px] items-center justify-between border-b border-slate-200 px-4">
          <h2 className="text-sm font-semibold">
            Transfer History
          </h2>

          <button className="h-8 rounded-md border border-violet-200 px-4 text-[10px] font-medium text-violet-600 hover:bg-violet-50">
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
              {transferHistory.map((transfer) => (
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
                      <button className="grid h-8 w-8 place-items-center rounded-md border border-slate-200 text-indigo-600 hover:bg-indigo-50">
                        <Eye size={13} />
                      </button>

                      <button className="grid h-8 w-8 place-items-center rounded-md border border-slate-200 text-slate-500 hover:bg-slate-50">
                        <MoreVertical size={14} />
                      </button>
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
            Showing 1 to 5 of 58 transfers
          </p>

          <div className="flex items-center gap-1.5">
            <PaginationButton>
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

            <PaginationButton>
              12
            </PaginationButton>

            <PaginationButton>
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
function CreateTransferModal({visible,onClose}) {
  const [from,setFrom]=useState(employees[0].id); const [to,setTo]=useState(employees[1].id); const [query,setQuery]=useState(""); const [category,setCategory]=useState("All Categories"); const [selected,setSelected]=useState([]);
  const inputClass="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100";
  const results=transferableAssets.filter((asset)=>(category==="All Categories"||asset.category===category)&&asset.name.toLowerCase().includes(query.toLowerCase()));
  const toggle=(id)=>setSelected((items)=>items.includes(id)?items.filter((item)=>item!==id):[...items,id]);
  return <div onMouseDown={(event)=>event.target===event.currentTarget&&onClose()} className={`fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 p-4 backdrop-blur-[1px] transition-opacity duration-200 ${visible?"opacity-100":"opacity-0"}`}><section role="dialog" aria-modal="true" className={`flex max-h-[calc(100vh-32px)] w-full max-w-[760px] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl transition-all duration-200 ease-out ${visible?"translate-y-0 scale-100 opacity-100":"translate-y-5 scale-[0.96] opacity-0"}`}>
    <header className="flex items-start justify-between border-b border-slate-200 px-6 py-5"><div><h2 className="text-xl font-bold">Create Asset Transfer</h2><p className="mt-1 text-sm text-slate-500">Transfer assets from one employee or location to another.</p></div><button type="button" onClick={onClose} className="grid h-9 w-9 place-items-center rounded-lg text-slate-500 hover:bg-slate-100"><X size={18}/></button></header>
    <form onSubmit={(event)=>{event.preventDefault();onClose()}} className="overflow-y-auto px-6 py-5"><div className="grid grid-cols-[1fr_40px_1fr] items-end gap-3"><TransferSelect label="Transfer From" required value={from} onChange={setFrom}/><button type="button" onClick={()=>{const old=from;setFrom(to);setTo(old)}} className="mb-0.5 grid h-10 w-10 place-items-center rounded-lg border border-violet-200 text-violet-600 hover:bg-violet-50"><ArrowLeftRight size={16}/></button><TransferSelect label="Transfer To" required value={to} onChange={setTo}/></div>
      <div className="mt-4 grid grid-cols-2 gap-4"><ModalDateField label="Transfer Date" required defaultValue="2024-05-12" inputClass={inputClass}/><ModalDateField label="Expected Date (Optional)" inputClass={inputClass}/></div><label className="mt-4 block"><span className="mb-1.5 block text-xs font-semibold text-slate-600">Notes (Optional)</span><textarea maxLength={300} rows={3} placeholder="Add a note or reason for this transfer..." className="w-full resize-none rounded-lg border border-slate-200 p-3 text-sm outline-none focus:border-violet-400"/></label>
      <div className="my-6 border-t border-slate-200"/><h3 className="mb-4 text-sm font-semibold">Select Assets / Items</h3><div className="grid grid-cols-[1fr_160px_160px] gap-3"><div className="relative"><input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search assets by name, ID or type..." className={`${inputClass} pr-10`}/><Search size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"/></div><select value={category} onChange={(e)=>setCategory(e.target.value)} className={inputClass}><option>All Categories</option>{[...new Set(transferableAssets.map((asset)=>asset.category))].map((item)=><option key={item}>{item}</option>)}</select><select defaultValue="Available Only" className={inputClass}><option>Available Only</option></select></div>
      <div className="mt-4 min-h-[230px] overflow-hidden rounded-xl border border-violet-200 bg-violet-50/20">{query||selected.length?<div className="p-3">{results.map((asset)=><label key={asset.id} className="flex cursor-pointer items-center gap-3 rounded-lg border-b border-slate-100 bg-white px-3 py-2.5 last:border-0 hover:bg-slate-50"><input type="checkbox" checked={selected.includes(asset.id)} onChange={()=>toggle(asset.id)} className="h-4 w-4 accent-violet-600"/><img src={asset.image} alt="" className="h-9 w-9 object-contain"/><div className="min-w-0 flex-1"><p className="text-sm font-semibold">{asset.name}</p><p className="mt-1 text-xs text-violet-600">{asset.id}</p></div><span className="text-xs text-slate-500">{asset.category}</span></label>)}</div>:<div className="flex h-[230px] flex-col items-center justify-center text-center"><img src={noAssetsImage} alt="No assets selected" className="h-28 w-28 object-contain"/><p className="mt-2 text-sm font-semibold">No assets selected</p><p className="mt-1 text-xs text-slate-500">Search and select assets from the list above to add to this transfer.</p></div>}</div>
      <footer className="mt-6 flex justify-end gap-3 border-t border-slate-100 pt-5"><button type="button" onClick={onClose} className="h-10 min-w-24 rounded-lg border border-slate-200 px-4 text-sm font-semibold text-slate-700 hover:bg-slate-50">Cancel</button><button type="submit" className="flex h-10 min-w-32 items-center justify-center gap-2 rounded-lg bg-violet-600 px-5 text-sm font-semibold text-white hover:bg-violet-700"><ArrowLeftRight size={15}/>Create Transfer</button></footer>
    </form></section></div>;
}
function TransferSelect({label,required,value,onChange}){return <label><span className="mb-1.5 block text-xs font-semibold text-slate-600">{label}{required&&<span className="ml-1 text-rose-500">*</span>}</span><select value={value} onChange={(e)=>onChange(e.target.value)} className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium outline-none focus:border-violet-400">{employees.map((employee)=><option key={employee.id} value={employee.id}>{employee.name} · {employee.department}</option>)}</select></label>}
function ModalDateField({label,required,defaultValue,inputClass}){return <label><span className="mb-1.5 block text-xs font-semibold text-slate-600">{label}{required&&<span className="ml-1 text-rose-500">*</span>}</span><div className="relative"><CalendarDays size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/><input type="date" required={required} defaultValue={defaultValue} className={`${inputClass} pl-9`}/></div></label>}
function EmployeeSelector({
  label,
  required,
  employee,
  setEmployee,
  options,
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-slate-600">
        {label}

        {required && (
          <span className="ml-0.5 text-rose-500">
            *
          </span>
        )}
      </label>

      <select
        value={employee.id}
        onChange={(e) => {
          const nextEmployee = options.find(
            (item) => item.id === e.target.value
          );

          setEmployee(nextEmployee);
        }}
        className="h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-xs font-medium text-slate-700 outline-none focus:border-violet-300"
      >
        {options.map((item) => (
          <option
            key={item.id}
            value={item.id}
          >
            {item.name}
          </option>
        ))}
      </select>

      <div className="mt-1 flex min-h-[39px] items-center gap-2.5 rounded-md border border-slate-200 px-3">
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
    </div>
  );
}

function DateField({
  label,
  required,
  value,
  setValue,
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-slate-600">
        {label}

        {required && (
          <span className="ml-0.5 text-rose-500">
            *
          </span>
        )}
      </label>

      <div className="relative">
        <CalendarDays
          size={13}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="date"
          value={value}
          onChange={(e) =>
            setValue(e.target.value)
          }
          className="h-9 w-full rounded-md border border-slate-200 bg-white pl-9 pr-3 text-xs font-medium text-slate-700 outline-none focus:border-violet-300"
        />
      </div>
    </div>
  );
}

function EmployeeCell({ employee }) {
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


