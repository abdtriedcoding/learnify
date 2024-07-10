import { Metadata } from 'next'
import Charts from './_components/chart'
import { redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs/server'
import DataCard from './_components/data-card'
import { getAnalytics } from '@/app/actions/getAnalytics'

export const metadata: Metadata = {
  title: 'Analytics Page',
}

const AnalyticsPage = async () => {
  const { userId } = auth()

  if (!userId) {
    return redirect('/sign-in')
  }

  const { data, totalRevenue, totalSales } = await getAnalytics(userId)

  return (
    <div className="space-y-4 p-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <DataCard label="Total Revenue" value={totalRevenue} shouldFormat />
        <DataCard label="Total Sales" value={totalSales} />
      </div>
      <Charts data={data} />
    </div>
  )
}

export default AnalyticsPage
