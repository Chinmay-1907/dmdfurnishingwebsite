# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## Image asset paths

- All product, category, and gallery images are stored under `public/Images` and referenced from `public/DMD_Website.xml`.
- Paths in the XML must use leading `/Images/...` with forward slashes and match the exact filename (including spaces and case) that lives in `public/Images`.
- A helper script (`fix-image-paths.js`) is available at the repo root to re-normalize XML image references against the directory structure if new assets are added or filenames change.
- The runtime catalog parser now uses `src/utils/catalogPaths.js` to normalize every image path (swap Windows backslashes for forward slashes and ensure a single leading `/`) before rendering, so keep XML entries relative to the site root and the components will resolve them correctly.
