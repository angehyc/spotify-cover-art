import { paintStartScreen } from "./screens/startScreen";
import posthog from "posthog-js";

posthog.init(process.env.POSTHOG_KEY, {
  api_host: "https://us.i.posthog.com",
  person_profiles: "identified_only", // or 'always' to create profiles for anonymous users as well
});

paintStartScreen();
//change
