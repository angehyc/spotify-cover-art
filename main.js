import { paint } from "./help/paint";
import { submitLink } from "./help/submitLink";
import { paintStartScreen } from "./screens/startScreen";

const doNothing = () => {};
const fakeEvent = {
  preventDefault: doNothing,
};
submitLink(fakeEvent);

// paintStartScreen();
// paintCoverScreen();

//function for displaying the album image from Spotify API
