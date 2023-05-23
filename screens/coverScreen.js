import { paint } from "../help/paint";
import { getInputType, submitLink } from "../help/submitLink";
import { paintStartScreen } from "./startScreen";

// const coverScreen =
//   /*html*/

const date = (jsonResData, typeOfURL) => {
  if (typeOfURL === "albums") {
    return jsonResData.release_date.split("-")[0];
  } else if (typeOfURL === "tracks") {
    return jsonResData.album.release_date.split("-")[0];
  } else if (typeOfURL === "artists") {
    return "";
  } else if (typeOfURL === "shows") {
    return "";
  } else if (typeOfURL === "playlists") {
    return "";
  } else if (typeOfURL === "episodes") {
    return jsonResData.release_date.split("-")[0];
  }
};

const artistName = (data, typeOfURL) => {
  if (typeOfURL === "artists") {
    return data.name;
  } else if (typeOfURL === "shows") {
    return data.publisher;
  } else if (typeOfURL === "episodes") {
    return data.show.name;
  } else if (typeOfURL === "playlists") {
    return data.owner;
  } else if (typeOfURL === "albums" || typeOfURL === "tracks") {
    let allArtists = data.artists.map((artist) => {
      return artist.name;
    });
    return allArtists.join(", ");
  }
};

export const paintCoverScreen = (jsonResData, typeOfURL) => {
  //paint UI
  const body = document.querySelector("#actualBody");
  const imageSource = jsonResData.album
    ? jsonResData.album.images[0].url
    : jsonResData.images[0].url;

  body.innerHTML = /*html*/ `

  <nav class="h-[168px] bg-white">
  <img id="logo" class="cursor-pointer px-[80px] pt-[60px]" src="/square.png" alt="" /></nav>
  <div id="mainSection" class="px-[80px] mt-[8px] max-w-full w-full flex flex-col sm:grid grid-cols-[minmax(240px,640px)_minmax(517px,700px)] sm:gap-x-[62px] place-items-center justify-items-start ">

  <img id="image" class="" id="coverImage" src="${imageSource}" />
  <div id="RHS" class="flex flex-col justify-between flex-basis max-h-[350px] h-full w-full relative bottom-2">
  <div>
  <h1 class="font-inter text-[30px] leading-[1.2] max-w-[700px] text-[#343434]">${
    jsonResData.name
  }</h1>
  <span>
  <div class="text-[#595959] mt-1 relative"><span>
  by ${artistName(jsonResData, typeOfURL)}</span> ▪ <span id="type" class="">${
    typeOfURL.slice(0, 1).toUpperCase() +
    typeOfURL.slice(1, typeOfURL.length - 1)
  }</span> <span>(${date(jsonResData, typeOfURL)})</span></div>

  </span>

<div class="flex gap-6 mt-[40px]">
  <button id="downloadButton" class=" w-[320px] border-solid border border-[#343434] bg-[#343434] text-[#FFF] py-4 px-6 font-inter text-[20px]">download</button>

</div>
</div>
  <form id="linkForm">
  <div class="before:absolute before:content-[''] before:bg-[#C6C6C6] before:h-[1px] before:w-full before:top-[calc(100%+8px)] before:left-0 relative">
  <input id="linkInput" type="text" placeholder="find another cover..." class="text-[16px] font-light text-red-595959 placeholder:text-[#595959] font-inter caret-[#1DB954] w-full outline-none resize-none overflow-hidden h-full" />
  <button id="pressEnterButton" class="flex flex-row hidden absolute right-0 bottom-[1px] font-inter bg-white pl-4" id="enterButton"><span class="text-[#595959] font-inter">press</span><span class="font-semibold text-[#1DB954] ml-1 font-inter">Enter↵</span></button>
  </div>
  </form></div></div>
  <footer class="flex items-center font-inter absolute bottom-5 text-[#C7C7C7] text-[12px] left-1/2 -translate-x-1/2 text-center">born from my ♥ of browsing spotify cover art // need help? <span id="handle" class="hover:text-[#1DB954] cursor-pointer ml-1"> @angehyc</span></footer>
  `;

  const handleLink = document.querySelector("#handle");
  handleLink.addEventListener("click", () => {
    window.open("https://twitter.com/angehyc", "_blank");
  });

  const pressEnterButton = document.querySelector("#pressEnterButton");

  const linkInput = document.querySelector("#linkInput");
  linkInput.addEventListener("keyup", () => {
    if (linkInput.value !== "") {
      pressEnterButton.classList.remove("hidden");
    } else {
      pressEnterButton.classList.add("hidden");
    }
  });

  const downloadButton = document.querySelector("#downloadButton");
  downloadButton.addEventListener("click", async () => {
    // Fetch the image content
    const response = await fetch(imageSource);
    const blob = await response.blob();

    // Create an Object URL for the blob
    const blobUrl = URL.createObjectURL(blob);

    const link = document.createElement("a");
    console.log(blobUrl);
    link.href = blobUrl;
    console.log(jsonResData.name, jsonResData.type);
    link.download = `${jsonResData.name}_${jsonResData.type}_cover.jpg`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });

  const linkForm = document.querySelector("#linkForm");
  linkForm.addEventListener("submit", submitLink);

  const homepage = document.querySelector("#logo");
  homepage.addEventListener("click", paintStartScreen);
};
