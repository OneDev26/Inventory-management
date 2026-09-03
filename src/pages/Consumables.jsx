import React, { useEffect, useMemo, useState } from "react";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { consumableAdded, selectCreatedConsumables } from "../store/consumablesSlice";
import coffeeImage from "../assets/coffee.png";
import milkImage from "../assets/milk.png";
import teaImage from "../assets/tea.png";
import sugarImage from "../assets/sugar.png";
import cupsImage from "../assets/paper_cups.png";
import tissueImage from "../assets/tissue.png";
import handwashImage from "../assets/handwash.png";
import sanitizerImage from "../assets/hand_sanitizer.png";
import {
  AlertCircle,
  Box,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Download,
  Edit3,
  Layers3,
  MoreVertical,
  Plus,
  Search,
  UploadCloud,
  X,
} from "lucide-react";

const stats = [
  {
    title: "Total Consumables",
    value: "48",
    subtitle: "All items",
    icon: Box,
    iconClass: "bg-violet-50 text-violet-600",
  },
  {
    title: "In Stock",
    value: "32",
    subtitle: "Items available",
    icon: Layers3,
    iconClass: "bg-emerald-50 text-emerald-600",
  },
  {
    title: "Low Stock",
    value: "7",
    subtitle: "Reorder soon",
    icon: Download,
    iconClass: "bg-amber-50 text-amber-500",
  },
  {
    title: "Out of Stock",
    value: "2",
    subtitle: "Items unavailable",
    icon: AlertCircle,
    iconClass: "bg-rose-50 text-rose-500",
  },
];

const consumablesData = [
  {
    id: 1,
    name: "Coffee Beans",
    category: "Pantry",
    unit: "kg",
    stock: 12.5,
    alert: "5 kg",
    status: "In Stock",
    updated: "12 May 2024",
    image: coffeeImage,
  },
  {
    id: 2,
    name: "Milk Pack",
    category: "Pantry",
    unit: "liters",
    stock: 14,
    alert: "5 liters",
    status: "In Stock",
    updated: "12 May 2024",
    image: milkImage,
  },
  {
    id: 3,
    name: "Tea Leaves",
    category: "Pantry",
    unit: "packs",
    stock: 8,
    alert: "3 packs",
    status: "In Stock",
    updated: "11 May 2024",
    image: teaImage,
  },
  {
    id: 4,
    name: "Sugar",
    category: "Pantry",
    unit: "kg",
    stock: 2.5,
    alert: "5 kg",
    status: "Low Stock",
    updated: "11 May 2024",
    image: sugarImage,
  },
  {
    id: 5,
    name: "Paper Cups",
    category: "Pantry",
    unit: "packs",
    stock: 3,
    alert: "5 packs",
    status: "Low Stock",
    updated: "10 May 2024",
    image: cupsImage,
  },
  {
    id: 6,
    name: "Tissue Roll",
    category: "Housekeeping",
    unit: "rolls",
    stock: 0,
    alert: "5 rolls",
    status: "Out of Stock",
    updated: "10 May 2024",
    image: tissueImage,
  },
  {
    id: 7,
    name: "Hand Wash",
    category: "Housekeeping",
    unit: "bottles",
    stock: 6,
    alert: "3 bottles",
    status: "In Stock",
    updated: "09 May 2024",
    image: handwashImage,
  },
  {
    id: 8,
    name: "Hand Sanitizer",
    category: "Housekeeping",
    unit: "bottles",
    stock: 1,
    alert: "3 bottles",
    status: "Low Stock",
    updated: "09 May 2024",
    image: sanitizerImage,
  },
];

const categories = [
  "All Categories",
  "Pantry",
  "Housekeeping",
];

const statuses = [
  "All Status",
  "In Stock",
  "Low Stock",
  "Out of Stock",
];

