export const sources={
 netflix:'https://jobs.netflix.com/culture',
 noRules:'https://www.penguinrandomhouse.com/books/606529/no-rules-rules-by-reed-hastings-and-erin-meyer/',
 wells:'https://www.sec.gov/Archives/edgar/data/72971/000119312517118654/d375947ddefa14a.htm',
 wellsReview:'https://www.sec.gov/Archives/edgar/data/0000072971/000007297117000428/wfcexhibit99108312017.htm',
 doj:'https://www.justice.gov/archives/opa/pr/wells-fargo-agrees-pay-3-billion-resolve-criminal-and-civil-investigations-sales-practices',
 ford:'https://www.brookings.edu/articles/alan-mulally-ford-and-the-6cs/',
 tayInc:'https://www.inc.com/justin-bariso/microsofts-ceo-sent-an-extraordinary-email-to-employees-after-they-committed-an-.html',
 tayItpro:'https://www.itpro.com/strategy/29592/tay-scandal-taught-us-to-take-accountability-says-microsoft-ceo',
 safety:'https://www.hbs.edu/recruiting/guides-and-stories/leading-in-tough-times',
 errors:'https://doi.org/10.1037/0021-9010.90.6.1228',
 sdt:'https://doi.org/10.1037/0003-066X.55.1.68',
 helpless:'https://doi.org/10.1146/annurev.me.23.020172.002203'
};

/* The fictional team. Four account managers share the sales goal; Maya is the team's engineer. */
export const team={company:'Clover',product:'a booking app for small businesses',role:'Head of the Growth team',size:5,boss:'Dana, Sales Director',sellers:['Sam','Noor','Priya','Leo'],engineer:'Maya',quota:25};

export const stories={
 pressure:[
  {time:'The first week',title:'At first, your plan seems to work.',text:'You post everyone’s sales numbers on the wall. The team stays late, new accounts come in, and you praise the top sellers.',visual:'leaderboard',tone:'dark',next:'Two weeks later'},
  {time:'Two weeks later',title:'Now the easy sales have run out.',text:'Sam is short of his quota. So are Noor, Priya and Leo. Afraid a low ranking will cost them their jobs, nobody tells you the target is becoming unrealistic.',visual:'pressure',tone:'dark',next:'See what happens next'},
  {time:'The end of the month',title:'You hit the target. Then a customer calls.',text:'Some staff opened paid accounts without permission. A complaint exposes it, and your director stops the campaign. You hit 100, but customers need refunds and their trust is gone.',visual:'complaint',tone:'danger',next:'See the real-world case'}
 ],
 support:[
  {time:'The first week',title:'This time, Sam tells you what isn’t working.',text:'Business owners are too busy for daytime demos. You keep the goal, let the team try evening sessions, and set one rule: no account without the customer’s agreement.',visual:'experiment',tone:'hope',next:'See how the month ends'},
  {time:'The end of the month',title:'The team reaches the goal without hiding how.',text:'Evening demos bring in customers who actually want the service. When someone falls behind, the team talks about the obstacle and helps.',visual:'healthy-results',tone:'hope',next:'See the real-world case'}
 ],
 hide:[
  {time:'Launch day · 3:00 PM',title:'The meeting ends with a green report.',text:'You ask Maya to fix the bug privately. The team sees “ready to launch.” Nobody knows she needs help, and she still can’t find the cause.',visual:'green-report',tone:'dark',next:'At 5:00 PM'},
  {time:'Launch day · 5:15 PM',title:'The release goes ahead. Customers are charged twice.',text:'Sales saw a green light and launched. Now the team scrambles to refund customers. Keeping quiet didn’t give Maya a solution; it stopped others from helping.',visual:'double-charge',tone:'danger',next:'See what a real leader did differently'}
 ],
 help:[
  {time:'Launch day · 3:00 PM',title:'You hold the release and bring in help.',text:'You thank Maya. She still owns the fix, and Jun, an engineer from the payments team, helps her. They’ll retest before anyone gives the go-ahead.',visual:'repair',tone:'hope',next:'At the next review'},
  {time:'The next team review',title:'There are more red reports. That may be progress.',text:'People now raise problems earlier, while there’s time to help. Each red report gets an owner and a date. Less reassuring, but more honest.',visual:'honest-report',tone:'hope',next:'See the real-world case'}
 ]
};

