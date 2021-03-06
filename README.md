<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Thanks again! Now go create something AMAZING! :D
***
***
***
*** To avoid retyping too much info. Do a search and replace for the following:
*** github_username, repo_name, twitter_handle, email, project_title, project_description
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![license-shield]][license-url]
[![html-shield]][html-url]
[![css-shield]][css-url]
[![mongodb-shield]][mongodb-url]
[![express-shield]][express-url]
[![nodejs-shield]][nodejs-url]
[![heroku-shield]][heroku-url]
[![git-shield]][git-url]
[![github-shield]][github-url]



<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="#">
    <img src="https://i.giphy.com/media/7NJlWDt3lh5dGdXrS3/giphy.gif" width="450" height="350"/>
  </a>

  <h3 align="center">Bursapediary</h3>

  <p align="center">
    Pure, friendly, promising
    <br />
    <a href="#getting-started"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://bursapediary.com" target="_blank">View Demo</a>
    ·
    <a href="#">View GIFs</a>
    ·
    <a href="#" target="_blank">Demonstration Video</a>
    ·
    <a href="https://github.com/RCDD-202110-TUR-BEW/backend-capstone-turkey-bursapediary/issues">Report Bug</a>
    ·
    <a href="https://github.com/RCDD-202110-TUR-BEW/backend-capstone-turkey-bursapediary/issues">Request Feature</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#features">Features</a></li>
        <li><a href="#built-with">Built With</a></li>
        <li><a href="#demo">Demo Links</a></li>
        <li><a href="#Screenshots">Screenshots</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <!-- <li><a href="#usage">Usage</a></li> -->
    <li><a href="#team">Team</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

Bursapediary is a place where people come to find supporters for their dreams, here, you can find individuals, NGOs, or officials willing to help you fund your path to your goals, get that degree, do that technical training, or join that sports tournament. on this portal, you can see and search by various categories for specific funding or bursaries and apply to them/contact the donators and explain your exact needs, or if you can’t find the thing you looking for, you can post a funding request explaining your needs and when someone is willing to help, you will be informed by Email/SMS. All you need to do, sign up as a 'reinforcer' or an 'achiever' and post everything about the carrier or the idea you want to support if you are a reinforcer or the goal you have financial need to achieve if you are an achiever. use the search bar to find similar ideas and wait for Bursapediary to find you a fit!

## Features

- List projects
- CRUD operations for projects 
- CRUD operations for users
- Support projects
- Review on projects
- Comment on projects
- Filter projects by category
- Search projects indices by text
- Register/Login
  - Allow Google, Github, Classic
- Middleware for authors and admins

### Built With

* [![mongodb-shield]][mongodb-url]
* [![express-shield]][express-url]
* [![nodejs-shield]][nodejs-url]

### Demo

