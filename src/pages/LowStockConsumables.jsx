import React, { useMemo, useState } from "react";
import Header from "../components/Header";
import coffeeImage from "../assets/coffee.png";
import milkImage from "../assets/milk.png";
import teaImage from "../assets/tea.png";
import cupsImage from "../assets/paper_cups.png";
import tissueImage from "../assets/tissue.png";
import handwashImage from "../assets/handwash.png";
import sanitizerImage from "../assets/hand_sanitizer.png";
import sugarImage from "../assets/sugar.png";
import {
  AlertTriangle,
  Box,
  ChevronLeft,
  ChevronRight,
  Download,
  Search,
  ShieldCheck,
  ShoppingCart,
} from "lucide-react";

const stats = [
  {
    title: "Low Stock Items",
    value: "12",
    subtitle: "Items running low",
    icon: AlertTriangle,
    iconClass: "bg-rose-50 text-rose-500",
  },
  {
    title: "Reorder Soon",
    value: "8",
    subtitle: "Need to reorder",
    icon: ShoppingCart,
    iconClass: "bg-amber-50 text-amber-500",
  },
  {
    title: "Well Stocked",
    value: "24",
    subtitle: "Items in good range",
    icon: ShieldCheck,
    iconClass: "bg-emerald-50 text-emerald-600",
  },
  {
    title: "Total Consumables",
    value: "44",
    subtitle: "All consumable items",
    icon: Box,
    iconClass: "bg-violet-50 text-violet-600",
  },
];

const lowStockData = [
  {
    id: 1,
    name: "Coffee Beans",
    category: "Pantry",
    location: "Pantry",
    unit: "kg",
    current: 0.8,
    minimum: 2.0,
    status: "Critical",
    updatedDate: "12 May 2024",
    updatedTime: "10:30 AM",
    image: coffeeImage,
  },
  {
    id: 2,
    name: "Milk Pack",
    category: "Pantry",
    location: "Pantry",
    unit: "liters",
    current: 1.0,
    minimum: 3.0,
    status: "Critical",
    updatedDate: "12 May 2024",
    updatedTime: "09:15 AM",
    image: milkImage,
  },
  {
    id: 3,
    name: "Tea Leaves",
    category: "Pantry",
    location: "Pantry",
    unit: "packs",
    current: 2,
    minimum: 5,
    status: "Low",
    updatedDate: "11 May 2024",
    updatedTime: "04:45 PM",
    image: teaImage,
  },
  {
    id: 4,
    name: "Paper Cups",
    category: "Pantry",
    location: "Pantry",
    unit: "packs",
    current: 3,
    minimum: 10,
    status: "Low",
    updatedDate: "11 May 2024",
    updatedTime: "03:20 PM",
    image: cupsImage,
  },
  {
    id: 5,
    name: "Tissue Roll",
    category: "Housekeeping",
    location: "Washroom",
    unit: "rolls",
    current: 2,
    minimum: 6,
    status: "Low",
    updatedDate: "11 May 2024",
    updatedTime: "02:10 PM",
    image: tissueImage,
  },
  {
    id: 6,
    name: "Hand Wash",
    category: "Housekeeping",
    location: "Washroom",
    unit: "bottles",
    current: 1,
    minimum: 3,
    status: "Critical",
    updatedDate: "10 May 2024",
    updatedTime: "11:50 AM",
    image: handwashImage,
  },
  {
    id: 7,
    name: "Hand Sanitizer",
    category: "Housekeeping",
    location: "Main Office",
    unit: "bottles",
    current: 1,
    minimum: 4,
    status: "Critical",
    updatedDate: "10 May 2024",
    updatedTime: "10:05 AM",
    image: sanitizerImage,
  },
  {
    id: 8,
    name: "Sugar",
    category: "Pantry",
    location: "Pantry",
    unit: "kg",
    current: 0.5,
    minimum: 2.0,
    status: "Critical",
    updatedDate: "09 May 2024",
    updatedTime: "05:30 PM",
    image: sugarImage,
  },
];

