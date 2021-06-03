
import { MainNav } from "./pageElement";
import { PurpleBlock } from "./pageElement";  
import { TopHeader } from "./pageElement";
import { Footer } from "./Footers";
import { Filter } from "./filter";
import { FavoriteMajors } from "./FavoriteMajors";

export function FavoritePage() {
    return <div>
      <header><TopHeader /></header>
      <PurpleBlock name={"Favorite Programs"}/>
      <MainNav />
      <Filter />
      <FavoriteMajors />
      <Footer />
      </div>;
  }