/* Each case: background, the leader's decision, our analysis (tied to a concept), then the practical lesson. */
export const cases={
 pressure:{company:'Wells Fargo',year:'Cross-selling scandal · 2009–2016',zone:'anxiety',eyebrow:'Where your choice leads in real life',
  title:'Wells Fargo kept its targets high and made them unsafe to question.',
  background:'The bank’s “Going for Gr-eight” strategy asked staff to sell eight products to every household. Missing sales targets could cost people their jobs.',
  leader:'Leaders met missed targets with more pressure, not questions. Staff went on to open about 3.5 million potentially unauthorised accounts; in 2020 the bank agreed to pay $3 billion.',
  outcome:'Staff opened about 3.5 million potentially unauthorised accounts. In 2020 the bank agreed to pay $3 billion.',
  compare:'Like your daily rankings, the bank judged people by the number alone.',
  analysis:[
   ['Anxiety zone','High standards plus fear make people avoid blame instead of doing good work (Edmondson, 2018).'],
   ['Expectancy theory','Effort motivates only if people believe it can reach the goal (Vroom, 1964). If not, they give up or cheat.']
  ],
  visual:'wells-chain',takeaway:'Check what the number is hiding.',
  actions:['Count customers who actually agreed to buy.','Ask why people are falling behind before threatening them.'],
  source:sources.wells,sourceName:'Independent directors’ investigation (2017)',research:'wells',
  caveat:'The office story is fictional. It illustrates a similar pattern; it is not a reconstruction of events at Wells Fargo.'},
 support:{company:'Netflix',year:'How Netflix describes its culture',zone:'learning',eyebrow:'A real company that made a similar choice',
  title:'Netflix pairs very high expectations with freedom and candour.',
  background:'Netflix’s 2009 culture deck said that “adequate performance gets a generous severance package.” Instead of rigid rules, leaders give people context.',
  leader:'Reed Hastings and Patty McCord dropped controls such as vacation tracking and asked staff to “sunshine” failed bets openly. When Qwikster failed in 2011, Hastings publicly took the blame.',
  outcome:'The bar stayed high, but people could discuss calculated risks and mistakes without punishment.',
  compare:'Like you, Netflix keeps the goal but lets the team shape the plan.',
  analysis:[
   ['Learning zone','High standards plus psychological safety make a hard goal a challenge, not a threat (Edmondson, 2018).'],
   ['Self-determination theory','Freedom over how to work builds intrinsic motivation (Ryan & Deci, 2000).']
  ],
  visual:'netflix-plan',takeaway:'Be clear about the goal. Let people help shape the plan.',
  actions:['Explain what good work looks like.','Ask what support or changes would help the team deliver.'],
  source:sources.netflix,sourceName:'Netflix culture memo',research:'netflix',
  caveat:'This is Netflix’s stated approach, not proof that every employee feels safe. Its “keeper test” can also create job insecurity, which works against psychological safety.'},
 hide:{company:'Ford',year:'Alan Mulally’s weekly reviews · 2006',zone:'anxiety',eyebrow:'What a real leader did differently',
  title:'At Ford, fear kept every report green until the CEO changed his response.',
  background:'In 2006 Ford was losing billions, yet at new CEO Alan Mulally’s weekly reviews every executive reported green. Nobody believed honesty was safe.',
  leader:'When Mark Fields reported a red launch problem, Mulally applauded: “Mark, that’s great visibility. Who can help Mark with this?” The next week, far more red reports appeared.',
  outcome:'The next week, far more red reports appeared, so hidden problems could finally be worked on.',
  compare:'You kept the problem private. Mulally made it visible and shared.',
  analysis:[
   ['Lower the cost of honesty','Praising the first red report in public made the promise of no punishment believable.'],
   ['Error management culture','Sharing the problem brought in help and faster fixes, while Fields still owned it (van Dyck et al., 2005).']
  ],
  visual:'ford-reveal',takeaway:'People should not need a finished solution before they ask for help.',
  actions:['Tell the people who can help or could be affected.','Give the owner support and a clear deadline.'],
  source:sources.ford,sourceName:'Edersheim (2016), Brookings',research:'ford',
  caveat:'The account describes more red reports the next week. That shows a change in reporting. It does not prove that this one response caused Ford’s wider turnaround.'},
 help:{company:'Microsoft',year:'The Tay chatbot · 2016',zone:'learning',eyebrow:'A real leader who responded the same way',
  title:'Microsoft’s CEO backed his team after Tay failed, and still demanded accountability.',
  background:'In 2016 users manipulated Microsoft’s AI chatbot Tay into posting racist messages. It was taken offline within 16 hours.',
  leader:'Satya Nadella blamed no one. He emailed the team: “Keep pushing, and know that I am with you.” He also said Microsoft had to “take accountability” and foresee such attacks.',
  outcome:'Nadella said the episode shaped Microsoft’s design principles. Accountability went into better testing, not blame.',
  compare:'Like you, Nadella backed the people involved and kept them responsible for the fix.',
  analysis:[
   ['Safety under pressure','Public support signals that intelligent failure won’t be punished, so people keep taking smart risks.'],
   ['Standards stay high','Demanding that attacks be foreseen kept the bar high, and aimed accountability at better testing.']
  ],
  visual:'tay-balance',takeaway:'Back the person. Keep the standard.',
  actions:['Keep someone responsible for fixing the problem.','Give them help, a deadline and a way to check the fix.'],
  source:sources.tayItpro,sourceName:'Shepherd (2017), IT Pro',research:'microsoft',
  caveat:'Nadella’s email and interview describe his intentions. They do not show how every engineer experienced the response.'}
};

