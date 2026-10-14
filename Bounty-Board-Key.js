/* ============================================================================
   BOUNTY BOARD KEY — RAC Field Terminal, Prospero's Dream
   ============================================================================
   This is the single file you edit for the bounty board. RAC-Terminal.html
   reads this file and renders the board, the drill-down detail view (with
   travel estimates), and the news ticker. Change the text here, refresh the
   terminal, done.

   HOW TO EDIT:
   - Plain text goes between quotes. Keep the quotes and the commas.
   - status: "OPEN" (claimable), "ASSIGNED" (the crew's current job),
     "CLOSED" (sealed / not available).
   - travel.jumps: bus jumps from Prospero's Dream. 0 = in-system (no bus).
     null travel = sealed posting, no travel block shown.
   - travel.localKcr: null = cost unknown / paid at destination. A number =
     estimated kcr for the local leg, ONE WAY — the terminal doubles it
     for the round-trip display.
   - PLAYER-FACING RULE: this terminal shows only what public feeds would
     know. No Warden spoilers, no active-warrant hints, no rumors framed as
     news. Encyclopedia, not newspaper.
   ============================================================================ */

const BOARD_KEY = {

/* ---------- travel math (applies to every bounty) ---------- */
travelConfig: {
  busKcrPerJumpPerPerson: 1,   // MPT Bus fare, per jump, per hunter
  crewSize: 4,                 // hunters traveling — confirmed session 0 (4 players)
  // Book rates (Ship Breaker's Handbook, interplanetary table) for the local leg:
  linerSteerageKcr: 1,         // JOC-III liner, steerage, per person
  linerDistantX: 2,            // x2 to a distant planet
  linerEdgeX: 4,               // x4 to the edge of the system
  shuttleCrPerPerson: 250,     // shuttle passenger seating, per person
  busNote: "MPT Bus serves dense population hubs only. 132 cryopods",
  cutterNote: "In-system legs use the RAC-issued jump-0 cutter. The firm covers maintenance."
},

/* ---------- the board ---------- */
bounties: [
  { id: "B-0101", target: "GRIMM, IANERIA", type: "DEBTOR — SKIP-TRACE", bl: 1,
    reward: "1D10 Kcr (×2 IF ALIVE)", status: "ASSIGNED",
    client: "Brandr Mulder (via RAC)",
    fee: "1 Kcr — STAMPED PAID (PROBATIONARY)",
    lastKnown: "Doptown, Prospero's Dream",
    terms: "Subject is non-violent but evasive. Apprehend and deliver to Brandr Mulder's office in TopRing within 48 standard hours, then debrief Brunhildh at the RAC Annex. Minimal collateral damage. The client pays DOUBLE for alive and coherent delivery. This warrant is ASSIGNED to your crew — the board opens when it closes.",
    travel: { jumps: 0,
              local: "Station transit — the target is in Doptown, on the Dream.",
              localKcr: 0 } },

  { id: "B-0129", target: "CUESTA, MAGDA", type: "NARCOTICS (MINOR)", bl: 2,
    reward: "1D5×10 Kcr", status: "OPEN",
    client: "Doenides Police Department (via RAC annex)",
    fee: "1 Kcr license fee applies",
    lastKnown: "Prospero's Dream (fled Doenides)",
    terms: "Teen dealer selling Choir, a hive-mind narcotic cooked from recycled slick-ware gel. Apprehend ALIVE — the DPD wants the supply chain, not a corpse. Users report dreaming each other's dreams. Do not engage Harlow Syndicate personnel without backup. Repeat client: good work here brings more work.",
    travel: { jumps: 0,
              local: "Station transit — the target is on the Dream.",
              localKcr: 0 } },

  // B-0186 BEECH absorbed into B-0241 as a bonus (2026-10-13). Full Warden detail in sector-pencils.md (Bounty 86).
  { id: "B-0241", target: "LAB 46B (BARIDON OUTPOST)", type: "INSURANCE APPRAISAL", bl: 3,
    reward: "30 Kcr, docked 25% per unaccounted staff member, +30% for complete documentation. Bonus: 5 Kcr Split Log welfare check on the same trip.", status: "OPEN",
    client: "Di-Nobra Investigative Services (for the Baridon Marine Institute)",
    fee: "1 Kcr license fee applies",
    lastKnown: "Ersa — Observation Laboratory 46B, coastal outpost",
    terms: "Observation Laboratory 46B, a coastal marine-research outpost, sent a distress signal and went silent. Di-Nobra seeks a Contracted Investigation Team to verify all 12 staff present or accounted for, and document cause of death and responsible parties. Evidence via the Authorised Capture Device only. Bonus: RAC adds a 5 Kcr welfare check at Split Log township on the same Ersa trip. One round-trip fare covers both.",
    travel: { jumps: 1,
              busRoute: "Prospero's Dream → Ersa hub",
              local: "Charter to the 46B coast + shuttle to Split Log",
              localKcr: 2 } },

  { id: "B-0233", target: "QUICK, ELIAS", type: "MISSING PERSON — PROOF OF DEATH", bl: 2,
    reward: "10 Kcr (+100 Kcr bonus for proof of death)", status: "OPEN",
    client: "The Quick family (via RAC annex)",
    fee: "1 Kcr license fee applies",
    lastKnown: "Prospero's Dream — Lycaon's arcade (disused)",
    terms: "Media mogul missing three years after bad business deals. The family needs his death confirmed to release company funds: 10 Kcr for verified findings, 100 Kcr bonus for proof of death. Last trace: Lycaon's, a closed-down Slickworld arcade on the Dream, still paying utilities on the company ledger.",
    travel: { jumps: 0,
              local: "Station transit — the target is on the Dream.",
              localKcr: 0 } },
  /* B-0204 THE CHOP SHOP KILLER retired to the refill queue 2026-10-12 —
     solid job, weakest printed backing of the five. Restore when the board
     needs a Dream body-horror slot. */
  /* B-0025 WALDEK McCUNE (WoS Bounty 25) bumped up the refill queue 2026-10-13 —
     Dream-local fit. Book: BL3, 50 Kcr, Last Word Insurance; sole survivor of
     the wrecked Samnite Wedding fled the medbay mid-testimony. Blog adaptation
     (Empiricist's Theories, unplaytested — credit if used): set on the Dream,
     Dockside 50.5-A, Cabin 102-B chase timeline, 100 Kcr / FlySafe in that
     version. Fit: McCune is Teamsters Local 32819L (the Strike union; Hal Otis
     thread); Cabin 102-B reappears in a random Dockside building. Flag: the
     blog's "Crora" backstory (50.5-A as a captured station melded 22 yrs ago)
     is blog invention, NOT printed. */

  { id: "B-0220", target: "BORGES, AMARUQ", type: "APPREHENSION (DEAD)", bl: 3,
    reward: "20 Kcr", status: "OPEN",
    client: "Allie Winchester (private)",
    fee: "1 Kcr license fee applies",
    lastKnown: "Argent — dockside bar, surface downport",
    terms: "Open bounty on a licensed hunter (Hunter 09 'Memorius'). Approach with extreme caution. The RAC reminds licensees that hunter-on-hunter warrants are legal, and final.",
    travel: { jumps: 1,
              busRoute: "Prospero's Dream → Argent (PIRAD ONE)",
              local: "Shuttle from PIRAD ONE down to the surface docks (250cr × 4 hunters)",
              localKcr: 1 } },

  { id: "B-0132", target: "[SEALED]", type: "[SEALED]", bl: 6,
    reward: "[SEALED]", status: "CLOSED",
    client: "[SEALED]", fee: "200kcr",
    lastKnown: "[SEALED]",
    terms: "This warrant is closed to general licensees. Build your rank. Inquiries: RAC Annex.",
    travel: null }
],

/* ---------- news ticker (public feed only — encyclopedia, not newspaper) ---------- */
ticker: "+++ RIM WIRE: CREDIT IRREGULARITIES REPORTED ON TWO RIM STATIONS — MAGISTRATES INVESTIGATING +++ TEAMSTER FREIGHTERS HELD BY STRATEMEYER SYNDICATE — YANDEE DECLINES RANSOM +++ G3 CONGLOMERATE POSTS RECORD QUARTERLY DIVIDEND +++ O2 TAX DUE: DEBTORS REMANDED TO DOPTOWN +++ ODC LEGENDS: LIFER WALKS OUT OF GREEN HELL, GUARDS BAFFLED +++"

}; /* end BOARD_KEY — don't edit below this line */
