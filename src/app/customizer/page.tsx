"use client";

import { useState, useEffect, SetStateAction, Dispatch } from "react";
import { NavBar } from "@/components/NavBar";
import classInfo from "../../../json/ClassDescriptions.json";
import variables from "../../../styles/variables.module.scss";
import NextImage from "next/image";
import { v4 } from "uuid";

const ClassButton = ({
  setClassFunc,
  classId,
  playerClassName,
}: {
  setClassFunc: Dispatch<SetStateAction<number>>;
  classId: number;
  playerClassName: string;
}) => {
  return (
    <button
      className={variables.ClassButton}
      onClick={() => {
        setClassFunc(classId);
      }}
    >
      {playerClassName}
    </button>
  );
};

const ChangeFeatureComponent = ({
  featureStateHook,
  currentFeatureId,
  featureName,
  amountOfFeatures,
}: {
  featureStateHook: Dispatch<SetStateAction<number>>;
  currentFeatureId: number;
  featureName: string;
  amountOfFeatures: number;
}) => {
  const handleIncrement = () => {
    featureStateHook((currentFeatureId + 1) % amountOfFeatures);
  };

  const handleDecrement = () => {
    featureStateHook(
      currentFeatureId - 1 < 0 ? amountOfFeatures : currentFeatureId - 1
    );
  };

  return (
    <div className={variables.ChangeFeature}>
      <h3>{featureName}</h3>
      <button onClick={handleDecrement}>
        <NextImage
          src="/UI/leftArrowButton.png"
          alt="arrow icon facing left"
          width={50}
          height={50}
        ></NextImage>
      </button>
      <p>{currentFeatureId}</p>
      <button onClick={handleIncrement}>
        <NextImage
          src="/UI/rightArrowButton.png"
          alt="arrow icon facing right"
          width={50}
          height={50}
        ></NextImage>
      </button>
    </div>
  );
};

const CustomizerCanvas = ({ id }: { id: string }) => {
  return <canvas id={id} width={500} height={500}></canvas>;
};

const ClassDescription = ({ classId }: { classId: number }) => {
  const classIdMapping = ["Alchemist", "Blacksmith", "Woodworker"];

  let classDescription;

  const { Alchemist, Blacksmith, Woodworker } = classInfo;

  switch (classId) {
    case 0:
      classDescription = Alchemist;
      break;
    case 1:
      classDescription = Blacksmith;
      break;
    case 2:
      classDescription = Woodworker;
      break;
    default:
      classDescription = Alchemist;
  }

  return (
    <>
      <h3>The {classIdMapping[classId]} Class</h3>
      {classDescription.sentences.map((sentence) => {
        return (
          <p style={{ marginTop: "-3px" }} key={`pElem${v4()}`}>
            {sentence}
          </p>
        );
      })}
      <h4 style={{ marginTop: "-5px" }}>Examples of craftable items:</h4>
      {classDescription.items.map((item) => {
        return (
          <div className={variables.CraftIcon} key={v4()}>
            <NextImage
              src={`/itemIcons/${item.src}.png`}
              alt={`Pixel icon of a craftable item, ${item.name}`}
              height={96}
              width={96}
              quality={100}
            ></NextImage>
            <span>{item.name}</span>
          </div>
        );
      })}
    </>
  );
};

