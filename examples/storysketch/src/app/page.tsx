import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import { StorySketchLogo } from "@/components/storysketch-logo";
import { HeroInteractiveDemo } from "@/components/hero-interactive-demo";
import { Button } from "@/components/ui/button";
import { getSession } from "@/lib/session";

const proofPoints = [
  "Script to video in minutes",
  "AI voiceover included",
  "Download-ready MP4 ads",
];

const painScenarios = [
  "You finally get a good ad idea, then lose momentum waiting on editing, voiceover, visuals, and revisions.",
  "Every useful script turns into a handoff between writers, editors, voice tools, and revision threads.",
  "Your ads fatigue faster than your team can produce new angles to test.",
];

const features = [
  {
    title: "Script-to-video in one workflow",
    body: "Paste a marketing script and generate scene beats, narration, whiteboard visuals, animation, and an MP4 export from the same workspace.",
  },
  {
    title: "Built for educational ads",
    body: "Create videos that teach the problem, frame the mechanism, and make the pitch easier to understand before a prospect ever books a call.",
  },
  {
    title: "Editable enough to be useful",
    body: "Adjust scene text, switch voices, compare visual directions, regenerate scenes, and keep the process fast without a heavy timeline editor.",
  },
  {
    title: "A cheaper path than full AI video",
    body: "Whiteboard animation avoids the cost and inconsistency of generating full AI video while still giving you a finished ad asset.",
  },
];

const steps = [
  {
    label: "Paste your script",
    body: "Start with the ad angle, problem explanation, sales script, or rough narration you already have.",
  },
  {
    label: "Build the first cut",
    body: "Generate scene beats, pick a voice, compare visual directions, and edit the script scene by scene.",
  },
  {
    label: "Export the ad",
    body: "Render a narrated whiteboard explainer as a downloadable MP4 you can review, share, or test.",
  },
  {
    label: "Iterate the angle",
    body: "Make another version while the idea is still fresh, instead of waiting days for a new production pass.",
  },
];

const faqs = [
  {
    question: "Is this for marketers or business owners?",
    answer:
      "Both. It is built for anyone who needs more video ad creative without hiring an editor for every new angle.",
  },
  {
    question: "What do users get at the end?",
    answer:
      "They get a downloadable MP4 whiteboard explainer ad with AI voiceover, animated whiteboard visuals, editable scene text, and multiple visual options per scene.",
  },
  {
    question: "Why not generate full AI video?",
    answer:
      "Full AI video can be expensive, slow, and inconsistent for this job. Whiteboard ads are clearer, cheaper to render, easier to edit, and better suited for problem-education scripts.",
  },
  {
    question: "Do I need video editing experience?",
    answer:
      "No. The workflow is script-first. You edit the message, voice, and scene choices without managing a heavy timeline.",
  },
  {
    question: "What kind of ads is this best for?",
    answer:
      "It is best for educational ads that explain the problem, teach the mechanism, handle objections, and then pitch the next step.",
  },
];

