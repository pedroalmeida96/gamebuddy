import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface NavLinkProps {
    to: string;
    children: ReactNode;
}

function NavLink(props: NavLinkProps) {
    return (
        <Link to={props.to} className="nav-link">
            {props.children}
        </Link>
    );
}

export default NavLink;
