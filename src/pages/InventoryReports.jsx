import React, { useEffect, useMemo, useState } from "react";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { reportGenerated, selectGeneratedReports } from "../store/reportsSlice";
import {
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Download,
  FileText,
  Info,
  MoreVertical,
  PieChart,
  Plus,
  Search,
  X,
} from "lucide-react";

const summaryCards = [
  {
    title: "Total Reports",
    value: "32",
    subtitle: "All time",
    icon: FileText,
    iconClass: "bg-violet-50 text-violet-600",
  },
  {
    title: "Generated This Month",
    value: "8",
    subtitle: "May 2024",
    icon: CheckCircle2,
    iconClass: "bg-emerald-50 text-emerald-600",
  },
  {
    title: "Scheduled Reports",
    value: "6",
    subtitle: "Auto generated",
    icon: Clock3,
    iconClass: "bg-orange-50 text-orange-500",
  },
  {
    title: "Downloads This Month",
    value: "24",
    subtitle: "Reports downloaded",
    icon: Download,
    iconClass: "bg-blue-50 text-blue-600",
  },
  {
    title: "Most Used Report",
    value: "Stock Summary",
    subtitle: "12 times this month",
    icon: PieChart,
    iconClass: "bg-violet-50 text-violet-600",
  },
];

const reportsData = [
  {
    id: 1,
    name: "Stock Summary Report",
    type: "Inventory",
    description: "Summary of current stock levels for all items",
    generatedBy: "Inventory Admin",
    date: "31 May 2024",
    time: "10:30 AM",
    format: "PDF",
    status: "Completed",
    iconClass: "bg-violet-50 text-violet-600",
  },
  {
    id: 2,
    name: "Low Stock Report",
    type: "Inventory",
    description: "Items that are running low and need restocking",
    generatedBy: "Inventory Admin",
    date: "31 May 2024",
    time: "09:15 AM",
    format: "Excel",
    status: "Completed",
    iconClass: "bg-emerald-50 text-emerald-600",
  },
  {
    id: 3,
    name: "Stock Usage Report",
    type: "Usage",
    description: "Detailed usage of consumable items",
    generatedBy: "Inventory Admin",
    date: "30 May 2024",
    time: "06:45 PM",
    format: "PDF",
    status: "Completed",
    iconClass: "bg-orange-50 text-orange-500",
  },
  {
    id: 4,
    name: "Department-wise Consumption",
    type: "Usage",
    description: "Consumable usage by departments",
    generatedBy: "Inventory Admin",
    date: "30 May 2024",
    time: "04:20 PM",
    format: "Excel",
    status: "Completed",
    iconClass: "bg-blue-50 text-blue-600",
  },
  {
    id: 5,
    name: "Asset Assignment Report",
    type: "Assignment",
    description: "Assets assigned to employees and departments",
    generatedBy: "Inventory Admin",
    date: "29 May 2024",
    time: "11:10 AM",
    format: "PDF",
    status: "Completed",
    iconClass: "bg-pink-50 text-pink-500",
  },
  {
    id: 6,
    name: "Asset Transfer Report",
    type: "Transfer",
    description: "History of all asset transfers",
    generatedBy: "Inventory Admin",
    date: "28 May 2024",
    time: "05:05 PM",
    format: "Excel",
    status: "Completed",
    iconClass: "bg-cyan-50 text-cyan-600",
  },
  {
    id: 7,
    name: "Repairs & Clearance Report",
    type: "Maintenance",
    description: "Repairs, maintenance and clearance details",
    generatedBy: "Inventory Admin",
    date: "28 May 2024",
    time: "02:30 PM",
    format: "PDF",
    status: "Completed",
    iconClass: "bg-orange-50 text-orange-500",
  },
  {
    id: 8,
    name: "Workstation Bundle Report",
    type: "Bundle",
    description: "Workstation bundles and included assets",
    generatedBy: "Inventory Admin",
    date: "27 May 2024",
    time: "10:00 AM",
    format: "Excel",
    status: "Completed",
    iconClass: "bg-violet-50 text-violet-600",
  },
];

