import React, { useMemo, useState } from "react";
import Header from "../components/Header";
import coffeeImage from "../assets/coffee.png";
import milkImage from "../assets/milk.png";
import teaImage from "../assets/tea.png";
import cupsImage from "../assets/paper_cups.png";
import handwashImage from "../assets/handwash.png";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Download,
  Eye,
  LineChart,
  PieChart,
  Search,
  TrendingDown,
} from "lucide-react";

const stats = [
  {
    title: "Total Used (This Month)",
    value: "128",
    subtitle: "Items consumed",
    icon: LineChart,
    iconClass: "bg-violet-50 text-violet-600",
  },
  {
    title: "Total Value (This Month)",
    value: "$546.80",
    subtitle: "Approx. value",
    icon: TrendingDown,
    iconClass: "bg-emerald-50 text-emerald-600",
  },
  {
    title: "Avg. Daily Usage",
    value: "6.4",
    subtitle: "Items per day",
    icon: CalendarDays,
    iconClass: "bg-orange-50 text-orange-500",
  },
  {
    title: "Most Used Item",
    value: "Coffee Beans",
    subtitle: "24 times this month",
    icon: PieChart,
    iconClass: "bg-blue-50 text-blue-600",
  },
];

const usageHistory = [
  {
    id: 1,
    date: "12 May 2024",
    time: "10:30 AM",
    name: "Coffee Beans",
    category: "Pantry",
    unit: "kg",
    quantity: "1.5",
    issuedTo: "Operations Team",
    issuedBy: "Inventory Admin",
    purpose: "Daily Coffee",
    location: "Pantry",
    image: coffeeImage,
  },
  {
    id: 2,
    date: "12 May 2024",
    time: "09:15 AM",
    name: "Milk Pack",
    category: "Pantry",
    unit: "liters",
    quantity: "2",
    issuedTo: "Housekeeping",
    issuedBy: "Inventory Admin",
    purpose: "Morning Use",
    location: "Pantry",
    image: milkImage,
  },
  {
    id: 3,
    date: "11 May 2024",
    time: "04:45 PM",
    name: "Tea Leaves",
    category: "Pantry",
    unit: "packs",
    quantity: "1",
    issuedTo: "Operations Team",
    issuedBy: "Inventory Admin",
    purpose: "Evening Tea",
    location: "Pantry",
    image: teaImage,
  },
  {
    id: 4,
    date: "11 May 2024",
    time: "03:20 PM",
    name: "Paper Cups",
    category: "Pantry",
    unit: "packs",
    quantity: "2",
    issuedTo: "HR Team",
    issuedBy: "Inventory Admin",
    purpose: "Meeting",
    location: "Pantry",
    image: cupsImage,
  },
  {
    id: 5,
    date: "11 May 2024",
    time: "02:10 PM",
    name: "Hand Wash",
    category: "Housekeeping",
    unit: "bottles",
    quantity: "1",
    issuedTo: "Housekeeping",
    issuedBy: "Inventory Admin",
    purpose: "Washroom",
    location: "Main Office",
    image: handwashImage,
  },
];

const chartPoints = [
  5, 10, 9, 11, 8, 4, 4, 6, 12, 14, 10, 7, 9, 5, 6, 4, 5, 7, 12, 8, 5, 7, 10,
];

const consumedItems = [
  {
    label: "Coffee Beans",
    value: 24,
    percentage: "18.8%",
    className: "bg-violet-600",
  },
  {
    label: "Milk Pack",
    value: 18,
    percentage: "14.1%",
    className: "bg-emerald-400",
  },
  {
    label: "Tea Leaves",
    value: 16,
    percentage: "12.5%",
    className: "bg-orange-400",
  },
  {
    label: "Paper Cups",
    value: 14,
    percentage: "10.9%",
    className: "bg-blue-500",
  },
  {
    label: "Hand Wash",
    value: 12,
    percentage: "9.4%",
    className: "bg-rose-400",
  },
  {
    label: "Others",
    value: 44,
    percentage: "34.3%",
    className: "bg-slate-300",
  },
];

