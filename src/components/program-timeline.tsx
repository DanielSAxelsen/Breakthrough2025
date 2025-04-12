// Temporarily using hardcoded data instead of translations

export default function ProgramTimeline() {
  // Define hardcoded timeline data for testing
  const timelineData = [
    {
      time: "9:30",
      title: "Breakfast & Catch-up",
      description: "For the coffee lovers, the slow risers, and the morning-fresh—buns, tea, and good company await the early birds."
    },
    {
      time: "10:00",
      title: "Kick-off & Welcome",
      description: "This is where it all begins—so don't be late! We'll set the tone for a fun and engaging day with a bit of teambuilding to get everyone connected."
    },
    {
      time: "10:20",
      title: "Victor Winsteén: Lean – The Industry's Answer to Efficiency & Teamwork",
      description: "Lean isn't just a corporate mantra—it's a mindset that empowers teams to solve problems together and drive continuous improvement. With hands-on experience optimizing production at Novo Nordisk, Victor brings a fresh and engaging perspective on how Lean principles can boost business performance and even apply to everyday life."
    },
    {
      time: "11:00",
      title: "Workshop: Welcome to the LEGO Factory",
      description: "Time to build, improve, and repeat. Experience continuous improvement through hands-on challenges that bring Lean principles to life."
    },
    {
      time: "12:00",
      title: "Lunch & Free Building",
      description: "Refuel with a tasty lunch and explore the LEGO sets at your own pace. Whether you're building something bold or just playing around—this is your creative space."
    },
    {
      time: "13:30",
      title: "Workshop: Teamwork Unplugged – The Deep Dive",
      description: "This is the experimental part of the day. Together, we'll explore what makes great teamwork tick—through open conversation, reflection, and shared observations."
    },
    {
      time: "14:00",
      title: "Free Building / LEGO Team Exercises",
      description: "The afternoon flows with the mood of the room. Keep building freely, or dive into exercises from the LEGO Events Toolbox—fun, hands-on activities designed to strengthen collaboration, creativity, and communication."
    },
    {
      time: "15:30",
      title: "Wrapping up",
      description: "We'll close the program with key reflections, takeaways, and feedback from the day. But the fun doesn't have to end here..."
    },
    {
      time: "16:00",
      title: "After Party & Dinner",
      description: "Beers, bricks, and good vibes. We'll move to a nearby venue to unwind together. And for those who'd like to join, we'll have dinner at Mantzius Restaurant at 18:00 after clean-up."
    }
  ];

  // Items with images are at indices 2 (presentation), 4 (lunch), and 8 (afterParty)

  return (
    <div className="relative">
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
                        src="/NNLego.jpg"
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
  );
}