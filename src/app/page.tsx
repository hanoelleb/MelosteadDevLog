import Image from "next/image";
import variables from "../../styles/variables.module.scss";
import { randomUUID } from "crypto";
import { NavBar } from "@/components/NavBar";

const FeatureDescription = ({
  featureName,
  description,
}: {
  featureName: string;
  description: string;
}) => {
  return (
    <li>
      <h2>{featureName}</h2>
      <p>{description}</p>
    </li>
  );
};

export default function Home() {
  const features: { featureName: string; description: string }[] = [
    {
      featureName: "Master your Craft",
      description:
        "Craft your wares in your forge, cauldron, or workstation. Discover new recipes and upgrade your equipment to make a wide variety of items. Earn new titles in the Artisan Guild as you gain more experience. Upgrade all your tools to make better and more complex wares.",
    },
    {
      featureName: "Run your shop",
      description:
        "Open a shop to sell your wares. Pricing, displaying, selling, and the shop layout are all managed by you.",
    },
    {
      featureName: "Reform the Trade Routes",
      description:
        "Crafting takes materials! Travel forgotten trade routes and exchange your wares for exotic materials and equipment. Reestablish the trade routes and build partnerships with other (fantastical) communities.",
    },
    {
      featureName: "Explore and Collect Materials",
      description:
        "Fishing, mining, foraging, trading. Collect materials in a myriad of ways to use for your wares. Get licenses to collect materials in other regions or form partnerships with other communities.",
    },
    {
      featureName: "Build Relationships with your neighbors",
      description:
        "Get to know your neighbors and all their stories. Melostead has many characters with secrets and wishes, hopes and dreams. You may end up being a confidant.",
    },
    {
      featureName: "Find love",
      description:
        "Are you the romantic sort? You may find yourself falling for the innkeeper-next-door or the studious wizard out on an adventure. Pursue a relationship to go on dates and have special moments together. There could be a wedding bell in the future...",
    },
    {
      featureName: "Revive your Town",
      description:
        "The entire kingdom of Anagar is still in disrepair after the Curses and Melostead is no exception. Work with your neighbors to make the town nicer, repairing old buildings and adding new amenities in addition to boosting Melostead's economy.",
    },
    {
      featureName: "Help Heroes on their Quest",
      description:
        "A group of heroes are on their own quest and the local inn seems to be a great hub. While you may not be a dragon slayer, you may find yourself involved in a greater adventure after all.",
    },
    {
      featureName: "Customize your Character",
      description:
        "Your appearance, profession, and even personality are all up to you! Personality and profession may influence how others interact with you.",
    },
  ];

  return (
    <>
      <main className={variables.MainPage}>
        <Image
          src="/banner.png"
          alt="Background banner for Made in Melostead Logo"
          quality={100}
          width={2048}
          height={661}
          sizes="100vw"
          layout="responsive"
        />

        <Image
          src="/logo.png"
          alt="Made in Melostead logo"
          width={640}
          height={360}
          style={{ marginTop: "-400px" }}
        />

        <NavBar></NavBar>

        <div className={variables.MainSegment}>
          <h1>Story</h1>
          <p>
            Not so long ago, the Four Curses ravaged the kingdom of Anagar. A
            never-ending storm rampaged the mountain. Lakes and rivers froze
            over. An infectious blight contaminated the flora and fauna. And a
            deadly plague swept across villages. Five heroes banded together and
            stopped the Curses. Most of their whereabouts after were unknown.
          </p>
          <p>
            Yet the Four Curses were only an omen for something worse to come
            and a new hero heeds the call. But that is not you...
          </p>
          <p>
            Orphaned by the curses as a child, you were taken in by your
            mother&apos;s master to learn her craft, leaving your home in
            Melostead behind. Now years later, you complete your training and
            return to Melostead to take over your mother&apos;s old shop. A new
            life awaits you as you rebuild your shop, make a home, master your
            craft, and befriend your neighbors.
          </p>
          <p>
            As you revive Melostead, you might find yourself visiting and
            trading with other communities rebuilding themselves. You may
            partake in, or even influence, the restoration of Anagar.
          </p>
          <p>
            And as a hero journeys across Anagar to resolve this dragon
            business, your paths may cross more than once.
          </p>
        </div>
        <div className={variables.MainSegment}>
          <h1>Features</h1>
          <ul>
            {features.map(({ featureName, description }) => {
              return (
                <FeatureDescription
                  key={randomUUID()}
                  featureName={featureName}
                  description={description}
                ></FeatureDescription>
              );
            })}
          </ul>
        </div>
      </main>
      <footer className={variables.Footer}>
        <Image
          src="/cherryCapra.png"
          alt="logo of developer cherryCapra"
          width={200}
          height={200}
          quality={100}
          className={variables.DevIcon}
        ></Image>
        <p>Developed by cherryCapra</p>
      </footer>
    </>
  );
}
