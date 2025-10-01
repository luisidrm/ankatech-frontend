"use client";

type Props = {
  status: string
  setStatus: (arg0:string)=>void
};

export default function StatusToggle({
  status, setStatus
}: Props) {

  const pillBase =
    "inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium shadow-sm select-none";
  const enabledBase = "cursor-pointer";
  const disabledBase = "opacity-50 cursor-not-allowed";

  return (
    <div className="flex items-center gap-3">
      {/* Morto */}
      <label
        className={`${pillBase} ${
          status==="dead" ? "bg-transparent text-white" : "bg-transparent text-gray-200"
        } ${status==="invalid" ? disabledBase : enabledBase}`}
        onClick={()=>setStatus("dead")}
      >
        <input
          type="checkbox"
          checked={status==="dead"}
          onChange={() => setStatus("dead")}
          className="sr-only"
        />
        {/* icon circle */}
        <span
          className={`flex items-center justify-center w-4 h-4 rounded-full border ${
            status==="dead" ? "bg-white border-transparent" : "border-gray-600"
          }`}
        >
          {/* simple dot */}
          {status==="dead" ? <span className="block w-2 h-2 rounded-full bg-blue-600" /> : null}
        </span>
        <span>Morto</span>
      </label>

      {/* Invalido */}
      <label
        className={`${pillBase} ${
          status==="invalid" ? "bg-transparent text-white" : "bg-transparent text-gray-200"
        } ${status==="invalid" ? disabledBase : enabledBase}`}
        onClick={() => setStatus("invalid")}
      >
        <input
          type="checkbox"
          checked={status==="invalid"}
          onChange={() => setStatus("invalid")}
          className="sr-only"
        />
        <span
          className={`flex items-center justify-center w-4 h-4 rounded-full border ${
            status==="invalid" ? "bg-white border-transparent" : "border-gray-600"
          }`}
        >
          {status==="invalid" ? <span className="block w-2 h-2 rounded-full bg-amber-500" /> : null}
        </span>
        <span>Inválido</span>
      </label>
    </div>
  );
}
