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

1. Landing Page: When a user visits the website, they will see the landing page. This page will describe the app and have a form for signing in. Under the form, there is a link to allow the user to sign up.

2. In order to sign up the user will have to fill out all fields and pick at least on thing that interests them:

    - Once registered the user will be redirected to the home page.

3. Home Page: When a logged-in user visits the home page, they will be able to see three different features:

    - A button that, when pressed, will take the user to a map displaying points of interest around them.
    - A list of activities that the user can select. Upon selecting an activity, the user will be shown a map of places where they can engage in that activity.
    - A list of popular destinations with city names and scrolling pictures. If the user selects a city, they will be directed to a map of that city displaying their points of interest.

4. Update Interests: Users can update their interests at any time. In the navigation bar at the top of the page, there is a button called "Update Interests" that will direct the user to a page with a list of their interests and a form on the right to add new interests.

    - In the list of the user's interests, they can click on an edit button to modify that interest, and a delete button to remove it.
    - Clicking the edit button will replace the "Add New Interest" form with an edit form.
    - The user can always click a button under the edit form to return to the "Add Interest" form.

5. Map: Users can access any map from any page by clicking the icon in the top left of the navigation bar. This action will take the user to the home page, where they can click on the "Click Me for Things to Do!" button, leading them to a map displaying nearby points of interest.

    - On the map page, a search bar at the top allows the user to enter any city and view their points of interest on the map.
    - Additionally, the map page presents a list of interesting things around the user to the left of the map.
    - Clicking on one of the points of interest will expand its details, providing the user with more information, including the address of the attraction.

## 🌴 Manage Multiple Environments

</div>
