import { ImageType } from "@/types";

interface GridItemProps {
  picture: ImageType;
  title: string;
  description: string;
  className?: string;
  isFirst?: boolean;
}

const GridItem = ({
  picture,
  title,
  description,
  className,
  isFirst = false,
}: GridItemProps) => {
  return (
    <div className="space-y-5">
      <div className={`flex justify-center ${isFirst ? 'pt-0 sm:pt-4' : 'pt-4'}`}>
        <img
          src={picture.src}
          alt={picture.alt}
          className="w-24 h-24 object-cover object-center rounded-full"
        />
      </div>
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
