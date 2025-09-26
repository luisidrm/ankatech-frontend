"use client";

import React, { useEffect, useState } from "react";

type Props = {
  initialMorto?: boolean;
  initialInvalido?: boolean;
  onChange?: (state: { morto: boolean; invalido: boolean }) => void;
  disabled?: boolean; // por ejemplo para "Situação Atual"
};

export default function StatusToggle({
  initialMorto = false,
  initialInvalido = false,
  onChange,
  disabled = false,
}: Props) {
  const [morto, setMorto] = useState<boolean>(initialMorto);
  const [invalido, setInvalido] = useState<boolean>(initialInvalido);

  useEffect(() => {
    onChange?.({ morto, invalido });
  }, [morto, invalido, onChange]);

  const pillBase =
    "inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium shadow-sm select-none";
  const enabledBase = "cursor-pointer";
  const disabledBase = "opacity-50 cursor-not-allowed";

  return (
    <div className="flex items-center gap-3">
      {/* Morto */}
      <label
        className={`${pillBase} ${
          morto ? "bg-transparent text-white" : "bg-transparent text-gray-200"
        } ${disabled ? disabledBase : enabledBase}`}
        tabIndex={disabled ? -1 : 0}
        onKeyDown={(e) => {
          if (!disabled && (e.key === " " || e.key === "Enter")) {
            setMorto((v) => !v);
          }
        }}
        onClick={() => !disabled && setMorto((v) => !v)}
      >
        <input
          type="checkbox"
          checked={morto}
          onChange={(e) => setMorto(e.target.checked)}
          className="sr-only"
          disabled={disabled}
        />
        {/* icon circle */}
        <span
          className={`flex items-center justify-center w-4 h-4 rounded-full border ${
            morto ? "bg-white border-transparent" : "border-gray-600"
          }`}
        >
          {/* simple dot */}
          {morto ? <span className="block w-2 h-2 rounded-full bg-blue-600" /> : null}
        </span>
        <span>Morto</span>
      </label>

      {/* Invalido */}
      <label
        className={`${pillBase} ${
          invalido ? "bg-transparent text-white" : "bg-transparent text-gray-200"
        } ${disabled ? disabledBase : enabledBase}`}
        tabIndex={disabled ? -1 : 0}
        onKeyDown={(e) => {
          if (!disabled && (e.key === " " || e.key === "Enter")) {
            setInvalido((v) => !v);
          }
        }}
        onClick={() => !disabled && setInvalido((v) => !v)}
      >
        <input
          type="checkbox"
          checked={invalido}
          onChange={(e) => setInvalido(e.target.checked)}
          className="sr-only"
          aria-hidden
          disabled={disabled}
        />
        <span
          className={`flex items-center justify-center w-4 h-4 rounded-full border ${
            invalido ? "bg-white border-transparent" : "border-gray-600"
          }`}
          aria-hidden
        >
          {invalido ? <span className="block w-2 h-2 rounded-full bg-amber-500" /> : null}
        </span>
        <span>Inválido</span>
      </label>
    </div>
  );
}
