export type BankQuestion = {
  level: "as";
  topic: number;
  paper: "P1" | "P2";
  spec: string;
  stem: string;
  marks: number;
  answer: string;
  difficulty: "Foundation" | "Standard" | "Challenge";
  ao: "AO1" | "AO2";
  options?: string[];
  correct?: number;
};

export const questionBank: BankQuestion[] = [
  {level:"as",topic:1,paper:"P1",spec:"1.1.2",difficulty:"Foundation",ao:"AO1",marks:1,stem:"Which row gives the relative charge and relative mass of an electron?",options:["charge −1, mass 1/1840","charge −1, mass 1","charge 0, mass 1/1840","charge +1, mass 1"],correct:0,answer:"A · An electron has relative charge −1 and relative mass approximately 1/1840."},
  {level:"as",topic:1,paper:"P1",spec:"1.1.5",difficulty:"Standard",ao:"AO2",marks:1,stem:"Beams of protons, neutrons and electrons travel at the same velocity through an electric field. Which statement is correct?",options:["The electron is deflected most because it has the greatest charge-to-mass ratio.","The proton is deflected most because it has the greatest mass.","The neutron is deflected towards the positive plate.","The proton and electron are deflected equally in the same direction."],correct:0,answer:"A · The electron has a much larger charge-to-mass ratio; the neutron is not deflected."},
  {level:"as",topic:1,paper:"P1",spec:"1.1.6",difficulty:"Standard",ao:"AO2",marks:1,stem:"How many protons, neutrons and electrons are present in ⁵⁶Fe³⁺?",options:["26, 30, 23","26, 30, 29","30, 26, 23","26, 56, 23"],correct:0,answer:"A · protons = 26, neutrons = 30, electrons = 23."},
  {level:"as",topic:1,paper:"P1",spec:"1.1.7",difficulty:"Standard",ao:"AO2",marks:1,stem:"Which comparison of radii is correct?",options:["Mg²⁺ is smaller than Mg because the ion has lost its outer shell.","Mg²⁺ is larger than Mg because it has a greater charge.","Cl⁻ is smaller than Cl because it contains more electrons.","Atomic radius increases across Period 3 because shielding increases greatly."],correct:0,answer:"A · Formation of Mg²⁺ removes the third shell and increases attraction per remaining electron."},
  {level:"as",topic:1,paper:"P1",spec:"1.2.1",difficulty:"Foundation",ao:"AO1",marks:1,stem:"Which statement defines isotopes?",options:["Atoms of the same element with the same number of protons but different numbers of neutrons","Atoms with the same mass number but different proton numbers","Ions of the same element with different numbers of electrons","Atoms with the same number of neutrons but different numbers of protons"],correct:0,answer:"A · Isotopes have the same proton number and different neutron numbers."},
  {level:"as",topic:1,paper:"P1",spec:"1.3.6",difficulty:"Challenge",ao:"AO2",marks:1,stem:"What is the ground-state electronic configuration of Fe³⁺?",options:["[Ar] 3d⁵","[Ar] 3d³4s²","[Ar] 3d⁶","[Ar] 3d⁵4s¹"],correct:0,answer:"A · Fe loses two 4s electrons before one 3d electron, giving [Ar] 3d⁵."},
  {level:"as",topic:1,paper:"P1",spec:"1.4.3",difficulty:"Challenge",ao:"AO2",marks:1,stem:"Why is the first ionisation energy of Al lower than that of Mg?",options:["The electron removed from Al is in a higher-energy 3p sub-shell.","Al has a smaller nuclear charge than Mg.","Al has fewer occupied electron shells than Mg.","The electron removed from Mg is spin-paired."],correct:0,answer:"A · The 3p electron in Al is higher in energy and more shielded than the 3s electron removed from Mg."},
  {level:"as",topic:1,paper:"P2",spec:"1.1.5",difficulty:"Standard",ao:"AO2",marks:4,stem:"Beams of protons and electrons travel at the same velocity through the same electric field. State the direction in which each beam is deflected and explain why the electron beam is deflected through a larger angle.",answer:"proton towards the negative plate; electron towards the positive plate; opposite directions because charges are opposite; electron has much smaller mass / larger charge-to-mass ratio."},
  {level:"as",topic:1,paper:"P2",spec:"1.1.7",difficulty:"Standard",ao:"AO2",marks:3,stem:"Explain why the radius of an Mg²⁺ ion is smaller than the radius of an Mg atom.",answer:"Mg²⁺ has lost the third electron shell; it has fewer shells / less shielding; remaining electrons experience stronger attraction to the nucleus."},
  {level:"as",topic:1,paper:"P2",spec:"1.2.3",difficulty:"Foundation",ao:"AO1",marks:2,stem:"Explain why ³⁵Cl and ³⁷Cl have the same chemical properties.",answer:"same number and arrangement of electrons / same electronic configuration; chemical properties depend on outer-shell electrons."},
  {level:"as",topic:1,paper:"P2",spec:"1.3.6",difficulty:"Standard",ao:"AO2",marks:4,stem:"Write the full electronic configuration of a Cl⁻ ion and the shorthand electronic configuration of an Fe³⁺ ion.",answer:"Cl⁻: 1s²2s²2p⁶3s²3p⁶; Fe³⁺: [Ar] 3d⁵; 4s electrons are removed before 3d electrons."},
  {level:"as",topic:1,paper:"P2",spec:"1.3.8",difficulty:"Foundation",ao:"AO1",marks:3,stem:"Sketch the shape of an s orbital and one p orbital. Label the nucleus and the axis of the p orbital.",answer:"s orbital spherical; p orbital has two lobes on opposite sides of the nucleus; appropriate x, y or z axis labelled."},
  {level:"as",topic:1,paper:"P2",spec:"1.4.2",difficulty:"Standard",ao:"AO2",marks:2,stem:"Construct equations, including state symbols, for the first and second ionisation energies of aluminium.",answer:"Al(g) → Al⁺(g) + e⁻; Al⁺(g) → Al²⁺(g) + e⁻."},
  {level:"as",topic:1,paper:"P2",spec:"1.4.4",difficulty:"Challenge",ao:"AO2",marks:4,stem:"The first five ionisation energies of an element are 578, 1817, 2745, 11 577 and 14 842 kJ mol⁻¹. Deduce the group of the element and explain your answer.",answer:"Group 13; large increase between third and fourth values; after three outer electrons, the fourth electron is removed from an inner shell closer to the nucleus / with less shielding."}
];
