import { Resolver, Arg, Mutation, Query } from "type-graphql";
import { Game } from "./entity/Game";

@Resolver()
export class GameResolver {
  @Mutation(() => Boolean)
  async games(
    @Arg("name") name: string,
    @Arg("description") description: string,
    @Arg("price") price: string,
    @Arg("url") url: string
  ) {
    try {
      await Game.insert({
        name,
        description,
        price,
        url,
      });
    } catch (err) {
      console.log(err);
      return false;
    }
    return true;
  }
  @Query(() => [Game])
  async loadGames() {
    const games = await Game.find();

    if (!games) {
      throw new Error("could not find games");
    }
    return games;
  }
  @Mutation(() => Boolean)
  async removeGame(@Arg("name") name: string) {
    try {
      const games = await Game.find({ where: { name } });
      console.log(games);

      if (games.length == 0) {
        return false;
      }
      const remove = await Game.remove(games);
      if (!remove) {
        return false;
      }
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}
