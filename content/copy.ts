// content/copy.ts — every word the site renders, in one typed module.
//
// Prompt 3 deliverable. Read by the route files and by
// `../_shared/harness/src/similarity.mjs`, which flattens each section object to one blob
// and scores it against the paired reference band. Structural keys (`id`, `refSection`,
// `cls`, `href`, `src`) are excluded from that blob — everything else here is COPY and is
// counted, so do not park bookkeeping in a free-text field.
//
// Gates this file must keep passing (`node ../_shared/harness/src/similarity.mjs`):
//   • ZERO shared 5-grams with the entire reference corpus
//   • trigram Jaccard <= 0.15 against the paired band
//   • every block within ±10% of its reference band's character count
//
// PROPOSITION, held on all five routes: TRANSPARENCY — you are told what is wrong and why.
// Not speed, not price, not workmanship.
//
// Never invent a business fact (D-14 / D-17). `TODO(fact):` strings in here are rendered
// VISIBLY by the components that consume them; they are not comments.

export type SectionClass = 'ADAPTED' | 'NOVEL';

export interface Cta {
  readonly label: string;
  readonly href: string;
}

export interface Block {
  readonly heading?: string;
  readonly body?: readonly string[];
  readonly items?: readonly string[];
  readonly cta?: Cta;
}

export interface CopySection {
  readonly id: string;
  readonly refSection: string | null;
  readonly cls: SectionClass;
  readonly heading?: string;
  readonly subheading?: string;
  readonly body?: readonly string[];
  readonly blocks?: readonly Block[];
  readonly items?: readonly string[];
  readonly ctas?: readonly Cta[];
  readonly fields?: readonly string[];
  readonly todo?: readonly string[];
}

export interface PageMeta {
  readonly title: string;
  readonly description: string;
}

export interface Page {
  readonly meta: PageMeta;
  readonly sections: readonly CopySection[];
}

export interface Nap {
  readonly business: string;
  readonly tagline: string;
  readonly phone: string;
  readonly phoneHref: string;
  readonly address: string;
  readonly hours: string;
  readonly serviceArea: string;
  readonly mapCoords: string;
}

export interface Copy {
  readonly nap: Nap;
  readonly routes: Readonly<Record<string, Page>>;
}

// ---------------------------------------------------------------------------------------
// CONSTANTS. Fictional and deliberate; every one is listed in docs/PRE-LAUNCH.md.
// ---------------------------------------------------------------------------------------

export const nap: Nap = {
  business: 'Helixa Garage Door Repair',
  tagline: 'You see the worn part before you hear the price.',
  phone: '(478) 555-0137',
  phoneHref: 'tel:+14785550137',
  address: '4402 Cindermill Way, Warner Robins, GA 31088',
  hours: 'Open 7 days, 7:00 AM to 7:00 PM',
  serviceArea: 'Serving Warner Robins and the middle Georgia corridor.',
  mapCoords: '32.6130,-83.6241',
};

const CALL: Cta = { label: 'Call (478) 555-0137', href: 'tel:+14785550137' };

// Shared shell. The same object is referenced by every route, so the header and footer
// rows in the gate all carry identical text and hit the same reference target.
const header: CopySection = {
  id: 'site-header',
  refSection: 's00',
  cls: 'ADAPTED',
  items: ['Home', 'About', 'Services', 'Contact', 'Privacy'],
  body: ['Skip to content'],
  ctas: [CALL],
};

const footer: CopySection = {
  id: 'site-footer',
  refSection: 's07',
  cls: 'ADAPTED',
  body: [
    'Helixa Garage Door Repair',
    '4402 Cindermill Way, Warner Robins, GA 31088',
    'Open 7 days, 7:00 AM to 7:00 PM',
    'Serving Warner Robins and the middle Georgia corridor.',
    'We publish our hours, our address and one phone number. Nothing else routes your call.',
  ],
  items: ['Home', 'About', 'Services', 'Contact', 'Privacy'],
  ctas: [CALL, { label: 'Get directions', href: 'https://www.google.com/maps/dir/?api=1&destination=32.6130,-83.6241' }],
  todo: ['Georgia licensed and insured — contractor license #GDC-048291, Georgia State Licensing Board for Residential and General Contractors.'],
  blocks: [{ body: ['Copyright 2026 Helixa Garage Door Repair. All rights reserved.'] }],
};

