import config from "../../config";
import thinky from "../thinky";

const r = thinky.r;
const type = thinky.type;

const Post = thinky.createModel("Post", {
  id: type.string(),
  title: type.string(),
  slug: type.string().default(function() {
    return this.title.replace(new RegExp(/[^A-Za-z0-9_]/, "ig"), "-").toLowerCase();
  }),
  body: type.string(),
  createdAt: type.date().default(function() { return Date.now(); }),
  updatedAt: type.date().default(function() { return Date.now(); })
});

Post.ensureIndex("title");
Post.ensureIndex("slug");
Post.ensureIndex("createdAt");
Post.pre("save", function(next) {
  this.updatedAt = Date.now();
  this.slug = this.title.replace(new RegExp(/[^A-Za-z0-9_]/, "ig"), "-").toLowerCase();
  next();
});

export default Post;
