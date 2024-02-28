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
        return "Returned Missionary"
    }
    else if (start_date < today) {
        return "Currently Serving"
    }
    else if (today < start_date) {
        return "Future Missionary"
    }
}

function sendEmail() {
    window.open('mailto:test@example.com?subject=subject&body=body');
}
