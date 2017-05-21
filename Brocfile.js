var AssetRev = require('broccoli-asset-rev');
var BrowserSync = require('broccoli-browser-sync');
var Funnel = require('broccoli-funnel');
var ImageResize = require('broccoli-image-resize');
var Merge = require('broccoli-merge-trees');
var Sass = require('broccoli-sass');

// Styles
var css = new Sass(['styles', 'node_modules/normalize-scss/sass'], 'index.scss', 'index.css');

// Images
var topImages = new Funnel(new ImageResize(['images/top'], {
  sizes: {
    default: [1920]
  }
}), {
  destDir: 'images/top'
});
var galleryImages = new Funnel(new ImageResize(['images/gallery'], {
  sizes: {
    default: [1920],
    th: [150, 150]
  },
  withoutEnlargement: true
}), {
  destDir: 'images/gallery'
});

var nodes = ['public', topImages, galleryImages, css];

var merged;
if(process.argv[2] === 'build') {
  merged = new Merge(nodes);
} else {
  // Browsersync
  var browserSync = new BrowserSync(nodes, {});
  merged = new Merge(nodes.concat(browserSync));
}

module.exports = AssetRev(merged);