* Server (backend) link: [![heroku-shield]](https://bursapediary.com)

# Screenshots

### Database Diagram

![Database](https://user-images.githubusercontent.com/14183741/155191770-a41d1cb1-d619-421b-aac0-ca22106afea4.png)

### System Design Flowchart
![System](https://user-images.githubusercontent.com/14183741/155191821-fcc65cf5-1d6c-49ef-93c7-c313618797cb.png)

### OpenAPI Docs
![Docs](https://user-images.githubusercontent.com/14183741/155191800-2351bf16-d62f-4044-813a-4db70e4e39f2.png)

### Homepage
![Homepage](https://user-images.githubusercontent.com/14183741/155191813-986b29b0-8025-4719-8845-34c83e91d730.png)

### Performance Monitoring and Benchmarking
![Performance](https://user-images.githubusercontent.com/14183741/153859236-de8d92b7-ba2b-4b53-80ff-548b6574f0ec.png)
![Performance](https://user-images.githubusercontent.com/14183741/153859295-8ae577ba-1c4b-4289-83b0-af1afae1f996.png)
![Performance](https://user-images.githubusercontent.com/14183741/153859327-ba875871-a252-4166-862d-ba00f40c3b09.png)

<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

* git
  ```sh
  if (you have brew installed ) {
    use this command => 'brew install git'
  } else {
    download the installer from the official website => https://git-scm.com/downloads
  }
  ```

* node
  ```sh
  if (you have brew installed) {
    use this command => 'brew install node'
  } else {
    download the installer from the official website => https://nodejs.org/en/
  }
  ```
What is brew ?? (See: <a href="https://en.wikipedia.org/wiki/Homebrew_(package_manager)" target="_blank">Homebrew Package Manager</a>)

### Installation

```
main branch for server side (node)
```
1. Clone the repo
   ```sh
   git clone https://github.com/RCDD-202110-TUR-BEW/backend-capstone-turkey-bursapediary.git
   ```
2. Install npm packages on both branches 
   ```sh
   cd backend-capstone-turkey-bursapediary
   ```
   ```sh
   on main branch
   'yarn / npm i'
   ```
3. Create environment variables
  ```sh
  if (you will serve on localhost) {
    on main directory create a copy of .env.example and rename to .env file 
    then change the constants to your own env strings
    ```
    SECRET_KEY: 'some very secret key'
    ```
  } else if (you will use some SaaS hosting services like heroku, netlify etc){
    use process.ENV configuration depends on your server
  }
  ```
4. You are good to go
  ```sh
  on main directory => 
  if (you need to watch changes) {
    'yarn dev / npm run dev'
  } else {
    'yarn start / npm run start'
  }
  ```



## Team

Meet our team members through their GitHub profiles

| [<img alt="amr" src="https://avatars.githubusercontent.com/u/26306192?v=4" width="115"><br><sub>@amr-nash</sub>](https://github.com/amr-nash) | [<img alt="coruh" src="https://avatars.githubusercontent.com/u/31990323?v=4" width="115"><br><sub>@corcit</sub>](https://github.com/corcit) | [<img alt="eda" src="https://avatars.githubusercontent.com/u/64930295?v=4" width="115"><br><sub>@edaguler00</sub>](https://github.com/edaguler00) | [<img alt="halit" src="https://avatars.githubusercontent.com/u/61846570?v=4" width="115"><br><sub>@halitbatur</sub>](https://github.com/halitbatur) | [<img alt="souhaib" src="https://media-exp1.licdn.com/dms/image/C4E03AQFH6nVSpVOLjw/profile-displayphoto-shrink_400_400/0/1628344852578?e=1651104000&v=beta&t=Wh7WE6shOg1uRd8Aar4sgz7jcbNJ9LDsZkaqmheocCM" width="115"><br><sub>@felmez</sub>](https://github.com/felmez) | [<img alt="yaman" src="https://avatars.githubusercontent.com/u/58285821?v=4" width="115"><br><sub>@yaman3bd</sub>](https://github.com/yaman3bd) |
| :-----------------------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------: |



<!-- ROADMAP -->



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.



<!-- CONTACT -->
## Contact

Bursapediary Team
* Email: mail{at}domain{dot}com
* [![linkedin-shield]][linkedin-url]



<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements

* [![google-shield]][google-url]
* [![stackoverflow-shield]][stackoverflow-url]





<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[license-shield]: https://img.shields.io/github/license/RCDD-202110-TUR-BEW/backend-capstone-turkey-bursapediary.svg?style=flat-square
[license-url]: https://github.com/RCDD-202110-TUR-BEW/backend-capstone-turkey-bursapediary/blob/master/LICENSE
[freecodecamp-shield]: https://img.shields.io/badge/-freecodecamp-black?style=flat-square&logo=freecodecamp
[freecodecamp-url]: https://www.freecodecamp.org/
[google-shield]: https://img.shields.io/badge/google-4285F4?style=for-the-badge&logo=google&logoColor=white
[google-url]: https://www.google.com/
[stackoverflow-shield]: https://img.shields.io/badge/-stackoverflow-E34F26?style=for-the-badge&logo=stackoverflow&logoColor=white
[stackoverflow-url]: https://www.stackoverflow.com/
[html-shield]: https://img.shields.io/badge/-HTML5-E34F26?style=flat-square&logo=html5&logoColor=white
[html-url]: https://en.wikipedia.org/wiki/HTML
[css-shield]: https://img.shields.io/badge/-CSS3-1572B6?style=flat-square&logo=css3
[css-url]: https://en.wikipedia.org/wiki/CSS
[nodejs-shield]: https://img.shields.io/badge/-Nodejs-black?style=flat-square&logo=Node.js
[nodejs-url]: https://nodejs.org/en/
[react-shield]: https://img.shields.io/badge/-React-black?style=flat-square&logo=react
[react-url]: https://reactjs.org/
[mongodb-shield]: https://img.shields.io/badge/-MongoDB-black?style=flat-square&logo=mongodb
[mongodb-url]: https://www.mongodb.com/
[express-shield]: https://img.shields.io/badge/-express-black.svg?style=flat-square&logo=express
[express-url]: https://expressjs.com/
[graphql-shield]: https://img.shields.io/badge/-GraphQL-E10098?style=flat-square&logo=graphql
[graphql-url]: https://graphql.org/
[apollo-shield]: https://img.shields.io/badge/-Apollo%20GraphQL-311C87?style=flat-square&logo=apollo-graphql
[apollo-url]: https://www.apollographql.com/
[heroku-shield]: https://img.shields.io/badge/-Heroku-430098?style=flat-square&logo=heroku
[heroku-url]: https://dashboard.heroku.com/
[netlify-shield]: https://img.shields.io/badge/-netlify-black?style=flat-square&logo=netlify
[netlify-url]: https://www.netlify.com/
[git-shield]: https://img.shields.io/badge/-Git-black?style=flat-square&logo=git
[git-url]: https://git-scm.com/
[github-shield]: https://img.shields.io/badge/-GitHub-181717?style=flat-square&logo=github
[github-url]: https://github.com/
[linkedin-shield]: https://img.shields.io/badge/-linkedin-blue?style=flat-square&logo=Linkedin&logoColor=white
[linkedin-url]: https://linkedin.com/