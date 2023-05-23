import fetch from "node-fetch";

export default async function (req, res) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  // and the headers you need in your case, as per your client-side request
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle pre-flight request. Reply successfully:
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  // const myHeaders = {
  //   "Content-Type": "application/x-www-form-urlencoded",
  //   Cookie:
  //     "__Host-device_id=AQCVkrWkvhdEqgYF4TzDBEJpCtx6v1sXRcKsQbmo0U4cuRNfZ3H48v0_uall82vAMyBk3fMPHFRDEX90vkxb0rWDAA_nWeDB3dQ; sp_tr=false",
  // };

  // const requestOptions = {
  //   method: "POST",
  //   headers: myHeaders,
  //   redirect: "follow",
  // };

  // const response = await fetch(
  //   "https://accounts.spotify.com/api/token?grant_type=client_credentials&client_id=1bb45b8cde6747eea2b35f3a2c79f6d8&client_secret=8288a1bf89e04a3b8b1bf47dfef8f0f6",
  //   requestOptions
  // );
  // const data = await response.json();

  res.status(200).json(data);
}
