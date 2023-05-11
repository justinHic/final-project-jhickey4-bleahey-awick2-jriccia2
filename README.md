# CaDance

## Project Details:

**Contributors:**

Brendan Leahey (bleahey)

Justin Hickey (jhickey4)

Alex Wick (awick2)

Joey Ricciarduli (jriccia2)

**Git Repo Link:**
https://github.com/cs0320-s2023/final-project-jhickey4-bleahey-awick2-jriccia2

**Description:**
CaDance is a web application that allows users to create short queues of songs
that match up to their running cadence and estimated energy expenditure.

**Privacy/Use of Data:**
The application does not store any user data beyond temporary session data
stored in the local storage. This data is only used to provide a better user
experience and is not shared with any third parties.

**External Libraries:**
The application uses the Spotify API to search for songs and retrieve their
audio features. The application also uses the Spotify Web Playback SDK to play
songs from Spotify.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Table of Contents

- [Project Details](#project-details)
- [Getting Started](#getting-started)
  - [Running the application -- users](#running-the-application----users)
  - [Running the application -- developers](#running-the-application----developers)
- [Application Structure](#application-structure)
- [Testing](#testing)
  - [Unit tests](#unit-tests)
  - [Integration tests](#integration-tests)
  - [Running Tests](#running-tests)
- [Improvements](#improvements)
  - [Known Bugs](#known-bugs)
  - [Future Features](#future-features)

## Getting Started

### Prerequisites

A Spotify Premium account is required to use CaDance's services, as Spotify's web player feature is limited to Premium users.

### Running the application -- users

The application is [deployed on Vercel](https://cadance-deployment.vercel.app) and can be run on any device with a web browser.
The application is optimized for computers, but can be run on mobile devices with moderate performance as well.

Currently, this application is only available up to 25 users due to the
limitations of the Spotify API. If you are unable to access the application,
please contact one of the developers.

**Standard Mode**

The application begins in standard mode, which requires users to enter a target
cadence based on their perceived running pace on a metronome, and enter other
information used in calculating their energy expenditure.

**Watch Mode:**

The application also has a watch mode, which pairs with the
[CaDance for Garmin](https://github.com/cs0320-s2023/cadance-garmin-jhickey4-bleahey-awick2-jriccia2)
Application.

On the watch, users will have their cadence and energy expenditure calculated
for them. They can then enter this information into the web application.

**Generating a Queue:**

Once the user has entered their information, they can generate a queue of songs
by clicking the 'Find Songs' button. This will generate a queue of songs that
match the user's cadence and energy expenditure, and plays it in the browser
using the Spotify Web Playback SDK.

**Saving a Playlist**

Users can save their generated playlist by clicking the 'Save Playlist' button.
This will save the playlist to their Spotify account, and allow them to access
it in the future. The link to the playlist will be displayed on the screen.

### Running the application -- developers

To run the application locally, clone the repository and run the following
commands in the root directory of the project:

```
npm install
npm run dev
```

The application will be built and served on localhost:3000. Developers can
access the application at this address in their browser.

Informative logs will be displayed in the console.

## Application Structure

The application is built using [Next.js](https://nextjs.org/), a React framework
that allows for server-side rendering of React components.

This specifies the structure of the application, which is as follows:

- **pages** - contains the pages of the application, which are rendered server-side
  and sent to the client. These pages are rendered using React components.
  - **api** - contains the API routes of the application, which are used to
    communicate with the Spotify API. These routes are not rendered server-side,
    and are instead used to make requests to the Spotify API. This is equivalent
    to a standard backend in a server-based application.
- **public** - contains static files that are served to the client. This includes
  images, fonts, and other static files.
- **src** - contains the source code for the application. This includes the
  React components that make up the application, as well as the API routes
  that are used to communicate with the Spotify API.

## Testing

### Unit tests

Unit tests are available for the application, which confirm the functionality
of the application's core endpoints.

These include exchanging the authorization code for an access token, searching
for songs, and retrieving audio features for songs based on mocked data.

### Integration tests

We faced a roadblock in testing the application's integration with the Spotify API.
The main issue here is that to make queries to the Spotify API, we need to log in with
a valid Spotify Premium account. The way that we do this is by calling our `verify` API
endpoint, which redirects the user to a Spotify login page. Once the user logs in, they
are then redirected back to the webapp. When considering how to integration test, we
were unsure of how to login to Spotify in order to make our API calls. For that reason
we were only able to unit test our endpoints and mock the API responses from Spotify.

### Running Tests

Tests are provided in the '**tests**' directory of the project. To run tests,
run the following command in the root directory of the project:

```
npm run test
```

This will run all tests in the '**tests**' directory.

## Improvements

### Known Bugs

- The application does not work perfectly on Safari, as the Spotify Web Playback
  SDK is not supported on Safari. The application will still work, but the buttons
  on the player have little to no functionality.

### Future Features (?)
