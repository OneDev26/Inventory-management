import Header from "../components/Header";
import laptopImage from "../assets/laptop.png";
import cpuImage from "../assets/cpu.png";
import monitorImage from "../assets/monitor.png";
import keyboardImage from "../assets/keyboard.png";
import chairImage from "../assets/chair.png";
import React from "react";
import {
  CalendarDays,
  ChevronDown,
  Box,
  CheckCircle2,
  Download,
  TriangleAlert,
  Wrench,
  CircleX,
  Users,
  BriefcaseBusiness,
  Monitor,
  DollarSign,
  Plus,
  MonitorCog,
  ArrowLeftRight,
  Trash2,
  BarChart3,
  Search,
  FileWarning,
  Coffee,
  Milk,
  FileText,
} from "lucide-react";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const stats = [
  {
    title: "Total Assets",
    value: "2,146",
    subtitle: "All Types",
    icon: Box,
    color: "blue",
    bg: "bg-blue-50",
    text: "text-blue-600",
  },
  {
    title: "Assigned Assets",
    value: "1,624",
    subtitle: "75.6% of total",
    icon: CheckCircle2,
    color: "green",
    bg: "bg-green-50",
    text: "text-green-600",
  },
  {
    title: "Available Assets",
    value: "312",
    subtitle: "14.5% of total",
    icon: Download,
    color: "purple",
    bg: "bg-purple-50",
    text: "text-purple-600",
  },
  {
    title: "Damaged Assets",
    value: "98",
    subtitle: "4.6% of total",
    icon: TriangleAlert,
    color: "orange",
    bg: "bg-orange-50",
    text: "text-orange-600",
  },
  {
    title: "Under Repair",
    value: "67",
    subtitle: "3.1% of total",
    icon: Wrench,
    color: "red",
    bg: "bg-red-50",
    text: "text-red-600",
  },
  {
    title: "Lost Assets",
    value: "45",
    subtitle: "2.2% of total",
    icon: CircleX,
    color: "slate",
    bg: "bg-slate-100",
    text: "text-slate-500",
  },
];

const departments = [
  {
    name: "Operations",
    employees: 45,
    assigned: 620,
    damaged: 12,
    repair: 8,
    available: 35,
    icon: BriefcaseBusiness,
    color: "blue",
  },
  {
    name: "HR",
    employees: 18,
    assigned: 135,
    damaged: 2,
    repair: 2,
    available: 18,
    icon: Users,
    color: "purple",
  },
  {
    name: "Technical",
    employees: 22,
    assigned: 198,
    damaged: 5,
    repair: 7,
    available: 28,
    icon: Monitor,
    color: "teal",
  },
  {
    name: "Finance",
    employees: 16,
    assigned: 112,
    damaged: 1,
    repair: 1,
    available: 10,
    icon: DollarSign,
    color: "orange",
  },
  {
    name: "Management",
    employees: 10,
    assigned: 86,
    damaged: 0,
    repair: 0,
    available: 8,
    icon: BriefcaseBusiness,
    color: "green",
  },
];

const consumables = [
  {
    name: "Milk",
    category: "Pantry - Operations",
    quantity: "7 L",
    minimum: "Min. 10 L",
    percentage: 70,
    icon: Milk,
  },
  {
    name: "Tea",
    category: "Pantry - Operations",
    quantity: "4.6 kg",
    minimum: "Min. 5 kg",
    percentage: 75,
    icon: Coffee,
  },
  {
    name: "Coffee",
    category: "Pantry - Operations",
    quantity: "1.2 kg",
    minimum: "Min. 2 kg",
    percentage: 60,
    icon: Coffee,
  },
  {
    name: "Sugar",
    category: "Pantry - HR",
    quantity: "1.5 kg",
    minimum: "Min. 2 kg",
    percentage: 70,
    icon: Coffee,
  },
  {
    name: "Printer Paper (A4)",
    category: "HR Store",
    quantity: "2 Ream",
    minimum: "Min. 5 Ream",
    percentage: 40,
    icon: FileText,
  },
];

