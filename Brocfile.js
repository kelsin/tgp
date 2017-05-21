var Funnel = require('broccoli-funnel');
var Merge = require('broccoli-merge-trees');

var compileSass = require('broccoli-sass');
var css = compileSass(['styles', 'node_modules/normalize-scss/sass'], 'index.scss', 'index.css');

var ImageResize = require('broccoli-image-resize');
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

var AssetRev = require('broccoli-asset-rev');
module.exports = AssetRev(new Merge(['public', topImages, galleryImages, css]));
