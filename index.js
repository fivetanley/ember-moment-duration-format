/* jshint node: true */
'use strict';

function isFastBoot() {
  return process.env.EMBER_CLI_FASTBOOT === 'true';
}

module.exports = {
  name: 'ember-moment-duration-format',

  init: function() {
    var path = require('path');
    this._super.init.apply(this, arguments);
    if (!isFastBoot()) {
      this.treePaths.vendor = path.dirname(require.resolve('moment-duration-format/lib/moment-duration-format'));
    }
  },

  included: function emberMomentDurationFormatIncluded(app) {
    this._super.included.apply(this, arguments);

    if (isFastBoot()) {
      this.importFastBootDependencies(app);
    } else {
      this.importFromNPM(app);
    }
  },

  importFastBootDependencies: function(app) {
    app.import('vendor/ember-moment-duration-format.fastboot.js');
  },

  importFromNPM: function (app) {
    app.import('vendor/moment-duration-format.js', {type: 'vendor'});
  },

  treeForVendor: function(vendorTree) {
    var mergeTrees = require('broccoli-merge-trees');
    var funnel = require('broccoli-funnel');
    var trees = [];

    if (vendorTree) {
      trees.push(vendorTree);
    }
    if (isFastBoot()) {
      trees.push(funnel(__dirname, './vendor', {
        files: ['ember-moment-duration-format.fastboot.js']
      }));
    }
    return mergeTrees(trees);
  },

  afterInstall: function() {
    return this.addPackageToProject('moment-duration-format', '^1.3.0');
  }
};
