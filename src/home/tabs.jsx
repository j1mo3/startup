import React from 'react';
import './home.css';
import { Posts } from './posts';
import { useEffect, useState } from "react";
import { PostNotifier } from './postNotifier';

export function Tabs(props) {
    const discussion = props.discussion;
    const textAreaId = `write-post-${discussion}`
    const discussionId = `${discussion}-discussion`

    const [username, updateUsername] = useState('Unknown User');
    const [name, updateName] = useState('Unknown Name');
    const [date, updateDate] = useState('Unknown Start');
    const [text, updateText] = useState('');

    let todayDateString = new Date().toDateString()
    const [todaysDate, updateTodaysDate] = useState(todayDateString);

    useEffect(() => {
        async function fetchData() {
            try {
                const u = getUsername();
                if (u) {
                    updateUsername(u);
                    const response = await fetch(`/api/account/${u}`);
                    const account = await response.json();
                    const fetchedName = account['firstName'] + ' ' + account['lastName'];
                    updateName(fetchedName);
                    const text = await missionary_type(account['startDate'], account['endDate']);
                    updateDate(text);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, []); // Empty dependency array ensures this effect runs only once when component mounts

    function getUsername() {
        return localStorage.getItem('username');
    }

    function missionary_type(start_date, end_date) {
        let today = new Date();
        start_date = new Date(start_date);
        end_date = new Date(end_date);
    
        if (end_date < today) {
            return "Service ended " + end_date.toDateString();
        }
        else if (start_date < today) {
            return "Serving since " + start_date.toDateString();
        }
        else if (today < start_date) {
            return "Service starts " + start_date.toDateString();
        }
    }

    async function makePost() {
        console.log('makePost() called')
        updateText(text.replace(/\r?\n/g, '<br>'));
        
        if (!username) {
            console.log('username')
            return false;
        } else {
            console.log(username)
        }
    
    
        let postInformation = {
            discussion: discussion,
            username: username,
            date: new Date().toDateString(),
            text: text
        };
    
        const response = await fetch('/api/post', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(postInformation)
        });
    
        //reset text box
        if (response.ok) {
            updateText('');
        }
    
        PostNotifier.broadcastEvent(discussion, username, text);
    }
  
    return (
    <div className="tab-content" id={discussion}>
        <div className="write-a-post">
            <div className="post-main">
                    <h6 className="today-date" id="create-post-date">{todaysDate}</h6>
                <div className="comment-header">
                    <div id="picture" className="mini-profile"><img width="50px" src="profile-pic.png" alt="profile picture" /></div>
                    <div className="name-info">
                        <h3 className="name display-name">{name}</h3>
                        <h5 className="service-start">{date}</h5>
                    </div>
                </div>
                <textarea type="text" id={textAreaId} placeholder="Say something..." onChange={(e) => updateText(e.target.value)}></textarea>
                <button type="submit" className="accent-button" onClick={makePost}>Post</button>                 
            </div>
        </div>

        <Posts discussion={discussion} />
    </div>
    );
}

// onClick="makePost({discussion}, {textAreaId})"