# SemTex

![image](https://user-images.githubusercontent.com/34858205/196072281-47c72595-9023-4c46-b990-74e21c30c314.png)

Semtex is short for Semantic Text Analysis, and is a tool design to allow researchers to easily attach semantic labeling and responses to a collection of text samples. The application has both: 

- an administrator portal to allow researchers to add new data sets with their respective text samples and semantic responses, and
- a user portal where an analyst can respond to all the given text samples

In order to use this application, you will need to configure two separate services: front end hosting from which users can interact with the application, and a backend that will store all of the user and application data. While both the application and database hosting can be acheived with a variety of different services, we highly reccomend using Vercel to host your application and Supabase to host your database and backend. In depth guides for both of these processes can be found in this repository's wiki.

## Developing

As this project is open source, feel free to make contributions by forking this repository and making a pull request.

### Tech Stack

Semtex is a Next.js Typescript React application. It uses Yarn to manage its dependencies, Material UI as its UI Framework, and interfaces with a Supabase back end via the Supabase JavaScript client library.

### Requirements

You will need to have the following installed:

- [Node](https://nodejs.org/en/) (or use [Node Version Manager](https://github.com/nvm-sh/nvm))
- Yarn (once Node is installed enter `npm i -g yarn`)

### Install local dependencies

Navigate to this repo in your terminal and enter `yarn`

### Scripts

- `yarn dev` - starts a local webserver for the application
- `yarn build` - creates a production build of the site
- `yarn start` - hosts the build files locally
- `yarn lint` - lints and checks the application
- `yarn format` - performs auto-formatting on the application