export default function StockUsage() {
  const [category, setCategory] = useState("All Categories");
  const [location, setLocation] = useState("All Locations");
  const [issuedBy, setIssuedBy] = useState("All Issued By");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filteredHistory = useMemo(() => {
    const q = search.trim().toLowerCase();

    return usageHistory.filter((item) => {
      const matchesSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.issuedTo.toLowerCase().includes(q);

      const matchesCategory =
        category === "All Categories" ||
        item.category === category;

      const matchesLocation =
        location === "All Locations" ||
        item.location === location;

      const matchesIssuedBy =
        issuedBy === "All Issued By" ||
        item.issuedBy === issuedBy;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesLocation &&
        matchesIssuedBy
      );
    });
  }, [search, category, location, issuedBy]);

  return (
    <main className="min-h-screen bg-[#f8f9fc] px-4 py-5 font-['Geist',sans-serif] text-slate-900">
      {/* HEADER */}
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-[-0.02em] text-slate-900">Stock Usage</h1>
          <p className="mt-1 text-sm font-normal text-slate-500">Track and analyze the usage of all consumable items.</p>
        </div>
        <Header />
      </div>

      {/* KPI CARDS */}
      <section className="mb-4 grid grid-cols-4 gap-4">
        {stats.map((card) => {
          const Icon = card.icon;

          return (
            <article
              key={card.title}
              className="flex min-h-[104px] items-center gap-4 rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-[0_2px_8px_rgba(15,23,42,0.025)]"
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

      {/* FILTER BAR */}
      <section className="mb-4 grid grid-cols-[1.15fr_1fr_1fr_1fr_1.1fr_auto] gap-3">
        <button className="flex h-10 items-center gap-2 rounded-md border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700">
          <CalendarDays size={13} className="text-slate-400" />
          01 May 2024 - 31 May 2024
        </button>

        <FilterSelect
          value={category}
          setValue={setCategory}
          options={["All Categories", "Pantry", "Housekeeping"]}
        />

        <FilterSelect
          value={location}
          setValue={setLocation}
          options={[
            "All Locations",
            "Pantry",
            "Main Office",
          ]}
        />

        <FilterSelect
          value={issuedBy}
          setValue={setIssuedBy}
          options={[
            "All Issued By",
            "Inventory Admin",
            "HR Admin",
          ]}
        />

        <div className="flex h-10 items-center gap-2 rounded-md border border-slate-200 bg-white px-3">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search consumables..."
            className="min-w-0 flex-1 bg-transparent text-sm font-medium outline-none placeholder:text-slate-400"
          />

          <Search size={13} className="text-slate-400" />
        </div>

        <button className="flex h-10 items-center justify-center gap-2 rounded-md border border-violet-300 bg-white px-5 text-sm font-semibold text-violet-600 hover:bg-violet-50">
          <Download size={13} />
          Export
        </button>
      </section>

      {/* CHARTS */}
      <section className="mb-4 grid grid-cols-2 gap-4">
        {/* Usage Overview */}
        <article className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base font-semibold">
              Usage Overview
            </h2>

            <select className="h-8 rounded-md border border-slate-200 bg-white px-3 text-xs font-medium text-slate-600 outline-none">
              <option>Daily</option>
              <option>Weekly</option>
              <option>Monthly</option>
            </select>
          </div>

          <UsageLineChart values={chartPoints} />
        </article>

        {/* Donut */}
        <article className="rounded-xl border border-slate-200 bg-white p-4">
          <h2 className="text-base font-semibold">
            Top Consumed Items
          </h2>

          <div className="mt-5 grid grid-cols-[200px_1fr] items-center gap-6">
            <div className="relative mx-auto h-[150px] w-[150px] rounded-full bg-[conic-gradient(#7c3aed_0_18.8%,#4ade80_18.8%_32.9%,#fb923c_32.9%_45.4%,#3b82f6_45.4%_56.3%,#fb7185_56.3%_65.7%,#cbd5e1_65.7%_100%)]">
              <div className="absolute inset-[30px] grid place-items-center rounded-full bg-white">
                <div className="text-center">
                  <strong className="block text-[24px] font-semibold">
                    128
                  </strong>

                  <span className="text-xs font-normal text-slate-500">
                    Total Used
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {consumedItems.map((item) => (
                <div
                  key={item.label}
                  className="grid grid-cols-[10px_1fr_auto] items-center gap-3"
                >
                  <span
                    className={`h-2 w-2 rounded-full ${item.className}`}
                  />

                  <span className="text-sm font-medium text-slate-600">
                    {item.label}
                  </span>

                  <strong className="text-xs font-semibold text-slate-600">
                    {item.value} ({item.percentage})
                  </strong>
                </div>
              ))}
            </div>
          </div>
        </article>
      </section>

      {/* USAGE HISTORY */}
      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="px-4 py-3">
          <h2 className="text-base font-semibold">
            Usage History
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1050px] border-collapse">
            <thead>
              <tr className="bg-slate-50/80">
                {[
                  "Date & Time",
                  "Item Name",
                  "Category",
                  "Unit",
                  "Quantity Used",
                  "Issued To",
                  "Issued By",
                  "Purpose",
                  "Location",
                  "Actions",
                ].map((heading) => (
                  <th
                    key={heading}
                    className="border-b border-slate-200 px-4 py-3 text-left text-xs font-semibold text-slate-500"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {filteredHistory.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50/60"
                >
                  <td className="px-4 py-3">
                    <p className="text-xs font-medium text-slate-600">
                      {item.date}
                    </p>
                    <p className="mt-0.5 text-xs font-normal text-slate-400">
                      {item.time}
                    </p>
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <span className="grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-lg bg-slate-50"><img src={item.image} alt="" className="h-full w-full object-contain p-1" /></span>

                      <span className="text-sm font-medium text-slate-800">
                        {item.name}
                      </span>
                    </div>
                  </td>

                  <td className="px-4 py-3 text-xs font-medium text-slate-600">
                    {item.category}
                  </td>

                  <td className="px-4 py-3 text-xs font-medium text-slate-600">
                    {item.unit}
                  </td>

                  <td className="px-4 py-3 text-xs font-medium text-slate-600">
                    {item.quantity}
                  </td>

                  <td className="px-4 py-3 text-xs font-medium text-slate-600">
                    {item.issuedTo}
                  </td>

                  <td className="px-4 py-3 text-xs font-medium text-slate-600">
                    {item.issuedBy}
                  </td>

                  <td className="px-4 py-3 text-xs font-medium text-slate-600">
                    {item.purpose}
                  </td>

                  <td className="px-4 py-3 text-xs font-medium text-slate-600">
                    {item.location}
                  </td>

                  <td className="px-4 py-3">
                    <button className="grid h-8 w-8 place-items-center rounded-md border border-slate-200 text-indigo-600 hover:bg-indigo-50">
                      <Eye size={13} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex min-h-[58px] items-center justify-between border-t border-slate-100 px-4">
          <p className="text-xs font-normal text-slate-500">
            Showing 1 to 5 of 36 entries
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

            <PageButton onClick={() => setPage(8)}>
              8
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

function FilterSelect({
  value,
  setValue,
  options,
}) {
  return (
    <select
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 outline-none focus:border-violet-300 focus:ring-2 focus:ring-violet-100"
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

function UsageLineChart({ values }) {
  const width = 620;
  const height = 190;
  const padding = 24;

  const maxValue = Math.max(...values, 20);

  const points = values.map((value, index) => {
    const x =
      padding +
      (index / (values.length - 1)) *
        (width - padding * 2);

    const y =
      height -
      padding -
      (value / maxValue) *
        (height - padding * 2);

    return `${x},${y}`;
  });

  const areaPoints = [
    `${padding},${height - padding}`,
    ...points,
    `${width - padding},${height - padding}`,
  ].join(" ");

  return (
    <div className="relative h-[220px] w-full">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-full w-full overflow-visible"
        preserveAspectRatio="none"
      >
        {[0, 5, 10, 15, 20].map((value) => {
          const y =
            height -
            padding -
            (value / 20) *
              (height - padding * 2);

          return (
            <g key={value}>
              <line
                x1={padding}
                y1={y}
                x2={width - padding}
                y2={y}
                stroke="#e9edf3"
                strokeWidth="1"
                strokeDasharray="3 3"
              />

              <text
                x="0"
                y={y + 3}
                fontSize="8"
                fill="#94a3b8"
              >
                {value}
              </text>
            </g>
          );
        })}

        <defs>
          <linearGradient
            id="usageArea"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop
              offset="0%"
              stopColor="#7c3aed"
              stopOpacity="0.18"
            />
            <stop
              offset="100%"
              stopColor="#7c3aed"
              stopOpacity="0.015"
            />
          </linearGradient>
        </defs>

        <polygon
          points={areaPoints}
          fill="url(#usageArea)"
        />

        <polyline
          points={points.join(" ")}
          fill="none"
          stroke="#6d4aff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {points.map((point, index) => {
          const [x, y] = point.split(",");

          return (
            <circle
              key={index}
              cx={x}
              cy={y}
              r="2.5"
              fill="#ffffff"
              stroke="#6d4aff"
              strokeWidth="1.5"
            />
          );
        })}
      </svg>

      <div className="mt-[-7px] flex justify-between px-6 text-xs font-normal text-slate-400">
        <span>01 May</span>
        <span>06 May</span>
        <span>11 May</span>
        <span>16 May</span>
        <span>21 May</span>
        <span>26 May</span>
        <span>31 May</span>
      </div>
    </div>
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
          ? "border-violet-600 bg-white text-violet-600 shadow-sm"
          : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
      }`}
    >
      {children}
    </button>
  );
}