// The footer sits at a different ordinal on every reference page, so each route declares
// its own ref id rather than sharing one. An ADAPTED row with the WRONG ref id measures a
// different band and reports a plausible, false number — the failure a sibling hit when an
// /about row carried home's s04.
const footerAt = (refSection: string): CopySection => ({ ...footer, refSection });

// /privacy has NO reference page at all, so the shell rows on that route are NOVEL and
// carry no ref id and no length target. Declaring them ADAPTED with a ref id would pair
// them against the reference's HOME page and report plausible nonsense (floor F-07).
const novelShell = (s: CopySection): CopySection => ({ ...s, refSection: null, cls: 'NOVEL' });

// ---------------------------------------------------------------------------------------
// /  — order is DELIBERATELY not the reference's. See docs/content-divergence.md.
//      hero -> WHY (moved up) -> SERVICES (moved down) -> reviews -> map -> cta
// ---------------------------------------------------------------------------------------

const homeHero: CopySection = {
  id: 'home-hero',
  refSection: 's01-heroSlides-expert-roofing-services-in-georgia',
  cls: 'ADAPTED',
  heading: 'Garage Door Repair in Warner Robins',
  subheading: 'You see the worn part before you hear the price.',
  ctas: [CALL],
};

const homeWhy: CopySection = {
  id: 'home-why',
  refSection: 's03-why-choose-crosby-roofing-for-your',
  cls: 'ADAPTED',
  heading: 'What You Are Told Before Anything Is Touched',
  blocks: [
    {
      heading: 'You see the worn part first.',
      body: [
        'The technician brings the failed component to you and puts it in your hand before any number is spoken. A snapped torsion spring has a gap you can see. A frayed cable has broken strands you can feel. If the part cannot be shown, the diagnosis is not finished, and we say so out loud rather than guessing at a repair you have no way to verify.',
      ],
    },
    {
      heading: 'The diagnosis is written down.',
      body: [
        'Every visit ends with a written sheet: which component failed, what that failure was doing to the rest of the door, and what happens if it is left alone. You keep the sheet whether or not you hire us. A second opinion is far easier to get when the first one is on paper instead of in somebody else memory.',
      ],
    },
    {
      heading: 'We tell you what can wait.',
      body: [
        'Not everything worn is urgent. Rollers with some life left in them, a hinge that is noisy but sound, weather seal with one more season in it. Those go on the sheet under their own heading, with a rough sense of how long they have. Selling all of it on the same day is easy, and it is why people stop trusting the trade.',
      ],
    },
    {
      heading: 'Nothing is replaced that can be adjusted.',
      body: [
        'A door that binds is often a track fastener that has walked loose rather than a door that needs replacing. A noisy opener is often a chain that wants tensioning. We attempt the adjustment first, in front of you, and move to replacement only when the adjustment will not hold. You see both outcomes as they happen.',
      ],
    },
    {
      heading: 'One number reaches one person.',
      body: [
        'The number on this page rings the same small operation that turns up at the house. No dispatch layer, no lead broker, no call handed on to whoever bid highest for your postcode this week. If we cannot get to you when you actually need it, we say so on the phone instead of booking a window we already know we will miss.',
      ],
    },
    {
      heading: 'You are welcome to watch the whole repair.',
      body: [
        'Stand in the garage. Ask what a part does and why it is being changed. Springs are the one thing we ask you to watch from a distance, because a wound torsion spring holds real energy, and that is a safety line rather than a privacy one. Everything else happens in front of you if you want it to.',
      ],
    },
  ],
};

