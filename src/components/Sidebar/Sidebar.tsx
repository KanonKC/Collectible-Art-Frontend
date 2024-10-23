import { useNavigate, useParams } from 'react-router-dom';
import SidebarItem from '../SidebarItem/SidebarItem';
import './Sidebar.css';

const Sidebar = () => {

    const { feature } = useParams();
    const navigate = useNavigate();
	
    const SidebarItems = [
        { title: "Shoutout with Clip", path: "shoutout-with-clip" },
        { title: "Show an Image", path: "show-an-image" },
        { title: "Tarot Card", path: "tarot-card" },
    ];
    
    return (
		<div className="sidebar-container">
			{
                SidebarItems.map((item, index) => (
                    <div key={index} onClick={() => navigate(`/features/${item.path}`)}>
                        <SidebarItem title={item.title} isActive={feature === item.path}/>
                    </div>
                ))
            }
		</div>
	);
};

export default Sidebar;
