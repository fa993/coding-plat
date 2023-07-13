<a name="readme-top"></a>

<h3 align="center">coding platform</h3>

  <p align="center">
    The backend for a coding platform designed for the cometlabs task according to their specifications along with a minimalistic UI for demonstration
    <br />
    <a href="https://documenter.getpostman.com/view/19472614/2s946e9tCW"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://coding-plat.onrender.com">View Demo</a>
    ·
    <a href="https://github.com/fa993/coding-plat/issues/issues">Report Bug</a>
    ·
    <a href="https://github.com/fa993/coding-plat/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li><a href="#Demo">Demo</a></li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#running">Running Locally</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>

  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

This project contains the backend for the coding platform. Most of that code is located in the index.js files and the subsequent routes folder.

A frontend for this has also been built as part of the task which serves to demonstrate the functionality of the API.

Postman docs: [https://documenter.getpostman.com/view/19472614/2s946e9tCW](https://documenter.getpostman.com/view/19472614/2s946e9tCW)

Deployed URL: [https://coding-plat.onrender.com](https://coding-plat.onrender.com)

Both the frontend and backend are at the same url

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

- [![Express][Express.js]][Expressjs-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Demo

A Demonstration video showing a participant submitting a code challenge

_For more examples, please refer to the [Documentation](https://documenter.getpostman.com/view/19472614/2s946e9tCW)_

<p align="right">(<a href="#readme-top">back to top</a>)</p>
<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

- npm

### Installation

2. Clone the repo
   ```sh
   git clone https://github.com/fa993/coding-plat
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Copy over your copy of .env files with the required credentials in the root directory

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Running Locally

5. use the npm startup script

   ```sh
   npm start
   ```

   <p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

- [x] API for users to signup and login
- [x] Role based acccess control for middleware
- [x] Questions stored in db and synchronised with sphere-engine
- [x] Admin API: CRUD functions for question
- [x] Admin API: CRUD function for testcases
- [x] Participant API: Ability to select questions and submit problems for those questions.
- [x] Paginated the lists for viewing testcases and questions
- [x] Viewing questions available to both roles
- [x] Mail the participants their own solutions
- [x] Frontend to demo the core features

See the [open issues](https://github.com/fa993/coding-plat/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Contact

Ameya Kore - kore.ameya@gmail.com

Project Link: [https://github.com/fa993/coding-plat](https://github.com/fa993/coding-plat)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Acknowledgments

- [Best-README-Template](https://github.com/othneildrew/Best-README-Template): For this amazing README template

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[Expressjs-url]: https://expressjs.com/
[Express.js]: https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB
