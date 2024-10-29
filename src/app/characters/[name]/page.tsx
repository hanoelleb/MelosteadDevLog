"use client";
import Image from "next/image";
import variables from "../../../../styles/variables.module.scss";
import dialogue from "../../../../json/dialogue/Dialogue.json";
import characterInfo from "../../../../json/characterInfo.json";
import { useState } from "react";

import { usePathname } from "next/navigation";
import { NavBar } from "@/components/NavBar";
import { v4 } from "uuid";

const TextBox = ({
  sentence,
  handleNext,
}: {
  sentence: string;
  handleNext: () => void;
}) => {
  return (
    <>
      <div
        style={{
          backgroundColor: variables.uiLightColor,
          borderWidth: "5px",
          borderRadius: "20px",
          borderStyle: "solid",
          borderColor: variables.uiDarkColor,
          width: 800,
          height: 200,
          marginTop: -100,
          marginLeft: "30px",
          position: "absolute",
        }}
      >
        <p style={{ padding: "2vh 2vw 2vh 2vw", fontSize: "1.25em" }}>
          {sentence}
        </p>
      </div>

      <button
        className={variables.TextButton}
        onClick={handleNext}
        style={{ position: "absolute", top: "80vh", left: "48vw" }}
      >
        next
      </button>
    </>
  );
};

const CharacterInfo = ({ charName }: { charName: string }) => {
  const { birthday, likes, dislikes } =
    characterInfo[charName as keyof typeof characterInfo];

  return (
    <div
      className={variables.CharacterInfo}
      style={{
        position: "absolute",
        top: "15vh",
        right: "10vw",
        width: "20vw",
        height: "45vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "baseline",
      }}
    >
      <h2>Birthday: {birthday}</h2>
      <h2>Likes</h2>
      <ul style={{ marginTop: "-10px" }}>
        {likes.map((like) => (
          <li key={v4()}>{like}</li>
        ))}
      </ul>
      <h2>Dislikes</h2>
      <ul style={{ marginTop: "-10px" }}>
        {dislikes.map((dislike) => (
          <li key={v4()}>{dislike}</li>
        ))}
      </ul>
    </div>
  );
};

export default function CharacterPage() {
  const characterName = usePathname()?.split("/")[2];

  const characterDialogue: { emotion: string; content: string }[] =
    dialogue[characterName as keyof typeof dialogue];

  const SENTENCES_LENGTH = characterDialogue.length;

  const [sentenceValue, setSentenceValue] = useState(0);

  const handleNextSentence = () => {
    setSentenceValue((sentenceValue + 1) % SENTENCES_LENGTH);
  };

  const { emotion, content } = characterDialogue[sentenceValue];

  return (
    <div
      className={variables.CharacterPersonal}
      style={{
        backgroundImage: `url(/characterBackgrounds/${characterName}.png)`,
        width: "99vw",
        height: "98vh",
      }}
    >
      <NavBar></NavBar>
      <h1
        className={variables.CharacterInfo}
        style={{
          width: "20vw",
          textAlign: "center",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        {characterName}
      </h1>

      <Image
        width={512}
        height={512}
        src={`/portraits/${characterName}/${emotion}.png`}
        alt={`Pixel art portrait of ${characterName}`}
        quality={100}
      ></Image>

      <TextBox sentence={content} handleNext={handleNextSentence}></TextBox>

      <CharacterInfo charName={characterName as string}></CharacterInfo>
    </div>
  );
}
