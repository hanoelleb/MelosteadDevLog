import { v4 } from "uuid";
import DOMPurify from "isomorphic-dompurify";
import variables from "../../../styles/variables.module.scss";
import { parse } from "node-html-parser";
import Image from "next/image";
import { NavBar } from "@/components/NavBar";

type BlogProps = {
  title: string;
  content: string;
  date: string;
};

const Post = ({ title, content, date }: BlogProps) => {
  const cleanTitle = DOMPurify.sanitize(title);
  let cleanContent = DOMPurify.sanitize(content);

  if (content.includes("iframe")) {
    // Wordpress embedded videos spans are sanitized by DOMPurify
    // Add the iframe element back to content

    const parsedContent = parse(content);

    const iframe = parsedContent.querySelector("iframe");

    cleanContent = `${iframe ? iframe.toString() : null}${cleanContent}`;
  }

  const decodedTitle = cleanTitle.replace("&#8217;", "'");
  const decodedContent = cleanContent.replace("&#8217;", "'");

  return (
    <div className={variables.Post}>
      <h2>{decodedTitle}</h2>
      <h3>{new Date(date).toDateString()}</h3>
      <div
        dangerouslySetInnerHTML={{ __html: decodedContent }}
        className={variables.WordpressData}
      ></div>
    </div>
  );
};

async function getPosts() {
  const res = await fetch(
    `https://public-api.wordpress.com/rest/v1.1/sites/madeinmelostead.wordpress.com/posts?per_page=10`
  );

  return res.json();
}

export default async function Blog() {
  // const postLimit = 3;

  const { posts } = await getPosts();

  return (
    <>
      <NavBar></NavBar>
      <div className={variables.BannerBackgroundBlog}>
        <>
          <Image
            src="/storm.png"
            alt="Pixel art of the Cursed Storm"
            width={160 * 3}
            height={128 * 3}
            quality={100}
          ></Image>
          <Image
            src="/frozen.png"
            alt="Pixel art of the Cursed Storm"
            width={160 * 3}
            height={128 * 3}
            quality={100}
          ></Image>
          <Image
            src="/plague.png"
            alt="Pixel art of the Cursed Storm"
            width={160 * 3}
            height={128 * 3}
            quality={100}
          ></Image>
          <Image
            src="/blight.png"
            alt="Pixel art of the Cursed Storm"
            width={160 * 3}
            height={128 * 3}
            quality={100}
          ></Image>
        </>

        <div className={variables.BlogHeader}>
          <Image
            src="/logo.png"
            alt="Made in Melostead logo"
            width={640}
            height={360}
          />

          <h1>Developer Blog</h1>
        </div>
      </div>
      {/* 
      <div
        style={{
          position: "absolute",
          top: "5vh",
          left: "30vw",
          height: "44vh",
          backgroundColor: "rgb(0,0,0,0.25)",
        }}
      >
       
      </div> */}

      <div className={variables.Blog}>
        {posts.map((post: { title: string; content: string; date: string }) => {
          return (
            <Post
              title={post.title}
              content={post.content}
              date={post.date}
              key={v4()}
            ></Post>
          );
        })}
      </div>
    </>
  );
}
