# Homepage hero rack image

## What will change
- Replace only the homepage hero’s generated server-rack illustration with the supplied artwork.
- Use the larger rack image on desktop and the compact front-facing rack image on mobile.
- Keep the existing rack illustration in the free-trial section unchanged.

## Performance safeguards
- Convert both PNG uploads to optimized WebP files at display-appropriate dimensions.
- Render them through a responsive `<picture>` with explicit width, height, and aspect-ratio sizing to prevent layout shift.
- Prioritize only the active hero image for loading and decoding; no JavaScript carousel, animation, or extra runtime package will be added.
- Add the hero image preload to the homepage metadata so it can start downloading early.

## Verification
- Check desktop and mobile layouts for cropping, text overlap, and horizontal overflow.
- Confirm the page loads without browser errors and the hero image uses WebP.
