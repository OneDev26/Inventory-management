import { NavLink } from 'react-router-dom'
import logo from '../assets/Survill_logo.png'

const Icon = ({ children }) => (
  <svg
    className="h-5 w-5 shrink-0"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {children}
  </svg>
);

const icons = {
  home: (
    <Icon>
      <path d="m3 11 9-8 9 8" />
      <path d="M5 10v10h5v-6h4v6h5V10" />
    </Icon>
  ),
  assets: (
    <Icon>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M8 8h3v3H8zM15 8h1M15 12h1M8 15h1M12 15h4" />
    </Icon>
  ),
  assign: (
    <Icon>
      <path d="M5 7h10l1 12H4L5 7Z" />
      <path d="m15 10 5 3-5 3v-2h-3v-2h3v-2Z" />
    </Icon>
  ),
  box: (
    <Icon>
      <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" />
      <path d="m4.5 7.5 7.5 4.2 7.5-4.2M12 21v-9.3" />
    </Icon>
  ),
  user: (
    <Icon>
      <circle cx="12" cy="7" r="4" />
      <path d="M4.5 21a7.5 7.5 0 0 1 15 0Z" />
    </Icon>
  ),
  transfer: (
    <Icon>
      <path d="M4 7h14M15 4l3 3-3 3M20 17H6M9 14l-3 3 3 3" />
    </Icon>
  ),
  repair: (
    <Icon>
      <circle cx="12" cy="13" r="7" />
      <path d="M12 10v3l2 1M8 3h8M12 3v3" />
    </Icon>
  ),
  cup: (
    <Icon>
      <path d="M6 3h12v5a6 6 0 0 1-12 0V3ZM8 21h8M12 14v7" />
    </Icon>
  ),
  chart: (
    <Icon>
      <path d="M5 3h14v18H5zM8 16v-3M12 16V8M16 16v-5" />
    </Icon>
  ),
  gear: (
    <Icon>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2" />
    </Icon>
  ),
};

const routes = { 'Dashboard': '/', 'All Assets': '/assets', 'Assign Inventory': '/inventory/assign', 'Workstation Bundles': '/inventory/bundles', 'Employee Assignments': '/inventory/employees', 'Asset Transfers': '/inventory/transfers', 'Repairs & Clearance': '/inventory/repairs', 'Consumables': '/consumables', 'Stock usage': '/consumables/stock-usage', 'Low Stock Consumables': '/consumables/low-stock', 'Reports': '/reports', 'Settings': '/settings' }

const sections = [
  ["Main", [["Dashboard", "home"]]],
  [
    "Inventory",
    [
      ["All Assets", "assets"],
      ["Assign Inventory", "assign"],
      ["Workstation Bundles", "box"],
      ["Employee Assignments", "user"],
      ["Asset Transfers", "transfer"],
      ["Repairs & Clearance", "repair"],
    ],
  ],
  ["Consumables", [["Consumables", "cup"], ["Stock usage", "chart"], ["Low Stock Consumables", "repair"]]],
  ["Reports", [["Reports", "chart"]]],
  ["Settings", [["Settings", "gear"]]],
];

function Sidebar() {
  return (
    <aside className="sticky top-0 flex h-screen min-h-screen w-72 shrink-0 flex-col border-r border-white/5 bg-[#0b1729] px-4 py-6 text-slate-300 shadow-2xl shadow-slate-950/20">
      <div className="mb-8 px-3">
        <div className="flex h-15 w-full items-center overflow-hidden rounded-xl bg-transparent px-1">
          <img
            className="h-auto w-full max-w-[220px] object-contain object-left"
            src={logo}
            alt="Survill Technologies"
          />
        </div>
      </div>
      <nav className="flex-1 space-y-5" aria-label="Main navigation">
        {sections.map(([section, items]) => (
          <div key={section}>
            <p className="mb-2 px-3 text-[10px] font-normal uppercase tracking-[0.18em] text-slate-500">
              {section}
            </p>
            <div className="space-y-1">
              {items.map(([label, icon]) => (
                <NavLink
                  key={label}
                  to={routes[label]}
                  end={label === "Consumables"}
                  className={({ isActive }) => `group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${isActive ? "bg-indigo-600 text-white shadow-lg shadow-indigo-950/30" : "text-slate-400 hover:bg-white/5 hover:text-white"}`}
                >
                  {({ isActive }) => <><span className={isActive ? "text-indigo-100" : "text-slate-500 group-hover:text-slate-300"}>{icons[icon]}</span><span>{label}</span></>}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>
      <button className="mt-8 flex w-full items-center gap-3 rounded-xl border border-white/5 bg-[#101f34] p-3 text-left shadow-lg shadow-slate-950/20 transition-colors hover:bg-[#142640]">
        <span className="relative grid h-10 w-10 shrink-0 place-items-center rounded-full bg-indigo-500/15 text-sm font-bold text-indigo-200 ring-1 ring-indigo-400/30">
          IA
          <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-[#101f34] bg-emerald-400" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-semibold text-white">
            Inventory Admin
          </span>
          <span className="block text-xs text-slate-500">Administrator</span>
        </span>
        <span className="text-slate-500">›</span>
      </button>
    </aside>
  );
}

export default Sidebar;











