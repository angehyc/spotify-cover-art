import { paint } from "../help/paint";
import { submitLink } from "../help/submitLink";
import { paintStartScreen } from "./startScreen";

const errorScreen =
  /*html*/
  `
  <nav class="h-[168px] bg-white">
  <img id="logo" class="cursor-pointer px-[80px] pt-[60px]" src="/square.png" alt="" /></nav>
  <div class="px-[80px]">
  <h1 class="font-inter text-[#343434] font-semibold text-2xl mb-[24px]">that link didn't work, check that...</h1>
  <div class ="font-inter text-[18px] leading-[1.5] text-[#343434]">
  <p>1. you’ve copied and pasted the entire URL</p>
  <p>2. you're copying an album/artist/track/podcast/podcast episode </p>
  <p>3. the link format starts with <span class="italic">“https://open.spotify.com/”</span></p>
  </div>
  <form id="linkForm" class="mt-[73px]">
  <textarea autofocus rows="4" id="linkInput" type="text" class="leading-[1.2] text-[72px] font-light text-[#E4E4E4] placeholder:text-[#E4E4E4] font-inter caret-[#1DB954] w-full outline-none resize-none overflow-hidden h-full" placeholder="paste link again"></textarea>
</form>

<footer class="flex items-center font-inter absolute bottom-5 text-[#C7C7C7] text-[12px] left-1/2 -translate-x-1/2 text-center">born from my ♥ of browsing spotify cover art // need help? <span id="handle" class="hover:text-[#1DB954] cursor-pointer ml-1"> @angehyc</span></footer>`;

export const paintErrorScreen = () => {
  //paint UI
  const body = document.querySelector("#actualBody");
  paint(errorScreen, body);

  // write logic

  const handleLink = document.querySelector("#handle");
  handleLink.addEventListener("click", () => {
    window.open("https://twitter.com/angehyc", "_blank");
  });

  const homepage = document.querySelector("#logo");
  homepage.addEventListener("click", paintStartScreen);

  const linkForm = document.querySelector("#linkForm");
  linkForm.addEventListener("submit", submitLink);

  const textArea = document.querySelector("#linkInput");
  textArea.addEventListener("keydown", (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      const newEvent = new Event("submit", { cancelable: true });
      linkForm.dispatchEvent(newEvent);
    }

    console.log(event);
  });
  textArea.focus();
};
