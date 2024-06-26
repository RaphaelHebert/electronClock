# Alarm Clock

## Overview

This is a basic alarm clock desktop application made with electron React and SQLite3. It has been made for demo purposes. As so this project is more of a POC than a proper production-ready project. As well all the steps of packaging, deploying to production or running the project on different environments have not been taken into account. It might evolve depending on the available time.
The app displays an ["analogic" clock](###Analogic_Clock) as well as a [numeric clock](###Numeric_Clock), two different approaches have been taken to build these clocks.
The app gives the user to possibility to set-up alarms. [Alarms](###Alarms) are persisted in a SQLite3 local database.

## TODO

- refactor CSS for responsiveness
- harmonize the usage CSS and MUI components style
- error handling for db calls
- check if alarms are stale and clean-up on alarm fetching
- managing PRODUCTION and DEVELOPMENT environments
- fix ES module scope error in vitest
- pre-commit hook, lint and prettify

## 🛫 Quick Setup

```sh

# install dependency
npm install

# develop
npm run dev

# if better-sqlite3 is not correctly installed
npm run rebuild
```

## Implementation

### Analogic Clock

The analogic clock is based on CSS animations. The idea is to target better performance and use less resources.
The resulting animation looks like an analogic clock without making the react component rerendering

### Numeric Clock

The analogic clock is based on React rerenders. The idea is to leverage React library.
the result is a very neat and simple code ( vs the CSS ).
Thus it is easier to debug and test and more predictable.

### Alarms

#### Front-end

Alarms are displayed in the AlarmList component. From a UI point of view the component has two parts: a button that lets the user add new alarms and an alarm list that displays the coming alarms. To do so the component first retrieves the alarms from the database and then displays them as a list.

Every time the user adds or deletes an alarm the component refetches the alarm list from the database. This straightforward mechanism avoids complications that could happen with caching application's state and keeping it in sync with the db. This way the component always displays the data present in the database.

Once alarms are retrieved the component checks the time of each alarm and if the time is later than the actual time it sets up a JavaScript timer. That way the component just checks the time once and waits for the timeout(s) to complete. Another timeout is set up to update the component at the end of the day so the alarms that should repeat every day get their timeout renewed. For the alarms that do not mean to repeat, they are deleted upon user's alarm's acknowledgement (user's click the alarm modal)

#### Back-end

Alarms are stored in a very simple way each alarm has an id (string), a time (integer) and a repeat (boolean) field. The time is UNIX time in ms so it is easy to manipulate. The repeat is here so the user can set up daily alarms that are not depending on the date. Finaly the id of the alarm is mainly used to update and delete alarms as it is unique for every alarm.

## 📂 Directory structure

```tree
├── electron                                 Electron-related code
│   ├── main                                 Main-process source code
│   └── preload                              Preload-scripts source code
│
├── models                                  Connection to SQLite 3 database
│
├── public                                   Static assets
└── src                                      Renderer source code, React application
```

## IPC: Inter-Process-Communication Setup

IPC is a critical part of electron application because it lets the frontend part of the application leverage Node.js APIs. For this reason IPC should be handled with care to avoid security breaches.

## ❔ FAQ

- [C/C++ addons, Node.js modules - Pre-Bundling](https://github.com/electron-vite/vite-plugin-electron-renderer#dependency-pre-bundling)
- [dependencies vs devDependencies](https://github.com/electron-vite/vite-plugin-electron-renderer#dependencies-vs-devdependencies)

## Resources

- [electron-vite-react](https://github.com/electron-vite/electron-vite-react)
