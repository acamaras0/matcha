# matcha

**Matcha**, the second to last project of Hive Helsinki's Web Branch, is a fullstack dating website I created using React for the front-end part and NodeJs with Express for the back-end. At the beginning of this project I was not familiar with either of these technologies so I took it as a challange to learn while doing. After a bit over 2 months of work, I got all the mandatory requirements done and I've got a good handle of React and NodeJs. Reflecting back on the time spent building this project, I realise how many things I would do differently and what are the areas I have improved over the time. It has been not easy, but I am proud of the outcome.

### Project description

_"This project introduces you to a more advanced tool for creating your web applications: the micro-framework. You will have to create, in the language of your choice, a dating site. Interactions between users will be at the very heart of the project!"_

### Keywords

- Micro-framework
- Advanced user accounts
- Real-time web
- Geolocation
- Security / Data validation

### Skills

- Security
- Web
- DB & Data

### Stack

- _Node JS (Express)_
- _React JS_
- _Materialize CSS and Bootstrap_
- _Maria DB_
- _JSON web tokens_
- _Axios for API requests_
- _Websockets (socket.io) for real-time notifications/messages_
- _IP Geolocation_


Matcha handles:
- User creation

![This is an image](https://github.com/acamaras0/matcha/blob/main/screenshots/1.png)

- Authentication using token

![This is an image](https://github.com/acamaras0/matcha/blob/main/screenshots/2.png)

- Pictures upload and profile picture upload
- Complete user profile page with gender, bio, location, interests details...
- User profile edition (password, details, preferences)
- Profiles discovery based on matching algorithm

![This is an image](https://github.com/acamaras0/matcha/blob/main/screenshots/6.png)


- Popularity score calculated for each user based on interactions with other profiles

![This is an image](https://github.com/acamaras0/matcha/blob/main/screenshots/3.png)


- Profiles search with filters (interests, age, popularity and location ranges...) with immediate update

![This is an image](https://github.com/acamaras0/matcha/blob/main/screenshots/5.png)


- Real-time notifications for likes, profile views and matches
- Real-time chat if two profiles match

![This is an image](https://github.com/acamaras0/matcha/blob/main/screenshots/4.png)

- User ability to block or report another profile
- Email notifications for authentication and password reset (with auth key)
- Change and reset of email/forgot password with ID validation
- Profile, pictures deletion and user DB cleanup
- Responsive design from mobile to desktop/tablet
- User input and upload checks (front/backend)
- Password hashing (Whirlpool)
- HTML/Javascript/SQL injections prevention

# Run Project

### Install packages/dependencies

To run the project, you will need to install Maria DB/ MySql and set the password and username of you DB in the .env file. 

- Node JS server -> `Port 8080`
- React app -> `Port 3000`
- MySQL Database -> `Port 3306`

You will also need to install some required packages and dependencies, in order to do so:

- Install backend packages/dependencies using command -> `npm i` inside the back folder.
- Install frontend packages/dependencies using command -> `npm i` inside the front folder.

### Start serves and website

Go in the back-end directory and do: `nodemon index.js`.
Go in the front-end directory and do: `npm start`.

Open the browser and go to `http://localhost:3000/`.
