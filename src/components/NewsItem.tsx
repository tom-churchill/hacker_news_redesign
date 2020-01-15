import React from 'react';
import {INewsItem} from "../Interfaces";
import './NewsItem.scss';
import * as actions from "../store/Actions";
import {useDispatch, useSelector} from "react-redux";
import {IAppState} from "../store/Reducers";

export default (props: {newsItem: INewsItem}) => {
    const dispatch = useDispatch();

    const currentArticle = useSelector((state: IAppState) => {
        return state.currentArticle;
    });

    function onClick() {
        dispatch(actions.changeActiveNewsItem(props.newsItem));
    }

    let classes = "news-item";
    if (currentArticle?.id === props.newsItem.id) {
        classes += " active";
    }

    return (
        <div className={classes} onClick={onClick}>
            <div className="upvote"><div className="upvote-icon" /></div>
            <div>
                <div className="text">
                    {props.newsItem.title}
                </div>
                <div className="sub-text">
                    {props.newsItem.score} points by {props.newsItem.by}
                </div>
            </div>
        </div>
    );
};
