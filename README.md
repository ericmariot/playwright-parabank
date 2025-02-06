# Playwright Automation Task

This repository contains automated tests for the Parabank application using Playwright. This README will guide you through setting up the necessary environment and running the tests.

## Prerequisites

Before running the tests, be sure to have installed:
 - Node.js (v14 or later): [Download Node.js](https://nodejs.org/en)
 - npm (Node Package Manager): Comes with Node.js

Install Playwright Dependencies
```bash
npx playwright install
```

## Project Setup

1. Clone the repository
```bash
git clone git@github.com:ericmariot/playwright-parabank.git
cd playwright-parabank
```

2. Install dependencies
Inside the project repository, install the required dependencies:
```bash
npm install
```

## Running the tests

You can run all tests with
```bash
npx playwright test
```

This will execute all tests inside `tests/` folder.

You can also run the tests with the Playwright UI
```bash
npx playwright test --ui
```