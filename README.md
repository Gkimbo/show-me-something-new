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
   Run in the terminal

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

'Categories List' - When users visit the home page of the website, they should be able to see the list of categories.
'Sign-Up/Sign-In' - Users can create an account and login to view the activities, activity details, and add personal reviews for activities.
'Activities List' - Users can navigate to different activities lists by choosing a category and clicking on the category name from the 'Categories List'.
'Activity Details' - Users can navigate to view details and reviews of an activity by clicking on the activity name.
'Add Reviews' - Users can leave reviews for the activity via the form on the 'Activity Details' page.
'Voting Button' - Users can up-vote or down-vote other user reviews of an activity.
'Review Rating' - Users can view the review ratings, which is calculated based on the total votes on the reviews.
'User Reviews List' - Users Navigate to a list of their personal activity reviews by clicking on the 'Edit/Delete Reviews' button, after the user has left a review on an activity.
'Edit Review' - Users can edit their previous reviews of an activity.
'Delete Review' - Users can delete their previous reviews of an activity.

## 🌴 Manage Multiple Environments

</div>
