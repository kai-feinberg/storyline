import type { WhiteboardSceneData } from "@/types/whiteboard";

export type LandingDemoVisualOption = {
  id: string;
  label: string;
  svgDataUrl: string;
  tracedScene: WhiteboardSceneData;
};

export type LandingDemoScene = {
  id: string;
  title: string;
  scriptText: string;
  selectedVisualOptionId: string;
  visualOptions: LandingDemoVisualOption[];
};

export type LandingDemoProject = {
  id: string;
  title: string;
  script: string;
  scenes: LandingDemoScene[];
};

export const landingDemoProject: LandingDemoProject = {
  "id": "be40593b-139d-4cff-8cc2-4b2ee4b7011b",
  "title": "StorySketch",
  "script": "Your ads are fatiguing faster than your team can produce new ones.\n\nThat's not a creative problem.\nIt's a production problem.\n\nYou need five new angles this week.\nBut your current process gives you one video every two weeks.\n\nThe math doesn't work.\n\nStorySketch was built for marketers who test fast.\n\nTurn any script into a narrated whiteboard ad in one workflow.\n\nNo handoffs between writers, editors, and voice tools.\nNo timeline software.\nNo waiting.\n\nJust paste your script, generate scenes, export the MP4.\n\nSame day. Same workspace. Same person.\n\nWhich means you can finally test ideas at the speed you come up with them.\n\nStop letting production bottlenecks decide your growth.\n\nClick below and turn your next script into a video in the next 15 minutes.\n",
  "scenes": [
    {
      "id": "the-creative-fatigue-problem-1",
      "title": "The Creative Fatigue Problem",
      "scriptText": "Your ads are fatiguing faster than your team can produce new ones. That's not a creative problem; it's a production problem.",
      "selectedVisualOptionId": "minimal-diagram",
      "visualOptions": [
        {
          "id": "minimal-diagram",
          "label": "Minimal",
          "svgDataUrl": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%201280%20720%22%20width%3D%221280%22%20height%3D%22720%22%3E%3Cg%20stroke%3D%22%23222222%22%20stroke-width%3D%228%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20fill%3D%22none%22%3E%3Cg%20id%3D%22ad-screen%22%3E%3Crect%20x%3D%22250%22%20y%3D%22200%22%20width%3D%22300%22%20height%3D%22200%22%2F%3E%3Cpath%20d%3D%22M%20280%20250%20L%20520%20250%22%20stroke-width%3D%224%22%2F%3E%3Cpath%20d%3D%22M%20280%20300%20L%20450%20300%22%20stroke-width%3D%224%22%2F%3E%3Cpath%20d%3D%22M%20280%20350%20L%20400%20350%22%20stroke-width%3D%224%22%2F%3E%3Cpath%20d%3D%22M%20200%20150%20L%20300%20250%22%20stroke%3D%22%23FF0000%22%20stroke-width%3D%2212%22%2F%3E%3Cpath%20d%3D%22M%20300%20150%20L%20200%20250%22%20stroke%3D%22%23FF0000%22%20stroke-width%3D%2212%22%2F%3E%3C%2Fg%3E%3Cpath%20d%3D%22M%20600%20300%20L%20750%20300%22%20stroke-width%3D%2210%22%2F%3E%3Cpath%20d%3D%22M%20720%20270%20L%20750%20300%20L%20720%20330%22%20stroke-width%3D%2210%22%2F%3E%3Cg%20id%3D%22team-production%22%3E%3Ccircle%20cx%3D%22950%22%20cy%3D%22220%22%20r%3D%2240%22%2F%3E%3Cpath%20d%3D%22M%20950%20260%20L%20950%20420%22%2F%3E%3Cpath%20d%3D%22M%20950%20300%20L%20880%20360%22%2F%3E%3Cpath%20d%3D%22M%20950%20300%20L%201020%20360%22%2F%3E%3Cpath%20d%3D%22M%20950%20420%20L%20880%20550%22%2F%3E%3Cpath%20d%3D%22M%20950%20420%20L%201020%20550%22%2F%3E%3Cpath%20d%3D%22M%201050%20200%20L%201100%20150%20L%201080%20230%20L%201130%20180%22%20stroke%3D%22%23FFD700%22%20stroke-width%3D%226%22%2F%3E%3C%2Fg%3E%3Cg%20id%3D%22label-text%22%3E%3Cpath%20d%3D%22M%20300%20450%20L%20320%20430%20L%20340%20450%22%2F%3E%3Cpath%20d%3D%22M%20320%20430%20L%20320%20480%22%2F%3E%3Cpath%20d%3D%22M%20350%20460%20L%20450%20460%22%2F%3E%3Cpath%20d%3D%22M%20900%20580%20L%201000%20580%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E",
          "tracedScene": {
            "id": "the-creative-fatigue-problem-1",
            "fps": 30,
            "svg": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%201280%20720%22%20width%3D%221280%22%20height%3D%22720%22%3E%3Cg%20stroke%3D%22%23222222%22%20stroke-width%3D%228%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20fill%3D%22none%22%3E%3Cg%20id%3D%22ad-screen%22%3E%3Crect%20x%3D%22250%22%20y%3D%22200%22%20width%3D%22300%22%20height%3D%22200%22%2F%3E%3Cpath%20d%3D%22M%20280%20250%20L%20520%20250%22%20stroke-width%3D%224%22%2F%3E%3Cpath%20d%3D%22M%20280%20300%20L%20450%20300%22%20stroke-width%3D%224%22%2F%3E%3Cpath%20d%3D%22M%20280%20350%20L%20400%20350%22%20stroke-width%3D%224%22%2F%3E%3Cpath%20d%3D%22M%20200%20150%20L%20300%20250%22%20stroke%3D%22%23FF0000%22%20stroke-width%3D%2212%22%2F%3E%3Cpath%20d%3D%22M%20300%20150%20L%20200%20250%22%20stroke%3D%22%23FF0000%22%20stroke-width%3D%2212%22%2F%3E%3C%2Fg%3E%3Cpath%20d%3D%22M%20600%20300%20L%20750%20300%22%20stroke-width%3D%2210%22%2F%3E%3Cpath%20d%3D%22M%20720%20270%20L%20750%20300%20L%20720%20330%22%20stroke-width%3D%2210%22%2F%3E%3Cg%20id%3D%22team-production%22%3E%3Ccircle%20cx%3D%22950%22%20cy%3D%22220%22%20r%3D%2240%22%2F%3E%3Cpath%20d%3D%22M%20950%20260%20L%20950%20420%22%2F%3E%3Cpath%20d%3D%22M%20950%20300%20L%20880%20360%22%2F%3E%3Cpath%20d%3D%22M%20950%20300%20L%201020%20360%22%2F%3E%3Cpath%20d%3D%22M%20950%20420%20L%20880%20550%22%2F%3E%3Cpath%20d%3D%22M%20950%20420%20L%201020%20550%22%2F%3E%3Cpath%20d%3D%22M%201050%20200%20L%201100%20150%20L%201080%20230%20L%201130%20180%22%20stroke%3D%22%23FFD700%22%20stroke-width%3D%226%22%2F%3E%3C%2Fg%3E%3Cg%20id%3D%22label-text%22%3E%3Cpath%20d%3D%22M%20300%20450%20L%20320%20430%20L%20340%20450%22%2F%3E%3Cpath%20d%3D%22M%20320%20430%20L%20320%20480%22%2F%3E%3Cpath%20d%3D%22M%20350%20460%20L%20450%20460%22%2F%3E%3Cpath%20d%3D%22M%20900%20580%20L%201000%20580%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E",
            "title": "The Creative Fatigue Problem",
            "width": 1280,
            "height": 720,
            "marker": {
              "width": 180,
              "height": 180,
              "tipOffsetX": 136,
              "tipOffsetY": 24,
              "maxTiltDegrees": 15
            },
            "timing": {
              "gapFrames": 0,
              "startFrame": 8,
              "maxDuration": 20,
              "minDuration": 4,
              "endHoldFrames": 45,
              "maxTravelFrames": 6,
              "minTravelFrames": 2,
              "framesPerHundredPx": 5,
              "connectedThresholdPx": 18,
              "travelPixelsPerFrame": 90
            },
            "strokes": [
              {
                "id": "path-1",
                "path": "M 250 200 H 550 V 400 H 250 Z",
                "length": 1000,
                "stroke": "#222222",
                "duration": 17,
                "startFrame": 8,
                "revealWidth": 8,
                "strokeWidth": 8
              },
              {
                "id": "path-2",
                "path": "M 280 250 L 520 250",
                "length": 240,
                "stroke": "#222222",
                "duration": 10,
                "startFrame": 27,
                "revealWidth": 4,
                "strokeWidth": 4
              },
              {
                "id": "path-3",
                "path": "M 450 300 L 280 300",
                "length": 170,
                "stroke": "#222222",
                "duration": 8,
                "startFrame": 39,
                "revealWidth": 4,
                "strokeWidth": 4
              },
              {
                "id": "path-4",
                "path": "M 280 350 L 400 350",
                "length": 120,
                "stroke": "#222222",
                "duration": 5,
                "startFrame": 49,
                "revealWidth": 4,
                "strokeWidth": 4
              },
              {
                "id": "path-5",
                "path": "M 300 250 L 200 150",
                "length": 141.42,
                "stroke": "#FF0000",
                "duration": 6,
                "startFrame": 56,
                "revealWidth": 12,
                "strokeWidth": 12
              },
              {
                "id": "path-6",
                "path": "M 300 150 L 200 250",
                "length": 141.42,
                "stroke": "#FF0000",
                "duration": 6,
                "startFrame": 64,
                "revealWidth": 12,
                "strokeWidth": 12
              },
              {
                "id": "path-7",
                "path": "M 600 300 L 750 300",
                "length": 150,
                "stroke": "#222222",
                "duration": 7,
                "startFrame": 73,
                "revealWidth": 10,
                "strokeWidth": 10
              },
              {
                "id": "path-8",
                "path": "M 720 270 L 750 300 L 720 330",
                "length": 84.85,
                "stroke": "#222222",
                "duration": 3,
                "startFrame": 82,
                "revealWidth": 10,
                "strokeWidth": 10
              },
              {
                "id": "path-9",
                "path": "M 990 220 A 40 40 0 1 0 910 220 A 40 40 0 1 0 990 220 Z",
                "length": 251.33,
                "stroke": "#222222",
                "duration": 11,
                "startFrame": 88,
                "revealWidth": 8,
                "strokeWidth": 8
              },
              {
                "id": "path-10",
                "path": "M 950 260 L 950 420",
                "length": 160,
                "stroke": "#222222",
                "duration": 7,
                "startFrame": 101,
                "revealWidth": 8,
                "strokeWidth": 8
              },
              {
                "id": "path-11",
                "path": "M 880 360 L 950 300",
                "length": 92.2,
                "stroke": "#222222",
                "duration": 4,
                "startFrame": 110,
                "revealWidth": 8,
                "strokeWidth": 8
              },
              {
                "id": "path-12",
                "path": "M 950 300 L 1020 360",
                "length": 92.2,
                "stroke": "#222222",
                "duration": 4,
                "startFrame": 114,
                "revealWidth": 8,
                "strokeWidth": 8
              },
              {
                "id": "path-13",
                "path": "M 950 420 L 880 550",
                "length": 147.65,
                "stroke": "#222222",
                "duration": 6,
                "startFrame": 120,
                "revealWidth": 8,
                "strokeWidth": 8
              },
              {
                "id": "path-14",
                "path": "M 1020 550 L 950 420",
                "length": 147.65,
                "stroke": "#222222",
                "duration": 6,
                "startFrame": 128,
                "revealWidth": 8,
                "strokeWidth": 8
              },
              {
                "id": "path-15",
                "path": "M 1050 200 L 1100 150 L 1080 230 L 1130 180",
                "length": 223.88,
                "stroke": "#FFD700",
                "duration": 9,
                "startFrame": 137,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-16",
                "path": "M 340 450 L 320 430 L 300 450",
                "length": 56.57,
                "stroke": "#222222",
                "duration": 3,
                "startFrame": 151,
                "revealWidth": 8,
                "strokeWidth": 8
              },
              {
                "id": "path-17",
                "path": "M 320 430 L 320 480",
                "length": 50,
                "stroke": "#222222",
                "duration": 3,
                "startFrame": 156,
                "revealWidth": 8,
                "strokeWidth": 8
              },
              {
                "id": "path-18",
                "path": "M 350 460 L 450 460",
                "length": 100,
                "stroke": "#222222",
                "duration": 4,
                "startFrame": 161,
                "revealWidth": 8,
                "strokeWidth": 8
              },
              {
                "id": "path-19",
                "path": "M 900 580 L 1000 580",
                "length": 100,
                "stroke": "#222222",
                "duration": 1,
                "startFrame": 169,
                "revealWidth": 8,
                "strokeWidth": 8
              }
            ],
            "audioSrc": "https://adfmmuo6gjjbnu7i.public.blob.vercel-storage.com/generated-audio/storysketch/the-creative-fatigue-problem-1776197377403.mp3",
            "handAsset": "marker-hand.webp",
            "background": "#ffffff",
            "renderMode": "stroke",
            "scriptText": "Your ads are fatiguing faster than your team can produce new ones. That's not a creative problem; it's a production problem.",
            "finalSourceSvg": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%201280%20720%22%20width%3D%221280%22%20height%3D%22720%22%3E%3Cg%20stroke%3D%22%23222222%22%20stroke-width%3D%228%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20fill%3D%22none%22%3E%3Cg%20id%3D%22ad-screen%22%3E%3Crect%20x%3D%22250%22%20y%3D%22200%22%20width%3D%22300%22%20height%3D%22200%22%2F%3E%3Cpath%20d%3D%22M%20280%20250%20L%20520%20250%22%20stroke-width%3D%224%22%2F%3E%3Cpath%20d%3D%22M%20280%20300%20L%20450%20300%22%20stroke-width%3D%224%22%2F%3E%3Cpath%20d%3D%22M%20280%20350%20L%20400%20350%22%20stroke-width%3D%224%22%2F%3E%3Cpath%20d%3D%22M%20200%20150%20L%20300%20250%22%20stroke%3D%22%23FF0000%22%20stroke-width%3D%2212%22%2F%3E%3Cpath%20d%3D%22M%20300%20150%20L%20200%20250%22%20stroke%3D%22%23FF0000%22%20stroke-width%3D%2212%22%2F%3E%3C%2Fg%3E%3Cpath%20d%3D%22M%20600%20300%20L%20750%20300%22%20stroke-width%3D%2210%22%2F%3E%3Cpath%20d%3D%22M%20720%20270%20L%20750%20300%20L%20720%20330%22%20stroke-width%3D%2210%22%2F%3E%3Cg%20id%3D%22team-production%22%3E%3Ccircle%20cx%3D%22950%22%20cy%3D%22220%22%20r%3D%2240%22%2F%3E%3Cpath%20d%3D%22M%20950%20260%20L%20950%20420%22%2F%3E%3Cpath%20d%3D%22M%20950%20300%20L%20880%20360%22%2F%3E%3Cpath%20d%3D%22M%20950%20300%20L%201020%20360%22%2F%3E%3Cpath%20d%3D%22M%20950%20420%20L%20880%20550%22%2F%3E%3Cpath%20d%3D%22M%20950%20420%20L%201020%20550%22%2F%3E%3Cpath%20d%3D%22M%201050%20200%20L%201100%20150%20L%201080%20230%20L%201130%20180%22%20stroke%3D%22%23FFD700%22%20stroke-width%3D%226%22%2F%3E%3C%2Fg%3E%3Cg%20id%3D%22label-text%22%3E%3Cpath%20d%3D%22M%20300%20450%20L%20320%20430%20L%20340%20450%22%2F%3E%3Cpath%20d%3D%22M%20320%20430%20L%20320%20480%22%2F%3E%3Cpath%20d%3D%22M%20350%20460%20L%20450%20460%22%2F%3E%3Cpath%20d%3D%22M%20900%20580%20L%201000%20580%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E",
            "durationInFrames": 215,
            "subtitleLimitedTilt": ""
          }
        },
        {
          "id": "story-moment",
          "label": "Story",
          "svgDataUrl": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%201280%20720%22%3E%3Cg%20stroke%3D%22black%22%20stroke-width%3D%228%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20fill%3D%22none%22%3E%3Cg%20id%3D%22tired-creator%22%3E%3Ccircle%20cx%3D%22300%22%20cy%3D%22300%22%20r%3D%2240%22%2F%3E%3Cpath%20d%3D%22M%20300%20340%20L%20300%20500%22%2F%3E%3Cpath%20d%3D%22M%20300%20380%20L%20240%20440%22%2F%3E%3Cpath%20d%3D%22M%20300%20380%20L%20360%20440%22%2F%3E%3Cpath%20d%3D%22M%20300%20500%20L%20250%20620%22%2F%3E%3Cpath%20d%3D%22M%20300%20500%20L%20350%20620%22%2F%3E%3Cpath%20d%3D%22M%20285%20290%20L%20295%20300%22%2F%3E%3Cpath%20d%3D%22M%20295%20290%20L%20285%20300%22%2F%3E%3Cpath%20d%3D%22M%20305%20290%20L%20315%20300%22%2F%3E%3Cpath%20d%3D%22M%20315%20290%20L%20305%20300%22%2F%3E%3Cpath%20d%3D%22M%20280%20320%20Q%20300%20310%20320%20320%22%2F%3E%3C%2Fg%3E%3Cg%20id%3D%22fatigued-ads%22%3E%3Crect%20x%3D%22600%22%20y%3D%22200%22%20width%3D%22120%22%20height%3D%22160%22%2F%3E%3Cpath%20d%3D%22M%20620%20230%20L%20700%20230%22%2F%3E%3Cpath%20d%3D%22M%20620%20260%20L%20680%20260%22%2F%3E%3Cpath%20d%3D%22M%20600%20200%20L%20720%20360%22%20stroke-width%3D%224%22%2F%3E%3Cpath%20d%3D%22M%20720%20200%20L%20600%20360%22%20stroke-width%3D%224%22%2F%3E%3Crect%20x%3D%22750%22%20y%3D%22200%22%20width%3D%22120%22%20height%3D%22160%22%2F%3E%3Cpath%20d%3D%22M%20770%20230%20L%20850%20230%22%2F%3E%3Cpath%20d%3D%22M%20770%20260%20L%20830%20260%22%2F%3E%3Cpath%20d%3D%22M%20750%20200%20L%20870%20360%22%20stroke-width%3D%224%22%2F%3E%3Cpath%20d%3D%22M%20870%20200%20L%20750%20360%22%20stroke-width%3D%224%22%2F%3E%3Crect%20x%3D%22900%22%20y%3D%22200%22%20width%3D%22120%22%20height%3D%22160%22%2F%3E%3Cpath%20d%3D%22M%20920%20230%20L%201000%20230%22%2F%3E%3Cpath%20d%3D%22M%20920%20260%20L%20980%20260%22%2F%3E%3Cpath%20d%3D%22M%20900%20200%20L%201020%20360%22%20stroke-width%3D%224%22%2F%3E%3Cpath%20d%3D%22M%201020%20200%20L%20900%20360%22%20stroke-width%3D%224%22%2F%3E%3C%2Fg%3E%3Cpath%20d%3D%22M%201000%20450%20L%201000%20650%22%20stroke%3D%22%23FF0000%22%20stroke-width%3D%2212%22%2F%3E%3Cpath%20d%3D%22M%20950%20550%20L%201050%20550%22%20stroke%3D%22%23FF0000%22%20stroke-width%3D%2212%22%2F%3E%3Cg%20id%3D%22lightning-symbol%22%3E%3Cpath%20d%3D%22M%20450%20200%20L%20400%20350%20L%20480%20350%20L%20430%20500%22%20stroke%3D%22%23FFD700%22%2F%3E%3C%2Fg%3E%3Cpath%20d%3D%22M%20100%20650%20L%201180%20650%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E",
          "tracedScene": {
            "id": "the-creative-fatigue-problem-1",
            "fps": 30,
            "svg": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%201280%20720%22%3E%3Cg%20stroke%3D%22black%22%20stroke-width%3D%228%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20fill%3D%22none%22%3E%3Cg%20id%3D%22tired-creator%22%3E%3Ccircle%20cx%3D%22300%22%20cy%3D%22300%22%20r%3D%2240%22%2F%3E%3Cpath%20d%3D%22M%20300%20340%20L%20300%20500%22%2F%3E%3Cpath%20d%3D%22M%20300%20380%20L%20240%20440%22%2F%3E%3Cpath%20d%3D%22M%20300%20380%20L%20360%20440%22%2F%3E%3Cpath%20d%3D%22M%20300%20500%20L%20250%20620%22%2F%3E%3Cpath%20d%3D%22M%20300%20500%20L%20350%20620%22%2F%3E%3Cpath%20d%3D%22M%20285%20290%20L%20295%20300%22%2F%3E%3Cpath%20d%3D%22M%20295%20290%20L%20285%20300%22%2F%3E%3Cpath%20d%3D%22M%20305%20290%20L%20315%20300%22%2F%3E%3Cpath%20d%3D%22M%20315%20290%20L%20305%20300%22%2F%3E%3Cpath%20d%3D%22M%20280%20320%20Q%20300%20310%20320%20320%22%2F%3E%3C%2Fg%3E%3Cg%20id%3D%22fatigued-ads%22%3E%3Crect%20x%3D%22600%22%20y%3D%22200%22%20width%3D%22120%22%20height%3D%22160%22%2F%3E%3Cpath%20d%3D%22M%20620%20230%20L%20700%20230%22%2F%3E%3Cpath%20d%3D%22M%20620%20260%20L%20680%20260%22%2F%3E%3Cpath%20d%3D%22M%20600%20200%20L%20720%20360%22%20stroke-width%3D%224%22%2F%3E%3Cpath%20d%3D%22M%20720%20200%20L%20600%20360%22%20stroke-width%3D%224%22%2F%3E%3Crect%20x%3D%22750%22%20y%3D%22200%22%20width%3D%22120%22%20height%3D%22160%22%2F%3E%3Cpath%20d%3D%22M%20770%20230%20L%20850%20230%22%2F%3E%3Cpath%20d%3D%22M%20770%20260%20L%20830%20260%22%2F%3E%3Cpath%20d%3D%22M%20750%20200%20L%20870%20360%22%20stroke-width%3D%224%22%2F%3E%3Cpath%20d%3D%22M%20870%20200%20L%20750%20360%22%20stroke-width%3D%224%22%2F%3E%3Crect%20x%3D%22900%22%20y%3D%22200%22%20width%3D%22120%22%20height%3D%22160%22%2F%3E%3Cpath%20d%3D%22M%20920%20230%20L%201000%20230%22%2F%3E%3Cpath%20d%3D%22M%20920%20260%20L%20980%20260%22%2F%3E%3Cpath%20d%3D%22M%20900%20200%20L%201020%20360%22%20stroke-width%3D%224%22%2F%3E%3Cpath%20d%3D%22M%201020%20200%20L%20900%20360%22%20stroke-width%3D%224%22%2F%3E%3C%2Fg%3E%3Cpath%20d%3D%22M%201000%20450%20L%201000%20650%22%20stroke%3D%22%23FF0000%22%20stroke-width%3D%2212%22%2F%3E%3Cpath%20d%3D%22M%20950%20550%20L%201050%20550%22%20stroke%3D%22%23FF0000%22%20stroke-width%3D%2212%22%2F%3E%3Cg%20id%3D%22lightning-symbol%22%3E%3Cpath%20d%3D%22M%20450%20200%20L%20400%20350%20L%20480%20350%20L%20430%20500%22%20stroke%3D%22%23FFD700%22%2F%3E%3C%2Fg%3E%3Cpath%20d%3D%22M%20100%20650%20L%201180%20650%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E",
            "title": "The Creative Fatigue Problem",
            "width": 1280,
            "height": 720,
            "marker": {
              "width": 180,
              "height": 180,
              "tipOffsetX": 136,
              "tipOffsetY": 24,
              "maxTiltDegrees": 15
            },
            "timing": {
              "gapFrames": 0,
              "startFrame": 8,
              "maxDuration": 20,
              "minDuration": 4,
              "endHoldFrames": 45,
              "maxTravelFrames": 6,
              "minTravelFrames": 2,
              "framesPerHundredPx": 5,
              "connectedThresholdPx": 18,
              "travelPixelsPerFrame": 90
            },
            "strokes": [
              {
                "id": "path-1",
                "path": "M 340 300 A 40 40 0 1 0 260 300 A 40 40 0 1 0 340 300 Z",
                "length": 251.33,
                "stroke": "black",
                "duration": 6,
                "startFrame": 8,
                "revealWidth": 8,
                "strokeWidth": 8
              },
              {
                "id": "path-2",
                "path": "M 300 340 L 300 500",
                "length": 160,
                "stroke": "black",
                "duration": 4,
                "startFrame": 15,
                "revealWidth": 8,
                "strokeWidth": 8
              },
              {
                "id": "path-3",
                "path": "M 240 440 L 300 380",
                "length": 84.85,
                "stroke": "black",
                "duration": 2,
                "startFrame": 20,
                "revealWidth": 8,
                "strokeWidth": 8
              },
              {
                "id": "path-4",
                "path": "M 300 380 L 360 440",
                "length": 84.85,
                "stroke": "black",
                "duration": 2,
                "startFrame": 22,
                "revealWidth": 8,
                "strokeWidth": 8
              },
              {
                "id": "path-5",
                "path": "M 300 500 L 250 620",
                "length": 130,
                "stroke": "black",
                "duration": 3,
                "startFrame": 25,
                "revealWidth": 8,
                "strokeWidth": 8
              },
              {
                "id": "path-6",
                "path": "M 350 620 L 300 500",
                "length": 130,
                "stroke": "black",
                "duration": 3,
                "startFrame": 29,
                "revealWidth": 8,
                "strokeWidth": 8
              },
              {
                "id": "path-7",
                "path": "M 285 290 L 295 300",
                "length": 14.14,
                "stroke": "black",
                "duration": 2,
                "startFrame": 33,
                "revealWidth": 8,
                "strokeWidth": 8
              },
              {
                "id": "path-8",
                "path": "M 295 290 L 285 300",
                "length": 14.14,
                "stroke": "black",
                "duration": 2,
                "startFrame": 35,
                "revealWidth": 8,
                "strokeWidth": 8
              },
              {
                "id": "path-9",
                "path": "M 305 290 L 315 300",
                "length": 14.14,
                "stroke": "black",
                "duration": 2,
                "startFrame": 38,
                "revealWidth": 8,
                "strokeWidth": 8
              },
              {
                "id": "path-10",
                "path": "M 315 290 L 305 300",
                "length": 14.14,
                "stroke": "black",
                "duration": 2,
                "startFrame": 40,
                "revealWidth": 8,
                "strokeWidth": 8
              },
              {
                "id": "path-11",
                "path": "M 320 320 C 306.6666666666667 313.3333333333333 293.3333333333333 313.3333333333333 280 320",
                "length": 41.61,
                "stroke": "black",
                "duration": 2,
                "startFrame": 43,
                "revealWidth": 8,
                "strokeWidth": 8
              },
              {
                "id": "path-12",
                "path": "M 600 200 H 720 V 360 H 600 Z",
                "length": 560,
                "stroke": "black",
                "duration": 10,
                "startFrame": 47,
                "revealWidth": 8,
                "strokeWidth": 8
              },
              {
                "id": "path-13",
                "path": "M 620 230 L 700 230",
                "length": 80,
                "stroke": "black",
                "duration": 2,
                "startFrame": 58,
                "revealWidth": 8,
                "strokeWidth": 8
              },
              {
                "id": "path-14",
                "path": "M 680 260 L 620 260",
                "length": 60,
                "stroke": "black",
                "duration": 2,
                "startFrame": 61,
                "revealWidth": 8,
                "strokeWidth": 8
              },
              {
                "id": "path-15",
                "path": "M 600 200 L 720 360",
                "length": 200,
                "stroke": "black",
                "duration": 5,
                "startFrame": 64,
                "revealWidth": 4,
                "strokeWidth": 4
              },
              {
                "id": "path-16",
                "path": "M 600 360 L 720 200",
                "length": 200,
                "stroke": "black",
                "duration": 5,
                "startFrame": 70,
                "revealWidth": 4,
                "strokeWidth": 4
              },
              {
                "id": "path-17",
                "path": "M 750 200 H 870 V 360 H 750 Z",
                "length": 560,
                "stroke": "black",
                "duration": 10,
                "startFrame": 76,
                "revealWidth": 8,
                "strokeWidth": 8
              },
              {
                "id": "path-18",
                "path": "M 770 230 L 850 230",
                "length": 80,
                "stroke": "black",
                "duration": 2,
                "startFrame": 87,
                "revealWidth": 8,
                "strokeWidth": 8
              },
              {
                "id": "path-19",
                "path": "M 830 260 L 770 260",
                "length": 60,
                "stroke": "black",
                "duration": 2,
                "startFrame": 90,
                "revealWidth": 8,
                "strokeWidth": 8
              },
              {
                "id": "path-20",
                "path": "M 750 200 L 870 360",
                "length": 200,
                "stroke": "black",
                "duration": 5,
                "startFrame": 93,
                "revealWidth": 4,
                "strokeWidth": 4
              },
              {
                "id": "path-21",
                "path": "M 750 360 L 870 200",
                "length": 200,
                "stroke": "black",
                "duration": 5,
                "startFrame": 99,
                "revealWidth": 4,
                "strokeWidth": 4
              },
              {
                "id": "path-22",
                "path": "M 900 200 H 1020 V 360 H 900 Z",
                "length": 560,
                "stroke": "black",
                "duration": 10,
                "startFrame": 105,
                "revealWidth": 8,
                "strokeWidth": 8
              },
              {
                "id": "path-23",
                "path": "M 920 230 L 1000 230",
                "length": 80,
                "stroke": "black",
                "duration": 2,
                "startFrame": 116,
                "revealWidth": 8,
                "strokeWidth": 8
              },
              {
                "id": "path-24",
                "path": "M 980 260 L 920 260",
                "length": 60,
                "stroke": "black",
                "duration": 2,
                "startFrame": 119,
                "revealWidth": 8,
                "strokeWidth": 8
              },
              {
                "id": "path-25",
                "path": "M 900 200 L 1020 360",
                "length": 200,
                "stroke": "black",
                "duration": 5,
                "startFrame": 122,
                "revealWidth": 4,
                "strokeWidth": 4
              },
              {
                "id": "path-26",
                "path": "M 900 360 L 1020 200",
                "length": 200,
                "stroke": "black",
                "duration": 5,
                "startFrame": 128,
                "revealWidth": 4,
                "strokeWidth": 4
              },
              {
                "id": "path-27",
                "path": "M 1000 450 L 1000 650",
                "length": 200,
                "stroke": "#FF0000",
                "duration": 5,
                "startFrame": 134,
                "revealWidth": 12,
                "strokeWidth": 12
              },
              {
                "id": "path-28",
                "path": "M 950 550 L 1050 550",
                "length": 100,
                "stroke": "#FF0000",
                "duration": 2,
                "startFrame": 140,
                "revealWidth": 12,
                "strokeWidth": 12
              },
              {
                "id": "path-29",
                "path": "M 430 500 L 480 350 L 400 350 L 450 200",
                "length": 396.23,
                "stroke": "#FFD700",
                "duration": 10,
                "startFrame": 145,
                "revealWidth": 8,
                "strokeWidth": 8
              },
              {
                "id": "path-30",
                "path": "M 100 650 L 1180 650",
                "length": 1080,
                "stroke": "black",
                "duration": 12,
                "startFrame": 158,
                "revealWidth": 8,
                "strokeWidth": 8
              }
            ],
            "audioSrc": "https://adfmmuo6gjjbnu7i.public.blob.vercel-storage.com/generated-audio/storysketch/the-creative-fatigue-problem-1776197377403.mp3",
            "handAsset": "marker-hand.webp",
            "background": "#ffffff",
            "renderMode": "stroke",
            "scriptText": "Your ads are fatiguing faster than your team can produce new ones. That's not a creative problem; it's a production problem.",
            "finalSourceSvg": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%201280%20720%22%3E%3Cg%20stroke%3D%22black%22%20stroke-width%3D%228%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20fill%3D%22none%22%3E%3Cg%20id%3D%22tired-creator%22%3E%3Ccircle%20cx%3D%22300%22%20cy%3D%22300%22%20r%3D%2240%22%2F%3E%3Cpath%20d%3D%22M%20300%20340%20L%20300%20500%22%2F%3E%3Cpath%20d%3D%22M%20300%20380%20L%20240%20440%22%2F%3E%3Cpath%20d%3D%22M%20300%20380%20L%20360%20440%22%2F%3E%3Cpath%20d%3D%22M%20300%20500%20L%20250%20620%22%2F%3E%3Cpath%20d%3D%22M%20300%20500%20L%20350%20620%22%2F%3E%3Cpath%20d%3D%22M%20285%20290%20L%20295%20300%22%2F%3E%3Cpath%20d%3D%22M%20295%20290%20L%20285%20300%22%2F%3E%3Cpath%20d%3D%22M%20305%20290%20L%20315%20300%22%2F%3E%3Cpath%20d%3D%22M%20315%20290%20L%20305%20300%22%2F%3E%3Cpath%20d%3D%22M%20280%20320%20Q%20300%20310%20320%20320%22%2F%3E%3C%2Fg%3E%3Cg%20id%3D%22fatigued-ads%22%3E%3Crect%20x%3D%22600%22%20y%3D%22200%22%20width%3D%22120%22%20height%3D%22160%22%2F%3E%3Cpath%20d%3D%22M%20620%20230%20L%20700%20230%22%2F%3E%3Cpath%20d%3D%22M%20620%20260%20L%20680%20260%22%2F%3E%3Cpath%20d%3D%22M%20600%20200%20L%20720%20360%22%20stroke-width%3D%224%22%2F%3E%3Cpath%20d%3D%22M%20720%20200%20L%20600%20360%22%20stroke-width%3D%224%22%2F%3E%3Crect%20x%3D%22750%22%20y%3D%22200%22%20width%3D%22120%22%20height%3D%22160%22%2F%3E%3Cpath%20d%3D%22M%20770%20230%20L%20850%20230%22%2F%3E%3Cpath%20d%3D%22M%20770%20260%20L%20830%20260%22%2F%3E%3Cpath%20d%3D%22M%20750%20200%20L%20870%20360%22%20stroke-width%3D%224%22%2F%3E%3Cpath%20d%3D%22M%20870%20200%20L%20750%20360%22%20stroke-width%3D%224%22%2F%3E%3Crect%20x%3D%22900%22%20y%3D%22200%22%20width%3D%22120%22%20height%3D%22160%22%2F%3E%3Cpath%20d%3D%22M%20920%20230%20L%201000%20230%22%2F%3E%3Cpath%20d%3D%22M%20920%20260%20L%20980%20260%22%2F%3E%3Cpath%20d%3D%22M%20900%20200%20L%201020%20360%22%20stroke-width%3D%224%22%2F%3E%3Cpath%20d%3D%22M%201020%20200%20L%20900%20360%22%20stroke-width%3D%224%22%2F%3E%3C%2Fg%3E%3Cpath%20d%3D%22M%201000%20450%20L%201000%20650%22%20stroke%3D%22%23FF0000%22%20stroke-width%3D%2212%22%2F%3E%3Cpath%20d%3D%22M%20950%20550%20L%201050%20550%22%20stroke%3D%22%23FF0000%22%20stroke-width%3D%2212%22%2F%3E%3Cg%20id%3D%22lightning-symbol%22%3E%3Cpath%20d%3D%22M%20450%20200%20L%20400%20350%20L%20480%20350%20L%20430%20500%22%20stroke%3D%22%23FFD700%22%2F%3E%3C%2Fg%3E%3Cpath%20d%3D%22M%20100%20650%20L%201180%20650%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E",
            "durationInFrames": 215,
            "subtitleLimitedTilt": ""
          }
        },
        {
          "id": "process-sketch",
          "label": "Process",
          "svgDataUrl": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%201280%20720%22%20width%3D%221280%22%20height%3D%22720%22%3E%3Cg%20stroke%3D%22black%22%20stroke-width%3D%228%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20fill%3D%22none%22%3E%3C!--%20Left%20Side%3A%20Team%20Side%20--%3E%3Cg%20id%3D%22team-section%22%3E%3Ccircle%20cx%3D%22200%22%20cy%3D%22200%22%20r%3D%2235%22%2F%3E%3Cpath%20d%3D%22M%20200%20235%20L%20200%20360%22%2F%3E%3Cpath%20d%3D%22M%20200%20270%20L%20150%20320%22%2F%3E%3Cpath%20d%3D%22M%20200%20270%20L%20250%20320%22%2F%3E%3Cpath%20d%3D%22M%20200%20360%20L%20160%20460%22%2F%3E%3Cpath%20d%3D%22M%20200%20360%20L%20240%20460%22%2F%3E%3Cpath%20d%3D%22M%20140%20500%20L%20260%20500%22%2F%3E%3Cpath%20d%3D%22M%20140%20540%20L%20260%20540%22%2F%3E%3Cpath%20d%3D%22M%20140%20580%20L%20260%20580%22%2F%3E%3Cpath%20d%3D%22M%20140%20500%20L%20140%20580%22%2F%3E%3Cpath%20d%3D%22M%20260%20500%20L%20260%20580%22%2F%3E%3Cpath%20d%3D%22M%20175%20530%20L%20185%20550%20L%20210%20520%22%20stroke%3D%22%2322c55e%22%2F%3E%3C%2Fg%3E%3C!--%20Center%3A%20Production%20Gap%20Flow%20--%3E%3Cg%20id%3D%22flow-arrows%22%3E%3Cpath%20d%3D%22M%20350%20360%20L%20550%20360%22%2F%3E%3Cpath%20d%3D%22M%20510%20330%20L%20550%20360%20L%20510%20390%22%2F%3E%3Cpath%20d%3D%22M%20730%20360%20L%20930%20360%22%2F%3E%3Cpath%20d%3D%22M%20890%20330%20L%20930%20360%20L%20890%20390%22%2F%3E%3Cpath%20d%3D%22M%20600%20300%20L%20680%20420%22%20stroke%3D%22%23ef4444%22%20stroke-width%3D%2212%22%2F%3E%3Cpath%20d%3D%22M%20680%20300%20L%20600%20420%22%20stroke%3D%22%23ef4444%22%20stroke-width%3D%2212%22%2F%3E%3C%2Fg%3E%3C!--%20Right%20Side%3A%20Fatiguing%20Ads%20--%3E%3Cg%20id%3D%22ad-section%22%3E%3Crect%20x%3D%221000%22%20y%3D%22200%22%20width%3D%22160%22%20height%3D%22100%22%2F%3E%3Cpath%20d%3D%22M%201030%20250%20L%201130%20250%22%2F%3E%3Cpath%20d%3D%22M%201000%20200%20L%201160%20300%22%20stroke%3D%22%23ef4444%22%2F%3E%3Crect%20x%3D%221000%22%20y%3D%22350%22%20width%3D%22160%22%20height%3D%22100%22%2F%3E%3Cpath%20d%3D%22M%201030%20400%20L%201130%20400%22%2F%3E%3Cpath%20d%3D%22M%201000%20350%20L%201160%20450%22%20stroke%3D%22%23ef4444%22%2F%3E%3Crect%20x%3D%221000%22%20y%3D%22500%22%20width%3D%22160%22%20height%3D%22100%22%2F%3E%3Cpath%20d%3D%22M%201030%20550%20L%201130%20550%22%2F%3E%3Cpath%20d%3D%22M%201000%20500%20L%201160%20600%22%20stroke%3D%22%23ef4444%22%2F%3E%3Cpath%20d%3D%22M%201120%20180%20L%201140%20140%20L%201160%20160%20L%201180%20120%22%20stroke%3D%22%23ef4444%22%2F%3E%3C%2Fg%3E%3C!--%20Labels%20--%3E%3Cpath%20d%3D%22M%20150%20100%20L%20160%2080%20L%20170%20100%20L%20180%2080%20L%20190%20100%22%20stroke%3D%22%23ef4444%22%2F%3E%3Ccircle%20cx%3D%22170%22%20cy%3D%2260%22%20r%3D%2215%22%20stroke%3D%22%23ef4444%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E",
          "tracedScene": {
            "id": "the-creative-fatigue-problem-1",
            "fps": 30,
            "svg": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%201280%20720%22%20width%3D%221280%22%20height%3D%22720%22%3E%3Cg%20stroke%3D%22black%22%20stroke-width%3D%228%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20fill%3D%22none%22%3E%3C!--%20Left%20Side%3A%20Team%20Side%20--%3E%3Cg%20id%3D%22team-section%22%3E%3Ccircle%20cx%3D%22200%22%20cy%3D%22200%22%20r%3D%2235%22%2F%3E%3Cpath%20d%3D%22M%20200%20235%20L%20200%20360%22%2F%3E%3Cpath%20d%3D%22M%20200%20270%20L%20150%20320%22%2F%3E%3Cpath%20d%3D%22M%20200%20270%20L%20250%20320%22%2F%3E%3Cpath%20d%3D%22M%20200%20360%20L%20160%20460%22%2F%3E%3Cpath%20d%3D%22M%20200%20360%20L%20240%20460%22%2F%3E%3Cpath%20d%3D%22M%20140%20500%20L%20260%20500%22%2F%3E%3Cpath%20d%3D%22M%20140%20540%20L%20260%20540%22%2F%3E%3Cpath%20d%3D%22M%20140%20580%20L%20260%20580%22%2F%3E%3Cpath%20d%3D%22M%20140%20500%20L%20140%20580%22%2F%3E%3Cpath%20d%3D%22M%20260%20500%20L%20260%20580%22%2F%3E%3Cpath%20d%3D%22M%20175%20530%20L%20185%20550%20L%20210%20520%22%20stroke%3D%22%2322c55e%22%2F%3E%3C%2Fg%3E%3C!--%20Center%3A%20Production%20Gap%20Flow%20--%3E%3Cg%20id%3D%22flow-arrows%22%3E%3Cpath%20d%3D%22M%20350%20360%20L%20550%20360%22%2F%3E%3Cpath%20d%3D%22M%20510%20330%20L%20550%20360%20L%20510%20390%22%2F%3E%3Cpath%20d%3D%22M%20730%20360%20L%20930%20360%22%2F%3E%3Cpath%20d%3D%22M%20890%20330%20L%20930%20360%20L%20890%20390%22%2F%3E%3Cpath%20d%3D%22M%20600%20300%20L%20680%20420%22%20stroke%3D%22%23ef4444%22%20stroke-width%3D%2212%22%2F%3E%3Cpath%20d%3D%22M%20680%20300%20L%20600%20420%22%20stroke%3D%22%23ef4444%22%20stroke-width%3D%2212%22%2F%3E%3C%2Fg%3E%3C!--%20Right%20Side%3A%20Fatiguing%20Ads%20--%3E%3Cg%20id%3D%22ad-section%22%3E%3Crect%20x%3D%221000%22%20y%3D%22200%22%20width%3D%22160%22%20height%3D%22100%22%2F%3E%3Cpath%20d%3D%22M%201030%20250%20L%201130%20250%22%2F%3E%3Cpath%20d%3D%22M%201000%20200%20L%201160%20300%22%20stroke%3D%22%23ef4444%22%2F%3E%3Crect%20x%3D%221000%22%20y%3D%22350%22%20width%3D%22160%22%20height%3D%22100%22%2F%3E%3Cpath%20d%3D%22M%201030%20400%20L%201130%20400%22%2F%3E%3Cpath%20d%3D%22M%201000%20350%20L%201160%20450%22%20stroke%3D%22%23ef4444%22%2F%3E%3Crect%20x%3D%221000%22%20y%3D%22500%22%20width%3D%22160%22%20height%3D%22100%22%2F%3E%3Cpath%20d%3D%22M%201030%20550%20L%201130%20550%22%2F%3E%3Cpath%20d%3D%22M%201000%20500%20L%201160%20600%22%20stroke%3D%22%23ef4444%22%2F%3E%3Cpath%20d%3D%22M%201120%20180%20L%201140%20140%20L%201160%20160%20L%201180%20120%22%20stroke%3D%22%23ef4444%22%2F%3E%3C%2Fg%3E%3C!--%20Labels%20--%3E%3Cpath%20d%3D%22M%20150%20100%20L%20160%2080%20L%20170%20100%20L%20180%2080%20L%20190%20100%22%20stroke%3D%22%23ef4444%22%2F%3E%3Ccircle%20cx%3D%22170%22%20cy%3D%2260%22%20r%3D%2215%22%20stroke%3D%22%23ef4444%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E",
            "title": "The Creative Fatigue Problem",
            "width": 1280,
            "height": 720,
            "marker": {
              "width": 180,
              "height": 180,
              "tipOffsetX": 136,
              "tipOffsetY": 24,
              "maxTiltDegrees": 15
            },
            "timing": {
              "gapFrames": 0,
              "startFrame": 8,
              "maxDuration": 20,
              "minDuration": 4,
              "endHoldFrames": 45,
              "maxTravelFrames": 6,
              "minTravelFrames": 2,
              "framesPerHundredPx": 5,
              "connectedThresholdPx": 18,
              "travelPixelsPerFrame": 90
            },
            "strokes": [
              {
                "id": "path-1",
                "path": "M 235 200 A 35 35 0 1 0 165 200 A 35 35 0 1 0 235 200 Z",
                "length": 219.91,
                "stroke": "black",
                "duration": 6,
                "startFrame": 8,
                "revealWidth": 8,
                "strokeWidth": 8
              },
              {
                "id": "path-2",
                "path": "M 200 235 L 200 360",
                "length": 125,
                "stroke": "black",
                "duration": 3,
                "startFrame": 15,
                "revealWidth": 8,
                "strokeWidth": 8
              },
              {
                "id": "path-3",
                "path": "M 150 320 L 200 270",
                "length": 70.71,
                "stroke": "black",
                "duration": 2,
                "startFrame": 19,
                "revealWidth": 8,
                "strokeWidth": 8
              },
              {
                "id": "path-4",
                "path": "M 200 270 L 250 320",
                "length": 70.71,
                "stroke": "black",
                "duration": 2,
                "startFrame": 21,
                "revealWidth": 8,
                "strokeWidth": 8
              },
              {
                "id": "path-5",
                "path": "M 200 360 L 160 460",
                "length": 107.7,
                "stroke": "black",
                "duration": 3,
                "startFrame": 24,
                "revealWidth": 8,
                "strokeWidth": 8
              },
              {
                "id": "path-6",
                "path": "M 240 460 L 200 360",
                "length": 107.7,
                "stroke": "black",
                "duration": 3,
                "startFrame": 28,
                "revealWidth": 8,
                "strokeWidth": 8
              },
              {
                "id": "path-7",
                "path": "M 140 500 L 260 500",
                "length": 120,
                "stroke": "black",
                "duration": 3,
                "startFrame": 32,
                "revealWidth": 8,
                "strokeWidth": 8
              },
              {
                "id": "path-8",
                "path": "M 260 540 L 140 540",
                "length": 120,
                "stroke": "black",
                "duration": 3,
                "startFrame": 36,
                "revealWidth": 8,
                "strokeWidth": 8
              },
              {
                "id": "path-9",
                "path": "M 140 580 L 260 580",
                "length": 120,
                "stroke": "black",
                "duration": 3,
                "startFrame": 40,
                "revealWidth": 8,
                "strokeWidth": 8
              },
              {
                "id": "path-10",
                "path": "M 140 580 L 140 500",
                "length": 80,
                "stroke": "black",
                "duration": 2,
                "startFrame": 44,
                "revealWidth": 8,
                "strokeWidth": 8
              },
              {
                "id": "path-11",
                "path": "M 260 500 L 260 580",
                "length": 80,
                "stroke": "black",
                "duration": 2,
                "startFrame": 47,
                "revealWidth": 8,
                "strokeWidth": 8
              },
              {
                "id": "path-12",
                "path": "M 210 520 L 185 550 L 175 530",
                "length": 61.41,
                "stroke": "#22c55e",
                "duration": 2,
                "startFrame": 50,
                "revealWidth": 8,
                "strokeWidth": 8
              },
              {
                "id": "path-13",
                "path": "M 350 360 L 550 360",
                "length": 200,
                "stroke": "black",
                "duration": 6,
                "startFrame": 54,
                "revealWidth": 8,
                "strokeWidth": 8
              },
              {
                "id": "path-14",
                "path": "M 510 330 L 550 360 L 510 390",
                "length": 100,
                "stroke": "black",
                "duration": 3,
                "startFrame": 61,
                "revealWidth": 8,
                "strokeWidth": 8
              },
              {
                "id": "path-15",
                "path": "M 730 360 L 930 360",
                "length": 200,
                "stroke": "black",
                "duration": 6,
                "startFrame": 65,
                "revealWidth": 8,
                "strokeWidth": 8
              },
              {
                "id": "path-16",
                "path": "M 890 330 L 930 360 L 890 390",
                "length": 100,
                "stroke": "black",
                "duration": 3,
                "startFrame": 72,
                "revealWidth": 8,
                "strokeWidth": 8
              },
              {
                "id": "path-17",
                "path": "M 680 420 L 600 300",
                "length": 144.22,
                "stroke": "#ef4444",
                "duration": 4,
                "startFrame": 76,
                "revealWidth": 12,
                "strokeWidth": 12
              },
              {
                "id": "path-18",
                "path": "M 680 300 L 600 420",
                "length": 144.22,
                "stroke": "#ef4444",
                "duration": 4,
                "startFrame": 81,
                "revealWidth": 12,
                "strokeWidth": 12
              },
              {
                "id": "path-19",
                "path": "M 1000 200 H 1160 V 300 H 1000 Z",
                "length": 520,
                "stroke": "black",
                "duration": 11,
                "startFrame": 88,
                "revealWidth": 8,
                "strokeWidth": 8
              },
              {
                "id": "path-20",
                "path": "M 1030 250 L 1130 250",
                "length": 100,
                "stroke": "black",
                "duration": 3,
                "startFrame": 100,
                "revealWidth": 8,
                "strokeWidth": 8
              },
              {
                "id": "path-21",
                "path": "M 1160 300 L 1000 200",
                "length": 188.68,
                "stroke": "#ef4444",
                "duration": 5,
                "startFrame": 104,
                "revealWidth": 8,
                "strokeWidth": 8
              },
              {
                "id": "path-22",
                "path": "M 1000 350 H 1160 V 450 H 1000 Z",
                "length": 520,
                "stroke": "black",
                "duration": 11,
                "startFrame": 110,
                "revealWidth": 8,
                "strokeWidth": 8
              },
              {
                "id": "path-23",
                "path": "M 1030 400 L 1130 400",
                "length": 100,
                "stroke": "black",
                "duration": 3,
                "startFrame": 122,
                "revealWidth": 8,
                "strokeWidth": 8
              },
              {
                "id": "path-24",
                "path": "M 1160 450 L 1000 350",
                "length": 188.68,
                "stroke": "#ef4444",
                "duration": 5,
                "startFrame": 126,
                "revealWidth": 8,
                "strokeWidth": 8
              },
              {
                "id": "path-25",
                "path": "M 1000 500 H 1160 V 600 H 1000 Z",
                "length": 520,
                "stroke": "black",
                "duration": 11,
                "startFrame": 132,
                "revealWidth": 8,
                "strokeWidth": 8
              },
              {
                "id": "path-26",
                "path": "M 1030 550 L 1130 550",
                "length": 100,
                "stroke": "black",
                "duration": 3,
                "startFrame": 144,
                "revealWidth": 8,
                "strokeWidth": 8
              },
              {
                "id": "path-27",
                "path": "M 1160 600 L 1000 500",
                "length": 188.68,
                "stroke": "#ef4444",
                "duration": 5,
                "startFrame": 148,
                "revealWidth": 8,
                "strokeWidth": 8
              },
              {
                "id": "path-28",
                "path": "M 1120 180 L 1140 140 L 1160 160 L 1180 120",
                "length": 117.73,
                "stroke": "#ef4444",
                "duration": 3,
                "startFrame": 155,
                "revealWidth": 8,
                "strokeWidth": 8
              },
              {
                "id": "path-29",
                "path": "M 190 100 L 180 80 L 170 100 L 160 80 L 150 100",
                "length": 89.44,
                "stroke": "#ef4444",
                "duration": 2,
                "startFrame": 161,
                "revealWidth": 8,
                "strokeWidth": 8
              },
              {
                "id": "path-30",
                "path": "M 185 60 A 15 15 0 1 0 155 60 A 15 15 0 1 0 185 60 Z",
                "length": 94.25,
                "stroke": "#ef4444",
                "duration": 6,
                "startFrame": 164,
                "revealWidth": 8,
                "strokeWidth": 8
              }
            ],
            "audioSrc": "https://adfmmuo6gjjbnu7i.public.blob.vercel-storage.com/generated-audio/storysketch/the-creative-fatigue-problem-1776197377403.mp3",
            "handAsset": "marker-hand.webp",
            "background": "#ffffff",
            "renderMode": "stroke",
            "scriptText": "Your ads are fatiguing faster than your team can produce new ones. That's not a creative problem; it's a production problem.",
            "finalSourceSvg": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%201280%20720%22%20width%3D%221280%22%20height%3D%22720%22%3E%3Cg%20stroke%3D%22black%22%20stroke-width%3D%228%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20fill%3D%22none%22%3E%3C!--%20Left%20Side%3A%20Team%20Side%20--%3E%3Cg%20id%3D%22team-section%22%3E%3Ccircle%20cx%3D%22200%22%20cy%3D%22200%22%20r%3D%2235%22%2F%3E%3Cpath%20d%3D%22M%20200%20235%20L%20200%20360%22%2F%3E%3Cpath%20d%3D%22M%20200%20270%20L%20150%20320%22%2F%3E%3Cpath%20d%3D%22M%20200%20270%20L%20250%20320%22%2F%3E%3Cpath%20d%3D%22M%20200%20360%20L%20160%20460%22%2F%3E%3Cpath%20d%3D%22M%20200%20360%20L%20240%20460%22%2F%3E%3Cpath%20d%3D%22M%20140%20500%20L%20260%20500%22%2F%3E%3Cpath%20d%3D%22M%20140%20540%20L%20260%20540%22%2F%3E%3Cpath%20d%3D%22M%20140%20580%20L%20260%20580%22%2F%3E%3Cpath%20d%3D%22M%20140%20500%20L%20140%20580%22%2F%3E%3Cpath%20d%3D%22M%20260%20500%20L%20260%20580%22%2F%3E%3Cpath%20d%3D%22M%20175%20530%20L%20185%20550%20L%20210%20520%22%20stroke%3D%22%2322c55e%22%2F%3E%3C%2Fg%3E%3C!--%20Center%3A%20Production%20Gap%20Flow%20--%3E%3Cg%20id%3D%22flow-arrows%22%3E%3Cpath%20d%3D%22M%20350%20360%20L%20550%20360%22%2F%3E%3Cpath%20d%3D%22M%20510%20330%20L%20550%20360%20L%20510%20390%22%2F%3E%3Cpath%20d%3D%22M%20730%20360%20L%20930%20360%22%2F%3E%3Cpath%20d%3D%22M%20890%20330%20L%20930%20360%20L%20890%20390%22%2F%3E%3Cpath%20d%3D%22M%20600%20300%20L%20680%20420%22%20stroke%3D%22%23ef4444%22%20stroke-width%3D%2212%22%2F%3E%3Cpath%20d%3D%22M%20680%20300%20L%20600%20420%22%20stroke%3D%22%23ef4444%22%20stroke-width%3D%2212%22%2F%3E%3C%2Fg%3E%3C!--%20Right%20Side%3A%20Fatiguing%20Ads%20--%3E%3Cg%20id%3D%22ad-section%22%3E%3Crect%20x%3D%221000%22%20y%3D%22200%22%20width%3D%22160%22%20height%3D%22100%22%2F%3E%3Cpath%20d%3D%22M%201030%20250%20L%201130%20250%22%2F%3E%3Cpath%20d%3D%22M%201000%20200%20L%201160%20300%22%20stroke%3D%22%23ef4444%22%2F%3E%3Crect%20x%3D%221000%22%20y%3D%22350%22%20width%3D%22160%22%20height%3D%22100%22%2F%3E%3Cpath%20d%3D%22M%201030%20400%20L%201130%20400%22%2F%3E%3Cpath%20d%3D%22M%201000%20350%20L%201160%20450%22%20stroke%3D%22%23ef4444%22%2F%3E%3Crect%20x%3D%221000%22%20y%3D%22500%22%20width%3D%22160%22%20height%3D%22100%22%2F%3E%3Cpath%20d%3D%22M%201030%20550%20L%201130%20550%22%2F%3E%3Cpath%20d%3D%22M%201000%20500%20L%201160%20600%22%20stroke%3D%22%23ef4444%22%2F%3E%3Cpath%20d%3D%22M%201120%20180%20L%201140%20140%20L%201160%20160%20L%201180%20120%22%20stroke%3D%22%23ef4444%22%2F%3E%3C%2Fg%3E%3C!--%20Labels%20--%3E%3Cpath%20d%3D%22M%20150%20100%20L%20160%2080%20L%20170%20100%20L%20180%2080%20L%20190%20100%22%20stroke%3D%22%23ef4444%22%2F%3E%3Ccircle%20cx%3D%22170%22%20cy%3D%2260%22%20r%3D%2215%22%20stroke%3D%22%23ef4444%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E",
            "durationInFrames": 215,
            "subtitleLimitedTilt": ""
          }
        }
      ]
    },
    {
      "id": "the-production-bottleneck-2",
      "title": "The Production Bottleneck",
      "scriptText": "You need five new angles this week. But your current process gives you one video every two weeks. The math doesn't work.",
      "selectedVisualOptionId": "story-moment",
      "visualOptions": [
        {
          "id": "minimal-diagram",
          "label": "Minimal",
          "svgDataUrl": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%201280%20720%22%20width%3D%221280%22%20height%3D%22720%22%3E%3Cg%20stroke%3D%22%23222222%22%20stroke-width%3D%228%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20fill%3D%22none%22%3E%3Cg%20id%3D%22goal-side%22%3E%3Crect%20x%3D%22200%22%20y%3D%22200%22%20width%3D%22120%22%20height%3D%2280%22%2F%3E%3Crect%20x%3D%22200%22%20y%3D%22300%22%20width%3D%22120%22%20height%3D%2280%22%2F%3E%3Crect%20x%3D%22200%22%20y%3D%22400%22%20width%3D%22120%22%20height%3D%2280%22%2F%3E%3Crect%20x%3D%22200%22%20y%3D%22500%22%20width%3D%22120%22%20height%3D%2280%22%2F%3E%3Crect%20x%3D%22200%22%20y%3D%22100%22%20width%3D%22120%22%20height%3D%2280%22%2F%3E%3Cpath%20d%3D%22M%20340%20350%20L%20450%20350%20L%20440%20340%20M%20450%20350%20L%20440%20360%22%2F%3E%3C%2Fg%3E%3Cg%20id%3D%22bottleneck%22%3E%3Cpath%20d%3D%22M%20550%20250%20L%20750%20250%20L%20750%20320%20L%20950%20320%20L%20950%20380%20L%20750%20380%20L%20750%20450%20L%20550%20450%20Z%22%2F%3E%3Cpath%20d%3D%22M%20820%20310%20L%20880%20390%20M%20880%20310%20L%20820%20390%22%20stroke%3D%22%23FF0000%22%20stroke-width%3D%2212%22%2F%3E%3C%2Fg%3E%3Cg%20id%3D%22output-side%22%3E%3Crect%20x%3D%221030%22%20y%3D%22310%22%20width%3D%22120%22%20height%3D%2280%22%2F%3E%3Cpath%20d%3D%22M%201030%20410%20L%201150%20410%22%20stroke-dasharray%3D%2215%2C15%22%2F%3E%3Cpath%20d%3D%22M%201030%20440%20L%201150%20440%22%20stroke-dasharray%3D%2215%2C15%22%2F%3E%3C%2Fg%3E%3Cg%20id%3D%22labels%22%3E%3Cpath%20d%3D%22M%20200%20620%20L%20220%20620%20L%20220%20640%20L%20200%20640%20Z%22%20fill%3D%22%23222222%22%2F%3E%3Cpath%20d%3D%22M%20230%20635%20L%20350%20635%22%20stroke-width%3D%222%22%2F%3E%3Cpath%20d%3D%22M%201030%20620%20L%201050%20620%20L%201050%20640%20L%201030%20640%20Z%22%20fill%3D%22none%22%20stroke-width%3D%222%22%2F%3E%3Cpath%20d%3D%22M%201060%20635%20L%201180%20635%22%20stroke-width%3D%222%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E",
          "tracedScene": {
            "id": "the-production-bottleneck-2",
            "fps": 30,
            "svg": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%201280%20720%22%20width%3D%221280%22%20height%3D%22720%22%3E%3Cg%20stroke%3D%22%23222222%22%20stroke-width%3D%228%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20fill%3D%22none%22%3E%3Cg%20id%3D%22goal-side%22%3E%3Crect%20x%3D%22200%22%20y%3D%22200%22%20width%3D%22120%22%20height%3D%2280%22%2F%3E%3Crect%20x%3D%22200%22%20y%3D%22300%22%20width%3D%22120%22%20height%3D%2280%22%2F%3E%3Crect%20x%3D%22200%22%20y%3D%22400%22%20width%3D%22120%22%20height%3D%2280%22%2F%3E%3Crect%20x%3D%22200%22%20y%3D%22500%22%20width%3D%22120%22%20height%3D%2280%22%2F%3E%3Crect%20x%3D%22200%22%20y%3D%22100%22%20width%3D%22120%22%20height%3D%2280%22%2F%3E%3Cpath%20d%3D%22M%20340%20350%20L%20450%20350%20L%20440%20340%20M%20450%20350%20L%20440%20360%22%2F%3E%3C%2Fg%3E%3Cg%20id%3D%22bottleneck%22%3E%3Cpath%20d%3D%22M%20550%20250%20L%20750%20250%20L%20750%20320%20L%20950%20320%20L%20950%20380%20L%20750%20380%20L%20750%20450%20L%20550%20450%20Z%22%2F%3E%3Cpath%20d%3D%22M%20820%20310%20L%20880%20390%20M%20880%20310%20L%20820%20390%22%20stroke%3D%22%23FF0000%22%20stroke-width%3D%2212%22%2F%3E%3C%2Fg%3E%3Cg%20id%3D%22output-side%22%3E%3Crect%20x%3D%221030%22%20y%3D%22310%22%20width%3D%22120%22%20height%3D%2280%22%2F%3E%3Cpath%20d%3D%22M%201030%20410%20L%201150%20410%22%20stroke-dasharray%3D%2215%2C15%22%2F%3E%3Cpath%20d%3D%22M%201030%20440%20L%201150%20440%22%20stroke-dasharray%3D%2215%2C15%22%2F%3E%3C%2Fg%3E%3Cg%20id%3D%22labels%22%3E%3Cpath%20d%3D%22M%20200%20620%20L%20220%20620%20L%20220%20640%20L%20200%20640%20Z%22%20fill%3D%22%23222222%22%2F%3E%3Cpath%20d%3D%22M%20230%20635%20L%20350%20635%22%20stroke-width%3D%222%22%2F%3E%3Cpath%20d%3D%22M%201030%20620%20L%201050%20620%20L%201050%20640%20L%201030%20640%20Z%22%20fill%3D%22none%22%20stroke-width%3D%222%22%2F%3E%3Cpath%20d%3D%22M%201060%20635%20L%201180%20635%22%20stroke-width%3D%222%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E",
            "title": "The Production Bottleneck",
            "width": 1280,
            "height": 720,
            "marker": {
              "width": 180,
              "height": 180,
              "tipOffsetX": 136,
              "tipOffsetY": 24,
              "maxTiltDegrees": 15
            },
            "timing": {
              "gapFrames": 0,
              "startFrame": 8,
              "maxDuration": 20,
              "minDuration": 4,
              "endHoldFrames": 45,
              "maxTravelFrames": 6,
              "minTravelFrames": 2,
              "framesPerHundredPx": 5,
              "connectedThresholdPx": 18,
              "travelPixelsPerFrame": 90
            },
            "strokes": [
              {
                "id": "path-1",
                "path": "M 200 200 H 320 V 280 H 200 Z",
                "length": 400,
                "stroke": "#222222",
                "duration": 20,
                "startFrame": 8,
                "revealWidth": 8,
                "strokeWidth": 8
              },
              {
                "id": "path-2",
                "path": "M 200 300 H 320 V 380 H 200 Z",
                "length": 400,
                "stroke": "#222222",
                "duration": 20,
                "startFrame": 30,
                "revealWidth": 8,
                "strokeWidth": 8
              },
              {
                "id": "path-3",
                "path": "M 200 400 H 320 V 480 H 200 Z",
                "length": 400,
                "stroke": "#222222",
                "duration": 20,
                "startFrame": 52,
                "revealWidth": 8,
                "strokeWidth": 8
              },
              {
                "id": "path-4",
                "path": "M 200 500 H 320 V 580 H 200 Z",
                "length": 400,
                "stroke": "#222222",
                "duration": 20,
                "startFrame": 74,
                "revealWidth": 8,
                "strokeWidth": 8
              },
              {
                "id": "path-5",
                "path": "M 200 100 H 320 V 180 H 200 Z",
                "length": 400,
                "stroke": "#222222",
                "duration": 20,
                "startFrame": 98,
                "revealWidth": 8,
                "strokeWidth": 8
              },
              {
                "id": "path-6",
                "path": "M 340 350 L 450 350 L 440 340 M 450 350 L 440 360",
                "length": 138.28,
                "stroke": "#222222",
                "duration": 7,
                "startFrame": 121,
                "revealWidth": 8,
                "strokeWidth": 8
              },
              {
                "id": "path-7",
                "path": "M 550 250 L 750 250 L 750 320 L 950 320 L 950 380 L 750 380 L 750 450 L 550 450 Z",
                "length": 1200,
                "stroke": "#222222",
                "duration": 20,
                "startFrame": 130,
                "revealWidth": 8,
                "strokeWidth": 8
              },
              {
                "id": "path-8",
                "path": "M 820 310 L 880 390 M 880 310 L 820 390",
                "length": 200,
                "stroke": "#FF0000",
                "duration": 10,
                "startFrame": 153,
                "revealWidth": 12,
                "strokeWidth": 12
              },
              {
                "id": "path-9",
                "path": "M 1030 310 H 1150 V 390 H 1030 Z",
                "length": 400,
                "stroke": "#222222",
                "duration": 20,
                "startFrame": 165,
                "revealWidth": 8,
                "strokeWidth": 8
              },
              {
                "id": "path-10",
                "path": "M 1030 410 L 1150 410",
                "length": 120,
                "stroke": "#222222",
                "duration": 6,
                "startFrame": 187,
                "revealWidth": 8,
                "strokeWidth": 8
              },
              {
                "id": "path-11",
                "path": "M 1150 440 L 1030 440",
                "length": 120,
                "stroke": "#222222",
                "duration": 6,
                "startFrame": 195,
                "revealWidth": 8,
                "strokeWidth": 8
              },
              {
                "id": "path-12",
                "path": "M 200 620 L 220 620 L 220 640 L 200 640 Z",
                "length": 80,
                "stroke": "#222222",
                "duration": 4,
                "startFrame": 207,
                "revealWidth": 8,
                "strokeWidth": 8
              },
              {
                "id": "path-13",
                "path": "M 230 635 L 350 635",
                "length": 120,
                "stroke": "#222222",
                "duration": 6,
                "startFrame": 213,
                "revealWidth": 2,
                "strokeWidth": 2
              },
              {
                "id": "path-14",
                "path": "M 1030 620 L 1050 620 L 1050 640 L 1030 640 Z",
                "length": 80,
                "stroke": "#222222",
                "duration": 4,
                "startFrame": 225,
                "revealWidth": 2,
                "strokeWidth": 2
              },
              {
                "id": "path-15",
                "path": "M 1060 635 L 1180 635",
                "length": 120,
                "stroke": "#222222",
                "duration": 6,
                "startFrame": 231,
                "revealWidth": 2,
                "strokeWidth": 2
              }
            ],
            "handAsset": "marker-hand.webp",
            "background": "#ffffff",
            "renderMode": "stroke",
            "scriptText": "You need five new angles this week. But your current process gives you one video every two weeks. The math doesn't work.",
            "finalSourceSvg": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%201280%20720%22%20width%3D%221280%22%20height%3D%22720%22%3E%3Cg%20stroke%3D%22%23222222%22%20stroke-width%3D%228%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20fill%3D%22none%22%3E%3Cg%20id%3D%22goal-side%22%3E%3Crect%20x%3D%22200%22%20y%3D%22200%22%20width%3D%22120%22%20height%3D%2280%22%2F%3E%3Crect%20x%3D%22200%22%20y%3D%22300%22%20width%3D%22120%22%20height%3D%2280%22%2F%3E%3Crect%20x%3D%22200%22%20y%3D%22400%22%20width%3D%22120%22%20height%3D%2280%22%2F%3E%3Crect%20x%3D%22200%22%20y%3D%22500%22%20width%3D%22120%22%20height%3D%2280%22%2F%3E%3Crect%20x%3D%22200%22%20y%3D%22100%22%20width%3D%22120%22%20height%3D%2280%22%2F%3E%3Cpath%20d%3D%22M%20340%20350%20L%20450%20350%20L%20440%20340%20M%20450%20350%20L%20440%20360%22%2F%3E%3C%2Fg%3E%3Cg%20id%3D%22bottleneck%22%3E%3Cpath%20d%3D%22M%20550%20250%20L%20750%20250%20L%20750%20320%20L%20950%20320%20L%20950%20380%20L%20750%20380%20L%20750%20450%20L%20550%20450%20Z%22%2F%3E%3Cpath%20d%3D%22M%20820%20310%20L%20880%20390%20M%20880%20310%20L%20820%20390%22%20stroke%3D%22%23FF0000%22%20stroke-width%3D%2212%22%2F%3E%3C%2Fg%3E%3Cg%20id%3D%22output-side%22%3E%3Crect%20x%3D%221030%22%20y%3D%22310%22%20width%3D%22120%22%20height%3D%2280%22%2F%3E%3Cpath%20d%3D%22M%201030%20410%20L%201150%20410%22%20stroke-dasharray%3D%2215%2C15%22%2F%3E%3Cpath%20d%3D%22M%201030%20440%20L%201150%20440%22%20stroke-dasharray%3D%2215%2C15%22%2F%3E%3C%2Fg%3E%3Cg%20id%3D%22labels%22%3E%3Cpath%20d%3D%22M%20200%20620%20L%20220%20620%20L%20220%20640%20L%20200%20640%20Z%22%20fill%3D%22%23222222%22%2F%3E%3Cpath%20d%3D%22M%20230%20635%20L%20350%20635%22%20stroke-width%3D%222%22%2F%3E%3Cpath%20d%3D%22M%201030%20620%20L%201050%20620%20L%201050%20640%20L%201030%20640%20Z%22%20fill%3D%22none%22%20stroke-width%3D%222%22%2F%3E%3Cpath%20d%3D%22M%201060%20635%20L%201180%20635%22%20stroke-width%3D%222%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E",
            "durationInFrames": 282,
            "subtitleLimitedTilt": "",
            "audioSrc": "https://adfmmuo6gjjbnu7i.public.blob.vercel-storage.com/generated-audio/storysketch/the-production-bottleneck-1776197379263.mp3"
          }
        },
        {
          "id": "story-moment",
          "label": "Story",
          "svgDataUrl": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%201280%20720%22%20width%3D%221280%22%20height%3D%22720%22%3E%3Cg%20stroke%3D%22black%22%20stroke-width%3D%226%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20fill%3D%22none%22%3E%3Cg%20id%3D%22character-frustrated%22%3E%3Ccircle%20cx%3D%22300%22%20cy%3D%22350%22%20r%3D%2240%22%2F%3E%3Cpath%20d%3D%22M%20300%20390%20L%20300%20550%22%2F%3E%3Cpath%20d%3D%22M%20300%20450%20L%20240%20400%22%2F%3E%3Cpath%20d%3D%22M%20300%20450%20L%20360%20400%22%2F%3E%3Cpath%20d%3D%22M%20300%20550%20L%20250%20670%22%2F%3E%3Cpath%20d%3D%22M%20300%20550%20L%20350%20670%22%2F%3E%3Cpath%20d%3D%22M%20275%20330%20L%20290%20340%22%2F%3E%3Cpath%20d%3D%22M%20325%20330%20L%20310%20340%22%2F%3E%3Cpath%20d%3D%22M%20280%20370%20Q%20300%20355%20320%20370%22%2F%3E%3C%2Fg%3E%3Cg%20id%3D%22bottleneck-visual%22%3E%3Cpath%20d%3D%22M%20600%20250%20L%20900%20250%20L%20920%20400%20L%201150%20400%22%2F%3E%3Cpath%20d%3D%22M%20600%20550%20L%20900%20550%20L%20920%20450%20L%201150%20450%22%2F%3E%3Cpath%20d%3D%22M%201000%20350%20L%201050%20425%20L%201100%20350%22%20stroke%3D%22red%22%20stroke-width%3D%228%22%2F%3E%3C%2Fg%3E%3Cg%20id%3D%22comparison-data%22%3E%3Crect%20x%3D%22650%22%20y%3D%22300%22%20width%3D%2260%22%20height%3D%2260%22%2F%3E%3Crect%20x%3D%22720%22%20y%3D%22300%22%20width%3D%2260%22%20height%3D%2260%22%2F%3E%3Crect%20x%3D%22790%22%20y%3D%22300%22%20width%3D%2260%22%20height%3D%2260%22%2F%3E%3Crect%20x%3D%22650%22%20y%3D%22370%22%20width%3D%2260%22%20height%3D%2260%22%2F%3E%3Crect%20x%3D%22720%22%20y%3D%22370%22%20width%3D%2260%22%20height%3D%2260%22%2F%3E%3Cpath%20d%3D%22M%201020%20425%20L%201080%20425%22%2F%3E%3Crect%20x%3D%221020%22%20y%3D%22410%22%20width%3D%2260%22%20height%3D%2230%22%2F%3E%3Cpath%20d%3D%22M%20900%20425%20L%20950%20425%22%20stroke-width%3D%2212%22%2F%3E%3C%2Fg%3E%3Cg%20id%3D%22lightning-symbol%22%3E%3Cpath%20d%3D%22M%20910%20300%20L%20890%20350%20L%20920%20350%20L%20900%20400%22%20stroke%3D%22red%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E",
          "tracedScene": {
            "id": "the-production-bottleneck-2",
            "fps": 30,
            "svg": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%201280%20720%22%20width%3D%221280%22%20height%3D%22720%22%3E%3Cg%20stroke%3D%22black%22%20stroke-width%3D%226%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20fill%3D%22none%22%3E%3Cg%20id%3D%22character-frustrated%22%3E%3Ccircle%20cx%3D%22300%22%20cy%3D%22350%22%20r%3D%2240%22%2F%3E%3Cpath%20d%3D%22M%20300%20390%20L%20300%20550%22%2F%3E%3Cpath%20d%3D%22M%20300%20450%20L%20240%20400%22%2F%3E%3Cpath%20d%3D%22M%20300%20450%20L%20360%20400%22%2F%3E%3Cpath%20d%3D%22M%20300%20550%20L%20250%20670%22%2F%3E%3Cpath%20d%3D%22M%20300%20550%20L%20350%20670%22%2F%3E%3Cpath%20d%3D%22M%20275%20330%20L%20290%20340%22%2F%3E%3Cpath%20d%3D%22M%20325%20330%20L%20310%20340%22%2F%3E%3Cpath%20d%3D%22M%20280%20370%20Q%20300%20355%20320%20370%22%2F%3E%3C%2Fg%3E%3Cg%20id%3D%22bottleneck-visual%22%3E%3Cpath%20d%3D%22M%20600%20250%20L%20900%20250%20L%20920%20400%20L%201150%20400%22%2F%3E%3Cpath%20d%3D%22M%20600%20550%20L%20900%20550%20L%20920%20450%20L%201150%20450%22%2F%3E%3Cpath%20d%3D%22M%201000%20350%20L%201050%20425%20L%201100%20350%22%20stroke%3D%22red%22%20stroke-width%3D%228%22%2F%3E%3C%2Fg%3E%3Cg%20id%3D%22comparison-data%22%3E%3Crect%20x%3D%22650%22%20y%3D%22300%22%20width%3D%2260%22%20height%3D%2260%22%2F%3E%3Crect%20x%3D%22720%22%20y%3D%22300%22%20width%3D%2260%22%20height%3D%2260%22%2F%3E%3Crect%20x%3D%22790%22%20y%3D%22300%22%20width%3D%2260%22%20height%3D%2260%22%2F%3E%3Crect%20x%3D%22650%22%20y%3D%22370%22%20width%3D%2260%22%20height%3D%2260%22%2F%3E%3Crect%20x%3D%22720%22%20y%3D%22370%22%20width%3D%2260%22%20height%3D%2260%22%2F%3E%3Cpath%20d%3D%22M%201020%20425%20L%201080%20425%22%2F%3E%3Crect%20x%3D%221020%22%20y%3D%22410%22%20width%3D%2260%22%20height%3D%2230%22%2F%3E%3Cpath%20d%3D%22M%20900%20425%20L%20950%20425%22%20stroke-width%3D%2212%22%2F%3E%3C%2Fg%3E%3Cg%20id%3D%22lightning-symbol%22%3E%3Cpath%20d%3D%22M%20910%20300%20L%20890%20350%20L%20920%20350%20L%20900%20400%22%20stroke%3D%22red%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E",
            "title": "The Production Bottleneck",
            "width": 1280,
            "height": 720,
            "marker": {
              "width": 180,
              "height": 180,
              "tipOffsetX": 136,
              "tipOffsetY": 24,
              "maxTiltDegrees": 15
            },
            "timing": {
              "gapFrames": 0,
              "startFrame": 8,
              "maxDuration": 20,
              "minDuration": 4,
              "endHoldFrames": 45,
              "maxTravelFrames": 6,
              "minTravelFrames": 2,
              "framesPerHundredPx": 5,
              "connectedThresholdPx": 18,
              "travelPixelsPerFrame": 90
            },
            "strokes": [
              {
                "id": "path-1",
                "path": "M 340 350 A 40 40 0 1 0 260 350 A 40 40 0 1 0 340 350 Z",
                "length": 251.33,
                "stroke": "black",
                "duration": 13,
                "startFrame": 8,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-2",
                "path": "M 300 390 L 300 550",
                "length": 160,
                "stroke": "black",
                "duration": 8,
                "startFrame": 23,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-3",
                "path": "M 300 450 L 240 400",
                "length": 78.1,
                "stroke": "black",
                "duration": 4,
                "startFrame": 33,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-4",
                "path": "M 300 450 L 360 400",
                "length": 78.1,
                "stroke": "black",
                "duration": 4,
                "startFrame": 39,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-5",
                "path": "M 300 550 L 250 670",
                "length": 130,
                "stroke": "black",
                "duration": 7,
                "startFrame": 45,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-6",
                "path": "M 350 670 L 300 550",
                "length": 130,
                "stroke": "black",
                "duration": 7,
                "startFrame": 54,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-7",
                "path": "M 290 340 L 275 330",
                "length": 18.03,
                "stroke": "black",
                "duration": 4,
                "startFrame": 63,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-8",
                "path": "M 310 340 L 325 330",
                "length": 18.03,
                "stroke": "black",
                "duration": 4,
                "startFrame": 69,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-9",
                "path": "M 320 370 C 306.6666666666667 360 293.3333333333333 360 280 370",
                "length": 43.48,
                "stroke": "black",
                "duration": 4,
                "startFrame": 75,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-10",
                "path": "M 600 250 L 900 250 L 920 400 L 1150 400",
                "length": 681.33,
                "stroke": "black",
                "duration": 20,
                "startFrame": 83,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-11",
                "path": "M 1150 450 L 920 450 L 900 550 L 600 550",
                "length": 631.98,
                "stroke": "black",
                "duration": 20,
                "startFrame": 105,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-12",
                "path": "M 1000 350 L 1050 425 L 1100 350",
                "length": 180.28,
                "stroke": "red",
                "duration": 9,
                "startFrame": 130,
                "revealWidth": 8,
                "strokeWidth": 8
              },
              {
                "id": "path-13",
                "path": "M 650 300 H 710 V 360 H 650 Z",
                "length": 240,
                "stroke": "black",
                "duration": 12,
                "startFrame": 144,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-14",
                "path": "M 720 300 H 780 V 360 H 720 Z",
                "length": 240,
                "stroke": "black",
                "duration": 12,
                "startFrame": 158,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-15",
                "path": "M 790 300 H 850 V 360 H 790 Z",
                "length": 240,
                "stroke": "black",
                "duration": 12,
                "startFrame": 172,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-16",
                "path": "M 650 370 H 710 V 430 H 650 Z",
                "length": 240,
                "stroke": "black",
                "duration": 12,
                "startFrame": 186,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-17",
                "path": "M 720 370 H 780 V 430 H 720 Z",
                "length": 240,
                "stroke": "black",
                "duration": 12,
                "startFrame": 200,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-18",
                "path": "M 1020 425 L 1080 425",
                "length": 60,
                "stroke": "black",
                "duration": 4,
                "startFrame": 215,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-19",
                "path": "M 1020 410 H 1080 V 440 H 1020 Z",
                "length": 180,
                "stroke": "black",
                "duration": 9,
                "startFrame": 221,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-20",
                "path": "M 950 425 L 900 425",
                "length": 50,
                "stroke": "black",
                "duration": 4,
                "startFrame": 232,
                "revealWidth": 12,
                "strokeWidth": 12
              },
              {
                "id": "path-21",
                "path": "M 900 400 L 920 350 L 890 350 L 910 300",
                "length": 137.7,
                "stroke": "red",
                "duration": 7,
                "startFrame": 238,
                "revealWidth": 6,
                "strokeWidth": 6
              }
            ],
            "handAsset": "marker-hand.webp",
            "background": "#ffffff",
            "renderMode": "stroke",
            "scriptText": "You need five new angles this week. But your current process gives you one video every two weeks. The math doesn't work.",
            "finalSourceSvg": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%201280%20720%22%20width%3D%221280%22%20height%3D%22720%22%3E%3Cg%20stroke%3D%22black%22%20stroke-width%3D%226%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20fill%3D%22none%22%3E%3Cg%20id%3D%22character-frustrated%22%3E%3Ccircle%20cx%3D%22300%22%20cy%3D%22350%22%20r%3D%2240%22%2F%3E%3Cpath%20d%3D%22M%20300%20390%20L%20300%20550%22%2F%3E%3Cpath%20d%3D%22M%20300%20450%20L%20240%20400%22%2F%3E%3Cpath%20d%3D%22M%20300%20450%20L%20360%20400%22%2F%3E%3Cpath%20d%3D%22M%20300%20550%20L%20250%20670%22%2F%3E%3Cpath%20d%3D%22M%20300%20550%20L%20350%20670%22%2F%3E%3Cpath%20d%3D%22M%20275%20330%20L%20290%20340%22%2F%3E%3Cpath%20d%3D%22M%20325%20330%20L%20310%20340%22%2F%3E%3Cpath%20d%3D%22M%20280%20370%20Q%20300%20355%20320%20370%22%2F%3E%3C%2Fg%3E%3Cg%20id%3D%22bottleneck-visual%22%3E%3Cpath%20d%3D%22M%20600%20250%20L%20900%20250%20L%20920%20400%20L%201150%20400%22%2F%3E%3Cpath%20d%3D%22M%20600%20550%20L%20900%20550%20L%20920%20450%20L%201150%20450%22%2F%3E%3Cpath%20d%3D%22M%201000%20350%20L%201050%20425%20L%201100%20350%22%20stroke%3D%22red%22%20stroke-width%3D%228%22%2F%3E%3C%2Fg%3E%3Cg%20id%3D%22comparison-data%22%3E%3Crect%20x%3D%22650%22%20y%3D%22300%22%20width%3D%2260%22%20height%3D%2260%22%2F%3E%3Crect%20x%3D%22720%22%20y%3D%22300%22%20width%3D%2260%22%20height%3D%2260%22%2F%3E%3Crect%20x%3D%22790%22%20y%3D%22300%22%20width%3D%2260%22%20height%3D%2260%22%2F%3E%3Crect%20x%3D%22650%22%20y%3D%22370%22%20width%3D%2260%22%20height%3D%2260%22%2F%3E%3Crect%20x%3D%22720%22%20y%3D%22370%22%20width%3D%2260%22%20height%3D%2260%22%2F%3E%3Cpath%20d%3D%22M%201020%20425%20L%201080%20425%22%2F%3E%3Crect%20x%3D%221020%22%20y%3D%22410%22%20width%3D%2260%22%20height%3D%2230%22%2F%3E%3Cpath%20d%3D%22M%20900%20425%20L%20950%20425%22%20stroke-width%3D%2212%22%2F%3E%3C%2Fg%3E%3Cg%20id%3D%22lightning-symbol%22%3E%3Cpath%20d%3D%22M%20910%20300%20L%20890%20350%20L%20920%20350%20L%20900%20400%22%20stroke%3D%22red%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E",
            "durationInFrames": 290,
            "subtitleLimitedTilt": "",
            "audioSrc": "https://adfmmuo6gjjbnu7i.public.blob.vercel-storage.com/generated-audio/storysketch/the-production-bottleneck-1776197379263.mp3"
          }
        },
        {
          "id": "process-sketch",
          "label": "Process",
          "svgDataUrl": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%201280%20720%22%20width%3D%221280%22%20height%3D%22720%22%3E%3Cg%20stroke%3D%22black%22%20stroke-width%3D%226%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20fill%3D%22none%22%3E%3Cg%20id%3D%22target-need%22%3E%3Crect%20x%3D%22100%22%20y%3D%22200%22%20width%3D%22150%22%20height%3D%22100%22%2F%3E%3Crect%20x%3D%22100%22%20y%3D%22320%22%20width%3D%22150%22%20height%3D%22100%22%2F%3E%3Crect%20x%3D%22100%22%20y%3D%22440%22%20width%3D%22150%22%20height%3D%22100%22%2F%3E%3Crect%20x%3D%22270%22%20y%3D%22260%22%20width%3D%22150%22%20height%3D%22100%22%2F%3E%3Crect%20x%3D%22270%22%20y%3D%22380%22%20width%3D%22150%22%20height%3D%22100%22%2F%3E%3Ctext%20x%3D%22100%22%20y%3D%22170%22%20font-family%3D%22sans-serif%22%20font-size%3D%2240%22%20fill%3D%22black%22%20stroke%3D%22none%22%3E5%20VIDEOS%3C%2Ftext%3E%3C%2Fg%3E%3Cpath%20id%3D%22bottleneck-arrow%22%20d%3D%22M%20450%20360%20L%20600%20360%20L%20580%20340%20M%20600%20360%20L%20580%20380%22%2F%3E%3Cg%20id%3D%22bottleneck-funnel%22%3E%3Cpath%20d%3D%22M%20650%20250%20L%20800%20340%20L%20800%20380%20L%20650%20470%22%2F%3E%3Cpath%20d%3D%22M%20800%20340%20L%20950%20340%20L%20950%20380%20L%20800%20380%22%2F%3E%3Cpath%20id%3D%22problem-bolt%22%20d%3D%22M%20730%20320%20L%20710%20360%20L%20740%20360%20L%20720%20400%22%20stroke%3D%22red%22%2F%3E%3C%2Fg%3E%3Cg%20id%3D%22actual-output%22%3E%3Crect%20x%3D%221050%22%20y%3D%22310%22%20width%3D%22150%22%20height%3D%22100%22%2F%3E%3Ctext%20x%3D%221030%22%20y%3D%22460%22%20font-family%3D%22sans-serif%22%20font-size%3D%2240%22%20fill%3D%22black%22%20stroke%3D%22none%22%3E1%20VIDEO%20%2F%202%20WKS%3C%2Ftext%3E%3C%2Fg%3E%3Cpath%20id%3D%22red-x%22%20d%3D%22M%20600%20550%20L%20680%20630%20M%20680%20550%20L%20600%20630%22%20stroke%3D%22red%22%20stroke-width%3D%2212%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E",
          "tracedScene": {
            "id": "the-production-bottleneck-2",
            "fps": 30,
            "svg": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%201280%20720%22%20width%3D%221280%22%20height%3D%22720%22%3E%3Cg%20stroke%3D%22black%22%20stroke-width%3D%226%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20fill%3D%22none%22%3E%3Cg%20id%3D%22target-need%22%3E%3Crect%20x%3D%22100%22%20y%3D%22200%22%20width%3D%22150%22%20height%3D%22100%22%2F%3E%3Crect%20x%3D%22100%22%20y%3D%22320%22%20width%3D%22150%22%20height%3D%22100%22%2F%3E%3Crect%20x%3D%22100%22%20y%3D%22440%22%20width%3D%22150%22%20height%3D%22100%22%2F%3E%3Crect%20x%3D%22270%22%20y%3D%22260%22%20width%3D%22150%22%20height%3D%22100%22%2F%3E%3Crect%20x%3D%22270%22%20y%3D%22380%22%20width%3D%22150%22%20height%3D%22100%22%2F%3E%3Ctext%20x%3D%22100%22%20y%3D%22170%22%20font-family%3D%22sans-serif%22%20font-size%3D%2240%22%20fill%3D%22black%22%20stroke%3D%22none%22%3E5%20VIDEOS%3C%2Ftext%3E%3C%2Fg%3E%3Cpath%20id%3D%22bottleneck-arrow%22%20d%3D%22M%20450%20360%20L%20600%20360%20L%20580%20340%20M%20600%20360%20L%20580%20380%22%2F%3E%3Cg%20id%3D%22bottleneck-funnel%22%3E%3Cpath%20d%3D%22M%20650%20250%20L%20800%20340%20L%20800%20380%20L%20650%20470%22%2F%3E%3Cpath%20d%3D%22M%20800%20340%20L%20950%20340%20L%20950%20380%20L%20800%20380%22%2F%3E%3Cpath%20id%3D%22problem-bolt%22%20d%3D%22M%20730%20320%20L%20710%20360%20L%20740%20360%20L%20720%20400%22%20stroke%3D%22red%22%2F%3E%3C%2Fg%3E%3Cg%20id%3D%22actual-output%22%3E%3Crect%20x%3D%221050%22%20y%3D%22310%22%20width%3D%22150%22%20height%3D%22100%22%2F%3E%3Ctext%20x%3D%221030%22%20y%3D%22460%22%20font-family%3D%22sans-serif%22%20font-size%3D%2240%22%20fill%3D%22black%22%20stroke%3D%22none%22%3E1%20VIDEO%20%2F%202%20WKS%3C%2Ftext%3E%3C%2Fg%3E%3Cpath%20id%3D%22red-x%22%20d%3D%22M%20600%20550%20L%20680%20630%20M%20680%20550%20L%20600%20630%22%20stroke%3D%22red%22%20stroke-width%3D%2212%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E",
            "title": "The Production Bottleneck",
            "width": 1280,
            "height": 720,
            "marker": {
              "width": 180,
              "height": 180,
              "tipOffsetX": 136,
              "tipOffsetY": 24,
              "maxTiltDegrees": 15
            },
            "timing": {
              "gapFrames": 0,
              "startFrame": 8,
              "maxDuration": 20,
              "minDuration": 4,
              "endHoldFrames": 45,
              "maxTravelFrames": 6,
              "minTravelFrames": 2,
              "framesPerHundredPx": 5,
              "connectedThresholdPx": 18,
              "travelPixelsPerFrame": 90
            },
            "strokes": [
              {
                "id": "path-1",
                "path": "M 100 200 H 250 V 300 H 100 Z",
                "length": 500,
                "stroke": "black",
                "duration": 20,
                "startFrame": 8,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-2",
                "path": "M 100 320 H 250 V 420 H 100 Z",
                "length": 500,
                "stroke": "black",
                "duration": 20,
                "startFrame": 30,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-3",
                "path": "M 100 440 H 250 V 540 H 100 Z",
                "length": 500,
                "stroke": "black",
                "duration": 20,
                "startFrame": 52,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-4",
                "path": "M 270 260 H 420 V 360 H 270 Z",
                "length": 500,
                "stroke": "black",
                "duration": 20,
                "startFrame": 75,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-5",
                "path": "M 270 380 H 420 V 480 H 270 Z",
                "length": 500,
                "stroke": "black",
                "duration": 20,
                "startFrame": 97,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "bottleneck-arrow",
                "path": "M 450 360 L 600 360 L 580 340 M 600 360 L 580 380",
                "length": 206.57,
                "stroke": "black",
                "duration": 10,
                "startFrame": 119,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-7",
                "path": "M 650 470 L 800 380 L 800 340 L 650 250",
                "length": 389.86,
                "stroke": "black",
                "duration": 19,
                "startFrame": 131,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-8",
                "path": "M 800 340 L 950 340 L 950 380 L 800 380",
                "length": 340,
                "stroke": "black",
                "duration": 17,
                "startFrame": 152,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "problem-bolt",
                "path": "M 720 400 L 740 360 L 710 360 L 730 320",
                "length": 119.44,
                "stroke": "red",
                "duration": 6,
                "startFrame": 171,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-10",
                "path": "M 1050 310 H 1200 V 410 H 1050 Z",
                "length": 500,
                "stroke": "black",
                "duration": 20,
                "startFrame": 181,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "red-x",
                "path": "M 600 550 L 680 630 M 680 550 L 600 630",
                "length": 226.27,
                "stroke": "red",
                "duration": 11,
                "startFrame": 207,
                "revealWidth": 12,
                "strokeWidth": 12
              }
            ],
            "handAsset": "marker-hand.webp",
            "background": "#ffffff",
            "renderMode": "stroke",
            "scriptText": "You need five new angles this week. But your current process gives you one video every two weeks. The math doesn't work.",
            "finalSourceSvg": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%201280%20720%22%20width%3D%221280%22%20height%3D%22720%22%3E%3Cg%20stroke%3D%22black%22%20stroke-width%3D%226%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20fill%3D%22none%22%3E%3Cg%20id%3D%22target-need%22%3E%3Crect%20x%3D%22100%22%20y%3D%22200%22%20width%3D%22150%22%20height%3D%22100%22%2F%3E%3Crect%20x%3D%22100%22%20y%3D%22320%22%20width%3D%22150%22%20height%3D%22100%22%2F%3E%3Crect%20x%3D%22100%22%20y%3D%22440%22%20width%3D%22150%22%20height%3D%22100%22%2F%3E%3Crect%20x%3D%22270%22%20y%3D%22260%22%20width%3D%22150%22%20height%3D%22100%22%2F%3E%3Crect%20x%3D%22270%22%20y%3D%22380%22%20width%3D%22150%22%20height%3D%22100%22%2F%3E%3Ctext%20x%3D%22100%22%20y%3D%22170%22%20font-family%3D%22sans-serif%22%20font-size%3D%2240%22%20fill%3D%22black%22%20stroke%3D%22none%22%3E5%20VIDEOS%3C%2Ftext%3E%3C%2Fg%3E%3Cpath%20id%3D%22bottleneck-arrow%22%20d%3D%22M%20450%20360%20L%20600%20360%20L%20580%20340%20M%20600%20360%20L%20580%20380%22%2F%3E%3Cg%20id%3D%22bottleneck-funnel%22%3E%3Cpath%20d%3D%22M%20650%20250%20L%20800%20340%20L%20800%20380%20L%20650%20470%22%2F%3E%3Cpath%20d%3D%22M%20800%20340%20L%20950%20340%20L%20950%20380%20L%20800%20380%22%2F%3E%3Cpath%20id%3D%22problem-bolt%22%20d%3D%22M%20730%20320%20L%20710%20360%20L%20740%20360%20L%20720%20400%22%20stroke%3D%22red%22%2F%3E%3C%2Fg%3E%3Cg%20id%3D%22actual-output%22%3E%3Crect%20x%3D%221050%22%20y%3D%22310%22%20width%3D%22150%22%20height%3D%22100%22%2F%3E%3Ctext%20x%3D%221030%22%20y%3D%22460%22%20font-family%3D%22sans-serif%22%20font-size%3D%2240%22%20fill%3D%22black%22%20stroke%3D%22none%22%3E1%20VIDEO%20%2F%202%20WKS%3C%2Ftext%3E%3C%2Fg%3E%3Cpath%20id%3D%22red-x%22%20d%3D%22M%20600%20550%20L%20680%20630%20M%20680%20550%20L%20600%20630%22%20stroke%3D%22red%22%20stroke-width%3D%2212%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E",
            "durationInFrames": 263,
            "subtitleLimitedTilt": "",
            "audioSrc": "https://adfmmuo6gjjbnu7i.public.blob.vercel-storage.com/generated-audio/storysketch/the-production-bottleneck-1776197379263.mp3"
          }
        }
      ]
    },
    {
      "id": "introducing-storysketch-3",
      "title": "Introducing StorySketch",
      "scriptText": "StorySketch was built for marketers who test fast. Turn any script into a narrated whiteboard ad in one workflow.",
      "selectedVisualOptionId": "minimal-diagram",
      "visualOptions": [
        {
          "id": "minimal-diagram",
          "label": "Minimal",
          "svgDataUrl": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%201280%20720%22%20width%3D%221280%22%20height%3D%22720%22%3E%3Cg%20stroke%3D%22black%22%20stroke-width%3D%226%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20fill%3D%22none%22%3E%3C!--%20Script%20Symbol%20(Left)%20--%3E%3Crect%20x%3D%22200%22%20y%3D%22260%22%20width%3D%22180%22%20height%3D%22240%22%2F%3E%3Cpath%20d%3D%22M%20230%20320%20L%20350%20320%22%2F%3E%3Cpath%20d%3D%22M%20230%20380%20L%20350%20380%22%2F%3E%3Cpath%20d%3D%22M%20230%20440%20L%20300%20440%22%2F%3E%3C!--%20Directional%20Arrow%20(Center)%20--%3E%3Cpath%20d%3D%22M%20480%20380%20L%20750%20380%22%2F%3E%3Cpath%20d%3D%22M%20720%20350%20L%20750%20380%20L%20720%20410%22%2F%3E%3C!--%20Screen%2FAd%20Symbol%20(Right)%20--%3E%3Crect%20x%3D%22850%22%20y%3D%22260%22%20width%3D%22280%22%20height%3D%22200%22%2F%3E%3Cpath%20d%3D%22M%20950%20460%20L%20930%20520%22%2F%3E%3Cpath%20d%3D%22M%201030%20460%20L%201050%20520%22%2F%3E%3Cpath%20d%3D%22M%20900%20520%20L%201080%20520%22%2F%3E%3C!--%20Triangle%20Play%20Symbol%20on%20Screen%20--%3E%3Cpath%20d%3D%22M%20965%20320%20L%201025%20360%20L%20965%20400%20Z%22%2F%3E%3C!--%20Growth%20Arrow%20(Top%20Right)%20--%3E%3Cpath%20d%3D%22M%201050%20240%20L%201120%20170%22%20stroke%3D%22%23000000%22%2F%3E%3Cpath%20d%3D%22M%201080%20170%20L%201120%20170%20L%201120%20210%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E",
          "tracedScene": {
            "id": "introducing-storysketch-3",
            "fps": 30,
            "svg": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%201280%20720%22%20width%3D%221280%22%20height%3D%22720%22%3E%3Cg%20stroke%3D%22black%22%20stroke-width%3D%226%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20fill%3D%22none%22%3E%3C!--%20Script%20Symbol%20(Left)%20--%3E%3Crect%20x%3D%22200%22%20y%3D%22260%22%20width%3D%22180%22%20height%3D%22240%22%2F%3E%3Cpath%20d%3D%22M%20230%20320%20L%20350%20320%22%2F%3E%3Cpath%20d%3D%22M%20230%20380%20L%20350%20380%22%2F%3E%3Cpath%20d%3D%22M%20230%20440%20L%20300%20440%22%2F%3E%3C!--%20Directional%20Arrow%20(Center)%20--%3E%3Cpath%20d%3D%22M%20480%20380%20L%20750%20380%22%2F%3E%3Cpath%20d%3D%22M%20720%20350%20L%20750%20380%20L%20720%20410%22%2F%3E%3C!--%20Screen%2FAd%20Symbol%20(Right)%20--%3E%3Crect%20x%3D%22850%22%20y%3D%22260%22%20width%3D%22280%22%20height%3D%22200%22%2F%3E%3Cpath%20d%3D%22M%20950%20460%20L%20930%20520%22%2F%3E%3Cpath%20d%3D%22M%201030%20460%20L%201050%20520%22%2F%3E%3Cpath%20d%3D%22M%20900%20520%20L%201080%20520%22%2F%3E%3C!--%20Triangle%20Play%20Symbol%20on%20Screen%20--%3E%3Cpath%20d%3D%22M%20965%20320%20L%201025%20360%20L%20965%20400%20Z%22%2F%3E%3C!--%20Growth%20Arrow%20(Top%20Right)%20--%3E%3Cpath%20d%3D%22M%201050%20240%20L%201120%20170%22%20stroke%3D%22%23000000%22%2F%3E%3Cpath%20d%3D%22M%201080%20170%20L%201120%20170%20L%201120%20210%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E",
            "title": "Introducing StorySketch",
            "width": 1280,
            "height": 720,
            "marker": {
              "width": 180,
              "height": 180,
              "tipOffsetX": 136,
              "tipOffsetY": 24,
              "maxTiltDegrees": 15
            },
            "timing": {
              "gapFrames": 0,
              "startFrame": 8,
              "maxDuration": 20,
              "minDuration": 4,
              "endHoldFrames": 45,
              "maxTravelFrames": 6,
              "minTravelFrames": 2,
              "framesPerHundredPx": 5,
              "connectedThresholdPx": 18,
              "travelPixelsPerFrame": 90
            },
            "strokes": [
              {
                "id": "path-1",
                "path": "M 200 260 H 380 V 500 H 200 Z",
                "length": 840,
                "stroke": "black",
                "duration": 20,
                "startFrame": 8,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-2",
                "path": "M 230 320 L 350 320",
                "length": 120,
                "stroke": "black",
                "duration": 6,
                "startFrame": 30,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-3",
                "path": "M 350 380 L 230 380",
                "length": 120,
                "stroke": "black",
                "duration": 6,
                "startFrame": 38,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-4",
                "path": "M 230 440 L 300 440",
                "length": 70,
                "stroke": "black",
                "duration": 4,
                "startFrame": 46,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-5",
                "path": "M 480 380 L 750 380",
                "length": 270,
                "stroke": "black",
                "duration": 14,
                "startFrame": 52,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-6",
                "path": "M 720 350 L 750 380 L 720 410",
                "length": 84.85,
                "stroke": "black",
                "duration": 4,
                "startFrame": 68,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-7",
                "path": "M 850 260 H 1130 V 460 H 850 Z",
                "length": 960,
                "stroke": "black",
                "duration": 20,
                "startFrame": 74,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-8",
                "path": "M 950 460 L 930 520",
                "length": 63.25,
                "stroke": "black",
                "duration": 4,
                "startFrame": 96,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-9",
                "path": "M 1030 460 L 1050 520",
                "length": 63.25,
                "stroke": "black",
                "duration": 4,
                "startFrame": 102,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-10",
                "path": "M 1080 520 L 900 520",
                "length": 180,
                "stroke": "black",
                "duration": 9,
                "startFrame": 108,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-11",
                "path": "M 965 320 L 1025 360 L 965 400 Z",
                "length": 224.22,
                "stroke": "black",
                "duration": 11,
                "startFrame": 119,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-12",
                "path": "M 1050 240 L 1120 170",
                "length": 98.99,
                "stroke": "#000000",
                "duration": 5,
                "startFrame": 132,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-13",
                "path": "M 1080 170 L 1120 170 L 1120 210",
                "length": 80,
                "stroke": "black",
                "duration": 4,
                "startFrame": 139,
                "revealWidth": 6,
                "strokeWidth": 6
              }
            ],
            "handAsset": "marker-hand.webp",
            "background": "#ffffff",
            "renderMode": "stroke",
            "scriptText": "StorySketch was built for marketers who test fast. Turn any script into a narrated whiteboard ad in one workflow.",
            "finalSourceSvg": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%201280%20720%22%20width%3D%221280%22%20height%3D%22720%22%3E%3Cg%20stroke%3D%22black%22%20stroke-width%3D%226%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20fill%3D%22none%22%3E%3C!--%20Script%20Symbol%20(Left)%20--%3E%3Crect%20x%3D%22200%22%20y%3D%22260%22%20width%3D%22180%22%20height%3D%22240%22%2F%3E%3Cpath%20d%3D%22M%20230%20320%20L%20350%20320%22%2F%3E%3Cpath%20d%3D%22M%20230%20380%20L%20350%20380%22%2F%3E%3Cpath%20d%3D%22M%20230%20440%20L%20300%20440%22%2F%3E%3C!--%20Directional%20Arrow%20(Center)%20--%3E%3Cpath%20d%3D%22M%20480%20380%20L%20750%20380%22%2F%3E%3Cpath%20d%3D%22M%20720%20350%20L%20750%20380%20L%20720%20410%22%2F%3E%3C!--%20Screen%2FAd%20Symbol%20(Right)%20--%3E%3Crect%20x%3D%22850%22%20y%3D%22260%22%20width%3D%22280%22%20height%3D%22200%22%2F%3E%3Cpath%20d%3D%22M%20950%20460%20L%20930%20520%22%2F%3E%3Cpath%20d%3D%22M%201030%20460%20L%201050%20520%22%2F%3E%3Cpath%20d%3D%22M%20900%20520%20L%201080%20520%22%2F%3E%3C!--%20Triangle%20Play%20Symbol%20on%20Screen%20--%3E%3Cpath%20d%3D%22M%20965%20320%20L%201025%20360%20L%20965%20400%20Z%22%2F%3E%3C!--%20Growth%20Arrow%20(Top%20Right)%20--%3E%3Cpath%20d%3D%22M%201050%20240%20L%201120%20170%22%20stroke%3D%22%23000000%22%2F%3E%3Cpath%20d%3D%22M%201080%20170%20L%201120%20170%20L%201120%20210%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E",
            "durationInFrames": 188,
            "subtitleLimitedTilt": "",
            "audioSrc": "https://adfmmuo6gjjbnu7i.public.blob.vercel-storage.com/generated-audio/storysketch/introducing-storysketch-1776197380859.mp3"
          }
        },
        {
          "id": "story-moment",
          "label": "Story",
          "svgDataUrl": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%201280%20720%22%20width%3D%221280%22%20height%3D%22720%22%3E%3Cg%20stroke%3D%22black%22%20stroke-width%3D%226%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20fill%3D%22none%22%3E%3Cg%20id%3D%22marketer-stick-figure%22%3E%3Ccircle%20cx%3D%22300%22%20cy%3D%22300%22%20r%3D%2240%22%2F%3E%3Cpath%20d%3D%22M%20300%20340%20L%20300%20520%22%2F%3E%3Cpath%20d%3D%22M%20300%20380%20L%20220%20450%22%2F%3E%3Cpath%20d%3D%22M%20300%20380%20L%20380%20430%22%2F%3E%3Cpath%20d%3D%22M%20300%20520%20L%20240%20650%22%2F%3E%3Cpath%20d%3D%22M%20300%20520%20L%20360%20650%22%2F%3E%3C%2Fg%3E%3Cg%20id%3D%22script-document%22%3E%3Crect%20x%3D%22550%22%20y%3D%22250%22%20width%3D%22120%22%20height%3D%22160%22%2F%3E%3Cpath%20d%3D%22M%20570%20290%20L%20650%20290%22%2F%3E%3Cpath%20d%3D%22M%20570%20330%20L%20650%20330%22%2F%3E%3Cpath%20d%3D%22M%20570%20370%20L%20620%20370%22%2F%3E%3C%2Fg%3E%3Cpath%20id%3D%22arrow-flow%22%20d%3D%22M%20720%20330%20L%20820%20330%20L%20800%20310%20M%20820%20330%20L%20800%20350%22%20stroke-width%3D%228%22%2F%3E%3Cg%20id%3D%22video-screen%22%3E%3Crect%20x%3D%22880%22%20y%3D%22230%22%20width%3D%22280%22%20height%3D%22200%22%2F%3E%3Cpolygon%20points%3D%221000%2C290%201000%2C370%201060%2C330%22%20fill%3D%22black%22%2F%3E%3Cpath%20d%3D%22M%20880%20430%20L%20880%20460%20L%201160%20460%20L%201160%20430%22%2F%3E%3Cpath%20d%3D%22M%201020%20460%20L%201020%20500%22%2F%3E%3Cpath%20d%3D%22M%20960%20500%20L%201080%20500%22%2F%3E%3C%2Fg%3E%3Cg%20id%3D%22speed-lines%22%3E%3Cpath%20d%3D%22M%20100%20200%20L%20160%20200%22%2F%3E%3Cpath%20d%3D%22M%20120%20230%20L%20180%20230%22%2F%3E%3Cpath%20d%3D%22M%20110%20260%20L%20150%20260%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E",
          "tracedScene": {
            "id": "introducing-storysketch-3",
            "fps": 30,
            "svg": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%201280%20720%22%20width%3D%221280%22%20height%3D%22720%22%3E%3Cg%20stroke%3D%22black%22%20stroke-width%3D%226%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20fill%3D%22none%22%3E%3Cg%20id%3D%22marketer-stick-figure%22%3E%3Ccircle%20cx%3D%22300%22%20cy%3D%22300%22%20r%3D%2240%22%2F%3E%3Cpath%20d%3D%22M%20300%20340%20L%20300%20520%22%2F%3E%3Cpath%20d%3D%22M%20300%20380%20L%20220%20450%22%2F%3E%3Cpath%20d%3D%22M%20300%20380%20L%20380%20430%22%2F%3E%3Cpath%20d%3D%22M%20300%20520%20L%20240%20650%22%2F%3E%3Cpath%20d%3D%22M%20300%20520%20L%20360%20650%22%2F%3E%3C%2Fg%3E%3Cg%20id%3D%22script-document%22%3E%3Crect%20x%3D%22550%22%20y%3D%22250%22%20width%3D%22120%22%20height%3D%22160%22%2F%3E%3Cpath%20d%3D%22M%20570%20290%20L%20650%20290%22%2F%3E%3Cpath%20d%3D%22M%20570%20330%20L%20650%20330%22%2F%3E%3Cpath%20d%3D%22M%20570%20370%20L%20620%20370%22%2F%3E%3C%2Fg%3E%3Cpath%20id%3D%22arrow-flow%22%20d%3D%22M%20720%20330%20L%20820%20330%20L%20800%20310%20M%20820%20330%20L%20800%20350%22%20stroke-width%3D%228%22%2F%3E%3Cg%20id%3D%22video-screen%22%3E%3Crect%20x%3D%22880%22%20y%3D%22230%22%20width%3D%22280%22%20height%3D%22200%22%2F%3E%3Cpolygon%20points%3D%221000%2C290%201000%2C370%201060%2C330%22%20fill%3D%22black%22%2F%3E%3Cpath%20d%3D%22M%20880%20430%20L%20880%20460%20L%201160%20460%20L%201160%20430%22%2F%3E%3Cpath%20d%3D%22M%201020%20460%20L%201020%20500%22%2F%3E%3Cpath%20d%3D%22M%20960%20500%20L%201080%20500%22%2F%3E%3C%2Fg%3E%3Cg%20id%3D%22speed-lines%22%3E%3Cpath%20d%3D%22M%20100%20200%20L%20160%20200%22%2F%3E%3Cpath%20d%3D%22M%20120%20230%20L%20180%20230%22%2F%3E%3Cpath%20d%3D%22M%20110%20260%20L%20150%20260%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E",
            "title": "Introducing StorySketch",
            "width": 1280,
            "height": 720,
            "marker": {
              "width": 180,
              "height": 180,
              "tipOffsetX": 136,
              "tipOffsetY": 24,
              "maxTiltDegrees": 15
            },
            "timing": {
              "gapFrames": 0,
              "startFrame": 8,
              "maxDuration": 20,
              "minDuration": 4,
              "endHoldFrames": 45,
              "maxTravelFrames": 6,
              "minTravelFrames": 2,
              "framesPerHundredPx": 5,
              "connectedThresholdPx": 18,
              "travelPixelsPerFrame": 90
            },
            "strokes": [
              {
                "id": "path-1",
                "path": "M 340 300 A 40 40 0 1 0 260 300 A 40 40 0 1 0 340 300 Z",
                "length": 251.33,
                "stroke": "black",
                "duration": 13,
                "startFrame": 8,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-2",
                "path": "M 300 340 L 300 520",
                "length": 180,
                "stroke": "black",
                "duration": 9,
                "startFrame": 23,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-3",
                "path": "M 220 450 L 300 380",
                "length": 106.3,
                "stroke": "black",
                "duration": 5,
                "startFrame": 34,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-4",
                "path": "M 300 380 L 380 430",
                "length": 94.34,
                "stroke": "black",
                "duration": 5,
                "startFrame": 39,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-5",
                "path": "M 300 520 L 240 650",
                "length": 143.18,
                "stroke": "black",
                "duration": 7,
                "startFrame": 46,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-6",
                "path": "M 360 650 L 300 520",
                "length": 143.18,
                "stroke": "black",
                "duration": 7,
                "startFrame": 55,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-7",
                "path": "M 550 250 H 670 V 410 H 550 Z",
                "length": 560,
                "stroke": "black",
                "duration": 20,
                "startFrame": 66,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-8",
                "path": "M 570 290 L 650 290",
                "length": 80,
                "stroke": "black",
                "duration": 4,
                "startFrame": 88,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-9",
                "path": "M 650 330 L 570 330",
                "length": 80,
                "stroke": "black",
                "duration": 4,
                "startFrame": 94,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-10",
                "path": "M 570 370 L 620 370",
                "length": 50,
                "stroke": "black",
                "duration": 4,
                "startFrame": 100,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "arrow-flow",
                "path": "M 720 330 L 820 330 L 800 310 M 820 330 L 800 350",
                "length": 156.57,
                "stroke": "black",
                "duration": 8,
                "startFrame": 106,
                "revealWidth": 8,
                "strokeWidth": 8
              },
              {
                "id": "path-12",
                "path": "M 880 230 H 1160 V 430 H 880 Z",
                "length": 960,
                "stroke": "black",
                "duration": 20,
                "startFrame": 116,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-13",
                "path": "M 1000 290 L 1000 370 L 1060 330 Z",
                "length": 224.22,
                "stroke": "black",
                "duration": 11,
                "startFrame": 138,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-14",
                "path": "M 880 430 L 880 460 L 1160 460 L 1160 430",
                "length": 340,
                "stroke": "black",
                "duration": 17,
                "startFrame": 151,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-15",
                "path": "M 1020 460 L 1020 500",
                "length": 40,
                "stroke": "black",
                "duration": 4,
                "startFrame": 170,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-16",
                "path": "M 960 500 L 1080 500",
                "length": 120,
                "stroke": "black",
                "duration": 6,
                "startFrame": 176,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-17",
                "path": "M 160 200 L 100 200",
                "length": 60,
                "stroke": "black",
                "duration": 4,
                "startFrame": 188,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-18",
                "path": "M 120 230 L 180 230",
                "length": 60,
                "stroke": "black",
                "duration": 4,
                "startFrame": 194,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-19",
                "path": "M 150 260 L 110 260",
                "length": 40,
                "stroke": "black",
                "duration": 4,
                "startFrame": 200,
                "revealWidth": 6,
                "strokeWidth": 6
              }
            ],
            "handAsset": "marker-hand.webp",
            "background": "#ffffff",
            "renderMode": "stroke",
            "scriptText": "StorySketch was built for marketers who test fast. Turn any script into a narrated whiteboard ad in one workflow.",
            "finalSourceSvg": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%201280%20720%22%20width%3D%221280%22%20height%3D%22720%22%3E%3Cg%20stroke%3D%22black%22%20stroke-width%3D%226%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20fill%3D%22none%22%3E%3Cg%20id%3D%22marketer-stick-figure%22%3E%3Ccircle%20cx%3D%22300%22%20cy%3D%22300%22%20r%3D%2240%22%2F%3E%3Cpath%20d%3D%22M%20300%20340%20L%20300%20520%22%2F%3E%3Cpath%20d%3D%22M%20300%20380%20L%20220%20450%22%2F%3E%3Cpath%20d%3D%22M%20300%20380%20L%20380%20430%22%2F%3E%3Cpath%20d%3D%22M%20300%20520%20L%20240%20650%22%2F%3E%3Cpath%20d%3D%22M%20300%20520%20L%20360%20650%22%2F%3E%3C%2Fg%3E%3Cg%20id%3D%22script-document%22%3E%3Crect%20x%3D%22550%22%20y%3D%22250%22%20width%3D%22120%22%20height%3D%22160%22%2F%3E%3Cpath%20d%3D%22M%20570%20290%20L%20650%20290%22%2F%3E%3Cpath%20d%3D%22M%20570%20330%20L%20650%20330%22%2F%3E%3Cpath%20d%3D%22M%20570%20370%20L%20620%20370%22%2F%3E%3C%2Fg%3E%3Cpath%20id%3D%22arrow-flow%22%20d%3D%22M%20720%20330%20L%20820%20330%20L%20800%20310%20M%20820%20330%20L%20800%20350%22%20stroke-width%3D%228%22%2F%3E%3Cg%20id%3D%22video-screen%22%3E%3Crect%20x%3D%22880%22%20y%3D%22230%22%20width%3D%22280%22%20height%3D%22200%22%2F%3E%3Cpolygon%20points%3D%221000%2C290%201000%2C370%201060%2C330%22%20fill%3D%22black%22%2F%3E%3Cpath%20d%3D%22M%20880%20430%20L%20880%20460%20L%201160%20460%20L%201160%20430%22%2F%3E%3Cpath%20d%3D%22M%201020%20460%20L%201020%20500%22%2F%3E%3Cpath%20d%3D%22M%20960%20500%20L%201080%20500%22%2F%3E%3C%2Fg%3E%3Cg%20id%3D%22speed-lines%22%3E%3Cpath%20d%3D%22M%20100%20200%20L%20160%20200%22%2F%3E%3Cpath%20d%3D%22M%20120%20230%20L%20180%20230%22%2F%3E%3Cpath%20d%3D%22M%20110%20260%20L%20150%20260%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E",
            "durationInFrames": 249,
            "subtitleLimitedTilt": "",
            "audioSrc": "https://adfmmuo6gjjbnu7i.public.blob.vercel-storage.com/generated-audio/storysketch/introducing-storysketch-1776197380859.mp3"
          }
        },
        {
          "id": "process-sketch",
          "label": "Process",
          "svgDataUrl": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%201280%20720%22%20width%3D%221280%22%20height%3D%22720%22%3E%3Cg%20stroke%3D%22black%22%20stroke-width%3D%228%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20fill%3D%22none%22%3E%3C!--%20Script%20Icon%20(Input)%20--%3E%3Crect%20x%3D%22150%22%20y%3D%22260%22%20width%3D%22180%22%20height%3D%22240%22%20%2F%3E%3Cpath%20d%3D%22M%20180%20320%20L%20300%20320%22%20%2F%3E%3Cpath%20d%3D%22M%20180%20370%20L%20300%20370%22%20%2F%3E%3Cpath%20d%3D%22M%20180%20420%20L%20250%20420%22%20%2F%3E%3C!--%20Large%20Arrow%20(Process)%20--%3E%3Cpath%20d%3D%22M%20400%20380%20L%20580%20380%22%20%2F%3E%3Cpath%20d%3D%22M%20540%20340%20L%20580%20380%20L%20540%20420%22%20%2F%3E%3C!--%20StorySketch%20Video%20Screen%20(Output)%20--%3E%3Crect%20x%3D%22650%22%20y%3D%22200%22%20width%3D%22450%22%20height%3D%22300%22%20%2F%3E%3Cpath%20d%3D%22M%20830%20310%20L%20920%20350%20L%20830%20390%20Z%22%20%2F%3E%3C!--%20Lightning%20Bolt%20(Speed%2FFast%20Testing)%20--%3E%3Cpath%20d%3D%22M%201100%20150%20L%201050%20250%20L%201120%20250%20L%201040%20400%22%20stroke%3D%22%23FFD700%22%20%2F%3E%3C!--%20Growth%20Chart%20Solution%20--%3E%3Cpath%20d%3D%22M%20700%20620%20L%201000%20620%22%20%2F%3E%3Cpath%20d%3D%22M%20720%20580%20L%20800%20500%20L%20880%20540%20L%20980%20440%22%20stroke-width%3D%2210%22%20%2F%3E%3Cpath%20d%3D%22M%20940%20440%20L%20980%20440%20L%20980%20480%22%20stroke-width%3D%2210%22%20%2F%3E%3C!--%20Labels%20--%3E%3Cpath%20d%3D%22M%20200%20540%20L%20210%20540%20L%20210%20560%20L%20220%20560%20L%20220%20540%20L%20230%20540%22%20%2F%3E%3Cpath%20d%3D%22M%20240%20540%20L%20250%20540%20M%20245%20540%20L%20245%20560%22%20%2F%3E%3Cpath%20d%3D%22M%20260%20540%20L%20270%20540%20L%20270%20560%20L%20260%20560%20L%20260%20550%20L%20270%20550%22%20%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E",
          "tracedScene": {
            "id": "introducing-storysketch-3",
            "fps": 30,
            "svg": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%201280%20720%22%20width%3D%221280%22%20height%3D%22720%22%3E%3Cg%20stroke%3D%22black%22%20stroke-width%3D%228%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20fill%3D%22none%22%3E%3C!--%20Script%20Icon%20(Input)%20--%3E%3Crect%20x%3D%22150%22%20y%3D%22260%22%20width%3D%22180%22%20height%3D%22240%22%20%2F%3E%3Cpath%20d%3D%22M%20180%20320%20L%20300%20320%22%20%2F%3E%3Cpath%20d%3D%22M%20180%20370%20L%20300%20370%22%20%2F%3E%3Cpath%20d%3D%22M%20180%20420%20L%20250%20420%22%20%2F%3E%3C!--%20Large%20Arrow%20(Process)%20--%3E%3Cpath%20d%3D%22M%20400%20380%20L%20580%20380%22%20%2F%3E%3Cpath%20d%3D%22M%20540%20340%20L%20580%20380%20L%20540%20420%22%20%2F%3E%3C!--%20StorySketch%20Video%20Screen%20(Output)%20--%3E%3Crect%20x%3D%22650%22%20y%3D%22200%22%20width%3D%22450%22%20height%3D%22300%22%20%2F%3E%3Cpath%20d%3D%22M%20830%20310%20L%20920%20350%20L%20830%20390%20Z%22%20%2F%3E%3C!--%20Lightning%20Bolt%20(Speed%2FFast%20Testing)%20--%3E%3Cpath%20d%3D%22M%201100%20150%20L%201050%20250%20L%201120%20250%20L%201040%20400%22%20stroke%3D%22%23FFD700%22%20%2F%3E%3C!--%20Growth%20Chart%20Solution%20--%3E%3Cpath%20d%3D%22M%20700%20620%20L%201000%20620%22%20%2F%3E%3Cpath%20d%3D%22M%20720%20580%20L%20800%20500%20L%20880%20540%20L%20980%20440%22%20stroke-width%3D%2210%22%20%2F%3E%3Cpath%20d%3D%22M%20940%20440%20L%20980%20440%20L%20980%20480%22%20stroke-width%3D%2210%22%20%2F%3E%3C!--%20Labels%20--%3E%3Cpath%20d%3D%22M%20200%20540%20L%20210%20540%20L%20210%20560%20L%20220%20560%20L%20220%20540%20L%20230%20540%22%20%2F%3E%3Cpath%20d%3D%22M%20240%20540%20L%20250%20540%20M%20245%20540%20L%20245%20560%22%20%2F%3E%3Cpath%20d%3D%22M%20260%20540%20L%20270%20540%20L%20270%20560%20L%20260%20560%20L%20260%20550%20L%20270%20550%22%20%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E",
            "title": "Introducing StorySketch",
            "width": 1280,
            "height": 720,
            "marker": {
              "width": 180,
              "height": 180,
              "tipOffsetX": 136,
              "tipOffsetY": 24,
              "maxTiltDegrees": 15
            },
            "timing": {
              "gapFrames": 0,
              "startFrame": 8,
              "maxDuration": 20,
              "minDuration": 4,
              "endHoldFrames": 45,
              "maxTravelFrames": 6,
              "minTravelFrames": 2,
              "framesPerHundredPx": 5,
              "connectedThresholdPx": 18,
              "travelPixelsPerFrame": 90
            },
            "strokes": [
              {
                "id": "path-1",
                "path": "M 150 260 H 330 V 500 H 150 Z",
                "length": 840,
                "stroke": "black",
                "duration": 20,
                "startFrame": 8,
                "revealWidth": 8,
                "strokeWidth": 8
              },
              {
                "id": "path-2",
                "path": "M 180 320 L 300 320",
                "length": 120,
                "stroke": "black",
                "duration": 6,
                "startFrame": 30,
                "revealWidth": 8,
                "strokeWidth": 8
              },
              {
                "id": "path-3",
                "path": "M 300 370 L 180 370",
                "length": 120,
                "stroke": "black",
                "duration": 6,
                "startFrame": 38,
                "revealWidth": 8,
                "strokeWidth": 8
              },
              {
                "id": "path-4",
                "path": "M 180 420 L 250 420",
                "length": 70,
                "stroke": "black",
                "duration": 4,
                "startFrame": 46,
                "revealWidth": 8,
                "strokeWidth": 8
              },
              {
                "id": "path-5",
                "path": "M 400 380 L 580 380",
                "length": 180,
                "stroke": "black",
                "duration": 9,
                "startFrame": 52,
                "revealWidth": 8,
                "strokeWidth": 8
              },
              {
                "id": "path-6",
                "path": "M 540 340 L 580 380 L 540 420",
                "length": 113.14,
                "stroke": "black",
                "duration": 6,
                "startFrame": 63,
                "revealWidth": 8,
                "strokeWidth": 8
              },
              {
                "id": "path-7",
                "path": "M 650 200 H 1100 V 500 H 650 Z",
                "length": 1500,
                "stroke": "black",
                "duration": 20,
                "startFrame": 72,
                "revealWidth": 8,
                "strokeWidth": 8
              },
              {
                "id": "path-8",
                "path": "M 830 310 L 920 350 L 830 390 Z",
                "length": 276.98,
                "stroke": "black",
                "duration": 14,
                "startFrame": 94,
                "revealWidth": 8,
                "strokeWidth": 8
              },
              {
                "id": "path-9",
                "path": "M 1040 400 L 1120 250 L 1050 250 L 1100 150",
                "length": 351.8,
                "stroke": "#FFD700",
                "duration": 18,
                "startFrame": 111,
                "revealWidth": 8,
                "strokeWidth": 8
              },
              {
                "id": "path-10",
                "path": "M 1000 620 L 700 620",
                "length": 300,
                "stroke": "black",
                "duration": 15,
                "startFrame": 134,
                "revealWidth": 8,
                "strokeWidth": 8
              },
              {
                "id": "path-11",
                "path": "M 720 580 L 800 500 L 880 540 L 980 440",
                "length": 344,
                "stroke": "black",
                "duration": 17,
                "startFrame": 151,
                "revealWidth": 10,
                "strokeWidth": 10
              },
              {
                "id": "path-12",
                "path": "M 940 440 L 980 440 L 980 480",
                "length": 80,
                "stroke": "black",
                "duration": 4,
                "startFrame": 170,
                "revealWidth": 10,
                "strokeWidth": 10
              },
              {
                "id": "path-13",
                "path": "M 230 540 L 220 540 L 220 560 L 210 560 L 210 540 L 200 540",
                "length": 70,
                "stroke": "black",
                "duration": 4,
                "startFrame": 180,
                "revealWidth": 8,
                "strokeWidth": 8
              },
              {
                "id": "path-14",
                "path": "M 240 540 L 250 540 M 245 540 L 245 560",
                "length": 30,
                "stroke": "black",
                "duration": 4,
                "startFrame": 186,
                "revealWidth": 8,
                "strokeWidth": 8
              },
              {
                "id": "path-15",
                "path": "M 260 540 L 270 540 L 270 560 L 260 560 L 260 550 L 270 550",
                "length": 60,
                "stroke": "black",
                "duration": 4,
                "startFrame": 192,
                "revealWidth": 8,
                "strokeWidth": 8
              }
            ],
            "handAsset": "marker-hand.webp",
            "background": "#ffffff",
            "renderMode": "stroke",
            "scriptText": "StorySketch was built for marketers who test fast. Turn any script into a narrated whiteboard ad in one workflow.",
            "finalSourceSvg": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%201280%20720%22%20width%3D%221280%22%20height%3D%22720%22%3E%3Cg%20stroke%3D%22black%22%20stroke-width%3D%228%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20fill%3D%22none%22%3E%3C!--%20Script%20Icon%20(Input)%20--%3E%3Crect%20x%3D%22150%22%20y%3D%22260%22%20width%3D%22180%22%20height%3D%22240%22%20%2F%3E%3Cpath%20d%3D%22M%20180%20320%20L%20300%20320%22%20%2F%3E%3Cpath%20d%3D%22M%20180%20370%20L%20300%20370%22%20%2F%3E%3Cpath%20d%3D%22M%20180%20420%20L%20250%20420%22%20%2F%3E%3C!--%20Large%20Arrow%20(Process)%20--%3E%3Cpath%20d%3D%22M%20400%20380%20L%20580%20380%22%20%2F%3E%3Cpath%20d%3D%22M%20540%20340%20L%20580%20380%20L%20540%20420%22%20%2F%3E%3C!--%20StorySketch%20Video%20Screen%20(Output)%20--%3E%3Crect%20x%3D%22650%22%20y%3D%22200%22%20width%3D%22450%22%20height%3D%22300%22%20%2F%3E%3Cpath%20d%3D%22M%20830%20310%20L%20920%20350%20L%20830%20390%20Z%22%20%2F%3E%3C!--%20Lightning%20Bolt%20(Speed%2FFast%20Testing)%20--%3E%3Cpath%20d%3D%22M%201100%20150%20L%201050%20250%20L%201120%20250%20L%201040%20400%22%20stroke%3D%22%23FFD700%22%20%2F%3E%3C!--%20Growth%20Chart%20Solution%20--%3E%3Cpath%20d%3D%22M%20700%20620%20L%201000%20620%22%20%2F%3E%3Cpath%20d%3D%22M%20720%20580%20L%20800%20500%20L%20880%20540%20L%20980%20440%22%20stroke-width%3D%2210%22%20%2F%3E%3Cpath%20d%3D%22M%20940%20440%20L%20980%20440%20L%20980%20480%22%20stroke-width%3D%2210%22%20%2F%3E%3C!--%20Labels%20--%3E%3Cpath%20d%3D%22M%20200%20540%20L%20210%20540%20L%20210%20560%20L%20220%20560%20L%20220%20540%20L%20230%20540%22%20%2F%3E%3Cpath%20d%3D%22M%20240%20540%20L%20250%20540%20M%20245%20540%20L%20245%20560%22%20%2F%3E%3Cpath%20d%3D%22M%20260%20540%20L%20270%20540%20L%20270%20560%20L%20260%20560%20L%20260%20550%20L%20270%20550%22%20%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E",
            "durationInFrames": 241,
            "subtitleLimitedTilt": "",
            "audioSrc": "https://adfmmuo6gjjbnu7i.public.blob.vercel-storage.com/generated-audio/storysketch/introducing-storysketch-1776197380859.mp3"
          }
        }
      ]
    },
    {
      "id": "eliminating-friction-4",
      "title": "Eliminating Friction",
      "scriptText": "No handoffs between writers, editors, and voice tools. No timeline software. No waiting.",
      "selectedVisualOptionId": "minimal-diagram",
      "visualOptions": [
        {
          "id": "minimal-diagram",
          "label": "Minimal",
          "svgDataUrl": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%201280%20720%22%20width%3D%221280%22%20height%3D%22720%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22none%22%2F%3E%3Cg%20stroke%3D%22black%22%20stroke-width%3D%224%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20fill%3D%22none%22%3E%3Cpath%20d%3D%22M%20300%20360%20L%20980%20360%22%2F%3E%3Cpath%20d%3D%22M%20950%20340%20L%20980%20360%20L%20950%20380%22%2F%3E%3Cg%20id%3D%22start-point%22%3E%3Ccircle%20cx%3D%22300%22%20cy%3D%22360%22%20r%3D%2240%22%2F%3E%3Cpath%20d%3D%22M%20290%20350%20L%20310%20370%22%2F%3E%3Cpath%20d%3D%22M%20310%20350%20L%20290%20370%22%2F%3E%3C%2Fg%3E%3Cg%20id%3D%22end-point%22%3E%3Ccircle%20cx%3D%22980%22%20cy%3D%22360%22%20r%3D%2240%22%2F%3E%3Cpath%20d%3D%22M%20970%20365%20L%20978%20372%20L%20992%20355%22%20stroke%3D%22green%22%2F%3E%3C%2Fg%3E%3Cg%20id%3D%22friction-removed%22%20stroke-width%3D%228%22%20stroke%3D%22red%22%3E%3Cpath%20d%3D%22M%20540%20280%20L%20740%20440%22%2F%3E%3Cpath%20d%3D%22M%20740%20280%20L%20540%20440%22%2F%3E%3C%2Fg%3E%3Cg%20id%3D%22lightning-bolt%22%20stroke%3D%22orange%22%3E%3Cpath%20d%3D%22M%20640%20250%20L%20620%20310%20L%20660%20310%20L%20640%20370%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E",
          "tracedScene": {
            "id": "eliminating-friction-4",
            "fps": 30,
            "svg": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%201280%20720%22%20width%3D%221280%22%20height%3D%22720%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22none%22%2F%3E%3Cg%20stroke%3D%22black%22%20stroke-width%3D%224%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20fill%3D%22none%22%3E%3Cpath%20d%3D%22M%20300%20360%20L%20980%20360%22%2F%3E%3Cpath%20d%3D%22M%20950%20340%20L%20980%20360%20L%20950%20380%22%2F%3E%3Cg%20id%3D%22start-point%22%3E%3Ccircle%20cx%3D%22300%22%20cy%3D%22360%22%20r%3D%2240%22%2F%3E%3Cpath%20d%3D%22M%20290%20350%20L%20310%20370%22%2F%3E%3Cpath%20d%3D%22M%20310%20350%20L%20290%20370%22%2F%3E%3C%2Fg%3E%3Cg%20id%3D%22end-point%22%3E%3Ccircle%20cx%3D%22980%22%20cy%3D%22360%22%20r%3D%2240%22%2F%3E%3Cpath%20d%3D%22M%20970%20365%20L%20978%20372%20L%20992%20355%22%20stroke%3D%22green%22%2F%3E%3C%2Fg%3E%3Cg%20id%3D%22friction-removed%22%20stroke-width%3D%228%22%20stroke%3D%22red%22%3E%3Cpath%20d%3D%22M%20540%20280%20L%20740%20440%22%2F%3E%3Cpath%20d%3D%22M%20740%20280%20L%20540%20440%22%2F%3E%3C%2Fg%3E%3Cg%20id%3D%22lightning-bolt%22%20stroke%3D%22orange%22%3E%3Cpath%20d%3D%22M%20640%20250%20L%20620%20310%20L%20660%20310%20L%20640%20370%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E",
            "title": "Eliminating Friction",
            "width": 1280,
            "height": 720,
            "marker": {
              "width": 180,
              "height": 180,
              "tipOffsetX": 136,
              "tipOffsetY": 24,
              "maxTiltDegrees": 15
            },
            "timing": {
              "gapFrames": 0,
              "startFrame": 8,
              "maxDuration": 20,
              "minDuration": 4,
              "endHoldFrames": 45,
              "maxTravelFrames": 6,
              "minTravelFrames": 2,
              "framesPerHundredPx": 5,
              "connectedThresholdPx": 18,
              "travelPixelsPerFrame": 90
            },
            "strokes": [
              {
                "id": "path-2",
                "path": "M 300 360 L 980 360",
                "length": 680,
                "stroke": "black",
                "duration": 20,
                "startFrame": 8,
                "revealWidth": 4,
                "strokeWidth": 4
              },
              {
                "id": "path-3",
                "path": "M 950 340 L 980 360 L 950 380",
                "length": 72.11,
                "stroke": "black",
                "duration": 4,
                "startFrame": 30,
                "revealWidth": 4,
                "strokeWidth": 4
              },
              {
                "id": "path-4",
                "path": "M 340 360 A 40 40 0 1 0 260 360 A 40 40 0 1 0 340 360 Z",
                "length": 251.33,
                "stroke": "black",
                "duration": 13,
                "startFrame": 40,
                "revealWidth": 4,
                "strokeWidth": 4
              },
              {
                "id": "path-5",
                "path": "M 310 370 L 290 350",
                "length": 28.28,
                "stroke": "black",
                "duration": 4,
                "startFrame": 55,
                "revealWidth": 4,
                "strokeWidth": 4
              },
              {
                "id": "path-6",
                "path": "M 310 350 L 290 370",
                "length": 28.28,
                "stroke": "black",
                "duration": 4,
                "startFrame": 61,
                "revealWidth": 4,
                "strokeWidth": 4
              },
              {
                "id": "path-7",
                "path": "M 1020 360 A 40 40 0 1 0 940 360 A 40 40 0 1 0 1020 360 Z",
                "length": 251.33,
                "stroke": "black",
                "duration": 13,
                "startFrame": 71,
                "revealWidth": 4,
                "strokeWidth": 4
              },
              {
                "id": "path-8",
                "path": "M 992 355 L 978 372 L 970 365",
                "length": 32.65,
                "stroke": "green",
                "duration": 4,
                "startFrame": 86,
                "revealWidth": 4,
                "strokeWidth": 4
              },
              {
                "id": "path-9",
                "path": "M 740 440 L 540 280",
                "length": 256.12,
                "stroke": "red",
                "duration": 13,
                "startFrame": 93,
                "revealWidth": 8,
                "strokeWidth": 8
              },
              {
                "id": "path-10",
                "path": "M 540 440 L 740 280",
                "length": 256.12,
                "stroke": "red",
                "duration": 13,
                "startFrame": 108,
                "revealWidth": 8,
                "strokeWidth": 8
              },
              {
                "id": "path-11",
                "path": "M 640 250 L 620 310 L 660 310 L 640 370",
                "length": 166.49,
                "stroke": "orange",
                "duration": 8,
                "startFrame": 123,
                "revealWidth": 4,
                "strokeWidth": 4
              }
            ],
            "handAsset": "marker-hand.webp",
            "background": "#ffffff",
            "renderMode": "stroke",
            "scriptText": "No handoffs between writers, editors, and voice tools. No timeline software. No waiting.",
            "finalSourceSvg": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%201280%20720%22%20width%3D%221280%22%20height%3D%22720%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22none%22%2F%3E%3Cg%20stroke%3D%22black%22%20stroke-width%3D%224%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20fill%3D%22none%22%3E%3Cpath%20d%3D%22M%20300%20360%20L%20980%20360%22%2F%3E%3Cpath%20d%3D%22M%20950%20340%20L%20980%20360%20L%20950%20380%22%2F%3E%3Cg%20id%3D%22start-point%22%3E%3Ccircle%20cx%3D%22300%22%20cy%3D%22360%22%20r%3D%2240%22%2F%3E%3Cpath%20d%3D%22M%20290%20350%20L%20310%20370%22%2F%3E%3Cpath%20d%3D%22M%20310%20350%20L%20290%20370%22%2F%3E%3C%2Fg%3E%3Cg%20id%3D%22end-point%22%3E%3Ccircle%20cx%3D%22980%22%20cy%3D%22360%22%20r%3D%2240%22%2F%3E%3Cpath%20d%3D%22M%20970%20365%20L%20978%20372%20L%20992%20355%22%20stroke%3D%22green%22%2F%3E%3C%2Fg%3E%3Cg%20id%3D%22friction-removed%22%20stroke-width%3D%228%22%20stroke%3D%22red%22%3E%3Cpath%20d%3D%22M%20540%20280%20L%20740%20440%22%2F%3E%3Cpath%20d%3D%22M%20740%20280%20L%20540%20440%22%2F%3E%3C%2Fg%3E%3Cg%20id%3D%22lightning-bolt%22%20stroke%3D%22orange%22%3E%3Cpath%20d%3D%22M%20640%20250%20L%20620%20310%20L%20660%20310%20L%20640%20370%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E",
            "durationInFrames": 176,
            "subtitleLimitedTilt": "",
            "audioSrc": "https://adfmmuo6gjjbnu7i.public.blob.vercel-storage.com/generated-audio/storysketch/eliminating-friction-1776197382290.mp3"
          }
        },
        {
          "id": "story-moment",
          "label": "Story",
          "svgDataUrl": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%201280%20720%22%20width%3D%221280%22%20height%3D%22720%22%3E%3Cg%20stroke%3D%22black%22%20stroke-width%3D%226%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20fill%3D%22none%22%3E%3Ccircle%20cx%3D%22640%22%20cy%3D%22280%22%20r%3D%2240%22%2F%3E%3Cpath%20d%3D%22M%20640%20320%20L%20640%20500%22%2F%3E%3Cpath%20d%3D%22M%20640%20360%20L%20560%20440%22%2F%3E%3Cpath%20d%3D%22M%20640%20360%20L%20720%20440%22%2F%3E%3Cpath%20d%3D%22M%20640%20500%20L%20580%20620%22%2F%3E%3Cpath%20d%3D%22M%20640%20500%20L%20700%20620%22%2F%3E%3Crect%20x%3D%22200%22%20y%3D%22150%22%20width%3D%22280%22%20height%3D%22180%22%20rx%3D%2210%22%2F%3E%3Cpath%20d%3D%22M%20230%20200%20L%20450%20200%20M%20230%20240%20L%20450%20240%20M%20230%20280%20L%20350%20280%22%2F%3E%3Crect%20x%3D%22800%22%20y%3D%22150%22%20width%3D%22280%22%20height%3D%22180%22%20rx%3D%2210%22%2F%3E%3Cpath%20d%3D%22M%20850%20240%20L%201030%20240%20M%20940%20190%20L%20940%20290%22%2F%3E%3Cpath%20d%3D%22M%20480%20240%20L%20580%20240%22%2F%3E%3Cpath%20d%3D%22M%20700%20240%20L%20800%20240%22%2F%3E%3Cpath%20d%3D%22M%20440%20200%20L%20840%20200%20Q%20640%20100%20440%20200%22%20stroke-dasharray%3D%2210%2C10%22%2F%3E%3Cpath%20d%3D%22M%20510%20500%20L%20770%20500%22%20stroke-width%3D%2212%22%20stroke%3D%22red%22%2F%3E%3Cpath%20d%3D%22M%20540%20470%20L%20600%20530%20M%20600%20470%20L%20540%20530%22%20stroke%3D%22red%22%20stroke-width%3D%228%22%2F%3E%3Cpath%20d%3D%22M%20710%20530%20L%20740%20560%20L%20800%20480%22%20stroke%3D%22%23228B22%22%20stroke-width%3D%2210%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E",
          "tracedScene": {
            "id": "eliminating-friction-4",
            "fps": 30,
            "svg": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%201280%20720%22%20width%3D%221280%22%20height%3D%22720%22%3E%3Cg%20stroke%3D%22black%22%20stroke-width%3D%226%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20fill%3D%22none%22%3E%3Ccircle%20cx%3D%22640%22%20cy%3D%22280%22%20r%3D%2240%22%2F%3E%3Cpath%20d%3D%22M%20640%20320%20L%20640%20500%22%2F%3E%3Cpath%20d%3D%22M%20640%20360%20L%20560%20440%22%2F%3E%3Cpath%20d%3D%22M%20640%20360%20L%20720%20440%22%2F%3E%3Cpath%20d%3D%22M%20640%20500%20L%20580%20620%22%2F%3E%3Cpath%20d%3D%22M%20640%20500%20L%20700%20620%22%2F%3E%3Crect%20x%3D%22200%22%20y%3D%22150%22%20width%3D%22280%22%20height%3D%22180%22%20rx%3D%2210%22%2F%3E%3Cpath%20d%3D%22M%20230%20200%20L%20450%20200%20M%20230%20240%20L%20450%20240%20M%20230%20280%20L%20350%20280%22%2F%3E%3Crect%20x%3D%22800%22%20y%3D%22150%22%20width%3D%22280%22%20height%3D%22180%22%20rx%3D%2210%22%2F%3E%3Cpath%20d%3D%22M%20850%20240%20L%201030%20240%20M%20940%20190%20L%20940%20290%22%2F%3E%3Cpath%20d%3D%22M%20480%20240%20L%20580%20240%22%2F%3E%3Cpath%20d%3D%22M%20700%20240%20L%20800%20240%22%2F%3E%3Cpath%20d%3D%22M%20440%20200%20L%20840%20200%20Q%20640%20100%20440%20200%22%20stroke-dasharray%3D%2210%2C10%22%2F%3E%3Cpath%20d%3D%22M%20510%20500%20L%20770%20500%22%20stroke-width%3D%2212%22%20stroke%3D%22red%22%2F%3E%3Cpath%20d%3D%22M%20540%20470%20L%20600%20530%20M%20600%20470%20L%20540%20530%22%20stroke%3D%22red%22%20stroke-width%3D%228%22%2F%3E%3Cpath%20d%3D%22M%20710%20530%20L%20740%20560%20L%20800%20480%22%20stroke%3D%22%23228B22%22%20stroke-width%3D%2210%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E",
            "title": "Eliminating Friction",
            "width": 1280,
            "height": 720,
            "marker": {
              "width": 180,
              "height": 180,
              "tipOffsetX": 136,
              "tipOffsetY": 24,
              "maxTiltDegrees": 15
            },
            "timing": {
              "gapFrames": 0,
              "startFrame": 8,
              "maxDuration": 20,
              "minDuration": 4,
              "endHoldFrames": 45,
              "maxTravelFrames": 6,
              "minTravelFrames": 2,
              "framesPerHundredPx": 5,
              "connectedThresholdPx": 18,
              "travelPixelsPerFrame": 90
            },
            "strokes": [
              {
                "id": "path-1",
                "path": "M 680 280 A 40 40 0 1 0 600 280 A 40 40 0 1 0 680 280 Z",
                "length": 251.33,
                "stroke": "black",
                "duration": 13,
                "startFrame": 8,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-2",
                "path": "M 640 320 L 640 500",
                "length": 180,
                "stroke": "black",
                "duration": 9,
                "startFrame": 23,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-3",
                "path": "M 560 440 L 640 360",
                "length": 113.14,
                "stroke": "black",
                "duration": 6,
                "startFrame": 34,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-4",
                "path": "M 640 360 L 720 440",
                "length": 113.14,
                "stroke": "black",
                "duration": 6,
                "startFrame": 40,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-5",
                "path": "M 640 500 L 580 620",
                "length": 134.16,
                "stroke": "black",
                "duration": 7,
                "startFrame": 48,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-6",
                "path": "M 700 620 L 640 500",
                "length": 134.16,
                "stroke": "black",
                "duration": 7,
                "startFrame": 57,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-7",
                "path": "M 200 150 H 480 V 330 H 200 Z",
                "length": 920,
                "stroke": "black",
                "duration": 20,
                "startFrame": 70,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-8",
                "path": "M 230 200 L 450 200 M 230 240 L 450 240 M 230 280 L 350 280",
                "length": 560,
                "stroke": "black",
                "duration": 20,
                "startFrame": 92,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-9",
                "path": "M 800 150 H 1080 V 330 H 800 Z",
                "length": 920,
                "stroke": "black",
                "duration": 20,
                "startFrame": 117,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-10",
                "path": "M 850 240 L 1030 240 M 940 190 L 940 290",
                "length": 280,
                "stroke": "black",
                "duration": 14,
                "startFrame": 139,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-11",
                "path": "M 580 240 L 480 240",
                "length": 100,
                "stroke": "black",
                "duration": 5,
                "startFrame": 157,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-12",
                "path": "M 700 240 L 800 240",
                "length": 100,
                "stroke": "black",
                "duration": 5,
                "startFrame": 164,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-13",
                "path": "M 440 200 L 840 200 Q 640 100 440 200",
                "length": 816.09,
                "stroke": "black",
                "duration": 20,
                "startFrame": 173,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-14",
                "path": "M 510 500 L 770 500",
                "length": 260,
                "stroke": "red",
                "duration": 13,
                "startFrame": 196,
                "revealWidth": 12,
                "strokeWidth": 12
              },
              {
                "id": "path-15",
                "path": "M 540 470 L 600 530 M 600 470 L 540 530",
                "length": 169.71,
                "stroke": "red",
                "duration": 8,
                "startFrame": 212,
                "revealWidth": 8,
                "strokeWidth": 8
              },
              {
                "id": "path-16",
                "path": "M 710 530 L 740 560 L 800 480",
                "length": 142.43,
                "stroke": "#228B22",
                "duration": 7,
                "startFrame": 222,
                "revealWidth": 10,
                "strokeWidth": 10
              }
            ],
            "handAsset": "marker-hand.webp",
            "background": "#ffffff",
            "renderMode": "stroke",
            "scriptText": "No handoffs between writers, editors, and voice tools. No timeline software. No waiting.",
            "finalSourceSvg": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%201280%20720%22%20width%3D%221280%22%20height%3D%22720%22%3E%3Cg%20stroke%3D%22black%22%20stroke-width%3D%226%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20fill%3D%22none%22%3E%3Ccircle%20cx%3D%22640%22%20cy%3D%22280%22%20r%3D%2240%22%2F%3E%3Cpath%20d%3D%22M%20640%20320%20L%20640%20500%22%2F%3E%3Cpath%20d%3D%22M%20640%20360%20L%20560%20440%22%2F%3E%3Cpath%20d%3D%22M%20640%20360%20L%20720%20440%22%2F%3E%3Cpath%20d%3D%22M%20640%20500%20L%20580%20620%22%2F%3E%3Cpath%20d%3D%22M%20640%20500%20L%20700%20620%22%2F%3E%3Crect%20x%3D%22200%22%20y%3D%22150%22%20width%3D%22280%22%20height%3D%22180%22%20rx%3D%2210%22%2F%3E%3Cpath%20d%3D%22M%20230%20200%20L%20450%20200%20M%20230%20240%20L%20450%20240%20M%20230%20280%20L%20350%20280%22%2F%3E%3Crect%20x%3D%22800%22%20y%3D%22150%22%20width%3D%22280%22%20height%3D%22180%22%20rx%3D%2210%22%2F%3E%3Cpath%20d%3D%22M%20850%20240%20L%201030%20240%20M%20940%20190%20L%20940%20290%22%2F%3E%3Cpath%20d%3D%22M%20480%20240%20L%20580%20240%22%2F%3E%3Cpath%20d%3D%22M%20700%20240%20L%20800%20240%22%2F%3E%3Cpath%20d%3D%22M%20440%20200%20L%20840%20200%20Q%20640%20100%20440%20200%22%20stroke-dasharray%3D%2210%2C10%22%2F%3E%3Cpath%20d%3D%22M%20510%20500%20L%20770%20500%22%20stroke-width%3D%2212%22%20stroke%3D%22red%22%2F%3E%3Cpath%20d%3D%22M%20540%20470%20L%20600%20530%20M%20600%20470%20L%20540%20530%22%20stroke%3D%22red%22%20stroke-width%3D%228%22%2F%3E%3Cpath%20d%3D%22M%20710%20530%20L%20740%20560%20L%20800%20480%22%20stroke%3D%22%23228B22%22%20stroke-width%3D%2210%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E",
            "durationInFrames": 274,
            "subtitleLimitedTilt": "",
            "audioSrc": "https://adfmmuo6gjjbnu7i.public.blob.vercel-storage.com/generated-audio/storysketch/eliminating-friction-1776197382290.mp3"
          }
        },
        {
          "id": "process-sketch",
          "label": "Process",
          "svgDataUrl": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%201280%20720%22%20width%3D%221280%22%20height%3D%22720%22%3E%3Cg%20stroke%3D%22black%22%20stroke-width%3D%228%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20fill%3D%22none%22%3E%3Cpath%20d%3D%22M%20100%20250%20L%20250%20250%20L%20250%20450%20L%20100%20450%20Z%22%2F%3E%3Cpath%20d%3D%22M%20120%20280%20L%20230%20280%20M%20120%20320%20L%20230%20320%20M%20120%20360%20L%20180%20360%22%2F%3E%3Cpath%20d%3D%22M%20400%20250%20L%20550%20250%20L%20550%20450%20L%20400%20450%20Z%22%2F%3E%3Ccircle%20cx%3D%22475%22%20cy%3D%22320%22%20r%3D%2225%22%2F%3E%3Cpath%20d%3D%22M%20475%20345%20L%20475%20410%20M%20440%20370%20L%20510%20370%20M%20440%20430%20L%20475%20410%20L%20510%20430%22%2F%3E%3Cpath%20d%3D%22M%20700%20250%20L%20850%20250%20L%20850%20450%20L%20700%20450%20Z%22%2F%3E%3Cpath%20d%3D%22M%20730%20300%20C%20730%20280%20820%20280%20820%20300%20C%20820%20350%20730%20350%20730%20400%20C%20730%20420%20820%20420%20820%20400%22%2F%3E%3Cpath%20d%3D%22M%20270%20350%20L%20370%20350%20M%20350%20330%20L%20375%20350%20L%20350%20370%22%20stroke-width%3D%226%22%2F%3E%3Cpath%20d%3D%22M%20570%20350%20L%20670%20350%20M%20650%20330%20L%20675%20350%20L%20650%20370%22%20stroke-width%3D%226%22%2F%3E%3Cpath%20d%3D%22M%20260%20300%20L%20380%20400%20M%20380%20300%20L%20260%20400%22%20stroke%3D%22%23e63946%22%20stroke-width%3D%2212%22%2F%3E%3Cpath%20d%3D%22M%20560%20300%20L%20680%20400%20M%20680%20300%20L%20560%20400%22%20stroke%3D%22%23e63946%22%20stroke-width%3D%2212%22%2F%3E%3Cpath%20d%3D%22M%20950%20200%20L%201200%20200%20L%201200%20500%20L%20950%20500%20Z%22%20stroke-width%3D%2210%22%2F%3E%3Cpath%20d%3D%22M%201000%20350%20L%201050%20400%20L%201150%20300%22%20stroke%3D%22%232a9d8f%22%20stroke-width%3D%2215%22%2F%3E%3Cpath%20d%3D%22M%20100%20500%20L%20850%20500%22%20stroke-dasharray%3D%2215%2C15%22%2F%3E%3Cpath%20d%3D%22M%20950%20550%20L%201200%20550%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E",
          "tracedScene": {
            "id": "eliminating-friction-4",
            "fps": 30,
            "svg": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%201280%20720%22%20width%3D%221280%22%20height%3D%22720%22%3E%3Cg%20stroke%3D%22black%22%20stroke-width%3D%228%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20fill%3D%22none%22%3E%3Cpath%20d%3D%22M%20100%20250%20L%20250%20250%20L%20250%20450%20L%20100%20450%20Z%22%2F%3E%3Cpath%20d%3D%22M%20120%20280%20L%20230%20280%20M%20120%20320%20L%20230%20320%20M%20120%20360%20L%20180%20360%22%2F%3E%3Cpath%20d%3D%22M%20400%20250%20L%20550%20250%20L%20550%20450%20L%20400%20450%20Z%22%2F%3E%3Ccircle%20cx%3D%22475%22%20cy%3D%22320%22%20r%3D%2225%22%2F%3E%3Cpath%20d%3D%22M%20475%20345%20L%20475%20410%20M%20440%20370%20L%20510%20370%20M%20440%20430%20L%20475%20410%20L%20510%20430%22%2F%3E%3Cpath%20d%3D%22M%20700%20250%20L%20850%20250%20L%20850%20450%20L%20700%20450%20Z%22%2F%3E%3Cpath%20d%3D%22M%20730%20300%20C%20730%20280%20820%20280%20820%20300%20C%20820%20350%20730%20350%20730%20400%20C%20730%20420%20820%20420%20820%20400%22%2F%3E%3Cpath%20d%3D%22M%20270%20350%20L%20370%20350%20M%20350%20330%20L%20375%20350%20L%20350%20370%22%20stroke-width%3D%226%22%2F%3E%3Cpath%20d%3D%22M%20570%20350%20L%20670%20350%20M%20650%20330%20L%20675%20350%20L%20650%20370%22%20stroke-width%3D%226%22%2F%3E%3Cpath%20d%3D%22M%20260%20300%20L%20380%20400%20M%20380%20300%20L%20260%20400%22%20stroke%3D%22%23e63946%22%20stroke-width%3D%2212%22%2F%3E%3Cpath%20d%3D%22M%20560%20300%20L%20680%20400%20M%20680%20300%20L%20560%20400%22%20stroke%3D%22%23e63946%22%20stroke-width%3D%2212%22%2F%3E%3Cpath%20d%3D%22M%20950%20200%20L%201200%20200%20L%201200%20500%20L%20950%20500%20Z%22%20stroke-width%3D%2210%22%2F%3E%3Cpath%20d%3D%22M%201000%20350%20L%201050%20400%20L%201150%20300%22%20stroke%3D%22%232a9d8f%22%20stroke-width%3D%2215%22%2F%3E%3Cpath%20d%3D%22M%20100%20500%20L%20850%20500%22%20stroke-dasharray%3D%2215%2C15%22%2F%3E%3Cpath%20d%3D%22M%20950%20550%20L%201200%20550%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E",
            "title": "Eliminating Friction",
            "width": 1280,
            "height": 720,
            "marker": {
              "width": 180,
              "height": 180,
              "tipOffsetX": 136,
              "tipOffsetY": 24,
              "maxTiltDegrees": 15
            },
            "timing": {
              "gapFrames": 0,
              "startFrame": 8,
              "maxDuration": 20,
              "minDuration": 4,
              "endHoldFrames": 45,
              "maxTravelFrames": 6,
              "minTravelFrames": 2,
              "framesPerHundredPx": 5,
              "connectedThresholdPx": 18,
              "travelPixelsPerFrame": 90
            },
            "strokes": [
              {
                "id": "path-1",
                "path": "M 100 250 L 250 250 L 250 450 L 100 450 Z",
                "length": 700,
                "stroke": "black",
                "duration": 20,
                "startFrame": 8,
                "revealWidth": 8,
                "strokeWidth": 8
              },
              {
                "id": "path-2",
                "path": "M 120 280 L 230 280 M 120 320 L 230 320 M 120 360 L 180 360",
                "length": 280,
                "stroke": "black",
                "duration": 14,
                "startFrame": 30,
                "revealWidth": 8,
                "strokeWidth": 8
              },
              {
                "id": "path-3",
                "path": "M 400 250 L 550 250 L 550 450 L 400 450 Z",
                "length": 700,
                "stroke": "black",
                "duration": 20,
                "startFrame": 47,
                "revealWidth": 8,
                "strokeWidth": 8
              },
              {
                "id": "path-4",
                "path": "M 500 320 A 25 25 0 1 0 450 320 A 25 25 0 1 0 500 320 Z",
                "length": 157.08,
                "stroke": "black",
                "duration": 8,
                "startFrame": 69,
                "revealWidth": 8,
                "strokeWidth": 8
              },
              {
                "id": "path-5",
                "path": "M 475 345 L 475 410 M 440 370 L 510 370 M 440 430 L 475 410 L 510 430",
                "length": 215.62,
                "stroke": "black",
                "duration": 11,
                "startFrame": 79,
                "revealWidth": 8,
                "strokeWidth": 8
              },
              {
                "id": "path-6",
                "path": "M 700 250 L 850 250 L 850 450 L 700 450 Z",
                "length": 700,
                "stroke": "black",
                "duration": 20,
                "startFrame": 93,
                "revealWidth": 8,
                "strokeWidth": 8
              },
              {
                "id": "path-7",
                "path": "M 730 300 C 730 280 820 280 820 300 C 820 350 730 350 730 400 C 730 420 820 420 820 400",
                "length": 343.76,
                "stroke": "black",
                "duration": 17,
                "startFrame": 115,
                "revealWidth": 8,
                "strokeWidth": 8
              },
              {
                "id": "path-8",
                "path": "M 370 350 L 270 350 M 350 370 L 375 350 L 350 330",
                "length": 164.03,
                "stroke": "black",
                "duration": 8,
                "startFrame": 137,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-9",
                "path": "M 570 350 L 670 350 M 650 330 L 675 350 L 650 370",
                "length": 164.03,
                "stroke": "black",
                "duration": 8,
                "startFrame": 148,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-10",
                "path": "M 380 400 L 260 300 M 260 400 L 380 300",
                "length": 312.41,
                "stroke": "#e63946",
                "duration": 16,
                "startFrame": 160,
                "revealWidth": 12,
                "strokeWidth": 12
              },
              {
                "id": "path-11",
                "path": "M 560 300 L 680 400 M 680 300 L 560 400",
                "length": 312.41,
                "stroke": "#e63946",
                "duration": 16,
                "startFrame": 179,
                "revealWidth": 12,
                "strokeWidth": 12
              },
              {
                "id": "path-12",
                "path": "M 950 200 L 1200 200 L 1200 500 L 950 500 Z",
                "length": 1100,
                "stroke": "black",
                "duration": 20,
                "startFrame": 200,
                "revealWidth": 10,
                "strokeWidth": 10
              },
              {
                "id": "path-13",
                "path": "M 1000 350 L 1050 400 L 1150 300",
                "length": 212.13,
                "stroke": "#2a9d8f",
                "duration": 11,
                "startFrame": 222,
                "revealWidth": 15,
                "strokeWidth": 15
              },
              {
                "id": "path-14",
                "path": "M 850 500 L 100 500",
                "length": 750,
                "stroke": "black",
                "duration": 20,
                "startFrame": 237,
                "revealWidth": 8,
                "strokeWidth": 8
              },
              {
                "id": "path-15",
                "path": "M 950 550 L 1200 550",
                "length": 250,
                "stroke": "black",
                "duration": 13,
                "startFrame": 263,
                "revealWidth": 8,
                "strokeWidth": 8
              }
            ],
            "handAsset": "marker-hand.webp",
            "background": "#ffffff",
            "renderMode": "stroke",
            "scriptText": "No handoffs between writers, editors, and voice tools. No timeline software. No waiting.",
            "finalSourceSvg": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%201280%20720%22%20width%3D%221280%22%20height%3D%22720%22%3E%3Cg%20stroke%3D%22black%22%20stroke-width%3D%228%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20fill%3D%22none%22%3E%3Cpath%20d%3D%22M%20100%20250%20L%20250%20250%20L%20250%20450%20L%20100%20450%20Z%22%2F%3E%3Cpath%20d%3D%22M%20120%20280%20L%20230%20280%20M%20120%20320%20L%20230%20320%20M%20120%20360%20L%20180%20360%22%2F%3E%3Cpath%20d%3D%22M%20400%20250%20L%20550%20250%20L%20550%20450%20L%20400%20450%20Z%22%2F%3E%3Ccircle%20cx%3D%22475%22%20cy%3D%22320%22%20r%3D%2225%22%2F%3E%3Cpath%20d%3D%22M%20475%20345%20L%20475%20410%20M%20440%20370%20L%20510%20370%20M%20440%20430%20L%20475%20410%20L%20510%20430%22%2F%3E%3Cpath%20d%3D%22M%20700%20250%20L%20850%20250%20L%20850%20450%20L%20700%20450%20Z%22%2F%3E%3Cpath%20d%3D%22M%20730%20300%20C%20730%20280%20820%20280%20820%20300%20C%20820%20350%20730%20350%20730%20400%20C%20730%20420%20820%20420%20820%20400%22%2F%3E%3Cpath%20d%3D%22M%20270%20350%20L%20370%20350%20M%20350%20330%20L%20375%20350%20L%20350%20370%22%20stroke-width%3D%226%22%2F%3E%3Cpath%20d%3D%22M%20570%20350%20L%20670%20350%20M%20650%20330%20L%20675%20350%20L%20650%20370%22%20stroke-width%3D%226%22%2F%3E%3Cpath%20d%3D%22M%20260%20300%20L%20380%20400%20M%20380%20300%20L%20260%20400%22%20stroke%3D%22%23e63946%22%20stroke-width%3D%2212%22%2F%3E%3Cpath%20d%3D%22M%20560%20300%20L%20680%20400%20M%20680%20300%20L%20560%20400%22%20stroke%3D%22%23e63946%22%20stroke-width%3D%2212%22%2F%3E%3Cpath%20d%3D%22M%20950%20200%20L%201200%20200%20L%201200%20500%20L%20950%20500%20Z%22%20stroke-width%3D%2210%22%2F%3E%3Cpath%20d%3D%22M%201000%20350%20L%201050%20400%20L%201150%20300%22%20stroke%3D%22%232a9d8f%22%20stroke-width%3D%2215%22%2F%3E%3Cpath%20d%3D%22M%20100%20500%20L%20850%20500%22%20stroke-dasharray%3D%2215%2C15%22%2F%3E%3Cpath%20d%3D%22M%20950%20550%20L%201200%20550%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E",
            "durationInFrames": 321,
            "subtitleLimitedTilt": "",
            "audioSrc": "https://adfmmuo6gjjbnu7i.public.blob.vercel-storage.com/generated-audio/storysketch/eliminating-friction-1776197382290.mp3"
          }
        }
      ]
    },
    {
      "id": "the-simplified-workflow-5",
      "title": "The Simplified Workflow",
      "scriptText": "Just paste your script, generate scenes, export the MP4. Same day. Same workspace. Same person.",
      "selectedVisualOptionId": "process-sketch",
      "visualOptions": [
        {
          "id": "minimal-diagram",
          "label": "Minimal",
          "svgDataUrl": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%201280%20720%22%20width%3D%221280%22%20height%3D%22720%22%3E%3Cg%20stroke%3D%22black%22%20stroke-width%3D%224%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20fill%3D%22none%22%3E%3Crect%20x%3D%22200%22%20y%3D%22250%22%20width%3D%22220%22%20height%3D%22160%22%20rx%3D%2210%22%2F%3E%3Cpath%20d%3D%22M%20220%20280%20L%20400%20280%22%2F%3E%3Cpath%20d%3D%22M%20220%20310%20L%20380%20310%22%2F%3E%3Cpath%20d%3D%22M%20220%20340%20L%20350%20340%22%2F%3E%3Cpath%20d%3D%22M%20460%20330%20L%20560%20330%22%2F%3E%3Cpath%20d%3D%22M%20540%20310%20L%20565%20330%20L%20540%20350%22%2F%3E%3Ccircle%20cx%3D%22740%22%20cy%3D%22280%22%20r%3D%2240%22%2F%3E%3Cpath%20d%3D%22M%20740%20320%20L%20740%20460%22%2F%3E%3Cpath%20d%3D%22M%20740%20350%20L%20680%20410%22%2F%3E%3Cpath%20d%3D%22M%20740%20350%20L%20800%20410%22%2F%3E%3Cpath%20d%3D%22M%20740%20460%20L%20680%20560%22%2F%3E%3Cpath%20d%3D%22M%20740%20460%20L%20800%20560%22%2F%3E%3Cpath%20d%3D%22M%20860%20330%20L%20960%20330%22%2F%3E%3Cpath%20d%3D%22M%20940%20310%20L%20965%20330%20L%20940%20350%22%2F%3E%3Crect%20x%3D%221000%22%20y%3D%22250%22%20width%3D%22120%22%20height%3D%22160%22%20rx%3D%225%22%2F%3E%3Ccircle%20cx%3D%221060%22%20cy%3D%22330%22%20r%3D%2225%22%2F%3E%3Cpath%20d%3D%22M%201045%20330%20L%201055%20345%20L%201075%20315%22%20stroke%3D%22green%22%20stroke-width%3D%226%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E",
          "tracedScene": {
            "id": "the-simplified-workflow-5",
            "fps": 30,
            "svg": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%201280%20720%22%20width%3D%221280%22%20height%3D%22720%22%3E%3Cg%20stroke%3D%22black%22%20stroke-width%3D%224%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20fill%3D%22none%22%3E%3Crect%20x%3D%22200%22%20y%3D%22250%22%20width%3D%22220%22%20height%3D%22160%22%20rx%3D%2210%22%2F%3E%3Cpath%20d%3D%22M%20220%20280%20L%20400%20280%22%2F%3E%3Cpath%20d%3D%22M%20220%20310%20L%20380%20310%22%2F%3E%3Cpath%20d%3D%22M%20220%20340%20L%20350%20340%22%2F%3E%3Cpath%20d%3D%22M%20460%20330%20L%20560%20330%22%2F%3E%3Cpath%20d%3D%22M%20540%20310%20L%20565%20330%20L%20540%20350%22%2F%3E%3Ccircle%20cx%3D%22740%22%20cy%3D%22280%22%20r%3D%2240%22%2F%3E%3Cpath%20d%3D%22M%20740%20320%20L%20740%20460%22%2F%3E%3Cpath%20d%3D%22M%20740%20350%20L%20680%20410%22%2F%3E%3Cpath%20d%3D%22M%20740%20350%20L%20800%20410%22%2F%3E%3Cpath%20d%3D%22M%20740%20460%20L%20680%20560%22%2F%3E%3Cpath%20d%3D%22M%20740%20460%20L%20800%20560%22%2F%3E%3Cpath%20d%3D%22M%20860%20330%20L%20960%20330%22%2F%3E%3Cpath%20d%3D%22M%20940%20310%20L%20965%20330%20L%20940%20350%22%2F%3E%3Crect%20x%3D%221000%22%20y%3D%22250%22%20width%3D%22120%22%20height%3D%22160%22%20rx%3D%225%22%2F%3E%3Ccircle%20cx%3D%221060%22%20cy%3D%22330%22%20r%3D%2225%22%2F%3E%3Cpath%20d%3D%22M%201045%20330%20L%201055%20345%20L%201075%20315%22%20stroke%3D%22green%22%20stroke-width%3D%226%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E",
            "title": "The Simplified Workflow",
            "width": 1280,
            "height": 720,
            "marker": {
              "width": 180,
              "height": 180,
              "tipOffsetX": 136,
              "tipOffsetY": 24,
              "maxTiltDegrees": 15
            },
            "timing": {
              "gapFrames": 0,
              "startFrame": 8,
              "maxDuration": 20,
              "minDuration": 4,
              "endHoldFrames": 45,
              "maxTravelFrames": 6,
              "minTravelFrames": 2,
              "framesPerHundredPx": 5,
              "connectedThresholdPx": 18,
              "travelPixelsPerFrame": 90
            },
            "strokes": [
              {
                "id": "path-1",
                "path": "M 200 250 H 420 V 410 H 200 Z",
                "length": 760,
                "stroke": "black",
                "duration": 20,
                "startFrame": 8,
                "revealWidth": 4,
                "strokeWidth": 4
              },
              {
                "id": "path-2",
                "path": "M 220 280 L 400 280",
                "length": 180,
                "stroke": "black",
                "duration": 9,
                "startFrame": 30,
                "revealWidth": 4,
                "strokeWidth": 4
              },
              {
                "id": "path-3",
                "path": "M 380 310 L 220 310",
                "length": 160,
                "stroke": "black",
                "duration": 8,
                "startFrame": 41,
                "revealWidth": 4,
                "strokeWidth": 4
              },
              {
                "id": "path-4",
                "path": "M 220 340 L 350 340",
                "length": 130,
                "stroke": "black",
                "duration": 7,
                "startFrame": 51,
                "revealWidth": 4,
                "strokeWidth": 4
              },
              {
                "id": "path-5",
                "path": "M 460 330 L 560 330",
                "length": 100,
                "stroke": "black",
                "duration": 5,
                "startFrame": 60,
                "revealWidth": 4,
                "strokeWidth": 4
              },
              {
                "id": "path-6",
                "path": "M 540 310 L 565 330 L 540 350",
                "length": 64.03,
                "stroke": "black",
                "duration": 4,
                "startFrame": 67,
                "revealWidth": 4,
                "strokeWidth": 4
              },
              {
                "id": "path-7",
                "path": "M 780 280 A 40 40 0 1 0 700 280 A 40 40 0 1 0 780 280 Z",
                "length": 251.33,
                "stroke": "black",
                "duration": 13,
                "startFrame": 74,
                "revealWidth": 4,
                "strokeWidth": 4
              },
              {
                "id": "path-8",
                "path": "M 740 320 L 740 460",
                "length": 140,
                "stroke": "black",
                "duration": 7,
                "startFrame": 89,
                "revealWidth": 4,
                "strokeWidth": 4
              },
              {
                "id": "path-9",
                "path": "M 680 410 L 740 350",
                "length": 84.85,
                "stroke": "black",
                "duration": 4,
                "startFrame": 98,
                "revealWidth": 4,
                "strokeWidth": 4
              },
              {
                "id": "path-10",
                "path": "M 740 350 L 800 410",
                "length": 84.85,
                "stroke": "black",
                "duration": 4,
                "startFrame": 102,
                "revealWidth": 4,
                "strokeWidth": 4
              },
              {
                "id": "path-11",
                "path": "M 740 460 L 680 560",
                "length": 116.62,
                "stroke": "black",
                "duration": 6,
                "startFrame": 108,
                "revealWidth": 4,
                "strokeWidth": 4
              },
              {
                "id": "path-12",
                "path": "M 740 460 L 800 560",
                "length": 116.62,
                "stroke": "black",
                "duration": 6,
                "startFrame": 116,
                "revealWidth": 4,
                "strokeWidth": 4
              },
              {
                "id": "path-13",
                "path": "M 860 330 L 960 330",
                "length": 100,
                "stroke": "black",
                "duration": 5,
                "startFrame": 125,
                "revealWidth": 4,
                "strokeWidth": 4
              },
              {
                "id": "path-14",
                "path": "M 940 310 L 965 330 L 940 350",
                "length": 64.03,
                "stroke": "black",
                "duration": 4,
                "startFrame": 132,
                "revealWidth": 4,
                "strokeWidth": 4
              },
              {
                "id": "path-15",
                "path": "M 1000 250 H 1120 V 410 H 1000 Z",
                "length": 560,
                "stroke": "black",
                "duration": 20,
                "startFrame": 138,
                "revealWidth": 4,
                "strokeWidth": 4
              },
              {
                "id": "path-16",
                "path": "M 1085 330 A 25 25 0 1 0 1035 330 A 25 25 0 1 0 1085 330 Z",
                "length": 157.08,
                "stroke": "black",
                "duration": 8,
                "startFrame": 160,
                "revealWidth": 4,
                "strokeWidth": 4
              },
              {
                "id": "path-17",
                "path": "M 1075 315 L 1055 345 L 1045 330",
                "length": 54.08,
                "stroke": "green",
                "duration": 4,
                "startFrame": 170,
                "revealWidth": 6,
                "strokeWidth": 6
              }
            ],
            "handAsset": "marker-hand.webp",
            "background": "#ffffff",
            "renderMode": "stroke",
            "scriptText": "Just paste your script, generate scenes, export the MP4. Same day. Same workspace. Same person.",
            "finalSourceSvg": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%201280%20720%22%20width%3D%221280%22%20height%3D%22720%22%3E%3Cg%20stroke%3D%22black%22%20stroke-width%3D%224%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20fill%3D%22none%22%3E%3Crect%20x%3D%22200%22%20y%3D%22250%22%20width%3D%22220%22%20height%3D%22160%22%20rx%3D%2210%22%2F%3E%3Cpath%20d%3D%22M%20220%20280%20L%20400%20280%22%2F%3E%3Cpath%20d%3D%22M%20220%20310%20L%20380%20310%22%2F%3E%3Cpath%20d%3D%22M%20220%20340%20L%20350%20340%22%2F%3E%3Cpath%20d%3D%22M%20460%20330%20L%20560%20330%22%2F%3E%3Cpath%20d%3D%22M%20540%20310%20L%20565%20330%20L%20540%20350%22%2F%3E%3Ccircle%20cx%3D%22740%22%20cy%3D%22280%22%20r%3D%2240%22%2F%3E%3Cpath%20d%3D%22M%20740%20320%20L%20740%20460%22%2F%3E%3Cpath%20d%3D%22M%20740%20350%20L%20680%20410%22%2F%3E%3Cpath%20d%3D%22M%20740%20350%20L%20800%20410%22%2F%3E%3Cpath%20d%3D%22M%20740%20460%20L%20680%20560%22%2F%3E%3Cpath%20d%3D%22M%20740%20460%20L%20800%20560%22%2F%3E%3Cpath%20d%3D%22M%20860%20330%20L%20960%20330%22%2F%3E%3Cpath%20d%3D%22M%20940%20310%20L%20965%20330%20L%20940%20350%22%2F%3E%3Crect%20x%3D%221000%22%20y%3D%22250%22%20width%3D%22120%22%20height%3D%22160%22%20rx%3D%225%22%2F%3E%3Ccircle%20cx%3D%221060%22%20cy%3D%22330%22%20r%3D%2225%22%2F%3E%3Cpath%20d%3D%22M%201045%20330%20L%201055%20345%20L%201075%20315%22%20stroke%3D%22green%22%20stroke-width%3D%226%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E",
            "durationInFrames": 219,
            "subtitleLimitedTilt": "",
            "audioSrc": "https://adfmmuo6gjjbnu7i.public.blob.vercel-storage.com/generated-audio/storysketch/the-simplified-workflow-1776197383807.mp3"
          }
        },
        {
          "id": "story-moment",
          "label": "Story",
          "svgDataUrl": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%201280%20720%22%20width%3D%221280%22%20height%3D%22720%22%3E%3Cg%20stroke%3D%22black%22%20stroke-width%3D%226%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20fill%3D%22none%22%3E%3Cg%20id%3D%22stick-figure%22%3E%3Ccircle%20cx%3D%22300%22%20cy%3D%22250%22%20r%3D%2240%22%2F%3E%3Cpath%20d%3D%22M%20300%20290%20L%20300%20480%22%2F%3E%3Cpath%20d%3D%22M%20300%20340%20L%20400%20360%22%2F%3E%3Cpath%20d%3D%22M%20300%20340%20L%20220%20380%22%2F%3E%3Cpath%20d%3D%22M%20300%20480%20L%20250%20600%22%2F%3E%3Cpath%20d%3D%22M%20300%20480%20L%20350%20600%22%2F%3E%3C%2Fg%3E%3Cg%20id%3D%22computer-screen%22%3E%3Crect%20x%3D%22550%22%20y%3D%22200%22%20width%3D%22400%22%20height%3D%22280%22%20rx%3D%2210%22%20ry%3D%2210%22%2F%3E%3Crect%20x%3D%22570%22%20y%3D%22220%22%20width%3D%22360%22%20height%3D%22200%22%2F%3E%3Cpath%20d%3D%22M%20700%20480%20L%20680%20540%20L%20820%20540%20L%20800%20480%22%2F%3E%3Cpath%20d%3D%22M%20600%20320%20L%20900%20320%22%2F%3E%3Cpath%20d%3D%22M%20600%20360%20L%20800%20360%22%2F%3E%3C%2Fg%3E%3Cg%20id%3D%22export-action%22%3E%3Cpath%20d%3D%22M%201000%20340%20L%201150%20340%22%2F%3E%3Cpath%20d%3D%22M%201100%20290%20L%201150%20340%20L%201100%20390%22%2F%3E%3Crect%20x%3D%221030%22%20y%3D%22400%22%20width%3D%22100%22%20height%3D%2260%22%20rx%3D%225%22%20ry%3D%225%22%2F%3E%3Cpath%20d%3D%22M%201055%20430%20L%201075%20430%22%2F%3E%3Cpath%20d%3D%22M%201055%20415%20L%201055%20445%22%2F%3E%3Cpath%20d%3D%22M%201085%20415%20L%201105%20445%22%2F%3E%3Cpath%20d%3D%22M%201105%20415%20L%201085%20445%22%2F%3E%3C%2Fg%3E%3Cg%20id%3D%22labels%22%20stroke-width%3D%222%22%3E%3Cpath%20d%3D%22M%20750%20250%20L%20750%20290%22%2F%3E%3Cpath%20d%3D%22M%20730%20270%20L%20770%20270%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E",
          "tracedScene": {
            "id": "the-simplified-workflow-5",
            "fps": 30,
            "svg": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%201280%20720%22%20width%3D%221280%22%20height%3D%22720%22%3E%3Cg%20stroke%3D%22black%22%20stroke-width%3D%226%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20fill%3D%22none%22%3E%3Cg%20id%3D%22stick-figure%22%3E%3Ccircle%20cx%3D%22300%22%20cy%3D%22250%22%20r%3D%2240%22%2F%3E%3Cpath%20d%3D%22M%20300%20290%20L%20300%20480%22%2F%3E%3Cpath%20d%3D%22M%20300%20340%20L%20400%20360%22%2F%3E%3Cpath%20d%3D%22M%20300%20340%20L%20220%20380%22%2F%3E%3Cpath%20d%3D%22M%20300%20480%20L%20250%20600%22%2F%3E%3Cpath%20d%3D%22M%20300%20480%20L%20350%20600%22%2F%3E%3C%2Fg%3E%3Cg%20id%3D%22computer-screen%22%3E%3Crect%20x%3D%22550%22%20y%3D%22200%22%20width%3D%22400%22%20height%3D%22280%22%20rx%3D%2210%22%20ry%3D%2210%22%2F%3E%3Crect%20x%3D%22570%22%20y%3D%22220%22%20width%3D%22360%22%20height%3D%22200%22%2F%3E%3Cpath%20d%3D%22M%20700%20480%20L%20680%20540%20L%20820%20540%20L%20800%20480%22%2F%3E%3Cpath%20d%3D%22M%20600%20320%20L%20900%20320%22%2F%3E%3Cpath%20d%3D%22M%20600%20360%20L%20800%20360%22%2F%3E%3C%2Fg%3E%3Cg%20id%3D%22export-action%22%3E%3Cpath%20d%3D%22M%201000%20340%20L%201150%20340%22%2F%3E%3Cpath%20d%3D%22M%201100%20290%20L%201150%20340%20L%201100%20390%22%2F%3E%3Crect%20x%3D%221030%22%20y%3D%22400%22%20width%3D%22100%22%20height%3D%2260%22%20rx%3D%225%22%20ry%3D%225%22%2F%3E%3Cpath%20d%3D%22M%201055%20430%20L%201075%20430%22%2F%3E%3Cpath%20d%3D%22M%201055%20415%20L%201055%20445%22%2F%3E%3Cpath%20d%3D%22M%201085%20415%20L%201105%20445%22%2F%3E%3Cpath%20d%3D%22M%201105%20415%20L%201085%20445%22%2F%3E%3C%2Fg%3E%3Cg%20id%3D%22labels%22%20stroke-width%3D%222%22%3E%3Cpath%20d%3D%22M%20750%20250%20L%20750%20290%22%2F%3E%3Cpath%20d%3D%22M%20730%20270%20L%20770%20270%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E",
            "title": "The Simplified Workflow",
            "width": 1280,
            "height": 720,
            "marker": {
              "width": 180,
              "height": 180,
              "tipOffsetX": 136,
              "tipOffsetY": 24,
              "maxTiltDegrees": 15
            },
            "timing": {
              "gapFrames": 0,
              "startFrame": 8,
              "maxDuration": 20,
              "minDuration": 4,
              "endHoldFrames": 45,
              "maxTravelFrames": 6,
              "minTravelFrames": 2,
              "framesPerHundredPx": 5,
              "connectedThresholdPx": 18,
              "travelPixelsPerFrame": 90
            },
            "strokes": [
              {
                "id": "path-1",
                "path": "M 340 250 A 40 40 0 1 0 260 250 A 40 40 0 1 0 340 250 Z",
                "length": 251.33,
                "stroke": "black",
                "duration": 13,
                "startFrame": 8,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-2",
                "path": "M 300 290 L 300 480",
                "length": 190,
                "stroke": "black",
                "duration": 10,
                "startFrame": 23,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-3",
                "path": "M 300 340 L 400 360",
                "length": 101.98,
                "stroke": "black",
                "duration": 5,
                "startFrame": 35,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-4",
                "path": "M 300 340 L 220 380",
                "length": 89.44,
                "stroke": "black",
                "duration": 4,
                "startFrame": 42,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-5",
                "path": "M 300 480 L 250 600",
                "length": 130,
                "stroke": "black",
                "duration": 7,
                "startFrame": 48,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-6",
                "path": "M 350 600 L 300 480",
                "length": 130,
                "stroke": "black",
                "duration": 7,
                "startFrame": 57,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-7",
                "path": "M 550 200 H 950 V 480 H 550 Z",
                "length": 1360,
                "stroke": "black",
                "duration": 20,
                "startFrame": 68,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-8",
                "path": "M 570 220 H 930 V 420 H 570 Z",
                "length": 1120,
                "stroke": "black",
                "duration": 20,
                "startFrame": 90,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-9",
                "path": "M 700 480 L 680 540 L 820 540 L 800 480",
                "length": 266.49,
                "stroke": "black",
                "duration": 13,
                "startFrame": 113,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-10",
                "path": "M 900 320 L 600 320",
                "length": 300,
                "stroke": "black",
                "duration": 15,
                "startFrame": 128,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-11",
                "path": "M 600 360 L 800 360",
                "length": 200,
                "stroke": "black",
                "duration": 10,
                "startFrame": 145,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-12",
                "path": "M 1000 340 L 1150 340",
                "length": 150,
                "stroke": "black",
                "duration": 8,
                "startFrame": 157,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-13",
                "path": "M 1100 290 L 1150 340 L 1100 390",
                "length": 141.42,
                "stroke": "black",
                "duration": 7,
                "startFrame": 167,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-14",
                "path": "M 1030 400 H 1130 V 460 H 1030 Z",
                "length": 320,
                "stroke": "black",
                "duration": 16,
                "startFrame": 176,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-15",
                "path": "M 1055 430 L 1075 430",
                "length": 20,
                "stroke": "black",
                "duration": 4,
                "startFrame": 194,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-16",
                "path": "M 1055 415 L 1055 445",
                "length": 30,
                "stroke": "black",
                "duration": 4,
                "startFrame": 200,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-17",
                "path": "M 1085 415 L 1105 445",
                "length": 36.06,
                "stroke": "black",
                "duration": 4,
                "startFrame": 206,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-18",
                "path": "M 1085 445 L 1105 415",
                "length": 36.06,
                "stroke": "black",
                "duration": 4,
                "startFrame": 212,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-19",
                "path": "M 750 290 L 750 250",
                "length": 40,
                "stroke": "black",
                "duration": 4,
                "startFrame": 220,
                "revealWidth": 2,
                "strokeWidth": 2
              },
              {
                "id": "path-20",
                "path": "M 730 270 L 770 270",
                "length": 40,
                "stroke": "black",
                "duration": 4,
                "startFrame": 226,
                "revealWidth": 2,
                "strokeWidth": 2
              }
            ],
            "handAsset": "marker-hand.webp",
            "background": "#ffffff",
            "renderMode": "stroke",
            "scriptText": "Just paste your script, generate scenes, export the MP4. Same day. Same workspace. Same person.",
            "finalSourceSvg": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%201280%20720%22%20width%3D%221280%22%20height%3D%22720%22%3E%3Cg%20stroke%3D%22black%22%20stroke-width%3D%226%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20fill%3D%22none%22%3E%3Cg%20id%3D%22stick-figure%22%3E%3Ccircle%20cx%3D%22300%22%20cy%3D%22250%22%20r%3D%2240%22%2F%3E%3Cpath%20d%3D%22M%20300%20290%20L%20300%20480%22%2F%3E%3Cpath%20d%3D%22M%20300%20340%20L%20400%20360%22%2F%3E%3Cpath%20d%3D%22M%20300%20340%20L%20220%20380%22%2F%3E%3Cpath%20d%3D%22M%20300%20480%20L%20250%20600%22%2F%3E%3Cpath%20d%3D%22M%20300%20480%20L%20350%20600%22%2F%3E%3C%2Fg%3E%3Cg%20id%3D%22computer-screen%22%3E%3Crect%20x%3D%22550%22%20y%3D%22200%22%20width%3D%22400%22%20height%3D%22280%22%20rx%3D%2210%22%20ry%3D%2210%22%2F%3E%3Crect%20x%3D%22570%22%20y%3D%22220%22%20width%3D%22360%22%20height%3D%22200%22%2F%3E%3Cpath%20d%3D%22M%20700%20480%20L%20680%20540%20L%20820%20540%20L%20800%20480%22%2F%3E%3Cpath%20d%3D%22M%20600%20320%20L%20900%20320%22%2F%3E%3Cpath%20d%3D%22M%20600%20360%20L%20800%20360%22%2F%3E%3C%2Fg%3E%3Cg%20id%3D%22export-action%22%3E%3Cpath%20d%3D%22M%201000%20340%20L%201150%20340%22%2F%3E%3Cpath%20d%3D%22M%201100%20290%20L%201150%20340%20L%201100%20390%22%2F%3E%3Crect%20x%3D%221030%22%20y%3D%22400%22%20width%3D%22100%22%20height%3D%2260%22%20rx%3D%225%22%20ry%3D%225%22%2F%3E%3Cpath%20d%3D%22M%201055%20430%20L%201075%20430%22%2F%3E%3Cpath%20d%3D%22M%201055%20415%20L%201055%20445%22%2F%3E%3Cpath%20d%3D%22M%201085%20415%20L%201105%20445%22%2F%3E%3Cpath%20d%3D%22M%201105%20415%20L%201085%20445%22%2F%3E%3C%2Fg%3E%3Cg%20id%3D%22labels%22%20stroke-width%3D%222%22%3E%3Cpath%20d%3D%22M%20750%20250%20L%20750%20290%22%2F%3E%3Cpath%20d%3D%22M%20730%20270%20L%20770%20270%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E",
            "durationInFrames": 275,
            "subtitleLimitedTilt": "",
            "audioSrc": "https://adfmmuo6gjjbnu7i.public.blob.vercel-storage.com/generated-audio/storysketch/the-simplified-workflow-1776197383807.mp3"
          }
        },
        {
          "id": "process-sketch",
          "label": "Process",
          "svgDataUrl": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%201280%20720%22%20width%3D%221280%22%20height%3D%22720%22%3E%3Cg%20stroke%3D%22black%22%20stroke-width%3D%224%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20fill%3D%22none%22%3E%3C!--%20INPUT%20SECTION%3A%20SCRIPT%20--%3E%3Crect%20x%3D%22100%22%20y%3D%22260%22%20width%3D%22200%22%20height%3D%22200%22%20%2F%3E%3Cpath%20d%3D%22M%20130%20300%20L%20270%20300%20M%20130%20340%20L%20270%20340%20M%20130%20380%20L%20220%20380%22%20%2F%3E%3C!--%20ARROW%201%20--%3E%3Cpath%20d%3D%22M%20340%20360%20L%20440%20360%20M%20420%20340%20L%20440%20360%20L%20420%20380%22%20%2F%3E%3C!--%20PROCESS%20SECTION%3A%20WORKSPACE%20--%3E%3Crect%20x%3D%22480%22%20y%3D%22260%22%20width%3D%22320%22%20height%3D%22200%22%20%2F%3E%3Crect%20x%3D%22510%22%20y%3D%22290%22%20width%3D%22120%22%20height%3D%2280%22%20%2F%3E%3Crect%20x%3D%22650%22%20y%3D%22290%22%20width%3D%22120%22%20height%3D%2280%22%20%2F%3E%3Cpath%20d%3D%22M%20510%20420%20L%20770%20420%22%20%2F%3E%3Ccircle%20cx%3D%22640%22%20cy%3D%22220%22%20r%3D%2230%22%20%2F%3E%3Cpath%20d%3D%22M%20640%20250%20L%20640%20320%20M%20640%20270%20L%20610%20300%20M%20640%20270%20L%20670%20300%20M%20640%20320%20L%20610%20360%20M%20640%20320%20L%20670%20360%22%20%2F%3E%3C!--%20ARROW%202%20--%3E%3Cpath%20d%3D%22M%20840%20360%20L%20940%20360%20M%20920%20340%20L%20940%20360%20L%20920%20380%22%20%2F%3E%3C!--%20OUTPUT%20SECTION%3A%20VIDEO%20--%3E%3Crect%20x%3D%22980%22%20y%3D%22260%22%20width%3D%22200%22%20height%3D%22150%22%20%2F%3E%3Cpolygon%20points%3D%221060%2C300%201060%2C370%201120%2C335%22%20%2F%3E%3Cpath%20d%3D%22M%20980%20440%20L%201180%20440%22%20%2F%3E%3Cpath%20d%3D%22M%201030%20440%20L%201030%20470%20M%201130%20440%20L%201130%20470%22%20%2F%3E%3C!--%20CHECKMARK%20SOLUTION%20--%3E%3Cpath%20stroke%3D%22%2310b981%22%20stroke-width%3D%228%22%20d%3D%22M%201050%20200%20L%201080%20230%20L%201150%20150%22%20%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E",
          "tracedScene": {
            "id": "the-simplified-workflow-5",
            "fps": 30,
            "svg": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%201280%20720%22%20width%3D%221280%22%20height%3D%22720%22%3E%3Cg%20stroke%3D%22black%22%20stroke-width%3D%224%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20fill%3D%22none%22%3E%3C!--%20INPUT%20SECTION%3A%20SCRIPT%20--%3E%3Crect%20x%3D%22100%22%20y%3D%22260%22%20width%3D%22200%22%20height%3D%22200%22%20%2F%3E%3Cpath%20d%3D%22M%20130%20300%20L%20270%20300%20M%20130%20340%20L%20270%20340%20M%20130%20380%20L%20220%20380%22%20%2F%3E%3C!--%20ARROW%201%20--%3E%3Cpath%20d%3D%22M%20340%20360%20L%20440%20360%20M%20420%20340%20L%20440%20360%20L%20420%20380%22%20%2F%3E%3C!--%20PROCESS%20SECTION%3A%20WORKSPACE%20--%3E%3Crect%20x%3D%22480%22%20y%3D%22260%22%20width%3D%22320%22%20height%3D%22200%22%20%2F%3E%3Crect%20x%3D%22510%22%20y%3D%22290%22%20width%3D%22120%22%20height%3D%2280%22%20%2F%3E%3Crect%20x%3D%22650%22%20y%3D%22290%22%20width%3D%22120%22%20height%3D%2280%22%20%2F%3E%3Cpath%20d%3D%22M%20510%20420%20L%20770%20420%22%20%2F%3E%3Ccircle%20cx%3D%22640%22%20cy%3D%22220%22%20r%3D%2230%22%20%2F%3E%3Cpath%20d%3D%22M%20640%20250%20L%20640%20320%20M%20640%20270%20L%20610%20300%20M%20640%20270%20L%20670%20300%20M%20640%20320%20L%20610%20360%20M%20640%20320%20L%20670%20360%22%20%2F%3E%3C!--%20ARROW%202%20--%3E%3Cpath%20d%3D%22M%20840%20360%20L%20940%20360%20M%20920%20340%20L%20940%20360%20L%20920%20380%22%20%2F%3E%3C!--%20OUTPUT%20SECTION%3A%20VIDEO%20--%3E%3Crect%20x%3D%22980%22%20y%3D%22260%22%20width%3D%22200%22%20height%3D%22150%22%20%2F%3E%3Cpolygon%20points%3D%221060%2C300%201060%2C370%201120%2C335%22%20%2F%3E%3Cpath%20d%3D%22M%20980%20440%20L%201180%20440%22%20%2F%3E%3Cpath%20d%3D%22M%201030%20440%20L%201030%20470%20M%201130%20440%20L%201130%20470%22%20%2F%3E%3C!--%20CHECKMARK%20SOLUTION%20--%3E%3Cpath%20stroke%3D%22%2310b981%22%20stroke-width%3D%228%22%20d%3D%22M%201050%20200%20L%201080%20230%20L%201150%20150%22%20%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E",
            "title": "The Simplified Workflow",
            "width": 1280,
            "height": 720,
            "marker": {
              "width": 180,
              "height": 180,
              "tipOffsetX": 136,
              "tipOffsetY": 24,
              "maxTiltDegrees": 15
            },
            "timing": {
              "gapFrames": 0,
              "startFrame": 8,
              "maxDuration": 20,
              "minDuration": 4,
              "endHoldFrames": 45,
              "maxTravelFrames": 6,
              "minTravelFrames": 2,
              "framesPerHundredPx": 5,
              "connectedThresholdPx": 18,
              "travelPixelsPerFrame": 90
            },
            "strokes": [
              {
                "id": "path-1",
                "path": "M 100 260 H 300 V 460 H 100 Z",
                "length": 800,
                "stroke": "black",
                "duration": 20,
                "startFrame": 8,
                "revealWidth": 4,
                "strokeWidth": 4
              },
              {
                "id": "path-2",
                "path": "M 130 300 L 270 300 M 130 340 L 270 340 M 130 380 L 220 380",
                "length": 370,
                "stroke": "black",
                "duration": 19,
                "startFrame": 30,
                "revealWidth": 4,
                "strokeWidth": 4
              },
              {
                "id": "path-3",
                "path": "M 340 360 L 440 360 M 420 340 L 440 360 L 420 380",
                "length": 156.57,
                "stroke": "black",
                "duration": 8,
                "startFrame": 51,
                "revealWidth": 4,
                "strokeWidth": 4
              },
              {
                "id": "path-4",
                "path": "M 480 260 H 800 V 460 H 480 Z",
                "length": 1040,
                "stroke": "black",
                "duration": 20,
                "startFrame": 61,
                "revealWidth": 4,
                "strokeWidth": 4
              },
              {
                "id": "path-5",
                "path": "M 510 290 H 630 V 370 H 510 Z",
                "length": 400,
                "stroke": "black",
                "duration": 20,
                "startFrame": 83,
                "revealWidth": 4,
                "strokeWidth": 4
              },
              {
                "id": "path-6",
                "path": "M 650 290 H 770 V 370 H 650 Z",
                "length": 400,
                "stroke": "black",
                "duration": 20,
                "startFrame": 105,
                "revealWidth": 4,
                "strokeWidth": 4
              },
              {
                "id": "path-7",
                "path": "M 770 420 L 510 420",
                "length": 260,
                "stroke": "black",
                "duration": 13,
                "startFrame": 127,
                "revealWidth": 4,
                "strokeWidth": 4
              },
              {
                "id": "path-8",
                "path": "M 670 220 A 30 30 0 1 0 610 220 A 30 30 0 1 0 670 220 Z",
                "length": 188.49,
                "stroke": "black",
                "duration": 9,
                "startFrame": 143,
                "revealWidth": 4,
                "strokeWidth": 4
              },
              {
                "id": "path-9",
                "path": "M 640 250 L 640 320 M 640 270 L 610 300 M 640 270 L 670 300 M 640 320 L 610 360 M 640 320 L 670 360",
                "length": 254.85,
                "stroke": "black",
                "duration": 13,
                "startFrame": 154,
                "revealWidth": 4,
                "strokeWidth": 4
              },
              {
                "id": "path-10",
                "path": "M 840 360 L 940 360 M 920 340 L 940 360 L 920 380",
                "length": 156.57,
                "stroke": "black",
                "duration": 8,
                "startFrame": 169,
                "revealWidth": 4,
                "strokeWidth": 4
              },
              {
                "id": "path-11",
                "path": "M 980 260 H 1180 V 410 H 980 Z",
                "length": 700,
                "stroke": "black",
                "duration": 20,
                "startFrame": 179,
                "revealWidth": 4,
                "strokeWidth": 4
              },
              {
                "id": "path-12",
                "path": "M 1060 300 L 1060 370 L 1120 335 Z",
                "length": 208.92,
                "stroke": "black",
                "duration": 10,
                "startFrame": 201,
                "revealWidth": 4,
                "strokeWidth": 4
              },
              {
                "id": "path-13",
                "path": "M 980 440 L 1180 440",
                "length": 200,
                "stroke": "black",
                "duration": 10,
                "startFrame": 213,
                "revealWidth": 4,
                "strokeWidth": 4
              },
              {
                "id": "path-14",
                "path": "M 1030 470 L 1030 440 M 1130 470 L 1130 440",
                "length": 60,
                "stroke": "black",
                "duration": 4,
                "startFrame": 225,
                "revealWidth": 4,
                "strokeWidth": 4
              },
              {
                "id": "path-15",
                "path": "M 1050 200 L 1080 230 L 1150 150",
                "length": 148.73,
                "stroke": "#10b981",
                "duration": 7,
                "startFrame": 232,
                "revealWidth": 8,
                "strokeWidth": 8
              }
            ],
            "handAsset": "marker-hand.webp",
            "background": "#ffffff",
            "renderMode": "stroke",
            "scriptText": "Just paste your script, generate scenes, export the MP4. Same day. Same workspace. Same person.",
            "finalSourceSvg": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%201280%20720%22%20width%3D%221280%22%20height%3D%22720%22%3E%3Cg%20stroke%3D%22black%22%20stroke-width%3D%224%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20fill%3D%22none%22%3E%3C!--%20INPUT%20SECTION%3A%20SCRIPT%20--%3E%3Crect%20x%3D%22100%22%20y%3D%22260%22%20width%3D%22200%22%20height%3D%22200%22%20%2F%3E%3Cpath%20d%3D%22M%20130%20300%20L%20270%20300%20M%20130%20340%20L%20270%20340%20M%20130%20380%20L%20220%20380%22%20%2F%3E%3C!--%20ARROW%201%20--%3E%3Cpath%20d%3D%22M%20340%20360%20L%20440%20360%20M%20420%20340%20L%20440%20360%20L%20420%20380%22%20%2F%3E%3C!--%20PROCESS%20SECTION%3A%20WORKSPACE%20--%3E%3Crect%20x%3D%22480%22%20y%3D%22260%22%20width%3D%22320%22%20height%3D%22200%22%20%2F%3E%3Crect%20x%3D%22510%22%20y%3D%22290%22%20width%3D%22120%22%20height%3D%2280%22%20%2F%3E%3Crect%20x%3D%22650%22%20y%3D%22290%22%20width%3D%22120%22%20height%3D%2280%22%20%2F%3E%3Cpath%20d%3D%22M%20510%20420%20L%20770%20420%22%20%2F%3E%3Ccircle%20cx%3D%22640%22%20cy%3D%22220%22%20r%3D%2230%22%20%2F%3E%3Cpath%20d%3D%22M%20640%20250%20L%20640%20320%20M%20640%20270%20L%20610%20300%20M%20640%20270%20L%20670%20300%20M%20640%20320%20L%20610%20360%20M%20640%20320%20L%20670%20360%22%20%2F%3E%3C!--%20ARROW%202%20--%3E%3Cpath%20d%3D%22M%20840%20360%20L%20940%20360%20M%20920%20340%20L%20940%20360%20L%20920%20380%22%20%2F%3E%3C!--%20OUTPUT%20SECTION%3A%20VIDEO%20--%3E%3Crect%20x%3D%22980%22%20y%3D%22260%22%20width%3D%22200%22%20height%3D%22150%22%20%2F%3E%3Cpolygon%20points%3D%221060%2C300%201060%2C370%201120%2C335%22%20%2F%3E%3Cpath%20d%3D%22M%20980%20440%20L%201180%20440%22%20%2F%3E%3Cpath%20d%3D%22M%201030%20440%20L%201030%20470%20M%201130%20440%20L%201130%20470%22%20%2F%3E%3C!--%20CHECKMARK%20SOLUTION%20--%3E%3Cpath%20stroke%3D%22%2310b981%22%20stroke-width%3D%228%22%20d%3D%22M%201050%20200%20L%201080%20230%20L%201150%20150%22%20%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E",
            "durationInFrames": 284,
            "subtitleLimitedTilt": "",
            "audioSrc": "https://adfmmuo6gjjbnu7i.public.blob.vercel-storage.com/generated-audio/storysketch/the-simplified-workflow-1776197383807.mp3"
          }
        }
      ]
    },
    {
      "id": "testing-at-speed-6",
      "title": "Testing at Speed",
      "scriptText": "Which means you can finally test ideas at the speed you come up with them. Stop letting production bottlenecks decide your growth.",
      "selectedVisualOptionId": "minimal-diagram",
      "visualOptions": [
        {
          "id": "minimal-diagram",
          "label": "Minimal",
          "svgDataUrl": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%201280%20720%22%20width%3D%221280%22%20height%3D%22720%22%3E%3Cg%20stroke%3D%22black%22%20stroke-width%3D%224%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20fill%3D%22none%22%3E%3Ccircle%20cx%3D%22300%22%20cy%3D%22300%22%20r%3D%2225%22%2F%3E%3Cpath%20d%3D%22M%20300%20325%20L%20300%20420%22%2F%3E%3Cpath%20d%3D%22M%20300%20350%20L%20260%20390%22%2F%3E%3Cpath%20d%3D%22M%20300%20350%20L%20340%20390%22%2F%3E%3Cpath%20d%3D%22M%20300%20420%20L%20270%20490%22%2F%3E%3Cpath%20d%3D%22M%20300%20420%20L%20330%20490%22%2F%3E%3Cpath%20d%3D%22M%20400%20360%20L%20900%20360%22%2F%3E%3Cpath%20d%3D%22M%20850%20320%20L%20920%20360%20L%20850%20400%22%2F%3E%3Cpath%20d%3D%22M%20450%20320%20L%20450%20345%22%2F%3E%3Cpath%20d%3D%22M%20650%20320%20L%20650%20345%22%2F%3E%3Cpath%20d%3D%22M%20850%20320%20L%20850%20345%22%2F%3E%3Ccircle%20cx%3D%22550%22%20cy%3D%22220%22%20r%3D%2235%22%2F%3E%3Cpath%20d%3D%22M%20550%20185%20L%20550%20200%22%2F%3E%3Cpath%20d%3D%22M%20550%20240%20L%20550%20255%22%2F%3E%3Cpath%20d%3D%22M%20585%20220%20L%20570%20220%22%2F%3E%3Cpath%20d%3D%22M%20515%20220%20L%20530%20220%22%2F%3E%3Cpath%20d%3D%22M%20575%20195%20L%20565%20205%22%2F%3E%3Cpath%20d%3D%22M%20525%20245%20L%20535%20235%22%2F%3E%3Cpath%20d%3D%22M%20575%20245%20L%20565%20235%22%2F%3E%3Cpath%20d%3D%22M%20525%20195%20L%20535%20205%22%2F%3E%3Cpath%20d%3D%22M%201000%20360%20L%201100%20260%22%2F%3E%3Cpath%20d%3D%22M%201060%20260%20L%201100%20260%20L%201100%20300%22%2F%3E%3Cpath%20d%3D%22M%201040%20380%20L%201070%20350%22%2F%3E%3Cpath%20d%3D%22M%201040%20350%20L%201070%20380%22%20stroke%3D%22red%22%20stroke-width%3D%226%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E",
          "tracedScene": {
            "id": "testing-at-speed-6",
            "fps": 30,
            "svg": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%201280%20720%22%20width%3D%221280%22%20height%3D%22720%22%3E%3Cg%20stroke%3D%22black%22%20stroke-width%3D%224%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20fill%3D%22none%22%3E%3Ccircle%20cx%3D%22300%22%20cy%3D%22300%22%20r%3D%2225%22%2F%3E%3Cpath%20d%3D%22M%20300%20325%20L%20300%20420%22%2F%3E%3Cpath%20d%3D%22M%20300%20350%20L%20260%20390%22%2F%3E%3Cpath%20d%3D%22M%20300%20350%20L%20340%20390%22%2F%3E%3Cpath%20d%3D%22M%20300%20420%20L%20270%20490%22%2F%3E%3Cpath%20d%3D%22M%20300%20420%20L%20330%20490%22%2F%3E%3Cpath%20d%3D%22M%20400%20360%20L%20900%20360%22%2F%3E%3Cpath%20d%3D%22M%20850%20320%20L%20920%20360%20L%20850%20400%22%2F%3E%3Cpath%20d%3D%22M%20450%20320%20L%20450%20345%22%2F%3E%3Cpath%20d%3D%22M%20650%20320%20L%20650%20345%22%2F%3E%3Cpath%20d%3D%22M%20850%20320%20L%20850%20345%22%2F%3E%3Ccircle%20cx%3D%22550%22%20cy%3D%22220%22%20r%3D%2235%22%2F%3E%3Cpath%20d%3D%22M%20550%20185%20L%20550%20200%22%2F%3E%3Cpath%20d%3D%22M%20550%20240%20L%20550%20255%22%2F%3E%3Cpath%20d%3D%22M%20585%20220%20L%20570%20220%22%2F%3E%3Cpath%20d%3D%22M%20515%20220%20L%20530%20220%22%2F%3E%3Cpath%20d%3D%22M%20575%20195%20L%20565%20205%22%2F%3E%3Cpath%20d%3D%22M%20525%20245%20L%20535%20235%22%2F%3E%3Cpath%20d%3D%22M%20575%20245%20L%20565%20235%22%2F%3E%3Cpath%20d%3D%22M%20525%20195%20L%20535%20205%22%2F%3E%3Cpath%20d%3D%22M%201000%20360%20L%201100%20260%22%2F%3E%3Cpath%20d%3D%22M%201060%20260%20L%201100%20260%20L%201100%20300%22%2F%3E%3Cpath%20d%3D%22M%201040%20380%20L%201070%20350%22%2F%3E%3Cpath%20d%3D%22M%201040%20350%20L%201070%20380%22%20stroke%3D%22red%22%20stroke-width%3D%226%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E",
            "title": "Testing at Speed",
            "width": 1280,
            "height": 720,
            "marker": {
              "width": 180,
              "height": 180,
              "tipOffsetX": 136,
              "tipOffsetY": 24,
              "maxTiltDegrees": 15
            },
            "timing": {
              "gapFrames": 0,
              "startFrame": 8,
              "maxDuration": 20,
              "minDuration": 4,
              "endHoldFrames": 45,
              "maxTravelFrames": 6,
              "minTravelFrames": 2,
              "framesPerHundredPx": 5,
              "connectedThresholdPx": 18,
              "travelPixelsPerFrame": 90
            },
            "strokes": [
              {
                "id": "path-1",
                "path": "M 325 300 A 25 25 0 1 0 275 300 A 25 25 0 1 0 325 300 Z",
                "length": 157.08,
                "stroke": "black",
                "duration": 8,
                "startFrame": 8,
                "revealWidth": 4,
                "strokeWidth": 4
              },
              {
                "id": "path-2",
                "path": "M 300 325 L 300 420",
                "length": 95,
                "stroke": "black",
                "duration": 5,
                "startFrame": 18,
                "revealWidth": 4,
                "strokeWidth": 4
              },
              {
                "id": "path-3",
                "path": "M 260 390 L 300 350",
                "length": 56.57,
                "stroke": "black",
                "duration": 4,
                "startFrame": 25,
                "revealWidth": 4,
                "strokeWidth": 4
              },
              {
                "id": "path-4",
                "path": "M 300 350 L 340 390",
                "length": 56.57,
                "stroke": "black",
                "duration": 4,
                "startFrame": 29,
                "revealWidth": 4,
                "strokeWidth": 4
              },
              {
                "id": "path-5",
                "path": "M 300 420 L 270 490",
                "length": 76.16,
                "stroke": "black",
                "duration": 4,
                "startFrame": 35,
                "revealWidth": 4,
                "strokeWidth": 4
              },
              {
                "id": "path-6",
                "path": "M 330 490 L 300 420",
                "length": 76.16,
                "stroke": "black",
                "duration": 4,
                "startFrame": 41,
                "revealWidth": 4,
                "strokeWidth": 4
              },
              {
                "id": "path-7",
                "path": "M 400 360 L 900 360",
                "length": 500,
                "stroke": "black",
                "duration": 20,
                "startFrame": 47,
                "revealWidth": 4,
                "strokeWidth": 4
              },
              {
                "id": "path-8",
                "path": "M 850 320 L 920 360 L 850 400",
                "length": 161.25,
                "stroke": "black",
                "duration": 8,
                "startFrame": 69,
                "revealWidth": 4,
                "strokeWidth": 4
              },
              {
                "id": "path-9",
                "path": "M 450 345 L 450 320",
                "length": 25,
                "stroke": "black",
                "duration": 4,
                "startFrame": 81,
                "revealWidth": 4,
                "strokeWidth": 4
              },
              {
                "id": "path-10",
                "path": "M 650 320 L 650 345",
                "length": 25,
                "stroke": "black",
                "duration": 4,
                "startFrame": 87,
                "revealWidth": 4,
                "strokeWidth": 4
              },
              {
                "id": "path-11",
                "path": "M 850 345 L 850 320",
                "length": 25,
                "stroke": "black",
                "duration": 4,
                "startFrame": 93,
                "revealWidth": 4,
                "strokeWidth": 4
              },
              {
                "id": "path-12",
                "path": "M 585 220 A 35 35 0 1 0 515 220 A 35 35 0 1 0 585 220 Z",
                "length": 219.91,
                "stroke": "black",
                "duration": 11,
                "startFrame": 100,
                "revealWidth": 4,
                "strokeWidth": 4
              },
              {
                "id": "path-13",
                "path": "M 550 185 L 550 200",
                "length": 15,
                "stroke": "black",
                "duration": 4,
                "startFrame": 113,
                "revealWidth": 4,
                "strokeWidth": 4
              },
              {
                "id": "path-14",
                "path": "M 550 240 L 550 255",
                "length": 15,
                "stroke": "black",
                "duration": 4,
                "startFrame": 119,
                "revealWidth": 4,
                "strokeWidth": 4
              },
              {
                "id": "path-15",
                "path": "M 585 220 L 570 220",
                "length": 15,
                "stroke": "black",
                "duration": 4,
                "startFrame": 125,
                "revealWidth": 4,
                "strokeWidth": 4
              },
              {
                "id": "path-16",
                "path": "M 515 220 L 530 220",
                "length": 15,
                "stroke": "black",
                "duration": 4,
                "startFrame": 131,
                "revealWidth": 4,
                "strokeWidth": 4
              },
              {
                "id": "path-17",
                "path": "M 575 195 L 565 205",
                "length": 14.14,
                "stroke": "black",
                "duration": 4,
                "startFrame": 137,
                "revealWidth": 4,
                "strokeWidth": 4
              },
              {
                "id": "path-18",
                "path": "M 525 245 L 535 235",
                "length": 14.14,
                "stroke": "black",
                "duration": 4,
                "startFrame": 143,
                "revealWidth": 4,
                "strokeWidth": 4
              },
              {
                "id": "path-19",
                "path": "M 575 245 L 565 235",
                "length": 14.14,
                "stroke": "black",
                "duration": 4,
                "startFrame": 149,
                "revealWidth": 4,
                "strokeWidth": 4
              },
              {
                "id": "path-20",
                "path": "M 525 195 L 535 205",
                "length": 14.14,
                "stroke": "black",
                "duration": 4,
                "startFrame": 155,
                "revealWidth": 4,
                "strokeWidth": 4
              },
              {
                "id": "path-21",
                "path": "M 1000 360 L 1100 260",
                "length": 141.42,
                "stroke": "black",
                "duration": 7,
                "startFrame": 164,
                "revealWidth": 4,
                "strokeWidth": 4
              },
              {
                "id": "path-22",
                "path": "M 1060 260 L 1100 260 L 1100 300",
                "length": 80,
                "stroke": "black",
                "duration": 4,
                "startFrame": 173,
                "revealWidth": 4,
                "strokeWidth": 4
              },
              {
                "id": "path-23",
                "path": "M 1070 350 L 1040 380",
                "length": 42.43,
                "stroke": "black",
                "duration": 4,
                "startFrame": 179,
                "revealWidth": 4,
                "strokeWidth": 4
              },
              {
                "id": "path-24",
                "path": "M 1040 350 L 1070 380",
                "length": 42.43,
                "stroke": "red",
                "duration": 4,
                "startFrame": 185,
                "revealWidth": 6,
                "strokeWidth": 6
              }
            ],
            "handAsset": "marker-hand.webp",
            "background": "#ffffff",
            "renderMode": "stroke",
            "scriptText": "Which means you can finally test ideas at the speed you come up with them. Stop letting production bottlenecks decide your growth.",
            "finalSourceSvg": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%201280%20720%22%20width%3D%221280%22%20height%3D%22720%22%3E%3Cg%20stroke%3D%22black%22%20stroke-width%3D%224%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20fill%3D%22none%22%3E%3Ccircle%20cx%3D%22300%22%20cy%3D%22300%22%20r%3D%2225%22%2F%3E%3Cpath%20d%3D%22M%20300%20325%20L%20300%20420%22%2F%3E%3Cpath%20d%3D%22M%20300%20350%20L%20260%20390%22%2F%3E%3Cpath%20d%3D%22M%20300%20350%20L%20340%20390%22%2F%3E%3Cpath%20d%3D%22M%20300%20420%20L%20270%20490%22%2F%3E%3Cpath%20d%3D%22M%20300%20420%20L%20330%20490%22%2F%3E%3Cpath%20d%3D%22M%20400%20360%20L%20900%20360%22%2F%3E%3Cpath%20d%3D%22M%20850%20320%20L%20920%20360%20L%20850%20400%22%2F%3E%3Cpath%20d%3D%22M%20450%20320%20L%20450%20345%22%2F%3E%3Cpath%20d%3D%22M%20650%20320%20L%20650%20345%22%2F%3E%3Cpath%20d%3D%22M%20850%20320%20L%20850%20345%22%2F%3E%3Ccircle%20cx%3D%22550%22%20cy%3D%22220%22%20r%3D%2235%22%2F%3E%3Cpath%20d%3D%22M%20550%20185%20L%20550%20200%22%2F%3E%3Cpath%20d%3D%22M%20550%20240%20L%20550%20255%22%2F%3E%3Cpath%20d%3D%22M%20585%20220%20L%20570%20220%22%2F%3E%3Cpath%20d%3D%22M%20515%20220%20L%20530%20220%22%2F%3E%3Cpath%20d%3D%22M%20575%20195%20L%20565%20205%22%2F%3E%3Cpath%20d%3D%22M%20525%20245%20L%20535%20235%22%2F%3E%3Cpath%20d%3D%22M%20575%20245%20L%20565%20235%22%2F%3E%3Cpath%20d%3D%22M%20525%20195%20L%20535%20205%22%2F%3E%3Cpath%20d%3D%22M%201000%20360%20L%201100%20260%22%2F%3E%3Cpath%20d%3D%22M%201060%20260%20L%201100%20260%20L%201100%20300%22%2F%3E%3Cpath%20d%3D%22M%201040%20380%20L%201070%20350%22%2F%3E%3Cpath%20d%3D%22M%201040%20350%20L%201070%20380%22%20stroke%3D%22red%22%20stroke-width%3D%226%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E",
            "durationInFrames": 234,
            "subtitleLimitedTilt": "",
            "audioSrc": "https://adfmmuo6gjjbnu7i.public.blob.vercel-storage.com/generated-audio/storysketch/testing-at-speed-1776197385556.mp3"
          }
        },
        {
          "id": "story-moment",
          "label": "Story",
          "svgDataUrl": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%201280%20720%22%20width%3D%221280%22%20height%3D%22720%22%3E%3Cg%20stroke%3D%22black%22%20stroke-width%3D%226%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20fill%3D%22none%22%3E%3Cg%20id%3D%22person-running%22%3E%3Ccircle%20cx%3D%22300%22%20cy%3D%22300%22%20r%3D%2240%22%2F%3E%3Cpath%20d%3D%22M%20300%20340%20L%20300%20480%22%2F%3E%3Cpath%20d%3D%22M%20300%20380%20L%20380%20340%20L%20440%20300%22%2F%3E%3Cpath%20d%3D%22M%20300%20380%20L%20220%20420%20L%20180%20460%22%2F%3E%3Cpath%20d%3D%22M%20300%20480%20L%20360%20560%20L%20420%20540%22%2F%3E%3Cpath%20d%3D%22M%20300%20480%20L%20240%20560%20L%20180%20560%22%2F%3E%3C%2Fg%3E%3Cg%20id%3D%22speed-lines%22%3E%3Cpath%20d%3D%22M%20100%20320%20L%20180%20320%22%2F%3E%3Cpath%20d%3D%22M%2080%20380%20L%20160%20380%22%2F%3E%3Cpath%20d%3D%22M%20100%20440%20L%20180%20440%22%2F%3E%3C%2Fg%3E%3Cg%20id%3D%22lightbulb-idea%22%3E%3Cpath%20d%3D%22M%20600%20300%20C%20600%20240%2C%20700%20240%2C%20700%20300%20C%20700%20340%2C%20670%20360%2C%20650%20380%20L%20650%20420%20L%20650%20420%22%2F%3E%3Cpath%20d%3D%22M%20650%20420%20L%20650%20450%22%2F%3E%3Cpath%20d%3D%22M%20620%20450%20L%20680%20450%22%2F%3E%3Cpath%20d%3D%22M%20630%20465%20L%20670%20465%22%2F%3E%3Cpath%20d%3D%22M%20650%20220%20L%20650%20180%22%2F%3E%3Cpath%20d%3D%22M%20740%20260%20L%20780%20240%22%2F%3E%3Cpath%20d%3D%22M%20560%20260%20L%20520%20240%22%2F%3E%3C%2Fg%3E%3Cg%20id%3D%22growth-arrow%22%3E%3Cpath%20d%3D%22M%20850%20500%20L%201100%20200%22%2F%3E%3Cpath%20d%3D%22M%201020%20200%20L%201100%20200%20L%201100%20280%22%2F%3E%3C%2Fg%3E%3Cg%20id%3D%22bottleneck-broken-wall%22%20stroke%3D%22%23FF0000%22%3E%3Cpath%20d%3D%22M%20850%20350%20L%20900%20400%22%2F%3E%3Cpath%20d%3D%22M%20900%20350%20L%20850%20400%22%2F%3E%3Cpath%20d%3D%22M%20850%20450%20L%20900%20500%22%2F%3E%3Cpath%20d%3D%22M%20900%20450%20L%20850%20500%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E",
          "tracedScene": {
            "id": "testing-at-speed-6",
            "fps": 30,
            "svg": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%201280%20720%22%20width%3D%221280%22%20height%3D%22720%22%3E%3Cg%20stroke%3D%22black%22%20stroke-width%3D%226%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20fill%3D%22none%22%3E%3Cg%20id%3D%22person-running%22%3E%3Ccircle%20cx%3D%22300%22%20cy%3D%22300%22%20r%3D%2240%22%2F%3E%3Cpath%20d%3D%22M%20300%20340%20L%20300%20480%22%2F%3E%3Cpath%20d%3D%22M%20300%20380%20L%20380%20340%20L%20440%20300%22%2F%3E%3Cpath%20d%3D%22M%20300%20380%20L%20220%20420%20L%20180%20460%22%2F%3E%3Cpath%20d%3D%22M%20300%20480%20L%20360%20560%20L%20420%20540%22%2F%3E%3Cpath%20d%3D%22M%20300%20480%20L%20240%20560%20L%20180%20560%22%2F%3E%3C%2Fg%3E%3Cg%20id%3D%22speed-lines%22%3E%3Cpath%20d%3D%22M%20100%20320%20L%20180%20320%22%2F%3E%3Cpath%20d%3D%22M%2080%20380%20L%20160%20380%22%2F%3E%3Cpath%20d%3D%22M%20100%20440%20L%20180%20440%22%2F%3E%3C%2Fg%3E%3Cg%20id%3D%22lightbulb-idea%22%3E%3Cpath%20d%3D%22M%20600%20300%20C%20600%20240%2C%20700%20240%2C%20700%20300%20C%20700%20340%2C%20670%20360%2C%20650%20380%20L%20650%20420%20L%20650%20420%22%2F%3E%3Cpath%20d%3D%22M%20650%20420%20L%20650%20450%22%2F%3E%3Cpath%20d%3D%22M%20620%20450%20L%20680%20450%22%2F%3E%3Cpath%20d%3D%22M%20630%20465%20L%20670%20465%22%2F%3E%3Cpath%20d%3D%22M%20650%20220%20L%20650%20180%22%2F%3E%3Cpath%20d%3D%22M%20740%20260%20L%20780%20240%22%2F%3E%3Cpath%20d%3D%22M%20560%20260%20L%20520%20240%22%2F%3E%3C%2Fg%3E%3Cg%20id%3D%22growth-arrow%22%3E%3Cpath%20d%3D%22M%20850%20500%20L%201100%20200%22%2F%3E%3Cpath%20d%3D%22M%201020%20200%20L%201100%20200%20L%201100%20280%22%2F%3E%3C%2Fg%3E%3Cg%20id%3D%22bottleneck-broken-wall%22%20stroke%3D%22%23FF0000%22%3E%3Cpath%20d%3D%22M%20850%20350%20L%20900%20400%22%2F%3E%3Cpath%20d%3D%22M%20900%20350%20L%20850%20400%22%2F%3E%3Cpath%20d%3D%22M%20850%20450%20L%20900%20500%22%2F%3E%3Cpath%20d%3D%22M%20900%20450%20L%20850%20500%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E",
            "title": "Testing at Speed",
            "width": 1280,
            "height": 720,
            "marker": {
              "width": 180,
              "height": 180,
              "tipOffsetX": 136,
              "tipOffsetY": 24,
              "maxTiltDegrees": 15
            },
            "timing": {
              "gapFrames": 0,
              "startFrame": 8,
              "maxDuration": 20,
              "minDuration": 4,
              "endHoldFrames": 45,
              "maxTravelFrames": 6,
              "minTravelFrames": 2,
              "framesPerHundredPx": 5,
              "connectedThresholdPx": 18,
              "travelPixelsPerFrame": 90
            },
            "strokes": [
              {
                "id": "path-1",
                "path": "M 340 300 A 40 40 0 1 0 260 300 A 40 40 0 1 0 340 300 Z",
                "length": 251.33,
                "stroke": "black",
                "duration": 13,
                "startFrame": 8,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-2",
                "path": "M 300 340 L 300 480",
                "length": 140,
                "stroke": "black",
                "duration": 7,
                "startFrame": 23,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-3",
                "path": "M 300 380 L 380 340 L 440 300",
                "length": 161.55,
                "stroke": "black",
                "duration": 8,
                "startFrame": 32,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-4",
                "path": "M 300 380 L 220 420 L 180 460",
                "length": 146.01,
                "stroke": "black",
                "duration": 7,
                "startFrame": 42,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-5",
                "path": "M 300 480 L 360 560 L 420 540",
                "length": 163.25,
                "stroke": "black",
                "duration": 8,
                "startFrame": 51,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-6",
                "path": "M 300 480 L 240 560 L 180 560",
                "length": 160,
                "stroke": "black",
                "duration": 8,
                "startFrame": 61,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-7",
                "path": "M 180 320 L 100 320",
                "length": 80,
                "stroke": "black",
                "duration": 4,
                "startFrame": 72,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-8",
                "path": "M 80 380 L 160 380",
                "length": 80,
                "stroke": "black",
                "duration": 4,
                "startFrame": 78,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-9",
                "path": "M 180 440 L 100 440",
                "length": 80,
                "stroke": "black",
                "duration": 4,
                "startFrame": 84,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-10",
                "path": "M 600 300 C 600 240, 700 240, 700 300 C 700 340, 670 360, 650 380 L 650 420 L 650 420",
                "length": 288.44,
                "stroke": "black",
                "duration": 14,
                "startFrame": 94,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-11",
                "path": "M 650 420 L 650 450",
                "length": 30,
                "stroke": "black",
                "duration": 4,
                "startFrame": 108,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-12",
                "path": "M 620 450 L 680 450",
                "length": 60,
                "stroke": "black",
                "duration": 4,
                "startFrame": 114,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-13",
                "path": "M 670 465 L 630 465",
                "length": 40,
                "stroke": "black",
                "duration": 4,
                "startFrame": 120,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-14",
                "path": "M 650 220 L 650 180",
                "length": 40,
                "stroke": "black",
                "duration": 4,
                "startFrame": 127,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-15",
                "path": "M 740 260 L 780 240",
                "length": 44.72,
                "stroke": "black",
                "duration": 4,
                "startFrame": 133,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-16",
                "path": "M 560 260 L 520 240",
                "length": 44.72,
                "stroke": "black",
                "duration": 4,
                "startFrame": 139,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-17",
                "path": "M 850 500 L 1100 200",
                "length": 390.51,
                "stroke": "black",
                "duration": 20,
                "startFrame": 148,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-18",
                "path": "M 1020 200 L 1100 200 L 1100 280",
                "length": 160,
                "stroke": "black",
                "duration": 8,
                "startFrame": 170,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-19",
                "path": "M 900 400 L 850 350",
                "length": 70.71,
                "stroke": "#FF0000",
                "duration": 4,
                "startFrame": 181,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-20",
                "path": "M 900 350 L 850 400",
                "length": 70.71,
                "stroke": "#FF0000",
                "duration": 4,
                "startFrame": 187,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-21",
                "path": "M 850 450 L 900 500",
                "length": 70.71,
                "stroke": "#FF0000",
                "duration": 4,
                "startFrame": 193,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-22",
                "path": "M 900 450 L 850 500",
                "length": 70.71,
                "stroke": "#FF0000",
                "duration": 4,
                "startFrame": 199,
                "revealWidth": 6,
                "strokeWidth": 6
              }
            ],
            "handAsset": "marker-hand.webp",
            "background": "#ffffff",
            "renderMode": "stroke",
            "scriptText": "Which means you can finally test ideas at the speed you come up with them. Stop letting production bottlenecks decide your growth.",
            "finalSourceSvg": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%201280%20720%22%20width%3D%221280%22%20height%3D%22720%22%3E%3Cg%20stroke%3D%22black%22%20stroke-width%3D%226%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20fill%3D%22none%22%3E%3Cg%20id%3D%22person-running%22%3E%3Ccircle%20cx%3D%22300%22%20cy%3D%22300%22%20r%3D%2240%22%2F%3E%3Cpath%20d%3D%22M%20300%20340%20L%20300%20480%22%2F%3E%3Cpath%20d%3D%22M%20300%20380%20L%20380%20340%20L%20440%20300%22%2F%3E%3Cpath%20d%3D%22M%20300%20380%20L%20220%20420%20L%20180%20460%22%2F%3E%3Cpath%20d%3D%22M%20300%20480%20L%20360%20560%20L%20420%20540%22%2F%3E%3Cpath%20d%3D%22M%20300%20480%20L%20240%20560%20L%20180%20560%22%2F%3E%3C%2Fg%3E%3Cg%20id%3D%22speed-lines%22%3E%3Cpath%20d%3D%22M%20100%20320%20L%20180%20320%22%2F%3E%3Cpath%20d%3D%22M%2080%20380%20L%20160%20380%22%2F%3E%3Cpath%20d%3D%22M%20100%20440%20L%20180%20440%22%2F%3E%3C%2Fg%3E%3Cg%20id%3D%22lightbulb-idea%22%3E%3Cpath%20d%3D%22M%20600%20300%20C%20600%20240%2C%20700%20240%2C%20700%20300%20C%20700%20340%2C%20670%20360%2C%20650%20380%20L%20650%20420%20L%20650%20420%22%2F%3E%3Cpath%20d%3D%22M%20650%20420%20L%20650%20450%22%2F%3E%3Cpath%20d%3D%22M%20620%20450%20L%20680%20450%22%2F%3E%3Cpath%20d%3D%22M%20630%20465%20L%20670%20465%22%2F%3E%3Cpath%20d%3D%22M%20650%20220%20L%20650%20180%22%2F%3E%3Cpath%20d%3D%22M%20740%20260%20L%20780%20240%22%2F%3E%3Cpath%20d%3D%22M%20560%20260%20L%20520%20240%22%2F%3E%3C%2Fg%3E%3Cg%20id%3D%22growth-arrow%22%3E%3Cpath%20d%3D%22M%20850%20500%20L%201100%20200%22%2F%3E%3Cpath%20d%3D%22M%201020%20200%20L%201100%20200%20L%201100%20280%22%2F%3E%3C%2Fg%3E%3Cg%20id%3D%22bottleneck-broken-wall%22%20stroke%3D%22%23FF0000%22%3E%3Cpath%20d%3D%22M%20850%20350%20L%20900%20400%22%2F%3E%3Cpath%20d%3D%22M%20900%20350%20L%20850%20400%22%2F%3E%3Cpath%20d%3D%22M%20850%20450%20L%20900%20500%22%2F%3E%3Cpath%20d%3D%22M%20900%20450%20L%20850%20500%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E",
            "durationInFrames": 248,
            "subtitleLimitedTilt": "",
            "audioSrc": "https://adfmmuo6gjjbnu7i.public.blob.vercel-storage.com/generated-audio/storysketch/testing-at-speed-1776197385556.mp3"
          }
        },
        {
          "id": "process-sketch",
          "label": "Process",
          "svgDataUrl": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%201280%20720%22%20width%3D%221280%22%20height%3D%22720%22%3E%3Cg%20stroke%3D%22black%22%20stroke-width%3D%228%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20fill%3D%22none%22%3E%3Cg%20id%3D%22bottleneck-blocked%22%3E%3Cpath%20d%3D%22M%20150%20450%20L%20350%20450%22%20%2F%3E%3Cpath%20d%3D%22M%20150%20250%20L%20350%20250%22%20%2F%3E%3Cpath%20d%3D%22M%20350%20450%20L%20400%20400%20L%20400%20300%20L%20350%20250%22%20%2F%3E%3Cpath%20d%3D%22M%20400%20300%20L%20550%20300%22%20%2F%3E%3Cpath%20d%3D%22M%20400%20400%20L%20550%20400%22%20%2F%3E%3Cpath%20d%3D%22M%20200%20350%20L%20300%20350%22%20stroke-width%3D%2212%22%20%2F%3E%3Cpath%20d%3D%22M%20300%20350%20L%20280%20330%22%20stroke-width%3D%2212%22%20%2F%3E%3Cpath%20d%3D%22M%20300%20350%20L%20280%20370%22%20stroke-width%3D%2212%22%20%2F%3E%3Cpath%20d%3D%22M%20430%20310%20L%20470%20390%22%20stroke%3D%22%23e63946%22%20stroke-width%3D%2210%22%20%2F%3E%3Cpath%20d%3D%22M%20470%20310%20L%20430%20390%22%20stroke%3D%22%23e63946%22%20stroke-width%3D%2210%22%20%2F%3E%3C%2Fg%3E%3Cpath%20d%3D%22M%20580%20350%20L%20700%20350%22%20stroke-width%3D%2210%22%20%2F%3E%3Cpath%20d%3D%22M%20700%20350%20L%20670%20320%22%20stroke-width%3D%2210%22%20%2F%3E%3Cpath%20d%3D%22M%20700%20350%20L%20670%20380%22%20stroke-width%3D%2210%22%20%2F%3E%3Cg%20id%3D%22flow-success%22%3E%3Ccircle%20cx%3D%22800%22%20cy%3D%22350%22%20r%3D%2250%22%20%2F%3E%3Cpath%20d%3D%22M%20780%20350%20L%20795%20365%20L%20825%20335%22%20stroke%3D%22%232a9d8f%22%20stroke-width%3D%2210%22%20%2F%3E%3Cpath%20d%3D%22M%20850%20350%20L%201100%20350%22%20stroke-dasharray%3D%2220%2C20%22%20%2F%3E%3Cpath%20d%3D%22M%201100%20350%20L%201070%20320%22%20%2F%3E%3Cpath%20d%3D%22M%201100%20350%20L%201070%20380%22%20%2F%3E%3Cpath%20d%3D%22M%20950%20300%20L%201050%20200%22%20stroke-width%3D%2212%22%20%2F%3E%3Cpath%20d%3D%22M%201050%20200%20L%201000%20200%22%20stroke-width%3D%2212%22%20%2F%3E%3Cpath%20d%3D%22M%201050%20200%20L%201050%20250%22%20stroke-width%3D%2212%22%20%2F%3E%3C%2Fg%3E%3Cg%20id%3D%22labels%22%20stroke%3D%22none%22%20fill%3D%22black%22%3E%3Cpath%20d%3D%22M%20210%20500%20L%20215%20500%20L%20215%20520%20L%20210%20520%20Z%20M%20218%20505%20L%20230%20505%20L%20230%20510%20L%20218%20510%20L%20218%20515%20L%20232%20515%20L%20232%20520%20L%20213%20520%20L%20213%20500%20L%20232%20500%20L%20232%20505%20Z%22%20%2F%3E%3Ccircle%20cx%3D%22250%22%20cy%3D%22510%22%20r%3D%223%22%20%2F%3E%3Ccircle%20cx%3D%22800%22%20cy%3D%22450%22%20r%3D%223%22%20%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E",
          "tracedScene": {
            "id": "testing-at-speed-6",
            "fps": 30,
            "svg": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%201280%20720%22%20width%3D%221280%22%20height%3D%22720%22%3E%3Cg%20stroke%3D%22black%22%20stroke-width%3D%228%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20fill%3D%22none%22%3E%3Cg%20id%3D%22bottleneck-blocked%22%3E%3Cpath%20d%3D%22M%20150%20450%20L%20350%20450%22%20%2F%3E%3Cpath%20d%3D%22M%20150%20250%20L%20350%20250%22%20%2F%3E%3Cpath%20d%3D%22M%20350%20450%20L%20400%20400%20L%20400%20300%20L%20350%20250%22%20%2F%3E%3Cpath%20d%3D%22M%20400%20300%20L%20550%20300%22%20%2F%3E%3Cpath%20d%3D%22M%20400%20400%20L%20550%20400%22%20%2F%3E%3Cpath%20d%3D%22M%20200%20350%20L%20300%20350%22%20stroke-width%3D%2212%22%20%2F%3E%3Cpath%20d%3D%22M%20300%20350%20L%20280%20330%22%20stroke-width%3D%2212%22%20%2F%3E%3Cpath%20d%3D%22M%20300%20350%20L%20280%20370%22%20stroke-width%3D%2212%22%20%2F%3E%3Cpath%20d%3D%22M%20430%20310%20L%20470%20390%22%20stroke%3D%22%23e63946%22%20stroke-width%3D%2210%22%20%2F%3E%3Cpath%20d%3D%22M%20470%20310%20L%20430%20390%22%20stroke%3D%22%23e63946%22%20stroke-width%3D%2210%22%20%2F%3E%3C%2Fg%3E%3Cpath%20d%3D%22M%20580%20350%20L%20700%20350%22%20stroke-width%3D%2210%22%20%2F%3E%3Cpath%20d%3D%22M%20700%20350%20L%20670%20320%22%20stroke-width%3D%2210%22%20%2F%3E%3Cpath%20d%3D%22M%20700%20350%20L%20670%20380%22%20stroke-width%3D%2210%22%20%2F%3E%3Cg%20id%3D%22flow-success%22%3E%3Ccircle%20cx%3D%22800%22%20cy%3D%22350%22%20r%3D%2250%22%20%2F%3E%3Cpath%20d%3D%22M%20780%20350%20L%20795%20365%20L%20825%20335%22%20stroke%3D%22%232a9d8f%22%20stroke-width%3D%2210%22%20%2F%3E%3Cpath%20d%3D%22M%20850%20350%20L%201100%20350%22%20stroke-dasharray%3D%2220%2C20%22%20%2F%3E%3Cpath%20d%3D%22M%201100%20350%20L%201070%20320%22%20%2F%3E%3Cpath%20d%3D%22M%201100%20350%20L%201070%20380%22%20%2F%3E%3Cpath%20d%3D%22M%20950%20300%20L%201050%20200%22%20stroke-width%3D%2212%22%20%2F%3E%3Cpath%20d%3D%22M%201050%20200%20L%201000%20200%22%20stroke-width%3D%2212%22%20%2F%3E%3Cpath%20d%3D%22M%201050%20200%20L%201050%20250%22%20stroke-width%3D%2212%22%20%2F%3E%3C%2Fg%3E%3Cg%20id%3D%22labels%22%20stroke%3D%22none%22%20fill%3D%22black%22%3E%3Cpath%20d%3D%22M%20210%20500%20L%20215%20500%20L%20215%20520%20L%20210%20520%20Z%20M%20218%20505%20L%20230%20505%20L%20230%20510%20L%20218%20510%20L%20218%20515%20L%20232%20515%20L%20232%20520%20L%20213%20520%20L%20213%20500%20L%20232%20500%20L%20232%20505%20Z%22%20%2F%3E%3Ccircle%20cx%3D%22250%22%20cy%3D%22510%22%20r%3D%223%22%20%2F%3E%3Ccircle%20cx%3D%22800%22%20cy%3D%22450%22%20r%3D%223%22%20%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E",
            "title": "Testing at Speed",
            "width": 1280,
            "height": 720,
            "marker": {
              "width": 180,
              "height": 180,
              "tipOffsetX": 136,
              "tipOffsetY": 24,
              "maxTiltDegrees": 15
            },
            "timing": {
              "gapFrames": 0,
              "startFrame": 8,
              "maxDuration": 20,
              "minDuration": 4,
              "endHoldFrames": 45,
              "maxTravelFrames": 6,
              "minTravelFrames": 2,
              "framesPerHundredPx": 5,
              "connectedThresholdPx": 18,
              "travelPixelsPerFrame": 90
            },
            "strokes": [
              {
                "id": "path-1",
                "path": "M 150 450 L 350 450",
                "length": 200,
                "stroke": "black",
                "duration": 10,
                "startFrame": 8,
                "revealWidth": 8,
                "strokeWidth": 8
              },
              {
                "id": "path-2",
                "path": "M 350 250 L 150 250",
                "length": 200,
                "stroke": "black",
                "duration": 10,
                "startFrame": 20,
                "revealWidth": 8,
                "strokeWidth": 8
              },
              {
                "id": "path-3",
                "path": "M 350 250 L 400 300 L 400 400 L 350 450",
                "length": 241.42,
                "stroke": "black",
                "duration": 12,
                "startFrame": 32,
                "revealWidth": 8,
                "strokeWidth": 8
              },
              {
                "id": "path-4",
                "path": "M 400 300 L 550 300",
                "length": 150,
                "stroke": "black",
                "duration": 8,
                "startFrame": 46,
                "revealWidth": 8,
                "strokeWidth": 8
              },
              {
                "id": "path-5",
                "path": "M 550 400 L 400 400",
                "length": 150,
                "stroke": "black",
                "duration": 8,
                "startFrame": 56,
                "revealWidth": 8,
                "strokeWidth": 8
              },
              {
                "id": "path-6",
                "path": "M 300 350 L 200 350",
                "length": 100,
                "stroke": "black",
                "duration": 5,
                "startFrame": 66,
                "revealWidth": 12,
                "strokeWidth": 12
              },
              {
                "id": "path-7",
                "path": "M 280 330 L 300 350",
                "length": 28.28,
                "stroke": "black",
                "duration": 4,
                "startFrame": 73,
                "revealWidth": 12,
                "strokeWidth": 12
              },
              {
                "id": "path-8",
                "path": "M 300 350 L 280 370",
                "length": 28.28,
                "stroke": "black",
                "duration": 4,
                "startFrame": 77,
                "revealWidth": 12,
                "strokeWidth": 12
              },
              {
                "id": "path-9",
                "path": "M 430 310 L 470 390",
                "length": 89.44,
                "stroke": "#e63946",
                "duration": 4,
                "startFrame": 83,
                "revealWidth": 10,
                "strokeWidth": 10
              },
              {
                "id": "path-10",
                "path": "M 430 390 L 470 310",
                "length": 89.44,
                "stroke": "#e63946",
                "duration": 4,
                "startFrame": 89,
                "revealWidth": 10,
                "strokeWidth": 10
              },
              {
                "id": "path-11",
                "path": "M 580 350 L 700 350",
                "length": 120,
                "stroke": "black",
                "duration": 6,
                "startFrame": 95,
                "revealWidth": 10,
                "strokeWidth": 10
              },
              {
                "id": "path-12",
                "path": "M 700 350 L 670 320",
                "length": 42.43,
                "stroke": "black",
                "duration": 4,
                "startFrame": 101,
                "revealWidth": 10,
                "strokeWidth": 10
              },
              {
                "id": "path-13",
                "path": "M 700 350 L 670 380",
                "length": 42.43,
                "stroke": "black",
                "duration": 4,
                "startFrame": 107,
                "revealWidth": 10,
                "strokeWidth": 10
              },
              {
                "id": "path-14",
                "path": "M 850 350 A 50 50 0 1 0 750 350 A 50 50 0 1 0 850 350 Z",
                "length": 314.16,
                "stroke": "black",
                "duration": 16,
                "startFrame": 113,
                "revealWidth": 8,
                "strokeWidth": 8
              },
              {
                "id": "path-15",
                "path": "M 825 335 L 795 365 L 780 350",
                "length": 63.64,
                "stroke": "#2a9d8f",
                "duration": 4,
                "startFrame": 131,
                "revealWidth": 10,
                "strokeWidth": 10
              },
              {
                "id": "path-16",
                "path": "M 850 350 L 1100 350",
                "length": 250,
                "stroke": "black",
                "duration": 13,
                "startFrame": 137,
                "revealWidth": 8,
                "strokeWidth": 8
              },
              {
                "id": "path-17",
                "path": "M 1100 350 L 1070 320",
                "length": 42.43,
                "stroke": "black",
                "duration": 4,
                "startFrame": 150,
                "revealWidth": 8,
                "strokeWidth": 8
              },
              {
                "id": "path-18",
                "path": "M 1100 350 L 1070 380",
                "length": 42.43,
                "stroke": "black",
                "duration": 4,
                "startFrame": 156,
                "revealWidth": 8,
                "strokeWidth": 8
              },
              {
                "id": "path-19",
                "path": "M 950 300 L 1050 200",
                "length": 141.42,
                "stroke": "black",
                "duration": 7,
                "startFrame": 162,
                "revealWidth": 12,
                "strokeWidth": 12
              },
              {
                "id": "path-20",
                "path": "M 1050 200 L 1000 200",
                "length": 50,
                "stroke": "black",
                "duration": 4,
                "startFrame": 169,
                "revealWidth": 12,
                "strokeWidth": 12
              },
              {
                "id": "path-21",
                "path": "M 1050 200 L 1050 250",
                "length": 50,
                "stroke": "black",
                "duration": 4,
                "startFrame": 175,
                "revealWidth": 12,
                "strokeWidth": 12
              },
              {
                "id": "path-22",
                "path": "M 210 500 L 215 500 L 215 520 L 210 520 Z M 218 505 L 230 505 L 230 510 L 218 510 L 218 515 L 232 515 L 232 520 L 213 520 L 213 500 L 232 500 L 232 505 Z",
                "length": 180,
                "stroke": "black",
                "duration": 9,
                "startFrame": 185,
                "revealWidth": 8,
                "strokeWidth": 8
              },
              {
                "id": "path-23",
                "path": "M 253 510 A 3 3 0 1 0 247 510 A 3 3 0 1 0 253 510 Z",
                "length": 18.85,
                "stroke": "black",
                "duration": 4,
                "startFrame": 196,
                "revealWidth": 8,
                "strokeWidth": 8
              },
              {
                "id": "path-24",
                "path": "M 803 450 A 3 3 0 1 0 797 450 A 3 3 0 1 0 803 450 Z",
                "length": 18.85,
                "stroke": "black",
                "duration": 4,
                "startFrame": 206,
                "revealWidth": 8,
                "strokeWidth": 8
              }
            ],
            "handAsset": "marker-hand.webp",
            "background": "#ffffff",
            "renderMode": "stroke",
            "scriptText": "Which means you can finally test ideas at the speed you come up with them. Stop letting production bottlenecks decide your growth.",
            "finalSourceSvg": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%201280%20720%22%20width%3D%221280%22%20height%3D%22720%22%3E%3Cg%20stroke%3D%22black%22%20stroke-width%3D%228%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20fill%3D%22none%22%3E%3Cg%20id%3D%22bottleneck-blocked%22%3E%3Cpath%20d%3D%22M%20150%20450%20L%20350%20450%22%20%2F%3E%3Cpath%20d%3D%22M%20150%20250%20L%20350%20250%22%20%2F%3E%3Cpath%20d%3D%22M%20350%20450%20L%20400%20400%20L%20400%20300%20L%20350%20250%22%20%2F%3E%3Cpath%20d%3D%22M%20400%20300%20L%20550%20300%22%20%2F%3E%3Cpath%20d%3D%22M%20400%20400%20L%20550%20400%22%20%2F%3E%3Cpath%20d%3D%22M%20200%20350%20L%20300%20350%22%20stroke-width%3D%2212%22%20%2F%3E%3Cpath%20d%3D%22M%20300%20350%20L%20280%20330%22%20stroke-width%3D%2212%22%20%2F%3E%3Cpath%20d%3D%22M%20300%20350%20L%20280%20370%22%20stroke-width%3D%2212%22%20%2F%3E%3Cpath%20d%3D%22M%20430%20310%20L%20470%20390%22%20stroke%3D%22%23e63946%22%20stroke-width%3D%2210%22%20%2F%3E%3Cpath%20d%3D%22M%20470%20310%20L%20430%20390%22%20stroke%3D%22%23e63946%22%20stroke-width%3D%2210%22%20%2F%3E%3C%2Fg%3E%3Cpath%20d%3D%22M%20580%20350%20L%20700%20350%22%20stroke-width%3D%2210%22%20%2F%3E%3Cpath%20d%3D%22M%20700%20350%20L%20670%20320%22%20stroke-width%3D%2210%22%20%2F%3E%3Cpath%20d%3D%22M%20700%20350%20L%20670%20380%22%20stroke-width%3D%2210%22%20%2F%3E%3Cg%20id%3D%22flow-success%22%3E%3Ccircle%20cx%3D%22800%22%20cy%3D%22350%22%20r%3D%2250%22%20%2F%3E%3Cpath%20d%3D%22M%20780%20350%20L%20795%20365%20L%20825%20335%22%20stroke%3D%22%232a9d8f%22%20stroke-width%3D%2210%22%20%2F%3E%3Cpath%20d%3D%22M%20850%20350%20L%201100%20350%22%20stroke-dasharray%3D%2220%2C20%22%20%2F%3E%3Cpath%20d%3D%22M%201100%20350%20L%201070%20320%22%20%2F%3E%3Cpath%20d%3D%22M%201100%20350%20L%201070%20380%22%20%2F%3E%3Cpath%20d%3D%22M%20950%20300%20L%201050%20200%22%20stroke-width%3D%2212%22%20%2F%3E%3Cpath%20d%3D%22M%201050%20200%20L%201000%20200%22%20stroke-width%3D%2212%22%20%2F%3E%3Cpath%20d%3D%22M%201050%20200%20L%201050%20250%22%20stroke-width%3D%2212%22%20%2F%3E%3C%2Fg%3E%3Cg%20id%3D%22labels%22%20stroke%3D%22none%22%20fill%3D%22black%22%3E%3Cpath%20d%3D%22M%20210%20500%20L%20215%20500%20L%20215%20520%20L%20210%20520%20Z%20M%20218%20505%20L%20230%20505%20L%20230%20510%20L%20218%20510%20L%20218%20515%20L%20232%20515%20L%20232%20520%20L%20213%20520%20L%20213%20500%20L%20232%20500%20L%20232%20505%20Z%22%20%2F%3E%3Ccircle%20cx%3D%22250%22%20cy%3D%22510%22%20r%3D%223%22%20%2F%3E%3Ccircle%20cx%3D%22800%22%20cy%3D%22450%22%20r%3D%223%22%20%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E",
            "durationInFrames": 255,
            "subtitleLimitedTilt": "",
            "audioSrc": "https://adfmmuo6gjjbnu7i.public.blob.vercel-storage.com/generated-audio/storysketch/testing-at-speed-1776197385556.mp3"
          }
        }
      ]
    },
    {
      "id": "call-to-action-7",
      "title": "Call to Action",
      "scriptText": "Click below and turn your next script into a video in the next 15 minutes.",
      "selectedVisualOptionId": "process-sketch",
      "visualOptions": [
        {
          "id": "minimal-diagram",
          "label": "Minimal",
          "svgDataUrl": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%201280%20720%22%20width%3D%221280%22%20height%3D%22720%22%3E%3Cg%20stroke%3D%22black%22%20stroke-width%3D%226%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20fill%3D%22none%22%3E%3Crect%20x%3D%22440%22%20y%3D%22480%22%20width%3D%22400%22%20height%3D%22100%22%20rx%3D%2215%22%20ry%3D%2215%22%2F%3E%3Cpath%20d%3D%22M%20640%20505%20L%20640%20555%20M%20610%20530%20L%20670%20530%22%2F%3E%3Cpath%20d%3D%22M%20640%20180%20L%20640%20380%22%2F%3E%3Cpath%20d%3D%22M%20600%20340%20L%20640%20385%20L%20680%20340%22%2F%3E%3Ccircle%20cx%3D%22640%22%20cy%3D%22120%22%20r%3D%2240%22%2F%3E%3Cpath%20d%3D%22M%20615%20110%20L%20635%20135%20L%20665%2095%22%20stroke%3D%22%232EA44E%22%20stroke-width%3D%228%22%2F%3E%3Ccircle%20cx%3D%22400%22%20cy%3D%22200%22%20r%3D%2215%22%2F%3E%3Ccircle%20cx%3D%22880%22%20cy%3D%22200%22%20r%3D%2215%22%2F%3E%3Ccircle%20cx%3D%22500%22%20cy%3D%22350%22%20r%3D%2210%22%2F%3E%3Ccircle%20cx%3D%22780%22%20cy%3D%22350%22%20r%3D%2210%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E",
          "tracedScene": {
            "id": "call-to-action-7",
            "fps": 30,
            "svg": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%201280%20720%22%20width%3D%221280%22%20height%3D%22720%22%3E%3Cg%20stroke%3D%22black%22%20stroke-width%3D%226%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20fill%3D%22none%22%3E%3Crect%20x%3D%22440%22%20y%3D%22480%22%20width%3D%22400%22%20height%3D%22100%22%20rx%3D%2215%22%20ry%3D%2215%22%2F%3E%3Cpath%20d%3D%22M%20640%20505%20L%20640%20555%20M%20610%20530%20L%20670%20530%22%2F%3E%3Cpath%20d%3D%22M%20640%20180%20L%20640%20380%22%2F%3E%3Cpath%20d%3D%22M%20600%20340%20L%20640%20385%20L%20680%20340%22%2F%3E%3Ccircle%20cx%3D%22640%22%20cy%3D%22120%22%20r%3D%2240%22%2F%3E%3Cpath%20d%3D%22M%20615%20110%20L%20635%20135%20L%20665%2095%22%20stroke%3D%22%232EA44E%22%20stroke-width%3D%228%22%2F%3E%3Ccircle%20cx%3D%22400%22%20cy%3D%22200%22%20r%3D%2215%22%2F%3E%3Ccircle%20cx%3D%22880%22%20cy%3D%22200%22%20r%3D%2215%22%2F%3E%3Ccircle%20cx%3D%22500%22%20cy%3D%22350%22%20r%3D%2210%22%2F%3E%3Ccircle%20cx%3D%22780%22%20cy%3D%22350%22%20r%3D%2210%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E",
            "title": "Call to Action",
            "width": 1280,
            "height": 720,
            "marker": {
              "width": 180,
              "height": 180,
              "tipOffsetX": 136,
              "tipOffsetY": 24,
              "maxTiltDegrees": 15
            },
            "timing": {
              "gapFrames": 0,
              "startFrame": 8,
              "maxDuration": 20,
              "minDuration": 4,
              "endHoldFrames": 45,
              "maxTravelFrames": 6,
              "minTravelFrames": 2,
              "framesPerHundredPx": 5,
              "connectedThresholdPx": 18,
              "travelPixelsPerFrame": 90
            },
            "strokes": [
              {
                "id": "path-1",
                "path": "M 440 480 H 840 V 580 H 440 Z",
                "length": 1000,
                "stroke": "black",
                "duration": 20,
                "startFrame": 8,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-2",
                "path": "M 640 505 L 640 555 M 610 530 L 670 530",
                "length": 110,
                "stroke": "black",
                "duration": 6,
                "startFrame": 30,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-3",
                "path": "M 640 380 L 640 180",
                "length": 200,
                "stroke": "black",
                "duration": 10,
                "startFrame": 38,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-4",
                "path": "M 600 340 L 640 385 L 680 340",
                "length": 120.42,
                "stroke": "black",
                "duration": 6,
                "startFrame": 50,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-5",
                "path": "M 680 120 A 40 40 0 1 0 600 120 A 40 40 0 1 0 680 120 Z",
                "length": 251.33,
                "stroke": "black",
                "duration": 13,
                "startFrame": 58,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-6",
                "path": "M 665 95 L 635 135 L 615 110",
                "length": 82.02,
                "stroke": "#2EA44E",
                "duration": 4,
                "startFrame": 73,
                "revealWidth": 8,
                "strokeWidth": 8
              },
              {
                "id": "path-7",
                "path": "M 415 200 A 15 15 0 1 0 385 200 A 15 15 0 1 0 415 200 Z",
                "length": 94.25,
                "stroke": "black",
                "duration": 5,
                "startFrame": 79,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-8",
                "path": "M 895 200 A 15 15 0 1 0 865 200 A 15 15 0 1 0 895 200 Z",
                "length": 94.25,
                "stroke": "black",
                "duration": 5,
                "startFrame": 89,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-9",
                "path": "M 510 350 A 10 10 0 1 0 490 350 A 10 10 0 1 0 510 350 Z",
                "length": 62.83,
                "stroke": "black",
                "duration": 4,
                "startFrame": 99,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-10",
                "path": "M 790 350 A 10 10 0 1 0 770 350 A 10 10 0 1 0 790 350 Z",
                "length": 62.83,
                "stroke": "black",
                "duration": 4,
                "startFrame": 106,
                "revealWidth": 6,
                "strokeWidth": 6
              }
            ],
            "handAsset": "marker-hand.webp",
            "background": "#ffffff",
            "renderMode": "stroke",
            "scriptText": "Click below and turn your next script into a video in the next 15 minutes.",
            "finalSourceSvg": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%201280%20720%22%20width%3D%221280%22%20height%3D%22720%22%3E%3Cg%20stroke%3D%22black%22%20stroke-width%3D%226%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20fill%3D%22none%22%3E%3Crect%20x%3D%22440%22%20y%3D%22480%22%20width%3D%22400%22%20height%3D%22100%22%20rx%3D%2215%22%20ry%3D%2215%22%2F%3E%3Cpath%20d%3D%22M%20640%20505%20L%20640%20555%20M%20610%20530%20L%20670%20530%22%2F%3E%3Cpath%20d%3D%22M%20640%20180%20L%20640%20380%22%2F%3E%3Cpath%20d%3D%22M%20600%20340%20L%20640%20385%20L%20680%20340%22%2F%3E%3Ccircle%20cx%3D%22640%22%20cy%3D%22120%22%20r%3D%2240%22%2F%3E%3Cpath%20d%3D%22M%20615%20110%20L%20635%20135%20L%20665%2095%22%20stroke%3D%22%232EA44E%22%20stroke-width%3D%228%22%2F%3E%3Ccircle%20cx%3D%22400%22%20cy%3D%22200%22%20r%3D%2215%22%2F%3E%3Ccircle%20cx%3D%22880%22%20cy%3D%22200%22%20r%3D%2215%22%2F%3E%3Ccircle%20cx%3D%22500%22%20cy%3D%22350%22%20r%3D%2210%22%2F%3E%3Ccircle%20cx%3D%22780%22%20cy%3D%22350%22%20r%3D%2210%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E",
            "durationInFrames": 155,
            "subtitleLimitedTilt": "",
            "audioSrc": "https://adfmmuo6gjjbnu7i.public.blob.vercel-storage.com/generated-audio/storysketch/call-to-action-1776197386846.mp3"
          }
        },
        {
          "id": "story-moment",
          "label": "Story",
          "svgDataUrl": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%201280%20720%22%20width%3D%221280%22%20height%3D%22720%22%3E%3Cg%20stroke%3D%22black%22%20stroke-width%3D%226%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20fill%3D%22none%22%3E%3Ccircle%20id%3D%22head%22%20cx%3D%22300%22%20cy%3D%22250%22%20r%3D%2240%22%2F%3E%3Cpath%20id%3D%22body%22%20d%3D%22M%20300%20290%20L%20300%20480%22%2F%3E%3Cpath%20id%3D%22left-arm%22%20d%3D%22M%20300%20340%20L%20220%20420%22%2F%3E%3Cpath%20id%3D%22right-arm%22%20d%3D%22M%20300%20340%20L%20450%20340%20L%20580%20480%22%2F%3E%3Cpath%20id%3D%22left-leg%22%20d%3D%22M%20300%20480%20L%20240%20620%22%2F%3E%3Cpath%20id%3D%22right-leg%22%20d%3D%22M%20300%20480%20L%20360%20620%22%2F%3E%3Crect%20id%3D%22button-box%22%20x%3D%22600%22%20y%3D%22480%22%20width%3D%22300%22%20height%3D%22100%22%20rx%3D%2210%22%20ry%3D%2210%22%2F%3E%3Cpath%20id%3D%22cursor%22%20d%3D%22M%20610%20510%20L%20580%20480%20L%20600%20535%20Z%22%20fill%3D%22black%22%2F%3E%3Cpath%20id%3D%22play-triangle%22%20d%3D%22M%20730%20510%20L%20730%20550%20L%20770%20530%20Z%22%20fill%3D%22black%22%2F%3E%3Cpath%20id%3D%22arrow-curve%22%20d%3D%22M%20800%20200%20C%20950%20200%20950%20400%20900%20480%22%2F%3E%3Cpath%20id%3D%22arrow-head%22%20d%3D%22M%20880%20460%20L%20900%20480%20L%20920%20455%22%2F%3E%3Crect%20id%3D%22video-screen%22%20x%3D%22750%22%20y%3D%22100%22%20width%3D%22240%22%20height%3D%22140%22%2F%3E%3Cpath%20id%3D%22video-lines%22%20d%3D%22M%20770%20140%20L%20970%20140%20M%20770%20170%20L%20920%20170%20M%20770%20200%20L%20850%20200%22%2F%3E%3Cpath%20id%3D%22time-clock-circle%22%20cx%3D%221050%22%20cy%3D%22530%22%20r%3D%2250%22%2F%3E%3Ccircle%20cx%3D%221050%22%20cy%3D%22530%22%20r%3D%2250%22%2F%3E%3Cpath%20id%3D%22clock-hands%22%20d%3D%22M%201050%20530%20L%201050%20500%20M%201050%20530%20L%201080%20530%22%2F%3E%3Cpath%20id%3D%22time-label%22%20d%3D%22M%201010%20610%20L%201010%20630%20M%201025%20610%20L%201025%20630%20M%201045%20610%20L%201070%20610%20M%201057%20610%20L%201057%20630%20M%201085%20610%20L%201105%20610%20M%201085%20620%20L%201105%20620%20M%201085%20630%20L%201105%20630%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E",
          "tracedScene": {
            "id": "call-to-action-7",
            "fps": 30,
            "svg": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%201280%20720%22%20width%3D%221280%22%20height%3D%22720%22%3E%3Cg%20stroke%3D%22black%22%20stroke-width%3D%226%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20fill%3D%22none%22%3E%3Ccircle%20id%3D%22head%22%20cx%3D%22300%22%20cy%3D%22250%22%20r%3D%2240%22%2F%3E%3Cpath%20id%3D%22body%22%20d%3D%22M%20300%20290%20L%20300%20480%22%2F%3E%3Cpath%20id%3D%22left-arm%22%20d%3D%22M%20300%20340%20L%20220%20420%22%2F%3E%3Cpath%20id%3D%22right-arm%22%20d%3D%22M%20300%20340%20L%20450%20340%20L%20580%20480%22%2F%3E%3Cpath%20id%3D%22left-leg%22%20d%3D%22M%20300%20480%20L%20240%20620%22%2F%3E%3Cpath%20id%3D%22right-leg%22%20d%3D%22M%20300%20480%20L%20360%20620%22%2F%3E%3Crect%20id%3D%22button-box%22%20x%3D%22600%22%20y%3D%22480%22%20width%3D%22300%22%20height%3D%22100%22%20rx%3D%2210%22%20ry%3D%2210%22%2F%3E%3Cpath%20id%3D%22cursor%22%20d%3D%22M%20610%20510%20L%20580%20480%20L%20600%20535%20Z%22%20fill%3D%22black%22%2F%3E%3Cpath%20id%3D%22play-triangle%22%20d%3D%22M%20730%20510%20L%20730%20550%20L%20770%20530%20Z%22%20fill%3D%22black%22%2F%3E%3Cpath%20id%3D%22arrow-curve%22%20d%3D%22M%20800%20200%20C%20950%20200%20950%20400%20900%20480%22%2F%3E%3Cpath%20id%3D%22arrow-head%22%20d%3D%22M%20880%20460%20L%20900%20480%20L%20920%20455%22%2F%3E%3Crect%20id%3D%22video-screen%22%20x%3D%22750%22%20y%3D%22100%22%20width%3D%22240%22%20height%3D%22140%22%2F%3E%3Cpath%20id%3D%22video-lines%22%20d%3D%22M%20770%20140%20L%20970%20140%20M%20770%20170%20L%20920%20170%20M%20770%20200%20L%20850%20200%22%2F%3E%3Cpath%20id%3D%22time-clock-circle%22%20cx%3D%221050%22%20cy%3D%22530%22%20r%3D%2250%22%2F%3E%3Ccircle%20cx%3D%221050%22%20cy%3D%22530%22%20r%3D%2250%22%2F%3E%3Cpath%20id%3D%22clock-hands%22%20d%3D%22M%201050%20530%20L%201050%20500%20M%201050%20530%20L%201080%20530%22%2F%3E%3Cpath%20id%3D%22time-label%22%20d%3D%22M%201010%20610%20L%201010%20630%20M%201025%20610%20L%201025%20630%20M%201045%20610%20L%201070%20610%20M%201057%20610%20L%201057%20630%20M%201085%20610%20L%201105%20610%20M%201085%20620%20L%201105%20620%20M%201085%20630%20L%201105%20630%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E",
            "title": "Call to Action",
            "width": 1280,
            "height": 720,
            "marker": {
              "width": 180,
              "height": 180,
              "tipOffsetX": 136,
              "tipOffsetY": 24,
              "maxTiltDegrees": 15
            },
            "timing": {
              "gapFrames": 0,
              "startFrame": 8,
              "maxDuration": 20,
              "minDuration": 4,
              "endHoldFrames": 45,
              "maxTravelFrames": 6,
              "minTravelFrames": 2,
              "framesPerHundredPx": 5,
              "connectedThresholdPx": 18,
              "travelPixelsPerFrame": 90
            },
            "strokes": [
              {
                "id": "head",
                "path": "M 340 250 A 40 40 0 1 0 260 250 A 40 40 0 1 0 340 250 Z",
                "length": 251.33,
                "stroke": "black",
                "duration": 13,
                "startFrame": 8,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "body",
                "path": "M 300 290 L 300 480",
                "length": 190,
                "stroke": "black",
                "duration": 10,
                "startFrame": 23,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "left-arm",
                "path": "M 220 420 L 300 340",
                "length": 113.14,
                "stroke": "black",
                "duration": 6,
                "startFrame": 35,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "right-arm",
                "path": "M 300 340 L 450 340 L 580 480",
                "length": 341.05,
                "stroke": "black",
                "duration": 17,
                "startFrame": 41,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "left-leg",
                "path": "M 300 480 L 240 620",
                "length": 152.32,
                "stroke": "black",
                "duration": 8,
                "startFrame": 61,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "right-leg",
                "path": "M 360 620 L 300 480",
                "length": 152.32,
                "stroke": "black",
                "duration": 8,
                "startFrame": 71,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "button-box",
                "path": "M 600 480 H 900 V 580 H 600 Z",
                "length": 800,
                "stroke": "black",
                "duration": 20,
                "startFrame": 82,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "cursor",
                "path": "M 610 510 L 580 480 L 600 535 Z",
                "length": 127.88,
                "stroke": "black",
                "duration": 6,
                "startFrame": 104,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "play-triangle",
                "path": "M 730 510 L 730 550 L 770 530 Z",
                "length": 129.44,
                "stroke": "black",
                "duration": 6,
                "startFrame": 112,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "arrow-curve",
                "path": "M 900 480 C 950 400 950 200 800 200",
                "length": 357.85,
                "stroke": "black",
                "duration": 18,
                "startFrame": 120,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "arrow-head",
                "path": "M 880 460 L 900 480 L 920 455",
                "length": 60.3,
                "stroke": "black",
                "duration": 4,
                "startFrame": 141,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "video-screen",
                "path": "M 750 100 H 990 V 240 H 750 Z",
                "length": 760,
                "stroke": "black",
                "duration": 20,
                "startFrame": 149,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "video-lines",
                "path": "M 770 140 L 970 140 M 770 170 L 920 170 M 770 200 L 850 200",
                "length": 430,
                "stroke": "black",
                "duration": 20,
                "startFrame": 171,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-15",
                "path": "M 1100 530 A 50 50 0 1 0 1000 530 A 50 50 0 1 0 1100 530 Z",
                "length": 314.16,
                "stroke": "black",
                "duration": 16,
                "startFrame": 196,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "clock-hands",
                "path": "M 1050 500 L 1050 530 M 1080 530 L 1050 530",
                "length": 60,
                "stroke": "black",
                "duration": 4,
                "startFrame": 214,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "time-label",
                "path": "M 1010 610 L 1010 630 M 1025 610 L 1025 630 M 1045 610 L 1070 610 M 1057 610 L 1057 630 M 1085 610 L 1105 610 M 1085 620 L 1105 620 M 1085 630 L 1105 630",
                "length": 145,
                "stroke": "black",
                "duration": 7,
                "startFrame": 220,
                "revealWidth": 6,
                "strokeWidth": 6
              }
            ],
            "handAsset": "marker-hand.webp",
            "background": "#ffffff",
            "renderMode": "stroke",
            "scriptText": "Click below and turn your next script into a video in the next 15 minutes.",
            "finalSourceSvg": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%201280%20720%22%20width%3D%221280%22%20height%3D%22720%22%3E%3Cg%20stroke%3D%22black%22%20stroke-width%3D%226%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20fill%3D%22none%22%3E%3Ccircle%20id%3D%22head%22%20cx%3D%22300%22%20cy%3D%22250%22%20r%3D%2240%22%2F%3E%3Cpath%20id%3D%22body%22%20d%3D%22M%20300%20290%20L%20300%20480%22%2F%3E%3Cpath%20id%3D%22left-arm%22%20d%3D%22M%20300%20340%20L%20220%20420%22%2F%3E%3Cpath%20id%3D%22right-arm%22%20d%3D%22M%20300%20340%20L%20450%20340%20L%20580%20480%22%2F%3E%3Cpath%20id%3D%22left-leg%22%20d%3D%22M%20300%20480%20L%20240%20620%22%2F%3E%3Cpath%20id%3D%22right-leg%22%20d%3D%22M%20300%20480%20L%20360%20620%22%2F%3E%3Crect%20id%3D%22button-box%22%20x%3D%22600%22%20y%3D%22480%22%20width%3D%22300%22%20height%3D%22100%22%20rx%3D%2210%22%20ry%3D%2210%22%2F%3E%3Cpath%20id%3D%22cursor%22%20d%3D%22M%20610%20510%20L%20580%20480%20L%20600%20535%20Z%22%20fill%3D%22black%22%2F%3E%3Cpath%20id%3D%22play-triangle%22%20d%3D%22M%20730%20510%20L%20730%20550%20L%20770%20530%20Z%22%20fill%3D%22black%22%2F%3E%3Cpath%20id%3D%22arrow-curve%22%20d%3D%22M%20800%20200%20C%20950%20200%20950%20400%20900%20480%22%2F%3E%3Cpath%20id%3D%22arrow-head%22%20d%3D%22M%20880%20460%20L%20900%20480%20L%20920%20455%22%2F%3E%3Crect%20id%3D%22video-screen%22%20x%3D%22750%22%20y%3D%22100%22%20width%3D%22240%22%20height%3D%22140%22%2F%3E%3Cpath%20id%3D%22video-lines%22%20d%3D%22M%20770%20140%20L%20970%20140%20M%20770%20170%20L%20920%20170%20M%20770%20200%20L%20850%20200%22%2F%3E%3Cpath%20id%3D%22time-clock-circle%22%20cx%3D%221050%22%20cy%3D%22530%22%20r%3D%2250%22%2F%3E%3Ccircle%20cx%3D%221050%22%20cy%3D%22530%22%20r%3D%2250%22%2F%3E%3Cpath%20id%3D%22clock-hands%22%20d%3D%22M%201050%20530%20L%201050%20500%20M%201050%20530%20L%201080%20530%22%2F%3E%3Cpath%20id%3D%22time-label%22%20d%3D%22M%201010%20610%20L%201010%20630%20M%201025%20610%20L%201025%20630%20M%201045%20610%20L%201070%20610%20M%201057%20610%20L%201057%20630%20M%201085%20610%20L%201105%20610%20M%201085%20620%20L%201105%20620%20M%201085%20630%20L%201105%20630%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E",
            "durationInFrames": 272,
            "subtitleLimitedTilt": "",
            "audioSrc": "https://adfmmuo6gjjbnu7i.public.blob.vercel-storage.com/generated-audio/storysketch/call-to-action-1776197386846.mp3"
          }
        },
        {
          "id": "process-sketch",
          "label": "Process",
          "svgDataUrl": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%201280%20720%22%20width%3D%221280%22%20height%3D%22720%22%3E%3Cg%20stroke%3D%22black%22%20stroke-width%3D%226%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20fill%3D%22none%22%3E%3Cpath%20d%3D%22M%20100%20200%20L%20300%20200%20L%20300%20400%20L%20100%20400%20Z%22%2F%3E%3Cpath%20d%3D%22M%20120%20230%20L%20280%20230%22%2F%3E%3Cpath%20d%3D%22M%20120%20260%20L%20250%20260%22%2F%3E%3Cpath%20d%3D%22M%20120%20290%20L%20270%20290%22%2F%3E%3Cpath%20d%3D%22M%20120%20320%20L%20200%20320%22%2F%3E%3Cpath%20d%3D%22M%20400%20300%20L%20550%20300%22%2F%3E%3Cpath%20d%3D%22M%20530%20280%20L%20560%20300%20L%20530%20320%22%2F%3E%3Crect%20x%3D%22650%22%20y%3D%22200%22%20width%3D%22300%22%20height%3D%22200%22%2F%3E%3Cpath%20d%3D%22M%20650%20350%20L%20950%20350%22%2F%3E%3Ccircle%20cx%3D%22800%22%20cy%3D%22270%22%20r%3D%2230%22%2F%3E%3Cpath%20d%3D%22M%20780%20270%20L%20820%20270%22%2F%3E%3Cpath%20d%3D%22M%20800%20250%20L%20800%20290%22%2F%3E%3Cpath%20d%3D%22M%20850%20375%20L%20850%20390%22%2F%3E%3Ccircle%20cx%3D%22850%22%20cy%3D%22375%22%20r%3D%224%22%2F%3E%3Cpath%20d%3D%22M%20500%20500%20L%20780%20500%20L%20780%20580%20L%20500%20580%20Z%22%2F%3E%3Cpath%20d%3D%22M%20580%20520%20L%20620%20560%20L%20700%20520%22%20stroke%3D%22%2322c55e%22%20stroke-width%3D%2210%22%2F%3E%3Cpath%20d%3D%22M%20420%20540%20L%20480%20540%22%2F%3E%3Cpath%20d%3D%22M%20460%20520%20L%20490%20540%20L%20460%20560%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E",
          "tracedScene": {
            "id": "call-to-action-7",
            "fps": 30,
            "svg": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%201280%20720%22%20width%3D%221280%22%20height%3D%22720%22%3E%3Cg%20stroke%3D%22black%22%20stroke-width%3D%226%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20fill%3D%22none%22%3E%3Cpath%20d%3D%22M%20100%20200%20L%20300%20200%20L%20300%20400%20L%20100%20400%20Z%22%2F%3E%3Cpath%20d%3D%22M%20120%20230%20L%20280%20230%22%2F%3E%3Cpath%20d%3D%22M%20120%20260%20L%20250%20260%22%2F%3E%3Cpath%20d%3D%22M%20120%20290%20L%20270%20290%22%2F%3E%3Cpath%20d%3D%22M%20120%20320%20L%20200%20320%22%2F%3E%3Cpath%20d%3D%22M%20400%20300%20L%20550%20300%22%2F%3E%3Cpath%20d%3D%22M%20530%20280%20L%20560%20300%20L%20530%20320%22%2F%3E%3Crect%20x%3D%22650%22%20y%3D%22200%22%20width%3D%22300%22%20height%3D%22200%22%2F%3E%3Cpath%20d%3D%22M%20650%20350%20L%20950%20350%22%2F%3E%3Ccircle%20cx%3D%22800%22%20cy%3D%22270%22%20r%3D%2230%22%2F%3E%3Cpath%20d%3D%22M%20780%20270%20L%20820%20270%22%2F%3E%3Cpath%20d%3D%22M%20800%20250%20L%20800%20290%22%2F%3E%3Cpath%20d%3D%22M%20850%20375%20L%20850%20390%22%2F%3E%3Ccircle%20cx%3D%22850%22%20cy%3D%22375%22%20r%3D%224%22%2F%3E%3Cpath%20d%3D%22M%20500%20500%20L%20780%20500%20L%20780%20580%20L%20500%20580%20Z%22%2F%3E%3Cpath%20d%3D%22M%20580%20520%20L%20620%20560%20L%20700%20520%22%20stroke%3D%22%2322c55e%22%20stroke-width%3D%2210%22%2F%3E%3Cpath%20d%3D%22M%20420%20540%20L%20480%20540%22%2F%3E%3Cpath%20d%3D%22M%20460%20520%20L%20490%20540%20L%20460%20560%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E",
            "title": "Call to Action",
            "width": 1280,
            "height": 720,
            "marker": {
              "width": 180,
              "height": 180,
              "tipOffsetX": 136,
              "tipOffsetY": 24,
              "maxTiltDegrees": 15
            },
            "timing": {
              "gapFrames": 0,
              "startFrame": 8,
              "maxDuration": 20,
              "minDuration": 4,
              "endHoldFrames": 45,
              "maxTravelFrames": 6,
              "minTravelFrames": 2,
              "framesPerHundredPx": 5,
              "connectedThresholdPx": 18,
              "travelPixelsPerFrame": 90
            },
            "strokes": [
              {
                "id": "path-1",
                "path": "M 100 200 L 300 200 L 300 400 L 100 400 Z",
                "length": 800,
                "stroke": "black",
                "duration": 20,
                "startFrame": 8,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-2",
                "path": "M 120 230 L 280 230",
                "length": 160,
                "stroke": "black",
                "duration": 8,
                "startFrame": 30,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-3",
                "path": "M 250 260 L 120 260",
                "length": 130,
                "stroke": "black",
                "duration": 7,
                "startFrame": 40,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-4",
                "path": "M 120 290 L 270 290",
                "length": 150,
                "stroke": "black",
                "duration": 8,
                "startFrame": 49,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-5",
                "path": "M 200 320 L 120 320",
                "length": 80,
                "stroke": "black",
                "duration": 4,
                "startFrame": 59,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-6",
                "path": "M 400 300 L 550 300",
                "length": 150,
                "stroke": "black",
                "duration": 8,
                "startFrame": 66,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-7",
                "path": "M 530 280 L 560 300 L 530 320",
                "length": 72.11,
                "stroke": "black",
                "duration": 4,
                "startFrame": 76,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-8",
                "path": "M 650 200 H 950 V 400 H 650 Z",
                "length": 1000,
                "stroke": "black",
                "duration": 20,
                "startFrame": 82,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-9",
                "path": "M 650 350 L 950 350",
                "length": 300,
                "stroke": "black",
                "duration": 15,
                "startFrame": 104,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-10",
                "path": "M 830 270 A 30 30 0 1 0 770 270 A 30 30 0 1 0 830 270 Z",
                "length": 188.49,
                "stroke": "black",
                "duration": 9,
                "startFrame": 121,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-11",
                "path": "M 820 270 L 780 270",
                "length": 40,
                "stroke": "black",
                "duration": 4,
                "startFrame": 130,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-12",
                "path": "M 800 250 L 800 290",
                "length": 40,
                "stroke": "black",
                "duration": 4,
                "startFrame": 136,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-13",
                "path": "M 850 375 L 850 390",
                "length": 15,
                "stroke": "black",
                "duration": 4,
                "startFrame": 142,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-14",
                "path": "M 854 375 A 4 4 0 1 0 846 375 A 4 4 0 1 0 854 375 Z",
                "length": 25.13,
                "stroke": "black",
                "duration": 4,
                "startFrame": 146,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-15",
                "path": "M 500 500 L 780 500 L 780 580 L 500 580 Z",
                "length": 720,
                "stroke": "black",
                "duration": 20,
                "startFrame": 154,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-16",
                "path": "M 580 520 L 620 560 L 700 520",
                "length": 146.01,
                "stroke": "#22c55e",
                "duration": 7,
                "startFrame": 176,
                "revealWidth": 10,
                "strokeWidth": 10
              },
              {
                "id": "path-17",
                "path": "M 480 540 L 420 540",
                "length": 60,
                "stroke": "black",
                "duration": 4,
                "startFrame": 185,
                "revealWidth": 6,
                "strokeWidth": 6
              },
              {
                "id": "path-18",
                "path": "M 460 520 L 490 540 L 460 560",
                "length": 72.11,
                "stroke": "black",
                "duration": 4,
                "startFrame": 191,
                "revealWidth": 6,
                "strokeWidth": 6
              }
            ],
            "handAsset": "marker-hand.webp",
            "background": "#ffffff",
            "renderMode": "stroke",
            "scriptText": "Click below and turn your next script into a video in the next 15 minutes.",
            "finalSourceSvg": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%201280%20720%22%20width%3D%221280%22%20height%3D%22720%22%3E%3Cg%20stroke%3D%22black%22%20stroke-width%3D%226%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20fill%3D%22none%22%3E%3Cpath%20d%3D%22M%20100%20200%20L%20300%20200%20L%20300%20400%20L%20100%20400%20Z%22%2F%3E%3Cpath%20d%3D%22M%20120%20230%20L%20280%20230%22%2F%3E%3Cpath%20d%3D%22M%20120%20260%20L%20250%20260%22%2F%3E%3Cpath%20d%3D%22M%20120%20290%20L%20270%20290%22%2F%3E%3Cpath%20d%3D%22M%20120%20320%20L%20200%20320%22%2F%3E%3Cpath%20d%3D%22M%20400%20300%20L%20550%20300%22%2F%3E%3Cpath%20d%3D%22M%20530%20280%20L%20560%20300%20L%20530%20320%22%2F%3E%3Crect%20x%3D%22650%22%20y%3D%22200%22%20width%3D%22300%22%20height%3D%22200%22%2F%3E%3Cpath%20d%3D%22M%20650%20350%20L%20950%20350%22%2F%3E%3Ccircle%20cx%3D%22800%22%20cy%3D%22270%22%20r%3D%2230%22%2F%3E%3Cpath%20d%3D%22M%20780%20270%20L%20820%20270%22%2F%3E%3Cpath%20d%3D%22M%20800%20250%20L%20800%20290%22%2F%3E%3Cpath%20d%3D%22M%20850%20375%20L%20850%20390%22%2F%3E%3Ccircle%20cx%3D%22850%22%20cy%3D%22375%22%20r%3D%224%22%2F%3E%3Cpath%20d%3D%22M%20500%20500%20L%20780%20500%20L%20780%20580%20L%20500%20580%20Z%22%2F%3E%3Cpath%20d%3D%22M%20580%20520%20L%20620%20560%20L%20700%20520%22%20stroke%3D%22%2322c55e%22%20stroke-width%3D%2210%22%2F%3E%3Cpath%20d%3D%22M%20420%20540%20L%20480%20540%22%2F%3E%3Cpath%20d%3D%22M%20460%20520%20L%20490%20540%20L%20460%20560%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E",
            "durationInFrames": 240,
            "subtitleLimitedTilt": "",
            "audioSrc": "https://adfmmuo6gjjbnu7i.public.blob.vercel-storage.com/generated-audio/storysketch/call-to-action-1776197386846.mp3"
          }
        }
      ]
    }
  ]
};
