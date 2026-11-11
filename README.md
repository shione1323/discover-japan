# Discover Japan

A student travel page featuring four third-party JavaScript libraries.

## Run the project

1. Install Node.js if it is not already installed.
2. Open a terminal in this folder and run:

   ```bash
   npm install
   npm start
   ```

3. Open `http://localhost:3000` in a browser. Press `Ctrl + C` in the terminal to stop the server.

The library files are included in `vendor`, so the JavaScript libraries do not need a CDN. Google Fonts requires an internet connection; system fonts are used as a fallback.

## Libraries

- **Glide.js 3.6.2**: responsive destination carousel, with previous, next, and pause/play controls.
- **FsLightbox 3.4.2**: click a gallery image to open the lightbox.
- **AOS 2.3.1**: reveals sections as they enter the viewport.
- **Granim.js 2.0.0**: animates the gradient behind the final section.

The page respects the browser's reduced-motion preference. Library licenses are included in `vendor/licenses`.

## Project files

- `index.html`: semantic page structure and library references.
- `css/style.css`: reset, page styling, and mobile-first responsive rules.
- `js/script.js`: library setup and carousel controls.
- `images/`: photographs from the original supplied project.
- `vendor/`: the four third-party libraries and their licenses.
- `package.json` and `bs-config.json`: lite-server configuration.

The photographs were included with the original project. Confirm their individual sources and usage rights before publishing. The `node_modules` folder is intentionally excluded from the submission and can be recreated by running `npm install`.
