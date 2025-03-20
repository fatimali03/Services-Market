import home from '../../assets/svgs/homeIcon.svg'
import services from '../../assets/svgs/servicesIcon.svg'
import chat from '../../assets/svgs/chatIcon.svg'
import settings from '../../assets/svgs/settings.svg'
import { useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

export default function CompanyMenu({ active }) {
    const { id } = useParams();

    return (
        <menu className='Menu'>
            {/* Home Link */}
            <div className={active === "home" ? 'link active' : 'link'}>
                <NavLink to={`/dashboard/company/${id}`}>
                    <img src={home} alt="Home" />
                    <div className="linkHeader">
                        Home
                    </div>
                </NavLink>
            </div>

            {/* Services Link */}
            <div className={active === "services" ? 'link active' : 'link'}>
                <NavLink to={`/dashboard/company/${id}/services`}>
                    <img src={services} alt="Services" />
                    <div className="linkHeader">
                        My Services
                    </div>
                </NavLink>
            </div>

            {/* Chat Link */}
            <div className={active === "chat" ? 'link active' : 'link'}>
                <NavLink to={`/dashboard/company/${id}/chat`}>
                    <img src={chat} alt="Chat" />
                    <div className="linkHeader">
                        Chat Room
                    </div>
                </NavLink>
            </div>

            {/* Profile Link */}
            <div className={active === "profile" ? 'link active' : 'link'}>
                <NavLink to={`/dashboard/company/${id}/profile`}>
                    <img src={settings} alt="Settings" />
                    <div className="linkHeader">
                        My Profile
                    </div>
                </NavLink>
            </div>
        </menu>
    );
}
