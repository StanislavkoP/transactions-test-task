# Installation

> Note: Make sure you have Node.js version `18.15.0` installed.

- Clone this repository using

```shell
  git clone https://github.com/StanislavkoP/transactions-test-task.git
```

- Navigate to the project directory

```shell
 cd transactions-test-task
```

- Install dependencies using `npm install`
- Copy the `.env.example` file and rename it to `.env` using the following command:

```shell
 cp .env.example .env
```

- Set up the `COMMISSION_FEE_CONFIG_API_URL` variable in your `.env` file.

### `.env` example

```dotenv
COMMISSION_FEE_CONFIG_API_URL=https://developers.com/tasks/api
```

# Usage

To run the project in development mode, use the command:

```shell
npm run start input.json
```

> Note: `input.json` is required for calculation fee.
> </br>`input.json` is the file name with transactions data

### If you want to run a build version:

Install dependencies if you haven't done that before

```shell
npm i
```

Build project

```shell
npm run build
```

Navigate to the build folder

```shell
cd build
```

Run app

```shell
node index.js input.json
```

> Note: `input.json` is required for calculation fee.
> </br>`input.json` is the file name with transactions data

### Run tests

Use

```shell
npm run test
```
