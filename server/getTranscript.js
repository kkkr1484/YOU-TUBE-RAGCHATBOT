import { YoutubeTranscript } from "youtube-transcript";

const videoUrl = "https://youtu.be/NP1aZVpNGTo?si=yx1BHGOu0FEAoLBl"; // replace with any video

try {
  const transcript = await YoutubeTranscript.fetchTranscript("https://youtu.be/NP1aZVpNGTo?si=yx1BHGOu0FEAoLBl");

  console.log(transcript);
} catch (error) {
  console.error(error);
}