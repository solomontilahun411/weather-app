# Weather App — React + Vite

This is the React version of the Weather App. All nine original image assets are preserved in `src/assets/images/`.

## Requirements
- Node.js (LTS recommended)
- Internet connection
- OpenWeather API key: https://home.openweathermap.org/api_keys

## Run in VS Code / terminal

1. Extract this ZIP and open the `Weather-App-React` folder in VS Code.
2. Open the terminal in that folder.
3. Install packages:

   ```bash
   npm install
   ```

4. Copy `.env.example` to `.env`.
5. Open `.env` and replace the placeholder with your API key:

   ```env
   VITE_OPENWEATHER_API_KEY=put_your_api_key_here
   ```

6. Start the development server:

   ```bash
   npm run dev
   ```

7. Open the local URL printed in the terminal (usually `http://localhost:5173`).

To make a production build, run `npm run build`.

## Important API key note
Vite exposes variables prefixed with `VITE_` in the browser bundle. This is suitable for a learning project but does **not** keep the API key secret. Do not commit `.env` to GitHub. For a public production app, make API requests through a backend server and keep the key on the server. If a key was shared publicly, replace it in the OpenWeather account.
