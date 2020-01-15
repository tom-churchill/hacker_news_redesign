import React from 'react';
import {useSelector} from "react-redux";
import {IAppState} from "../store/Reducers";
import NewsItem from "./NewsItem";
import './Articles.scss';
import {Scrollbars} from 'react-custom-scrollbars';

export default () => {
    const newsItems = useSelector((state: IAppState) => {
        return state.newsItems;
    });

    return (
        <div className="articles-panel">
            <Scrollbars>
                {
                    newsItems.map((newsItem, i) => {
                        return <NewsItem newsItem={newsItem} key={i} />
                    })
                }
            </Scrollbars>
        </div>
    );
};
