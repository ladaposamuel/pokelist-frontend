# PokeList Organisation App

Welcome to the PokeList Organisation App.

## Getting Started

1. Clone the repo
2. Run `npm install`
3. Run `npm start`
4. Open [http://localhost:3001](http://localhost:3001) to view it in the browser (or use the provided .env file to set the API URL, I used 3001 so backend can use 3000)

## Screenshots

Register Page
![alt text](https://i.imgur.com/V4g8dUA.png)

Login Page
![alt text](https://i.imgur.com/Wqpqhcq.png)

Home Page (Logged In)

![alt text](https://i.imgur.com/NRxAqc9.png)

Home Page (Logged Out)

![alt text](https://i.imgur.com/Yy0CRDF.png)

Dashboard Page
![alt text](https://i.imgur.com/bsdGyjU.png)

## Notes

This is a simple React app I built using the create-react-app template, along with react-router for handling navigation and react-bootstrap for styling components. The app features a custom context provider to manage the user's token, user details, and toast notifications. It also includes a custom hook to check if the user is logged in.

All API calls are made using the axios library, with the API code located in the `/src/api` folder. The app's components are organized in the `/src/components` folder, while the different pages are found in the `/src/pages` folder.

One cool feature I added is a backend ping indicator on the homepage, which checks if the backend server is up and running. While there are certainly ways to improve the app further, I wanted to keep things simple for this project and didn't use Redux or any other state management library.

Overall, this app demonstrates my skills in building a basic React application with authentication, API integration, and a clean, modular structure. I had fun creating it and learned a lot in the process!

```bash
.
├── README.md
├── package-lock.json
├── package.json
├── public
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
├── src
│   ├── App.css
│   ├── App.tsx
│   ├── api
│   ├── components
│   ├── context
│   ├── index.css
│   ├── index.tsx
│   ├── logo.svg
│   ├── pages
│   ├── react-app-env.d.ts
│   ├── reportWebVitals.ts
│   ├── setupTests.ts
│   ├── types
│   └── utils
└── tsconfig.json

12 directories, 25 files

```
