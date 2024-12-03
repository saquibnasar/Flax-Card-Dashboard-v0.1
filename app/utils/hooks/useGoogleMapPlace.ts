const useGoogleMapsPlace = (url: string) => {
  let placeNames = "";

  const regex = /place\/([^\/?]+)(?:[\/?]|$)/;
  const match = url.match(regex);

  if (match && match[1]) {
    const formattedPlaceNames = match[1]
      .replace(/\+/g, " ")
      .replace(/%2C/g, ",");
    placeNames = formattedPlaceNames;
  } else {
    placeNames = "";
  }

  return placeNames;
};

export default useGoogleMapsPlace;
