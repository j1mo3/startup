//const { response } = require("express");

function tabs(evt, tab_name){
    // Declare all variables
    var i, tabcontent, tablinks;
    
    // Get all elements with class="tab-content" and hide them
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tab-buttons");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", ""); 
    }
    
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tab_name).style.display = "flex";
    document.getElementById(tab_name).style.alignItems = "flex-start";
    evt.currentTarget.className += " active";
}

async function login(parentSelector) {
    //add login api when I get there

    // add check to make sure login is correct
    // add check to make sure all fields are complete
    const username = document.querySelector("#username");
    const password = document.querySelector("#password");

    try {
        document.querySelector(parentSelector).innerHTML = "";
    }
    catch {}
    if (username.value === "" || password.value === "") {
        const newChild = document.createElement('p');
        newChild.textContent = 'Username or Password is Incorrect';
      
        const parentElement = document.querySelector(parentSelector);
        parentElement.appendChild(newChild);  
        return false; 
    }

    postInformation = {
        username: username.value,
        password: password.value
    };

    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(postInformation)
    });
    
    if (response.ok) {
        const responseData = await response.json();
        localStorage.setItem("username", responseData['username']);
        window.location.href = "home.html";
    } else {
        console.error('Error:', response.statusText);
    }
    
}

async function signUp(parentSelector){
    //add api steps
    
    // add check to make sure login is correct
    // add check to make sure all fields are complete
    const username = document.querySelector("#username");
    const password = document.querySelector("#password");

    const first_name = document.querySelector("#first-name");
    const last_name = document.querySelector("#last-name");
    const mission_area = document.querySelector("#mission-area");

    const start_date = document.querySelector("#start-date");
    const end_date = document.querySelector("#end-date");
    const phone_number = document.querySelector("#phone-number");
    const gender = document.querySelector('.radio-flex');
    
    try {
        document.querySelector(parentSelector).innerHTML = "";
    }
    catch {

    }
    if (username.value === "" || password.value === "" || first_name.value === "" || last_name.value === "" || mission_area.value === "" || start_date.value === "" || end_date.value === "" || phone_number.value === "") {
        const newChild = document.createElement('p');
        newChild.textContent = 'A field was left blank';
      
        const parentElement = document.querySelector(parentSelector);
        parentElement.appendChild(newChild);  
        return false; 
    }

    startDate = new Date(start_date.value)
    endDate = new Date(end_date.value)

    if (startDate > endDate) {
        const newChild = document.createElement('p');
        newChild.textContent = 'Start date must be before end date';
      
        const parentElement = document.querySelector(parentSelector);
        parentElement.appendChild(newChild);  
        return false; 
    }

    accountInformation = {
        username: username.value,
        password: password.value,
        firstName: first_name.value,
        lastName: last_name.value,
        missionArea: mission_area.value,
        startDate: start_date.value,
        endDate: end_date.value,
        phoneNumber: phone_number.value,
        prefix: gender.value
    };

    const response = await fetch('/api/auth/create', {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(accountInformation)
    });
    account = await response.json();
    console.log(account);

    if (account['username'] !== null) {
        localStorage.setItem("username", username.value);
        window.location.href = "home.html";
    }
    
}

function getUsername() {
    return localStorage.getItem('username');
}

async function getName() {
    //return 'James Wilson';
    u = getUsername();
    const response = await fetch(`/api/account/${u}`);
    account = await response.json();
    return account['firstName'] + ' ' + account['lastName'];
    //return account['username'] ?? localStorage.getItem('username') ?? 'Unknown User';
}

async function getDate() {
    u = getUsername();
    const response = await fetch(`/api/account/${u}`);
    account = await response.json();
    text = await missionary_type(account['startDate'], account['endDate']);
    return text;
}

async function getCountry() {
    return 'USA';
    const response = await fetch(`/api/account?username=${getUsername()}`);
    account = await response.json();
    //return account['username'] ?? localStorage.getItem('username') ?? 'Unknown User';
}

