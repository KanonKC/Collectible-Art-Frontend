import { cn } from '@/lib/utils';
import './SidebarItem.css';

const SidebarItem = ({
    title="",
    isActive=false
}: {
    title?: string,
    isActive?: boolean
}) => {
  return (
    <div className={
        cn({
            'text-white bg-primary': isActive,
            'hover:bg-secondary': !isActive
        }, 
            'p-2 cursor-pointer font-bold rounded-md',
        )
    }>
        {title}
    </div>
  )
}

export default SidebarItem