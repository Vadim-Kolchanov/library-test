import React from "react";
import {NavLink} from "react-router-dom";
import LinksType from "../../enums/links-type";

const renderLinks = () => Object.values(LinksType).map((link, index) => (
    <li className="nav-item" key={link.to + index}>
        <NavLink to={link.to} className="nav-link">{link.title}</NavLink>
    </li>
))

export const Navbar = () => (
    <nav className="navbar navbar-dark bg-primary navbar-expand-lg">
        <div className="navbar-brand ms-3">
            Библиотека
        </div>
        <ul className="navbar-nav">
            {renderLinks()}
        </ul>
    </nav>
);