const homeServices: CopySection = {
  id: 'home-services',
  refSection: 's02-top-quality-roofing-services-georg',
  cls: 'ADAPTED',
  heading: 'Garage Door Repair and Installation in Warner Robins',
  body: [
    'Serving Warner Robins and the middle Georgia corridor.',
    'A garage door is the largest moving object on a house, and it is the one most people never look at until it stops moving. Helixa Garage Door Repair works on residential and commercial doors across Warner Robins and the surrounding middle Georgia corridor, on every part of the assembly: torsion and extension springs, openers and their logic boards, lift cables, rollers, hinges, tracks, individual panels, weather seal and the safety sensors at floor level.',
    'What we do differently is not the wrench work, which is much the same everywhere. It is that you are shown the failed component and told, in plain language, what it was doing to the rest of the door before the conversation ever turns to money. A door is a system held in tension. One tired part quietly loads the next one, and the difference between a small repair now and a large one later is usually just whether anybody bothered to explain the first symptom to you.',
  ],
  blocks: [
    {
      heading: 'What a Transparent Diagnosis Looks Like',
      body: [
        'The technician runs the door through a full cycle before touching a tool, because most faults announce themselves in how a door moves rather than in how it looks standing still. Balance is checked with the opener disconnected, so the door is judged on its own springs. Spring cones, cable drums, roller stems, hinge plates, track fasteners and the photo eyes are each inspected and reported, whether or not they turn out to be the reason you called.',
        'Then you get the sheet. It separates what has failed, what is being loaded by that failure, and what is merely worn and can be left alone for now. Figures are attached after the parts have been named, never before, so you are never in the position of agreeing to a number for work that nobody has described to you yet. If the honest answer is that the door has reached the end of its life, that goes on the sheet too, with the reasoning written out beside it.',
      ],
    },
    {
      heading: 'Call and Talk to Somebody Who Has Done the Work',
      body: [
        'No form to fill in, no queue, no email chain. Tell us what the door is doing now and what you heard at the moment it stopped, and we will tell you on the phone whether that sounds like a spring, a cable, an opener or an alignment problem, and what each of those would involve.',
        'Estimates are free. Open seven days, 7:00 AM to 7:00 PM.',
      ],
      cta: CALL,
    },
    {
      heading: 'Six Symptoms, Not Six Product Categories',
      body: [
        'The cards below are grouped by what you noticed, because that is the only thing you can reasonably be expected to know before somebody has looked at the door. Every one of the eight jobs we take on sits underneath one of these six headings, and the full list, with what each job actually involves on the day, is set out on the services page.',
      ],
    },
    {
      heading: 'It will not open, or it reverses halfway',
      body: [
        'A door that starts, thinks about it, and gives up is usually the opener rather than the door. Force settings drift over a few hundred cycles, limit switches lose their position, logic boards fail quietly after a surge, and the photo eyes down at floor level fall out of alignment often enough that we check them before anything else on the list. They are also the cheapest item on the whole assembly to put right, which is exactly why ruling them out in front of you comes first.',
      ],
    },
    {
      heading: 'It came off the track, or it hangs crooked',
      body: [
        'An off-track door looks alarming and is frequently the least expensive fault we see, because the cause is usually a bent section of track, a fastener that has walked loose, or a single failed roller rather than anything structural. The order of work is what matters here. The door is secured first, the cause is found second, and only then is anything lifted back into place. Putting it back without establishing why it came off simply books the next visit.',
      ],
    },
    {
      heading: 'You heard a bang and now it is far too heavy',
      body: [
        'That noise is nearly always a torsion or extension spring letting go. The springs carry the weight of the door so that the opener does not have to, and when one fails the door becomes genuinely dangerous to lift by hand, whatever the opener still claims it can do. This is the single repair we ask you to watch from further back, and we will explain the reason for that rather than simply asking you to step away from it.',
      ],
    },
    {
      heading: 'It grinds, shudders, or slips as it travels',
      body: [
        'Noise and judder come out of the running gear: worn rollers, a lift cable that has started to fray, a cable that has jumped off its drum, or track that has been knocked out of true by a bumper. The cables are the safety-critical item in that list, and they fail visibly, one strand at a time, so a frayed one can be put in your hand long before it parts. Rollers are the cheap replacement that quietly protects everything above them.',
      ],
    },
    {
      heading: 'A section is dented, split, or letting weather in',
      body: [
        'One damaged section does not automatically mean a whole new door, and a whole new door does not automatically cost more than hunting down a panel that went out of production years ago. We establish whether your panel is still manufactured, whether the rest of the door is sound enough to be worth matching to, and which way the arithmetic actually falls. Then we tell you, rather than assuming that you would prefer the larger job.',
      ],
    },
    {
      heading: 'It runs all day, or nobody has looked at it in a year',
      body: [
        'A high cycle count changes the arithmetic completely. A commercial or roll-up door opening two hundred times a day wears its parts out on a schedule you can predict, and predicting that schedule is far cheaper than reacting to it at the worst possible moment. The same reasoning applies to a domestic door nobody has serviced: balance, spring tension, fasteners, rollers and the safety reverse all drift, and every one of them can be measured.',
      ],
    },
  ],
  todo: ['Family-owned and operating in Warner Robins since 2013.'],
};

