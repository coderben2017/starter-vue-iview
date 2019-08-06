let util = {};

util.title = function (title) {
  title = title ? title + ' - Home' : 'starter-vue-iview';
  window.document.title = title;
};

export default util;
