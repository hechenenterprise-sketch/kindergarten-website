export type NewsCategory = "school" | "government" | "activity";

type Props = {
  category?: NewsCategory | string;
};

export default function NewsCategoryBadge({category = "school"}: Props) {
  const isGovernment = category === "government";
  const isActivity = category === "activity";

  const className = isGovernment
    ? "rounded-full bg-blue-100 px-2.5 py-0.5 text-sm font-semibold text-blue-700"
    : isActivity
      ? "rounded-full bg-emerald-100 px-2.5 py-0.5 text-sm font-semibold text-emerald-700"
      : "rounded-full bg-pink-100 px-2.5 py-0.5 text-sm font-semibold text-[#df0873]";

  const label = isGovernment ? "政府" : isActivity ? "活動" : "校務";

  return (
    <span className={className}>{label}</span>
  );
}
