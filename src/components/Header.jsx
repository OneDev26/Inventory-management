import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allNotificationsMarkedRead, notificationMarkedRead, selectNotifications, selectUnreadNotificationCount } from "../store/notificationsSlice";
import { Check, CheckCheck, ChevronDown, LogOut, Package, Settings, TriangleAlert, UserRound, Wrench } from "lucide-react";

const SearchIcon = () => <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg>;
const notificationStyles = {
  warning: { icon: TriangleAlert, color: "bg-amber-50 text-amber-600" },
  repair: { icon: Wrench, color: "bg-violet-50 text-violet-600" },
  asset: { icon: Package, color: "bg-blue-50 text-blue-600" },
  success: { icon: Check, color: "bg-emerald-50 text-emerald-600" },
};

const BellIcon = () => <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/></svg>;

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const notifications = useSelector(selectNotifications);
  const unreadCount = useSelector(selectUnreadNotificationCount);
  const [profileMounted, setProfileMounted] = useState(false);
  const [profileVisible, setProfileVisible] = useState(false);
  const profileRef = useRef(null);
  const notificationRef = useRef(null);
  const closeTimerRef = useRef(null);
  const notificationTimerRef = useRef(null);
  const [notificationMounted, setNotificationMounted] = useState(false);
  const [notificationVisible, setNotificationVisible] = useState(false);

  const openNotifications = () => {
    if (profileMounted) closeProfile();
    window.clearTimeout(notificationTimerRef.current);
    setNotificationMounted(true);
    requestAnimationFrame(() => requestAnimationFrame(() => setNotificationVisible(true)));
  };
  const closeNotifications = () => {
    setNotificationVisible(false);
    window.clearTimeout(notificationTimerRef.current);
    notificationTimerRef.current = window.setTimeout(() => setNotificationMounted(false), 180);
  };
  const toggleNotifications = () => notificationMounted && notificationVisible ? closeNotifications() : openNotifications();
  const markRead = (id) => dispatch(notificationMarkedRead(id));
  const markAllRead = () => dispatch(allNotificationsMarkedRead());

  const openProfile = () => {
    if (notificationMounted) closeNotifications();
    window.clearTimeout(closeTimerRef.current);
    setProfileMounted(true);
    requestAnimationFrame(() => requestAnimationFrame(() => setProfileVisible(true)));
  };

  const closeProfile = () => {
    setProfileVisible(false);
    window.clearTimeout(closeTimerRef.current);
    closeTimerRef.current = window.setTimeout(() => setProfileMounted(false), 180);
  };

  const toggleProfile = () => {
    if (profileMounted && profileVisible) closeProfile();
    else openProfile();
  };

  useEffect(() => {
    if (!profileMounted) return undefined;

    const handlePointerDown = (event) => {
      if (!profileRef.current?.contains(event.target)) closeProfile();
    };
    const handleKeyDown = (event) => {
      if (event.key === "Escape") closeProfile();
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [profileMounted]);

  useEffect(() => {
    if (!notificationMounted) return undefined;
    const handlePointerDown = (event) => { if (!notificationRef.current?.contains(event.target)) closeNotifications(); };
    const handleKeyDown = (event) => { if (event.key === "Escape") closeNotifications(); };
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => { document.removeEventListener("mousedown", handlePointerDown); document.removeEventListener("keydown", handleKeyDown); };
  }, [notificationMounted]);

  useEffect(() => () => { window.clearTimeout(closeTimerRef.current); window.clearTimeout(notificationTimerRef.current); }, []);

  return (
    <div className="flex flex-wrap items-center justify-end gap-3 font-['Geist',sans-serif]" aria-label="Page controls">
      <label className="flex h-9 w-[280px] max-w-full items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-slate-400 shadow-sm">
        <SearchIcon />
        <input className="w-full bg-transparent text-sm font-medium outline-none placeholder:text-slate-400" placeholder="Search assets, employees, IDs..." />
      </label>

      <div ref={notificationRef} className="relative">
        <button type="button" onClick={toggleNotifications} aria-haspopup="menu" aria-expanded={notificationVisible} className={`relative rounded-lg p-2 text-slate-600 transition hover:bg-white ${notificationVisible ? "bg-white text-violet-600" : ""}`} aria-label="Notifications"><BellIcon />{unreadCount > 0 && <span className="absolute right-0 top-0 grid h-4 min-w-4 place-items-center rounded-full bg-red-500 px-1 text-[9px] font-bold text-white">{unreadCount}</span>}</button>
        {notificationMounted && <div role="menu" className={`absolute right-0 top-[calc(100%+10px)] z-50 w-[360px] max-w-[calc(100vw-24px)] origin-top-right overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl transition-all duration-200 ease-out ${notificationVisible ? "translate-y-0 scale-100 opacity-100" : "-translate-y-2 scale-[0.97] opacity-0"}`}>
          <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3"><div><h2 className="text-sm font-semibold text-slate-900">Notifications</h2><p className="mt-0.5 text-[10px] text-slate-500">{unreadCount ? `${unreadCount} unread notifications` : "You are all caught up"}</p></div>{unreadCount > 0 && <button type="button" onClick={markAllRead} className="flex items-center gap-1.5 text-xs font-semibold text-violet-600"><CheckCheck size={14}/>Mark all read</button>}</div>
          <div className="max-h-[360px] overflow-y-auto">{notifications.map(({ id, title, message, time, type, unread }) => { const { icon: Icon, color } = notificationStyles[type] ?? notificationStyles.asset; return <button key={id} type="button" onClick={() => markRead(id)} className={`flex w-full gap-3 border-b border-slate-100 px-4 py-3 text-left transition last:border-0 hover:bg-slate-50 ${unread ? "bg-violet-50/35" : "bg-white"}`}><span className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg ${color}`}><Icon size={16}/></span><span className="min-w-0 flex-1"><span className="flex justify-between gap-3"><span className="text-xs font-semibold text-slate-800">{title}</span>{unread && <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-violet-600"/>}</span><span className="mt-1 block text-[11px] leading-4 text-slate-500">{message}</span><span className="mt-1.5 block text-[10px] font-medium text-slate-400">{time}</span></span></button>; })}</div>
        </div>}
      </div>

      <div ref={profileRef} className="relative border-l border-slate-200 pl-3">
        <button
          type="button"
          onClick={toggleProfile}
          aria-haspopup="menu"
          aria-expanded={profileVisible}
          className="flex items-center gap-2 rounded-lg px-1 py-0.5 text-left transition hover:bg-white"
        >
          <span className="grid h-8 w-8 place-items-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600">IA</span>
          <span className="hidden sm:block">
            <span className="block text-sm font-semibold text-slate-900">Inventory Admin</span>
            <span className="block text-xs text-slate-500">Administrator</span>
          </span>
          <ChevronDown size={16} aria-hidden="true" className={`shrink-0 text-slate-500 transition-transform duration-200 ${profileVisible ? "rotate-180" : "rotate-0"}`} />
        </button>

        {profileMounted && (
          <div
            role="menu"
            className={`absolute right-0 top-[calc(100%+10px)] z-50 w-60 origin-top-right overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl transition-all duration-200 ease-out ${profileVisible ? "translate-y-0 scale-100 opacity-100" : "-translate-y-2 scale-[0.97] opacity-0"}`}
          >
            <div className="border-b border-slate-100 px-4 py-3">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-600">IA</span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold text-slate-900">Inventory Admin</span>
                  <span className="block truncate text-xs text-slate-500">admin@inventory.com</span>
                </span>
              </div>
            </div>

            <div className="py-1.5">
              <ProfileMenuItem icon={UserRound} label="View Profile" onClick={() => { closeProfile(); navigate("/profile"); }} />
              <ProfileMenuItem icon={Settings} label="Account Settings" onClick={closeProfile} />
              <div className="my-1 border-t border-slate-100" />
              <ProfileMenuItem icon={LogOut} label="Sign Out" danger onClick={closeProfile} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ProfileMenuItem({ icon: Icon, label, danger = false, onClick }) {
  return (
    <button
      type="button"
      role="menuitem"
      onClick={onClick}
      className={`flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm font-medium transition ${danger ? "text-rose-600 hover:bg-rose-50" : "text-slate-700 hover:bg-slate-50"}`}
    >
      <Icon size={16} />
      {label}
    </button>
  );
}

export default Header;