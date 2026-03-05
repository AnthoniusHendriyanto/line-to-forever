import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { MapPin, Clock, Calendar } from "lucide-react";

const events = [
  {
    title: "Holy Matrimony",
    date: "December 28, 2025",
    time: "10:00 AM",
    location: "St. Mary's Cathedral",
    address: "Jakarta, Indonesia",
    mapUrl: "https://maps.google.com",
  },
  {
    title: "Wedding Reception",
    date: "December 28, 2025",
    time: "12:00 PM",
    location: "The Grand Ballroom",
    address: "Jakarta, Indonesia",
    mapUrl: "https://maps.google.com",
  },
];

const EventDetailsSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 py-16">
      <div ref={ref} className={`w-full max-w-sm scroll-fade-in ${isVisible ? "visible" : ""}`}>
        <p className="text-xs tracking-[0.4em] uppercase text-primary mb-4 font-sans-body text-center">
          Save The Date
        </p>
        <h2 className="text-2xl font-serif text-foreground mb-8 text-center">Wedding Events</h2>

        <div className="space-y-4">
          {events.map((event, i) => (
            <div
              key={i}
              className="bg-card rounded-2xl p-6 border border-border text-center"
            >
              <h3 className="font-serif text-lg text-foreground mb-4">{event.title}</h3>
              <div className="space-y-2 mb-5">
                <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm font-sans-body">
                  <Calendar className="w-4 h-4 text-primary" />
                  {event.date}
                </div>
                <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm font-sans-body">
                  <Clock className="w-4 h-4 text-primary" />
                  {event.time}
                </div>
                <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm font-sans-body">
                  <MapPin className="w-4 h-4 text-primary" />
                  <div>
                    <p className="font-medium text-foreground">{event.location}</p>
                    <p className="text-xs">{event.address}</p>
                  </div>
                </div>
              </div>
              <a
                href={event.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-full text-sm font-sans-body font-medium hover:opacity-90 transition-opacity"
              >
                <MapPin className="w-4 h-4" />
                Open Map
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventDetailsSection;
