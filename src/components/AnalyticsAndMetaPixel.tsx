import React, { useEffect } from 'react';

interface AnalyticsAndMetaPixelProps {
  pixelId?: string;
  gaMeasurementId?: string;
}

/**
 * AnalyticsAndMetaPixel is responsible for initializing placeholders for Meta Pixel and Google Analytics.
 * It also exports simple tracking triggers so that form submissions fire tracking events to these platforms.
 */
export default function AnalyticsAndMetaPixel({ 
  pixelId = "XXXXXXXXXXXXXXX", // Placeholder Meta Pixel ID
  gaMeasurementId = "G-XXXXXXXXXX"  // Placeholder Google Analytics ID
}: AnalyticsAndMetaPixelProps) {
  
  useEffect(() => {
    // 1. Initialize Meta Pixel Code (Placeholder implementation)
    console.log(`[Analytics Init] Initializing Meta Pixel with ID: ${pixelId}`);
    /* 
      // Standard Meta Pixel Integration snippet:
      !(function (f, b, e, v, n, t, s) {
        if (f.fbq) return;
        n = f.fbq = function () {
          n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
        };
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = !0;
        n.version = "2.0";
        n.queue = [];
        t = b.createElement(e);
        t.async = !0;
        t.src = v;
        s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s);
      })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
      fbq("init", "${pixelId}");
      fbq("track", "PageView");
    */

    // 2. Initialize Google Analytics 4 (Placeholder implementation)
    console.log(`[Analytics Init] Initializing Google Analytics with ID: ${gaMeasurementId}`);
    /*
      // Standard GA4 snippet:
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`;
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${gaMeasurementId}');
    */
  }, [pixelId, gaMeasurementId]);

  return (
    <div id="analytics-config-layer" className="hidden" aria-hidden="true">
      {/* 
        DEVELOPER DIRECTIVE: 
        To activate real tracking, replace the pixelId/gaMeasurementId props with 
        your institutional values or update the HTML headers in index.html.
        
        Currently, virtual simulated triggers will output telemetry logs to the 
        developer console when parent conversions take place.
      */}
      <span data-pixel-id={pixelId}></span>
      <span data-ga-id={gaMeasurementId}></span>
    </div>
  );
}

/**
 * Triggers a Lead track request to both Meta Pixel and Google Analytics
 */
export function trackAdmissionsLead(leadType: string, details: { grade: string; mode: string }) {
  console.log(`[Analytics Event] Form Submitted - Conversion Accomplished!`);
  
  // Simulated Meta Pixel Event
  if (typeof (window as any).fbq === 'function') {
    (window as any).fbq('track', 'Lead', {
      content_category: 'School Admissions',
      content_name: leadType,
      value: 1.0,
      currency: 'INR',
      predicted_grade: details.grade,
      interaction_mode: details.mode
    });
    console.log('[Meta Pixel] Success: Fired fbq("track", "Lead")');
  } else {
    console.log(`[Meta Pixel Diagnostic Log] fbq("track", "Lead", { grade: "${details.grade}", mode: "${details.mode}" })`);
  }

  // Simulated Google Analytics 4 Event
  if (typeof (window as any).gtag === 'function') {
    (window as any).gtag('event', 'generate_lead', {
      lead_origin: 'Akshara Admissions Portal',
      academic_year: '2026-2027',
      grade_stage: details.grade,
      booking_format: details.mode
    });
    console.log('[Google Analytics] Success: Fired gtag("event", "generate_lead")');
  } else {
    console.log(`[Google Analytics Diagnostic Log] gtag("event", "generate_lead", { grade_stage: "${details.grade}", booking_format: "${details.mode}" })`);
  }
}
