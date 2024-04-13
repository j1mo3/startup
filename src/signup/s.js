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