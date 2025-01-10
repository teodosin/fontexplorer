'use client'

import CurrentFont from "@/components/CurrentFont";
import FontBlock from "@/components/FontBlock";
import Slider from "@/components/Slider";
import TextInput from "@/components/TextInput";
import { loadCurrents, saveCurrents } from "@/fonts";
import { useEffect, useState } from "react";

export default function Home() {
  const [ currentFont, setCurrentFont ] = useState("Georgia");
  const [ previewText, setPreviewText ] = useState("");
  const [ previewSize, setPreviewSize ] = useState(16);

  const [ relations, setRelations ] = useState([]);
  const [ suggestions, setSuggestions ] = useState([]);

  useEffect(() => {
    let data = loadCurrents();
    setCurrentFont(data.currentFont);
    setPreviewText(data.currentPreviewText);
    setPreviewSize(data.currentFontSize);
  }, []);

  useEffect(() => {
    // Saving current state to localstorage
    saveCurrents({
      version: "0.0.1",
      currentFont: currentFont,
      currentFontSize: previewSize,
      currentPreviewText: previewText
    })
  }, [currentFont, previewSize, previewText]);

  return (
    <div className="">

      <main className="flex flex-col gap-8 items-center justify-center">

        <CurrentFont font={currentFont} size={previewSize} text={previewText} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FontBlock font="Georgia" />
        </div>

      </main>

      <div className="fixed bottom-0 left-0 right-0 flex items-center flex-col gap-4 mb-20">
          <TextInput onChange={setPreviewText} text={previewText} type="preview-text" />
          <Slider onChange={setPreviewSize} value={previewSize} />
      </div>
    </div>
  );
}
