export function AnnouncementBar() {
  return (
    <div className="bg-ink text-ivory/90" role="region" aria-label="Announcements">
      <div className="container-shell flex items-center justify-center gap-3 overflow-hidden py-2 text-center">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold-light" aria-hidden="true" />
        <p className="truncate text-[12.5px] font-medium tracking-[0.08em]">
          Handcrafted in India · Worldwide Shipping · Complimentary premium packaging over ₹5,000
        </p>
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold-light" aria-hidden="true" />
      </div>
    </div>
  );
}