/* Edmondson's four zones: accountability (standards) x psychological safety. */
export const zones={
 learning:{name:'Learning zone',axes:'High standards · High safety',text:'People take on hard goals, speak up early and learn from mistakes. This is where both of the better choices in the story lead.'},
 anxiety:{name:'Anxiety zone',axes:'High standards · Low safety',text:'People work hard but fear blame. They hide problems, cut corners and stop asking for help. The story’s harmful choices lead here.'},
 comfort:{name:'Comfort zone',axes:'Low standards · High safety',text:'People feel safe and get along, but nobody is stretched. Lowering the target to avoid stress leads here, and the team stagnates.'},
 apathy:{name:'Apathy zone',axes:'Low standards · Low safety',text:'People neither care about the goal nor feel able to speak. They put in the minimum effort.'}
};

export const notebookLessons=`<section class="note-lesson"><div class="note-icon">◎</div><div><h3>Keep your standards high. Make it possible to reach them.</h3><p>Tell people what good work looks like. Let them suggest better ways to do it. When they struggle, ask what is blocking them.</p><div class="mini-compare"><div><span>When people are afraid</span><strong>“I’d better hide this.”</strong></div><div><span>When people can ask for help</span><strong>“Can we work this out?”</strong></div></div><p class="note-caption">Psychological safety means being able to ask questions, admit mistakes and raise concerns. It does not mean that poor work has no consequences.</p></div></section><section class="note-lesson"><div class="note-icon">☷</div><div><h3>When someone brings bad news, make the next step useful.</h3><p>Thank them for telling you. Find out who could be affected. Decide who will fix it, who will help, and when you will check again.</p><div class="action-strip"><span>Tell the team</span><span>Get help</span><span>Check the fix</span></div><p class="note-caption">A rise in reported problems can mean people are speaking more honestly. Look at whether problems get solved, too.</p></div></section><p class="note-more"><a href="./research.html">Read our full research and analysis →</a></p>`;

