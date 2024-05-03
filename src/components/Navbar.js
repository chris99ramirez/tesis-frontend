import React, {  useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.scss';
const admin = [
    {
        title: "Productos",
        link: "/"
        
    },
]

export default function Navbar() {
    const [isExpanded, setIsExpanded] = useState(false);
    const toggleExpansion = () => {
        setIsExpanded(!isExpanded);
      };
    return(
        <div className={`Navbar ${isExpanded ? 'Navbar--expanded' : ''}`} >
            <div className="Navbar__toggle" onClick={toggleExpansion}>
                <span>☰</span>
            </div>
            <nav  style={{marginTop:"10px", height: "fit-content"}}>
                <ul className="NavBar__sidebarList">
                    {admin.map((val,key)=> {
                        return (
                            <NavLink key = {key}
                                to = {val.link}
                                className = {e => 
                                    `NavBar__sidebarList-dataRow ${e.isActive? "selected" : ""}`
                                  }
                                >
                               
                                <span className='NavBar__sidebarList-texto'>
                                    {val.title}
                                </span>
                            </NavLink>
                        )
                    })}
                </ul>
            </nav>
        </div>
    )
    
}
