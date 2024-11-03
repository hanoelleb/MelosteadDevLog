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
      <div className={variables.TextBox}>
        <p style={{ padding: "2vh 2vw 2vh 2vw", fontSize: "1.25em" }}>
          {sentence}
        </p>

        <button
          className={variables.TextButton}
          style={{
            position: "absolute",
            right: "0",
            marginRight: "10px",
            bottom: "0",
            marginBottom: "10px",
          }}
          onClick={handleNext}
        >
          next
        </button>
      </div>
    </>
  );
};

const CharacterInfo = ({ charName }: { charName: string }) => {
  const { birthday, likes, dislikes } =
    characterInfo[charName as keyof typeof characterInfo];

  return (
    <div className={variables.CharacterInfo}>
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
      }}
    >
      <NavBar></NavBar>
      <h1
        style={{
          width: "fit-content",
          textAlign: "center",
          marginLeft: "auto",
          marginRight: "auto",
          padding: "0 20px 0 20px",
          backgroundColor: "white",
          borderRadius: "30px",
          lineHeight: "1.5em",
          border: "solid brown 3px",
          boxShadow: "0px 0px 0px 6px white",
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