export default async function HomePage() {
  const session = await getSession();

  if (session) {
    redirect("/app");
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#f5f6ef] text-[#1d211b]">
      <section className="relative min-h-[92svh] border-b border-[#d7d9ca] px-5 pb-12 pt-6 sm:px-8 lg:px-12">
        <div className="absolute inset-0">
          <Image
            src="/marker-hand.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[74%_42%] opacity-[0.09] grayscale"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#f5f6ef_0%,rgba(245,246,239,0.94)_38%,rgba(245,246,239,0.58)_100%)]" />
          <div className="absolute bottom-0 left-0 h-28 w-full bg-[linear-gradient(0deg,#f5f6ef_0%,rgba(245,246,239,0)_100%)]" />
        </div>

        <div className="relative mx-auto flex max-w-[1440px] flex-col">
          <header className="flex items-center justify-between gap-4">
            <Link href="/" className="flex items-center gap-3" aria-label="StorySketch">
              <StorySketchLogo className="h-9 w-9 text-[#1d211b]" />
              <span className="text-sm font-semibold tracking-[0.08em]">
                StorySketch
              </span>
            </Link>
            <nav className="flex items-center gap-2">
              <Button asChild variant="ghost" className="hidden px-3 sm:inline-flex">
                <Link href="/sign-in">Sign in</Link>
              </Button>
              <Button asChild className="rounded-md bg-[#b93f2d] px-4 text-[#fffaf4] hover:bg-[#9f3324]">
                <Link href="/sign-up">Start creating</Link>
              </Button>
            </nav>
          </header>

          <div className="grid gap-10 py-12 lg:gap-12 lg:py-16">
            <div className="mx-auto max-w-5xl text-center">
              <p className="mx-auto mb-5 w-fit rounded-md border border-[#b93f2d]/30 bg-[#fffaf4] px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-[#9f3324]">
                StorySketch for faster creative testing
              </p>
              <h1 className="mx-auto max-w-5xl text-5xl font-semibold leading-[0.96] tracking-tight text-[#1d211b] sm:text-6xl lg:text-7xl">
                Turn ad scripts into whiteboard videos in minutes.
              </h1>
              <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-[#596050] sm:text-xl">
                Turn ad ideas into polished explainer videos without waiting on editors. Make more angles, test faster, and keep creative fatigue from deciding your growth.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Button asChild className="h-12 rounded-md bg-[#b93f2d] px-6 text-base text-[#fffaf4] hover:bg-[#9f3324]">
                  <Link href="/sign-up">Create my first ad</Link>
                </Button>
                <Button asChild variant="secondary" className="h-12 rounded-md border-[#b9bea8] bg-[#fbfcf6] px-6 text-base hover:bg-[#edf0e2]">
                  <Link href="/sign-in">Open the studio</Link>
                </Button>
              </div>
              <div className="mt-8 flex flex-wrap justify-center gap-2">
                {proofPoints.map((point) => (
                  <span
                    key={point}
                    className="rounded-md border border-[#c8cdb8] bg-[#fbfcf6] px-3 py-2 text-sm font-medium text-[#3e4638]"
                  >
                    {point}
                  </span>
                ))}
              </div>
            </div>

            <div className="mx-auto w-full max-w-[1320px]">
              <HeroInteractiveDemo />
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[#d7d9ca] px-5 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.75fr_1fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#b93f2d]">
              The bottleneck
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              Your team has the ideas. Production slows them down.
            </h2>
          </div>
          <div className="grid gap-4">
            {painScenarios.map((scenario) => (
              <p
                key={scenario}
                className="rounded-lg border border-[#c8cdb8] bg-[#fbfcf6] p-5 text-lg leading-8 text-[#3e4638]"
              >
                {scenario}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#b93f2d]">
              The solution
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              StorySketch is built for implementation, not demos.
            </h2>
          </div>
          <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-[#1d211b] bg-[#1d211b] md:grid-cols-2">
            {features.map((feature) => (
              <div key={feature.title} className="bg-[#fbfcf6] p-7">
                <h3 className="text-2xl font-semibold tracking-tight">{feature.title}</h3>
                <p className="mt-4 text-base leading-7 text-[#596050]">{feature.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#1d211b] px-5 py-20 text-[#f5f6ef] sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#e1b84b]">
                How it works
              </p>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
                Go from angle to ad while the idea is still fresh.
              </h2>
            </div>
            <div className="grid gap-4">
              {steps.map((step, index) => (
                <div key={step.label} className="grid gap-4 rounded-lg border border-[#596050] p-5 sm:grid-cols-[56px_1fr]">
                  <span className="grid h-12 w-12 place-items-center rounded-md bg-[#e1b84b] text-lg font-bold text-[#1d211b]">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold">{step.label}</h3>
                    <p className="mt-2 leading-7 text-[#cbd2bc]">{step.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.86fr_1fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#b93f2d]">
              What you get
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              A lightweight StorySketch studio for fast iteration.
            </h2>
            <p className="mt-5 text-lg leading-8 text-[#596050]">
              The goal is simple: turn more scripts into testable video ads before production cost, revision loops, or creative fatigue slow you down.
            </p>
          </div>

          <div className="rounded-lg border border-[#1d211b] bg-[#fbfcf6] p-6 shadow-[10px_10px_0_#dfe8cf]">
            <div className="flex flex-col justify-between gap-4 border-b border-[#c8cdb8] pb-6 sm:flex-row sm:items-end">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#b93f2d]">
                  Ad creation workflow
                </p>
                <p className="mt-3 text-5xl font-semibold">One flow</p>
              </div>
              <p className="max-w-xs text-sm leading-6 text-[#596050]">
                From rough script to a downloadable StorySketch ad you can review and test.
              </p>
            </div>
            <ul className="mt-6 grid gap-3 text-base leading-7 text-[#3e4638]">
              {[
                "Paste a script or rough ad narration",
                "Generate scene-by-scene whiteboard visuals",
                "AI voiceover, visuals, animation, and MP4 export",
                "Multiple visual options per scene",
                "Editable scene text and voice selection",
                "Fast enough to test more hooks and angles",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#b93f2d]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Button asChild className="mt-8 h-12 w-full rounded-md bg-[#b93f2d] text-base text-[#fffaf4] hover:bg-[#9f3324]">
              <Link href="/sign-up">Start making video ads</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="border-y border-[#d7d9ca] bg-[#fbfcf6] px-5 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#b93f2d]">
            Objections
          </p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            Questions serious marketers ask.
          </h2>
          <div className="mt-10 divide-y divide-[#d7d9ca] border-y border-[#d7d9ca]">
            {faqs.map((faq) => (
              <div key={faq.question} className="grid gap-3 py-6 md:grid-cols-[0.56fr_1fr]">
                <h3 className="text-xl font-semibold">{faq.question}</h3>
                <p className="leading-7 text-[#596050]">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl rounded-lg bg-[#b93f2d] px-6 py-12 text-[#fffaf4] sm:px-10 lg:px-14">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#ffe3c8]">
                Built for ad velocity
              </p>
              <h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
                Stop letting production decide how many ideas you test.
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-[#ffe3c8]">
                Paste a script, generate a first cut, export the MP4, and move to the next angle while your competitors are still waiting on revisions.
              </p>
            </div>
            <Button asChild className="h-12 rounded-md bg-[#fffaf4] px-6 text-base text-[#9f3324] hover:bg-[#f5f6ef]">
              <Link href="/sign-up">Create my first ad</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
