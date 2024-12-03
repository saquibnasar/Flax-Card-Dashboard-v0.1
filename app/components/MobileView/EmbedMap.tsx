import useUserAdditionalContent from "@/app/stores/useUserAdditionalContent";
import { embedMediaType } from "@/app/utils/entities/UserCardDetails";
import useGoogleMapsPlace from "@/app/utils/hooks/useGoogleMapPlace";
import classNames from "classnames";
import Link from "next/link";
import { RiArrowRightFill, RiArrowRightLine } from "react-icons/ri";

interface Props {
  embedMap?: embedMediaType;
  theme?: "light" | "dark";
}
const EmbedMap = ({ embedMap, theme }: Props) => {
  let latitude = 0;
  let longitude = 0;

  if (embedMap?.value) {
    const latAndLong = extractLatLng(embedMap.value);
    if (latAndLong?.latitude && latAndLong?.longitude) {
      latitude = latAndLong?.latitude;
      longitude = latAndLong?.longitude;
    }
  }

  const placeName = useGoogleMapsPlace(embedMap?.value || "");

  if (embedMap?.value)
    return (
      <>
        <h1 className="text-sm font-medium mb-2">{embedMap.title}</h1>

        <div className="z-0 overflow-hidden border border-accent rounded-lg shadow-lg">
          <div className={"relative"}>
            <iframe
              className="w-full h-[180px]"
              style={{ border: 0 }}
              src={`https://www.google.com/maps/embed/v1/place?q=${latitude},${longitude}&key=AIzaSyC7MZzunIBWqkCDnPHmZy2JeZvgCjQ3qO0`}
              allowFullScreen
            />
            {placeName && (
              <p className="absolute bottom-2 left-2 p-2 shadow-lg rounded-lg bg-primary text-xs">
                {placeName}
              </p>
            )}
          </div>
          <div
            className={
              "space-y-2 p-2 w-full " +
              classNames({
                "bg-gradient-to-b from-[#333333] to-[#212121] border-none":
                  theme === "dark",
                "bg-white shadow-lg": theme === "light",
              })
            }
          >
            <Link
              className="border text-tSecondary font-semibold border-[#CBCBCB] flex space-x-3 justify-center items-center px-3 py-2 rounded-md w-fit text-center"
              href={embedMap.value}
              target="_blank"
            >
              <p className="text-xs">Drive to Location</p>
              <span className="text-md">
                <RiArrowRightLine />
              </span>
            </Link>
          </div>
        </div>
      </>
    );
};

const extractLatLng = (
  mapLink: string
): { latitude: number; longitude: number } | null => {
  const match = mapLink.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);

  if (match && match.length === 3) {
    const [, latitude, longitude] = match;
    return {
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
    };
  }

  return null;
};

export default EmbedMap;
