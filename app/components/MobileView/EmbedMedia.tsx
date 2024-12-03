import { embedMediaType } from "@/app/utils/entities/UserCardDetails";
import classNames from "classnames";
import { useMemo } from "react";

interface Props {
  embedMedia?: embedMediaType;
  theme?: "light" | "dark";
}

const EmbedMedia = ({ embedMedia, theme }: Props) => {
  const videoId = useMemo(() => {
    if (embedMedia && embedMedia.value) {
      const parts = embedMedia.value.split("=");
      return parts[1];
    }
    return null;
  }, [embedMedia]);

  if (embedMedia?.value)
    return (
      <div
        className={classNames({
          "z-0 shadow rounded-lg overflow-hidden": true,
          "bg-gradient-to-b from-[#333333] to-[#212121] border-none":
            theme === "dark",
          "bg-white shadow-lg": theme === "light",
          // "bg-gradient-to-b from-primary to-dPrimary": theme === "light",
        })}
      >
        <div className="w-full">
          <iframe
            className="w-full"
            src={`https://www.youtube.com/embed/${videoId}?width=&height=360`}
            title={embedMedia.title}
          />
        </div>
        <h1 className="p-2 text-sm font-semibold">{embedMedia.title}</h1>
      </div>
    );
};

export default EmbedMedia;
