import { Resolver, Query } from "type-graphql";
import { Posts } from "./entity/Posts";
import { User } from "./entity/User";
// import { Rules } from "./helpers/Role";
@Resolver()
export class PostResolvers {
  @Query(() => [User])
  async admin() {
    const isAdmin = await User.find({ role: "Admins" });
    return isAdmin;
  }
  @Query(() => [Posts])
  posts() {
    return Posts.find();
  }
}
