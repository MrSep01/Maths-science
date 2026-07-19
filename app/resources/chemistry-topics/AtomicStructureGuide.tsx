import Image from "next/image";

const ParticleTable = () => (
  <div className="content-table-wrap">
    <table className="content-table">
      <caption>Relative properties of the three principal subatomic particles</caption>
      <thead><tr><th>Particle</th><th>Relative charge</th><th>Relative mass</th><th>Location</th></tr></thead>
      <tbody>
        <tr><td><b>Proton</b></td><td>+1</td><td>1</td><td>Nucleus</td></tr>
        <tr><td><b>Neutron</b></td><td>0</td><td>1</td><td>Nucleus</td></tr>
        <tr><td><b>Electron</b></td><td>−1</td><td>1/1836</td><td>Shells around the nucleus</td></tr>
      </tbody>
    </table>
  </div>
);

const Callout = ({ label, children, tone = "blue" }: { label: string; children: React.ReactNode; tone?: "blue" | "coral" | "lime" }) => (
  <aside className={`lesson-callout callout-${tone}`}><b>{label}</b><div>{children}</div></aside>
);

const WorkedExample = ({ number, title, children }: { number: string; title: string; children: React.ReactNode }) => (
  <article className="worked-example">
    <div className="worked-example-title"><span>{number}</span><div><small>Worked example</small><h4>{title}</h4></div></div>
    <div className="worked-example-body">{children}</div>
  </article>
);

const CheckList = ({ items }: { items: string[] }) => <ul className="lesson-checklist">{items.map((item) => <li key={item}><span>✓</span>{item}</li>)}</ul>;

