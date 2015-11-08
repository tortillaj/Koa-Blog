module.exports = {
  error: function(err) {
    if (err.message.indexOf("Document not found") >= 0) {
      this.status = 404;
    } else {
      this.status = 500;
    }

    this.body = { error: err.message || "There was a problem." };
  }
};