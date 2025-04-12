interface TimeLineRowCardProps {
  item: {
    year?: number;
    title: string;
    subtitle?: string;
    description: string;
  };
}

const TimeLineRowCard = ({ item }: TimeLineRowCardProps) => {
  return (
    <div className="px-10 py-12 rounded-lg shadow-xl">
      <div className="flex items-center text-base gap-x-2">
        {item.year && (
          <>
            <span className="font-semibold text-primary">{item.year}</span> -{" "}
          </>
        )}
        <span className="font-medium text-header text-xl"> {item.title}</span>
      </div>
      <p
        className="mt-2 text-sm tracking-widest leading-loose"
        dangerouslySetInnerHTML={{ __html: item.description }}
      />
      {item.subtitle && (
        <p
          className="mt-2 text-sm tracking-widest leading-loose"
          dangerouslySetInnerHTML={{ __html: item.subtitle }}
        />
      )}
    </div>
  );
};

export default TimeLineRowCard;
