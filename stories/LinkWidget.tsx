import Image from "next/image";

interface LinkWidgetProps {
  columnSpan?: string;
}

const LinkWidget = ({ columnSpan = "1" }: LinkWidgetProps) => {
  const col = `col-span-${columnSpan}`;
  return (
    <article style={{ width: "300px", height: "186px" }} className="bg-black">
      <div className="w-[44px] h-[44px] relative">
        <Image
          className="object-cover"
          src={
            "https://static.cdninstagram.com/rsrc.php/v3/yI/r/VsNE-OHk_8a.png"
          }
          alt="favicon"
          fill
        />
      </div>
    </article>
  );
};

export default LinkWidget;
