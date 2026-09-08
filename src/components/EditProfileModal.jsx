import { useEffect, useRef, useState } from "react";
import { Camera, X } from "lucide-react";

const inputClass = "h-10 w-full min-w-0 rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-100 disabled:bg-slate-50 disabled:text-slate-500";

export default function EditProfileModal({ profile, onSave, onClose }) {
  const [draft, setDraft] = useState(() => ({ ...profile }));
  const [closing, setClosing] = useState(false);
  const [photoError, setPhotoError] = useState("");
  const [photoLoading, setPhotoLoading] = useState(false);
  const dialogRef = useRef(null);
  const photoRef = useRef(null);
  const readerRef = useRef(null);
  const update = (key, value) => setDraft((current) => ({ ...current, [key]: value }));
  const close = () => setClosing(true);

  useEffect(() => {
    const dialog = dialogRef.current;
    const previousFocus = document.activeElement;
    dialog.showModal();
    return () => {
      readerRef.current?.abort();
      dialog.close();
      previousFocus?.focus();
    };
  }, []);

  useEffect(() => {
    if (!closing) return;
    const delay = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 200;
    const timer = window.setTimeout(onClose, delay);
    return () => window.clearTimeout(timer);
  }, [closing, onClose]);

  const changePhoto = (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    readerRef.current?.abort();
    setPhotoLoading(false);
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setPhotoError("Choose a JPG, PNG or WEBP image.");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setPhotoError("Your profile photo must be 2MB or smaller.");
      return;
    }
    setPhotoError("");
    setPhotoLoading(true);
    const reader = new FileReader();
    readerRef.current = reader;
    reader.onload = () => { update("photo", reader.result); setPhotoLoading(false); };
    reader.onerror = () => { setPhotoError("This image could not be read. Please try another."); setPhotoLoading(false); };
    reader.readAsDataURL(file);
  };

  const save = (event) => {
    event.preventDefault();
    if (closing || photoLoading) return;
    onSave({ ...draft, fullName: draft.fullName.trim(), email: draft.email.trim() });
    close();
  };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="edit-profile-title"
      aria-describedby="edit-profile-description"
      className={`profile-editor m-auto max-h-[calc(100dvh-32px)] w-[calc(100%-32px)] max-w-[580px] overflow-y-auto rounded-xl border border-slate-200 bg-white p-0 font-sans text-slate-900 shadow-2xl ${closing ? "profile-editor-closing" : ""}`}
      onCancel={(event) => { event.preventDefault(); close(); }}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) close();
      }}
    >
      <form onSubmit={save} className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id="edit-profile-title" className="text-lg font-semibold">Edit Profile</h2>
            <p id="edit-profile-description" className="mt-1 text-xs text-slate-500">Update your personal and work information.</p>
          </div>
          <button type="button" onClick={close} aria-label="Close edit profile" className="rounded-md p-1 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"><X size={20} /></button>
        </div>

        <div className="my-6 flex items-center gap-6">
          <div className="relative ml-2 shrink-0">
            <div className="grid h-24 w-24 overflow-hidden place-items-center rounded-full bg-gradient-to-br from-slate-800 to-slate-950 text-3xl font-semibold text-white shadow-sm">
              {draft.photo ? <img src={draft.photo} alt="Profile preview" className="h-full w-full object-cover" /> : initials(draft.fullName)}
            </div>
            <button type="button" onClick={() => photoRef.current?.click()} aria-label="Change profile photo" className="absolute -bottom-1 -right-1 grid h-9 w-9 place-items-center rounded-full border border-slate-100 bg-white text-violet-600 shadow-sm hover:bg-violet-50"><Camera size={18} /></button>
          </div>
          <div>
            <p className="text-xs font-medium">Profile Photo</p>
            <p className="mt-1 text-xs text-slate-500">JPG, PNG or WEBP. Max size 2MB.</p>
            <button type="button" onClick={() => photoRef.current?.click()} className="mt-3 flex h-8 items-center gap-2 rounded-md border border-violet-300 px-3 text-xs font-medium text-violet-600 transition hover:bg-violet-50"><Camera size={14} />Change Photo</button>
            <input ref={photoRef} type="file" accept="image/jpeg,image/png,image/webp" onChange={changePhoto} className="hidden" aria-label="Profile photo" />
            {photoError && <p role="alert" className="mt-2 text-xs text-rose-600">{photoError}</p>}
          </div>
        </div>

        <fieldset disabled={closing} className="grid min-w-0 grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
          <EditorField label="Full Name" required><input autoFocus required pattern=".*\S.*" maxLength={100} value={draft.fullName} onChange={(event) => update("fullName", event.target.value)} className={inputClass} autoComplete="name" /></EditorField>
          <EditorField label="Employee ID"><input disabled value={draft.employeeId} className={inputClass} /></EditorField>
          <EditorField label="Email Address" required><input required type="email" value={draft.email} onChange={(event) => update("email", event.target.value)} className={inputClass} autoComplete="email" /></EditorField>
          <EditorField label="Phone Number"><input type="tel" value={draft.phone} onChange={(event) => update("phone", event.target.value)} className={inputClass} autoComplete="tel" /></EditorField>
          <EditorField label="Role"><EditorSelect value={draft.role} options={["Administrator", "Inventory Manager", "Employee"]} onChange={(value) => update("role", value)} /></EditorField>
          <EditorField label="Job Title"><input value={draft.jobTitle} onChange={(event) => update("jobTitle", event.target.value)} className={inputClass} autoComplete="organization-title" /></EditorField>
          <EditorField label="Department"><EditorSelect value={draft.department} options={["Inventory Management", "IT", "HR", "Finance", "Operations"]} onChange={(value) => update("department", value)} /></EditorField>
          <EditorField label="Work Location"><EditorSelect value={draft.workLocation} options={["Head Office", "Branch Office", "Remote"]} onChange={(value) => update("workLocation", value)} /></EditorField>
          <EditorField label="Date of Joining"><input type="date" required value={draft.joiningDate} onChange={(event) => update("joiningDate", event.target.value)} className={inputClass} /></EditorField>
          <EditorField label="About (Optional)"><textarea maxLength={300} value={draft.about} onChange={(event) => update("about", event.target.value)} className={`${inputClass} h-20 resize-y py-2`} /><span className="mt-1 block text-right text-xs text-slate-500">{draft.about.length}/300</span></EditorField>
        </fieldset>

        <div className="mt-6 flex justify-end gap-3">
          <button type="button" onClick={close} className="h-10 rounded-md border border-slate-200 bg-slate-50 px-5 text-sm font-medium text-slate-700 transition hover:bg-slate-100">Cancel</button>
          <button type="submit" disabled={closing || photoLoading} className="h-10 rounded-md bg-violet-600 px-5 text-sm font-medium text-white transition hover:bg-violet-700 disabled:opacity-50">Save Changes</button>
        </div>
      </form>
    </dialog>
  );
}

function EditorField({ label, required, children }) {
  return <label className="block min-w-0"><span className="mb-1.5 block text-xs font-medium text-slate-500">{label}{required && <span className="text-rose-500"> *</span>}</span>{children}</label>;
}

function EditorSelect({ value, options, onChange }) {
  return <select value={value} onChange={(event) => onChange(event.target.value)} className={inputClass}>{[...new Set([value, ...options])].map((option) => <option key={option} value={option}>{option}</option>)}</select>;
}

export function initials(name) {
  return name.trim().split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase() || "IA";
}
