'use client'

import Button from "@/components/Button";
import CurrentFont from "@/components/CurrentFont";
import FontBlock, { FontBlockProps } from "@/components/FontBlock";
import Slider from "@/components/Slider";
import TextInput from "@/components/TextInput";
import { getFontsFromLocal, loadCurrents, loadFavorites, loadRelations, saveCurrents, saveFavorites } from "@/utils/fonts_client";
import { useEffect, useState } from "react";
import WebFont from "webfontloader";

export default function Home() {
  const [currentFont, setCurrentFont] = useState("Georgia");
  const [previewText, setPreviewText] = useState("");
  const [previewSize, setPreviewSize] = useState(28);

  const [history, setHistory] = useState<string[]>([]);
  const [redoStack, setRedoStack] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  const [isInitialized, setIsInitialized] = useState(false);

  const [fonts, setFonts] = useState<any[]>([]);
  const [relations, setRelations] = useState<FontBlockProps[]>([]);

  useEffect(() => {
    const data = loadCurrents();
    setCurrentFont(data.currentFont);
    setPreviewText(data.currentPreviewText);
    setPreviewSize(data.currentFontSize);
    setHistory(data.history);

    const favorites = loadFavorites();
    console.log("favorites", favorites);
    setFavorites(favorites);

    setIsInitialized(true);
  }, []);

  // Loop to rerender when fonts are ready to be loaded on first startup
  useEffect(() => {
    const checkForFonts = () => {
      const fonts = getFontsFromLocal();
      if (fonts.length > 0) {
        setFonts(fonts);
      } else {
        setTimeout(checkForFonts, 100);
      }
    };

    checkForFonts();
  }, []);

  useEffect(() => {
    if (!isInitialized) return;
    console.log("saving favorites", favorites);
    saveFavorites(favorites);
  }, [favorites]);

  useEffect(() => {
    if (!isInitialized) return;
    // Saving current state to localstorage
    saveCurrents({
      version: "0.0.1",
      currentFont: currentFont,
      currentFontSize: previewSize,
      currentPreviewText: previewText,
      history: history,
    })

    // Updating shown fonts with new text and size
    let updated: FontBlockProps[] = [];
    for (let rel in relations) {
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
    if (!fonts.some((font: any) => font.family === currentFont)) return;

    calculateShownFonts();
  }, [currentFont, fonts]);

  const calculateShownFonts = () => {
    // Fetching relations from localstorage when currentFont changes
    let data = Object.values(loadRelations(currentFont).relations);

    let shownFonts: FontBlockProps[] = []

    let fromRelations = data.filter((relation: any) => relation.fromFamily === currentFont);
    for (let relation of fromRelations) {
      shownFonts.push({
        fontFamily: relation.toFamily,
        previewText: previewText,
        previewSize: previewSize,
        relation: relation,
        onClick: () => {
          changeFont(relation.toFamily);
        },
        isFavorited: isFavorited(relation.toFamily),
        onFavoriteToggle: () => {
          toggleFavorite(relation.toFamily);
        }
      });
    }

    let toRelations = data.filter((relation: any) => relation.toFamily === currentFont);
    for (let relation of toRelations) {
      shownFonts.push({
        fontFamily: relation.fromFamily,
        previewText: previewText,
        previewSize: previewSize,
        relation: relation,
        onClick: () => {
          changeFont(relation.fromFamily);
        },
        isFavorited: isFavorited(relation.fromFamily),
        onFavoriteToggle: () => {
          toggleFavorite(relation.fromFamily);
        }
      });
    }

    // Pick a random set of n fonts that aren't yet related to the current font
    let suggestionAmount = 6;
    let suggestions = (fonts).filter((font: any) => {
      return !data.some((relation: any) => relation.fromFamily === font.family || relation.toFamily === font.family);
    }).sort(() => Math.random() - 0.5).slice(0, suggestionAmount);
    for (let suggestion of suggestions) {
      let emptyRelation = {
        fromFamily: currentFont,
        toFamily: suggestion.family,
        comparison: "",
      }
      shownFonts.push({
        fontFamily: suggestion.family,
        previewText: previewText,
        previewSize: previewSize,
        relation: emptyRelation,
        onClick: () => {
          changeFont(suggestion.family);
        },
        isFavorited: isFavorited(suggestion.family),
        onFavoriteToggle: () => {
          toggleFavorite(suggestion.family);
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
        // console.log('Loading fonts...');
      },
      active: () => {
        // console.log('Fonts loaded!');
      },
    });

    setRelations(shownFonts);
  }

  const toggleFavorite = (fontFamily: string) => {
    let currentFavorites: string[] = [...favorites];
    if (currentFavorites.includes(fontFamily)) {
      currentFavorites = currentFavorites.filter((favorite) => favorite !== fontFamily);
    } else {
      currentFavorites.push(fontFamily);
    }
    setFavorites(currentFavorites);
  };

  const isFavorited = (fontFamily: string) => {
    return favorites.includes(fontFamily);
  };

  const handleSearch = (searchText: string) => {
    setCurrentFont(searchText);
    if (fonts.some((font: any) => font.family === currentFont)) {
      setHistory([...history, searchText]);
    }
  };

  const changeFont = (font: string) => {
    setRedoStack([]);
    setCurrentFont(font);
    setHistory([...history, currentFont]);
  };

  const undo = () => {
    if (history.length === 0) return;
    const newHistory = [...history];
    const lastItem = newHistory.pop();

    if (lastItem) {
      setCurrentFont(lastItem);
      setHistory(newHistory);
      setRedoStack((prev) => [...prev, currentFont]);
    }
  };

  const redo = () => {
    if (redoStack.length === 0) return;
    const newRedoStack = [...redoStack];
    const lastRedo = newRedoStack.pop();
    if (lastRedo) {
      setCurrentFont(lastRedo);
      setRedoStack(newRedoStack);
      setHistory((prev) => [...prev, currentFont]);
    }
  };



  return (
    <div className="">

      <main className="flex flex-col gap-8 items-center justify-center mb-52">

        <div className="flex flex-col gap-4 w-96">

          <div className="flex flex-row gap-4">
            <select
              className="dark:bg-gray-700 dark:text-white rounded-lg px-4 py-2 w-full shadow-lg pointer-events-auto"
              value={currentFont}
              onChange={(e) => { changeFont(e.target.value) }}
            >
              <option value="">Favorites</option>
              {
                favorites.map((favorite: string) => (
                  <option className="p-2" key={favorite} value={favorite}>{favorite}</option>
                ))
              }
            </select>

          </div>
          <TextInput onChange={(text) => handleSearch(text)} text={currentFont} type="search" list="fonts" />
        </div>

        <datalist id="fonts">
          {
            fonts.map((font: any) => (
              <option key={font.family} value={font.family} />
            ))
          }
        </datalist>


        <CurrentFont
          font={currentFont}
          size={previewSize}
          text={previewText}
          leftBtn={history.length === 0 ? undefined : undo}
          rightBtn={redoStack.length === 0 ? undefined : redo}
          isFavorited={isFavorited(currentFont)}
          onFavoriteToggle={toggleFavorite}
        />

        <Button opaque={true} onClick={() => calculateShownFonts()}>
          <span className="text-3xl">↻</span>
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {relations.map((props: FontBlockProps, index: number) => (
            <FontBlock
              key={index}
              fontFamily={props.fontFamily}
              previewText={props.previewText}
              previewSize={props.previewSize}
              relation={props.relation}
              onClick={props.onClick}
              isFavorited={isFavorited(props.fontFamily)}
              onFavoriteToggle={toggleFavorite}
            />
          ))}
        </div>

      </main>

      <div className={`fixed bottom-0 left-0 right-0 flex items-center flex-col gap-4 mb-20 pointer-events-none`}>
        <TextInput onChange={setPreviewText} text={previewText} type="preview-text" />
        <Slider onChange={setPreviewSize} value={previewSize} />
      </div>
    </div>
  );
}