export default function AtomicStructureGuide() {
  return <div className="lesson-guide" id="teaching-guide">
    <section className="lesson-opening">
      <div>
        <p className="eyebrow"><span /> Complete teaching guide</p>
        <h2>Atomic structure,<br /><em>explained clearly.</em></h2>
      </div>
      <div>
        <p>Atomic structure explains periodic trends, bonding, energetics and spectroscopy. A secure understanding here makes much of the AS course easier.</p>
        <div className="lesson-meta"><span><b>4</b> syllabus sections</span><span><b>6</b> worked examples</span><span><b>12</b> practice questions</span></div>
      </div>
    </section>

    <section className="lesson-roadmap">
      <p>Before you begin</p>
      <div><span>01</span><b>Know basic element symbols and the Periodic Table.</b></div>
      <div><span>02</span><b>Be comfortable with positive and negative charges.</b></div>
      <div><span>03</span><b>Remember that this topic describes ground-state atoms and ions from H to Kr.</b></div>
    </section>

    <section className="lesson-chapter" id="learn-1-1">
      <header><span>1.1</span><div><p>Particles in the atom and atomic radius</p><h3>Inside the atom</h3></div></header>
      <p className="lesson-lead">An atom consists of a tiny, dense nucleus containing protons and neutrons, surrounded by electrons in shells. Almost all the atom’s mass is concentrated in the nucleus; most of its volume is empty space.</p>

      <h4>Subatomic particles</h4>
      <ParticleTable />
      <p>“Relative” values compare particles without using their very small actual charges and masses. A proton and electron have charges of equal magnitude but opposite sign. An electron has far less mass than either nucleon.</p>
      <Callout label="Exam language"><p>Do not say an electron has “no mass”. State that its relative mass is approximately 1/1836, or negligible compared with a proton or neutron.</p></Callout>

      <h4>Atomic number, mass number and charge</h4>
      <div className="definition-grid">
        <article><span>Z</span><h5>Atomic number</h5><p>The number of protons in the nucleus. It identifies the element.</p></article>
        <article><span>A</span><h5>Mass number</h5><p>The total number of protons and neutrons in one atom.</p></article>
        <article><span>q</span><h5>Ionic charge</h5><p>The imbalance between the number of protons and electrons.</p></article>
      </div>
      <div className="formula-strip"><span>neutrons = A − Z</span><span>electrons in a cation = Z − positive charge</span><span>electrons in an anion = Z + charge magnitude</span></div>
      <WorkedExample number="01" title="Counting particles in an ion">
        <p>Determine the numbers of protons, neutrons and electrons in <sup>56</sup><sub>26</sub>Fe<sup>3+</sup>.</p>
        <ol><li><b>Protons:</b> Z = 26.</li><li><b>Neutrons:</b> A − Z = 56 − 26 = 30.</li><li><b>Electrons:</b> a 3+ ion has lost three electrons, so 26 − 3 = 23.</li></ol>
        <p className="worked-answer"><b>Answer:</b> 26 protons, 30 neutrons and 23 electrons.</p>
      </WorkedExample>

      <h4>Particles moving through an electric field</h4>
      <figure className="science-image field-figure" id="field-deflection">
        <Image src="/atomic-structure/electric-field-3d.webp" width={1672} height={941} alt="Three-dimensional visualization of electron, neutron and proton beams moving at the same speed through an electric field" unoptimized />
        <div className="science-image-legend"><span className="legend-electron"><b>e<sup>−</sup></b> strong deflection towards +</span><span className="legend-neutron"><b>n</b> no deflection</span><span className="legend-proton"><b>p<sup>+</sup></b> slight deflection towards −</span></div>
        <figcaption><b>Particles enter with the same velocity, v.</b> Direction is determined by charge; the degree of curvature depends strongly on mass.</figcaption>
      </figure>
      <p>Charged particles experience a force in an electric field. Protons and electrons curve in opposite directions. At the same velocity, the electron is deflected much more because its mass is far smaller. A neutron is not deflected because it has no charge.</p>

      <h4>Atomic and ionic radius</h4>
      <div className="trend-grid">
        <article><b>Across a period →</b><p>Atomic radius generally decreases. Nuclear charge increases while electrons are added to the same principal shell, so shielding changes relatively little and attraction increases.</p></article>
        <article><b>Down a group ↓</b><p>Atomic radius increases. Each step adds a principal shell; greater distance and shielding outweigh the increased nuclear charge.</p></article>
        <article><b>Cations</b><p>A cation is smaller than its atom. Electron loss reduces repulsion and may remove the outer shell completely.</p></article>
        <article><b>Anions</b><p>An anion is larger than its atom. Additional electrons increase electron–electron repulsion within the outer shell.</p></article>
      </div>
      <p>Across a period, ionic radius decreases within a series of cations as nuclear charge increases. There is then a large increase when the sequence changes from cations to anions, because the anions have an additional occupied shell. Radius then decreases across the anions. Down a group, ionic radius increases as an additional principal shell is occupied.</p>
      <WorkedExample number="02" title="Comparing an isoelectronic series">
        <p>Arrange O<sup>2−</sup>, F<sup>−</sup>, Ne and Na<sup>+</sup> in order of increasing radius.</p>
        <p>All four species contain 10 electrons. Their nuclear charges are +8, +9, +10 and +11. With the same number of electrons, the species with the greatest nuclear charge attracts the electron cloud most strongly.</p>
        <p className="worked-answer"><b>Answer:</b> Na<sup>+</sup> &lt; Ne &lt; F<sup>−</sup> &lt; O<sup>2−</sup>.</p>
      </WorkedExample>
    </section>

    <section className="lesson-chapter" id="learn-1-2">
      <header><span>1.2</span><div><p>Isotopes</p><h3>Same element, different mass</h3></div></header>
      <p className="lesson-lead">Isotopes are atoms of the same element with the same number of protons but different numbers of neutrons.</p>
      <figure className="science-image isotope-figure" id="isotope-comparison">
        <Image src="/atomic-structure/chlorine-isotopes-3d.webp" width={1672} height={941} alt="Three-dimensional schematic comparison of chlorine-35 and chlorine-37 with identical electron arrangements and different neutron counts" unoptimized />
        <div className="isotope-labels"><div><b><sup>35</sup><sub>17</sub>Cl</b><span>17 p<sup>+</sup> · 18 n · 17 e<sup>−</sup></span></div><div><b><sup>37</sup><sub>17</sub>Cl</b><span>17 p<sup>+</sup> · 20 n · 17 e<sup>−</sup></span></div></div>
        <figcaption><b>Schematic—not to scale.</b> Both isotopes have the same proton number and electron configuration. Chlorine-37 contains two additional neutrons.</figcaption>
      </figure>
      <p>The lower number, Z, is the atomic or proton number. The upper number, A, is the mass or nucleon number. Because both chlorine isotopes contain 17 protons, both are chlorine. Their neutron numbers—and therefore their masses—differ.</p>

      <div className="compare-panel">
        <article><h4>Same chemical properties</h4><p>Neutral isotopes of one element have the same number and arrangement of electrons. Chemical reactions involve electrons, especially outer-shell electrons, so their chemical behaviour is the same.</p></article>
        <article><h4>Different physical properties</h4><p>Their different numbers of neutrons give them different masses. Mass-dependent properties, including density and rates of diffusion, can therefore differ.</p></article>
      </div>
      <Callout label="Precise definition" tone="coral"><p>“Same element with different masses” is incomplete. A full definition must state <b>the same number of protons</b> and <b>different numbers of neutrons</b>.</p></Callout>
      <WorkedExample number="03" title="Using isotope notation">
        <p>An ion contains 34 protons, 46 neutrons and 36 electrons. Write its nuclide symbol.</p>
        <ol><li>Z = 34, so the element is selenium, Se.</li><li>A = 34 + 46 = 80.</li><li>There are two more electrons than protons, so the charge is 2−.</li></ol>
        <p className="worked-answer"><b>Answer:</b> <sup>80</sup><sub>34</sub>Se<sup>2−</sup>.</p>
      </WorkedExample>
    </section>

    <section className="lesson-chapter" id="learn-1-3">
      <header><span>1.3</span><div><p>Electrons, energy levels and atomic orbitals</p><h3>Building electron configurations</h3></div></header>
      <p className="lesson-lead">Electrons occupy principal shells. Each shell contains sub-shells, and each sub-shell contains orbitals. An atomic orbital is a region of space that can hold a maximum of two electrons with opposite spins.</p>

      <div className="hierarchy-row"><div><b>Shell</b><span>principal quantum number, n</span></div><i>→</i><div><b>Sub-shell</b><span>s, p or d</span></div><i>→</i><div><b>Orbital</b><span>maximum 2 e<sup>−</sup></span></div></div>
      <div className="content-table-wrap">
        <table className="content-table orbital-table"><caption>Orbital and electron capacities of s, p and d sub-shells</caption><thead><tr><th>Sub-shell</th><th>Number of orbitals</th><th>Maximum electrons</th><th>General shape</th></tr></thead><tbody><tr><td><b>s</b></td><td>1</td><td>2</td><td>Spherical</td></tr><tr><td><b>p</b></td><td>3</td><td>6</td><td>Two-lobed</td></tr><tr><td><b>d</b></td><td>5</td><td>10</td><td>Shape not assessed in this section</td></tr></tbody></table>
      </div>

      <figure className="science-image orbital-figure" id="orbital-shapes">
        <Image src="/atomic-structure/orbitals-3d.webp" width={1672} height={941} alt="Three-dimensional probability-volume representations of one s orbital and the three mutually perpendicular p orbitals" unoptimized />
        <div className="orbital-labels"><span><b>s</b> spherical</span><span><b>p<sub>x</sub></b> x-axis</span><span><b>p<sub>y</sub></b> y-axis</span><span><b>p<sub>z</sub></b> z-axis</span></div>
        <figcaption>The three p orbitals are mutually perpendicular. Each has two lobes separated by a nodal plane through the nucleus; contrasting colours represent opposite wavefunction phases, not charge.</figcaption>
      </figure>

      <h4>Order of increasing sub-shell energy</h4>
      <div className="energy-order-wrap"><b>Energy increases →</b><div className="energy-order">{["1s", "2s", "2p", "3s", "3p", "4s", "3d", "4p"].map((orbital, index) => <span key={orbital}><b>{orbital}</b><small>{index + 1}</small></span>)}</div><small>Relative sub-shell energy; diagram not to scale.</small></div>
      <p>Electrons occupy the lowest available energy sub-shell first. The 4s sub-shell fills before 3d in neutral atoms, but 4s electrons are removed before 3d electrons when transition-metal ions form.</p>
      <div className="rule-grid">
        <article><span>01</span><h4>Lowest energy first</h4><p>Fill sub-shells in the energy order shown above.</p></article>
        <article><span>02</span><h4>Two per orbital</h4><p>An orbital holds no more than two electrons, with opposite spins.</p></article>
        <article><span>03</span><h4>Occupy singly first</h4><p>Within equal-energy orbitals, electrons remain unpaired before pairing.</p></article>
      </div>

      <WorkedExample number="04" title="Writing configurations for atoms and ions">
        <div className="configuration-examples">
          <p><b>O, Z = 8</b><span>1s<sup>2</sup> 2s<sup>2</sup> 2p<sup>4</sup></span></p>
          <p><b>Ca, Z = 20</b><span>[Ar] 4s<sup>2</sup></span></p>
          <p><b>Fe, Z = 26</b><span>[Ar] 3d<sup>6</sup> 4s<sup>2</sup></span></p>
          <p><b>Fe<sup>3+</sup></b><span>[Ar] 3d<sup>5</sup></span></p>
        </div>
        <p>For Fe<sup>3+</sup>, remove the two 4s electrons first and then one 3d electron.</p>
      </WorkedExample>

      <h4>Electrons-in-boxes notation</h4>
      <div className="box-notation">
        <div><span>O:</span><b>1s</b><i>↑↓</i><b>2s</b><i>↑↓</i><b>2p</b><i>↑↓</i><i>↑</i><i>↑</i></div>
        <p>The three 2p orbitals are filled singly before pairing. Oxygen therefore has two unpaired electrons.</p>
      </div>
      <p>A <b>free radical</b> is a species with one or more unpaired electrons. A radical is often represented using a dot, for example Cl•.</p>
      <Callout label="Common mistake" tone="coral"><p>Do not write Fe as [Ar] 4s<sup>2</sup>3d<sup>6</sup> when showing increasing sub-shell energy. Cambridge accepts [Ar] 3d<sup>6</sup>4s<sup>2</sup>; when forming ions, remove 4s electrons first.</p></Callout>
    </section>

    <section className="lesson-chapter" id="learn-1-4">
      <header><span>1.4</span><div><p>Ionisation energy</p><h3>Removing electrons</h3></div></header>
      <p className="lesson-lead">The first ionisation energy is the energy required to remove one electron from each atom in one mole of gaseous atoms to form one mole of gaseous 1+ ions.</p>
      <div className="equation-card"><span>First ionisation</span><b>X(g) → X<sup>+</sup>(g) + e<sup>−</sup></b></div>
      <div className="equation-card"><span>Second ionisation</span><b>X<sup>+</sup>(g) → X<sup>2+</sup>(g) + e<sup>−</sup></b></div>
      <Callout label="Definition checklist"><CheckList items={["Energy is supplied", "one electron per atom is removed", "one mole of gaseous atoms is used", "one mole of gaseous 1+ ions is formed"]} /></Callout>

      <h4>Four factors that control ionisation energy</h4>
      <div className="factor-grid">
        <article><span>+</span><h5>Nuclear charge</h5><p>More protons create a stronger attraction for an electron.</p></article>
        <article><span>r</span><h5>Atomic radius</h5><p>A more distant electron feels weaker attraction.</p></article>
        <article><span>≋</span><h5>Shielding</h5><p>Inner electrons repel outer electrons and reduce their attraction to the nucleus.</p></article>
        <article><span>⇅</span><h5>Spin-pair repulsion</h5><p>Two electrons in one orbital repel, making removal of one slightly easier.</p></article>
      </div>

      <h4>Trends and the important deviations</h4>
      <div className="trend-explanation">
        <article><b>Across a period: generally increases</b><p>Nuclear charge increases, electrons enter the same principal shell and shielding changes relatively little. Atomic radius decreases, so attraction becomes stronger.</p></article>
        <article><b>Down a group: generally decreases</b><p>The outer electron occupies a higher shell and experiences more shielding. Increased distance and shielding outweigh increased nuclear charge.</p></article>
        <article><b>Mg → Al: a decrease</b><p>Al loses a 3p electron, which is higher in energy and more shielded than Mg’s 3s electron.</p></article>
        <article><b>P → S: a decrease</b><p>S has a paired 3p electron. Spin-pair repulsion makes an electron easier to remove than from the three singly occupied 3p orbitals in P.</p></article>
      </div>
      <WorkedExample number="05" title="Explaining a period trend">
        <p>Explain why the first ionisation energy of Na is lower than that of Mg.</p>
        <p className="worked-answer"><b>Model answer:</b> Mg has a greater nuclear charge than Na. The electron removed is from the same principal shell and experiences similar shielding. Mg therefore has a smaller atomic radius and a stronger attraction between its nucleus and outer electron, so more energy is required.</p>
      </WorkedExample>

      <h4>Successive ionisation energies</h4>
      <p>Each successive ionisation energy is greater because an electron is removed from an increasingly positive ion. A very large jump shows that the next electron is being removed from a lower principal shell, closer to the nucleus and with less shielding.</p>
      <p>The number of electrons removed before the first large jump indicates the group. The complete pattern of large jumps can also reveal how electrons are distributed between principal shells, allowing the period and electronic configuration to be deduced.</p>
      <figure className="ionisation-chart" id="successive-ionisation-chart" aria-label="First five successive ionisation energies of aluminium">
        <div className="chart-y-label">Ionisation energy / kJ mol<sup>−1</sup></div>
        <div className="chart-plot">
          {[{n:"1st",v:"578",h:4},{n:"2nd",v:"1817",h:12},{n:"3rd",v:"2745",h:19},{n:"4th",v:"11 578",h:78},{n:"5th",v:"14 831",h:100}].map((item, index) => <div className={index === 3 ? "big-jump" : ""} key={item.n}><b>{item.v}</b><i style={{height:`${item.h}%`}} /><span>{item.n}</span></div>)}
        </div>
        <div className="chart-x-label">Electron removed</div>
        <figcaption>First five successive ionisation energies of aluminium. The large increase between the third and fourth values shows that aluminium has three outer-shell electrons.</figcaption>
      </figure>
      <WorkedExample number="06" title="Using successive ionisation data">
        <p>An element has successive ionisation energies of 578, 1817, 2745, 11 578 and 14 831 kJ mol<sup>−1</sup>.</p>
        <p>The large jump occurs between the third and fourth values. Three electrons are removed before reaching an inner shell, so the atom has three outer-shell electrons.</p>
        <p className="worked-answer"><b>Conclusion:</b> the element is in Group 13 (Group III in older notation). In Period 3, it would be aluminium.</p>
      </WorkedExample>
    </section>

    <section className="mistake-section" id="common-mistakes">
      <div><p className="eyebrow light"><span /> Examiner focus</p><h3>Five mistakes<br /><em>to eliminate.</em></h3></div>
      <ol>
        <li><span>01</span><p><b>Confusing mass number with relative atomic mass.</b> Mass number describes one isotope and is a whole number.</p></li>
        <li><span>02</span><p><b>Changing proton number when an ion forms.</b> Ion formation changes electrons only.</p></li>
        <li><span>03</span><p><b>Using “more shells” as a complete explanation.</b> Connect shells to distance, shielding and attraction.</p></li>
        <li><span>04</span><p><b>Removing 3d electrons before 4s.</b> For transition-metal ions, remove 4s electrons first.</p></li>
        <li><span>05</span><p><b>Forgetting gaseous state symbols in ionisation equations.</b> Both the atom or ion and the product ion must be gaseous.</p></li>
      </ol>
    </section>

    <section className="practice-section" id="practice">
      <div className="practice-heading"><div><p className="eyebrow"><span /> Original practice</p><h2>Test your<br /><em>understanding.</em></h2></div><div><b>12 questions</b><span>Approximately 35 marks</span><p>Attempt every question before opening the answers.</p></div></div>
      <div className="question-set">
        <article><span>01</span><div><p>State the relative charge and relative mass of a neutron.</p><small>[2]</small></div></article>
        <article><span>02</span><div><p>An ion of titanium contains 22 protons, 26 neutrons and 19 electrons. Give its full nuclide symbol.</p><small>[3]</small></div></article>
        <article><span>03</span><div><p>Explain why a beam of electrons is deflected more than a beam of protons travelling at the same velocity through the same electric field.</p><small>[2]</small></div></article>
        <article><span>04</span><div><p>Define the term isotope and explain why isotopes of an element have the same chemical properties.</p><small>[3]</small></div></article>
        <article><span>05</span><div><p>Arrange Mg, Mg<sup>2+</sup>, Na<sup>+</sup> and Al<sup>3+</sup> in order of increasing radius. Explain the position of the three ions.</p><small>[4]</small></div></article>
        <article><span>06</span><div><p>State the numbers of orbitals and maximum numbers of electrons in the p and d sub-shells.</p><small>[4]</small></div></article>
        <article><span>07</span><div><p>Write the full electronic configuration of a bromine atom and the shorthand configuration of Br<sup>−</sup>.</p><small>[3]</small></div></article>
        <article><span>08</span><div><p>Write the shorthand electronic configurations of Fe<sup>2+</sup> and Fe<sup>3+</sup>.</p><small>[2]</small></div></article>
        <article><span>09</span><div><p>Define first ionisation energy and write an equation for the second ionisation energy of calcium.</p><small>[4]</small></div></article>
        <article><span>10</span><div><p>Explain the general decrease in first ionisation energy down Group 2.</p><small>[3]</small></div></article>
        <article><span>11</span><div><p>Explain why sulfur has a lower first ionisation energy than phosphorus.</p><small>[3]</small></div></article>
        <article><span>12</span><div><p>The largest jump in the successive ionisation energies of an element occurs between its second and third ionisation energies. State the likely group of the element and explain your answer.</p><small>[2]</small></div></article>
      </div>

      <details className="answer-key"><summary>Open answers and mark guidance <span>+</span></summary><div>
        <article><b>01</b><p>Relative charge 0; relative mass 1.</p></article>
        <article><b>02</b><p><sup>48</sup><sub>22</sub>Ti<sup>3+</sup>. A = 22 + 26 = 48; three fewer electrons than protons gives 3+.</p></article>
        <article><b>03</b><p>The particles carry charges of equal magnitude, but an electron has a much smaller mass, so it experiences much greater acceleration and deflection.</p></article>
        <article><b>04</b><p>Atoms of the same element with the same number of protons but different numbers of neutrons. They have the same electron configuration, and chemical reactions involve electrons.</p></article>
        <article><b>05</b><p>Al<sup>3+</sup> &lt; Mg<sup>2+</sup> &lt; Na<sup>+</sup> &lt; Mg. The three ions are isoelectronic; increasing nuclear charge produces a smaller radius. Mg is a neutral atom with an occupied third shell.</p></article>
        <article><b>06</b><p>p: 3 orbitals and 6 electrons. d: 5 orbitals and 10 electrons.</p></article>
        <article><b>07</b><p>Br: 1s<sup>2</sup>2s<sup>2</sup>2p<sup>6</sup>3s<sup>2</sup>3p<sup>6</sup>3d<sup>10</sup>4s<sup>2</sup>4p<sup>5</sup>. Br<sup>−</sup>: [Ar] 3d<sup>10</sup>4s<sup>2</sup>4p<sup>6</sup>, or [Kr].</p></article>
        <article><b>08</b><p>Fe<sup>2+</sup>: [Ar] 3d<sup>6</sup>. Fe<sup>3+</sup>: [Ar] 3d<sup>5</sup>.</p></article>
        <article><b>09</b><p>Energy required to remove one electron from each atom in one mole of gaseous atoms to form one mole of gaseous 1+ ions. Ca<sup>+</sup>(g) → Ca<sup>2+</sup>(g) + e<sup>−</sup>.</p></article>
        <article><b>10</b><p>Outer electrons occupy higher principal shells, so atomic radius and shielding increase. Attraction between the nucleus and the outer electron decreases, outweighing the increased nuclear charge.</p></article>
        <article><b>11</b><p>In S, one 3p orbital contains a pair of electrons. Repulsion within the pair makes one electron easier to remove. P has three singly occupied 3p orbitals.</p></article>
        <article><b>12</b><p>Group 2. Two outer electrons are removed before the third electron must be removed from a lower shell, causing the large jump.</p></article>
      </div></details>
    </section>

    <section className="revision-summary">
      <div><p className="eyebrow light"><span /> Final review</p><h3>Ready to move on?</h3><p>You should be able to complete every statement below without notes.</p></div>
      <CheckList items={["Count protons, neutrons and electrons in atoms and ions", "Explain atomic and ionic radius trends", "Use isotope notation and compare isotope properties", "Write configurations and electrons-in-boxes diagrams", "Sketch and describe s and p orbitals", "Explain ionisation-energy trends and deviations", "Use successive ionisation energies to deduce group and period"]} />
    </section>
  </div>;
}
