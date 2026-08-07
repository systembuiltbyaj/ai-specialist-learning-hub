interface Stat {
  label: string;
  value: string | number;
  icon: string;
  hint?: string;
}

export default function Dashboard({ stats }: { stats: Stat[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {stats.map((s) => (
        <div key={s.label} className="card card-hover p-5">
          <div className="mb-2 text-2xl">{s.icon}</div>
          <div className="text-3xl font-black text-gold">{s.value}</div>
          <div className="mt-1 text-sm font-medium text-white">{s.label}</div>
          {s.hint && <div className="mt-0.5 text-xs text-white/45">{s.hint}</div>}
        </div>
      ))}
    </div>
  );
}
