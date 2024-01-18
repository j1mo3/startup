# James' Startup
Hello! This is my startup read me where I will be recording my entire journey!

## Specification Deliverable
### Elevator Pitch
Bees are awesome! Not only are they essential to our environment, but they’re a fascinating species that most of us don’t know that much about. While it would be awesome if we all could be beekeepers, time and space are an issue for so many people, especially busy college students—but no longer! MyHive is an online startup that allows anyone to start their own hive, produce honey, and compete against other players—all while learning more about bees on this educational platform. Built to be as realistic as possible, MyHive is not only fun but it also spreads the joy of beekeeping with the world! 
### Design
This is my design for the login page. It will look very similar to the home page, but won't be able to display personal information.
![login screen](IMG_0324.jpg)

This is my main page that looks a lot like the login page. The action items are buttons you can press to perform an action around the hive. I plan to make this highly education and as accurate as possible. I will probably meet with a beekeeper to discuss what these actions should be to give the user the most accurate experience.

![home screen](IMG_0325.jpg)

This is my leaderboard page which shows the top ten spots, decided by who has collected the most honey.
![leaderboard screen](IMG_0326.jpg)

### Key Features

- Secure login over HTTPS
- View realtime date from your beehive and other players
- Ability to preform different actions that affect your hive population and health
- Display beehive animation
- Display total amount of bees, their health
- Ability to view leaderboard with real time data from other players

### Technologies
Here is how I'm going to use the required technologies:

- **HTML** - Correct use of common HTML best practices. Include three pages-- one for login, the main home screen, and the leaderboard. The leaderboard is included as a link on the home screen. Use html to add in images and designs that I build in Adobe illustrator.
- **CSS** - Styling that looks good no matter what device you are on. Impliment CSS best practices. CSS adds color and styling that makes the website feel good and look professional. 
- **JavaScript** - Handles login, and each action that the user can do to take care of the beehive. Also in charge of backend endpoint calls to handle how each action will affect population and health of the hive.
- **Service** - Backend service with endpoints for:
  - login
  - retrieving actions from the home page
  - submitting changes to hive data
- **Authentication** - Have a login page including username and password. This is authenticated by the database and then redirects the user to their personalized home screen with their hive data. 
- **DB/Login** - Stores user data which includes username, password, hive population, and hive health. Handles login information and controls leaderboard.
- **WebSocket** - As hive data changes, the leaderboard is constantly being updated. Each action will also change the hive population and health, which will reflect real time to the user and on the leaderboard.
- **React** - Application ported to use the React web framework. (for transparency this is the same as the example project)
