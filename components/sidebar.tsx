import SidebarRoutes from '@/components/sidebar-routes'
import { ScrollArea } from '@/components/ui/scroll-area'

const Sidebar = () => {
  return (
    <ScrollArea className="h-[100vh]">
      <div className="p-4">
        <SidebarRoutes />
      </div>
    </ScrollArea>
  )
}

export default Sidebar
