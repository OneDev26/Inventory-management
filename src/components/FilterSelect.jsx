export default function FilterSelect({
  label,
  value,
  setValue,
  options,
  width = "w-full",
  size = "default",
  className = "",
}) {
  const sizeClasses = size === "compact" ? "h-9 text-xs" : "h-10 text-sm";

  return (
    <div className={label ? "" : "contents"}>
      {label && (
        <label className="mb-1.5 block text-xs font-medium text-slate-600">
          {label}
        </label>
      )}
      <select
        value={value}
        onChange={(event) => setValue(event.target.value)}
        className={`${width} ${sizeClasses} rounded-md border border-slate-200 bg-white px-3 font-medium text-slate-700 outline-none transition focus:border-violet-300 focus:ring-2 focus:ring-violet-100 ${className}`}
      >
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}