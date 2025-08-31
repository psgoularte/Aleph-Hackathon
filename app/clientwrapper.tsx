"use client";

import dynamic from "next/dynamic";

const Provider = dynamic(() => import("./providers/provider"), {
  ssr: false,
  loading: () => <div>Loading providers...</div>,
});

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider>{children}</Provider>;
}
