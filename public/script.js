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

function login(parentSelector){
    // add check to make sure login is correct
    // add check to make sure all fields are complete
    const username = document.querySelector("#username");
    const password = document.querySelector("#password");

    try {
        document.querySelector(parentSelector).innerHTML = "";
    }
    catch {
        
    }
    if (username.value === "" || password.value === "") {
        const newChild = document.createElement('p');
        newChild.textContent = 'Username or Password is Incorrect';
      
        const parentElement = document.querySelector(parentSelector);
        parentElement.appendChild(newChild);  
        return false; 
    }

    localStorage.setItem("username", username.value);
    localStorage.setItem("password", password.value);
    window.location.href = "home.html";
}

function getName() {
    return localStorage.getItem('username') ?? 'Unknown User';
}

function signUp(parentSelector){
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
    const gender = document.querySelector('.radio-flex')
    
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

    console.log(start_date.value)
    startDate = new Date(start_date.value)
    endDate = new Date(end_date.value)
    console.log(startDate)

    if (startDate > endDate) {
        const newChild = document.createElement('p');
        newChild.textContent = 'Start date must be before end date';
      
        const parentElement = document.querySelector(parentSelector);
        parentElement.appendChild(newChild);  
        return false; 
    }

    localStorage.setItem("username", username.value);
    localStorage.setItem("password", password.value);

    localStorage.setItem("first-name", first_name.value);
    localStorage.setItem("last-name", last_name.value);
    localStorage.setItem("mission-area", mission_area.value);
    localStorage.setItem("start-date", start_date.value);
    localStorage.setItem("end-date", end_date.value);
    localStorage.setItem("phone-number", phone_number.value);
    localStorage.setItem("gender", gender.value);

    window.location.href = "home.html";
}

