import Image from "next/image";
import { NavBar } from "@/components/NavBar";
import variables from "../../../styles/variables.module.scss";
import { v4 } from "uuid";
import * as fs from "fs";

async function getImages() {
  const images = [];

  const dir = await fs.promises.opendir("./public/screenshots");

  for await (const screenshot of dir) {
    images.push(`/screenshots/${screenshot.name}`);
  }

  return images;
}

export default async function Media() {
  const images = await getImages();

  return (
    <div className={variables.Media}>
      <NavBar></NavBar>
      <h1>Media</h1>
      <h2>Trailer</h2>
      <iframe
        src="https://www.youtube.com/embed/guW9QUMc-oY"
        width={854}
        height={480}
        allowFullScreen
        className={variables.Trailer}
      />
      <h2>Videos</h2>
      <h2>Screenshots</h2>
      <div className={variables.Screenshot}>
        {images.map((image) => {
          return (
            <Image
              src={image}
              key={v4()}
              alt="Screenshot of Made in Melostead gameplay"
              width={400}
              height={270}
            ></Image>
          );
        })}
      </div>
    </div>
  );
}
