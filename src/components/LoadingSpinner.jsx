function Bar({ className = "" }) {
  return <span className={`block rounded-md bg-slate-200/80 ${className}`} />;
}

function SkeletonRows({ count = 6 }) {
  return <div className="divide-y divide-slate-100">{Array.from({ length: count }, (_, index) => <div key={index} className="grid grid-cols-[1.4fr_1fr_1fr_.8fr_.7fr] items-center gap-5 px-4 py-3.5"><div className="flex items-center gap-3"><Bar className="h-9 w-9 shrink-0 rounded-lg" /><div className="w-full space-y-2"><Bar className="h-3 w-3/5" /><Bar className="h-2.5 w-2/5" /></div></div><Bar className="h-3 w-2/3" /><Bar className="h-3 w-3/4" /><Bar className="h-6 w-20" /><div className="flex justify-end gap-2"><Bar className="h-8 w-8" /><Bar className="h-8 w-8" /></div></div>)}</div>;
}

export function SectionLoader({ rows = 5, label = "Loading section" }) {
  return <section className="w-full overflow-hidden rounded-xl border border-slate-200 bg-white" role="status" aria-label={label}><div className="animate-pulse"><div className="flex items-center justify-between border-b border-slate-100 p-4"><Bar className="h-4 w-40" /><Bar className="h-9 w-56" /></div><SkeletonRows count={rows} /></div></section>;
}

function LoadingSpinner() {
  return <main className="min-h-screen w-full bg-slate-50 p-4" role="status" aria-label="Loading page">
    <div className="animate-pulse space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-4"><div className="space-y-2"><Bar className="h-7 w-56" /><Bar className="h-3 w-80 max-w-full" /></div><div className="flex items-center gap-3"><Bar className="h-9 w-72" /><Bar className="h-9 w-9 rounded-full" /><Bar className="h-9 w-36" /></div></div>
      <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">{Array.from({ length: 4 }, (_, index) => <div key={index} className="flex min-h-28 items-center gap-4 rounded-xl border border-slate-200 bg-white p-4"><Bar className="h-12 w-12 shrink-0 rounded-xl" /><div className="w-full space-y-2"><Bar className="h-3 w-2/3" /><Bar className="h-6 w-1/2" /><Bar className="h-2.5 w-3/4" /></div></div>)}</div>
      <div className="rounded-xl border border-slate-200 bg-white p-3"><div className="grid grid-cols-2 gap-3 lg:grid-cols-5"><Bar className="h-9 w-full" /><Bar className="h-9 w-full" /><Bar className="h-9 w-full" /><Bar className="h-9 w-full" /><Bar className="h-9 w-full" /></div></div>
      <SectionLoader rows={7} />
    </div>
  </main>;
}

export default LoadingSpinner;
