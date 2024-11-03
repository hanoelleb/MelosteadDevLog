import variables from "../../../styles/variables.module.scss";
import Link from "next/link";
import Image from "next/image";
import villagers from "../../../json/Villagers.json";
import { NavBar } from "@/components/NavBar";

const CharacterSelect = ({ charName }: { charName: string }) => {
  return (
    <div className={variables.CharacterElement}>
      <div className={variables[`CharacterSelect${charName}`]}>
        <Image
          src={`/portraits/${charName}/Neutral.png`}
          alt={`pixel portrait of the character ${charName} from Made in Melostead`}
          width={250}
          height={250}
        ></Image>
      </div>
      <Link href={`/characters/${charName}`}>{charName}</Link>
    </div>
  );
};

export default function CharacterCastPage() {
  const ROMANCEABLE_CHARACTERS = [
    "Astrid",
    "Mirabelle",
    "Zuri",
    "Lenore",
    "Rosamund",
    "Raleigh",
    "Gerard",
    "Marlon",
    "Yasha",
    "Theo",
  ];

  return (
    <div
      className={variables.CharacterPage}
      style={{
        backgroundImage: `url(/plainBackgroundScaled.png)`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        width: "99vw",
        height: "98vh",
      }}
    >
      <NavBar></NavBar>

      <div className={variables.Intro}>
        <h1>Characters</h1>
        <p>
          There&apos;s a lot of people excited to meet you in Melostead! Uma the
          village elder founded Melostead with the hope to help others who lost
          something from the Cursed Time. Homes, health, loved ones...most in
          Melostead have lost something. There&apos;s a wide array of
          personalities to be found in Melostead. And small as it may be, it
          seems the local inn may attract some adventurers that are curious
          about the locals. If you&apos;re the social type, you may come to
          learn a lot about your neighbors and gain very close friends and if
          you're interested, you may even find a significant other.
        </p>
      </div>

      <div className={variables.CharacterList}>
        <h2>Potential Romances</h2>
        <span style={{ flexBasis: "100%", marginLeft: "4vw" }}>
          (Click on their name to find out more!)
        </span>
        {ROMANCEABLE_CHARACTERS.map((characterName) => {
          return (
            <CharacterSelect
              charName={characterName}
              key={`${characterName}Select`}
            ></CharacterSelect>
          );
        })}
      </div>
      <div className={variables.CharacterList}>
        <h2>Villagers and Travelers</h2>
        <div className={variables.VillagerList}>
          {Object.entries(villagers).map(
            ([charName, { occupation, description }]) => {
              return (
                <div
                  key={`${charName}Element`}
                  className={variables.VillagerEntry}
                >
                  <div className={variables.CharacterVillager}>
                    <Image
                      src={`/portraits/${charName}.png`}
                      alt={`Pixel portrait of ${charName} from Made in Melostead`}
                      width={200}
                      height={200}
                    ></Image>
                  </div>
                  <div className={variables.VillagerDescription}>
                    <h3>{charName}</h3>
                    <p style={{ textAlign: "center" }}>
                      Occupation: {occupation}
                    </p>
                    <p>{description}</p>
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>
      <div className={variables.CharacterList}>
        <h2>Outside of Melostead</h2>
        <span style={{ marginLeft: "5vw", marginTop: "1vw" }}>
          Coming Soon!
        </span>
      </div>
    </div>
  );
}
