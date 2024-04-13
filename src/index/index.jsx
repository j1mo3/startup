import React from 'react';
import './index.css';

export function Index() {
  return (
    <main>
      <div className="seperator"></div>
        <div className="info-block">
            <div className="slogan">
                <h1 id="main-line">Connect with missionaries called to your area!</h1>
                <h2 id="second-line">Missionary Connect brings together newly called and seasoned missionaries, creating a community where you can share insights, advice, and the joy of serving.</h2>
            </div>
            <div id="world-img" className="info-box"><img src="static/missionary-globe.png" alt="globe-icon"/></div>
        </div>

        <div className="background">
            <div className="prospective-missionaries">
                <div className="mission-info">
                    <h1>For Prospective Missionaries</h1>
                    <p>You've grown a foot or two, and now you're going on a mission! Connect with fellow prospective missionaries and engage with those who have already served in the same area.</p>
                </div>
                <div className="mission-info">
                    <h1>For Returned Missionaries</h1>
                    <p>For those who have returned from the field, your mission was nothing short of extraordinary, filled with impactful experiences and inspiring stories. Get started today to share!</p>
                </div>
            </div>
        </div>

        <div className="line1">
            <h1 id="main-line">Join Today</h1>
            <li><a href="sign-up.html" className="button">Sign Up</a></li>
        </div>
    </main>
  );
}