export const frameworkNotes=`<p class="source-intro">Amy Edmondson treats standards (accountability) and psychological safety as two separate dimensions. A leader can raise one without lowering the other.</p><div class="zone-grid static" aria-label="Edmondson's four zones">${['comfort','learning','apathy','anxiety'].map(k=>`<div class="zone zone-${k}"><strong>${zones[k].name}</strong><span>${zones[k].axes}</span><p>${zones[k].text}</p></div>`).join('')}</div><div class="concepts"><div><strong>Self-determination theory</strong><p>Autonomy, competence and relatedness support intrinsic motivation (Ryan & Deci, 2000).</p></div><div><strong>Expectancy theory</strong><p>People put in effort when they believe effort can lead to the result (Vroom, 1964).</p></div><div><strong>Learned helplessness</strong><p>When outcomes feel impossible to control, people stop trying (Seligman, 1972).</p></div><div><strong>Error management culture</strong><p>Teams that talk about errors and fix them quickly perform better (van Dyck et al., 2005).</p></div></div>`;

export const sourceNotes=`<p class="source-intro">The office, Clover and its people are fictional. The company examples are real and based on these sources.</p>
<details><summary><span>Wells Fargo</span><small>Targets, pressure and customer harm</small></summary><p>The independent directors’ investigation identified the sales culture, performance management and leadership failures as causes. An expanded review in 2017 found about 3.5 million potentially unauthorised accounts, and in 2020 the bank agreed to a $3 billion resolution with U.S. authorities.</p><a href="${sources.wells}" target="_blank" rel="noopener">Independent Directors, Sales Practices Investigation Report (2017)</a><br><a href="${sources.wellsReview}" target="_blank" rel="noopener">Wells Fargo, expanded third-party account review (2017)</a><br><a href="${sources.doj}" target="_blank" rel="noopener">U.S. Department of Justice (2020)</a></details>
<details><summary><span>Netflix</span><small>High expectations and freedom to make decisions</small></summary><p>The culture memo describes giving employees context and discretion while still expecting strong performance. <em>No Rules Rules</em> describes “sunshining” mistakes. The memo also describes the keeper test, which can raise concerns about job security.</p><a href="${sources.netflix}" target="_blank" rel="noopener">Netflix culture memo</a><br><a href="${sources.noRules}" target="_blank" rel="noopener">Hastings & Meyer (2020), No Rules Rules</a></details>
<details><summary><span>Microsoft</span><small>Supporting a team after a public failure</small></summary><p>Satya Nadella’s email to the Tay team, and his later comments on accountability and testing.</p><a href="${sources.tayInc}" target="_blank" rel="noopener">Bariso (2017), Inc.</a><br><a href="${sources.tayItpro}" target="_blank" rel="noopener">Shepherd (2017), IT Pro</a></details>
<details><summary><span>Ford</span><small>Why an honest red report can be useful</small></summary><p>Elizabeth Haas Edersheim recounts how Alan Mulally responded when Mark Fields disclosed a Ford Edge launch problem. It does not establish that one response caused Ford’s wider turnaround.</p><a href="${sources.ford}" target="_blank" rel="noopener">Edersheim (2016), “Alan Mulally, Ford, and the 6Cs,” Brookings</a></details>
<details><summary><span>Psychological safety</span><small>Speaking up and maintaining standards</small></summary><p>Amy Edmondson explains that accountability and psychological safety are separate dimensions. A team can be expected to do excellent work and still feel able to discuss mistakes or uncertainty.</p><a href="${sources.safety}" target="_blank" rel="noopener">Amy Edmondson interview, Harvard Business School</a></details>
<details><summary><span>Learning from errors</span><small>Discussing, investigating and correcting problems</small></summary><p>Van Dyck and colleagues found positive relationships between error management culture and firm performance across two studies.</p><a href="${sources.errors}" target="_blank" rel="noopener">van Dyck, Frese, Baer & Sonnentag (2005), Journal of Applied Psychology</a></details>
<p class="note-more"><a href="./research.html#references">See the full reference list →</a></p>`;
