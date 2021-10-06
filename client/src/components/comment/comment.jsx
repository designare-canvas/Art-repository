import React from 'react';
import './comment.scss';

function comment(props) {
    return (
        <div className="comment">
            <img src={props.imgUrl} className="profileImg" alt="profileImg" />
            <div className="commentText">
                <h3>{props.name}</h3>
                <p> {props.comment} </p>
                <p className="timestamp">about {props.timeAgo} hours</p>
            </div>
        </div>
    )
}

export default comment
