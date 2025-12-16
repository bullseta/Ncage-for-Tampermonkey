Ncage for Tampermonkey is a powerful and enhanced fork of the classic nCage+ image replacement script, reimagined for modern browsing and userscript environments.

While nCage+ originally gained fame for its humorous ability to replace all images on a page with themed pictures (famously Nicolas Cage), this fork takes the core idea to the next level with a far more aggressive and comprehensive approach.

This script replaces every image and background asset on every page you visit with images from a custom collection — not just static <img> tags, but dynamically loaded visuals, lazy-loaded elements, CSS background-images, and even images injected after the page initially loads.

💡 What makes it stand out

🔁 Multi-stage replacement: runs initial replacements on page load, plus delayed and repeated scans to catch images added later by page scripts.

🚫 Lazy-loader and srcset support: clears and overrides srcset, sizes, data-src, data-srcset, and similar attributes to ensure all visuals are substituted.

🎨 CSS background coverage: not limited to <img> elements — it replaces background images applied via inline styles.

👁️ Intersection Observer integration: detects images that only become visible on scroll and replaces them too.

🔄 Live DOM monitoring: observes changes to the page and instantly replaces any new visual content.

This isn’t just a prank script — it’s a comprehensive image override engine for anyone who wants total control over visual content in their browser, powered by Tampermonkey or any userscript manager that supports standard metadata.
Perfect for art projects, content transformation experiments, or just plain chaos — bringing a fresh twist to the evergreen nCage+ concept.
