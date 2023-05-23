import { paintCoverScreen } from "../screens/coverScreen";
import { paintErrorScreen } from "../screens/errorScreen";

export const getInputType = (userInput) => {
  if (userInput.includes("album")) {
    return "albums";
  } else if (userInput.includes("track")) {
    return "tracks";
  } else if (userInput.includes("artist")) {
    return "artists";
  } else if (userInput.includes("show")) {
    return "shows";
  } else if (userInput.includes("playlist")) {
    return "playlists";
  } else if (userInput.includes("episode")) {
    return "episodes";
  } else {
    paintErrorScreen();
  }
};
//function for extracting the album ID when a user inputs a Spotify link
const getID = (userInput) => {
  const firstArr = userInput.split("?");
  const secondArr = firstArr[0].split("/");
  const finalID = secondArr[secondArr.length - 1];
  console.log(finalID);
  return finalID;
};

export const submitLink = (event) => {
  event.preventDefault();
  // stuff to do with getting a new Authorisation Token from Spotify's API
  const linkInput = document.querySelector("#linkInput");
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  myHeaders.append(
    "Cookie",
    "__Host-device_id=AQCVkrWkvhdEqgYF4TzDBEJpCtx6v1sXRcKsQbmo0U4cuRNfZ3H48v0_uall82vAMyBk3fMPHFRDEX90vkxb0rWDAA_nWeDB3dQ; sp_tr=false"
  );

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    redirect: "follow",
  };

  const inputType = getInputType(linkInput.value);

  fetch(`/api/apee?inputType=${inputType}&id=${getID(linkInput.value)}`)
    .then((res) => {
      console.log(res);
      if (res.status !== 200) {
        throw new Error("hehe");
      } else {
        return res.json();
      }
    })
    .then((jsonResData) => {
      console.log(jsonResData);
      paintCoverScreen(jsonResData, inputType);
    })

    .catch((e) => {
      console.log(e);
      paintErrorScreen();
    });
};
