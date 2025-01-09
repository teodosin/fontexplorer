'use client'

import CurrentFont from "@/components/CurrentFont";
import FontBlock from "@/components/FontBlock";
import TextInput from "@/components/TextInput";
import { loadCurrents } from "@/fonts";
import { useEffect, useState } from "react";

export default function Home() {
  const [ currentFont, setCurrentFont ] = useState("Georgia");
  const [ previewText, setPreviewText ] = useState("");
  const [ previewSize, setPreviewSize ] = useState(16);

  useEffect(() => {
    let data = loadCurrents();
    let font = data.currentFont;
    console.log("Setting the current font to " + font);
    setCurrentFont(font);
  }, []);

  return (
    <div className="">

      <main className="flex flex-col gap-8 items-center justify-center">
        <CurrentFont font={currentFont} size={previewSize} text={previewText} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 h-20 flex items-center flex-col mb-20">
          <TextInput type="preview-text" />
      </div>
    </div>
  );
}
