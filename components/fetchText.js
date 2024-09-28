import { handleError } from "../utils.js";

export default async function fetchRandomText() {
  const apiURL = "https://poetrydb.org/title/Ozymandias/lines.json";
  try {
    const response = await fetch(apiURL);
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    const data = await response.json();
    const lines = data[0].lines;
    return lines.join(" ");
  } catch (error) {
    handleError(error);
    console.error(`Error fetching text: ${error}`);
    alert("Failed to fetch text. Please check your internet connection.");

    return "I met a traveller from an antique land Who said: Two vast and trunkless legs of stone Stand in the desert...Near them, on the sand, Half sunk, a shattered visage lies, whose frown, And wrinkled lip, and sneer of cold command, Tell that its sculptor well those passions read Which yet survive, stamped on these lifeless things, The hand that mocked them, and the heart that fed: And on the pedestal these words appear: 'My name is Ozymandias, king of kings: Look on my works, ye Mighty, and despair!' Nothing beside remains. Round the decay Of that colossal wreck, boundless and bare The lone and level sands stretch far away.";
  }
}
