# Muses Server

Backend project for client "Muses"

##Prerequisites

The following set of tools and configurations are required in order to build and run the application as a developer.

#### 1. Install Node Version Manager (nvm)
Nvm allows you to install multiple versions of Node.JS and switch between them easily.  This is very important if you are
maintaining multiple applications or multiple versions of the same application.

##### **Installation for Windows**

  * Using Chocolatey: `choco install nvm` (also available [here](https://github.com/coreybutler/nvm-windows))

  > You might need to set proxy when you are installing on DHS PC. `nvm proxy http://bcpxy.nycnet:8080`

##### **Installation for Mac / Linux**

  * See installation instructions on the [GitHub nvm page](https://github.com/creationix/nvm)
  * Execute install script `curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.0/install.sh | bash`
  * Verify that nvm is installed correctly `nvm ls`
  * You should not see any errors
  * Check the version `nvm --version` it should be 0.33.0

#### 2. Install Node.JS
  * See latest version [here](https://nodejs.org/en/download)
  * Install version 7.10.0 `nvm install 7.10.0`
  * Set 7.10.0 to be the default version `nvm alias default 7.10.0`
  * Make sure everything is set correctly: `nvm ls`

#### 3. Install global npm package npm-check-updates
npm-check-updates provides a utility program "ncu" that automatically detects whether all packages in `packages.json` are up to date, and if not, what are the latest versions.  You can optionally tell `ncu` to update the settings in `package.json` to update everything to the latest versions in one go.  `npm install` is still needed to actually install the new packages.

Before the first production release, we try to keep all packages up-to-date. After releasing to production, updates must be carefully planned to avoid application instability.

`npm install -g npm-check-updates`

#### 4. Create PostgreSQL Database
  * `createdb muses` or `CREATE DATABASE muses`

#### 5. Load the muses-server project, build and run
  * `git clone https://bitbucket.org/omiologic/muses-server.git`
  * `npm install`
  * Save `.env.sample` as `.env` and fill out database credentials
  * `npm start`
  * Above requires starting Rails server from dhs-reporting-server.  Alternatively, for dev, you can `npm run json-server` along with `npm start` in two terminal tabs.


## NPM Scripts

| Command | Description |
| --- | --- |
| `npm start` | Build and start Muses Server on `localhost:3000` |
| `npm run dev` | Build and start Muses Server on `localhost:3000` for dev environment |
| `npm run build` | Build Muses Server to `/dist` |
| `npm run clean` | Delete all files in `/dist` |
| `npm run lint` | Run tslint |
| `npm test` | Run testing |
| `npm run seed` | Seed data to tables |