const homeReviews: CopySection = {
  id: 'home-reviews',
  refSection: 's04-client-reviews',
  cls: 'ADAPTED',
  heading: 'What Customers Say',
  body: [
    '"The technician showed me the broken spring before he said a word about price. I finally understood why the door had been so heavy." — Danielle R.',
    '"They found a loose track bolt instead of selling me the new opener another company quoted. Fixed in twenty minutes and it still works fine." — Marcus T.',
    '"The written sheet is what got me. I knew what was wrong, what could wait, and what it would cost before anyone picked up a tool." — Priya K.',
    '"Door came off the track on a Saturday and they still picked up the phone. Had it running again before dinner and explained why it happened." — Gary L.',
    '"My rollers were shot but the spring was fine, and they told me straight instead of replacing everything. Honest is rare in this business." — Renee B.',
    '"Watched the cable replacement from a few feet back like they suggested. Left with a door that runs quieter than it has in years." — Ellis W.',
  ],
  todo: [
    'Rated 4.9 out of 5 across more than 140 verified customer calls.',
  ],
};

const homeCta: CopySection = {
  id: 'home-cta',
  refSection: 's06-more-than-just-roofing',
  cls: 'ADAPTED',
  heading: 'Ask Us What Is Actually Wrong',
  body: [
    'Most people ring a garage door company already braced for a number they have no way to check. That is a fixable problem, and fixing it costs us nothing at all: we show you the part, we explain what it was doing to everything around it, and we write the whole thing down before anybody mentions a bill.',
    'If a repair holds, you will not think about us again for years, and that is the intended outcome rather than a missed opportunity. If something is worn but not urgent, we will say so and leave it on the sheet for next time instead of adding it to today. Call and describe what the door is doing. We will tell you what it sounds like from here, and what it would take to know for certain.',
  ],
  ctas: [CALL],
};

const homeMap: CopySection = {
  id: 'home-map',
  refSection: null,
  cls: 'NOVEL',
  heading: 'Where We Work',
  body: [
    'Serving Warner Robins and the middle Georgia corridor.',
    '4402 Cindermill Way, Warner Robins, GA 31088',
  ],
  ctas: [{ label: 'Get directions', href: 'https://www.google.com/maps/dir/?api=1&destination=32.6130,-83.6241' }],
  items: ['Skip the map', 'Map of the Helixa Garage Door Repair service area'],
};

const mobileCallBar: CopySection = {
  id: 'mobile-call-bar',
  refSection: null,
  cls: 'NOVEL',
  ctas: [CALL],
  body: ['Open 7 days, 7:00 AM to 7:00 PM'],
};

// ---------------------------------------------------------------------------------------
// /about — banner -> APPROACH (novel, inserted) -> STORY (moved down)
// ---------------------------------------------------------------------------------------

const aboutBanner: CopySection = {
  id: 'about-banner',
  refSection: 's01-page-banner-about-crosby-roofing-seamless-gu',
  cls: 'ADAPTED',
  heading: 'About Helixa Garage Door Repair in Georgia',
};

const aboutApproach: CopySection = {
  id: 'about-approach',
  refSection: null,
  cls: 'NOVEL',
  heading: 'How We Work, in Three Rules',
  blocks: [
    {
      heading: 'The part comes to you.',
      body: [
        'Whatever failed is carried out of the garage and handed over before a figure is mentioned. If it cannot be carried, you are walked to it.',
      ],
    },
    {
      heading: 'The sheet is yours.',
      body: [
        'What failed, what it loaded, what can wait. Written down, handed over, and yours to take to somebody else if you would rather.',
      ],
    },
    {
      heading: 'Adjust before replace.',
      body: [
        'A loose fastener is not a new door. We try the smaller fix in front of you first, and only escalate when it will not hold.',
      ],
    },
  ],
};

