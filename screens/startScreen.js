import { paint } from "../help/paint";
import { submitLink } from "../help/submitLink";

const startScreen =
  /*html*/
  `
  <nav class="h-[168px] bg-white">
  <img id="logo" class="cursor-pointer px-[80px] pt-[60px]" src="/square.png" alt="" /></nav>
  <div class="px-[80px]">
  <h1 class="font-inter text-[#343434] font-semibold text-2xl mb-[24px]">get <span class="text-[#1DB954]">spotify</span> cover art in high res</h1>
  <div class="font-inter text-[18px] leading-[1.5] text-[#343434]">
    <p>1. navigate to the 
      <span id="borderStroke" class="px-1 border-dashed border border-[#1DB954] mr-[12px] ml-[2px]">album</span><span class="px-1 border-dashed border border-[#1DB954] mr-[12px]">artist</span><span class="px-1 border-dashed border border-[#1DB954] mr-[12px]">track</span><span class="px-1 border-dashed border border-[#1DB954] mr-[12px]">podcast</span><span class="px-1 border-dashed border border-[#1DB954] mr-[2px]">podcast episode</span>
      you want</p>
    <p>2. get its link by...</p>
      <p class="pl-4"><span class="font-medium">a. spotify browser: </span>copy the URL</p>
      <p class="pl-4"><span class="font-medium">b. spotify desktop app:</span> right click title > share > copy link</p>
    <p>3. paste link below</p>
  </div>
  <form id="linkForm" class="mt-[73px]">

  <textarea autofocus rows="4" id="linkInput" type="text" class="leading-[1.2] text-[72px] font-light text-[#E4E4E4] placeholder:text-[#E4E4E4] font-inter caret-[#1DB954] w-full outline-none resize-none overflow-hidden h-full" placeholder="paste link and enter"></textarea>
</form>
</div>
<footer class="flex items-center font-inter absolute bottom-5 text-[#C7C7C7] text-[12px] left-1/2 -translate-x-1/2 text-center">born from my ♥ of browsing spotify cover art // need help? <span id="handle" class="hover:text-[#1DB954] cursor-pointer ml-1"> @angehyc</span></footer>`;

export const paintStartScreen = () => {
  //paint UI
  const body = document.querySelector("#actualBody");
  paint(startScreen, body);

  //add event listeners
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
};

//*-----LOGIC------
