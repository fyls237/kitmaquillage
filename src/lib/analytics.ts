/**
 * Analytics — Gestion des événements côté client
 * Tous les pixels sont bloqués par défaut et ne s'activent
 * qu'après consentement explicite via le CookieBanner.
 */

declare global {
  interface Window {
    ttq?: {
      load: (pixelId: string) => void;
      page: () => void;
      track: (event: string, data?: Record<string, unknown>) => void;
    };
    fbq?: (
      action: string,
      event: string,
      data?: Record<string, unknown>
    ) => void;
    _fbq?: unknown;
  }
}

/**
 * Initialise le TikTok Pixel si l'ID est configuré.
 */
export function initTikTokPixel(): void {
  const pixelId = process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID;
  if (!pixelId || typeof window === "undefined") return;

  // Inject TikTok Pixel base code
  const script = document.createElement("script");
  script.innerHTML = `
    !function (w, d, t) {
      w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];
      ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"];
      ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};
      for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);
      ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e};
      ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;
      ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e+"-"+o]=+new Date,ttq._o=ttq._o||{},ttq._o[e+"-"+o]=n||{};
      var i=document.createElement("script");i.type="text/javascript";i.async=!0;i.src=r+"?sdkid="+e+"&lib="+t;
      var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(i,a)};
    }(window, document, 'ttq');
    ttq.load('${pixelId}');
    ttq.page();
  `;
  document.head.appendChild(script);
}

/**
 * Initialise le Meta (Facebook) Pixel si l'ID est configuré.
 */
export function initMetaPixel(): void {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  if (!pixelId || typeof window === "undefined") return;

  // Inject Meta Pixel base code
  const script = document.createElement("script");
  script.innerHTML = `
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '${pixelId}');
    fbq('track', 'PageView');
  `;
  document.head.appendChild(script);
}

/**
 * Initialise tous les pixels analytics.
 */
export function initAllPixels(): void {
  initTikTokPixel();
  initMetaPixel();
}

/**
 * Déclenche l'événement standard Lead sur tous les pixels actifs.
 */
export function trackLead(): void {
  if (typeof window === "undefined") return;

  // TikTok Pixel
  if (window.ttq) {
    window.ttq.track("SubmitForm");
  }

  // Meta Pixel
  if (window.fbq) {
    window.fbq("track", "Lead");
  }
}