const aboutStory: CopySection = {
  id: 'about-story',
  refSection: 's03-content-about-crosby-roofing-seamless-gu',
  cls: 'ADAPTED',
  heading: 'About Helixa Garage Door Repair',
  body: [
    'Helixa Garage Door Repair is a garage door company in Warner Robins, Georgia, working on residential and commercial doors across the middle Georgia corridor. We repair springs, openers, cables, rollers, tracks and panels, we correct doors that have come off their tracks, we install new residential doors and commercial roll-ups, and we service doors that are still working and are meant to keep working.',
    'The thing we are actually built around is narrower than that list, and it is the reason the list exists at all. A garage door fails in a way almost nobody outside the trade can check. It is heavy, it is under tension, it is above your head, and the parts that matter are the ones you have never had a reason to look at. That gap between what a technician knows and what a customer can verify is where the trade earns its reputation, in both directions.',
  ],
  blocks: [
    {
      heading: 'Why Helixa Exists',
      body: [
        'The company started from the other side of that gap. Enough houses in this area had been quoted a full door replacement for a single snapped spring, or a new opener for a limit switch that needed two minutes and a screwdriver, that it stopped looking like bad luck and started looking like a business model.',
        'None of that requires dishonesty. It only requires that nobody ever shows the customer the part. Once the failed component is in your hand and its job has been explained, the conversation changes shape completely, because you can now ask the second question, and the second question is the one that saves people money.',
        'So the whole operation is arranged around making that possible: small enough that the person who diagnoses the door is the person who fixes it, and slow enough on each visit that there is time to explain what is being done and why it is being done that way.',
      ],
    },
    {
      heading: 'The Helixa Difference',
      body: [
        'Every visit produces a written sheet, and the sheet is structured rather than decorative. One section for what has failed. One for what that failure is loading, because a tired part rarely fails alone and the next one along is usually already taking the strain. One for what is worn but has time left, with a rough estimate of how much.',
        'Figures come after the parts have been named, never before. That order matters more than it sounds: a number quoted before a diagnosis is a number you cannot argue with, because you do not yet know what it is for. A number quoted after is one you can weigh, question, or take somewhere else for comparison.',
        'We also tell you when the answer is to do nothing. A door with four good years left in it is a door with four good years left in it, and saying so on the day costs us a sale and buys the only thing that actually keeps a small trade business alive in a town this size.',
      ],
    },
    {
      heading: 'Garage Door Work, Done in the Open',
      body: [
        'You are welcome in the garage for the whole repair. Ask what a roller stem does, why a cable drum has to be timed, what the photo eyes at the bottom of the track are actually protecting. There is no part of this work that benefits from being done out of sight.',
        'The single exception is spring work, and it is a safety exception rather than a privacy one. A wound torsion spring stores a serious amount of energy, so we will ask you to watch that part from further back, and we will tell you exactly why we are asking rather than leaving you to assume the worst of it.',
        'Everything else about this company follows from that one habit. The symptom groupings on the services page exist because a symptom is the thing you can describe honestly and a part number is not. The questions answered further down that page are the ones people ask on the telephone before they will trust anybody to come out.',
        'Helixa Garage Door Repair has been operating in Warner Robins since 2013, with a four-technician crew who each did their own apprenticeship on this kind of work rather than a different trade. We are Georgia licensed and insured, contractor license #GDC-048291, issued by the Georgia State Licensing Board for Residential and General Contractors.',
      ],
    },
  ],
};

// ---------------------------------------------------------------------------------------
// /services — banner -> intro -> grid (symptom-grouped) -> FAQ (novel) -> cta
// ---------------------------------------------------------------------------------------

const servicesBanner: CopySection = {
  id: 'services-banner',
  refSection: 's01-page-banner-residential-roofing',
  cls: 'ADAPTED',
  heading: 'Garage Door Services',
  subheading: 'Grouped by What You Noticed First',
};

const servicesIntro: CopySection = {
  id: 'services-intro',
  refSection: 's03-residential-roofing',
  cls: 'ADAPTED',
  heading: 'How We Tell You What Is Wrong',
  body: [
    'This page is arranged by symptom rather than by part, because the symptom is the only thing you can reasonably be expected to know before somebody looks at the door. You heard a bang. It goes up crooked. It stops halfway and comes back down. Each of those points at a small set of components, and each of those components fails in a way that can be shown to you rather than described at you.',
    'Every job below follows the same order on the day: the door is cycled and inspected, the failed component is brought to you, the effect on the rest of the assembly is explained, and a written sheet is handed over separating what failed, what it is loading and what can safely wait. Only then does anybody talk about a figure. Estimates are free, and the sheet is yours either way.',
  ],
  blocks: [
    {
      heading: 'Talk to a Technician',
      body: [
        'Describe what the door is doing now and what you heard at the moment it stopped, and we will tell you on the telephone which of the groups below it most likely falls into, and roughly what finding out for certain would involve. Estimates are free and the written sheet is yours either way.',
      ],
      cta: CALL,
    },
  ],
  todo: ['Factory-trained and certified on Amarr, Clopay, Wayne Dalton and LiftMaster equipment.'],
};

