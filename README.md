# Skull & Daisy

Skull & Daisy is the storefront webapp for all your new agey psychobabble needs. As this was designed as an
Amazon clone, when users register for a Skull & Daisy account, they are registered as both buyers and sellers.
Within the app users are able to search and browse for various potions, poisons, herbs and healing crystals.
Likewise, they can do the same for other sellers visiting different storefronts within the app. As sellers,
users are presented with seller management tools which allows them to manage their inventory, see monthly and
total sales figures, and also manage their pending shipments.

## Screenshots
Authentication
![Authentication](/SkullAndDaisy/images/screenshot1.png)

Home
![Home screen](/SkullAndDaisy/images/screenshot2.png)

## Technologies Used
* C#
* ASP.Net
* React
* Sass
* MVC
* Dapper
* Axios
* Create-React-App
* Reactstrap

## ERD
![ERD](/SkullAndDaisy/images/erd.png)

## How to run this app
Note: To run this app you will need a firebase account and a new project.

### 1. Configure Firebase, and seed the data
1. Clone the repository to your local machine.
2. Run the following command in terminal to download the web dependencies: `npm install`
3. In the db folder, rename apiKeys.json.example to apiKeys.json.
4. In Firebase, create a new project.
5. Navigate to your config object, and copy the keys from Firebase into the apiKeys.json file.
6. Create a realtime database in Firebase, and start in test mode.
7. Navigate to the Data tab inside the realtime database, and import cohort.json.
8. Run the included data script in your preferred SQL management tool.

### 2. Serve up the app
#### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Contributers
* [Austin Cumberlander](https://github.com/acumberlander)
* [Jasmine Walters](https://github.com/jsmnwltrs)
* [Marshall Offutt](https://github.com/marshalloffutt)
* [Nathan Gonzalez](https://github.com/copypastedeveloper)(mentor)
