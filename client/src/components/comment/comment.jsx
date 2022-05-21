import React from 'react';
import './comment.scss';

function comment(props) {

    const timeDifference = (previous) => {

        var msPerMinute = 60 * 1000;
        var msPerHour = msPerMinute * 60;
        var msPerDay = msPerHour * 24;
        var msPerMonth = msPerDay * 30;
        var msPerYear = msPerDay * 365;
    
        var elapsed =  Math.round(Date.now() / 1000) - Math.round(previous/1000);
    
        if (elapsed < msPerMinute) {
             return Math.round(elapsed/1000) + ' seconds ago';   
        }
    
        else if (elapsed < msPerHour) {
             return Math.round(elapsed/msPerMinute) + ' minutes ago';   
        }
    
        else if (elapsed < msPerDay ) {
             return Math.round(elapsed/msPerHour ) + ' hours ago';   
        }
    
        else if (elapsed < msPerMonth) {
            return 'approximately ' + Math.round(elapsed/msPerDay) + ' days ago';   
        }
    
        else if (elapsed < msPerYear) {
            return 'approximately ' + Math.round(elapsed/msPerMonth) + ' months ago';   
        }
    
        else {
            return 'approximately ' + Math.round(elapsed/msPerYear ) + ' years ago';   
        }
    }

    return (
        <div className="comment">
            <img src={props.imgUrl} className="profileImg" alt="profileImg" />
            <div className="commentText">
                <h3>{props.name}</h3>
                <p> {props.comment} </p>
                <p className="timestamp">about {timeDifference(new Date(props.timeAgo).valueOf())}</p>
            </div>
        </div>
    )
}

export default comment
