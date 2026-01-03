"use client";

import { Suspense } from "react";
import ResetClient from "./reset-client";

export default function ResetPage() {
  return (
    <Suspense fallback={<div style={center}>Carregando...</div>}>
      <ResetClient />
    </Suspense>
  );
}

const center = {
  minHeight: "100vh",
  display: "grid",
  placeItems: "center",
  background: "#000",
  color: "#fff",
};
