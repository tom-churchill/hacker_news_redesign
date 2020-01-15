import React from 'react';
import {useSelector} from "react-redux";
import {IAppState} from "../store/Reducers";
import './Content.scss';
import {Scrollbars} from "react-custom-scrollbars";
import {INewsItem} from "../Interfaces";

export default () => {
    const currentArticle = useSelector((state: IAppState) => {
        return state.currentArticle;
    });

    const comments = useSelector((state: IAppState) => {
        return state.comments;
    });

    const GetNewsItemContent = (article: INewsItem) => {
        // If you didn't trust Hacker News to be passing safe html you could sanitize the comment html
        // before using it
        return (
            <>
                <div className="info">
                    <div>
                        <a href={article.url}>{article.title}</a>
                    </div>
                </div>
                <div className="comments">
                    {
                        comments.map((comment, i) => {
                            return (
                                <div className="comment" key={i}>
                                    <div dangerouslySetInnerHTML={{__html: comment.text}} />
                                    <div className="sub-text">{comment.by}</div>
                                </div>
                            )
                        })
                    }
                    {
                        comments.length === 0 && (
                            <div className="no-comments">
                                No comments yet
                            </div>
                        )
                    }
                </div>
            </>
        );
    };

    return (
        <div className="content-panel">
            <Scrollbars>
                <div className="content">
                    {currentArticle !== null && GetNewsItemContent(currentArticle)}
                </div>
            </Scrollbars>
        </div>
    );
};
