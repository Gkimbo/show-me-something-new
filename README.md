<div align="center">

# within-reach ![NPM version](https://img.shields.io/badge/npm-v8.19.2-blue)

WithinReach is a location-based platform that instantly provides personalized recommendations for tailored places, events, and experiences; Eliminating the need for extensive searching. Integrated the Google Maps API into a React web app with a PostgreSQL database, using the Foundation front end along with custom CSS. API requests are made from the React frontend to the Express backend using the 'fetch' method, and third-party API requests are handled using the 'got' library on the backend.

</div>
<div align="left">

-   [🌱 Install](#-install)
-   [🚀 Features](#-features)
-   [📚 Examples](#-examples)

## 🌱 Install

Prerequisites

1. Install <a href="https://git-scm.com/book/en/v2/Getting-Started-First-Time-Git-Setup">Git</a> if you don't already have it.

2. Install yarn via npm

```bash
npm install --global yarn
```

3. Install <a href="https://www.postgresql.org/download/" >PostGreSQL</a>

4. Use Git to clone the repository

```bash
git clone https://github.com/Gkimbo/within-reach.git
```

5. Run yarn install

```bash
cd within-reach
yarn install
```

6. Create database with

```bash
createdb within-reach_development
```

7. Run migration with

```bash
yarn run migrate:latest
```

8. Create a `.env` file in the root of your project:
   Run in the terminal from your root project folder

```bash
touch .env
```

9. Copy the keys below into it and add your own api keys:

```dosini
SESSION_SECRET="YOURSECRETKEY"
API_NINJA_API_KEY=""
UNSPLASH_PHOTO_ACCESS_KEY=""
UNSPLASH_PHOTO_SECRET_KEY=""
```

You will also need the google maps api key as well!

10. Once you're done all that
    Launch the app

```bash
yarn run dev
```

11. Finally navigate to navigate to http://localhost:3000 in your browser and make sure you're getting the page!

## 🚀 Features

1. 'Landing Page' - When a user visits the website they will see the Landing page. This page will describe the App have form to sign in. Under the form is link to have the user sign-up.

2. 'Home Page' - When a logged in user visits the home page, they will be able to see 3 different features.

    - A button that when pressed will bring the user to a map with everything around them that might be of interest.
    - A list of Activities that the user can select that will bring the user to a map of places they can do that activity.
    - A Popular destinations list that has city names and pictures scrolling by, If the user selects a city it will tak them to a map of that city with their interest around that city.

3. 'Update Interests' - Users update their own interests at anytime. In the Navigation bar at the top of the page there is a button called "Update Interests" what will direct the user to a page that has a list of their interests and a form to the right to add new interests. - in the list of the users interest the user can click on an edit button to change that interest and a delet button to remove it.

    -The edit button will replace the Add new interest form with an edit form.
    -the user can always click a button under the edit form to return to the add interest form.

4. 'Map' - Users can navigate to any map from any page by first clicking the icon in the top left of the nav bar. This will bring the user to the home page where they can click on the "Click Me for things to do!" button and that will take them to a map with things around them. - On the map page there is a search bar at the top where the user can type in any city and see on the map their interests in that city.

    -Also on the map page the user will see a list of interesting things around them to the left of the map.
    -Clicking on one of the interests will expand it to show the user more information including the address of the interesting thing to do.

## 🌴 Manage Multiple Environments

</div>
