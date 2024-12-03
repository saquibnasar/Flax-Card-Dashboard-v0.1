import axios from "axios";

export const getYtVideoTitle = async (youtubeLink: string) => {
  try {
    const videoId = getYoutubeVideoId(youtubeLink);
    const apiKey = "AIzaSyC7MZzunIBWqkCDnPHmZy2JeZvgCjQ3qO0";
    const apiUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`;
    const response = await axios.get(apiUrl).then((response) => response);

    const title = response.data.items[0].snippet.title;
    return title;
  } catch (error) {
    console.error("Error fetching video title:", error);
  }
};

const getYoutubeVideoId = (url: string) => {
  const regExp =
    /^(https?:\/\/)?(www\.)?(youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

  const match = url.match(regExp);

  if (match && match[4]) {
    return match[4];
  }

  return null;
};
