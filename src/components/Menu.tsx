import React from 'react';
import {useDispatch} from "react-redux";
import * as actions from "../store/Actions";
import './Menu.scss';
import {MenuType} from "../Enums";

export default () => {
    const dispatch = useDispatch();

    function onMenuItemClick(type: MenuType) {
        dispatch(actions.updateNewsItems(type));
    }

    return (
        <div className="menu-panel">
            <div className="logo-container">
                <div className="logo">Y</div>
                <div className="company-name">Hacker News</div>
            </div>
            <div className="menu-item" onClick={() => onMenuItemClick(MenuType.popular)}>Popular</div>
            <div className="menu-item" onClick={() => onMenuItemClick(MenuType.new)}>New</div>
            <div className="menu-item" onClick={() => onMenuItemClick(MenuType.ask)}>Ask</div>
            <div className="menu-item" onClick={() => onMenuItemClick(MenuType.show)}>Show</div>
        </div>
    );
};

