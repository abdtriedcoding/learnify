import { InfoCardProps } from "@/types/index";

const InfoCard = ({
  icon: Icon,
  numberOfItems,
  label,
  color,
}: InfoCardProps) => {
  return (
    <div className="border rounded-md flex items-center gap-x-2 p-3">
      <Icon className={`w-5 h-5 ${color}`} />
      <div>
        <p className="font-medium">{label}</p>
        <p className="text-gray-500 text-sm">
          {numberOfItems} {numberOfItems === 1 ? "Course" : "Courses"}
        </p>
      </div>
    </div>
  );
};

export default InfoCard;