export default function Consumables() {
  const dispatch = useDispatch();
  const createdConsumables = useSelector(selectCreatedConsumables);
  const [category, setCategory] = useState("All Categories");
  const [status, setStatus] = useState("All Status");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [modalMounted, setModalMounted] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const openConsumableModal = () => {
    setModalMounted(true);
    requestAnimationFrame(() => requestAnimationFrame(() => setModalVisible(true)));
  };
  const closeConsumableModal = () => {
    setModalVisible(false);
    window.setTimeout(() => setModalMounted(false), 240);
  };
  useEffect(() => {
    if (!modalMounted) return undefined;
    const handleKeyDown = (event) => event.key === "Escape" && closeConsumableModal();
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [modalMounted]);

  const filteredConsumables = useMemo(() => {
    const q = search.trim().toLowerCase();

    return [...createdConsumables, ...consumablesData].filter((item) => {
      const matchesSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q);

      const matchesCategory =
        category === "All Categories" ||
        item.category === category;

      const matchesStatus =
        status === "All Status" ||
        item.status === status;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesStatus
      );
    });
  }, [search, category, status, createdConsumables]);

  return (
    <main className="min-h-screen bg-[#f8f9fc] px-4 py-5 font-['Geist',sans-serif] text-slate-900">
      {modalMounted && (
        <AddConsumableModal visible={modalVisible} onClose={closeConsumableModal} onAdd={(item) => dispatch(consumableAdded({ ...item, image: coffeeImage }))} />
      )}

      {/* Header */}
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-[-0.02em] text-slate-900">Consumables</h1>
          <p className="mt-1 text-sm font-normal text-slate-500">Track and manage all consumable items and stock.</p>
        </div>
        <Header />
      </div>

      {/* KPI Cards */}
      <section className="mb-4 grid grid-cols-4 gap-4">
        {stats.map((card) => {
          const Icon = card.icon;

          return (
            <article
              key={card.title}
              className="flex min-h-[105px] items-center gap-4 rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-[0_2px_8px_rgba(15,23,42,0.025)]"
            >
              <span
                className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl ${card.iconClass}`}
              >
                <Icon size={22} />
              </span>

              <div>
                <p className="text-sm font-semibold text-slate-600">
                  {card.title}
                </p>

                <h3 className="mt-1 text-2xl font-bold leading-none">
                  {card.value}
                </h3>

                <p className="mt-2 text-xs font-normal text-slate-500">
                  {card.subtitle}
                </p>
              </div>
            </article>
          );
        })}
      </section>

      {/* Main Card */}
      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        {/* Filter Toolbar */}
        <div className="flex items-center justify-between gap-3 border-b border-slate-200 p-4">
          <div className="flex flex-1 items-center gap-3">
            <FilterSelect
              value={category}
              setValue={setCategory}
              options={categories}
              width="w-[190px]"
            />

            <FilterSelect
              value={status}
              setValue={setStatus}
              options={statuses}
              width="w-[190px]"
            />

            <div className="flex h-10 max-w-[315px] flex-1 items-center gap-2 rounded-md border border-slate-200 px-3">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search consumables..."
                className="min-w-0 flex-1 bg-transparent text-sm font-medium text-slate-700 outline-none placeholder:text-slate-400"
              />

              <Search size={14} className="text-slate-400" />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="flex h-10 items-center gap-2 rounded-md border border-violet-300 bg-white px-5 text-sm font-semibold text-violet-600 transition hover:bg-violet-50">
              <Download size={13} />
              Export
            </button>

            <button onClick={openConsumableModal} className="flex h-10 items-center gap-2 rounded-md bg-gradient-to-r from-violet-600 to-indigo-600 px-5 text-sm font-semibold text-white shadow-sm transition hover:brightness-95">
              <Plus size={14} />
              Add Consumable
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px] border-collapse">
            <thead>
              <tr className="bg-slate-50/80">
                {[
                  "Item Name",
                  "Category",
                  "Unit",
                  "In Stock",
                  "Low Stock Alert",
                  "Status",
                  "Last Updated",
                  "Actions",
                ].map((heading) => (
                  <th
                    key={heading}
                    className="border-b border-slate-200 px-5 py-3 text-left text-xs font-semibold text-slate-500"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {filteredConsumables.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-slate-100 last:border-b-0 transition hover:bg-slate-50/60"
                >
                  {/* Item */}
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-lg bg-slate-50"><img src={item.image} alt="" className="h-full w-full object-contain p-1" /></div>

                      <p className="text-sm font-medium text-slate-800">
                        {item.name}
                      </p>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="px-5 py-3 text-sm font-medium text-slate-600">
                    {item.category}
                  </td>

                  {/* Unit */}
                  <td className="px-5 py-3 text-sm font-medium text-slate-600">
                    {item.unit}
                  </td>

                  {/* Stock */}
                  <td className="px-5 py-3 text-sm font-medium text-slate-600">
                    {item.stock}
                  </td>

                  {/* Alert */}
                  <td className="px-5 py-3 text-sm font-medium text-slate-600">
                    {item.alert}
                  </td>

                  {/* Status */}
                  <td className="px-5 py-3">
                    <StockStatus status={item.status} />
                  </td>

                  {/* Updated */}
                  <td className="px-5 py-3 text-sm font-medium text-slate-600">
                    {item.updated}
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        title="Edit Consumable"
                        className="grid h-8 w-8 place-items-center rounded-md border border-slate-200 text-violet-600 transition hover:border-violet-200 hover:bg-violet-50"
                      >
                        <Edit3 size={13} />
                      </button>

                      <button
                        title="More Actions"
                        className="grid h-8 w-8 place-items-center rounded-md border border-slate-200 text-slate-500 transition hover:bg-slate-50"
                      >
                        <MoreVertical size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredConsumables.length === 0 && (
                <tr>
                  <td
                    colSpan={8}
                    className="py-14 text-center text-sm text-slate-400"
                  >
                    No consumables found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex min-h-[64px] items-center justify-between border-t border-slate-100 px-4">
          <p className="text-xs font-normal text-slate-500">
            Showing 1 to 8 of 48 items
          </p>

          <div className="flex items-center gap-1.5">
            <PageButton>
              <ChevronLeft size={12} />
            </PageButton>

            {[1, 2, 3].map((number) => (
              <PageButton
                key={number}
                active={page === number}
                onClick={() => setPage(number)}
              >
                {number}
              </PageButton>
            ))}

            <span className="px-1 text-xs text-slate-400">
              ...
            </span>

            <PageButton onClick={() => setPage(6)}>
              6
            </PageButton>

            <PageButton>
              <ChevronRight size={12} />
            </PageButton>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ------------------ Components ------------------ */

function AddConsumableModal({ visible, onClose, onAdd }) {
  const inputClass = "h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-100";
  return (
    <div onMouseDown={(event) => event.target === event.currentTarget && onClose()} className={"fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 p-4 backdrop-blur-[1px] transition-opacity duration-200 " + (visible ? "opacity-100" : "opacity-0")}>
      <section role="dialog" aria-modal="true" aria-labelledby="add-consumable-title" className={"flex max-h-[calc(100vh-32px)] w-full max-w-[760px] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl transition-all duration-200 ease-out " + (visible ? "translate-y-0 scale-100 opacity-100" : "translate-y-5 scale-[0.96] opacity-0")}>
        <header className="flex items-start justify-between border-b border-slate-200 px-6 py-5"><div><h2 id="add-consumable-title" className="text-xl font-bold text-slate-900">Add Consumable</h2><p className="mt-1 text-sm text-slate-500">Add a new consumable item to track and manage stock.</p></div><button type="button" onClick={onClose} aria-label="Close" className="grid h-8 w-8 place-items-center rounded-md border border-slate-200 text-slate-500 hover:bg-slate-50"><X size={17} /></button></header>
        <form onSubmit={(event) => { event.preventDefault(); const data = new FormData(event.currentTarget); const stock = Number(data.get("stock")); const alertValue = data.get("alert"); onAdd({ name: data.get("name"), category: data.get("category"), unit: data.get("unit"), stock, alert: alertValue + " " + data.get("unit"), description: data.get("description"), reorderLevel: data.get("reorderLevel"), maximumStock: data.get("maximumStock"), supplier: data.get("supplier"), expiryDate: data.get("expiryDate"), storageLocation: data.get("storageLocation"), status: stock <= Number(alertValue) ? "Low Stock" : "In Stock" }); onClose(); }} className="flex min-h-0 flex-1 flex-col">
          <div className="min-h-0 flex-1 overflow-y-auto px-6">
            <ModalStep number="1" title="Basic Details"><div className="grid gap-4 sm:grid-cols-2">
              <ModalField label="Item Name" required><input name="name" required placeholder="Enter item name" className={inputClass} /></ModalField>
              <ModalField label="Category" required><select name="category" required defaultValue="" className={inputClass}><option value="" disabled>Select category</option><option>Pantry</option><option>Housekeeping</option><option>Office Supplies</option></select></ModalField>
              <ModalField label="Unit" required><select name="unit" required defaultValue="" className={inputClass}><option value="" disabled>Select unit</option><option>kg</option><option>liters</option><option>packs</option><option>rolls</option><option>bottles</option><option>pieces</option></select></ModalField>
              <ModalField label="Description (Optional)"><textarea name="description" maxLength={200} placeholder="Enter description (optional)" className="h-[86px] w-full resize-none rounded-md border border-slate-200 p-3 text-sm font-medium outline-none placeholder:text-slate-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-100" /></ModalField>
              <ModalField label="Item Image (Optional)"><label className="flex h-[94px] cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-violet-300 bg-violet-50/30 text-center text-xs text-slate-500 hover:bg-violet-50"><UploadCloud size={23} className="mb-1 text-violet-600" /><span className="font-semibold text-violet-600">Click to upload <span className="font-normal text-slate-500">or drag and drop</span></span><span className="mt-1 text-[11px]">PNG, JPG, JPEG up to 2MB</span><input type="file" accept="image/png,image/jpeg" className="hidden" /></label></ModalField>
            </div></ModalStep>
            <ModalStep number="2" title="Stock Information"><div className="grid gap-4 sm:grid-cols-2">
              <ModalField label="Current Stock" required><UnitInput name="stock" placeholder="Enter current stock" required /></ModalField><ModalField label="Low Stock Alert" required><UnitInput name="alert" placeholder="Enter low stock alert" required /></ModalField>
              <ModalField label="Reorder Level (Optional)"><UnitInput name="reorderLevel" placeholder="Enter reorder level" /></ModalField><ModalField label="Maximum Stock (Optional)"><UnitInput name="maximumStock" placeholder="Enter maximum stock" /></ModalField>
              <div className="sm:col-span-2"><ModalField label="Supplier (Optional)"><select name="supplier" defaultValue="" className={inputClass}><option value="" disabled>Select supplier</option><option>Local Supplier</option><option>Office Essentials</option><option>Pantry Wholesale</option></select></ModalField></div>
            </div></ModalStep>
            <ModalStep number="3" title="Additional Information" last><div className="grid gap-4 sm:grid-cols-2">
              <ModalField label="Expiry Date (Optional)"><div className="relative"><input name="expiryDate" type="date" className={inputClass + " pr-10"} /><CalendarDays size={15} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" /></div></ModalField>
              <ModalField label="Storage Location (Optional)"><input name="storageLocation" placeholder="Enter storage location" className={inputClass} /></ModalField>
            </div></ModalStep>
          </div>
          <footer className="flex justify-end gap-3 border-t border-slate-200 px-6 py-4"><button type="button" onClick={onClose} className="h-10 rounded-md border border-slate-200 px-6 text-sm font-semibold text-slate-700 hover:bg-slate-50">Cancel</button><button type="submit" className="flex h-10 items-center gap-2 rounded-md bg-gradient-to-r from-violet-600 to-indigo-600 px-6 text-sm font-semibold text-white"><Plus size={15} />Add Consumable</button></footer>
        </form>
      </section>
    </div>
  );
}

function ModalStep({ number, title, children, last = false }) {
  return <section className={"py-5 " + (last ? "" : "border-b border-slate-200")}><div className="mb-4 flex items-center gap-2"><span className="grid h-5 w-5 place-items-center rounded-full bg-violet-600 text-[11px] font-bold text-white">{number}</span><h3 className="text-sm font-bold text-slate-900">{title}</h3></div>{children}</section>;
}
function ModalField({ label, required = false, children }) {
  return <label className="block"><span className="mb-1.5 block text-xs font-semibold text-slate-600">{label}{required && <span className="text-rose-500"> *</span>}</span>{children}</label>;
}
function UnitInput({ name, placeholder, required = false }) {
  return <div className="flex h-10 overflow-hidden rounded-md border border-slate-200 bg-white focus-within:border-violet-400 focus-within:ring-2 focus-within:ring-violet-100"><input name={name} type="number" min="0" step="any" required={required} placeholder={placeholder} className="min-w-0 flex-1 px-3 text-sm font-medium text-slate-700 outline-none placeholder:text-slate-400" /><span className="grid place-items-center border-l border-slate-200 px-3 text-xs font-medium text-slate-500">Unit</span></div>;
}function FilterSelect({
  value,
  setValue,
  options,
  width,
}) {
  return (
    <select
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className={`${width} h-10 rounded-md border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 outline-none transition focus:border-violet-300 focus:ring-2 focus:ring-violet-100`}
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

function StockStatus({ status }) {
  const styles = {
    "In Stock":
      "bg-emerald-50 text-emerald-600",
    "Low Stock":
      "bg-amber-50 text-amber-600",
    "Out of Stock":
      "bg-rose-50 text-rose-600",
  };

  return (
    <span
      className={`inline-flex min-w-[66px] items-center justify-center rounded-md px-2.5 py-1 text-xs font-medium ${styles[status]}`}
    >
      {status}
    </span>
  );
}

function PageButton({
  children,
  active,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className={`grid h-8 min-w-8 place-items-center rounded-md border px-2 text-xs font-medium transition ${
        active
          ? "border-violet-600 bg-violet-600 text-white shadow-sm"
          : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
      }`}
    >
      {children}
    </button>
  );
}




