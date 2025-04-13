import { useTranslations } from "next-intl";

export default function ProgramTimeline() {
  const t = useTranslations("PracticalInfo.program.schedule");

  // Define timeline data using translations
  const timelineData = [
    {
      time: t("breakfast.time"),
      title: t("breakfast.title"),
      description: t("breakfast.description")
    },
    {
      time: t("kickoff.time"),
      title: t("kickoff.title"),
      description: t("kickoff.description")
    },
    {
      time: t("presentation.time"),
      title: t("presentation.title"),
      description: t("presentation.description")
    },
    {
      time: t("workshop1.time"),
      title: t("workshop1.title"),
      description: t("workshop1.description")
    },
    {
      time: t("lunch.time"),
      title: t("lunch.title"),
      description: t("lunch.description")
    },
    {
      time: t("workshop2.time"),
      title: t("workshop2.title"),
      description: t("workshop2.description")
    },
    {
      time: t("freeBuilding.time"),
      title: t("freeBuilding.title"),
      description: t("freeBuilding.description")
    },
    {
      time: t("closing.time"),
      title: t("closing.title"),
      description: t("closing.description")
    },
    {
      time: t("afterParty.time"),
      title: t("afterParty.title"),
      description: t("afterParty.description")
    }
  ];

  // Items with images are at indices 2 (presentation), 4 (lunch), and 8 (afterParty)

  return (
    <div className="relative">
      {/* Mobile view */}
      <div className="md:hidden">
        <div className="space-y-12">
          {timelineData.map((item, index) => {
            // Check if this item should have an image
            const hasImage = index === 2 || index === 4 || index === 8; // Presentation, Lunch, After Party

            return (
              <div key={index} className="flex flex-col space-y-4">
                {/* Time and title */}
                <div className="flex items-center space-x-3">
                  <div className="bg-primary text-white text-xs font-mono font-semibold py-1 px-2 rounded-md">
                    {item.time}
                  </div>
                  <h3 className="text-lg font-semibold">
                    {item.title}
                  </h3>
                </div>

                {/* Description */}
                <div className="pl-2 border-l-2 border-gray-200">
                  <p className="text-muted-foreground text-sm">
                    {item.description}
                  </p>
                </div>

                {/* Images and video for specific sections */}
                {hasImage && (
                  <div className="mt-4 space-y-4">
                    {/* Victor's presentation section */}
                    {index === 2 && (
                      <>
                        <div className="flex justify-center">
                          <div className="w-32 h-32 rounded-full overflow-hidden shadow-md">
                            <video
                              src="/Victorvid.mp4"
                              className="w-full h-full object-cover"
                              autoPlay
                              loop
                              muted
                              playsInline
                              preload="metadata"
                            />
                          </div>
                        </div>
                        <img
                          src="/NNLego.png"
                          alt="Novo Nordisk Lego"
                          className="w-full rounded-lg shadow-md object-cover block mt-4"
                        />
                      </>
                    )}

                    {/* Lunch & Free Building section */}
                    {index === 4 && (
                      <div className="space-y-4">
                        <img
                          src="/LegoSet1.jpg"
                          alt="Lego Set 1"
                          className="w-full rounded-lg shadow-md object-cover h-48"
                        />
                        <img
                          src="/LegoSet2.jpg"
                          alt="Lego Set 2"
                          className="w-full rounded-lg shadow-md object-cover h-48"
                        />
                      </div>
                    )}

                    {/* After Party section */}
                    {index === 8 && (
                      <div className="space-y-4">
                        <img
                          src="/Mantzius.JPG"
                          alt="Mantzius"
                          className="w-full rounded-lg shadow-md object-cover h-48"
                        />
                        <img
                          src="/Mantzius2.JPG"
                          alt="Mantzius 2"
                          className="w-full rounded-lg shadow-md object-cover h-48"
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Desktop view */}
      <div className="hidden md:block relative">
        {/* Line running through timeline */}
        <div className="absolute left-[14px] top-0 bottom-0 w-0.5 bg-gray-200 z-0" />

        {/* Timeline items */}
        <div className="space-y-8">
          {timelineData.map((item, index) => {
            // Check if this item should have an image
            const hasImage = index === 2 || index === 4 || index === 8; // Presentation, Lunch, After Party

            return (
              <div key={index} className="grid grid-cols-12 gap-6">
                {/* Time with white background to create gap in timeline */}
                <div className="relative col-span-1 font-mono text-xs text-primary font-semibold pt-2">
                  <div className="bg-white py-1 relative z-10 -ml-1 pl-1 pr-2">
                    {item.time}
                  </div>
                </div>

                {/* Content */}
                <div className={`pt-2 ${hasImage ? 'col-span-6' : 'col-span-11'} pr-4`}>
                  <h3 className="text-xl font-semibold mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {item.description}
                  </p>
                </div>

                {/* Images and video for specific sections */}
                {hasImage && (
                  <div className="col-span-5 space-y-4">
                    {/* Victor's presentation section */}
                    {index === 2 && (
                      <>
                        <video
                          src="/Victorvid.mp4"
                          className="w-1/2 mx-auto rounded-lg shadow-md object-cover block"
                          autoPlay
                          loop
                          muted
                          playsInline
                          preload="metadata"
                        />
                        <img
                          src="/NNLego.png"
                          alt="Novo Nordisk Lego"
                          className="w-1/2 mx-auto rounded-lg shadow-md mt-4 object-cover h-48 block"
                        />
                      </>
                    )}

                    {/* Lunch & Free Building section */}
                    {index === 4 && (
                      <div className="grid grid-cols-2 gap-4 overflow-hidden">
                        <img
                          src="/LegoSet1.jpg"
                          alt="Lego Set 1"
                          className="w-full rounded-lg shadow-md object-cover h-44 transform scale-110"
                        />
                        <img
                          src="/LegoSet2.jpg"
                          alt="Lego Set 2"
                          className="w-full rounded-lg shadow-md object-cover h-44 transform scale-110"
                        />
                      </div>
                    )}

                    {/* After Party section */}
                    {index === 8 && (
                      <div className="grid grid-cols-2 gap-4 overflow-hidden">
                        <img
                          src="/Mantzius.JPG"
                          alt="Mantzius"
                          className="w-full rounded-lg shadow-md object-cover h-44 transform scale-110"
                        />
                        <img
                          src="/Mantzius2.JPG"
                          alt="Mantzius 2"
                          className="w-full rounded-lg shadow-md object-cover h-44 transform scale-110"
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}