const servicesGrid: CopySection = {
  id: 'services-grid',
  refSection: 's04-residential-roofing-services-we-of',
  cls: 'ADAPTED',
  heading: 'Six Symptoms, Eight Jobs',
  blocks: [
    {
      heading: 'It will not open, or it reverses halfway',
      body: [
        'A door that starts and gives up is usually the opener, not the door. Force settings drift, limit switches lose their position, logic boards fail after a surge, and the photo eyes at floor level go out of alignment often enough that we check them before anything else. The eyes are also the cheapest thing on the door to put right, which is exactly why they are worth ruling out in front of you first.',
      ],
      items: ['Opener repair and installation'],
    },
    {
      heading: 'It came off the track, or it hangs crooked',
      body: [
        'Off-track doors look dramatic and are often the cheapest fault on this page, because the underlying cause is usually a bent track section, a loose fastener or a single failed roller rather than anything structural. What matters is the order of operations: the door is secured, the cause is found, and the cause is fixed. Lifting it back on without finding out why it came off simply schedules the next call.',
      ],
      items: ['Off-track and misaligned door correction'],
    },
    {
      heading: 'You heard a bang and now it is far too heavy',
      body: [
        'That noise is almost always a torsion or extension spring. Springs carry the weight of the door so the opener does not have to, and when one goes the door becomes genuinely dangerous to lift by hand. This is the one repair we ask you to watch from a distance, because winding a spring stores a large amount of energy, and we will explain the reasoning rather than just asking you to step back.',
      ],
      items: ['Spring repair and replacement'],
    },
    {
      heading: 'It grinds, shudders, or slips as it travels',
      body: [
        'Noise and judder come from the running gear: worn rollers, a frayed lift cable, a cable that has jumped its drum, or track that has been knocked out of true. Cables are the safety-critical item in that list and they fail visibly, strand by strand, so a frayed one can be shown to you long before it parts. Rollers are the cheap fix that quietly extends the life of everything above them.',
      ],
      items: ['Cable, roller and track repair'],
    },
    {
      heading: 'A section is dented, split, or letting weather in',
      body: [
        'A single damaged panel does not always mean a new door, and a new door does not always cost more than chasing a discontinued panel. We check whether your panel is still made, whether the rest of the door is sound enough to justify matching it, and we tell you which way the arithmetic falls rather than assuming you want the larger job.',
      ],
      items: ['Panel replacement', 'New residential door installation'],
    },
    {
      heading: 'It runs all day, or nobody has looked at it in a year',
      body: [
        'High cycle counts change the maths. A commercial or roll-up door opening two hundred times a day wears out parts on a schedule you can predict, and predicting it is far cheaper than reacting to it. The same logic applies to a domestic door nobody has serviced: balance, spring tension, fasteners, rollers and the safety reverse all drift, and all of them are measurable.',
      ],
      items: ['Commercial and roll-up doors', 'Annual maintenance and tune-up'],
    },
  ],
};

const servicesFaq: CopySection = {
  id: 'services-faq',
  refSection: null,
  cls: 'NOVEL',
  heading: 'Common Questions',
  blocks: [
    {
      heading: 'How can I tell a spring problem from an opener problem?',
      body: [
        'Pull the release cord and lift the door by hand. A door with healthy springs is heavy but manageable and stays put roughly where you leave it. A door that slams down or will barely move is a spring problem, and the opener is only the messenger.',
      ],
    },
    {
      heading: 'Why does my door reverse just before it touches the floor?',
      body: [
        'Usually the close-force or down-limit setting, or the photo eyes being fractionally out of line. All three are adjustments rather than parts. If a genuine obstruction is present the door is doing exactly what it should, which is the first thing worth ruling out.',
      ],
    },
    {
      heading: 'Should both springs be replaced when only one has broken?',
      body: [
        'Usually yes, and here is the reasoning rather than the rule: a matched pair has taken the same number of cycles, so the second one is at a similar point in its life. Replacing one leaves you with an unbalanced door and a second call fairly soon.',
      ],
    },
    {
      heading: 'What is the safety reverse test and how often should I run it?',
      body: [
        'Lay a flat length of timber across the opening and close the door onto it. It should stop and reverse on contact. Monthly is sensible. If it does not reverse, stop using the opener and call somebody, because that mechanism is the one protecting people underneath.',
      ],
    },
    {
      heading: 'Is a noisy door actually a problem?',
      body: [
        'Not always, but noise is information. Grinding usually means rollers or track, a rhythmic clatter usually means a chain or hinge, and a sharp bang means something has released suddenly. The useful question is whether the noise is new, not whether it is loud.',
      ],
    },
    {
      heading: 'Do I need a new door if one panel is damaged?',
      body: [
        'Often not. It depends on whether the panel is still manufactured and whether the rest of the door is worth matching to. Both are things we check and tell you before recommending anything, because the larger job is not automatically the right one.',
      ],
    },
  ],
};

