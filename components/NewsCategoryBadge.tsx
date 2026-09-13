export type NewsCategory = "school" | "government";

type Props = {
  category?: NewsCategory | string;
};

export default function NewsCategoryBadge({category = "school"}: Props) {
  const isGovernment = category === "government";

  return (
    <span
      className={
        isGovernment
          ? "rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700"
          : "rounded-full bg-pink-100 px-3 py-1 text-xs font-semibold text-[#df0873]"
      }
    >
      {isGovernment ? "政府資訊" : "學校資訊"}
    </span>
  );
}
