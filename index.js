// Import pages, components and helper functions.
import Home from './views/pages/Home.js';

import Alarm from './views/pages/Alarm.js';
import Memo from './views/pages/memo.js';
import Pictures from './views/pages/Pictures.js';
import Error404 from './views/pages/Error404.js';

import Navbar from './views/components/Navbar.js';
import Footer from './views/components/Footer.js';

import { parseRequestUrl } from './services/utils.js';

// List of supported routes. Any url other than these will render 404 page.
const routes = {
  '/': Home,
  '/alarm': Alarm,
  '/pictures': Pictures,
  '/memo': Memo
};

/**
 * The router code. Takes a URL, checks against the list of
 * supported routes and then renders the corresponding content page.
 */
const router = async () => {
  // Lazy load view element:
  const header = null || document.getElementById('header_root');
  const content = null || document.getElementById('page_root');
  const footer = null || document.getElementById('footer_root');

  // Render the header and footer of the page.
  header.innerHTML = await Navbar.render();
  await Navbar.after_render();
  footer.innerHTML = await Footer.render();
  await Footer.after_render();

  // Destructure the parsed URl from the addressbar.
  const { resource, id, verb } = parseRequestUrl();

  // Parse the URL and if it has an id part, change it with the string ":id".
  const parsedUrl =
    (resource ? '/' + resource : '/') +
    (id ? '/:id' : '') +
    (verb ? '/' + verb : '');

  // Render the page from map of supported routes or render 404 page.
  const page = routes[parsedUrl] || Error404;
  content.innerHTML = await page.render();
  await page.after_render();
};

/**
 * Add event listeners
 */

// Listen on hash change.
window.addEventListener('hashchange', router);

// Listen on page load.
window.addEventListener('load', router);
