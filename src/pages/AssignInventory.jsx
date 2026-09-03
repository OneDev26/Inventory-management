import Header from "../components/Header";
import printerImage from "../assets/hp_laser_jet.png";
import cpuImage from "../assets/cpu.png";
import monitorImage from "../assets/monitor.png";
import keyboardImage from "../assets/keyboard.png";
import mouseImage from "../assets/mouse.png";
import dockingImage from "../assets/docking_station.png";
import headphoneImage from "../assets/headphone.png";
import React, { useMemo, useState } from "react";
import {
  CalendarDays,
  Check,
  ChevronDown,
  List,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";

const employees = [
  {
    id: "EMP-1087",
    name: "Rahul Sharma",
    department: "Operations",
    status: "Active",
    initials: "RS",
  },
  {
    id: "EMP-1042",
    name: "Priya Sharma",
    department: "HR",
    status: "Active",
    initials: "PS",
  },
];

const assets = [
  {
    id: "PRN-HR-0022",
    image: printerImage,
    name: "HP LaserJet Pro M404dw",
    category: "Printer",
    status: "Available",
  },
  {
    id: "CPU-OPS-0045",
    image: cpuImage,
    name: "Dell OptiPlex 7010",
    category: "CPU",
    status: "Available",
  },
  {
    id: "MON-OPS-0071",
    image: monitorImage,
    name: 'Dell 24" Monitor - P2422H',
    category: "Monitor",
    status: "Available",
  },
  {
    id: "KEY-OPS-0168",
    image: keyboardImage,
    name: "Logitech Keyboard K120",
    category: "Keyboard",
    status: "Available",
  },
  {
    id: "MOU-OPS-0148",
    image: mouseImage,
    name: "Logitech Mouse M100",
    category: "Mouse",
    status: "Available",
  },
  {
    id: "DOC-OPS-0032",
    image: dockingImage,
    name: "Dell Docking Station WD19S",
    category: "Docking Station",
    status: "Available",
  },
  {
    id: "HST-SALES-0010",
    image: headphoneImage,
    name: "Logitech Headset H111",
    category: "Headset",
    status: "Available",
  },
];

const bundles = [
  {
    id: "BND-OPS-001",
    name: "Operations Workstation Bundle",
    description: "CPU + 2 Monitors + Keyboard + Mouse",
    items: 5,
  },
  {
    id: "BND-HR-002",
    name: "HR Laptop Bundle",
    description: "Laptop + Dock + Monitor + Keyboard + Mouse",
    items: 5,
  },
];

const defaultSelected = [
  "CPU-OPS-0045",
  "MON-OPS-0071",
  "KEY-OPS-0168",
  "MOU-OPS-0148",
  "DOC-OPS-0032",
];

export default function AssignInventory() {
  const [employeeSearch, setEmployeeSearch] = useState("");
  const [employee, setEmployee] = useState(employees[0]);

  const [department, setDepartment] = useState("Operations");
  const [workstation, setWorkstation] = useState("OPS-WS-015");
  const [assignmentDate, setAssignmentDate] = useState("2024-05-12");

  const [activeTab, setActiveTab] = useState("assets");

  const [assetSearch, setAssetSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [availability, setAvailability] = useState("Available Only");

  const [selectedIds, setSelectedIds] = useState(defaultSelected);

  const [notes, setNotes] = useState("");
  const [returnDate, setReturnDate] = useState("");

  const filteredAssets = useMemo(() => {
    const q = assetSearch.trim().toLowerCase();

    return assets.filter((asset) => {
      const matchesSearch =
        !q ||
        asset.name.toLowerCase().includes(q) ||
        asset.id.toLowerCase().includes(q);

      const matchesCategory =
        category === "All Categories" || asset.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [assetSearch, category]);

  const selectedAssets = assets.filter((asset) =>
    selectedIds.includes(asset.id)
  );

  const toggleAsset = (assetId) => {
    setSelectedIds((current) =>
      current.includes(assetId)
        ? current.filter((id) => id !== assetId)
        : [...current, assetId]
    );
  };

  const removeSelected = (id) => {
    setSelectedIds((current) =>
      current.filter((assetId) => assetId !== id)
    );
  };

  const assignInventory = () => {
    const payload = {
      employee,
      department,
      workstation,
      assignmentDate,
      selectedAssets,
      notes,
      expectedReturnDate: returnDate,
    };

    console.log("Assign Inventory Payload:", payload);

    // Later:
    // await axios.post("/api/inventory/assign", payload);
  };

  return (
    <main className="min-h-screen bg-[#f8f9fc] px-4 py-5 font-['Geist',sans-serif] text-slate-900">
      {/* Header */}
      <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-[-0.02em]">
            Assign Inventory
          </h1>

          <p className="mt-1 text-xs text-slate-500">
            Select an employee and assign one or more assets or workstation
            bundles.
          </p>
        </div>

        <div className="flex flex-col items-end gap-3"><Header /><button className="flex h-9 items-center gap-2 rounded-md border border-violet-300 bg-white px-4 text-xs font-semibold text-violet-600 hover:bg-violet-50">
          <List size={14} />
          View Assignments
        </button></div>
      </div>

      {/* STEP 1 */}
      <section className="mb-4 rounded-xl border border-slate-200 bg-white p-4">
        <SectionHeading number="1" title="Assign To" />

        <div className="mt-4 grid grid-cols-4 gap-4">
          {/* Employee */}
          <div>
            <FieldLabel required>Employee</FieldLabel>

            <div className="relative">
              <div className="flex h-9 items-center rounded-md border border-slate-200 bg-white px-3">
                <input
                  value={employeeSearch}
                  onChange={(e) => setEmployeeSearch(e.target.value)}
                  placeholder="Search by name, employee ID..."
                  className="min-w-0 flex-1 bg-transparent text-xs outline-none placeholder:text-slate-400"
                />

                <Search size={13} className="text-slate-400" />
                <ChevronDown
                  size={12}
                  className="ml-2 text-slate-400"
                />
              </div>

              <div className="mt-1 flex h-[48px] items-center justify-between rounded-md border border-slate-200 bg-white px-3">
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

                <span className="flex items-center gap-1 text-[10px] font-medium text-emerald-600">
                  <i className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Active
                </span>
              </div>
            </div>
          </div>

          {/* Department */}
          <FormSelect
            label="Department"
            value={department}
            setValue={setDepartment}
            options={["Operations", "HR", "Finance", "Technical", "Admin"]}
          />

          {/* Workstation */}
          <FormSelect
            label="Work Location / Workstation"
            value={workstation}
            setValue={setWorkstation}
            options={[
              "OPS-WS-015",
              "OPS-WS-016",
              "HR-WS-003",
              "IT-WS-012",
            ]}
          />

          {/* Date */}
          <div>
            <FieldLabel>Date of Assignment</FieldLabel>

            <div className="relative">
              <CalendarDays
                size={13}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="date"
                value={assignmentDate}
                onChange={(e) => setAssignmentDate(e.target.value)}
                className="h-9 w-full rounded-md border border-slate-200 bg-white pl-9 pr-3 text-xs text-slate-700 outline-none focus:border-violet-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* MIDDLE */}
      <div className="grid grid-cols-[1.45fr_1fr] gap-4">
        {/* LEFT SIDE */}
        <div className="space-y-4">
          {/* STEP 2 */}
          <section className="rounded-xl border border-slate-200 bg-white p-4">
            <SectionHeading
              number="2"
              title="Select Assets / Bundles"
            />

            {/* Tabs */}
            <div className="mt-3 border-b border-slate-200">
              <div className="flex gap-6">
                <button
                  onClick={() => setActiveTab("assets")}
                  className={`border-b-2 px-2 pb-2 text-xs font-medium ${
                    activeTab === "assets"
                      ? "border-violet-600 text-violet-600"
                      : "border-transparent text-slate-500"
                  }`}
                >
                  Assets
                </button>

                <button
                  onClick={() => setActiveTab("bundles")}
                  className={`border-b-2 px-2 pb-2 text-xs font-medium ${
                    activeTab === "bundles"
                      ? "border-violet-600 text-violet-600"
                      : "border-transparent text-slate-500"
                  }`}
                >
                  Workstation Bundles
                </button>
              </div>
            </div>

            {activeTab === "assets" ? (
              <>
                {/* Asset Filters */}
                <div className="mt-3 grid grid-cols-[1.4fr_1fr_1fr_auto] gap-3">
                  <div className="flex h-9 items-center rounded-md border border-slate-200 px-3">
                    <input
                      value={assetSearch}
                      onChange={(e) => setAssetSearch(e.target.value)}
                      placeholder="Search assets by name or ID..."
                      className="min-w-0 flex-1 bg-transparent text-xs outline-none placeholder:text-slate-400"
                    />

                    <Search size={13} className="text-slate-400" />
                  </div>

                  <SimpleSelect
                    value={category}
                    setValue={setCategory}
                    options={[
                      "All Categories",
                      "CPU",
                      "Monitor",
                      "Keyboard",
                      "Mouse",
                      "Printer",
                      "Headset",
                      "Docking Station",
                    ]}
                  />

                  <SimpleSelect
                    value={availability}
                    setValue={setAvailability}
                    options={[
                      "Available Only",
                      "All Assets",
                    ]}
                  />

                  <button className="flex h-9 items-center justify-center gap-2 rounded-md border border-violet-200 px-4 text-xs font-medium text-violet-600 hover:bg-violet-50">
                    <SlidersHorizontal size={13} />
                    Filters
                  </button>
                </div>

                {/* Asset Table */}
                <div className="mt-3 max-h-[255px] overflow-y-auto rounded-md border border-slate-200">
                  <table className="w-full border-collapse">
                    <thead className="sticky top-0 z-10 bg-slate-50">
                      <tr>
                        <th className="w-[38px] border-b border-slate-200 px-3 py-2">
                          <input
                            type="checkbox"
                            className="accent-violet-600"
                            checked={
                              filteredAssets.length > 0 &&
                              filteredAssets.every((asset) =>
                                selectedIds.includes(asset.id)
                              )
                            }
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedIds((current) => [
                                  ...new Set([
                                    ...current,
                                    ...filteredAssets.map((asset) => asset.id),
                                  ]),
                                ]);
                              } else {
                                const visible = new Set(
                                  filteredAssets.map((asset) => asset.id)
                                );

                                setSelectedIds((current) =>
                                  current.filter((id) => !visible.has(id))
                                );
                              }
                            }}
                          />
                        </th>

                        <th className="border-b border-slate-200 px-2 py-2 text-left text-[10px] font-medium text-slate-500">
                          Asset
                        </th>

                        <th className="border-b border-slate-200 px-2 py-2 text-left text-[10px] font-medium text-slate-500">
                          Asset ID
                        </th>

                        <th className="border-b border-slate-200 px-2 py-2 text-left text-[10px] font-medium text-slate-500">
                          Category
                        </th>

                        <th className="border-b border-slate-200 px-2 py-2 text-left text-[10px] font-medium text-slate-500">
                          Status
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {filteredAssets.map((asset) => {
                        const selected = selectedIds.includes(asset.id);

                        return (
                          <tr
                            key={asset.id}
                            className={`border-b border-slate-100 last:border-b-0 ${
                              selected ? "bg-violet-50/30" : "hover:bg-slate-50"
                            }`}
                          >
                            <td className="px-3 py-2">
                              <input
                                type="checkbox"
                                checked={selected}
                                onChange={() => toggleAsset(asset.id)}
                                className="accent-violet-600"
                              />
                            </td>

                            <td className="px-2 py-2">
                              <div className="flex items-center gap-2">
                                <span className="h-9 w-11 shrink-0 overflow-hidden rounded bg-slate-50">
                                  <img className="h-full w-full object-contain p-0.5" src={asset.image} alt={asset.name} />
                                </span>

                                <span className="text-xs font-medium text-slate-700">
                                  {asset.name}
                                </span>
                              </div>
                            </td>

                            <td className="px-2 py-2 text-[10px] text-indigo-600">
                              {asset.id}
                            </td>

                            <td className="px-2 py-2 text-[10px] text-slate-600">
                              {asset.category}
                            </td>

                            <td className="px-2 py-2">
                              <span className="rounded bg-emerald-50 px-2 py-1 text-[10px] font-medium text-emerald-600">
                                {asset.status}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                <p className="mt-2 text-[10px] text-slate-500">
                  Showing 1 to 7 of 78 assets
                </p>
              </>
            ) : (
              <div className="mt-4 grid grid-cols-2 gap-3">
                {bundles.map((bundle) => (
                  <article
                    key={bundle.id}
                    className="rounded-lg border border-slate-200 p-4 hover:border-violet-300"
                  >
                    <h3 className="text-xs font-semibold">
                      {bundle.name}
                    </h3>

                    <p className="mt-2 text-[10px] text-slate-500">
                      {bundle.description}
                    </p>

                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-[10px] text-slate-500">
                        {bundle.items} Items
                      </span>

                      <button className="rounded-md bg-violet-600 px-3 py-2 text-[10px] font-medium text-white">
                        Select Bundle
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>

          {/* STEP 4 */}
          <section className="rounded-xl border border-slate-200 bg-white p-4">
            <SectionHeading
              number="4"
              title="Additional Details"
            />

            <div className="mt-4 grid grid-cols-[1.5fr_0.8fr] gap-4">
              <div>
                <FieldLabel>Notes (Optional)</FieldLabel>

                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add any notes or instructions for this assignment..."
                  className="min-h-[84px] w-full resize-none rounded-md border border-slate-200 px-3 py-3 text-xs outline-none placeholder:text-slate-400 focus:border-violet-300"
                />
              </div>

              <div>
                <FieldLabel>Expected Return Date (Optional)</FieldLabel>

                <div className="relative">
                  <CalendarDays
                    size={13}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="date"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    className="h-10 w-full rounded-md border border-slate-200 pl-9 pr-3 text-xs outline-none focus:border-violet-300"
                  />
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-4">
          {/* STEP 3 */}
          <section className="rounded-xl border border-slate-200 bg-white p-4">
            <SectionHeading
              number="3"
              title={`Selected Items (${selectedAssets.length})`}
            />

            <div className="mt-4 overflow-hidden rounded-lg border border-slate-200">
              {selectedAssets.length === 0 ? (
                <div className="grid min-h-[190px] place-items-center text-xs text-slate-400">
                  No assets selected
                </div>
              ) : (
                selectedAssets.map((asset) => (
                  <div
                    key={asset.id}
                    className="flex min-h-[57px] items-center justify-between border-b border-slate-100 px-3 last:border-b-0"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="h-10 w-12 shrink-0 overflow-hidden rounded bg-slate-50">
                        <img className="h-full w-full object-contain p-0.5" src={asset.image} alt={asset.name} />
                      </span>

                      <div className="min-w-0">
                        <p className="truncate text-xs font-medium text-slate-800">
                          {asset.name}
                        </p>

                        <p className="mt-0.5 text-[10px] text-slate-400">
                          {asset.id}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => removeSelected(asset.id)}
                      className="grid h-6 w-6 shrink-0 place-items-center rounded-full text-rose-500 hover:bg-rose-50"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))
              )}
            </div>

            <div className="mt-4 flex h-11 items-center justify-between rounded-md bg-gradient-to-r from-violet-50 to-indigo-50 px-4">
              <span className="text-xs font-medium text-slate-600">
                Total Items
              </span>

              <strong className="text-xs">
                {selectedAssets.length}
              </strong>
            </div>
          </section>

          {/* SUMMARY */}
          <section className="rounded-xl border border-slate-200 bg-white p-4">
            <h2 className="text-sm font-semibold">
              Summary
            </h2>

            <div className="mt-4 grid grid-cols-4 gap-3">
              <SummaryItem
                label="Employee"
                value={employee.name}
                subValue={`(${employee.id})`}
              />

              <SummaryItem
                label="Department"
                value={department}
              />

              <SummaryItem
                label="Workstation"
                value={workstation}
              />

              <SummaryItem
                label="Items"
                value={`${selectedAssets.length} Assets`}
              />
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <button className="h-10 rounded-md border border-slate-300 bg-white text-xs font-medium text-slate-700 hover:bg-slate-50">
                Cancel
              </button>

              <button
                onClick={assignInventory}
                disabled={selectedAssets.length === 0}
                className="flex h-10 items-center justify-center gap-2 rounded-md bg-gradient-to-r from-violet-600 to-indigo-600 text-xs font-medium text-white shadow-sm hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Check size={14} />
                Assign Inventory
              </button>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

/* ----------------- SMALL COMPONENTS ----------------- */

function SectionHeading({ number, title }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="grid h-6 w-6 place-items-center rounded-full bg-violet-600 text-xs font-semibold text-white">
        {number}
      </span>

      <h2 className="text-sm font-semibold text-slate-800">
        {title}
      </h2>
    </div>
  );
}

function FieldLabel({ children, required }) {
  return (
    <label className="mb-1.5 block text-xs font-medium text-slate-600">
      {children}

      {required && (
        <span className="ml-0.5 text-rose-500">
          *
        </span>
      )}
    </label>
  );
}

function FormSelect({
  label,
  value,
  setValue,
  options,
}) {
  return (
    <div>
      <FieldLabel>{label}</FieldLabel>

      <div className="relative">
        <select
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="h-9 w-full appearance-none rounded-md border border-slate-200 bg-white px-3 pr-8 text-xs text-slate-700 outline-none focus:border-violet-300"
        >
          {options.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>

        <ChevronDown
          size={12}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
        />
      </div>
    </div>
  );
}

function SimpleSelect({
  value,
  setValue,
  options,
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="h-9 w-full appearance-none rounded-md border border-slate-200 bg-white px-3 pr-8 text-xs text-slate-700 outline-none focus:border-violet-300"
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>

      <ChevronDown
        size={12}
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
      />
    </div>
  );
}

function Avatar({ initials }) {
  return (
    <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gradient-to-br from-slate-700 to-slate-500 text-[10px] font-semibold text-white">
      {initials}
    </div>
  );
}

function SummaryItem({
  label,
  value,
  subValue,
}) {
  return (
    <div>
      <p className="text-[10px] text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-xs font-medium text-slate-700">
        {value}
      </p>

      {subValue && (
        <p className="mt-0.5 text-[10px] text-slate-500">
          {subValue}
        </p>
      )}
    </div>
  );
}
