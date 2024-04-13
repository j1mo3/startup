import React from 'react';
import './home.css';
import { Tabs } from './tabs';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";

export function Home() {
    const navigate = useNavigate();
    const [tabs, updateTabs] = useState('introductions');

    const [missionArea, updateMissionArea] = useState('Unknown Mission Area');
    const [missionDescription, updateMissionDescription] = useState('Serving for the Church of Jesus Christ of Latter-Day Saints');

    useEffect(() => {
        async function fetchData() {
            console.log('Here')
            try {
                const u = getUsername();
                if (u) {
                    const response = await fetch(`/api/account/${u}`);
                    const account = await response.json();
                    updateMissionArea(account['missionArea'])
                    const words = account['missionArea'].split(" ");
                    const country = words[0];
                    let sentence
                    sentence = await displayQuote(country);
                    if (sentence) {
                        updateMissionDescription(sentence);
                    }
                    
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, []); // Empty dependency array ensures this effect runs only once when component mounts

    
    async function displayQuote(country) {
        try {
            const response = await fetch(`https://restcountries.com/v3.1/name/${country}`);
            const jsonResponse = await response.json();
            const subregion = jsonResponse[0].subregion;
            const capital = jsonResponse[0].capital[0];
            const borderNum = jsonResponse[0].borders.length;
            const sentence = `${country} borders ${borderNum} countries and is located in ${subregion}. Its capital is ${capital}.`;
            return sentence;
        } catch (error) {
            return false;
        } 
    }

    function getUsername() {
        return localStorage.getItem('username');
    }

  return (
    <main>
        <div className="seperator"></div>

        <div className="info-block">
            <div className="slogan">
                <h1 className="main-line" id="area">{missionArea}</h1>
                <h2 className="second-line" id="description">{missionDescription}</h2>
            </div>
            <a href="about-my-mission.html"><div id="area-img" className="picture-box"><img src="mission-area.png" alt="mission-outline" /></div></a>  
        </div>

        <div className="tabs">
            <div className="tab-buttons" onClick={() => updateTabs('introductions')}>
                <h5 className="tab-text" id="introduce-yourself-button">Introduce Yourself</h5>
            </div>
            <div className="tab-buttons" onClick={() => updateTabs('main')}>
                <h5 className="tab-text" id="discussion-button">Discussion</h5>
            </div>
            <div className="tab-buttons" onClick={() => updateTabs('ask')}>
                <h5 className="tab-text" id="ask-an-rm-button">Ask an RM</h5>
            </div>
            <div className="tab-buttons" onClick={() => updateTabs('inspiration')}>
                <h5 className="tab-text" id="inspiration-advice-button">Inspiration/Advice</h5>
            </div>
        </div>

        <Tabs discussion={tabs} />

    </main>
  );
}