export default function CharacterCustomizer() {
  const DRAWING_X_POSITION = 175;
  const DRAWING_Y_POSITION = 100;

  const [bodyId, setBodyId] = useState(0);
  const [classId, setClassId] = useState(0);

  const [hairId, setHairId] = useState(0);
  const [hairColorId, setHairColorId] = useState(0);

  const [skinColorId, setSkinColorId] = useState(0);

  const [eyeId, setEyeId] = useState(0);
  const [eyeColorId, setEyeColorId] = useState(0);

  const [imagesList, setImagesList] = useState<HTMLImageElement[]>([]);

  const EYE_COLORS = [
    variables.eyeBrown,
    variables.eyeLightBrown,
    variables.eyeBlue,
    variables.eyeLightBlue,
    variables.eyeGreen,
    variables.eyeGray,
    variables.eyePurple,
    variables.eyeRed,
  ];

  const HAIR_COLORS = [
    variables.hairDarkBrown,
    variables.hairBrown,
    variables.hairLightBrown,
    variables.hairBlonde,
    variables.hairWhite,
    variables.hairGray,
    variables.hairBlack,
    variables.hairRed,
    variables.hairGinger,
    variables.hairPink,
    variables.hairBlue,
    variables.hairGreen,
    variables.hairPurple,
  ];

  const SKIN_COLORS = [
    variables.skinFair,
    variables.skinLight,
    variables.skinPeach,
    variables.skinTan,
    variables.skinMed,
    variables.skinDarkCool,
    variables.skinDarkWarm,
    variables.skinDark,
    variables.skinDarkDeep,
  ];

  const clearCanvases = (canvasNames: string[]) => {
    canvasNames.forEach((name) => {
      const canvas = document.querySelector(`#${name}`) as HTMLCanvasElement;

      const context = canvas.getContext("2d") as CanvasRenderingContext2D;
      context.globalCompositeOperation = "source-over";

      context.clearRect(0, 0, canvas.width, canvas.height);
    });
  };

  const createImages = (imgSources: string[]) => {
    const images: HTMLImageElement[] = [];

    const loadImage = (imgSrc: string) => {
      return new Promise((resolve, reject) => {
        const image = new Image();
        image.src = imgSrc;
        image.onload = function () {
          images.push(image);
          resolve(imgSrc);
        };

        image.onerror = function (err) {
          reject(err);
        };
      });
    };

    Promise.all(imgSources.map((imgSrc) => loadImage(imgSrc))).then(() => {
      setImagesList(images);
    });
  };

  const drawImage = (image: HTMLImageElement) => {
    const GRAYSCALE_SPRITES = ["Hair", "Pupil", "Body"] as const;

    const spriteType: (typeof GRAYSCALE_SPRITES)[number] | undefined =
      GRAYSCALE_SPRITES.find((spriteType) => image.src.includes(spriteType));

    let canvas: HTMLCanvasElement;

    if (spriteType) {
      canvas = document.querySelector(
        `#${spriteType}Canvas`
      ) as HTMLCanvasElement;
    } else {
      canvas = document.querySelector("#glCanvas") as HTMLCanvasElement;
    }

    const context = canvas.getContext("2d") as CanvasRenderingContext2D;

    context.globalCompositeOperation = "source-over";
    context.drawImage(image, DRAWING_X_POSITION, DRAWING_Y_POSITION);

    if (spriteType) {
      context.globalCompositeOperation = "source-atop";

      if (image.src.includes("Hair")) {
        context.globalAlpha = 0.5;
        context.fillStyle = HAIR_COLORS[hairColorId];
      } else if (image.src.includes("Pupil")) {
        context.globalAlpha = 0.5;
        context.fillStyle = EYE_COLORS[eyeColorId];
      } else {
        context.globalAlpha = 0.7;
        context.fillStyle = SKIN_COLORS[skinColorId];
      }

      context.fillRect(
        DRAWING_X_POSITION,
        DRAWING_Y_POSITION,
        image.width,
        image.height
      );
    }

    context.globalAlpha = 1.0;
  };

  useEffect(() => {
    const script = document.createElement("script");

    document.body.appendChild(script);

    const bodyImgSrc =
      bodyId === 0
        ? "../characterCreator/BodyA.png"
        : "../characterCreator/BodyB.png";

    let className;
    switch (classId) {
      case 0:
        className = "Alchemist";
        break;
      case 1:
        className = "Blacksmith";
        break;
      case 2:
        className = "Woodworker";
        break;
      default:
        className = "Alchemist";
        break;
    }

    const clothingImgSrc = `../characterCreator/clothing/${className}${
      bodyId === 0 ? "A" : "B"
    }.png`;

    const eyeBaseImgSrc = `../characterCreator/eyes/EyeBase${eyeId}.png`;
    const pupilImgSrc = `../characterCreator/eyes/Pupil${eyeId}.png`;

    const hairImgSrc = `../characterCreator/hair/Hair${hairId}.png`;

    createImages([
      bodyImgSrc,
      hairImgSrc,
      pupilImgSrc,
      eyeBaseImgSrc,
      clothingImgSrc,
    ]);

    return () => {
      document.body.removeChild(script);
    };
  }, [bodyId, eyeId, hairId, classId, eyeColorId, hairColorId, skinColorId]);

  useEffect(() => {
    const script = document.createElement("script");

    document.body.appendChild(script);

    if (imagesList.length >= 5) {
      clearCanvases(["glCanvas", "BodyCanvas", "HairCanvas", "PupilCanvas"]);

      imagesList.forEach((image: HTMLImageElement) => {
        drawImage(image);
      });
    }

    return () => {
      document.body.removeChild(script);
    };
  }, [imagesList]);

  return (
    <div className={variables.CustomizerDemo}>
      <NavBar></NavBar>

      <h1 style={{ textAlign: "center" }}>Character Customization Demo</h1>

      <NextImage
        src="/stainedGlass.png"
        alt="Pixel art of stained glass depicting an alchemist, a blacksmith, and a woodworker"
        height={400}
        width={400}
        quality={100}
        style={{
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "5vh",
        }}
      ></NextImage>

      <div className={variables.DemoIntro}>
        <p>
          This is a demo of the character customization of Made in Melostead.
          There are three classes you can select: Alchemist, Blacksmith and
          Woodworker.
        </p>

        <p>
          While this demo only includes a body type selector, there will be a
          pronoun selection in game to determine how other characters refer to
          you. Also, body type A or B is purely cosmetic and has no bearing on
          ability.
        </p>

        <p>
          Eye color and hair color can also be set using rgb sliders as an
          alternative to preselected colors in game. For the purposes of this
          demo, only preselected colors are included.
        </p>
      </div>

      <div className={variables.Customizer}>
        <div
          className={variables.CanvasLayer}
          style={{
            backgroundImage: `url(/UI/${
              classId === 0
                ? "Alchemist"
                : classId === 1
                ? "Blacksmith"
                : "Woodworker"
            }Pattern.png)`,
          }}
        >
          <CustomizerCanvas id={"BodyCanvas"}></CustomizerCanvas>
          <CustomizerCanvas id={"glCanvas"}></CustomizerCanvas>
          <CustomizerCanvas id={"HairCanvas"}></CustomizerCanvas>
          <CustomizerCanvas id={"PupilCanvas"}></CustomizerCanvas>
        </div>
        <div className={variables.CustomizationPanel}>
          <div>
            <h3>Class</h3>

            <ClassButton
              setClassFunc={setClassId}
              classId={0}
              playerClassName="Alchemist"
            ></ClassButton>
            <ClassButton
              setClassFunc={setClassId}
              classId={1}
              playerClassName="Blacksmith"
            ></ClassButton>
            <ClassButton
              setClassFunc={setClassId}
              classId={2}
              playerClassName="Woodworker"
            ></ClassButton>

            <h3 style={{ marginTop: "-5px" }}>Body Type</h3>
            <div>
              <button
                className={variables.BodyTypeButton}
                onClick={() => {
                  setBodyId(0);
                }}
              >
                A
              </button>
              <button
                className={variables.BodyTypeButton}
                onClick={() => {
                  setBodyId(1);
                }}
              >
                B
              </button>
            </div>
          </div>
          <div className={variables.FeatureGrid}>
            <ChangeFeatureComponent
              featureStateHook={setSkinColorId}
              currentFeatureId={skinColorId}
              featureName="Skin Tone"
              amountOfFeatures={9}
            ></ChangeFeatureComponent>
            <ChangeFeatureComponent
              featureStateHook={setEyeId}
              currentFeatureId={eyeId}
              featureName="Eye Shape"
              amountOfFeatures={16}
            ></ChangeFeatureComponent>
            <ChangeFeatureComponent
              featureStateHook={setEyeColorId}
              currentFeatureId={eyeColorId}
              featureName="Eye Color"
              amountOfFeatures={8}
            ></ChangeFeatureComponent>
            <ChangeFeatureComponent
              featureStateHook={setHairId}
              currentFeatureId={hairId}
              featureName="Hair Style"
              amountOfFeatures={39}
            ></ChangeFeatureComponent>
            <ChangeFeatureComponent
              featureStateHook={setHairColorId}
              currentFeatureId={hairColorId}
              featureName="Hair Color"
              amountOfFeatures={HAIR_COLORS.length}
            ></ChangeFeatureComponent>
          </div>
        </div>
        <div className={variables.ClassDescription}>
          <ClassDescription classId={classId}></ClassDescription>
        </div>
      </div>
    </div>
  );
}
