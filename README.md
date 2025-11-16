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

## EmailJS Form Submission (Free, Client-Only)

The Contact form can send consultation requests via EmailJS with no server cost.

### Setup Steps
- Create a free account at emailjs.com.
- Add an Email Service (e.g., Gmail/SMTP). Note your `Service ID`.
- Create a Template and include fields:
  - `to_email` (set to `sales@dfurnusa.com` or leave configurable)
  - `name`
  - `company`
  - `email`
  - `phone`
  - `project`
  - `message`
  - `subject`
- Find your `Public Key` and `Template ID` in the EmailJS dashboard.

### Configure Environment
- Copy `.env.example` to `.env` or `.env.local` and set:
  - `REACT_APP_EMAILJS_PUBLIC_KEY`
  - `REACT_APP_EMAILJS_SERVICE_ID`
  - `REACT_APP_EMAILJS_TEMPLATE_ID`
- Stop and restart `npm start` to load env vars.

### Where it’s used
- Keys are read in `src/config/email.js`.
- The Contact form in `src/components/Contact.js` sends via EmailJS and shows success/error messages without redirects.

### Troubleshooting
- If the form shows “Email service not configured”, ensure env vars are set and the dev server has been restarted.
- Check EmailJS template variable names match exactly the ones listed above.
- For full control without third-party services, add a small Node/Nodemailer backend.
