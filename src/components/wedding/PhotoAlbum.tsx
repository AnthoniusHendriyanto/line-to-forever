import { useRef, useState, type ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Camera, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useInvitationLanguage } from "./InvitationLanguage";

interface Photo { src: string; caption: string }

export default function PhotoAlbum({ photos, overlay }: { photos: Photo[]; overlay?: ReactNode }) {
  const { t, language } = useInvitationLanguage();
  const [active, setActive] = useState<number | null>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  const touchStart = useRef<number | null>(null);
  const photo = active === null ? null : photos[active];
  const available = photos.map((item, index) => item.src !== "/placeholder.svg" ? index : -1).filter(index => index >= 0);

  function move(direction: number) {
    setActive(current => {
      if (current === null || !available.length) return current;
      return available[(available.indexOf(current) + direction + available.length) % available.length];
    });
  }

  return (
    <Dialog.Root open={active !== null} onOpenChange={open => { if (!open) setActive(null); }}>
      <div className={photos.length === 1 ? "invitation-photo-single" : "invitation-photo-strip"} tabIndex={photos.length > 1 ? 0 : undefined} role={photos.length > 1 ? "region" : undefined} aria-label={photos.length > 1 ? t.photoHint : undefined}>
        {photos.map((item, index) => (
          <figure className="invitation-memory" key={index}>
            <button
              type="button"
              className="invitation-photo-button"
              disabled={item.src === "/placeholder.svg"}
              aria-label={`${t.photoOpen}: ${item.caption}`}
              onClick={event => { trigger.current = event.currentTarget; setActive(index); }}
            >
              {item.src === "/placeholder.svg" ? (
                <span className="invitation-photo-placeholder"><Camera size={26} strokeWidth={1.25} aria-hidden="true" /><span>{t.photoSoon}</span></span>
              ) : <img src={item.src} alt={item.caption} loading="lazy" decoding="async" />}
              {overlay && <span className="invitation-photo-overlay">{overlay}</span>}
            </button>
            {!overlay && <figcaption>{item.caption}</figcaption>}
          </figure>
        ))}
      </div>
      {photos.length > 1 && <p className="invitation-photo-hint">{t.photoHint}<ChevronRight size={13} aria-hidden="true" /></p>}
      <Dialog.Portal>
        <Dialog.Overlay className="invitation-photo-backdrop" />
        <Dialog.Content
          className="invitation-photo-dialog"
          lang={language}
          onCloseAutoFocus={event => { event.preventDefault(); trigger.current?.focus(); }}
          onKeyDown={event => {
            if (event.key === "ArrowLeft") { event.preventDefault(); move(-1); }
            if (event.key === "ArrowRight") { event.preventDefault(); move(1); }
          }}
          onTouchStart={event => { touchStart.current = event.touches[0].clientX; }}
          onTouchEnd={event => {
            if (touchStart.current !== null) {
              const distance = event.changedTouches[0].clientX - touchStart.current;
              if (Math.abs(distance) > 50) move(distance > 0 ? -1 : 1);
            }
            touchStart.current = null;
          }}
          onTouchCancel={() => { touchStart.current = null; }}
        >
          <Dialog.Title className="sr-only">{photo?.caption}</Dialog.Title>
          <Dialog.Description className="sr-only">{t.photoHint}</Dialog.Description>
          <Dialog.Close className="photo-close" aria-label={t.photoClose}><X size={22} /></Dialog.Close>
          {photo && <img src={photo.src} alt={photo.caption} />}
          <div className="photo-viewer-controls">
            <button type="button" onClick={() => move(-1)} disabled={available.length < 2} aria-label={t.photoPrevious}><ChevronLeft /></button>
            <p aria-live="polite">{photo?.caption}<small>{t.photoCount.replace("{current}", String(available.indexOf(active ?? -1) + 1)).replace("{total}", String(available.length))}</small></p>
            <button type="button" onClick={() => move(1)} disabled={available.length < 2} aria-label={t.photoNext}><ChevronRight /></button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
