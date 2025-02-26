import { tv } from "tailwind-variants";

export const style = tv({
  slots: {
    container: "mx-auto w-full space-y-4 rounded-2xl p-4 bg-white",
    header: "flex items-center gap-x-2",
    headerName: "font-extrabold leading-none",
    tableLabel: "text-sm text-gray-500",
    tableRow: "text-sm",
  },
});
