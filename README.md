# Font Explorer
## Overview

This is a proof of concept application for exploring fonts through their relations. The idea is to allow a designer to find fonts by starting with some font and then finding fonts that are similar and different in specific ways. For example, finding fonts that are higher contrast, more formal or less formal, fit a certain style more and so on. 

To run, either clone the repo and `npm install` + `npm run dev`, or visit the [deployed version](https://fontexplorer.vercel.app/).

## Features

* [x] Basic app structure
* [x] Font loading from Google Fonts API
* [x] Theme switching (dark/light)
* [x] Font suggestions and changing the active font
* [x] Font rendering
* [x] Font relations
* [ ] Font history
* [ ] Favorites
* [ ] Proper mobile support

This app is just a proof of concept and is not intended to be a fully-featured font explorer. A proper app would need a central database for the font relations so individual users wouldn't have to define relations for the hundreds of fonts that there are. Creating embeddings for fonts and implementing a vector database would also be very interesting to explore. 



## Stack

This is a [Next.js](https://nextjs.org) project, and my first time using the framework. [Tailwind](https://tailwindcss.com/) is used for styling.

The [Google Fonts API](https://developers.google.com/fonts/docs/developer_api) is used to load font data.`