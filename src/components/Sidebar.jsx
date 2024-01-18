import React from "react";
import { GrArchive, GrNewWindow, GrNote } from "react-icons/gr";
import { useNavigate } from "react-router-dom";

function Sidebar() {
    const navigate = useNavigate();

    return (
        <div className="sidebar-container">
            <div className="sidebar__content">
                <button onClick={() => navigate("/notes/new")} className="sidebar__new-btn" alt="Create New">
                    <GrNewWindow className="new-btn" />
                </button>

                <button onClick={() => navigate("/")} className="sidebar__home-btn" alt="All Notes">
                    <GrNote className="home-btn" />
                </button>

                <button onClick={() => navigate("/archives")} className="sidebar__archive-btn" alt="Archives Note">
                    <GrArchive className="archive-btn" />
                </button>

            </div>
        </div >
    );
}

export default Sidebar;