import { paint } from "../help/paint";
import { getInputType, submitLink } from "../help/submitLink";
import { paintStartScreen } from "./startScreen";
import JSZip from "jszip";
import { saveAs } from "file-saver";

// const coverScreen =
//   /*html*/

const date = (jsonResData, typeOfURL) => {
  if (typeOfURL === "albums") {
    return `(${jsonResData.release_date.split("-")[0]})`;
  } else if (typeOfURL === "tracks") {
    return `(${jsonResData.album.release_date.split("-")[0]})`;
  } else if (typeOfURL === "artists") {
    return "";
  } else if (typeOfURL === "shows") {
    return "";
  } else if (typeOfURL === "playlists") {
    return "";
  } else if (typeOfURL === "episodes") {
    return `(${jsonResData.release_date.split("-")[0]})`;
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
    return data.owner.display_name;
  } else if (typeOfURL === "albums" || typeOfURL === "tracks") {
    let allArtists = data.artists.map((artist) => {
      return artist.name;
    });
    return allArtists.join(", ");
  }
};

const downloadPlaylistImages = async (tracks) => {
  const zip = new JSZip();
  const imagePromises = tracks.map(async (track, index) => {
    const imageUrl = track.track.album.images[0]?.url;
    if (imageUrl) {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      // Use track name and artist for filename, remove special characters
      const fileName = `${index + 1}-${track.track.artists[0].name}-${
        track.track.name
      }`
        .replace(/[^a-z0-9]/gi, "_")
        .toLowerCase();
      zip.file(`${fileName}.jpg`, blob);
    }
  });

  await Promise.all(imagePromises);
  const content = await zip.generateAsync({ type: "blob" });
  saveAs(content, "playlist-artwork.zip");
};

export const paintCoverScreen = (jsonResData, typeOfURL) => {
  const body = document.querySelector("#actualBody");
  const imageSource = jsonResData.album
    ? jsonResData.album.images[0].url
    : jsonResData.images[0]?.url || "/Frame_58.png";

  body.innerHTML = /*html*/ `
  <div class="max-w-[1440px] mx-auto">
    <nav class="h-[168px] bg-white">
      <img id="logo" class="cursor-pointer px-[80px] pt-[60px]" src="/square.png" alt="" />
    </nav>
    
    <div id="mainSection" class="px-[80px] mt-[8px] max-w-full w-full">
      <!-- Main UI section -->
      <div class="flex flex-col sm:grid grid-cols-[minmax(240px,640px)_minmax(517px,700px)] sm:gap-x-[62px] place-items-center justify-items-start">
        <img id="image" class="" id="coverImage" src="${imageSource}" />
        <div id="RHS" class="flex flex-col justify-between flex-basis max-h-[350px] h-full w-full relative bottom-2">
          <div>
            <h1 class="font-inter text-[30px] font-medium tracking-[-0.03em] leading-[1.2] max-w-[700px] text-[#343434]">${
              jsonResData.name
            }</h1>
            <span>
              <div class="text-[#595959] mt-1 relative"><span>
                by ${artistName(
                  jsonResData,
                  typeOfURL
                )}</span> ▪ <span id="type" class="">${
    typeOfURL.slice(0, 1).toUpperCase() +
    typeOfURL.slice(1, typeOfURL.length - 1)
  }</span> <span>${date(jsonResData, typeOfURL)}</span></div>
            </span>

            <div class="flex gap-6 mt-[40px]">
              <button id="downloadButton" class="w-[320px] border-solid border border-[#343434] bg-[#343434] text-[#FFF] py-4 px-6 font-inter text-[18px]">download ${typeOfURL !== "playlists" ? "" : "playlist cover only"}</button>
              ${
                typeOfURL === "playlists"
                  ? `
                <button id="downloadAllBtn" class="w-[320px] border-solid border border-[#343434] bg-[#ffffff] text-[#343434] py-4 px-6 font-inter text-[18px]">download all ${jsonResData.tracks.length} track covers</button>
              `
                  : ""
              }
            </div>
            <form id="linkForm" class="mt-20">
            <div class="before:absolute before:content-[''] before:bg-[#C6C6C6] before:h-[1px] before:w-full before:top-[calc(100%+8px)] before:left-0 relative">
            <input id="linkInput" type="text" placeholder="find another cover..." class="text-[16px] font-light text-red-595959 placeholder:text-[#595959] font-inter caret-[#1DB954] w-[calc(100%-118px)] outline-none resize-none overflow-hidden h-full" />
            <button id="pressEnterButton" class="flex flex-row hidden absolute right-0 bottom-[1px] font-inter bg-white pl-4" id="enterButton"><span class="text-[#595959] font-inter">press</span><span class="font-semibold text-[#1DB954] ml-1 font-inter">Enter↵</span></button>
            </div>
            </form>
          </div>
        </div>
      </div>

   

      <!-- Track images grid for playlists -->
      ${
        typeOfURL === "playlists"
          ? `
        <div class="mt-16">
          <h2 class="text-xl font-inter font-medium text-[#343434] mb-8">${
            jsonResData.tracks.length
          } tracks in this playlist</h2>
          <div class="flex flex-wrap gap-4">
            ${jsonResData.tracks
              .map(
                (track) => `
              <div class="flex flex-col w-[100px]">
                <img 
                  src="${track.track.album.images[0]?.url || "/Frame_58.png"}" 
                  class="w-[100px] h-[100px] object-cover"
                  alt="${track.track.name}"
                />
              </div>
            `
              )
              .join("")}
          </div>
        </div>
      `
          : ""
      }
    </div>

    <footer class="flex items-center font-inter mt-16 mb-8 text-[#C7C7C7] text-[12px] justify-center text-center">
      born from my ♥ of browsing spotify cover art // need help? 
      <span id="handle" class="hover:text-[#1DB954] cursor-pointer ml-1">@angehyc</span>
    </footer>
  </div>`;

  const handleLink = document.querySelector("#handle");
  if (handleLink) {
    handleLink.addEventListener("click", () => {
      window.open("https://twitter.com/angehyc", "_blank");
    });
  }

  const downloadButton = document.querySelector("#downloadButton");
  if (downloadButton) {
    downloadButton.addEventListener("click", async () => {
      const response = await fetch(imageSource);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `${jsonResData.name}_${jsonResData.type}_cover.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }

  const homepage = document.querySelector("#logo");
  if (homepage) {
    homepage.addEventListener("click", paintStartScreen);
  }

  if (typeOfURL === "playlists") {
    const downloadAllBtn = document.querySelector("#downloadAllBtn");
    if (downloadAllBtn) {
      downloadAllBtn.addEventListener("click", () => {
        downloadPlaylistImages(jsonResData.tracks);
      });
    }
  }

  const linkForm = document.querySelector("#linkForm");
  linkForm.addEventListener("submit", submitLink);
};


