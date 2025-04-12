import { ImageType } from "@/types";

interface GridItemProps {
  picture: ImageType;
  title: string;
  description: string;
  className?: string;
}

const GridItem = ({
  picture,
  title,
  description,
  className,
}: GridItemProps) => {
  return (
    <div className="space-y-5">
      <img
        src={picture.src}
        alt={picture.alt}
        className="aspect-square object-cover object-center"
      />
      <div className="text-center space-y-2">
        <h2 className="text-3xl text-slate-900 font-semibold tracking-wide">
          {title}
        </h2>
        <p className="tracking-wide font-light text-justify">{description}</p>
      </div>
    </div>
  );
};

export default GridItem;
