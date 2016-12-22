(function() {
  // Make moment available in the scope of moment-duration-format
  // so that it loads properly with FastBoot.require.
  // This is the workaround listed here: https://github.com/jsmreese/moment-duration-format/issues/29#issuecomment-146863196
  //
  // This looks like it could land in moment core:
  // https://github.com/moment/moment/pull/3615
  var moment = FastBoot.require('moment');
  FastBoot.require('moment-duration-format');
})();
