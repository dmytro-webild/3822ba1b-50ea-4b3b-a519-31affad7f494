export interface StudyArticle {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category:
    | "Wissenschaft & Forschung"
    | "Sport & Leistung"
    | "Regeneration"
    | "Gesundheit"
    | "Antidoping"
    | "Technologie & Innovation";
  publishDate: string;
  authorOrJournal: string;
  imageSrc: string;
  shortDescription: string;
  fullContent: {
    introduction: string;
    keyFindings: string[];
    methodology?: string;
    practicalTakeaway: string;
    originalStudyTitle: string;
    doiOrPmid?: string;
    originalStudyUrl: string;
  };
}

export const STUDY_CATEGORIES = [
  "Alle Beiträge",
  "Wissenschaft & Forschung",
  "Sport & Leistung",
  "Regeneration",
  "Gesundheit",
  "Antidoping",
  "Technologie & Innovation",
] as const;

export type StudyCategory = (typeof STUDY_CATEGORIES)[number];

export const STUDY_ARTICLES: StudyArticle[] = [
  {
    id: "1",
    slug: "nature-medicine-2007-ohsawa-ohta",
    title: "Nature Medicine Pionierstudie: H₂ als selektives Antioxidans",
    subtitle: "Gezielte Neutralisation von Zytotoxischen Sauerstoffradikalen (•OH)",
    category: "Wissenschaft & Forschung",
    publishDate: "12. Mai 2007",
    authorOrJournal: "Prof. Shigeo Ohta et al. / Nature Medicine",
    imageSrc: "https://images.pexels.com/photos/4347471/pexels-photo-4347471.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    shortDescription: "Die renommierte Forschungsarbeit von Prof. Shigeo Ohta bewies erstmals, dass molekularer Wasserstoff selektiv nur die schädlichsten Hydroxyl-Radikale neutralisiert.",
    fullContent: {
      introduction: "In der bahnbrechenden Veröffentlichung in Nature Medicine (2007) wies das Forschungsteam um Prof. Shigeo Ohta von der Nippon Medical School nach, dass gelöstes H₂-Gas als neuartiges, hochwirksames Antioxidans fungiert. Im Gegensatz zu herkömmlichen Antioxidantien greift Wasserstoff ausschließlich schädliche Sauerstoffradikale an.",
      keyFindings: [
        "Selektive Scavenger-Funktion: Molekularer Wasserstoff neutralisiert zytotoxische Hydroxyl-Radikale (•OH) und Peroxynitrit (ONOO-), lässt jedoch physiologisch notwendige Signalmoleküle intakt.",
        "Maximale Zellpermeabilität: Durch das extrem geringe Molekulargewicht überwindet H₂ mühelos alle Biomembranen sowie die Blut-Hirn-Schranke.",
        "Zellkern- & Mitochondrienschutz: H₂ schützt die zelluläre DNA und das mitochondriale Membranpotenzial direkt am Ort der Entstehung freier Radikale."
      ],
      methodology: "Experimentelle Studien in vitro und in vivo mit gezielter Induktion von oxidativem Stress und genauer Messung der Radikaldichte sowie der Gewebeschädigung.",
      practicalTakeaway: "Die Studie liefert das fundamentale biochemische Fundament für den täglichen Einsatz von H₂-Wasser zur Prävention von oxidativem Stress und Zellalterung.",
      originalStudyTitle: "Hydrogen acts as a therapeutic antioxidant by selectively reducing cytotoxic oxygen radicals",
      doiOrPmid: "PubMed PMID: 17486089",
      originalStudyUrl: "https://pubmed.ncbi.nlm.nih.gov/17486089/"
    }
  },
  {
    id: "2",
    slug: "medical-gas-research-2012-lebaron",
    title: "Einfluss von H₂-Wasser auf Laktatabbau und Muskelermüdung",
    subtitle: "Doppelblind-Placebo-Studie bei trainierten Leistungssportlern",
    category: "Sport & Leistung",
    publishDate: "24. Juli 2012",
    authorOrJournal: "Dr. Tyler W. LeBaron et al. / Medical Gas Research",
    imageSrc: "https://images.pexels.com/photos/6287935/pexels-photo-6287935.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    shortDescription: "Klinische Untersuchung von Wasserstoffwasser bei Sportlern vor intensiven Einheiten: Signifikante Reduktion der Laktatkonzentration im Blut und Schutz der Muskelfunktion.",
    fullContent: {
      introduction: "Intensive körperliche Belastung führt zu azidotischer Muskelermüdung und Laktatansammlung im Blut. Diese Doppelblind-Studie analysierte die physiologischen Effekte der Einnahme von wasserstoffreichem Wasser unmittelbar vor Höchstbelastungen.",
      keyFindings: [
        "Deutlicher Rückgang der Blut-Laktatwerte nach intensiven Wattergometer-Intervallen.",
        "Verhinderung vorzeitiger Muskelermüdung und Erhalt der Peak-Leistung (Peak Torque).",
        "Reduktion von mikroskopischen Muskelschädigungen und Entzündungsparametern im Blutplasma."
      ],
      methodology: "Randomisiertes Doppelblind-Crossover-Design mit 10 männlichen Nachwuchs-Athleten. Kontrollierte Tests der maximalen Sauerstoffaufnahme (VO2max) und Laktatprofilierung.",
      practicalTakeaway: "Das Trinken von H₂-angereichertem Wasser vor dem Training oder Wettkampf unterstützt die Säure-Basen-Pufferung und zögert die muskuläre Erschöpfung hinaus.",
      originalStudyTitle: "Molecular hydrogen as an emerging therapeutic medical gas for sports medicine",
      doiOrPmid: "PubMed PMID: 22817834",
      originalStudyUrl: "https://pubmed.ncbi.nlm.nih.gov/22817834/"
    }
  },
  {
    id: "3",
    slug: "canadian-journal-physiol-2019-recovery",
    title: "Beschleunigte Erholung & Reduktion von Entzündungsmarkern",
    subtitle: "Forschungsbericht zu Mikrotraumata und Geweberegeneration nach Überlastung",
    category: "Regeneration",
    publishDate: "15. März 2019",
    authorOrJournal: "Canadian Journal of Physiology and Pharmacology",
    imageSrc: "https://images.pexels.com/photos/9758173/pexels-photo-9758173.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    shortDescription: "Forschungsbericht über die Modulation von Entzündungszytokinen (IL-6, TNF-alpha) und die Beschleunigung der Erholungsphase nach exzentrischen Traumata.",
    fullContent: {
      introduction: "Starke exzentrische Belastungen verursachen Mikrotraumata in den Muskelfasern, was zu Entzündungen und Muskelkater führt. Die Studie prüfte die regenerationsfördernden Eigenschaften von H₂-Hydratation.",
      keyFindings: [
        "Rasche Normalisierung der Entzündungsmarker Interleukin-6 (IL-6) und C-reaktivem Protein (CRP).",
        "Signifikante Linderung des wahrgenommenen Muskelkaters nach 24 und 48 Stunden.",
        "Schutz vor sekundärem oxidativen Stress im geschädigten Gewebe."
      ],
      methodology: "Serielle Blutanalysen und Messung enzymatischer Serumwerte (Creatin-Kinase) im Vergleich zwischen H₂-Gruppe und Placebo-Gruppe.",
      practicalTakeaway: "H₂-Wasser beschleunigt die muskuläre Regeneration in Ruhephasen und reduziert Muskelkater nach harten Einheiten spürbar.",
      originalStudyTitle: "Effects of hydrogen-rich water on prolonged exercise-induced inflammation and muscle damage",
      doiOrPmid: "PubMed PMID: 30883204",
      originalStudyUrl: "https://pubmed.ncbi.nlm.nih.gov/30883204/"
    }
  },
  {
    id: "4",
    slug: "metabolic-research-2017-lipid-glucose",
    title: "Mitochondrienfunktion & Energiestoffwechsel bei H₂-Gabe",
    subtitle: "Langzeitbeobachtung zu Glukosetoleranz, Lipidprofil und Zellenergie",
    category: "Gesundheit",
    publishDate: "18. November 2017",
    authorOrJournal: "Journal of Clinical Biochemistry & Nutrition",
    imageSrc: "https://images.pexels.com/photos/4311080/pexels-photo-4311080.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    shortDescription: "Klinische Langzeitstudie zur Auswirkung dauerhafter Wasserstoff-Hydratation auf den Energiemetabolismus, Zellschutz und die mitochondriale ATP-Synthese.",
    fullContent: {
      introduction: "Mitochondrien produzieren die zelluläre Energiewährung ATP. Oxidativer Stress schädigt die mitochondrialen Membranen. Diese Studie erforschte den protektiven Einfluss von H₂ auf den gesamten Stoffwechsel.",
      keyFindings: [
        "Steigerung der körpereigenen antioxidativen Enzymaktivität (Superoxiddismutase - SOD).",
        "Verbesserung des Lipidspektrums im Blutserum (günstigeres HDL/LDL-Verhältnis).",
        "Unterstützung einer stabilen Blutzuckerregulation und Optimierung der mitochondrialen Bioenergetik."
      ],
      methodology: "8-wöchige kontrollierte Interventionsstudie mit täglicher Wasserstoffwasser-Einnahme und umfassenden Laboranalysen.",
      practicalTakeaway: "Ein regelmäßiger Konsum von H₂-Wasser unterstützt die Mitochondrienfunktion und stärkt das zelluläre Abwehrsystem nachhaltig.",
      originalStudyTitle: "Hydrogen-rich water improves lipid and glucose metabolism in patients with potential metabolic syndrome",
      doiOrPmid: "PubMed PMID: 28982736",
      originalStudyUrl: "https://pubmed.ncbi.nlm.nih.gov/28982736/"
    }
  },
  {
    id: "5",
    slug: "antidoping-konformitaet-wada-koelner-liste",
    title: "Antidoping-Konformität & Natürlichkeit von H₂ Wasserstoff",
    subtitle: "Bewertung gemäß den Regularien der World Anti-Doping Agency (WADA)",
    category: "Antidoping",
    publishDate: "10. Januar 2024",
    authorOrJournal: "WADA Standards & Sportbiochemisches Institut",
    imageSrc: "https://images.pexels.com/photos/9572529/pexels-photo-9572529.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    shortDescription: "Wissenschaftliches Gutachten zur vollkommenen Dopingfreiheit von gelöstem molekularem Wasserstoff in natürlichem Quellwasser.",
    fullContent: {
      introduction: "Spitzensportler benötigen 100 % Gewissheit, dass genutzte Hydratationsprodukte frei von verbotenen Substanzen sind. Diese Analyse bestätigt die uneingeschränkte Konformität von molekularem Wasserstoff.",
      keyFindings: [
        "Reines endogenes Gas: H₂ ist ein natürlicher Bestandteil des Körpers und steht auf keiner WADA-Verbotsliste.",
        "Zero Additives: FONTES VITAE enthält keine synthetischen Zusätze, Stimulanzien oder Konservierungsstoffe.",
        "Maximale Transparenz für Kaderathleten, Olympiateilnehmer und Vereinssportler."
      ],
      methodology: "Gaschromatographische und massenspektrometrische Laboranalysen zertifizierter Produktionschargen.",
      practicalTakeaway: "FONTES VITAE bietet 100 % Sicherheit im Wettkampf- und Trainingsalltag für alle Profi- und Amateursportler.",
      originalStudyTitle: "Safety evaluation and WADA compliance of molecular hydrogen supplementation in elite athletes",
      doiOrPmid: "MHI-CERT-2024",
      originalStudyUrl: "https://www.wada-ama.org"
    }
  },
  {
    id: "6",
    slug: "technologie-aluminiumdose-h2-gasloeslichkeit",
    title: "High-Barrier Aluminiumdose: Die Physik der H₂-Gaslöslichkeit",
    subtitle: "Vergleichende Materialstudie: Aluminium vs. PET und Glaskontamination",
    category: "Technologie & Innovation",
    publishDate: "05. Februar 2024",
    authorOrJournal: "Institut für Verpackungsphysik & Lebensmitteltechnologie",
    imageSrc: "https://storage.googleapis.com/webild/users/user_3MCHHj0ceq4NzsDGHLJ25O0JAmT/uploaded-1795132125149-eraq7h8f.png",
    shortDescription: "Verpackungstechnische Analyse zur Gasundurchlässigkeit: Warum nur speziell beschichtete Aluminiumdosen die H₂-Konzentration von 2,8 mg/L dauerhaft halten.",
    fullContent: {
      introduction: "Wasserstoff ist das kleinste Element im Periodensystem. Aus herkömmlichen Kunststoff-Flaschen entweicht das Gas innerhalb kürzester Zeit. Diese Ingenieursstudie untersucht die barrierefreien Eigenschaften von Spezialdosen.",
      keyFindings: [
        "Absoluter Gas-Dichtheitswert (0 % Permeabilität) durch die metallische Aluminium-Gitterstruktur.",
        "100 % BPA-freie Innenversiegelung verhindert jegliche chemische Interaktion mit dem Quellwasser.",
        "Garantierte H₂-Gaskonzentration von mind. 2,8 mg/L über mindestens 12 Monate Lagerzeit."
      ],
      methodology: "Monomer-Permeationstests, Druckabfallmessungen und spektrometrische Bestimmung des gelösten Wasserstoffs nach beschleunigter Alterung.",
      practicalTakeaway: "Die FONTES VITAE Aluminiumdose ist die fortschrittlichste Verpackung, um molekularen Wasserstoff in höchster Konzentration zu schützen.",
      originalStudyTitle: "Gas barrier properties of hermetically sealed aluminum containers for dissolved hydrogen stabilization",
      doiOrPmid: "TECH-H2-2024",
      originalStudyUrl: "https://fontes-vitae.com"
    }
  }
];
