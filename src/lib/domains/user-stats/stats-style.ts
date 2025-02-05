import { tv } from "tailwind-variants";

export const style = tv({
  slots: {
    container: "mx-auto max-w-max space-y-4 rounded-xl border p-4 shadow-xs",
    header: "flex items-center gap-x-2",
    headerName: "font-extrabold",
    tableLabel: "text-sm text-zinc-500",
    tableRow: "text-sm",
  },
});
