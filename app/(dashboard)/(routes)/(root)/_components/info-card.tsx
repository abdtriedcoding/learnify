import { type InfoCardProps } from '@/types/index'

const InfoCard = ({
  icon: Icon,
  numberOfItems,
  label,
  color,
}: InfoCardProps) => {
  return (
    <div className="flex items-center gap-x-2 rounded-md border p-3">
      <Icon className={`h-5 w-5 ${color}`} />
      <div>
        <p className="font-medium">{label}</p>
        <p className="text-sm text-gray-500">
          {numberOfItems} {numberOfItems === 1 ? 'Course' : 'Courses'}
        </p>
      </div>
    </div>
  )
}

export default InfoCard