const reportTypes = [
  "All Report Types",
  "Inventory",
  "Usage",
  "Assignment",
  "Transfer",
  "Maintenance",
  "Bundle",
];

const departments = [
  "All Departments",
  "Operations",
  "HR",
  "Finance",
  "IT",
  "Sales",
];

const locations = [
  "All Locations",
  "Main Office",
  "Pantry",
  "Warehouse",
  "Operations Floor",
  "HR Office",
];

export default function InventoryReports() {
  const dispatch = useDispatch();
  const generatedReports = useSelector(selectGeneratedReports);
  const [reportType, setReportType] = useState("All Report Types");
  const [department, setDepartment] = useState("All Departments");
  const [location, setLocation] = useState("All Locations");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [modalMounted, setModalMounted] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const openReportModal = () => {
    setModalMounted(true);
    requestAnimationFrame(() => requestAnimationFrame(() => setModalVisible(true)));
  };
  const closeReportModal = () => {
    setModalVisible(false);
    window.setTimeout(() => setModalMounted(false), 240);
  };
  useEffect(() => {
    if (!modalMounted) return undefined;
    const handleKeyDown = (event) => event.key === "Escape" && closeReportModal();
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [modalMounted]);

  const filteredReports = useMemo(() => {
    const q = search.trim().toLowerCase();

    return [...generatedReports, ...reportsData].filter((report) => {
      const matchesSearch =
        !q ||
        report.name.toLowerCase().includes(q) ||
        report.description.toLowerCase().includes(q) ||
        report.type.toLowerCase().includes(q);

      const matchesType =
        reportType === "All Report Types" ||
        report.type === reportType;

      // demo fields are not connected to rows yet
      const matchesDepartment =
        department === "All Departments" || true;

      const matchesLocation =
        location === "All Locations" || true;

      return (
        matchesSearch &&
        matchesType &&
        matchesDepartment &&
        matchesLocation
      );
    });
  }, [search, reportType, department, location, generatedReports]);

  const handleDownload = (report) => {
    console.log("Download report:", report);

    // Later:
    // window.open(report.downloadUrl, "_blank");
  };

  return (
    <main className="min-h-screen bg-[#f8f9fc] px-4 py-5 font-['Geist',sans-serif] text-slate-900">
      {modalMounted && <GenerateReportModal visible={modalVisible} onClose={closeReportModal} onGenerate={(report) => dispatch(reportGenerated(report))} />}

      {/* HEADER */}
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-[-0.02em] text-slate-900">Reports</h1>
          <p className="mt-1 text-sm font-normal text-slate-500">View, filter and generate inventory and usage reports.</p>
        </div>
        <div className="flex flex-col items-end gap-3">
          <Header />
          <button type="button" onClick={openReportModal} className="flex h-10 items-center gap-2 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 px-5 text-sm font-semibold text-white shadow-sm transition hover:brightness-95">
            <Plus size={16} />
            Generate New Report
          </button>
        </div>
      </div>

      {/* KPI CARDS */}
      <section className="mb-5 grid grid-cols-5 gap-3">
        {summaryCards.map((card) => {
          const Icon = card.icon;

          return (
            <article
              key={card.title}
              className="flex min-h-[100px] items-center gap-4 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-[0_2px_8px_rgba(15,23,42,0.025)]"
            >
              <span
                className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${card.iconClass}`}
              >
                <Icon size={20} />
              </span>

              <div className="min-w-0">
                <p className="text-xs font-semibold text-slate-600">
                  {card.title}
                </p>

                <h3
                  className={`mt-1 font-bold leading-none ${
                    card.title === "Most Used Report"
                      ? "truncate text-lg"
                      : "text-2xl"
                  }`}
                >
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
      <section className="mb-4 grid grid-cols-[1.15fr_1fr_1fr_1fr_1.15fr] gap-3">
        <div className="flex h-10 items-center gap-2 rounded-md border border-slate-200 bg-white px-3">
          <CalendarDays size={13} className="text-slate-400" />

          <span className="text-sm font-medium text-slate-700">
            01 May 2024 - 31 May 2024
          </span>
        </div>

        <FilterSelect
          value={reportType}
          setValue={setReportType}
          options={reportTypes}
        />

        <FilterSelect
          value={department}
          setValue={setDepartment}
          options={departments}
        />

        <FilterSelect
          value={location}
          setValue={setLocation}
          options={locations}
        />

        <div className="flex h-10 items-center gap-2 rounded-md border border-slate-200 bg-white px-3">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search reports..."
            className="min-w-0 flex-1 bg-transparent text-sm font-medium outline-none placeholder:text-slate-400"
          />

          <Search size={13} className="text-slate-400" />
        </div>
      </section>

      {/* REPORT TABLE */}
      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1100px] border-collapse">
            <thead>
              <tr className="bg-slate-50/80">
                {[
                  "Report Name",
                  "Type",
                  "Description",
                  "Generated By",
                  "Generated On",
                  "Format",
                  "Status",
                  "Actions",
                ].map((heading) => (
                  <th
                    key={heading}
                    className="border-b border-slate-200 px-4 py-3.5 text-left text-xs font-semibold text-slate-600"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {filteredReports.map((report) => (
                <tr
                  key={report.id}
                  className="border-b border-slate-100 last:border-b-0 transition hover:bg-slate-50/60"
                >
                  {/* REPORT NAME */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <span
                        className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg ${report.iconClass}`}
                      >
                        <FileText size={16} />
                      </span>

                      <span className="text-sm font-semibold text-slate-800">
                        {report.name}
                      </span>
                    </div>
                  </td>

                  {/* TYPE */}
                  <td className="px-4 py-3">
                    <ReportType type={report.type} />
                  </td>

                  {/* DESCRIPTION */}
                  <td className="max-w-[230px] px-4 py-3">
                    <p className="text-sm font-normal leading-5 text-slate-600">
                      {report.description}
                    </p>
                  </td>

                  {/* GENERATED BY */}
                  <td className="px-4 py-3 text-xs font-medium text-slate-600">
                    {report.generatedBy}
                  </td>

                  {/* GENERATED ON */}
                  <td className="px-4 py-3">
                    <p className="text-xs font-medium text-slate-600">
                      {report.date}
                    </p>

                    <p className="mt-0.5 text-xs font-normal text-slate-400">
                      {report.time}
                    </p>
                  </td>

                  {/* FORMAT */}
                  <td className="px-4 py-3">
                    <FormatBadge format={report.format} />
                  </td>

                  {/* STATUS */}
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1.5 rounded-md bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-600">
                      <CheckCircle2 size={10} />
                      {report.status}
                    </span>
                  </td>

                  {/* ACTIONS */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleDownload(report)}
                        title="Download Report"
                        className="grid h-8 w-8 place-items-center rounded-md border border-slate-200 text-violet-600 transition hover:border-violet-200 hover:bg-violet-50"
                      >
                        <Download size={13} />
                      </button>

                      <button
                        type="button"
                        title="More Options"
                        className="grid h-8 w-8 place-items-center rounded-md border border-slate-200 text-slate-500 transition hover:bg-slate-50"
                      >
                        <MoreVertical size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredReports.length === 0 && (
                <tr>
                  <td
                    colSpan={8}
                    className="py-14 text-center text-sm text-slate-400"
                  >
                    No reports found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="flex min-h-[62px] items-center justify-between border-t border-slate-100 px-4">
          <p className="text-xs font-normal text-slate-500">
            Showing 1 to 8 of 32 reports
          </p>

          <div className="flex items-center gap-1.5">
            <PageButton
              onClick={() =>
                setPage((current) => Math.max(1, current - 1))
              }
            >
              <ChevronLeft size={12} />
            </PageButton>

            {[1, 2, 3, 4].map((number) => (
              <PageButton
                key={number}
                active={page === number}
                onClick={() => setPage(number)}
              >
                {number}
              </PageButton>
            ))}

            <PageButton
              onClick={() =>
                setPage((current) => Math.min(4, current + 1))
              }
            >
              <ChevronRight size={12} />
            </PageButton>
          </div>
        </div>
      </section>
    </main>
  );
}

function GenerateReportModal({ visible, onClose, onGenerate }) {
  const fieldClass = "h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-100";
  return (
    <div onMouseDown={(event) => event.target === event.currentTarget && onClose()} className={"fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 p-4 backdrop-blur-[1px] transition-opacity duration-200 " + (visible ? "opacity-100" : "opacity-0")}>
      <section role="dialog" aria-modal="true" aria-labelledby="generate-report-title" className={"flex max-h-[calc(100vh-32px)] w-full max-w-[700px] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl transition-all duration-200 ease-out " + (visible ? "translate-y-0 scale-100 opacity-100" : "translate-y-5 scale-[0.96] opacity-0")}>
        <header className="flex items-start justify-between border-b border-slate-200 px-6 py-5"><div><h2 id="generate-report-title" className="text-xl font-bold text-slate-900">Generate New Report</h2><p className="mt-1 text-sm text-slate-500">Configure your report settings and generate a customized report.</p></div><button type="button" onClick={onClose} aria-label="Close" className="grid h-8 w-8 place-items-center rounded-md border border-slate-200 text-slate-500 hover:bg-slate-50"><X size={17} /></button></header>
        <form onSubmit={(event) => { event.preventDefault(); const data = new FormData(event.currentTarget); const selectedType = data.get("reportType"); const customTitle = data.get("title")?.trim(); onGenerate({ name: customTitle || selectedType + " Report", type: selectedType.includes("Usage") || selectedType.includes("Consumption") ? "Usage" : "Inventory", description: "Generated " + selectedType.toLowerCase() + " report", format: data.get("format"), iconClass: "bg-violet-50 text-violet-600" }); onClose(); }} className="flex min-h-0 flex-1 flex-col">
          <div className="min-h-0 flex-1 overflow-y-auto px-6">
            <ReportModalStep number="1" title="Report Type"><ReportModalField label="Report Type" required><select name="reportType" required defaultValue="" className={fieldClass}><option value="" disabled>Select report type</option><option>Stock Summary</option><option>Low Stock</option><option>Stock Usage</option><option>Department-wise Consumption</option><option>Asset Assignment</option><option>Asset Transfer</option><option>Repairs & Clearance</option><option>Workstation Bundle</option></select></ReportModalField><div className="mt-3 flex items-center gap-2 rounded-md border border-violet-200 bg-violet-50/70 px-3 py-2.5 text-xs font-medium text-slate-600"><Info size={15} className="shrink-0 text-violet-600" />Each report type provides different insights about your inventory and usage data.</div></ReportModalStep>
            <ReportModalStep number="2" title="Filters"><div className="grid gap-4 sm:grid-cols-2">
              <ReportModalField label="Date Range" required><div className="relative"><input required defaultValue="01 May 2024 - 31 May 2024" className={fieldClass + " pl-9"} /><CalendarDays size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /></div></ReportModalField>
              <ReportModalField label="Compare With (Optional)"><select defaultValue="" className={fieldClass}><option value="" disabled>Select comparison period</option><option>Previous period</option><option>Previous month</option><option>Previous year</option></select></ReportModalField>
              <ReportModalField label="Department"><select className={fieldClass}><option>All Departments</option><option>Operations</option><option>HR</option><option>Finance</option><option>IT</option><option>Sales</option></select></ReportModalField>
              <ReportModalField label="Location"><select className={fieldClass}><option>All Locations</option><option>Main Office</option><option>Pantry</option><option>Warehouse</option></select></ReportModalField>
              <ReportModalField label="Category"><select className={fieldClass}><option>All Categories</option><option>Inventory</option><option>Usage</option><option>Assignment</option><option>Maintenance</option></select></ReportModalField>
              <ReportModalField label="Status"><select className={fieldClass}><option>All Statuses</option><option>Completed</option><option>Pending</option></select></ReportModalField>
              <button type="button" className="flex h-10 w-fit items-center gap-2 rounded-md border border-violet-300 px-4 text-sm font-semibold text-violet-600 hover:bg-violet-50"><Plus size={14} />Add Filter</button>
            </div></ReportModalStep>
            <ReportModalStep number="3" title="Report Settings" last><div className="grid gap-4 sm:grid-cols-2">
              <ReportModalField label="Output Format" required><div className="grid grid-cols-3 gap-2"><FormatChoice name="format" label="PDF" defaultChecked /><FormatChoice name="format" label="Excel" /><FormatChoice name="format" label="CSV" /></div></ReportModalField>
              <ReportModalField label="Report Title (Optional)"><input name="title" maxLength={100} placeholder="Enter custom report title" className={fieldClass} /><p className="mt-1 text-right text-[11px] text-slate-400">0/100</p></ReportModalField>
              <div className="sm:col-span-2"><p className="mb-2 text-xs font-semibold text-slate-600">Include in Report</p><div className="grid gap-2 sm:grid-cols-2"><CheckOption label="Summary Overview" /><CheckOption label="Charts & Graphs" /><CheckOption label="Detailed Data" /><CheckOption label="Notes & Comments" /></div></div>
            </div></ReportModalStep>
          </div>
          <footer className="flex justify-end gap-3 border-t border-slate-200 px-6 py-4"><button type="button" onClick={onClose} className="h-10 rounded-md border border-slate-200 px-6 text-sm font-semibold text-slate-700 hover:bg-slate-50">Cancel</button><button type="submit" className="flex h-10 items-center gap-2 rounded-md bg-gradient-to-r from-violet-600 to-indigo-600 px-6 text-sm font-semibold text-white hover:brightness-95"><Download size={15} />Generate Report</button></footer>
        </form>
      </section>
    </div>
  );
}
function ReportModalStep({ number, title, children, last = false }) {
  return <section className={"py-5 " + (last ? "" : "border-b border-slate-200")}><div className="mb-4 flex items-center gap-2"><span className="grid h-5 w-5 place-items-center rounded-full bg-violet-600 text-[11px] font-bold text-white">{number}</span><h3 className="text-sm font-bold text-slate-900">{title}</h3></div>{children}</section>;
}
function ReportModalField({ label, required = false, children }) {
  return <label className="block"><span className="mb-1.5 block text-xs font-semibold text-slate-600">{label}{required && <span className="text-rose-500"> *</span>}</span>{children}</label>;
}
function FormatChoice({ name, label, defaultChecked = false }) {
  return <label className="cursor-pointer"><input type="radio" name={name} defaultChecked={defaultChecked} className="peer sr-only" /><span className="flex h-10 items-center justify-center gap-2 rounded-md border border-slate-200 text-xs font-semibold text-slate-600 transition peer-checked:border-violet-500 peer-checked:bg-violet-50 peer-checked:text-violet-600"><FileText size={14} />{label}</span></label>;
}
function CheckOption({ label }) {
  return <label className="flex cursor-pointer items-center gap-2 text-xs font-medium text-slate-700"><input type="checkbox" defaultChecked className="h-4 w-4 accent-violet-600" />{label}</label>;
}function FilterSelect({
  value,
  setValue,
  options,
}) {
  return (
    <select
      value={value}
      onChange={(e) => setValue(e.target.value)}
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

function ReportType({ type }) {
  const styles = {
    Inventory: "bg-violet-50 text-violet-600",
    Usage: "bg-blue-50 text-blue-600",
    Assignment: "bg-purple-50 text-purple-600",
    Transfer: "bg-cyan-50 text-cyan-600",
    Maintenance: "bg-orange-50 text-orange-600",
    Bundle: "bg-violet-50 text-violet-600",
  };

  return (
    <span
      className={`inline-flex rounded-md px-2.5 py-1 text-xs font-medium ${
        styles[type] || "bg-slate-100 text-slate-600"
      }`}
    >
      {type}
    </span>
  );
}

function FormatBadge({ format }) {
  if (format === "PDF") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-md bg-rose-50 px-2.5 py-1 text-xs font-medium text-rose-600">
        <FileText size={10} />
        PDF
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 rounded-md bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-600">
      <FileText size={10} />
      Excel
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


