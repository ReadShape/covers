# Covers by ReadShape

## Summary

### What is this?

So. Books have covers, right? Well, yes, but actually no.

Books are tricky business.
If the book is self published then it might not have a cover or an ISBN.
Other times a book might be incredibly old and never really had a cover to begin with.

### This is a fork
This is a simple fork that uses npm instead of bun.  
The main cover component also accepts a className and style attributes now.


I also removed Storybook and ESLint.  
This was mainly because i wasn't using them on my package, so i didn't want the extra dependencies.

### Installing
I don't plan on publishing this to NPM because i removed a lot of stuff, and the original author did an awesome work and i believe
there's credit to be given even when you have a MIT license.

You can, however, install this using this repo url:  
`npm i this-repo-url`

### How this helps with it?

No one is going to make covers for these books, but that doesn't mean we can just leave them naked & coverless.
We want to create a beautiful UI so we have to show _something_.

So that is what we do. We will, given the same input arguments, always create the same cover on the fly.
It will obviously not be a "real" cover, but it's better than nothing or just a gray cover.

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
