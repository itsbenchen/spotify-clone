import React from 'react';
import "./Sidebar.css";
import SidebarOption from "./SidebarOption";
import { useStateValue } from "./StateProvider";

import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import LibraryMusicIcon from "@material-ui/icons/LibraryMusic";

function Sidebar() {

    const [{ playlists }] = useStateValue();
    
    return (
        <div className="sidebar">
            <img 
                className="sidebar-logo"
                src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
                alt=""
            />
            <SidebarOption Icon={HomeIcon} optionName="Home" />
            <SidebarOption Icon={SearchIcon} optionName="Search" />
            <SidebarOption Icon={LibraryMusicIcon} optionName="Your Library" />

            <br />
            <strong className="sidebar-title">PLAYLISTS</strong>
            <hr />

            {playlists?.items?.map(playlist => (
                <SidebarOption key={playlist.name} optionName={playlist.name} />
            ))}

        </div>
    );
}

export default Sidebar;
