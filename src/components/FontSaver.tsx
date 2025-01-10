'use client'

import { isClient } from "@/utils";
import { useEffect } from "react";

// This component is used to save the fonts to local storage.
// Reason being that the fonts can't be fetched from the api from a client 
// component (because of the async/await restriction) and localstorage
// can't be accessed from a server component. So the fonts are passed here. 

// Potentially a better solution would be to fetch the fonts and save them to
// state instead of localstorage. 

export default function FontSaver({ fonts }: { fonts: any[] }) {
  useEffect(() => {
    if (!isClient) return;
    localStorage.setItem("fonts", JSON.stringify(fonts));

  }, [])  
  return null
}
