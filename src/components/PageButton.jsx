export default function PageButton({
  children,
  active = false,
  onClick,
  activeVariant = "filled",
  fontWeight = "medium",
  textSize = "xs",
  className = "",
  ...buttonProps
}) {
  const textClasses = textSize === "tiny" ? "text-[10px]" : "text-xs";
  const weightClasses = fontWeight === "semibold" ? "font-semibold" : "font-medium";
  const activeClasses = activeVariant === "outline"
    ? "border-violet-600 bg-white text-violet-600 shadow-sm"
    : "border-violet-600 bg-violet-600 text-white shadow-sm";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`grid h-8 min-w-8 place-items-center rounded-md border px-2 ${textClasses} ${weightClasses} transition ${active ? activeClasses : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"} ${className}`}
      {...buttonProps}
    >
      {children}
    </button>
  );
}