export default function LowStockConsumables() {
  const [category, setCategory] = useState("All Categories");
  const [location, setLocation] = useState("All Locations");
  const [unit, setUnit] = useState("All Units");
  const [sort, setSort] = useState("Stock (Low to High)");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filteredItems = useMemo(() => {
    let result = [...lowStockData];

    const q = search.trim().toLowerCase();

    if (q) {
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          item.location.toLowerCase().includes(q)
      );
    }

    if (category !== "All Categories") {
      result = result.filter(
        (item) => item.category === category
      );
    }

    if (location !== "All Locations") {
      result = result.filter(
        (item) => item.location === location
      );
    }

    if (unit !== "All Units") {
      result = result.filter(
        (item) => item.unit === unit
      );
    }

    if (sort === "Stock (Low to High)") {
      result.sort((a, b) => a.current - b.current);
    }

    if (sort === "Stock (High to Low)") {
      result.sort((a, b) => b.current - a.current);
    }

    if (sort === "Name (A-Z)") {
      result.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    }

    return result;
  }, [
    search,
    category,
    location,
    unit,
    sort,
  ]);

  const handleReorder = (item) => {
    console.log("Reorder:", item);

    // Later API example:
    // await axios.post("/api/consumables/reorder", {
    //   consumableId: item.id,
    // });
  };

  return (
    <main className="min-h-screen bg-[#f8f9fc] px-4 py-5 font-['Geist',sans-serif] text-slate-900">
      {/* HEADER */}
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-[-0.02em] text-slate-900">Low Stock Consumables</h1>
          <p className="mt-1 text-sm font-normal text-slate-500">Items that are running low and need restocking.</p>
        </div>
        <Header />
      </div>

      {/* KPI CARDS */}
      <section className="mb-5 grid grid-cols-4 gap-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <article
              key={item.title}
              className="flex min-h-[102px] items-center gap-4 rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-[0_2px_8px_rgba(15,23,42,0.025)]"
            >
              <span
                className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl ${item.iconClass}`}
              >
                <Icon size={22} />
              </span>

              <div>
                <p className="text-sm font-semibold text-slate-600">
                  {item.title}
                </p>

                <h3 className="mt-1 text-2xl font-bold leading-none">
                  {item.value}
                </h3>

                <p className="mt-2 text-xs font-normal text-slate-500">
                  {item.subtitle}
                </p>
              </div>
            </article>
          );
        })}
      </section>

      {/* FILTER BAR */}
      <section className="mb-4 grid grid-cols-[1fr_1fr_1fr_1.1fr_1.1fr_auto] gap-3">
        <SelectField
          value={category}
          setValue={setCategory}
          options={[
            "All Categories",
            "Pantry",
            "Housekeeping",
          ]}
        />

        <SelectField
          value={location}
          setValue={setLocation}
          options={[
            "All Locations",
            "Pantry",
            "Washroom",
            "Main Office",
          ]}
        />

        <SelectField
          value={unit}
          setValue={setUnit}
          options={[
            "All Units",
            "kg",
            "liters",
            "packs",
            "rolls",
            "bottles",
          ]}
        />

        <SelectField
          value={sort}
          setValue={setSort}
          options={[
            "Stock (Low to High)",
            "Stock (High to Low)",
            "Name (A-Z)",
          ]}
        />

        <div className="flex h-10 items-center gap-2 rounded-md border border-slate-200 bg-white px-3">
          <input
            type="text"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search consumables..."
            className="min-w-0 flex-1 bg-transparent text-sm font-medium outline-none placeholder:text-slate-400"
          />

          <Search
            size={13}
            className="text-slate-400"
          />
        </div>

        <button className="flex h-10 min-w-[90px] items-center justify-center gap-2 rounded-md border border-violet-300 bg-white px-4 text-sm font-semibold text-violet-600 transition hover:bg-violet-50">
          <Download size={13} />
          Export
        </button>
      </section>

      {/* TABLE */}
      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1050px] border-collapse">
            <thead>
              <tr className="bg-slate-50/80">
                {[
                  "Item Name",
                  "Category",
                  "Location",
                  "Unit",
                  "Current Stock",
                  "Minimum Stock",
                  "Status",
                  "Last Updated",
                  "Action",
                ].map((heading) => (
                  <th
                    key={heading}
                    className="border-b border-slate-200 px-5 py-3.5 text-left text-xs font-semibold text-slate-500"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {filteredItems.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-slate-100 last:border-b-0 transition hover:bg-slate-50/60"
                >
                  {/* ITEM */}
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <span className="grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-lg bg-slate-50"><img src={item.image} alt="" className="h-full w-full object-contain p-1" /></span>

                      <span className="text-sm font-semibold text-slate-800">
                        {item.name}
                      </span>
                    </div>
                  </td>

                  {/* CATEGORY */}
                  <td className="px-5 py-3.5 text-sm font-medium text-slate-600">
                    {item.category}
                  </td>

                  {/* LOCATION */}
                  <td className="px-5 py-3.5 text-sm font-medium text-slate-600">
                    {item.location}
                  </td>

                  {/* UNIT */}
                  <td className="px-5 py-3.5 text-sm font-medium text-slate-600">
                    {item.unit}
                  </td>

                  {/* CURRENT STOCK */}
                  <td className="px-5 py-3.5">
                    <span
                      className={`text-sm font-semibold ${
                        item.status === "Critical"
                          ? "text-rose-500"
                          : "text-orange-500"
                      }`}
                    >
                      {item.current}
                    </span>
                  </td>

                  {/* MIN STOCK */}
                  <td className="px-5 py-3.5 text-sm font-medium text-slate-700">
                    {item.minimum}
                  </td>

                  {/* STATUS */}
                  <td className="px-5 py-3.5">
                    <StockStatus
                      status={item.status}
                    />
                  </td>

                  {/* UPDATED */}
                  <td className="px-5 py-3.5">
                    <p className="text-xs font-medium text-slate-600">
                      {item.updatedDate}
                    </p>

                    <p className="mt-0.5 text-xs font-normal text-slate-400">
                      {item.updatedTime}
                    </p>
                  </td>

                  {/* ACTION */}
                  <td className="px-5 py-3.5">
                    <button
                      type="button"
                      onClick={() =>
                        handleReorder(item)
                      }
                      className="flex h-8 min-w-[82px] items-center justify-center gap-2 rounded-md border border-violet-300 bg-white px-3 text-xs font-semibold text-violet-600 transition hover:bg-violet-50"
                    >
                      <ShoppingCart size={12} />
                      Reorder
                    </button>
                  </td>
                </tr>
              ))}

              {filteredItems.length === 0 && (
                <tr>
                  <td
                    colSpan={9}
                    className="py-14 text-center text-sm text-slate-400"
                  >
                    No low-stock consumables found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* FOOTER */}
        <div className="flex min-h-[63px] items-center justify-between border-t border-slate-100 px-4">
          <p className="text-xs font-normal text-slate-500">
            Showing 1 to 8 of 12 items
          </p>

          <div className="flex items-center gap-2">
            <PaginationButton
              onClick={() =>
                setPage((p) =>
                  Math.max(1, p - 1)
                )
              }
            >
              <ChevronLeft size={12} />
            </PaginationButton>

            {[1, 2].map((number) => (
              <PaginationButton
                key={number}
                active={page === number}
                onClick={() =>
                  setPage(number)
                }
              >
                {number}
              </PaginationButton>
            ))}

            <PaginationButton
              onClick={() =>
                setPage((p) =>
                  Math.min(2, p + 1)
                )
              }
            >
              <ChevronRight size={12} />
            </PaginationButton>
          </div>
        </div>
      </section>
    </main>
  );
}

function SelectField({
  value,
  setValue,
  options,
}) {
  return (
    <select
      value={value}
      onChange={(e) =>
        setValue(e.target.value)
      }
      className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 outline-none transition focus:border-violet-300 focus:ring-2 focus:ring-violet-100"
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
  if (status === "Critical") {
    return (
      <span className="inline-flex min-w-[64px] items-center justify-center gap-1.5 rounded-md bg-rose-50 px-2.5 py-1.5 text-xs font-medium text-rose-600">
        <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
        Critical
      </span>
    );
  }

  return (
    <span className="inline-flex min-w-[55px] items-center justify-center gap-1.5 rounded-md bg-amber-50 px-2.5 py-1.5 text-xs font-medium text-amber-600">
      <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
      Low
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
      type="button"
      onClick={onClick}
      className={`grid h-8 min-w-8 place-items-center rounded-md border px-2 text-xs font-medium transition ${
        active
          ? "border-violet-600 bg-white text-violet-600 shadow-sm"
          : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
      }`}
    >
      {children}
    </button>
  );
}
