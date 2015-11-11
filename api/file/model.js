"use strict";

module.exports = function (thinky) {
  const type = thinky.type;

  const File = thinky.createModel("File", {
    id: type.string(),
    name: type.string(),
    createdAt: type.date().default(function () {
      return Date.now();
    })
  });
};