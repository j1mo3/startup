import React from 'react';
import './signup.css';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

export function SignUp() {

    const navigate = useNavigate();

    const [errorMsg, updateError] = useState('');

    const [username, updateUsername] = useState('');
    const [password, updatePassword] = useState('');
    const [firstName, updateFirstName] = useState('');
    const [lastName, updateLastName] = useState('');
    const [missionArea, updateMissionArea] = useState('Adriatic North Mission');
    const [_startDate, updateStartDate] = useState('');
    const [_endDate, updateEndDate] = useState('');
    const [phoneNumber, updatePhoneNumber] = useState('');
    const [gender, updateGender] = useState('Elder');

    async function createUser() {
        if (username === "" || password === "" || firstName === "" || lastName === "" || missionArea === "" || _startDate === "" || _endDate === "" || phoneNumber === "") {
            console.log(username)
            console.log(password)
            console.log(firstName)
            console.log(lastName)
            console.log(missionArea)
            console.log(_startDate)
            console.log(_endDate)
            console.log(phoneNumber)
            console.log(gender)

            updateError("A field was left blank");
            return false; 
        }
    
        let sD = new Date(_startDate);
        let eD = new Date(_endDate);
        if (sD > eD) {
            updateError('Start date must be before end date');
            return false; 
        }
        
        let accountInformation;
        accountInformation = {
            username: username,
            password: password,
            firstName: firstName,
            lastName: lastName,
            missionArea: missionArea,
            startDate: _startDate,
            endDate: _endDate,
            phoneNumber: phoneNumber,
            prefix: gender
        };

        let account;
        const response = await fetch('/api/auth/create', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(accountInformation)
        });
        account = await response.json();
    
        if (response.ok) {
            console.log(account);
            localStorage.setItem("username", username.value);
            navigate('/home')
        } else {
            console.log(account);
        }

    }

  return (
    <main>
    <div className="mainJSX">
      <div className="seperator"></div>
        <div className="_flexbox">
            <div id="world-img" className="login-img"><img src="missionary-globe.png" alt="globe-icon"/></div>
            <div className="container">

                <div className="form">
                    <label htmlFor="first-name">First Name</label>
                    <input type="text" id="first-name" placeholder="First Name" onChange={(e) => updateFirstName(e.target.value)}/>

                    <label htmlFor="last-name">Last Name</label>
                    <input type="text" id="last-name" placeholder="Last Name" onChange={(e) => updateLastName(e.target.value)}/>
                    
                    <label htmlFor="mission-area">Mission</label>
                    <select name="mission-area" id="mission-area" onChange={(e) => updateMissionArea(e.target.value)}> 
                        <option value="Adriatic North Mission">Adriatic North Mission</option>
                        <option value="Alabama Birmingham Mission">Alabama Birmingham Mission</option>
                        <option value="Alaska Anchorage Mission">Alaska Anchorage Mission</option>
                        <option value="Albania Tirana Mission">Albania Tirana Mission</option>
                        <option value="Alpine German Speaking Mission">Alpine German Speaking Mission</option>
                        <option value="Angola Luanda Mission">Angola Luanda Mission</option>
                        <option value="Argentina Bahía Blanca Mission">Argentina Bahía Blanca Mission</option>
                        <option value="Argentina Buenos Aires East Mission">Argentina Buenos Aires East Mission</option>
                        <option value="Argentina Buenos Aires North Mission">Argentina Buenos Aires North Mission</option>
                        <option value="Argentina Buenos Aires South Mission">Argentina Buenos Aires South Mission</option>
                        <option value="Argentina Buenos Aires West Mission">Argentina Buenos Aires West Mission</option>
                        <option value="Argentina Comodoro Rivadavia Mission">Argentina Comodoro Rivadavia Mission</option>
                        <option value="Argentina Córdoba Mission">Argentina Córdoba Mission</option>
                        <option value="Argentina Mendoza Mission">Argentina Mendoza Mission</option>
                        <option value="Argentina Neuquén Mission">Argentina Neuquén Mission</option>
                        <option value="Argentina Resistencia Mission">Argentina Resistencia Mission</option>
                        <option value="Argentina Rosario Mission">Argentina Rosario Mission</option>
                        <option value="Argentina Salta Mission">Argentina Salta Mission</option>
                        <option value="Argentina Santa Fe Mission">Argentina Santa Fe Mission</option>
                        <option value="Arizona Flagstaff Mission">Arizona Flagstaff Mission</option>
                        <option value="Arizona Gilbert Mission">Arizona Gilbert Mission</option>
                        <option value="Arizona Mesa Mission">Arizona Mesa Mission</option>
                        <option value="Arizona Phoenix Mission">Arizona Phoenix Mission</option>
                        <option value="Arizona Tempe Mission">Arizona Tempe Mission</option>
                        <option value="Arizona Tucson Mission">Arizona Tucson Mission</option>
                        <option value="Arkansas Bentonville Mission">Arkansas Bentonville Mission</option>
                        <option value="Arkansas Little Rock Mission">Arkansas Little Rock Mission</option>
                        <option value="Armenia/Georgia Mission">Armenia/Georgia Mission</option>
                        <option value="Australia Adelaide Mission">Australia Adelaide Mission</option>
                        <option value="Australia Brisbane Mission">Australia Brisbane Mission</option>
                        <option value="Australia Melbourne Mission">Australia Melbourne Mission</option>
                        <option value="Australia Perth Mission">Australia Perth Mission</option>
                        <option value="Australia Sydney Mission">Australia Sydney Mission</option>
                        <option value="Baltic States (Riga) Mission">Baltic States (Riga) Mission</option>
                        <option value="Barbados Bridgetown Mission">Barbados Bridgetown Mission</option>
                        <option value="Belgium/Netherlands Mission">Belgium/Netherlands Mission</option>
                        <option value="Benin Cotonou Mission">Benin Cotonou Mission</option>
                        <option value="Bolivia Cochabamba Mission">Bolivia Cochabamba Mission</option>
                        <option value="Bolivia La Paz Mission">Bolivia La Paz Mission</option>
                        <option value="Bolivia La Paz El Alto Mission">Bolivia La Paz El Alto Mission</option>
                        <option value="Bolivia Santa Cruz Mission">Bolivia Santa Cruz Mission</option>
                        <option value="Bolivia Santa Cruz North Mission">Bolivia Santa Cruz North Mission</option>
                        <option value="Botswana/Namibia Mission">Botswana/Namibia Mission</option>
                        <option value="Brazil Belém Mission">Brazil Belém Mission</option>
                        <option value="Brazil Belo Horizonte Mission">Brazil Belo Horizonte Mission</option>
                        <option value="Brazil Brasília Mission">Brazil Brasília Mission</option>
                        <option value="Brazil Campinas Mission">Brazil Campinas Mission</option>
                        <option value="Brazil Cuiabá Mission">Brazil Cuiabá Mission</option>
                        <option value="Brazil Curitiba Mission">Brazil Curitiba Mission</option>
                        <option value="Brazil Curitiba South Mission">Brazil Curitiba South Mission</option>
                        <option value="Brazil Feira de Santana Mission">Brazil Feira de Santana Mission</option>
                        <option value="Brazil Florianópolis Mission">Brazil Florianópolis Mission</option>
                        <option value="Brazil Fortaleza Mission">Brazil Fortaleza Mission</option>
                        <option value="Brazil Fortaleza East Mission">Brazil Fortaleza East Mission</option>
                        <option value="Brazil Goiânia Mission">Brazil Goiânia Mission</option>
                        <option value="Brazil João Pessoa Mission">Brazil João Pessoa Mission</option>
                        <option value="Brazil Juiz de Fora Mission">Brazil Juiz de Fora Mission</option>
                        <option value="Brazil Londrina Mission">Brazil Londrina Mission</option>
                        <option value="Brazil Maceió Mission">Brazil Maceió Mission</option>
                        <option value="Brazil Manaus Mission">Brazil Manaus Mission</option>
                        <option value="Brazil Natal Mission">Brazil Natal Mission</option>
                        <option value="Brazil Piracicaba Mission">Brazil Piracicaba Mission</option>
                        <option value="Brazil Porto Alegre North Mission">Brazil Porto Alegre North Mission</option>
                        <option value="Brazil Porto Alegre South Mission">Brazil Porto Alegre South Mission</option>
                        <option value="Brazil Recife North Mission">Brazil Recife North Mission</option>
                        <option value="Brazil Recife South Mission">Brazil Recife South Mission</option>
                        <option value="Brazil Ribeirão Preto Mission">Brazil Ribeirão Preto Mission</option>
                        <option value="Brazil Rio de Janeiro North Mission">Brazil Rio de Janeiro North Mission</option>
                        <option value="Brazil Rio de Janeiro South Mission">Brazil Rio de Janeiro South Mission</option>
                        <option value="Brazil Salvador Mission">Brazil Salvador Mission</option>
                        <option value="Brazil Santa Maria Mission">Brazil Santa Maria Mission</option>
                        <option value="Brazil Santos Mission">Brazil Santos Mission</option>
                        <option value="Brazil São Paulo East Mission">Brazil São Paulo East Mission</option>
                        <option value="Brazil São Paulo Interlagos Mission">Brazil São Paulo Interlagos Mission</option>
                        <option value="Brazil São Paulo North Mission">Brazil São Paulo North Mission</option>
                        <option value="Brazil São Paulo South Mission">Brazil São Paulo South Mission</option>
                        <option value="Brazil São Paulo West Mission">Brazil São Paulo West Mission</option>
                        <option value="Brazil Teresina Mission">Brazil Teresina Mission</option>
                        <option value="Brazil Vitória Mission">Brazil Vitória Mission</option>
                        <option value="Bulgaria/Greece Mission">Bulgaria/Greece Mission</option>
                        <option value="California Anaheim Mission">California Anaheim Mission</option>
                        <option value="California Arcadia Mission">California Arcadia Mission</option>
                        <option value="California Bakersfield Mission">California Bakersfield Mission</option>
                        <option value="California Fresno Mission">California Fresno Mission</option>
                        <option value="California Los Angeles Mission">California Los Angeles Mission</option>
                        <option value="California Newport Beach Mission">California Newport Beach Mission</option>
                        <option value="California Oakland-San Francisco Mission">California Oakland-San Francisco Mission</option>
                        <option value="California Riverside Mission">California Riverside Mission</option>
                        <option value="California Roseville Mission">California Roseville Mission</option>
                        <option value="California Sacramento Mission">California Sacramento Mission</option>
                        <option value="California San Bernardino Mission">California San Bernardino Mission</option>
                        <option value="California San Diego Mission">California San Diego Mission</option>
                        <option value="California San Jose Mission">California San Jose Mission</option>
                        <option value="California Santa Rosa Mission">California Santa Rosa Mission</option>
                        <option value="California Ventura Mission">California Ventura Mission</option>
                        <option value="Cambodia Phnom Penh Mission">Cambodia Phnom Penh Mission</option>
                        <option value="Cameroon Yaoundé Mission">Cameroon Yaoundé Mission</option>
                        <option value="Canada Calgary Mission">Canada Calgary Mission</option>
                        <option value="Canada Edmonton Mission">Canada Edmonton Mission</option>
                        <option value="Canada Montreal Mission">Canada Montreal Mission</option>
                        <option value="Canada Toronto Mission">Canada Toronto Mission</option>
                        <option value="Canada Vancouver Mission">Canada Vancouver Mission</option>
                        <option value="Canada Winnipeg Mission">Canada Winnipeg Mission</option>
                        <option value="Cape Verde Praia Mission">Cape Verde Praia Mission</option>
                        <option value="Chile Antofagasta Mission">Chile Antofagasta Mission</option>
                        <option value="Chile Concepción Mission">Chile Concepción Mission</option>
                        <option value="Chile Concepción South Mission">Chile Concepción South Mission</option>
                        <option value="Chile Puerto Montt Mission">Chile Puerto Montt Mission</option>
                        <option value="Chile Rancagua Mission">Chile Rancagua Mission</option>
                        <option value="Chile Santiago East Mission">Chile Santiago East Mission</option>
                        <option value="Chile Santiago North Mission">Chile Santiago North Mission</option>
                        <option value="Chile Santiago South Mission">Chile Santiago South Mission</option>
                        <option value="Chile Santiago West Mission">Chile Santiago West Mission</option>
                        <option value="Chile Viña del Mar Mission">Chile Viña del Mar Mission</option>
                        <option value="China Hong Kong Mission">China Hong Kong Mission</option>
                        <option value="Colombia Barranquilla Mission">Colombia Barranquilla Mission</option>
                        <option value="Colombia Bogotá North Mission">Colombia Bogotá North Mission</option>
                        <option value="Colombia Bogotá South Mission">Colombia Bogotá South Mission</option>
                        <option value="Colombia Cali Mission">Colombia Cali Mission</option>
                        <option value="Colombia Medellin Mission">Colombia Medellin Mission</option>
                        <option value="Colorado Colorado Springs Mission">Colorado Colorado Springs Mission</option>
                        <option value="Colorado Denver North Mission">Colorado Denver North Mission</option>
                        <option value="Colorado Denver South Mission">Colorado Denver South Mission</option>
                        <option value="Colorado Fort Collins Mission">Colorado Fort Collins Mission</option>
                        <option value="Costa Rica San José East Mission">Costa Rica San José East Mission</option>
                        <option value="Costa Rica San José West Mission">Costa Rica San José West Mission</option>
                        <option value="Cote d’Ivoire Abidjan East Mission">Cote d’Ivoire Abidjan East Mission</option>
                        <option value="Cote d’Ivoire Abidjan North Mission">Cote d’Ivoire Abidjan North Mission</option>
                        <option value="Cote d’Ivoire Abidjan West Mission">Cote d’Ivoire Abidjan West Mission</option>
                        <option value="Cote d’Ivoire Yamoussoukro Mission">Cote d’Ivoire Yamoussoukro Mission</option>
                        <option value="Czech/Slovak Mission">Czech/Slovak Mission</option>
                        <option value="Democratic Republic of the Congo Kananga Mission">Democratic Republic of the Congo Kananga Mission</option>     
                        <option value="Democratic Republic of the Congo Kinshasa East Mission">Democratic Republic of the Congo Kinshasa East Mission</option>
                        <option value="Democratic Republic of the Congo Kinshasa West Mission">Democratic Republic of the Congo Kinshasa West Mission</option>
                        <option value="Democratic Republic of the Congo Lubumbashi Mission">Democratic Republic of the Congo Lubumbashi Mission</option>
                        <option value="Democratic Republic of the Congo Mbuji-Mayi Mission">Democratic Republic of the Congo Mbuji-Mayi Mission</option>
                        <option value="Denmark Copenhagen Mission">Denmark Copenhagen Mission</option>
                        <option value="Dominican Republic Santiago Mission">Dominican Republic Santiago Mission</option>
                        <option value="Dominican Republic Santo Domingo East Mission">Dominican Republic Santo Domingo East Mission</option>
                        <option value="Dominican Republic Santo Domingo West Mission">Dominican Republic Santo Domingo West Mission</option>
                        <option value="Ecuador Guayaquil East Mission">Ecuador Guayaquil East Mission</option>
                        <option value="Ecuador Guayaquil North Mission">Ecuador Guayaquil North Mission</option>
                        <option value="Ecuador Guayaquil South Mission">Ecuador Guayaquil South Mission</option>
                        <option value="Ecuador Guayaquil West Mission">Ecuador Guayaquil West Mission</option>
                        <option value="Ecuador Quito Mission">Ecuador Quito Mission</option>
                        <option value="Ecuador Quito North Mission">Ecuador Quito North Mission</option>
                        <option value="El Salvador San Salvador East Mission">El Salvador San Salvador East Mission</option>
                        <option value="El Salvador San Salvador West/Belize Mission">El Salvador San Salvador West/Belize Mission</option>
                        <option value="El Salvador Santa Ana Mission">El Salvador Santa Ana Mission</option>
                        <option value="England Birmingham Mission">England Birmingham Mission</option>
                        <option value="England Bristol Mission">England Bristol Mission</option>
                        <option value="England Leeds Mission">England Leeds Mission</option>
                        <option value="England London Mission">England London Mission</option>
                        <option value="England Manchester Mission">England Manchester Mission</option>
                        <option value="Ethiopia Addis Ababa Mission">Ethiopia Addis Ababa Mission</option>
                        <option value="Fiji Suva Mission">Fiji Suva Mission</option>
                        <option value="Finland Helsinki Mission">Finland Helsinki Mission</option>
                        <option value="Florida Fort Lauderdale Mission">Florida Fort Lauderdale Mission</option>
                        <option value="Florida Jacksonville Mission">Florida Jacksonville Mission</option>
                        <option value="Florida Orlando Mission">Florida Orlando Mission</option>
                        <option value="Florida Tampa Mission">Florida Tampa Mission</option>
                        <option value="France Lyon Mission">France Lyon Mission</option>
                        <option value="France Paris Mission">France Paris Mission</option>
                        <option value="Georgia Atlanta Mission">Georgia Atlanta Mission</option>
                        <option value="Georgia Atlanta North Mission">Georgia Atlanta North Mission</option>
                        <option value="Germany Berlin Mission">Germany Berlin Mission</option>
                        <option value="Germany Frankfurt Mission">Germany Frankfurt Mission</option>
                        <option value="Ghana Accra Mission">Ghana Accra Mission</option>
                        <option value="Ghana Accra West Mission">Ghana Accra West Mission</option>
                        <option value="Ghana Cape Coast Mission">Ghana Cape Coast Mission</option>
                        <option value="Ghana Kumasi Mission">Ghana Kumasi Mission</option>
                        <option value="Guatemala Antigua Mission">Guatemala Antigua Mission</option>
                        <option value="Guatemala Coban Mission">Guatemala Coban Mission</option>
                        <option value="Guatemala Guatemala City Mission">Guatemala Guatemala City Mission</option>
                        <option value="Guatemala Guatemala City Central Mission">Guatemala Guatemala City Central Mission</option>
                        <option value="Guatemala Guatemala City East Mission">Guatemala Guatemala City East Mission</option>
                        <option value="Guatemala Quetzaltenango Mission">Guatemala Quetzaltenango Mission</option>
                        <option value="Guatemala Retalhuleu Mission">Guatemala Retalhuleu Mission</option>
                        <option value="Haiti Port-au-Prince Mission">Haiti Port-au-Prince Mission</option>
                        <option value="Hawaii Honolulu Mission">Hawaii Honolulu Mission</option>
                        <option value="Hawaii Laie Mission">Hawaii Laie Mission</option>
                        <option value="Honduras Comayagüela Mission">Honduras Comayagüela Mission</option>
                        <option value="Honduras San Pedro Sula East Mission">Honduras San Pedro Sula East Mission</option>
                        <option value="Honduras San Pedro Sula West Mission">Honduras San Pedro Sula West Mission</option>
                        <option value="Honduras Tegucigalpa Mission">Honduras Tegucigalpa Mission</option>
                        <option value="Hungary Mission">Hungary Mission</option>
                        <option value="Idaho Boise Mission">Idaho Boise Mission</option>
                        <option value="Idaho Idaho Falls Mission">Idaho Idaho Falls Mission</option>
                        <option value="Idaho Pocatello Mission">Idaho Pocatello Mission</option>
                        <option value="Illinois Chicago Mission">Illinois Chicago Mission</option>
                        <option value="India Bengaluru Mission">India Bengaluru Mission</option>
                        <option value="India New Delhi Mission">India New Delhi Mission</option>
                        <option value="Indiana Indianapolis Mission">Indiana Indianapolis Mission</option>
                        <option value="Indonesia Jakarta Mission">Indonesia Jakarta Mission</option>
                        <option value="Iowa Iowa City Mission">Iowa Iowa City Mission</option>
                        <option value="Italy Milan Mission">Italy Milan Mission</option>
                        <option value="Italy Rome Mission">Italy Rome Mission</option>
                        <option value="Jamaica Kingston Mission">Jamaica Kingston Mission</option>
                        <option value="Japan Fukuoka Mission">Japan Fukuoka Mission</option>
                        <option value="Japan Kobe Mission">Japan Kobe Mission</option>
                        <option value="Japan Nagoya Mission">Japan Nagoya Mission</option>
                        <option value="Japan Sapporo Mission">Japan Sapporo Mission</option>
                        <option value="Japan Tokyo North Mission">Japan Tokyo North Mission</option>
                        <option value="Japan Tokyo South Mission">Japan Tokyo South Mission</option>
                        <option value="Kansas Wichita Mission">Kansas Wichita Mission</option>
                        <option value="Kentucky Louisville Mission">Kentucky Louisville Mission</option>
                        <option value="Kenya Nairobi Mission">Kenya Nairobi Mission</option>
                        <option value="Korea Busan Mission">Korea Busan Mission</option>
                        <option value="Korea Seoul Mission">Korea Seoul Mission</option>
                        <option value="Korea Seoul South Mission">Korea Seoul South Mission</option>
                        <option value="Liberia Monrovia Mission">Liberia Monrovia Mission</option>
                        <option value="Louisiana Baton Rouge Mission">Louisiana Baton Rouge Mission</option>
                        <option value="Madagascar Antananarivo Mission">Madagascar Antananarivo Mission</option>
                        <option value="Marshall Islands/Kiribati Mission">Marshall Islands/Kiribati Mission</option>
                        <option value="Maryland Baltimore Mission">Maryland Baltimore Mission</option>
                        <option value="Massachusetts Boston Mission">Massachusetts Boston Mission</option>
                        <option value="Mexico Aguascalientes Mission">Mexico Aguascalientes Mission</option>
                        <option value="Mexico Cancun Mission">Mexico Cancun Mission</option>
                        <option value="Mexico Chihuahua Mission">Mexico Chihuahua Mission</option>
                        <option value="Mexico Ciudad Juarez Mission">Mexico Ciudad Juarez Mission</option>
                        <option value="Mexico Cuernavaca Mission">Mexico Cuernavaca Mission</option>
                        <option value="Mexico Culiacán Mission">Mexico Culiacán Mission</option>
                        <option value="Mexico Guadalajara Mission">Mexico Guadalajara Mission</option>
                        <option value="Mexico Guadalajara East Mission">Mexico Guadalajara East Mission</option>
                        <option value="Mexico Hermosillo Mission">Mexico Hermosillo Mission</option>
                        <option value="Mexico Mérida Mission">Mexico Mérida Mission</option>
                        <option value="Mexico Mexico City Chalco Mission">Mexico Mexico City Chalco Mission</option>
                        <option value="Mexico Mexico City East Mission">Mexico Mexico City East Mission</option>
                        <option value="Mexico Mexico City North Mission">Mexico Mexico City North Mission</option>
                        <option value="Mexico Mexico City Northwest Mission">Mexico Mexico City Northwest Mission</option>
                        <option value="Mexico Mexico City South Mission">Mexico Mexico City South Mission</option>
                        <option value="Mexico Mexico City Southeast Mission">Mexico Mexico City Southeast Mission</option>
                        <option value="Mexico Mexico City West Mission">Mexico Mexico City West Mission</option>
                        <option value="Mexico Monterrey East Mission">Mexico Monterrey East Mission</option>
                        <option value="Mexico Monterrey West Mission">Mexico Monterrey West Mission</option>
                        <option value="Mexico Oaxaca Mission">Mexico Oaxaca Mission</option>
                        <option value="Mexico Pachuca Mission">Mexico Pachuca Mission</option>
                        <option value="Mexico Puebla North Mission">Mexico Puebla North Mission</option>
                        <option value="Mexico Puebla South Mission">Mexico Puebla South Mission</option>
                        <option value="Mexico Queretaro Mission">Mexico Queretaro Mission</option>
                        <option value="Mexico Saltillo Mission">Mexico Saltillo Mission</option>
                        <option value="Mexico Tampico Mission">Mexico Tampico Mission</option>
                        <option value="Mexico Tijuana Mission">Mexico Tijuana Mission</option>
                        <option value="Mexico Torreón Mission">Mexico Torreón Mission</option>
                        <option value="Mexico Tuxtla Gutierrez Mission">Mexico Tuxtla Gutierrez Mission</option>
                        <option value="Mexico Veracruz Mission">Mexico Veracruz Mission</option>
                        <option value="Mexico Villahermosa Mission">Mexico Villahermosa Mission</option>
                        <option value="Mexico Xalapa Mission">Mexico Xalapa Mission</option>
                        <option value="Michigan Detroit Mission">Michigan Detroit Mission</option>
                        <option value="Michigan Lansing Mission">Michigan Lansing Mission</option>
                        <option value="Micronesia Guam Mission">Micronesia Guam Mission</option>
                        <option value="Minnesota Minneapolis Mission">Minnesota Minneapolis Mission</option>
                        <option value="Missouri Independence Mission">Missouri Independence Mission</option>
                        <option value="Missouri St. Louis Mission">Missouri St. Louis Mission</option>
                        <option value="Mongolia Ulaanbaatar Mission">Mongolia Ulaanbaatar Mission</option>
                        <option value="Montana Billings Mission">Montana Billings Mission</option>
                        <option value="Mozambique Beira Mission">Mozambique Beira Mission</option>
                        <option value="Mozambique Maputo Mission">Mozambique Maputo Mission</option>
                        <option value="Nebraska Omaha Mission">Nebraska Omaha Mission</option>
                        <option value="Nevada Las Vegas Mission">Nevada Las Vegas Mission</option>
                        <option value="Nevada Las Vegas West Mission">Nevada Las Vegas West Mission</option>
                        <option value="Nevada Reno Mission">Nevada Reno Mission</option>
                        <option value="New Hampshire Manchester Mission">New Hampshire Manchester Mission</option>
                        <option value="New Jersey Morristown Mission">New Jersey Morristown Mission</option>
                        <option value="New Mexico Albuquerque Mission">New Mexico Albuquerque Mission</option>
                        <option value="New Mexico Farmington Mission">New Mexico Farmington Mission</option>
                        <option value="New York New York Mission">New York New York Mission</option>
                        <option value="New York Syracuse Mission">New York Syracuse Mission</option>
                        <option value="New Zealand Auckland Mission">New Zealand Auckland Mission</option>
                        <option value="New Zealand Hamilton Mission">New Zealand Hamilton Mission</option>
                        <option value="New Zealand Wellington Mission">New Zealand Wellington Mission</option>
                        <option value="Nicaragua Managua North Mission">Nicaragua Managua North Mission</option>
                        <option value="Nicaragua Managua South Mission">Nicaragua Managua South Mission</option>
                        <option value="Nigeria Aba Mission">Nigeria Aba Mission</option>
                        <option value="Nigeria Abuja Mission">Nigeria Abuja Mission</option>
                        <option value="Nigeria Benin City Mission">Nigeria Benin City Mission</option>
                        <option value="Nigeria Enugu Mission">Nigeria Enugu Mission</option>
                        <option value="Nigeria Ibadan Mission">Nigeria Ibadan Mission</option>
                        <option value="Nigeria Lagos Mission">Nigeria Lagos Mission</option>
                        <option value="Nigeria Owerri Mission">Nigeria Owerri Mission</option>
                        <option value="Nigeria Port Harcourt Mission">Nigeria Port Harcourt Mission</option>
                        <option value="Nigeria Uyo Mission">Nigeria Uyo Mission</option>
                        <option value="North Carolina Charlotte Mission">North Carolina Charlotte Mission</option>
                        <option value="North Carolina Raleigh Mission">North Carolina Raleigh Mission</option>
                        <option value="North Dakota Bismarck Mission">North Dakota Bismarck Mission</option>
                        <option value="Norway Oslo Mission">Norway Oslo Mission</option>
                        <option value="Ohio Cincinnati Mission">Ohio Cincinnati Mission</option>
                        <option value="Ohio Columbus Mission">Ohio Columbus Mission</option>
                        <option value="Oklahoma Oklahoma City Mission">Oklahoma Oklahoma City Mission</option>
                        <option value="Oregon Eugene Mission">Oregon Eugene Mission</option>
                        <option value="Oregon Portland Mission">Oregon Portland Mission</option>
                        <option value="Oregon Salem Mission">Oregon Salem Mission</option>
                        <option value="Pakistan (Service) Mission">Pakistan (Service) Mission</option>
                        <option value="Panamá Panamá City Mission">Panamá Panamá City Mission</option>
                        <option value="Papua New Guinea Lae Mission">Papua New Guinea Lae Mission</option>
                        <option value="Papua New Guinea Port Moresby Mission">Papua New Guinea Port Moresby Mission</option>
                        <option value="Paraguay Asunción Mission">Paraguay Asunción Mission</option>
                        <option value="Paraguay Asunción North Mission">Paraguay Asunción North Mission</option>
                        <option value="Pennsylvania Philadelphia Mission">Pennsylvania Philadelphia Mission</option>
                        <option value="Pennsylvania Pittsburgh Mission">Pennsylvania Pittsburgh Mission</option>
                        <option value="Peru Arequipa Mission">Peru Arequipa Mission</option>
                        <option value="Peru Chiclayo Mission">Peru Chiclayo Mission</option>
                        <option value="Peru Cusco Mission">Peru Cusco Mission</option>
                        <option value="Peru Huancayo Mission">Peru Huancayo Mission</option>
                        <option value="Peru Iquitos Mission">Peru Iquitos Mission</option>
                        <option value="Peru Lima Central Mission">Peru Lima Central Mission</option>
                        <option value="Peru Lima East Mission">Peru Lima East Mission</option>
                        <option value="Peru Lima North Mission">Peru Lima North Mission</option>
                        <option value="Peru Lima South Mission">Peru Lima South Mission</option>
                        <option value="Peru Lima West Mission">Peru Lima West Mission</option>
                        <option value="Peru Limatambo Mission">Peru Limatambo Mission</option>
                        <option value="Peru Piura Mission">Peru Piura Mission</option>
                        <option value="Peru Trujillo North Mission">Peru Trujillo North Mission</option>
                        <option value="Peru Trujillo South Mission">Peru Trujillo South Mission</option>
                        <option value="Philippines Angeles Mission">Philippines Angeles Mission</option>
                        <option value="Philippines Antipolo Mission">Philippines Antipolo Mission</option>
                        <option value="Philippines Bacolod Mission">Philippines Bacolod Mission</option>
                        <option value="Philippines Baguio Mission">Philippines Baguio Mission</option>
                        <option value="Philippines Butuan Mission">Philippines Butuan Mission</option>
                        <option value="Philippines Cabanatuan Mission">Philippines Cabanatuan Mission</option>
                        <option value="Philippines Cagayan De Oro Mission">Philippines Cagayan De Oro Mission</option>
                        <option value="Philippines Cauayan Mission">Philippines Cauayan Mission</option>
                        <option value="Philippines Cavite Mission">Philippines Cavite Mission</option>
                        <option value="Philippines Cebu Mission">Philippines Cebu Mission</option>
                        <option value="Philippines Cebu East Mission">Philippines Cebu East Mission</option>
                        <option value="Philippines Davao Mission">Philippines Davao Mission</option>
                        <option value="Philippines Iloilo Mission">Philippines Iloilo Mission</option>
                        <option value="Philippines Laoag Mission">Philippines Laoag Mission</option>
                        <option value="Philippines Legazpi Mission">Philippines Legazpi Mission</option>
                        <option value="Philippines Manila Mission">Philippines Manila Mission</option>
                        <option value="Philippines Naga Mission">Philippines Naga Mission</option>
                        <option value="Philippines Olongapo Mission">Philippines Olongapo Mission</option>
                        <option value="Philippines Quezon City Mission">Philippines Quezon City Mission</option>
                        <option value="Philippines Quezon City North Mission">Philippines Quezon City North Mission</option>
                        <option value="Philippines San Pablo Mission">Philippines San Pablo Mission</option>
                        <option value="Philippines Tacloban Mission">Philippines Tacloban Mission</option>
                        <option value="Philippines Urdaneta Mission">Philippines Urdaneta Mission</option>
                        <option value="Poland Warsaw Mission">Poland Warsaw Mission</option>
                        <option value="Portugal Lisbon Mission">Portugal Lisbon Mission</option>
                        <option value="Puerto Rico San Juan Mission">Puerto Rico San Juan Mission</option>
                        <option value="Republic of Congo Brazzaville Mission">Republic of Congo Brazzaville Mission</option>
                        <option value="Romania Bucharest Mission">Romania Bucharest Mission</option>
                        <option value="Russia Moscow Mission">Russia Moscow Mission</option>
                        <option value="Russia Novosibirsk Mission">Russia Novosibirsk Mission</option>
                        <option value="Russia Yekaterinburg Mission">Russia Yekaterinburg Mission</option>
                        <option value="Rwanda Kigali Mission">Rwanda Kigali Mission</option>
                        <option value="Samoa Apia Mission">Samoa Apia Mission</option>
                        <option value="Scotland/Ireland Mission">Scotland/Ireland Mission</option>
                        <option value="Sierra Leone Freetown Mission">Sierra Leone Freetown Mission</option>
                        <option value="Singapore Mission">Singapore Mission</option>
                        <option value="South Africa Cape Town Mission">South Africa Cape Town Mission</option>
                        <option value="South Africa Durban Mission">South Africa Durban Mission</option>
                        <option value="South Africa Johannesburg Mission">South Africa Johannesburg Mission</option>
                        <option value="South Africa Pretoria Mission">South Africa Pretoria Mission</option>
                        <option value="South Carolina Columbia Mission">South Carolina Columbia Mission</option>
                        <option value="Spain Barcelona Mission">Spain Barcelona Mission</option>
                        <option value="Spain Madrid North Mission">Spain Madrid North Mission</option>
                        <option value="Spain Madrid South Mission">Spain Madrid South Mission</option>
                        <option value="Sweden Stockholm Mission">Sweden Stockholm Mission</option>
                        <option value="Tahiti Papeete Mission">Tahiti Papeete Mission</option>
                        <option value="Taiwan Taichung Mission">Taiwan Taichung Mission</option>
                        <option value="Taiwan Taipei Mission">Taiwan Taipei Mission</option>
                        <option value="Tanzania Dar es Salaam Mission">Tanzania Dar es Salaam Mission</option>
                        <option value="Tennessee Knoxville Mission">Tennessee Knoxville Mission</option>
                        <option value="Tennessee Nashville Mission">Tennessee Nashville Mission</option>
                        <option value="Texas Austin Mission">Texas Austin Mission</option>
                        <option value="Texas Dallas East Mission">Texas Dallas East Mission</option>
                        <option value="Texas Dallas West Mission">Texas Dallas West Mission</option>
                        <option value="Texas Fort Worth Mission">Texas Fort Worth Mission</option>
                        <option value="Texas Houston Mission">Texas Houston Mission</option>
                        <option value="Texas Houston East Mission">Texas Houston East Mission</option>
                        <option value="Texas Houston South Mission">Texas Houston South Mission</option>
                        <option value="Texas Lubbock Mission">Texas Lubbock Mission</option>
                        <option value="Texas McAllen Mission">Texas McAllen Mission</option>
                        <option value="Texas San Antonio Mission">Texas San Antonio Mission</option>
                        <option value="Thailand Bangkok Mission">Thailand Bangkok Mission</option>
                        <option value="Tonga Nukuʻalofa Mission">Tonga Nukuʻalofa Mission</option>
                        <option value="Trinidad Port of Spain Mission">Trinidad Port of Spain Mission</option>
                        <option value="Uganda Kampala Mission">Uganda Kampala Mission</option>
                        <option value="Ukraine Dnipro Mission">Ukraine Dnipro Mission</option>
                        <option value="Ukraine Kyiv/Moldova Mission">Ukraine Kyiv/Moldova Mission</option>
                        <option value="Uruguay Montevideo Mission">Uruguay Montevideo Mission</option>
                        <option value="Uruguay Montevideo West Mission">Uruguay Montevideo West Mission</option>
                        <option value="Utah Layton Mission">Utah Layton Mission</option>
                        <option value="Utah Ogden Mission">Utah Ogden Mission</option>
                        <option value="Utah Orem Mission">Utah Orem Mission</option>
                        <option value="Utah Provo Mission">Utah Provo Mission</option>
                        <option value="Utah Salt Lake City Mission">Utah Salt Lake City Mission</option>
                        <option value="Utah Salt Lake City South Mission">Utah Salt Lake City South Mission</option>
                        <option value="Utah Salt Lake City Temple Square Mission">Utah Salt Lake City Temple Square Mission</option>
                        <option value="Utah Salt Lake City West Mission">Utah Salt Lake City West Mission</option>
                        <option value="Utah St. George Mission">Utah St. George Mission</option>
                        <option value="Vanuatu Port Vila Mission">Vanuatu Port Vila Mission</option>
                        <option value="Venezuela Barcelona Mission">Venezuela Barcelona Mission</option>
                        <option value="Venezuela Caracas Mission">Venezuela Caracas Mission</option>
                        <option value="Venezuela Maracaibo Mission">Venezuela Maracaibo Mission</option>
                        <option value="Venezuela Valencia Mission">Venezuela Valencia Mission</option>
                        <option value="Vietnam Mission">Vietnam Mission</option>
                        <option value="Virginia Richmond Mission">Virginia Richmond Mission</option>
                        <option value="Washington DC North Mission">Washington DC North Mission</option>
                        <option value="Washington DC South Mission">Washington DC South Mission</option>
                        <option value="Washington Everett Mission">Washington Everett Mission</option>
                        <option value="Washington Kennewick Mission">Washington Kennewick Mission</option>
                        <option value="Washington Seattle Mission">Washington Seattle Mission</option>
                        <option value="Washington Spokane Mission">Washington Spokane Mission</option>
                        <option value="Washington Tacoma Mission">Washington Tacoma Mission</option>
                        <option value="Washington Vancouver Mission">Washington Vancouver Mission</option>
                        <option value="Washington Yakima Mission">Washington Yakima Mission</option>
                        <option value="West Virginia Charleston Mission">West Virginia Charleston Mission</option>
                        <option value="Wisconsin Milwaukee Mission">Wisconsin Milwaukee Mission</option>
                        <option value="Zambia Lusaka Mission">Zambia Lusaka Mission</option>
                        <option value="Zimbabwe Bulawayo Mission">Zimbabwe Bulawayo Mission</option>
                        <option value="Zimbabwe Harare Mission">Zimbabwe Harare Mission</option>
                    </select>
                
                    <label htmlFor="start-date">Start Date</label>
                    <input type="date" id="start-date" onChange={(e) => updateStartDate(e.target.value)}/>

                    <label htmlFor="end-date">End Date</label>
                    <input type="date" id="end-date" onChange={(e) => updateEndDate(e.target.value)}/>
                    
                    <label htmlFor="phone-number">Phone Number</label>
                    <input type="tel" id="phone-number" placeholder="Phone Number" onChange={(e) => updatePhoneNumber(e.target.value)}/>

                    <div className="radio-flex">
                        <label htmlFor="elder">Elder</label>
                        <input type="radio" id="elder" name="gender" value="elder" checked={gender === "Elder"} onChange={(e) => updateGender("Elder")}/>

                        <label htmlFor="sister">Sister</label>
                        <input type="radio" id="sister" name="gender" value="sister" onChange={(e) => updateGender("Sister")}/>
                    </div>
                    <br/>

                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" placeholder="Username" onChange={(e) => updateUsername(e.target.value)}/>
                    <div className="username-taken"></div>

                    <label htmlFor="password">Password</label>
                    <input type="text" id="password" placeholder="Password" onChange={(e) => updatePassword(e.target.value)}/>

                    <button className="accent-button" onClick={createUser}>Sign Up</button>
                </div>
                <div className="error-statement"><p>{errorMsg}</p></div>
            </div>
        </div>
    </div>
    </main>
  );
}