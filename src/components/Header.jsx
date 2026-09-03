const SearchIcon = () => <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg>
const BellIcon = () => <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/></svg>

function Header() {
  return <div className="flex flex-wrap items-center justify-end gap-3" aria-label="Page controls">
    <label className="flex h-9 w-[280px] max-w-full items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-slate-400 shadow-sm"><SearchIcon /><input className="w-full bg-transparent text-sm font-medium outline-none placeholder:text-slate-400" placeholder="Search assets, employees, IDs..." /></label>
    <button className="relative rounded-lg p-2 text-slate-600 hover:bg-white" aria-label="Notifications"><BellIcon /><span className="absolute right-0 top-0 grid h-3.5 w-3.5 place-items-center rounded-full bg-red-500 text-[9px] font-bold text-white">8</span></button>
    <div className="flex items-center gap-2 border-l border-slate-200 pl-3"><div className="grid h-8 w-8 place-items-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600">IA</div><div className="hidden text-left sm:block"><p className="text-sm font-semibold text-slate-900">Inventory Admin</p><p className="text-xs text-slate-500">Administrator</p></div><span className="text-slate-500">⌄</span></div>
  </div>
}
export default Header

