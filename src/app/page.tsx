'use client'

import CurrentFont from "@/components/CurrentFont";
import FontBlock, { FontBlockProps } from "@/components/FontBlock";
import Slider from "@/components/Slider";
import TextInput from "@/components/TextInput";
import { getFontsFromLocal, loadCurrents, loadRelations, saveCurrents } from "@/utils/fonts_client";
import { useEffect, useState } from "react";
import WebFont from "webfontloader";

export default function Home() {
  const [ currentFont, setCurrentFont ] = useState("Georgia");
  const [ previewText, setPreviewText ] = useState("");
  const [ previewSize, setPreviewSize ] = useState(16);

  const [ relations, setRelations ] = useState<FontBlockProps[]>([]);

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

    // Updating shown fonts with new text and size
    let updated: FontBlockProps[] = [];
    for (let rel in relations){
       let newRel: FontBlockProps = {
        ...relations[rel],
        previewSize: previewSize,
        previewText: previewText
      }
      updated.push(newRel);
    }
    setRelations(updated);

  }, [currentFont, previewSize, previewText]);

  useEffect(() => {
    let fonts = getFontsFromLocal();
    // Fetching relations from localstorage when currentFont changes
    let data = loadRelations();

    let shownFonts: FontBlockProps[] = []

    let fromRelations = data.relations.filter((relation: any) => relation.fromFamily === currentFont);
    for (let relation of fromRelations) {
      shownFonts.push({
        fontFamily: relation.toFamily,
        previewText: previewText,
        previewSize: previewSize,
        relation: relation,
        onClick: () => {
          setCurrentFont(relation.toFamily);
        }
      });
    }

    let toRelations = data.relations.filter((relation: any) => relation.toFamily === currentFont);
    for (let relation of toRelations) {
      shownFonts.push({
        fontFamily: relation.fromFamily,
        previewText: previewText,
        previewSize: previewSize,
        relation: relation,
        onClick: () => {
          setCurrentFont(relation.fromFamily);
        }
      });
    }

    // Pick a random set of n fonts that aren't yet related to the current font
    let suggestionAmount = 6;
    let suggestions = (fonts).filter((font: any) => {
      return !data.relations.some((relation: any) => relation.fromFamily === font.family || relation.toFamily === font.family);
    }).sort(() => Math.random() - 0.5).slice(0, suggestionAmount);
    for (let suggestion of suggestions) {
      let emptyRelation = {
        fromFamily: currentFont,
        toFamily: suggestion.family,
        property: "",
        valueChange: 0
      }
      shownFonts.push({
        fontFamily: suggestion.family,
        previewText: previewText,
        previewSize: previewSize,
        relation: emptyRelation,
        onClick: () => {
          setCurrentFont(suggestion.family);
        }
      });
    }

    // Use WebFont to load the fonts before updating relations
    let families = shownFonts.map((font: any) => font.fontFamily);
    families.push(currentFont);
    WebFont.load({
      google: {
        families: families,
        // api: process.env.NEXT_PUBLIC_GOOGLE_FONTS_API_KEY,
      },
      loading: () => {
        console.log('Loading fonts...');
      },
      active: () => {
        console.log('Fonts loaded!');
      },
    });

    setRelations(shownFonts);
  }, [currentFont]);



  return (
    <div className="">

      <main className="flex flex-col gap-8 items-center justify-center">

        <CurrentFont font={currentFont} size={previewSize} text={previewText} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {relations.map((props: FontBlockProps, index: number) => (
            <FontBlock 
              key={index}
              fontFamily={props.fontFamily}
              previewText={props.previewText}
              previewSize={props.previewSize}
              relation={props.relation}
              onClick={props.onClick} />
          ))}
        </div>

      </main>

      <div className={`fixed bottom-0 left-0 right-0 flex items-center flex-col gap-4 mb-20`}>
          <TextInput onChange={setPreviewText} text={previewText} type="preview-text" />
          <Slider onChange={setPreviewSize} value={previewSize} />
      </div>
    </div>
  );
}
