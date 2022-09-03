# Covers by ReadShape

## Summary

### What is this?

So. Books have covers, right? Well, yes, but actually no.

Books are tricky business.
If the book is self published then it might not have a cover or an ISBN.
Other times a book might be incredibly old and never really had a cover to begin with.

### This is a fork
This is a simple fork that uses npm instead of bun.  
The main change on this fork is the fact that a `fallbackComponent` is rendered while the main component makes it's calculations, and we use localforage for caching
purposes when needed.
The main cover component also accepts a className and style attributes now.


I've also removed some dependencies, just because i didn't want to work with them.

### How this helps with it?

No one is going to make covers for these books, but that doesn't mean we can just leave them naked & coverless.
We want to create a beautiful UI so we have to show _something_.

So that is what we do. We will, given the same input arguments, always create the same cover on the fly.
It will obviously not be a "real" cover, but it's better than nothing or just a gray cover.


### Installing

I don't plan on publishing this to NPM because i removed a lot of stuff, and the original author did an awesome work and i believe
there's credit to be given even when you have a MIT license.

You can, however, install this using this repo url:
`npm i https://github.com/Lamarcke/covers.git`

### Props
The Cover component accepts the following properties:

`title: string`: A book's title, causes the pattern to change.  
`authors: string[]`: A book's authors, causes the pattern to change.  
`classname?: string`: An optional CSS classname.  
`style?: React.CSSProperties`: Optional CSS properties.
`fallbackElement?: React.ReactNode`: Optional fallbackElement that is rendered while the component makes it's calculations. 
Should it be empty, render nothing (`null`) instead.  
`cacheOptions: CacheOptions`: A object that describes the identifier and location used for saving and retrieving canvas dataURL from cache.
Be sure to use the same options (identifier and location) for saving and when retrieving.

The cache options are as follow:  
`identifier?: string`: The identifier we will use to retrieve a cover from cache. 
If it's undefined, we use a joined string of the title + authors array entries.  

`storage: StorageOptions`: The storage option we want to use for saving the cover. Options are:  

`indexeddb`: Uses the browser native indexeddb and the localforage async API.
`localStorage`: Uses the browser native webStorage API and the localforage async API.
`sessionStorage`: Uses the browser native webStorage API. It uses the default `window.sessionStorage`, so it's not async.  
It's also not persistent, the data will be erased when the users end the browser session.

If a identifier is present, all options use this key for retrieving and saving:  
```javascript
`${identifier}-canvas`
```

## Examples

### What variance is there?

The covers have some variation. Each cover can be broken down into multiple pieces.

#### Cover color
A cover (might) have a unique color.
It can be the following.

  - Gradient based on input hash
  - Static predefined color
#### Detail placement (title & author)
Details have predefined placement, but it still has the following variance.
  - Top (left, center, or right)
  - Bottom (left, center, or right)
#### Flow field
We generate a flow field based on the input hash. This affects the pattern.
#### Pattern
There are the following patterns we can draw.
  - Circle
  - Waves

### Outcomes
![Zeit zu leben und Zeit zu sterben](https://i.imgur.com/osw5MWb.png)
![Letters from a Stoic](https://i.imgur.com/j9iqd3T.png)
![The Wonderful Wizzard of Oz](https://i.imgur.com/m6xrHVU.png)
![Beyond Good and Evil](https://i.imgur.com/yMKZDM7.png)
![Klara and the Sun](https://i.imgur.com/KbelLtZ.png)
![Puma Years](https://i.imgur.com/VR4Ctgd.png)
