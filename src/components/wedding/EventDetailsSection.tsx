import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { MapPin, Clock, Calendar } from "lucide-react";
import { useInvitationLanguage } from "./InvitationLanguage";
import { CEREMONY_DATE, RECEPTION_DATE, WEDDING_VENUE, formatWeddingDate, formatWeddingTime } from "./weddingConfig";

const events = [
  { time: CEREMONY_DATE },
  { time: RECEPTION_DATE },
];

const EventDetailsSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const { t, locale } = useInvitationLanguage();

  return (
    <section id="event-details" className="min-h-screen flex flex-col items-center justify-center px-4 py-16">
      <div ref={ref} className={`w-full max-w-sm scroll-fade-in ${isVisible ? "visible" : ""}`}>
        <p className="text-xs tracking-[0.4em] uppercase text-primary mb-4 font-sans-body text-center">
          {t.eventEyebrow}
        </p>
        <h2 className="text-2xl font-serif text-foreground mb-8 text-center">{t.eventTitle}</h2>

        <div className="space-y-4">
          {events.map((event, i) => (
            <div
              key={i}
              className="bg-card rounded-2xl p-6 border border-border text-center"
            >
              <h3 className="font-serif text-lg text-foreground mb-4">{i === 0 ? t.ceremony : t.reception}</h3>
              <div className="space-y-2 mb-5">
                <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm font-sans-body">
                  <Calendar className="w-4 h-4 text-primary" />
                  {formatWeddingDate(locale)}
                </div>
                <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm font-sans-body">
                  <Clock className="w-4 h-4 text-primary" />
                  {formatWeddingTime(event.time)}
                </div>
                <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm font-sans-body">
                  <MapPin className="w-4 h-4 text-primary" />
                  <div>
                    <p className="font-medium text-foreground">{WEDDING_VENUE.name}</p>
                    <p className="text-xs">{WEDDING_VENUE.address}</p>
                  </div>
                </div>
              </div>
              <a
                href={WEDDING_VENUE.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-full text-sm font-sans-body font-medium hover:opacity-90 transition-opacity"
              >
                <MapPin className="w-4 h-4" />
                {t.map}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventDetailsSection;
