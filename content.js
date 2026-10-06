/* ==========================================================================
   QUIZ CONTENT — questions, coach notes, results copy.
   Questions are built around the themes of the "Refactor Your Leadership"
   program (coaching.fabiosalimbeni.com).
   Scores: 0 = ouch, 1 = meh, 2 = solid, 3 = senior/director move.
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
      q: "Your VP wants the platform migration done this quarter. Your PM wants three new features. Both say theirs is “the priority”. Your team is looking at you. You…",
      options: [
        { t: "Say yes to both and quietly plan some weekend work. We’ll figure it out.", s: 0,
          quip: "Absorbing conflicting directives yourself is how EMs burn out and teams stop trusting the plan. The pressure needs to be visible, not hidden in your weekends." },
        { t: "Go with the VP. Hierarchy wins.", s: 1,
          quip: "Safe for you, costly for your relationship with Product. A decision got made, but nobody owns the trade-off." },
        { t: "Ask the team to split their time 50/50 so everyone’s happy.", s: 1,
          quip: "Splitting focus feels fair and usually means nothing ships. Half-done is the most expensive outcome." },
        { t: "Put the capacity and the trade-offs on one page, get the VP and PM in a room, and have them choose explicitly.", s: 3,
          quip: "That’s capacity-conflict management. You don’t absorb the conflict: you make it visible and get the right people to own the decision." }
      ]
    },
    {
      pillar: "leadership",
      q: "Be honest: in senior leadership meetings, you mostly feel…",
      options: [
        { t: "Like an engineer who wandered into the wrong meeting.", s: 0,
          quip: "The confidence gap is real and very common. You were trained for the old version of the job. Feeling legitimate comes from practice, not from a title." },
        { t: "Fine, as long as nobody asks me anything non-technical.", s: 1,
          quip: "Staying in technical territory keeps you safe but small. The leaders who get promoted bring a point of view on people, priorities and trade-offs." },
        { t: "Prepared, but I tend to stay quiet unless someone asks me.", s: 2,
          quip: "Solid base. Next step: walk in with one opinion you’re ready to defend. Being asked isn’t the same as being heard." },
        { t: "Like a peer. I bring a clear point of view and I’m comfortable disagreeing.", s: 3,
          quip: "That’s a credible leader. You’re not waiting for permission to lead." }
      ]
    },
    {
      pillar: "leadership",
      module: "Module 7 · Creating Clarity",
      q: "You find out your skip-level has been assigning work directly to one of your engineers. Again. You…",
      options: [
        { t: "Let it slide. Better not to make waves upward.", s: 0,
          quip: "Every time it slides, your authority shrinks a little and your team learns that the real decisions happen around you." },
        { t: "Have a word with the engineer about following the process.", s: 0,
          quip: "That puts your report in the middle of a leadership problem. This conversation belongs upward, not downward." },
        { t: "Mention it vaguely in my next 1:1 with my manager.", s: 1,
          quip: "Right instinct, but vague complaints rarely change anything. Bring the specific impact and a proposal." },
        { t: "Raise it with my skip-level directly: show the impact on priorities and agree how requests should flow from now on.", s: 3,
          quip: "Structure restored without drama. You fixed the system, not just the incident, and rebuilt the trust in your leadership chain." }
      ]
    },

    {
      pillar: "leadership",
      module: "Module 6 · Amplifying Your Leadership",
      q: "Look at your calendar from last week. How much of it was reactive firefighting versus work you chose to do?",
      options: [
        { t: "Calendar? I live in Slack. It’s all reactive.", s: 0,
          quip: "When reactive work eats your week, the strategic part of the job, the part you get promoted for, quietly disappears." },
        { t: "Mostly reactive, but I catch up on the real work in the evenings.", s: 1,
          quip: "That’s the overwhelm talking. Doing the job in your evenings isn’t sustainable, and it hides the real capacity problem." },
        { t: "About half and half. I protect a couple of focus blocks.", s: 2,
          quip: "Good discipline. Next step: look at what keeps landing on you, and design it out." },
        { t: "I protect time for my priorities, and I’ve delegated or automated most of the reactive work.", s: 3,
          quip: "That’s leading at a sustainable pace. You’ve reclaimed time for the work only you can do." }
      ]
    },
    {
      pillar: "leadership",
      module: "Module 7 · Creating Clarity",
      q: "A big technical decision needs to be made. Your tech lead and a senior engineer strongly disagree. You…",
      options: [
        { t: "Decide myself. I’m the manager, that’s what I’m for.", s: 1,
          quip: "Fast, but it teaches the team that every hard call comes back to you. Your job is to make sure good decisions get made, not to make them all." },
        { t: "Let them fight it out. They’ll get there eventually.", s: 0,
          quip: "Without a clear decision process, “eventually” becomes weeks of friction, with a winner and a loser." },
        { t: "Escalate to my manager so I don’t have to take sides.", s: 0,
          quip: "Escalating a decision your team can make shrinks your authority, and theirs." },
        { t: "Agree who owns the decision, set a deadline and criteria, and back the outcome once it’s made.", s: 3,
          quip: "That’s structure people can trust: clear ownership, a clear process, and a leader who backs the result." }
      ]
    },
    // ---------------------------------------------------------------- COMMUNICATION
    {
      pillar: "communication",
      module: "Module 5 · Leading with Curiosity",
      q: "You have to tell your team about a reorg that changes who they report to. How do you do it?",
      options: [
        { t: "One team announcement, same words for everyone. It’s the fairest way.", s: 1,
          quip: "Consistent, yes. But your anxious senior, your ambitious junior and your sceptical tech lead each heard something different. Communication has to land, not just be sent." },
        { t: "A Slack post with a 🙏 and “happy to answer any questions”.", s: 0,
          quip: "Nobody asks questions about their own job security in a public channel. Silence isn’t acceptance." },
        { t: "Wait until every detail is final, so I don’t create confusion.", s: 1,
          quip: "The rumour mill doesn’t wait. By the time it’s final, the story has already been told without you." },
        { t: "Announce it to the team, then hold short 1:1s tailored to what each person will worry about most.", s: 3,
          quip: "That’s communication that lands with each team member: same facts, different conversations." }
      ]
    },
    {
      pillar: "communication",
      module: "Module 8 · Future-Proof Leadership",
      q: "Your team delivered huge impact this year. In your review, your manager mostly remembers the one incident in March. You…",
      options: [
        { t: "Accept it. Good work should speak for itself.", s: 0,
          quip: "It doesn’t. Being undervalued despite real impact is one of the most common EM traps, and evidence fixes it, not patience." },
        { t: "Push back hard in the meeting. It’s not fair.", s: 0,
          quip: "Understandable, but getting emotional in the room makes the incident the story all over again." },
        { t: "Send a follow-up email listing the wins I can remember.", s: 2,
          quip: "Better than silence. The jump is having the evidence ready all year, not reconstructing it after the review." },
        { t: "Walk through a running record of outcomes, metrics and feedback that I’ve kept all year.", s: 3,
          quip: "That’s an evidence-based case. Recognition goes to the impact people can actually see." }
      ]
    },
    {
      pillar: "communication",
      module: "Module 10 · From Theory to Practice",
      q: "You believe you’re ready for the next level. How do you raise it with your manager?",
      options: [
        { t: "I don’t. If I’m ready, they’ll notice.", s: 0,
          quip: "Promotions rarely go to people waiting to be noticed. Your manager is busy with their own career." },
        { t: "Drop a few hints and hope they pick up on them.", s: 0,
          quip: "Hints are awkward and easy to ignore. A clear ask is kinder to both of you." },
        { t: "Tell them I deserve it and that I’ll look elsewhere if it doesn’t happen.", s: 1,
          quip: "Ultimatums can work once, and they cost you trust. You can be direct without damaging the relationship." },
        { t: "Ask what the next level looks like to them, show my evidence against it, and agree on the gaps together.", s: 3,
          quip: "That’s a promotion conversation that strengthens the relationship. You’ve made your manager your ally." }
      ]
    },

    {
      pillar: "communication",
      q: "Your director asks your team to take on an urgent project. You know it will blow up two existing commitments. You…",
      options: [
        { t: "Say yes. You don’t say no to a director.", s: 0,
          quip: "Saying yes to everything is how commitments quietly break, and trust erodes on both sides." },
        { t: "Say no. We’re at capacity.", s: 1,
          quip: "Honest, but a flat no closes the conversation instead of opening it." },
        { t: "Say yes, then tell the other stakeholders their work will be late.", s: 1,
          quip: "You’ve handed the trade-off to people who never got a say in it." },
        { t: "“Yes, and here’s what it will cost. Which of these two commitments should move?”", s: 3,
          quip: "That’s pushing back without pushing away. The cost is visible, and the trade-off sits with the person who can make it." }
      ]
    },
    {
      pillar: "communication",
      module: "Module 10 · From Theory to Practice",
      q: "A talented engineer keeps interrupting colleagues in meetings. People have started going quiet. You…",
      options: [
        { t: "Leave it. They’re one of my best engineers.", s: 0,
          quip: "Not naming a behaviour is a decision too. The team sees you tolerate it, and psychological safety drains away." },
        { t: "Remind the whole team to “let everyone speak”.", s: 1,
          quip: "Everyone feels told off except the one person who needed to hear it." },
        { t: "Save it for their performance review.", s: 0,
          quip: "Months of silence, then a surprise at review time. That breaks more trust than the original behaviour." },
        { t: "Raise it privately: the specific moments, the impact on the team, and ask what’s going on for them.", s: 3,
          quip: "That’s naming the behaviour with care: specific, private and curious. It protects both the team and the relationship." }
      ]
    },
    // ---------------------------------------------------------------- AI
    {
      pillar: "ai",
      module: "Module 1 · The AI-Ready Mindset",
      q: "How is AI changing your job as an Engineering Manager?",
      options: [
        { t: "It isn’t. AI is for the engineers.", s: 0,
          quip: "AI has redefined what the EM role requires: how you decide, communicate and spend your time. The managers who see it first will lead the next generation of teams." },
        { t: "It’ll make my team faster, so I’ll probably need fewer people.", s: 1,
          quip: "That’s the headcount view. The bigger shift is in your own work: decisions, conversations and where your week goes." },
        { t: "It’s a handy productivity tool. I use it now and then for emails and docs.", s: 2,
          quip: "A good start. The real leverage is using it for the hard parts of the job, not just the writing." },
        { t: "It’s changing how I decide, prepare and lead, so I’m deliberately rebuilding how I work around it.", s: 3,
          quip: "That’s the AI-ready mindset. You’re not just adopting a tool, you’re redesigning the role." }
      ]
    },
    {
      pillar: "ai",
      module: "Module 3 · Communicating with AI",
      q: "Tomorrow you have a tough feedback conversation with a senior engineer. How does AI fit into your prep?",
      options: [
        { t: "It doesn’t. These conversations are human.", s: 1,
          quip: "The conversation is human. The prep doesn’t have to be. Rehearsing with AI is one of the highest-leverage uses there is." },
        { t: "I’d have it write the whole script, then read it out.", s: 0,
          quip: "Reading a script makes you sound like one. AI should sharpen your thinking, not replace your voice." },
        { t: "I use it to structure my notes so I don’t forget anything.", s: 2,
          quip: "Useful. Go one step further: have it play the engineer and push back, so you’re ready for the reaction." },
        { t: "I role-play it: AI plays the engineer, pushes back, and helps me spot where my message is unclear or unfair.", s: 3,
          quip: "That’s AI as a leadership partner. You walk in prepared for the real conversation, not the ideal one." }
      ]
    },
    {
      pillar: "ai",
      module: "Module 4 · Trustworthy AI",
      q: "You ask AI to help prioritise next quarter. It suggests cutting the project your most senior engineer cares about most. You…",
      options: [
        { t: "Cut it. The analysis is the analysis.", s: 0,
          quip: "AI doesn’t know the history, the people or the politics. Outsource the decision and you own the consequences without having made the call." },
        { t: "Ignore it. AI doesn’t understand our context.", s: 1,
          quip: "Fair instinct, but you’ve thrown away a useful challenge to your own assumptions." },
        { t: "Re-prompt it a few times until it agrees with me.", s: 0,
          quip: "Prompting until it agrees is just confirmation bias with extra steps." },
        { t: "Treat it as one input: test the reasoning against what I know about the team and the business, then decide and own it.", s: 3,
          quip: "That’s trustworthy AI. It informs your judgment and doesn’t replace it. Fast decisions you can stand behind." }
      ]
    },

    {
      pillar: "ai",
      module: "Module 2 · AI as Your Leadership Partner",
      q: "You’re planning next quarter with too many requests and too little capacity. How do you use AI?",
      options: [
        { t: "I don’t. Planning is a judgment call.", s: 1,
          quip: "It is, and AI can make your judgment sharper: spotting conflicts, testing scenarios, challenging your assumptions." },
        { t: "To format the slides once I’ve decided.", s: 1,
          quip: "Formatting is the least valuable part of planning. Bring AI in while you’re still thinking." },
        { t: "Paste in every request and ask it what to cut.", s: 0,
          quip: "Hand over the decision and you own outcomes you never really chose." },
        { t: "Model scenarios and trade-offs with it, let it challenge my assumptions, then make and own the call.", s: 3,
          quip: "That’s AI as a leadership partner on capacity, priorities and trade-offs, not just tasks." }
      ]
    },
    {
      pillar: "ai",
      module: "Module 3 · Communicating with AI",
      q: "Promotion season is coming. How could AI help you build your case?",
      options: [
        { t: "It couldn’t. Promotions are about relationships.", s: 1,
          quip: "Relationships matter, but so does evidence. AI is excellent at turning a year of scattered wins into a clear story." },
        { t: "I’d ask it to write a glowing self-review from scratch.", s: 0,
          quip: "A generic AI self-review reads like one. Your evidence is the substance. AI helps shape it." },
        { t: "Polish the wording once I’ve written everything.", s: 2,
          quip: "Useful. Next level: have it challenge your case, not just polish it." },
        { t: "Turn my impact log into a clear narrative, then have AI play a sceptical promotion committee to pressure-test it.", s: 3,
          quip: "That’s communicating with AI at its best: you walk in with a case that has already survived the hard questions." }
      ]
    },
    // ---------------------------------------------------------------- COACHING
    {
      pillar: "coaching",
      module: "Module 5 · Leading with Curiosity",
      q: "Two engineers on your team have both missed their last two deadlines. How do you approach it?",
      options: [
        { t: "The same conversation with both. Fair is fair.", s: 1,
          quip: "Same symptom, very different causes. Generic advice fails because people aren’t generic." },
        { t: "Apply the approach from that management book I read.", s: 0,
          quip: "Frameworks are a starting point, but advice that ignores the person usually misses. Read the individual first." },
        { t: "Start with the one I suspect is less committed.", s: 0,
          quip: "That’s your bias making the first call. The one you assume is “less committed” may just be the one who’s stuck." },
        { t: "Understand each one separately: what’s really going on, what drives them, and what they need from me.", s: 3,
          quip: "That’s Unbiased Reading: seeing each person accurately before you decide how to lead them." }
      ]
    },
    {
      pillar: "coaching",
      module: "Module 9 · Building High-Performing Teams",
      q: "One of your engineers has been underperforming for three months. What’s your plan?",
      options: [
        { t: "Talk to HR about starting a PIP.", s: 0,
          quip: "Jumping to a PIP is usually the end of the relationship, not the start of a turnaround. Most underperformance can be fixed much earlier." },
        { t: "Give them easier work for a while.", s: 1,
          quip: "Kind in the moment, but it hides the problem and quietly lowers your expectations of them." },
        { t: "Keep giving feedback and hope it improves.", s: 1,
          quip: "Without structure, feedback becomes noise. Hope isn’t a system." },
        { t: "Agree clear, measurable expectations together, check in weekly, and track progress as evidence.", s: 3,
          quip: "That’s a repeatable turnaround system. You get results nobody can argue with, built on evidence, and usually no PIP needed." }
      ]
    },
    {
      pillar: "coaching",
      module: "Module 7 · Creating Clarity",
      q: "If you asked your team “Do you know where your career is heading here?”, most would say…",
      options: [
        { t: "“Career? I just close tickets.”", s: 0,
          quip: "If nobody can see a path, your best people will find one somewhere else." },
        { t: "“We talked about it once, at my review.”", s: 1,
          quip: "One conversation a year isn’t a path. Growth needs a regular rhythm." },
        { t: "“Kind of. My manager knows what I want.”", s: 2,
          quip: "Close. Now get it out of your head and onto paper, written with them." },
        { t: "“Yes. We built a plan together and we revisit it every month.”", s: 3,
          quip: "That’s Creating Clarity: understanding what drives each person and building their path forward with them." }
      ]
    },
    {
      pillar: "coaching",
      module: "Module 9 · Building High-Performing Teams",
      q: "An engineer’s change caused a production incident. In the retro, you…",
      options: [
        { t: "Make it clear who caused it, so it doesn’t happen again.", s: 0,
          quip: "Naming and shaming guarantees the next incident gets hidden. Psychological safety is a performance tool, not a nice-to-have." },
        { t: "Skip the retro and quietly fix the gaps myself.", s: 0,
          quip: "You’ve protected the person but lost the lesson, and taught everyone that problems get swept under the rug." },
        { t: "Hold the retro, but leave the engineer out to spare their feelings.", s: 1,
          quip: "Kind intent, but you’ve taken away their chance to learn and to be part of the fix." },
        { t: "Run a blameless retro on what in our system let it happen, and thank the engineer for owning it.", s: 3,
          quip: "That’s how psychological safety gets built: people raise problems early because they’ve seen what happens when they do." }
      ]
    },
    {
      pillar: "coaching",
      module: "Module 5 · Leading with Curiosity",
      q: "Your quietest engineer barely says anything in your 1:1s. You…",
      options: [
        { t: "Assume they’re fine. No news is good news.", s: 0,
          quip: "Quiet isn’t the same as fine. Some of your best people won’t tell you they’re unhappy until they resign." },
        { t: "Fill the silence with updates so it isn’t awkward.", s: 1,
          quip: "Now it’s your meeting, not theirs. Silence is often where the real conversation starts." },
        { t: "Tell them they need to speak up more.", s: 1,
          quip: "Asking someone to be a different person rarely works. Change the format before you ask them to change." },
        { t: "Try different formats (a walk, written notes beforehand, specific questions) until I find what works for them.", s: 3,
          quip: "That’s Unbiased Reading in practice: you adapt to the person instead of expecting them to adapt to you." }
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
          "Grow a successor. Director seats go to people who’ve already replaced themselves."
        ]
      }
    },
    communication: {
      low: {
        text: "Your team does real work, but your message doesn’t land: it’s either one-size-fits-all, or it never reaches the people who decide on recognition and promotions.",
        actions: [
          "Start a running “impact log” today: outcomes, metrics and quotes. Add to it every Friday.",
          "For your next big announcement, follow it with short 1:1s tailored to each person.",
          "Book a career conversation with your manager and ask, “What does the next level look like to you?”"
        ]
      },
      mid: {
        text: "You’re clear and reliable, but you still send everyone the same message, and you advocate for yourself only when someone forces the moment.",
        actions: [
          "Before any important message, write down who it’s for and what you need them to do.",
          "Share a monthly 5-bullet update with your manager: wins, risks, asks.",
          "Rehearse your promotion case out loud (with AI or a peer) before you need it."
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
        text: "You’re already leading the AI-era way: AI informs your judgment, it doesn’t replace it. Leaders who can model this are exactly who gets the next seat.",
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
          "Build evidence-based promotion cases with each report."
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
      desc: "You do the work. You don’t tell the story. When promotion committees decide, untold stories don’t count. Your growth edge is advocating for yourself and your team with evidence."
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
    director: {
      emoji: "🚀", name: "The Director-in-Waiting",
      line: "Honestly? You’re dangerous. Let’s aim you somewhere.",
      desc: "Strong across the board. What stands between you and the next title probably isn’t skill. It’s visibility, scope, and a deliberate promotion strategy."
    }
  },

  stages: [
    { min: 0,  name: "Survival Mode", goal: "a calm, confident EM", line: "You’re doing the job. The job is also doing you." },
    { min: 40, name: "Solid EM", goal: "Senior EM", line: "Reliable and respected. Now it’s time to build leverage." },
    { min: 60, name: "Senior EM Material", goal: "your Senior EM promotion", line: "You’re operating above your title in places." },
    { min: 80, name: "Director Trajectory", goal: "Director", line: "The skills are there. Now it’s about scope and story." }
  ],

  ladder: {
    leadership:    ["Runs a team well", "Makes trade-offs visible & owned", "Sets direction for teams of teams"],
    communication: ["Clear status updates", "Lands messages per person & self-advocates", "Shapes the narrative with execs"],
    ai:            ["Uses AI for emails & docs", "Uses AI to prep decisions & hard talks", "Leads the org into AI-era leadership"],
    coaching:      ["Holds regular 1:1s", "Reads people accurately & turns them around", "Builds managers & a coaching culture"]
  },

  analyzing: [
    "Counting your unanswered Slack DMs…",
    "Cross-referencing your calendar with reality…",
    "Reading your answers without bias…",
    "Measuring your distance to Director…",
    "Writing your personal growth plan…"
  ]
};

// Also loadable from Node (used by the email function).
if (typeof module === "object" && module.exports) module.exports = __root.QUIZ;
