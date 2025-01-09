import Image from "next/image";
import Thumbnail from "@/components/Thumbnail";
import Button from "@/components/Button";
import TextInput from "@/components/TextInput";

export default function Home() {
  const adventures = [
    {
      title: "Doing a thing here",
      description: "This is a thing we are doing",
      imageUrl: "/imaag.png",
      link: "/routenotexist/doingathing",
    },
    {
      title: "Another thing we doing",
      description: "We still doing but another this time",
      imageUrl: "/imaag.png",
      link: "/routenotexist/anotherthing",
    },
    // Add more adventures as needed
  ];

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">

      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {adventures.map((adventure, index) => (
            <Thumbnail
              key={index}
              title={adventure.title}
              description={adventure.description}
              imageUrl={adventure.imageUrl}
              link={adventure.link}
            />
          ))}
        </div>
      </main>

      <footer className="fixed bottom-0 items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://teodosin.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Teodosin Site
        </a>
      </footer>

      <div className="fixed bottom-0 left-0 right-0 h-20 flex items-center flex-col mb-20">
          <TextInput type="preview-text" />
      </div>
    </div>
  );
}