async function missionary_type(start_date, end_date) {
    today = new Date();
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

async function getPosts(discussion) {
    //discussion name to id dictionary
    discussion_to_ids = {
        "introductions": "#introduce-yourself-discussion",
        "main": "#discussion-tab-discussion",
        "ask": "#ask-an-rm-discussion",
        "inspiration": "#inspiration-advice-discussion"
    };

    clearPosts(discussion);

    const response = await fetch(`/api/posts/${discussion}`);
    posts = await response.json();
    console.log(posts);
    
    for (let i = 0; i < posts.length; i++) {
        _post = posts[i];
        res = await fetch(`/api/account/${_post['username']}`);
        _account = await res.json();

        
        // buildPost(discussion_to_ids[discussion], _post['prefix'], _post['name'], _post['service_start'], _post['service_end'], _post['date'], _post['text']);
        await buildPost(discussion_to_ids[discussion], _account['prefix'], _account['firstName'], _account['lastName'], _account['startDate'], _account['endDate'], _post['date'], _post['text']);
    }
}

function clearPosts(discussion) {
    discussion_to_ids = {
        "introductions": "#introduce-yourself-discussion",
        "main": "#discussion-tab-discussion",
        "ask": "#ask-an-rm-discussion",
        "inspiration": "#inspiration-advice-discussion"
    };

    const divId = discussion_to_ids[discussion];
    const div = document.querySelector(divId);

    if (div) {
        div.innerHTML = '';
    }
}

//build a post on the front end
function buildPost(parent, prefix, firstName, lastName, service_start, service_end, date, text) {
    post_div = document.createElement('div');
    post_div.classList.add('post');
    parentElement = document.querySelector(parent);
    parentElement.appendChild(post_div);

    post_main_div = document.createElement('div');
    post_main_div.classList.add('post-main');
    post_div.appendChild(post_main_div);
    
    date_h6 = document.createElement('h6');
    date_h6.classList.add('date');
    date_h6.textContent = new Date(date).toDateString();
    post_main_div.appendChild(date_h6);

    comment_header_div = document.createElement('div');
    comment_header_div.classList.add('comment-header');
    post_main_div.appendChild(comment_header_div);

    mini_profile_div = document.createElement('div');
    mini_profile_div.classList.add('mini-profile');
    comment_header_div.appendChild(mini_profile_div);

    img = document.createElement("img");
    img.classList.add('img_profile_pic')
    img.src = 'static/profile-pic.png';
    img.style.width = '50px';
    
    mini_profile_div.appendChild(img);

    name_info_div = document.createElement('div');
    name_info_div.classList.add('name-info');
    comment_header_div.appendChild(name_info_div);

    name_h3 = document.createElement('h3');
    name_h3.classList.add('name');
    //name_h3.onclick = sendEmail();
    //name_h3.textContent = `${prefix} ${firstName} ${lastName}`
    name_h3.textContent = `${firstName} ${lastName}`
    name_info_div.appendChild(name_h3);

    service_start_h5 = document.createElement('h5');
    service_start_h5.classList.add('service-start');
    missionary_type(service_start, service_end).then(
        (m_type) => {
            service_start_h5.textContent = m_type;
            name_info_div.appendChild(service_start_h5);
        }
    )
    

    comment_text_p = document.createElement('p');
    comment_text_p.classList.add('comment-text');
    comment_text_p.innerHTML = text;
    post_main_div.appendChild(comment_text_p);

    comments_header_div = document.createElement('div');
    comments_header_div.classList.add('comments-header');
    post_main_div.appendChild(comments_header_div);

    comment_header_h6 = document.createElement('h6');
    comment_header_h6.classList.add('comment-label');
    comment_header_h6.textContent = 'Comments';
    comments_header_div.appendChild(comment_header_h6);

    add_comment_div = document.createElement('div');
    add_comment_div.classList.add('add-comment');
    comments_header_div.appendChild(add_comment_div);

    img = document.createElement("img");
    img.classList.add('add-comment-img');
    img.src = 'static/add-comment.svg';
    img.style.width = '15px';
    
    add_comment_div.appendChild(img);
}

async function makePost(discussion, input) {
    // const post_input = document.querySelector(input);
    // text = post_input.value.replace(/\r?\n/g, '<br>');

    // username = getUsername();
    // // response = await fetch(`/api/account/${username}`);
    // // account = await response.json();
    // postInformation = {
    //     discussion: discussion,
    //     username: username,
    //     date: new Date().toDateString(),
    //     text: text
    // };

    // const response = await fetch('/api/post', {
    //     method: 'POST',
    //     headers: {'content-type': 'application/json'},
    //     body: JSON.stringify(postInformation)
    // });
    // //c = await response.json();
    // console.log(response);
    
    // await getPosts(discussion)
    // //reset text box
    // post_input.value = '';

    const post_input = document.querySelector(input);
    text = post_input.value.replace(/\r?\n/g, '<br>');

    username = getUsername();

    postInformation = {
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
    post_input.value = '';

    console.log('EEEE');
    broadcastEvent(discussion, username, text);
}


async function getArea() {
    //this will eventually grab from database/local storage
    // const response = await fetch(`/api/account/${username}`);
    // account = await response.json();
    u = getUsername();
    const response = await fetch(`/api/account/${u}`);
    account = await response.json();
    console.log(account);
    return account['missionArea'];
}


function updateChat(){
    //websocket placeholder
    setInterval(() => {
    addChat('#introduce-yourself-discussion', 'Elder', 'static/profile-pic.png', 'James Wilson', '06-03-2024', '06-03-2026', '02-28-24', 'WebSocketTest');
    }, 10000);
}

async function displayQuote(country, object) {
    fetch(`https://restcountries.com/v3.1/name/${country}`)
        .then((response) => response.json())
        .then((jsonResponse) => {
          var subregion = jsonResponse[0].subregion;
          var capital = jsonResponse[0].capital[0];
          var border_num = (jsonResponse[0].borders).length;
          var sentence = `${country} borders ${border_num} countries and is located in ${subregion}. It's capital is ${capital}.`;
          const containerEl = document.querySelector(`#${object}`);
          containerEl.textContent = sentence;
        });
    }

// Functionality for peer communication using WebSocket

async function configureWebSocket() {
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
    console.log('WebSocket connection configured');

    socket.onopen = () => {
        console.log('WebSocket connection opened');
    };

    socket.onmessage = async (event) => {
        try {
            console.log('Message received:', event.data);
            const msg = JSON.parse(event.data);
            const response = await fetch(`/api/account/${msg.username}`);
            if (!response.ok) {
                throw new Error('Failed to fetch account data');
            }
            const account = await response.json();
            console.log('It made it here!');
            buildPost(msg.discussion, '', account['firstName'], account['lastName'], account['serviceStart'], account['serviceEnd'], msg.date, msg.text);
        } catch (error) {
            console.error('Error processing WebSocket message:', error);
        }
    };

    socket.onclose = (event) => {
        console.log('WebSocket connection closed:', event);
    };

    socket.onerror = (error) => {
        console.error('WebSocket error:', error);
    };
}
  //this posts something to websocket which can then be distributed
async function broadcastEvent(discussion, username, text) {
    const event = {
      discussion: discussion,
      username: username,
      text: text,
      date: new Date()
    };
    console.log(event);
    //socket.send(JSON.stringify(event));
    try {
        if (socket.readyState === WebSocket.OPEN) {
               console.log('It worked!');
               socket.send(JSON.stringify(event));
           } else {
               console.error('WebSocket is not open. ReadyState:', socket.readyState);
           }
    } catch (error) {
        console.error('Failed to send message:', error);
    }
    
  }

//   async function getPosts() {
//     let scores = [];
//     try {
//         // Get the latest high scores from the service
//         const response = await fetch('/missionary-connect-api/get-posts');
//         posts = await response.json();

//         // Save the scores in case we go offline in the future
//         localStorage.setItem('posts', JSON.stringify(posts));
//     } catch {
//         // If there was an error then just use the last saved scores
//         const scoresText = localStorage.getItem('posts');
//         if (scoresText) {
//         scores = JSON.parse(scoresText);
//         }
//     }
// }

// async function getLogin() {
//     try {
//         // Get the latest high scores from the service
//         const response = await fetch('/missionary-connect-api/get-login');
//         username = await response.json();

//         // Save the scores in case we go offline in the future
//         localStorage.setItem('username', JSON.stringify(username));
//     } catch {
//         // If there was an error then just use the last saved scores
//         const username = localStorage.getItem('username');
//     }
// }

