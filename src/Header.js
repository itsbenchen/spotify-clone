import React from "react";
import "./Header.css";
import { useStateValue } from "./StateProvider";
import { Avatar } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

function Header({ spotify }) {
    const [{ user }] = useStateValue();
  
    return (
        <div className="header-container">
            <div className="header">
                <div className="header-left">
                    <SearchIcon />
                    <input
                         placeholder="Search for Artists, Songs, or Podcasts "
                         type="text"
                     />
                </div>
                <div className="header-right">
                    <Avatar alt={user?.display_name} src={user?.images[0].url} />
                    <h4>{user?.display_name}</h4>
                </div>
            </div>
        </div>
        
    );
  }
  
  export default Header;