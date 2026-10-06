/* ==========================================================================
   QUIZ CONTENT — questions, coach notes, results copy.
   Questions are built around the themes of the "Refactor Your Leadership"
   program (coaching.fabiosalimbeni.com).
   Scores: 0 = ouch, 1 = meh, 2 = solid, 3 = the best move.
   Option order is shuffled at runtime, so write them in any order.
   Quips aren’t shown during the quiz: they appear in the post-email answer review,
   together with the program module that covers the topic (optional `module`).
   During the quiz every section is marked "achieved" regardless of answers; quality is only assessed in the results.
   ========================================================================== */
var __root = typeof window !== "undefined" ? window : globalThis;
__root.QUIZ = {
  pillars: {
    leadership: {
      name: "Leadership",
      icon: "🧭",
      color: "#0F7A3E",
      ink: "#0B5A2E",
      tagline: "Nobody retrained you for this version of the job.",
      superpower: "You lead with conviction: trade-offs are visible, decisions have owners, and your team trusts the structure."
    },
    communication: {
      name: "Communication",
      icon: "📣",
      color: "#1463FF",
      ink: "#0B47C9",
      tagline: "Per my last email…",
      superpower: "Your message lands with each person, and your impact doesn’t go unnoticed upstairs."
    },
    ai: {
      name: "AI",
      icon: "🤖",
      color: "#0891B2",
      ink: "#0E6A80",
      tagline: "AI has redefined what the EM role requires. Has your leadership caught up?",
      superpower: "You use AI as a leadership partner. It sharpens your judgment instead of replacing it."
    },
    coaching: {
      name: "Coaching",
      icon: "🌱",
      color: "#FF7A2B",
      ink: "#C2410C",
      tagline: "People aren’t generic. Your coaching shouldn’t be either.",
      superpower: "You see each person accurately and build their path with them. That’s how people grow on your team."
    }
  },

  questions: [
    // ---------------------------------------------------------------- LEADERSHIP
    {
      pillar: "leadership",
      module: "Module 6 · Amplifying Your Leadership",
      q: "Your VP wants the platform migration done this quarter. Your PM wants three new features. Both call theirs “the priority”, and your team can’t do both. You…",
      options: [
        { t: "Ask the team which they’d rather work on, and go with the majority.", s: 1,
          quip: "Involving the team feels empowering, but this is a business trade-off. A vote hands it to people who aren’t accountable for the outcome." },
        { t: "Make the trade-off explicit to both and ask them to agree the order.", s: 3,
          quip: "You don’t absorb the conflict or decide it for them: you make it visible and get the accountable people to own it." },
        { t: "Commit to the migration, since it comes from higher up, and negotiate a reduced feature scope with the PM so nobody ends up fully disappointed.", s: 1,
          quip: "Diplomatic, but hierarchy made the call and the compromise quietly overloads the team." },
        { t: "Build a weighted scoring model of both initiatives and let the numbers decide.", s: 2,
          quip: "Data helps the conversation, but a spreadsheet can’t own a decision. The VP and PM still need to agree." }
      ]
    },
    {
      pillar: "leadership",
      q: "In a senior leadership meeting, a VP proposes a plan you believe will hurt your team’s delivery. You’re the most junior person in the room. You…",
      options: [
        { t: "Stay quiet, then raise it with your manager afterwards so you don’t undermine anyone publicly.", s: 1,
          quip: "Respectful, but the decision may be made by then. Credibility comes from contributing in the room." },
        { t: "Name the risk in a sentence or two and offer to follow up with data.", s: 3,
          quip: "Brief, specific and constructive. That’s how you show up as a peer, whatever your title." },
        { t: "Back the plan publicly for alignment, then adapt it quietly for your team.", s: 0,
          quip: "That’s not “disagree and commit”: it’s agreeing, then not committing. It erodes trust when it surfaces." },
        { t: "Ask clarifying questions until the room spots the problem itself.", s: 2,
          quip: "Clever, but it can read as passive or even manipulative. Sometimes the strongest move is to say it plainly." }
      ]
    },
    {
      pillar: "leadership",
      module: "Module 7 · Creating Clarity",
      q: "You find out your skip-level has been assigning work directly to one of your engineers. Again. You…",
      options: [
        { t: "Thank your skip-level for the interest, then ask the engineer to route future requests through you.", s: 1,
          quip: "Polite upward, but it puts your engineer in the middle of a leadership problem." },
        { t: "Raise it with your skip-level directly: explain what it did to the team’s priorities, and agree together how requests should reach the team from now on.", s: 3,
          quip: "You fix the system, not just the incident, and rebuild trust in the leadership chain." },
        { t: "Let it continue, but add the work to the sprint board so it’s visible.", s: 0,
          quip: "Visibility without structure. The bypassing continues, now with a ticket attached." },
        { t: "Ask your own manager to handle it, since the conversation sits above your level.", s: 1,
          quip: "Sounds appropriate, but it outsources a conversation you’re best placed to have." }
      ]
    },
    {
      pillar: "leadership",
      module: "Module 6 · Amplifying Your Leadership",
      q: "Most of your week goes on reactive work: pings, escalations, quick decisions. What’s your first move?",
      options: [
        { t: "Block two no-meeting mornings a week for focused work.", s: 2,
          quip: "Good hygiene, but it treats the symptom. The interruptions will be waiting when the block ends." },
        { t: "Find what keeps landing on you and redesign it so it doesn’t need you.", s: 3,
          quip: "Fix the source, not the calendar. That’s how you reclaim time for good." },
        { t: "Be more responsive, so small issues are resolved before they turn into bigger fires.", s: 0,
          quip: "Feels like leadership. In practice it trains the team to bring you everything." },
        { t: "Route all incoming requests to your tech lead for a month.", s: 1,
          quip: "You’ve moved the bottleneck, not removed it." }
      ]
    },
    {
      pillar: "leadership",
      module: "Module 7 · Creating Clarity",
      q: "Your tech lead and a senior engineer strongly disagree on a big technical decision. The team is waiting. You…",
      options: [
        { t: "Bring in a third senior engineer as a tiebreaker.", s: 1,
          quip: "Turns a decision into a vote, and someone still walks away the loser." },
        { t: "Agree who owns the decision and by when, and make it clear you’ll back whatever they decide.", s: 3,
          quip: "Clear ownership and a deadline end the deadlock without you becoming the bottleneck." },
        { t: "Ask both to write a design doc and choose the stronger one after review.", s: 2,
          quip: "Good rigour, but without an owner and a deadline it can become a contest that drags on." },
        { t: "Make the call yourself to unblock the team, and document your reasoning transparently in the decision log.", s: 1,
          quip: "Transparent and fast, but it teaches the team that every hard call comes back to you." }
      ]
    },

    // ---------------------------------------------------------------- COMMUNICATION
    {
      pillar: "communication",
      module: "Module 5 · Leading with Curiosity",
      q: "You have to tell your team about a reorg that changes who some of them report to. How do you do it?",
      options: [
        { t: "Send a detailed written FAQ first, so everyone gets the same facts at the same time.", s: 2,
          quip: "Fair and consistent, but a document can’t hear how each person is taking it." },
        { t: "Tell everyone together, then talk with each person one-to-one about what changes for them and what worries them most.", s: 3,
          quip: "Same facts for all, then a conversation that lands with each individual." },
        { t: "Be fully transparent in the team meeting, including the options leadership rejected and why.", s: 1,
          quip: "Transparency is good; unfiltered detail isn’t. It fuels speculation instead of clarity." },
        { t: "Wait until every detail is final, to avoid speculation.", s: 0,
          quip: "The rumour mill doesn’t wait. Silence lets someone else tell the story." }
      ]
    },
    {
      pillar: "communication",
      module: "Module 8 · Future-Proof Leadership",
      q: "Your team had a strong year, but in your review your manager focuses on one incident in March. You…",
      options: [
        { t: "Acknowledge the incident openly, then walk through the outcomes, metrics and feedback you’ve tracked all year, so the conversation reflects the full picture.", s: 3,
          quip: "You own the miss and bring the evidence. Credible, not defensive." },
        { t: "Ask to pause the review so you can prepare a detailed response.", s: 0,
          quip: "It signals defensiveness, and the story hardens while you prepare." },
        { t: "Ask peers and stakeholders to send your manager feedback on the year.", s: 2,
          quip: "Useful input, but late and indirect. The evidence should already be in your hands." },
        { t: "Accept it gracefully; challenging a review rarely changes the outcome and can come across as defensive.", s: 1,
          quip: "Graceful, but silence lets one incident define a year of impact." }
      ]
    },
    {
      pillar: "communication",
      module: "Module 10 · From Theory to Practice",
      q: "You believe you’re ready for the next level. How do you raise it with your manager?",
      options: [
        { t: "Wait for the review cycle, when the conversation is expected anyway.", s: 1,
          quip: "By review time the decisions are often already shaped. Start earlier." },
        { t: "Ask what they’d need to see, and share your evidence against it.", s: 3,
          quip: "It makes your manager an ally and turns a request into a shared plan." },
        { t: "Tell them you’re ready and ask for a timeline.", s: 1,
          quip: "Direct, but without shared criteria it’s your opinion against theirs." },
        { t: "Mention an outside conversation you’ve had, so they understand your market value without it sounding like an ultimatum.", s: 0,
          quip: "However softly it’s said, it lands as a threat and costs trust." }
      ]
    },
    {
      pillar: "communication",
      q: "Your director asks your team to take on an urgent project. It will push out two existing commitments. You…",
      options: [
        { t: "Agree, and reshuffle the team to absorb it.", s: 0,
          quip: "The cost is hidden until commitments slip, and then it’s your credibility on the line." },
        { t: "Agree, and tell them which commitment you’ll drop.", s: 1,
          quip: "Honest about the cost, but you’ve made a trade-off that isn’t yours to make." },
        { t: "Ask which of the two existing commitments they’d like to move.", s: 3,
          quip: "Yes, with the cost made visible, and the trade-off with the person who can make it." },
        { t: "Push back firmly: the team is at capacity and needs protecting from scope creep.", s: 1,
          quip: "Protective, but a flat no closes the conversation instead of opening it." }
      ]
    },
    {
      pillar: "communication",
      module: "Module 10 · From Theory to Practice",
      q: "A talented engineer keeps interrupting colleagues in meetings, and people have started going quiet. You…",
      options: [
        { t: "Introduce a speaking order in meetings so everyone gets a turn.", s: 2,
          quip: "A fair system, but it avoids naming the behaviour with the one person who needs to hear it." },
        { t: "Name it privately and ask what’s behind it.", s: 3,
          quip: "Specific, private and curious. It protects both the team and the relationship." },
        { t: "Call it out in the moment, so the team sees you won’t tolerate it.", s: 1,
          quip: "It sends a signal, but public correction usually creates defensiveness, not change." },
        { t: "Give it time; they’re a high performer, and these things often settle as the team gels.", s: 0,
          quip: "Not naming a behaviour is a decision too, and the team sees you tolerate it." }
      ]
    },

    // ---------------------------------------------------------------- AI
    {
      pillar: "ai",
      module: "Module 1 · The AI-Ready Mindset",
      q: "Where is AI having the biggest impact on your job as an Engineering Manager?",
      options: [
        { t: "Mostly on my team’s productivity; my own job is about people.", s: 1,
          quip: "The people side is exactly where AI is changing how managers decide, prepare and communicate." },
        { t: "In how I make decisions and spend my time.", s: 3,
          quip: "The role itself is changing, not just the team’s tooling." },
        { t: "It saves me time on documents, summaries and status updates, which frees me up for more 1:1s.", s: 2,
          quip: "Real gains, but they’re on the edges of the job, not its hardest parts." },
        { t: "On team design: with AI, we’ll need fewer engineers, so I’m planning leaner teams.", s: 0,
          quip: "The headcount view misses the bigger shift: how you lead." }
      ]
    },
    {
      pillar: "ai",
      module: "Module 3 · Communicating with AI",
      q: "Tomorrow you have a tough feedback conversation with a senior engineer. How does AI fit into your prep?",
      options: [
        { t: "Have it draft what to say, so the message is clear and balanced.", s: 0,
          quip: "A drafted script sounds like a script. AI should sharpen your thinking, not replace your voice." },
        { t: "Have it play the engineer, pushback included.", s: 3,
          quip: "Rehearsal prepares you for the real conversation, not the ideal one." },
        { t: "Leave it out: feedback should feel authentic, and AI-shaped words can feel generic.", s: 1,
          quip: "The conversation is human; the preparation doesn’t have to be." },
        { t: "Use it to structure my points into a feedback framework like SBI, so I don’t miss anything important.", s: 2,
          quip: "Helpful structure, but it prepares what you’ll say, not how they’ll react." }
      ]
    },
    {
      pillar: "ai",
      module: "Module 4 · Trustworthy AI",
      q: "You ask AI to help prioritise next quarter. It recommends cutting the project your most senior engineer cares about most. You…",
      options: [
        { t: "Follow it. It’s less biased than I am.", s: 0,
          quip: "It’s differently biased: it doesn’t know the history, the people or the politics." },
        { t: "Test its reasoning against the history, people and context it can’t see, then make the decision yourself and own it.", s: 3,
          quip: "AI informs your judgment; it doesn’t replace it. You own the call." },
        { t: "Set it aside; AI can’t weigh people and politics, so it shouldn’t shape this kind of decision.", s: 1,
          quip: "You’ve thrown away a useful challenge to your own assumptions." },
        { t: "Share the recommendation with the team and let them debate it openly.", s: 1,
          quip: "Open, but it can turn into a referendum on a colleague’s project." }
      ]
    },
    {
      pillar: "ai",
      module: "Module 2 · AI as Your Leadership Partner",
      q: "You’re planning next quarter with far more requests than capacity. How do you use AI?",
      options: [
        { t: "Give it every request and let it rank them by business value.", s: 0,
          quip: "Hand over the ranking and you own outcomes you never really chose." },
        { t: "Use it to model scenarios and challenge my assumptions, then make the call myself.", s: 3,
          quip: "A thinking partner on trade-offs, while the decision stays yours." },
        { t: "Keep it out of prioritisation, which depends on human judgment and stakeholder context.", s: 1,
          quip: "True, and AI can still sharpen that judgment." },
        { t: "Have it turn my priorities into a clear, polished deck for stakeholders.", s: 1,
          quip: "Nice output, but it comes in after the thinking, where it adds the least." }
      ]
    },
    {
      pillar: "ai",
      module: "Module 3 · Communicating with AI",
      q: "Promotion season is coming. How could AI help you build your case?",
      options: [
        { t: "Have it write my self-review from my notes, then adjust the tone.", s: 1,
          quip: "Efficient, but it polishes the case without testing it." },
        { t: "Ask it to argue against my case the way a sceptical reviewer would.", s: 3,
          quip: "Your case gets stronger by surviving the hard questions before the real room." },
        { t: "Use it to benchmark my achievements against typical expectations for the next level.", s: 2,
          quip: "Useful context, but generic benchmarks miss what your company actually values." },
        { t: "I wouldn’t: a case about my own work should be in my own words, start to finish.", s: 1,
          quip: "Your words, yes. AI can still pressure-test them." }
      ]
    },

    // ---------------------------------------------------------------- COACHING
    {
      pillar: "coaching",
      module: "Module 5 · Leading with Curiosity",
      q: "Two engineers on your team have both missed their last two deadlines. How do you approach it?",
      options: [
        { t: "Have the same conversation with both, to be fair and consistent.", s: 1,
          quip: "Same symptom, different causes. Fair isn’t the same as identical." },
        { t: "Talk to each of them separately to find out what’s really going on.", s: 3,
          quip: "That’s Unbiased Reading: understand each person before deciding how to lead them." },
        { t: "Introduce tighter estimates and mid-sprint check-ins for the whole team.", s: 1,
          quip: "A process fix for what may be two very different people problems." },
        { t: "Start with the one who seems less committed, as they’re the bigger risk.", s: 0,
          quip: "That’s your assumption leading. The one who seems less committed may just be stuck." }
      ]
    },
    {
      pillar: "coaching",
      module: "Module 9 · Building High-Performing Teams",
      q: "One of your engineers has been underperforming for three months. What’s your plan?",
      options: [
        { t: "Agree clear, measurable expectations with them, check in weekly, and track progress together so you can both see whether things are improving.", s: 3,
          quip: "A shared, measurable plan. Most turnarounds succeed without a PIP." },
        { t: "Move them to a project that might suit their strengths better.", s: 1,
          quip: "Sometimes right, but often it relocates the problem without understanding it." },
        { t: "Start documenting everything carefully now, in case HR needs to get involved later on.", s: 0,
          quip: "Prudent-sounding, but it’s preparing for an exit, not a turnaround." },
        { t: "Pair them with a strong senior engineer for a quarter.", s: 2,
          quip: "Support helps, but without clear expectations neither of them knows what success looks like." }
      ]
    },
    {
      pillar: "coaching",
      module: "Module 7 · Creating Clarity",
      q: "Your 1:1 notes show nobody on the team has talked about growth in months. What’s your first move?",
      options: [
        { t: "Share the career framework so everyone knows what’s expected at each level.", s: 1,
          quip: "Useful reference, but a framework isn’t a conversation about what each person wants." },
        { t: "Ask each person what they want next, and plan it together.", s: 3,
          quip: "That’s Creating Clarity: understand what drives each person, and build the path with them." },
        { t: "Add a quarterly growth check-in to everyone’s calendar.", s: 2,
          quip: "Good rhythm, but it starts with the format instead of the person." },
        { t: "Wait for review season, when people expect growth conversations anyway.", s: 0,
          quip: "Growth once a year isn’t growth. People notice the silence in between." }
      ]
    },
    {
      pillar: "coaching",
      module: "Module 9 · Building High-Performing Teams",
      q: "An engineer’s change caused a production incident. In the retro, you…",
      options: [
        { t: "Focus on what in the system let it happen.", s: 3,
          quip: "Blameless and systemic. People raise problems early when they’ve seen this." },
        { t: "Keep the engineer’s name out of it entirely, to protect them.", s: 1,
          quip: "Kind intent, but it can make the incident feel shameful and unspeakable." },
        { t: "Add a mandatory second reviewer for every change to that service.", s: 1,
          quip: "Feels rigorous, but it jumps to a fix before understanding the cause." },
        { t: "Ask the engineer to walk the team through what went wrong, so they own the learning.", s: 0,
          quip: "Framed as ownership, felt as a public trial. That’s how the next incident gets hidden." }
      ]
    },
    {
      pillar: "coaching",
      module: "Module 5 · Leading with Curiosity",
      q: "Your quietest engineer barely says anything in your 1:1s. You…",
      options: [
        { t: "Respect their style; some people simply prefer fewer words.", s: 1,
          quip: "Quiet isn’t always a style. Sometimes it’s a signal." },
        { t: "Send a short questionnaire before each 1:1 so they can prepare their thoughts.", s: 2,
          quip: "A thoughtful idea, and one format among many to try." },
        { t: "Change the format until you find what works for them.", s: 3,
          quip: "Adapt to the person instead of expecting them to adapt to you." },
        { t: "Ask them directly why they don’t speak up more.", s: 0,
          quip: "Well meant, but it puts the problem on them and makes the silence heavier." }
      ]
    }
  ],

  // Per-pillar results copy, by band: low (<45%), mid (45–74%), high (75%+)
  diagnosis: {
    leadership: {
      low: {
        text: "You’re absorbing pressure from every direction: conflicting priorities, capacity fights, decisions that go around you. It’s quietly eroding your confidence and your team’s trust in the structure.",
        actions: [
          "Next time two stakeholders both claim “the priority”, write the trade-off on one page and make them choose. Don’t absorb it.",
          "List every decision that currently bypasses you, and agree with your manager how each one should flow.",
          "Before each leadership meeting, prepare one opinion you’re willing to defend out loud."
        ]
      },
      mid: {
        text: "You lead well when things are calm. Under pressure you slide back into absorbing work and conflict yourself, and you still don’t always feel like the legitimate leader in the room.",
        actions: [
          "Make capacity visible: share a simple view of what your team can and can’t take on this quarter.",
          "Pick one recurring conflict (scope, on-call, priorities) and design a process so it stops landing on you.",
          "Ask your manager for one piece of feedback on how you show up in senior meetings."
        ]
      },
      high: {
        text: "You make trade-offs visible and your team trusts the structure. Next frontier: leading beyond your team, where you have influence but no authority.",
        actions: [
          "Take on a cross-team initiative where you have no formal authority.",
          "Write the 12-month narrative for your area and pitch it to your skip-level.",
          "Grow a successor, so your team keeps thriving even when you’re not in the room."
        ]
      }
    },
    communication: {
      low: {
        text: "Your team does real work, but your message doesn’t land: it’s either one-size-fits-all, or it never reaches the people who need to see your team’s impact.",
        actions: [
          "Start a running “impact log” today: outcomes, metrics and quotes. Add to it every Friday.",
          "For your next big announcement, follow it with short 1:1s tailored to each person.",
          "Ask your manager: “What would you like to hear more about from my team?”"
        ]
      },
      mid: {
        text: "You’re clear and reliable, but you still send everyone the same message, and you advocate for yourself only when someone forces the moment.",
        actions: [
          "Before any important message, write down who it’s for and what you need them to do.",
          "Share a monthly 5-bullet update with your manager: wins, risks, asks.",
          "Rehearse your next difficult conversation out loud (with AI or a peer) before you have it."
        ]
      },
      high: {
        text: "Your message lands with each person, and your impact is visible. Now scale it: write things that make the case for you when you’re not in the room.",
        actions: [
          "Write a decision memo that changes something outside your team.",
          "Build deliberate relationships with your Product, Sales and Finance peers.",
          "Coach your tech leads to advocate for their own work."
        ]
      }
    },
    ai: {
      low: {
        text: "AI has redefined what the EM role requires, and right now you’re leading as if it hasn’t. That’s a gap that widens every quarter.",
        actions: [
          "For two weeks, use an AI assistant for one real management task every day, not just emails.",
          "Before your next hard conversation, role-play it with AI playing the other person.",
          "Notice which parts of your week are purely reactive, and try AI on one of them."
        ]
      },
      mid: {
        text: "You use AI, but mostly for writing. The leverage is in the hard parts of the job: decisions, trade-offs and difficult conversations.",
        actions: [
          "Use AI to stress-test your next prioritisation decision: ask it to argue the other side.",
          "Prep your next feedback conversation with an AI role-play, then compare it to how it actually went.",
          "Define your own rules for what you will and won’t delegate to AI."
        ]
      },
      high: {
        text: "You’re already leading the AI-era way: AI informs your judgment, it doesn’t replace it. Leaders who model this help their whole team work smarter.",
        actions: [
          "Share your AI workflows with your peers. Become the EM others learn from.",
          "Write your point of view on how AI changes the EM role in your org.",
          "Help your team talk openly about AI and what it means for their growth."
        ]
      }
    },
    coaching: {
      low: {
        text: "You’re leading everyone the same way, and it only works for some. Underperformance drags on, and growth plans don’t really exist.",
        actions: [
          "For each report, write down what really drives them. If you can’t, that’s your next 1:1 agenda.",
          "For any underperformance, agree clear, measurable expectations and check in weekly. Before anyone mentions a PIP.",
          "Ask each person, “Where do you want to be in two years?” and write it down with them."
        ]
      },
      mid: {
        text: "You care, and it shows. But you read people through your own assumptions sometimes, and growth plans live in your head instead of on paper.",
        actions: [
          "Before your next tricky 1:1, ask yourself: “What am I assuming about this person?”",
          "Write a growth plan with each report and revisit it monthly.",
          "Track one underperformance turnaround with evidence, so you have a repeatable system."
        ]
      },
      high: {
        text: "You see people accurately and grow them deliberately. Next level: building that capability in others, so your leads coach too.",
        actions: [
          "Coach your senior engineers on how to read and mentor others.",
          "Sponsor, don’t just mentor: put your people’s names in rooms they’re not in.",
          "Help each report keep an evidence-based record of their growth and impact."
        ]
      }
    }
  },

  archetypes: {
    leadership: {
      emoji: "🧽", name: "The Pressure Sponge",
      line: "Absorbs every directive from above. Leaks a little on weekends.",
      desc: "Conflicting priorities, capacity fights, decisions made around you: you soak it all up so your team doesn’t have to. It’s admirable and it isn’t sustainable. Your growth edge is making trade-offs visible and letting the right people own them."
    },
    communication: {
      emoji: "🥷", name: "The Silent Shipper",
      line: "Your team delivers miracles. Nobody upstairs knows.",
      desc: "You do the work. You don’t tell the story. When budgets and priorities are decided, untold stories don’t count. Your growth edge is making your team’s impact visible, with evidence."
    },
    ai: {
      emoji: "📠", name: "The Analog Legend",
      line: "Leading like it’s 2019. Respectfully: it isn’t.",
      desc: "Your people skills are real. But AI has redefined what the role requires, and the next generation of EMs use it as a leadership partner for decisions, prep and time. Your growth edge is leading the AI-era way."
    },
    coaching: {
      emoji: "👕", name: "The One-Size-Fits-All",
      line: "Same advice for everyone. Funny how it only works for some.",
      desc: "You care about your people, but you lead them all the same way. Generic advice fails because people aren’t generic. Your growth edge is seeing each person accurately and building their path with them."
    },
    survivor: {
      emoji: "🌋", name: "The Survivor",
      line: "Holding it all together with duct tape and cold brew.",
      desc: "You’re doing the job, and the job is doing you. That isn’t a talent problem: nobody retrained you for this version of the job. The good news is that each pillar has quick wins, and you’ll feel them within weeks."
    },
    multiplier: {
      emoji: "🚀", name: "The Team Multiplier",
      line: "Your team is lucky to have you. Let’s make it last.",
      desc: "Strong across the board. Your next gains won’t come from working harder. They’ll come from scaling what works: growing leaders on your team and spreading your practices beyond it."
    }
  },

  stages: [
    { min: 0,  name: "Survival Mode", line: "You’re doing the job. The job is also doing you." },
    { min: 40, name: "Steady Hand", line: "Your team can count on you. Now build leverage, so it doesn’t all run through you." },
    { min: 60, name: "Team Builder", line: "You’re making your team better than the sum of its parts." },
    { min: 80, name: "Thriving Team", line: "Your team is productive, connected and growing. Now make it last." }
  ],

  ladder: {
    leadership:    ["Keeps the team running day to day", "Makes trade-offs visible and owned by the right people", "Builds a team that runs well without them"],
    communication: ["Shares clear, regular updates", "Tailors the message so it lands with each person", "Makes the team’s impact visible across the company"],
    ai:            ["Uses AI for emails and docs", "Uses AI to prep decisions and hard conversations", "Leads the team into AI-assisted ways of working"],
    coaching:      ["Holds regular 1:1s", "Reads each person accurately and turns struggles around", "Builds a culture where people grow and coach each other"]
  },

  analyzing: [
    "Counting your unanswered Slack DMs…",
    "Cross-referencing your calendar with reality…",
    "Reading your answers without bias…",
    "Measuring your team’s potential…",
    "Writing your personal growth plan…"
  ]
};

// Also loadable from Node (used by the email function).
if (typeof module === "object" && module.exports) module.exports = __root.QUIZ;