const assignedAssets = [
  {
    asset: "Laptop - Dell Inspiron 15",
    image: laptopImage,
    id: "LAP-HR-0023",
    assignedTo: "Priya Sharma",
    employeeId: "EMP-1042",
    department: "HR",
    date: "May 26, 2025",
  },
  {
    asset: "CPU - Dell OptiPlex 7010",
    image: cpuImage,
    id: "CPU-OPS-0045",
    assignedTo: "Rahul Sharma",
    employeeId: "EMP-1087",
    department: "Operations",
    date: "May 25, 2025",
  },
  {
    asset: 'Monitor 24" LED',
    image: monitorImage,
    id: "MON-OPS-0121",
    assignedTo: "Amit Verma",
    employeeId: "EMP-1015",
    department: "Operations",
    date: "May 25, 2025",
  },
  {
    asset: "Keyboard - Logitech K120",
    image: keyboardImage,
    id: "KEY-TECH-0041",
    assignedTo: "Sehaj Patel",
    employeeId: "EMP-1045",
    department: "Technical",
    date: "May 24, 2025",
  },
  {
    asset: "Chair - High Back Mesh",
    image: chairImage,
    id: "CHR-OPS-0084",
    assignedTo: "Vikram Singh",
    employeeId: "EMP-1102",
    department: "Operations",
    date: "May 24, 2025",
  },
];

const damageReports = [
  {
    asset: 'Monitor 24" LED',
    image: monitorImage,
    id: "MON-OPS-0121",
    person: "Rahul Sharma",
    employeeId: "EMP-1087",
    severity: "Major",
    date: "May 26, 2025",
  },
  {
    asset: "Keyboard - Dell KB216",
    image: keyboardImage,
    id: "KEY-TECH-0067",
    person: "Amit Verma",
    employeeId: "EMP-1015",
    severity: "Moderate",
    date: "May 25, 2025",
  },
  {
    asset: "CPU - Dell OptiPlex 7010",
    image: cpuImage,
    id: "CPU-OPS-0045",
    person: "Vikash Yadav",
    employeeId: "EMP-1110",
    severity: "Major",
    date: "May 24, 2025",
  },
];

const chartData = [
  { name: "Assigned", value: 1624 },
  { name: "Available", value: 312 },
  { name: "Damaged", value: 98 },
  { name: "Under Repair", value: 67 },
  { name: "Lost", value: 45 },
];

const chartColors = ["#3b82f6", "#8b5cf6", "#f59e0b", "#ef4444", "#64748b"];

const colorClasses = {
  blue: "bg-blue-50 text-blue-600",
  purple: "bg-purple-50 text-purple-600",
  teal: "bg-teal-50 text-teal-600",
  orange: "bg-orange-50 text-orange-600",
  green: "bg-green-50 text-green-600",
};

function SectionHeader({ title, button = "View All" }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-sm font-semibold text-slate-800">{title}</h2>

      <button className="text-xs font-semibold text-blue-600 hover:text-blue-700">
        {button}
      </button>
    </div>
  );
}

