# UHP test

# Summary

## Resources:
 - Provided PSD document with design,
 - Bootstrap 4.2,
 - Slick slider,
 - SVG images exported from AI (except logo, it's messed up),
 - Fonts downloaded from Google Fonts Helper heroku web app, with Latin extended support for german symbols,
 - 7-1 folder structure,
 - Prepros.

## Procedure:

 - PSD document analysis and defining sections and elements,
 - SVG, typography and colors export,
 - Coding static, semantic HTML,
 - Writing modular SCSS (following best practices and naming conventions:
  -a-b/(c)-uvw-xyz - first letter is abbr for project name, second one/two letters are type of component (section, subsection, component, utility, styled element, and last one/two words are name of the element),
 - Adding Bootstrap plugins, slider init and back-to-top trigger.

## Details:

 - HTML: Having in mind responsiveness of test website, I made solid HTML structure, clean, with proper indentation.
 - CSS: CSS is written in SCSS and compiled using Prepros GUI and processed using POSTCSS plugin for autoprefixing and minification. This website being fairly simple, didn't require too much work about layout, so Bootstrap is not that needed, but I included it (both .css and .js files).
 - JS: JavaScript is written in both jQuery and Vanilla.

## Summary:

 - [x] Responsive from 320px vw to 2500+px vw,
 - [x] Retina ready,
 - [x] Pixel perfect,
 - [x] Stripped of unnecessary .css and .js files for fast loading, the ones included are mainly for demonstration purposes,
 - [x] All .css, including fonts is cross browser compatible and has support for all major modern browsers up to 5 last versions.
 - [x] I found animations not necessary (but if needed AOS.js library is my recommendation). Instead I used transitions on links and linear ease on slider. Also, back-to-top button has a nice smooth scroll.
 - [x] Slider is touch/mobile friendly and completely draggable.
 
 PS.
Some details were not designed perfectly and seemed too big on 1376/768px resolution, so I fixed them to match the rest of the site.
Also, "a href" tags are missing title tags and images are mostly missing alt tags (important for SEO), but in a lack of time I found it uncessary for testing purposes.

Website is pushed to GitHub for versioning, and is hosted on https://bigsstudio.com/uhp/.
