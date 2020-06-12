import { Resolver, Query, Mutation, Arg } from "type-graphql";
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
  @Mutation(() => Boolean)
  async sendToAll(
    @Arg("name") name: string,
    @Arg("header") header: string,
    @Arg("body") body: string,
    @Arg("email") email: string
  ) {
    const users = await User.find();
    users.map((): void | boolean => {
      try {
        Posts.insert({
          name,
          header,
          body,
          email,
        })
          .then(() => {
            return true;
          })
          .catch((err) => {
            console.log(err);
            return false;
          });
      } catch (err) {
        console.log(err);
        return false;
      }
    });
  }
  @Query(() => [Posts])
  async posts(@Arg("email") email: string) {
    const posts = Posts.find({ where: { email } });
    if (!posts) {
      throw new Error("Cannot find posts for that user");
    }
    return posts;
  }
  @Mutation(() => Boolean)
  async userPosts(
    @Arg("name") name: string,
    @Arg("header") header: string,
    @Arg("body") body: string,
    @Arg("email") email: string
  ) {
    try {
      await Posts.insert({
        name,
        header,
        body,
        email,
      });
    } catch (err) {
      console.log(err);
      return false;
    }
    return true;
  }
}
