# Space Inclusion — coded prototype

This repository contains a possible coded implementation of the **Space Inclusion** high-fidelity prototype developed for a Master's dissertation. It explores how some of the narrative, interaction and accessibility decisions designed in Figma could be implemented as a web application.

> This is a proof of concept created after the usability study. It is not the Figma prototype evaluated with children and its implementation has not been independently evaluated.

## Run locally

The project requires a recent version of Node.js.

```bash
npm install
npm run dev
```

To create a production build:

```bash
npm run build
npm run preview
```

## Implemented interactions

- English and Portuguese language selection;
- browser-based narrated instructions and volume control;
- real player-name input and simple avatar accessory selection;
- tutorial and replayable instructions;
- answer validation and visible error feedback in **Find the Hidden Message**;
- food–cutlery pair validation in **Matching Cards**;
- automatic closing of incorrect card pairs to prevent completing the activity by turning every card face-up;
- responsive recreation of the main game flow.

## Current limitations

This implementation remains a research proof of concept. It does not yet include multiplayer collaboration, saved progress, facilitator tools, analytics, complete accessibility testing or the full set of activities from the physical board game. Narration currently uses the browser's Speech Synthesis API, so the available voice and its quality depend on the device and browser.

The visual resources currently reference temporary Figma MCP asset URLs. These links may expire or be unavailable outside the original design workflow. Before stable deployment, the original illustrations should be exported from Figma, placed in `public/assets`, and the paths in `src/App.tsx` and `src/styles.css` should be updated to use those local files. The illustrations are not included in this repository because their original exported files were not available during code generation.

## Academic context

The coded version addresses several behaviours that could only be simulated in Figma, but it should not be presented as evidence from the usability tests. It is a possible future technical direction based on the findings and limitations described in the dissertation.

