import fetch from "node-fetch";

export default async function (req, res) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  // and the headers you need in your case, as per your client-side request
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  const myHeaders = {
    "Content-Type": "application/x-www-form-urlencoded",
    Cookie:
      "__Host-device_id=AQCVkrWkvhdEqgYF4TzDBEJpCtx6v1sXRcKsQbmo0U4cuRNfZ3H48v0_uall82vAMyBk3fMPHFRDEX90vkxb0rWDAA_nWeDB3dQ; sp_tr=false",
  };

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    redirect: "follow",
  };

  const response = await fetch(
    `https://accounts.spotify.com/api/token?grant_type=client_credentials&client_id=${process.env.SPOTIFY_CLIENT_ID}&client_secret=${process.env.SPOTIFY_CLIENT_SECRET}`,
    requestOptions
  );

  const result = await response.json();
  
  // Get the main playlist/album/track data
  const theResponse = await fetch(
    `https://api.spotify.com/v1/${req.query.inputType}/${req.query.id}?market=US`,
    {
      headers: {
        Authorization: `Bearer ${result.access_token}`,
      },
    }
  );

  if (theResponse.status !== 200) {
    throw new Error("hehe");
  }

  const data = await theResponse.json();

  // If it's a playlist, get all tracks
  if (req.query.inputType === "playlists") {
    // Initialize array to hold all tracks
    let allTracks = [];
    
    // Get initial tracks URL
    let nextURL = `https://api.spotify.com/v1/playlists/${req.query.id}/tracks?market=US`;
    
    // Keep fetching while there are more tracks
    while (nextURL) {
      const tracksResponse = await fetch(nextURL, {
        headers: {
          Authorization: `Bearer ${result.access_token}`,
        },
      });
      
      if (tracksResponse.status === 200) {
        const tracksData = await tracksResponse.json();
        // Add current batch of tracks to our array
        allTracks = [...allTracks, ...tracksData.items];
        // Update nextURL - will be null when there are no more tracks
        nextURL = tracksData.next;
      } else {
        break; // Exit loop if we get an error
      }
    }
    
    // Add all tracks to the response data
    data.tracks = allTracks;
  }

  res.status(200).json(data);
}