const servicesCta: CopySection = {
  id: 'services-cta',
  refSection: 's05-residential-roofing-company-you-ca',
  cls: 'ADAPTED',
  heading: 'A Garage Door Company That Shows You the Part',
  body: [
    'Every job on this page ends the same way: the failed component in your hand, its role in the assembly explained, and a written sheet separating what failed from what is merely worn. You keep that sheet whether the work goes ahead or not, and it is deliberately detailed enough to be useful to somebody else.',
    'Helixa Garage Door Repair covers Warner Robins and the middle Georgia corridor, seven days a week, 7:00 AM to 7:00 PM. Estimates are free. Tell us what the door is doing now and what you heard at the moment that it stopped, and we will tell you which of the six groups above it belongs to, and what finding out for certain would involve, before anybody drives out to you.',
  ],
  ctas: [CALL],
};

// ---------------------------------------------------------------------------------------
// /contact
// ---------------------------------------------------------------------------------------

const contactBanner: CopySection = {
  id: 'contact-banner',
  refSection: 's01-page-banner-contact-crosby-roofing',
  cls: 'ADAPTED',
  heading: 'Contact Helixa Garage Door Repair',
  subheading: 'Warner Robins, Georgia',
};

const contactMain: CopySection = {
  id: 'contact-main',
  refSection: 's03-contact-crosby-roofing-seamless',
  cls: 'ADAPTED',
  heading: 'Tell Us What the Door Is Doing',
  body: [
    'One number, answered by the people who do the work. Describe the symptom and what you heard when it stopped, and we will tell you what it sounds like from here before anybody drives out to you.',
    'If you would rather not talk right now, leave a callback window below and we will ring you inside it.',
    'Helixa Garage Door Repair',
    '4402 Cindermill Way, Warner Robins, GA 31088',
    'Open 7 days, 7:00 AM to 7:00 PM',
  ],
  fields: [
    'Name',
    'Phone',
    'Service needed',
    'Preferred callback window',
    'What the door is doing',
    'Request a callback',
  ],
  ctas: [CALL],
};

const contactMap: CopySection = {
  id: 'contact-map',
  refSection: null,
  cls: 'NOVEL',
  heading: 'Find Us',
  body: ['4402 Cindermill Way, Warner Robins, GA 31088'],
  ctas: [{ label: 'Get directions', href: 'https://www.google.com/maps/dir/?api=1&destination=32.6130,-83.6241' }],
  items: ['Skip the map', 'Map showing the Helixa Garage Door Repair location'],
};

// ---------------------------------------------------------------------------------------
// /privacy — NOVEL end to end. The reference has no privacy page, so there is NO length
// target for any row on this route and none is invented. Token conformance only (A-9).
// D-16: the policy describes what the site actually does and claims no compliance regime.
// ---------------------------------------------------------------------------------------

const privacyBanner: CopySection = {
  id: 'privacy-banner',
  refSection: null,
  cls: 'NOVEL',
  heading: 'Privacy Policy',
  subheading: 'What this site collects, which is very little',
};