function DashboardStats() {
  return (
    <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 xl:grid-cols-6">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="flex min-h-[108px] items-center justify-between rounded-xl border border-slate-200 bg-white p-3.5 shadow-[0_1px_3px_rgba(0,0,0,0.03)]"
          >
            <div className="flex w-full items-center justify-between">
              <div>
                <p className={`text-[11px] font-medium ${item.text}`}>
                  {item.title}
                </p>

                <h3 className="mt-1.5 text-xl font-bold leading-none text-slate-900">
                  {item.value}
                </h3>

                <p className="mt-2 text-[10px] font-normal text-slate-500">
                  {item.subtitle}
                </p>
              </div>

              <div
                className={`ml-3 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${item.bg}`}
              >
                <Icon size={23} strokeWidth={2.2} className={item.text} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function DepartmentSummary() {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 h-full">
      <SectionHeader title="Department Summary" button="View All Departments" />

      <div className="overflow-x-auto">
        <table className="w-full min-w-[520px]">
          <thead>
            <tr className="text-left border-b border-slate-100">
              <th className="pb-2 text-xs font-medium text-slate-400">
                Department
              </th>
              <th className="pb-2 text-xs font-medium text-slate-400">
                Employees
              </th>
              <th className="pb-2 text-xs font-medium text-slate-400">
                Assigned Assets
              </th>
              <th className="pb-2 text-xs font-medium text-slate-400">
                Damaged
              </th>
              <th className="pb-2 text-xs font-medium text-slate-400">
                Under Repair
              </th>
              <th className="pb-2 text-xs font-medium text-slate-400">
                Available
              </th>
            </tr>
          </thead>

          <tbody>
            {departments.map((dept) => {
              const Icon = dept.icon;

              return (
                <tr
                  key={dept.name}
                  className="border-b last:border-0 border-slate-50"
                >
                  <td className="py-2">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-6 h-6 rounded-md flex items-center justify-center ${
                          colorClasses[dept.color]
                        }`}
                      >
                        <Icon size={12} />
                      </div>

                      <span className="text-xs font-medium text-slate-700">
                        {dept.name}
                      </span>
                    </div>
                  </td>

                  <td className="text-xs text-slate-600">{dept.employees}</td>

                  <td className="text-xs text-slate-600">{dept.assigned}</td>

                  <td className="text-xs text-red-500">{dept.damaged}</td>

                  <td className="text-xs text-orange-500">{dept.repair}</td>

                  <td className="text-xs text-blue-600">{dept.available}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-4 gap-2 mt-3">
        <MiniStat icon={Users} label="Total Employees" value="111" />

        <MiniStat icon={BriefcaseBusiness} label="Departments" value="5" />

        <MiniStat icon={Monitor} label="Workstations" value="64" />

        <MiniStat
          icon={DollarSign}
          label="Asset Value"
          value={"\u20B9 3.48 Cr"}
        />
      </div>
    </div>
  );
}

function MiniStat({ icon: Icon, label, value }) {
  return (
    <div className="bg-slate-50 rounded-lg p-2 flex items-center gap-2">
      <div className="w-6 h-6 bg-white rounded-md flex items-center justify-center">
        <Icon size={12} className="text-blue-500" />
      </div>

      <div className="min-w-0">
        <p className="text-xs text-slate-400 truncate">{label}</p>
        <p className="text-xs font-semibold text-slate-700">{value}</p>
      </div>
    </div>
  );
}

function LowStock() {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 h-full">
      <SectionHeader title="Low Stock Consumables" />

      <div className="space-y-3">
        {consumables.map((item) => {
          const Icon = item.icon;

          return (
            <div key={item.name}>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-slate-50 rounded-md flex items-center justify-center">
                  <Icon size={14} className="text-slate-500" />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-slate-700">
                    {item.name}
                  </p>

                  <p className="text-[10px] text-slate-400">{item.category}</p>
                </div>

                <div className="text-right">
                  <p className="text-xs font-semibold text-slate-700">
                    {item.quantity}
                  </p>

                  <p className="text-[10px] text-red-500">{item.minimum}</p>
                </div>
              </div>

              <div className="ml-9 mt-1.5 h-[3px] bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-red-500 rounded-full"
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function RecentAssignedAssets() {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4">
      <SectionHeader title="Recent Assigned Assets" />

      <div className="overflow-x-auto">
        <table className="w-full min-w-[650px]">
          <thead>
            <tr className="border-b border-slate-100 text-left">
              <th className="pb-2 text-xs text-slate-400 font-medium">Asset</th>
              <th className="pb-2 text-xs text-slate-400 font-medium">
                Asset ID
              </th>
              <th className="pb-2 text-xs text-slate-400 font-medium">
                Assigned To
              </th>
              <th className="pb-2 text-xs text-slate-400 font-medium">
                Department
              </th>
              <th className="pb-2 text-xs text-slate-400 font-medium">Date</th>
            </tr>
          </thead>

          <tbody>
            {assignedAssets.map((item, index) => {
              return (
                <tr
                  key={item.id}
                  className="border-b last:border-0 border-slate-50"
                >
                  <td className="py-2">
                    <div className="flex items-center gap-2">
                      <div className="h-9 w-11 overflow-hidden rounded-md bg-slate-50">
                        <img className="h-full w-full object-contain p-0.5" src={item.image} alt={item.asset} />
                      </div>

                      <span className="text-xs font-medium text-slate-700">
                        {item.asset}
                      </span>
                    </div>
                  </td>

                  <td className="text-[10px] text-slate-500">{item.id}</td>

                  <td>
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-semibold text-white ${
                          index % 2 === 0 ? "bg-purple-500" : "bg-green-500"
                        }`}
                      >
                        {item.assignedTo.charAt(0)}
                      </div>

                      <div>
                        <p className="text-xs text-slate-700 font-medium">
                          {item.assignedTo}
                        </p>
                        <p className="text-xs text-slate-400">
                          {item.employeeId}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td>
                    <span
                      className={`px-2 py-1 rounded-md text-xs font-medium ${
                        item.department === "HR"
                          ? "bg-purple-50 text-purple-600"
                          : item.department === "Technical"
                            ? "bg-teal-50 text-teal-600"
                            : "bg-blue-50 text-blue-600"
                      }`}
                    >
                      {item.department}
                    </span>
                  </td>

                  <td className="text-[10px] text-slate-500">{item.date}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AssetStatusOverview() {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4">
      <SectionHeader title="Asset Status Overview" />

      <div className="flex items-center gap-3">
        <div className="w-[130px] h-[130px] relative flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={37}
                outerRadius={62}
                paddingAngle={1}
                stroke="none"
              >
                {chartData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={chartColors[index]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-lg font-bold text-slate-700">2,146</span>
            <span className="text-xs text-slate-400">Total Assets</span>
          </div>
        </div>

        <div className="space-y-3 flex-1">
          {chartData.map((item, index) => (
            <div
              key={item.name}
              className="flex items-center justify-between gap-2"
            >
              <div className="flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{
                    backgroundColor: chartColors[index],
                  }}
                />

                <span className="text-xs text-slate-600">{item.name}</span>
              </div>

              <span className="text-[10px] text-slate-500">
                {item.value.toLocaleString()}{" "}
                {index === 0
                  ? "(75.6%)"
                  : index === 1
                    ? "(14.5%)"
                    : index === 2
                      ? "(4.6%)"
                      : index === 3
                        ? "(3.1%)"
                        : "(2.2%)"}
              </span>
            </div>
          ))}
        </div>
      </div>

      <button className="mt-4 text-xs font-semibold text-blue-600 flex items-center gap-1">
        View Detailed Report
        <span aria-hidden="true">&rarr;</span>
      </button>
    </div>
  );
}

function QuickActions() {
  const actions = [
    {
      title: "Assign New Asset",
      icon: Plus,
    },
    {
      title: "Workstation Bundles",
      icon: MonitorCog,
    },
    {
      title: "Shift Handover",
      icon: ArrowLeftRight,
    },
    {
      title: "Report Damage",
      icon: TriangleAlert,
    },
    {
      title: "Consumables",
      icon: Trash2,
    },
    {
      title: "View Reports",
      icon: BarChart3,
    },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4">
      <SectionHeader title="Quick Actions" />

      <div className="grid grid-cols-2 gap-2">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.title}
              className="h-[65px] border border-slate-100 rounded-lg flex flex-col items-center justify-center gap-2 hover:bg-slate-50 transition"
            >
              <Icon size={18} className="text-blue-500" />

              <span className="text-[10px] font-semibold text-slate-600 text-center">
                {action.title}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function RecentDamageReports() {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4">
      <SectionHeader title="Recent Damage Reports" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {damageReports.map((item) => {
          return (
            <div
              key={item.id}
              className="border border-slate-100 rounded-lg p-2.5 flex items-center gap-3"
            >
              <div className="h-12 w-14 flex-shrink-0 overflow-hidden rounded-md bg-slate-50">
                <img className="h-full w-full object-contain p-1" src={item.image} alt={item.asset} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-medium text-slate-700 truncate">
                    {item.asset}
                  </p>

                  <span
                    className={`text-xs px-2 py-1 rounded-md ${
                      item.severity === "Major"
                        ? "bg-red-50 text-red-500"
                        : "bg-orange-50 text-orange-500"
                    }`}
                  >
                    {item.severity}
                  </span>
                </div>

                <p className="mt-2 text-[10px] font-normal text-slate-500">
                  {item.id}
                </p>

                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-slate-500">{item.person}</span>

                  <span className="text-xs text-slate-400">{item.date}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <main className="p-3 sm:p-4">
        <div className="w-full space-y-4">
          {/* Date Filter */}
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                Inventory & Asset Management
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                Overview of all assets, consumables & assignments
              </p>
            </div>
            <div className="flex flex-col items-end gap-3">
              <Header />
              <button className="h-9 px-3 bg-white border border-slate-200 rounded-lg flex items-center gap-2 text-xs font-semibold text-slate-600">
                <CalendarDays size={14} />

                <span>May 20 - May 26, 2025</span>

                <ChevronDown size={13} />
              </button>
            </div>
          </div>

          {/* Statistics */}
          <DashboardStats />

          {/* Department + Low Stock */}
          <div className="grid grid-cols-1 xl:grid-cols-[1.35fr_1fr] gap-3">
            <DepartmentSummary />
            <LowStock />
          </div>

          {/* Assigned + Status + Actions */}
          <div className="grid grid-cols-1 xl:grid-cols-[1.6fr_0.8fr_0.7fr] gap-3">
            <RecentAssignedAssets />
            <AssetStatusOverview />
            <QuickActions />
          </div>

          {/* Damage Reports */}
          <RecentDamageReports />
        </div>
      </main>
    </div>
  );
}




