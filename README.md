# James' Startup
Hello! This is my startup read me where I will be recording my entire journey!

## Specification Deliverable
### Elevator Pitch
Bees are awesome! Not only are they essential to our environment, but they’re a fascinating species that most of us don’t know that much about. While it would be awesome if we all could be beekeepers, time and space are an issue for so many people, especially busy college students—but no longer! MyHive is an online startup that allows anyone to start their own hive, produce honey, and compete against other players—all while learning more about bees on this educational platform. Built to be as realistic as possible, MyHive is not only fun but it also spreads the joy of beekeeping with the world! 
### Design
This is my design for the login page. It will look very similar to the home page, but won't be able to display personal information.

This is my main page that looks a lot like the login page. The action items are buttons you can press to perform an action around the hive. I plan to make this highly education and as accurate as possible. I will probably meet with a beekeeper to discuss what these actions should be to give the user the most accurate experience.

This is my leaderboard page which shows the top ten spots, decided by who has collected the most honey.

### Key Features

### Technologies
Here is how I'm going to use the required technologies:

- **HTML** - Correct use of common HTML best practices. Include three pages-- one for login, the main home screen, and the leaderboard. The leaderboard is included as a link on the home screen. Use html to add in images and designs that I build in Adobe illustrator.
- **CSS** - Styling that looks good no matter what device you are on. Impliment CSS best practices. CSS adds color and styling that makes the website feel good and look professional. 
- **JavaScript** - Handles login, and each action that the user can do to take care of the beehive. Also in charge of backend endpoint calls to handle how each action will affect population and health of the hive.
- **Service** - Backend service with endpoints for:
  - login
  - retrieving actions from the home page
  - submitting changes to hive data
- **DB/Login** - Stores user data which includes username, password, hive population, and hive health. Handles login information and controls leaderboard.
- **WebSocket** - As each user votes, their votes are broadcast to all other users.
- **React** - Application ported to use the React web framework. (for transparency this is the same as the example project)
