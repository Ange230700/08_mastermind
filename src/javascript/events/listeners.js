// src\javascript\events\listeners.js

import { handleLoadingOfDomContent } from "./handlers.js";

function waitForLoadingOfDomContent() {
  document.addEventListener("DOMContentLoaded", handleLoadingOfDomContent);
}

export { waitForLoadingOfDomContent };