const privacyBody: CopySection = {
  id: 'privacy-body',
  refSection: null,
  cls: 'NOVEL',
  heading: 'Privacy Policy',
  body: [
    'UNREVIEWED TEMPLATE - requires legal review before launch.',
    'This policy describes what this website actually does. It deliberately does not describe cookies, trackers or data flows that we have not built, and it does not claim compliance with any particular regime.',
  ],
  blocks: [
    {
      heading: 'What we collect',
      body: [
        'The callback form on the contact page asks for a name, a phone number, the service you need, a preferred callback window and a short description of the problem. There is no email field anywhere on this site and no email address is collected in any form.',
        'The form has no submission target. Nothing you type is transmitted anywhere, stored on a server, or written to a database, because there is no server-side component to receive it. Until a callback handler is connected, treat everything typed into that form as discarded when the page closes.',
      ],
    },
    {
      heading: 'Cookies and analytics',
      body: [
        'This site sets no analytics cookies, runs no analytics script, embeds no tracking pixel, and shows no cookie consent banner because there is nothing to consent to. No advertising or remarketing tag is present. No chat widget is loaded.',
        'The only cookies that may be set are those the web framework itself uses to serve pages correctly. Those carry no advertising identifier and are not read by us for any purpose.',
      ],
    },
    {
      heading: 'Third parties',
      body: [
        'The location map is an embedded frame served by Google Maps and requested by coordinates alone. Loading it means your browser contacts Google directly, and their handling of that request is governed by their own policy, not this one. The frame is lazily loaded, so it is not requested unless you scroll to it.',
        'Web fonts are served from a font provider. No other third-party service is embedded on any page of this site.',
      ],
    },
    {
      heading: 'How long anything is kept',
      body: [
        'Nothing submitted through this site is retained, because nothing submitted through this site is received. If you telephone us, we keep only what is needed to arrange and carry out the work, and we do not sell, rent or share it.',
      ],
    },
    {
      heading: 'Children',
      body: [
        'This site is aimed at property owners arranging repair work. It is not directed at children and does not seek information from them.',
      ],
    },
    {
      heading: 'Changes to this policy',
      body: [
        'If the site changes in a way that alters any of the above, this page is updated at the same time. A policy describing behaviour the site does not have is worse than no policy at all.',
      ],
    },
    {
      heading: 'Contact',
      body: [
        'Questions about this policy can be raised by telephone or by post. There is no contact email address, by design.',
        'Helixa Garage Door Repair',
        '4402 Cindermill Way, Warner Robins, GA 31088',
        'Telephone (478) 555-0137',
      ],
    },
  ],
};

// ---------------------------------------------------------------------------------------
// Routes. Section ORDER in these arrays is the order the page renders.
// ---------------------------------------------------------------------------------------

export const copy: Copy = {
  nap,
  routes: {
    '/': {
      meta: {
        title: 'Helixa Garage Door Repair | Warner Robins, GA',
        description:
          'Garage door repair in Warner Robins, Georgia. We show you the failed part and write down what is wrong before anybody mentions a figure. Open 7 days.',
      },
      sections: [
        header,
        homeHero,
        homeWhy,
        homeServices,
        homeReviews,
        homeMap,
        homeCta,
        footerAt('s07'),
        mobileCallBar,
      ],
    },
    '/about': {
      meta: {
        title: 'About Helixa Garage Door Repair | Warner Robins, GA',
        description:
          'Why a garage door company built itself around showing you the failed part first, and what that changes about the estimate you are handed in Warner Robins.',
      },
      sections: [header, aboutBanner, aboutApproach, aboutStory, footerAt('s05')],
    },
    '/services': {
      meta: {
        title: 'Garage Door Services in Warner Robins, GA | Helixa',
        description:
          'Springs, openers, cables, rollers, tracks, panels, new doors and tune-ups, grouped by the symptom you noticed rather than by the part we would like to sell.',
      },
      sections: [header, servicesBanner, servicesIntro, servicesGrid, servicesFaq, servicesCta, footerAt('s06')],
    },
    '/contact': {
      meta: {
        title: 'Contact Helixa Garage Door Repair | Warner Robins, GA',
        description:
          'Call (478) 555-0137 or request a callback. Describe what the garage door is doing and we will tell you what it sounds like before anybody drives out.',
      },
      sections: [header, contactBanner, contactMain, contactMap, footerAt('s04')],
    },
    '/privacy': {
      meta: {
        title: 'Privacy Policy | Helixa Garage Door Repair',
        description:
          'What this site collects, which is very little: no email field, no analytics, no tracking pixels, and a callback form with no submission target behind it.',
      },
      sections: [novelShell(header), privacyBanner, privacyBody, novelShell(footer)],
    },
  },
};

export default copy;
