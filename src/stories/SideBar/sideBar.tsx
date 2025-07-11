import React, {useEffect, useRef, useState} from 'react';
import styles from './sideBar.module.css';
import {Link, useNavigate} from "react-router-dom";
import ProfileNav from "../../Components/DashBoard/ProfileNav";

interface SidebarProps {
    collapse?: boolean;
    logo?: string;
    getSidebarState?: (x: boolean) => boolean;
    getPage?: (x: string) => string;
    UserType?: string | null;
}

const Sidebar: React.FC<SidebarProps> = ({collapse, logo, getSidebarState, getPage, UserType}: SidebarProps) => {
    const [isOpen, setIsOpen] = useState(collapse ?? false);
    const [show, setShow] = useState(false);
    const navSearchRef = useRef<HTMLDivElement | null>(null);
    const profileRef = useRef<HTMLDivElement | null>(null); // Ref for profile dropdown
    const [isProfileOpen, setProfileIsOpen] = useState(false);

    // New state for active menu item
    const [activeItem, setActiveItem] = useState<string>(localStorage.getItem('currentPage') || 'Overview');

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const handleProfile = (event: React.MouseEvent) => {
        event.stopPropagation();
        setProfileIsOpen((prev) => !prev);
    };

    useEffect(() => {
        getSidebarState && getSidebarState(isOpen);
    }, [isOpen]);

    const handleShowSide = () => {
        // Check if the viewport width is greater than 765px
        if (window.matchMedia('(min-width: 765px)').matches) {
            setShow(!show);
        }
    };

    const handleNavSearchDisplay = () => {
        // Ensure this only runs on screens wider than 765px
        if (window.matchMedia('(max-width: 765px)').matches && navSearchRef.current) {
            navSearchRef.current.style.display = 'block';
        }
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (
            profileRef.current &&
            !profileRef.current.contains(event.target as Node)
        ) {
            setProfileIsOpen(false);
        }

        // Additional handling for navSearch if necessary
        if (
            navSearchRef.current &&
            !navSearchRef.current.contains(event.target as Node) &&
            window.matchMedia('(max-width: 765px)').matches
        ) {
            navSearchRef.current.style.display = 'none';
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isProfileOpen]);

    let navigate = useNavigate();
    const handleNavigation = () => {
        navigate('/saved');
    };

    return (
        <>
            <div className={styles.upperNav}>
                <div style={{cursor: 'pointer'}} onClick={handleNavSearchDisplay}>
                    <img
                        src="https://res.cloudinary.com/do5wu6ikf/image/upload/v1725695190/Reev/pixelarticons_menu_bl8vvb.svg"
                        alt="menu"
                        className={styles.menuIcon}
                    />
                </div>

                <div className={styles.navSerch}>
                    <img
                        src="https://res.cloudinary.com/do5wu6ikf/image/upload/v1725695190/Reev/icons_n8fkxi.svg"
                        alt="Search"
                    />
                    <input type="text" placeholder={'Search for anything...'}/>
                </div>

                <div className={styles.lastCont}>

                    <Link style={{textDecoration: 'none'}} to='/notification'>
                        <div style={{cursor: 'pointer'}}>
                            <img
                                src="https://res.cloudinary.com/do5wu6ikf/image/upload/v1725695190/Reev/Auto_Layout_Horizontal_pgthlg.svg"
                                alt="bell"
                            />
                        </div>
                    </Link>


                    <div ref={profileRef} className={styles.Userbtn} onClick={handleProfile}>
                        <img
                            src="https://res.cloudinary.com/do5wu6ikf/image/upload/v1725695190/Reev/Frame_stfpal.svg"
                            alt="user"
                        />
                        <div className={styles.userName}>Seyi Ode</div>
                        <img
                            src="https://res.cloudinary.com/do5wu6ikf/image/upload/v1725695190/Reev/icons_up_csqnun.svg"
                            alt="upIcon"
                        />
                    </div>
                    {isProfileOpen && (
                        <div className={styles.profile}>
                            <ProfileNav/>
                        </div>
                    )}
                </div>
            </div>

            <div style={{position: 'relative'}}>
                <div ref={navSearchRef}
                     className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ''} ${show ? styles.show : ''}`}>
                    <Link style={{textDecoration: 'none'}} to={`${logo}`} className={styles.Link}>
                        <div className={styles.logo}>
                            <img
                                src={
                                    isOpen
                                        ? 'https://res.cloudinary.com/do5wu6ikf/image/upload/v1718715019/Reev/logo_ocj4df.svg'
                                        : 'https://res.cloudinary.com/do5wu6ikf/image/upload/v1718715019/Reev/fa_bolt_owleb9.svg'
                                }
                                alt="logo"
                            />
                        </div>

                        <div className={isOpen ? styles.usertypeOpen : styles.usertypeClose}>
                            {UserType === 'Freelancer' ? 'FREELANCER’S DASHBOARD' : 'RECRUITER’S DASHBOARD'}
                        </div>
                    </Link>


                    {/* Sidebar content */}
                    <button
                        className={isOpen ? styles.toggleBtnOpen : styles.toggleBtnClose}
                        onClick={toggleSidebar}
                    >
                        {!isOpen ? (
                            <i className="fi fi-sr-angle-right"></i>
                        ) : (
                            <i className="fi fi-sr-angle-left"></i>
                        )}
                    </button>

                    <ul className={styles.upperSideBar}>
                        <Link style={{textDecoration: 'none'}} to='/overview'>
                            <li
                                className={`${isOpen ? styles.deskTabIcon : styles.mobileIcon} ${activeItem === 'Overview' ? styles.active : ''}`}
                            >
                                {isOpen ? (
                                    <div className={styles.dodo}>
                                        <i className="fi fi-sr-apps"></i>
                                        <div>Overview</div>
                                    </div>
                                ) : (
                                    <div className={styles.dodom}>
                                        <i className="fi fi-sr-apps"></i>
                                        <span className={styles.tooltiptext}>Overview</span>
                                    </div>
                                )}
                            </li>
                        </Link>

                        <Link style={{textDecoration: 'none'}} to='/profile'>
                            <li
                                className={`${isOpen ? styles.deskTabIcon : styles.mobileIcon} ${activeItem === 'Profile' ? styles.active : ''}`}
                            >
                                {isOpen ? (
                                    <div className={styles.dodo}>
                                        <i className="fi fi-sr-user"></i>
                                        Profile
                                    </div>
                                ) : (
                                    <div className={styles.dodom}>
                                        <i className="fi fi-sr-user"></i>
                                        <span className={styles.tooltiptext}>Profile</span>
                                    </div>
                                )}
                            </li>
                        </Link>

                        <Link style={{textDecoration: 'none'}} to='/postproject'>
                            <li
                                className={`${isOpen ? styles.deskTabIcon : styles.mobileIcon} ${activeItem === 'PostAJob' ? styles.active : ''}`}
                            >
                                {isOpen ? (
                                    <div className={styles.dodo}>
                                        <i className="fi fi-sr-add"></i>
                                        {UserType === 'Freelancer' ? 'Post a Gig' : 'Post a Job'}

                                    </div>
                                ) : (
                                    <div className={styles.dodom}>
                                        <i className="fi fi-sr-add"></i>
                                        <span
                                            className={styles.tooltiptext}>   {UserType === 'Freelancer' ? 'Post a Gig' : 'Post a Job'}</span>
                                    </div>
                                )}
                            </li>
                        </Link>


                        <Link style={{textDecoration: 'none'}} to='/message'>
                            <li
                                className={`${isOpen ? styles.deskTabIcon : styles.mobileIcon} ${activeItem === 'Message' ? styles.active : ''}`}
                            >
                                {isOpen ? (
                                    <div className={styles.dodo}>
                                        <i className="fi fi-sr-envelope"></i>
                                        Message
                                    </div>
                                ) : (
                                    <div className={styles.dodom}>
                                        <i className="fi fi-sr-envelope"></i>
                                        <span className={styles.tooltiptext}>Message</span>
                                    </div>
                                )}
                            </li>
                        </Link>


                        <Link style={{textDecoration: 'none'}} to='/saved'>
                            <li
                                className={`${isOpen ? styles.deskTabIcon : styles.mobileIcon} ${activeItem === 'SavedEmployee' ? styles.active : ''}`}
                            >
                                {isOpen ? (
                                    <div className={styles.dodo}>
                                        <i className="fi fi-sr-users"></i>
                                        {UserType === 'Freelancer' ? 'Saved job' : 'Saved Employee'}

                                    </div>
                                ) : (
                                    <div className={styles.dodom}>
                                        <i className="fi fi-sr-users"></i>
                                        <span className={styles.tooltiptext}>
                                            {UserType === 'Freelancer' ? 'Saved Job' : 'Saved Employee'}
                                        </span>
                                    </div>
                                )}
                            </li>
                        </Link>

                        <Link style={{textDecoration: 'none'}} to='/payment'>
                            <li
                                className={`${isOpen ? styles.deskTabIcon : styles.mobileIcon} ${activeItem === 'PlanBillings' ? styles.active : ''}`}
                            >
                                {isOpen ? (
                                    <div className={styles.dodo}>
                                        <i className="fi fi-sr-receipt"></i>
                                        {UserType === 'Freelancer' ? 'Payment & Earnings' : 'Plan & Billings'}

                                    </div>
                                ) : (
                                    <div className={styles.dodom}>
                                        <i className="fi fi-sr-receipt"></i>
                                        <span className={styles.tooltiptext}>
                                               {UserType === 'Freelancer' ? 'Payment & Earnings' : 'Plan & Billings'}
                                        </span>
                                    </div>
                                )}
                            </li>
                        </Link>


                        <Link style={{textDecoration: 'none'}} to='/review'>
                            {UserType !== 'Client' && (
                                <li
                                    className={`${isOpen ? styles.deskTabIcon : styles.mobileIcon} ${activeItem === 'Review' ? styles.active : ''}`}
                                >
                                    {isOpen ? (
                                        <div className={styles.dodo}>
                                            <i className="fi fi-sr-star"></i>
                                            Reviews
                                        </div>
                                    ) : (
                                        <div className={styles.dodom}>
                                            <i className="fi fi-sr-star"></i>
                                            <span className={styles.tooltiptext}>Reviews</span>
                                        </div>
                                    )}
                                </li>
                            )}
                        </Link>

                        <Link style={{textDecoration: 'none'}} to='/settings'>
                            <li
                                className={`${isOpen ? styles.deskTabIcon : styles.mobileIcon} ${activeItem === 'Settings' ? styles.active : ''}`}
                            >
                                {isOpen ? (
                                    <div className={styles.dodo}>
                                        <i className="fi fi-sr-settings"></i>
                                        Settings
                                    </div>
                                ) : (
                                    <div className={styles.dodom}>
                                        <i className="fi fi-sr-settings"></i>
                                        <span className={styles.tooltiptext}>Settings</span>
                                    </div>
                                )}
                            </li>
                        </Link>

                    </ul>

                    <ul className={styles.lowerSideBar}>
                        <Link style={{textDecoration: 'none'}} to='/help'>
                            <li
                                className={`${isOpen ? styles.deskTabIcon : styles.mobileIcon} ${activeItem === 'Help' ? styles.active : ''}`}
                            >
                                {isOpen ? (
                                    <div className={styles.dodo}>
                                        <i className="fi fi-sr-interrogation"></i>
                                        Help
                                    </div>
                                ) : (
                                    <div className={styles.dodom}>
                                        <i className="fi fi-sr-interrogation"></i>
                                        <span className={styles.tooltiptext}>Help</span>
                                    </div>
                                )}
                            </li>
                        </Link>


                        <li
                            className={`${isOpen ? styles.deskTabIcon : styles.mobileIcon} ${activeItem === 'Logout' ? styles.active : ''}`}
                            onClick={() => {
                                // Handle logout logic here
                            }}
                        >
                            {isOpen ? (
                                <div className={styles.dodo}>
                                    <i className="fi fi-sr-exit"></i>
                                    Log out
                                </div>
                            ) : (
                                <div className={styles.dodom}>
                                    <i className="fi fi-sr-exit"></i>
                                    <span className={styles.tooltiptext}>Log out</span>
                                </div>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );

};

export default Sidebar;
