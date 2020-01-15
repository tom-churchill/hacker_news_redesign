import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import * as actions from "../store/Actions";
import './App.scss';
import Content from "./Content";
import {MenuType} from "../Enums";
import Menu from "./Menu";
import Articles from "./Articles";

export default () => {
    const dispatch = useDispatch();

    // get the initial news items when the App component first loads
    useEffect(() => {
        dispatch(actions.updateNewsItems(MenuType.popular));
    }, [dispatch]);

    return (
        <div className="page">
            <Menu />
            <Articles />
            <Content />
        </div>
    );
};

