
import { MainNav } from "./pageElement";
import { PurpleBlock } from "./pageElement";  
import { TopHeader } from "./pageElement";
import { Footer } from "./Footers";
import { Filter } from "./filter";
import { FavoriteMajors } from "./favoriteMajors";
import { ReturnHome } from "./pageElement";

export function FavoritePage() {
    return <div>
      <header><TopHeader /></header>
      <PurpleBlock name={"Favorite Programs"}/>
      <MainNav />
      <ReturnHome />
      <Filter />
      <FavoriteMajors />
      <Footer />
      </div>;
  }