function missionary_type(start, end) {
    today = new Date()
    start_date = new Date(start)
    end_date = new Date(end)

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

function sendEmail() {
    // window.open('mailto:test@example.com?subject=subject&body=body');
}

function post(page, input) {
    const post_input = document.querySelector(input);
    text = post_input.value.replace(/\r?\n/g, '<br>');

    newPost = {
        prefix: "Elder",
        firstName: "James",
        lastName: "Wilson",
        startDate: "06-03-24",
        endDate: "06-03-26",
        profileImg: "static/profile-pic.png",
        post: text
    };
    // placeholder for when I can use datebase information
    addChat(page, newPost["prefix"], newPost["profileImg"], newPost["firstName"] + ' ' + newPost["lastName"], newPost["startDate"], newPost["endDate"], new Date().toDateString(), newPost["post"]);

    post_input.value = ''
    
    if (page === '#introduce-yourself-discussion') {
        database.push(newPost)
    }
    if (page === '#discussion-tab-discussion') {
        database2.push(newPost)
    }
    if (page === '#ask-an-rm-discussion') {
        database3.push(newPost)
    }
    if (page === '#inspiration-advice-discussion') {
        database4.push(newPost)
    }
}

function addChat(page, prefix, img_src, name, service_start, service_end, date, chat) {
    post_div = document.createElement('div');
    post_div.classList.add('post');
    parentElement = document.querySelector(page);
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
    img.src = img_src;
    img.style.width = '50px';
    
    mini_profile_div.appendChild(img);

    name_info_div = document.createElement('div');
    name_info_div.classList.add('name-info');
    comment_header_div.appendChild(name_info_div);

    name_h3 = document.createElement('h3');
    name_h3.classList.add('name');
    name_h3.onclick = sendEmail();
    name_h3.textContent = prefix + ' ' + name
    name_info_div.appendChild(name_h3);

    service_start_h5 = document.createElement('h5');
    service_start_h5.classList.add('service-start');
    service_start_h5.textContent = missionary_type(service_start, service_end);
    name_info_div.appendChild(service_start_h5);

    comment_text_p = document.createElement('p');
    comment_text_p.classList.add('comment-text');
    console.log(chat);
    comment_text_p.innerHTML = chat;
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

    //add to placeholder database
    // newPost = {
    //     prefix: "Elder",
    //     firstName: "James",
    //     lastName: "Wilson",
    //     startDate: "06-03-24",
    //     endDate: "06-03-26",
    //     profileImg: "static/profile-pic.png",
    //     post: chat
    //   };
    
    // database.push(newPost);
    // console.log(database);
}

function addComment(post) {

}

function getArea() {
    //this will eventually grab from database/local storage
    return 'Tennessee Knoxville Mission';
}

function getCityInformation(city) {
    //this will eventually be my API call which is basic for now
    return 'The Tennessee Knoxville mission covers areas in Tennessee, Kentucky, North Carolina, South Carolina, and Georgia.';
}

function getChatLog(page) {
    //retrive chat information from database
    //placeholder for actual database information
    console.log('Clicked!');
    
    parentElement = document.querySelector(page);
    parentElement.innerHTML = ""

    if (page === '#introduce-yourself-discussion') {
        for (let i = 0, len = database.length; i < len; i++) {
            database[i]["Prefix"]
            addChat(page, database[i]["prefix"], database[i]["profileImg"], database[i]["firstName"] + ' ' + database[i]["lastName"], database[i]["startDate"], database[i]["endDate"], new Date().toDateString(), database[i]["post"]);
        }
    }
    if (page === '#discussion-tab-discussion') {
        for (let i = 0, len = database2.length; i < len; i++) {
            database2[i]["Prefix"]
            addChat(page, database2[i]["prefix"], database2[i]["profileImg"], database2[i]["firstName"] + ' ' + database2[i]["lastName"], database2[i]["startDate"], database2[i]["endDate"], new Date().toDateString(), database2[i]["post"]);
        }
    }
    if (page === '#ask-an-rm-discussion') {
        for (let i = 0, len = database3.length; i < len; i++) {
            database3[i]["Prefix"]
            addChat(page, database3[i]["prefix"], database3[i]["profileImg"], database3[i]["firstName"] + ' ' + database3[i]["lastName"], database3[i]["startDate"], database3[i]["endDate"], new Date().toDateString(), database3[i]["post"]);
        }
    }
    if (page === '#inspiration-advice-discussion') {
        for (let i = 0, len = database4.length; i < len; i++) {
            database[i]["Prefix"]
            addChat(page, database4[i]["prefix"], database4[i]["profileImg"], database4[i]["firstName"] + ' ' + database4[i]["lastName"], database4[i]["startDate"], database4[i]["endDate"], new Date().toDateString(), database4[i]["post"]);
        }
    }
    
    
}

function updateChat(){
    //retrive chat information here
    //websocket for when it can grab chats automatically
    //for now, refer to the set interval
}


setInterval(() => {
    addChat('#introduce-yourself-discussion', 'Elder', 'static/profile-pic.png', 'James Wilson', '06-03-2024', '06-03-2026', '02-28-24', 'WebSocketTest');
}, 10000);

const post1 = {
    prefix: "Elder",
    firstName: "James",
    lastName: "Wilson",
    startDate: "06-03-24",
    endDate: "06-03-26",
    profileImg: "static/profile-pic.png",
    post: "This is a sample post"
  };

database = [post1, post1, post1]
database2 = [post1, post1, post1]
database3 = [post1, post1, post1]
database4 = [post1, post1, post1]

async function displayQuote(country, object) {
    fetch(`https://restcountries.com/v3.1/name/${country}`)
        .then((response) => response.json())
        .then((jsonResponse) => {
          console.log(jsonResponse);
          var subregion = jsonResponse[0].subregion;
          var capital = jsonResponse[0].capital[0];
          var border_num = (jsonResponse[0].borders).length;
          console.log(subregion);
          console.log(capital);
          console.log(border_num);
          var sentence = `${country} borders ${border_num} countries and is located in ${subregion}. It's capital is ${capital}.`;
          const containerEl = document.querySelector(`#${object}`);
          containerEl.textContent = sentence;
        });
  }

  async function getPosts() {
    let scores = [];
    try {
        // Get the latest high scores from the service
        const response = await fetch('/missionary-connect-api/get-posts');
        posts = await response.json();

        // Save the scores in case we go offline in the future
        localStorage.setItem('posts', JSON.stringify(posts));
    } catch {
        // If there was an error then just use the last saved scores
        const scoresText = localStorage.getItem('posts');
        if (scoresText) {
        scores = JSON.parse(scoresText);
        }
    }
}

async function getLogin() {
    try {
        // Get the latest high scores from the service
        const response = await fetch('/missionary-connect-api/get-login');
        username = await response.json();

        // Save the scores in case we go offline in the future
        localStorage.setItem('username', JSON.stringify(username));
    } catch {
        // If there was an error then just use the last saved scores
        const username = localStorage.getItem('username');
    }
}