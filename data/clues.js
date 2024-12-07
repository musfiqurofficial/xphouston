import Amethyst from "../app/asset/Mechanic (1080 x 1920 px)/Amethyst Ring.webp";
import Autopsy from "../app/asset/Mechanic (1080 x 1920 px)/Autopsy Report.webp";
import Broken from "../app/asset/Mechanic (1080 x 1920 px)/Broken Bottle.webp";
import Calling from "../app/asset/Mechanic (1080 x 1920 px)/Calling Card.webp";
import Doctors from "../app/asset/Mechanic (1080 x 1920 px)/Doctors note.webp";
import Hargrave from "../app/asset/Mechanic (1080 x 1920 px)/Hargrave Suspects.webp";
import ID from "../app/asset/Mechanic (1080 x 1920 px)/ID Card.webp";
import Maps from "../app/asset/Mechanic (1080 x 1920 px)/Map.webp";
import Medical from "../app/asset/Mechanic (1080 x 1920 px)/Medical Bag.webp";
import Pathology from "../app/asset/Mechanic (1080 x 1920 px)/Pathology Book.webp";
import Peice from "../app/asset/Mechanic (1080 x 1920 px)/Peice of Note.webp";
import People from "../app/asset/Mechanic (1080 x 1920 px)/People of Interest.webp";
import Police from "../app/asset/Mechanic (1080 x 1920 px)/Police Report.webp";
import Press from "../app/asset/Mechanic (1080 x 1920 px)/Press Badge.webp";
import Townsend from "../app/asset/Mechanic (1080 x 1920 px)/Townsend Suspects.webp";

export const clues = [
  {
    character: "Wallace",
    name: "Map",
    photo: Maps,
    item: "Map",
    description:
      "A folded map of the festival grounds, hand-drawn with precision and annotated in the editor’s familiar scrawl. The paper is smudged with ink and faint fingerprints, a testament to its frantic preparation.",
    password: "map",
    color: "#C6E7FF",
  },
  {
    character: "Wallace",
    name: "Press Badge",
    photo: Press,
    item: "Press Badge",
    description:
      "A sturdy, brass-rimmed badge bearing the emblem of the Galveston Times and a neatly handwritten name. The badge’s surface shows slight tarnish, as though it has seen many long nights and hurried encounters.",
    password: "press",
    color: "#FFC6C7",
  },
  {
    character: "Wallace",
    name: "People of Interest",
    photo: People,
    item: "List",
    description:
      "A crumpled sheet of paper with a typed header reading Persons of Note, though several handwritten annotations crowd the margins. The names are underlined, some with question marks or cryptic shorthand like 'Connections?' or 'Dangerous.'",
    password: "list",
    color: "#F7D26B",
  },
  {
    character: "Gruene",
    name: "Calling Card",
    photo: Calling,
    item: "Card",
    description:
      "An embossed card, simple yet elegant, with Emily Gruene’s name written in flowing calligraphy. The back has faint smudges of perfume, an understated floral scent that lingers in the air when handled.",
    password: "card",
    color: "#B5EAD7",
  },
  {
    character: "Gruene",
    name: "Doctor's Note",
    photo: Doctors,
    item: "Letter",
    description:
      "A small, folded piece of paper with a formal letterhead from Dr. Carter’s practice. The handwriting is precise, almost clinical, but the phrasing betrays unease.",
    password: "letter",
    color: "#FFDEA2",
  },
  {
    character: "Gruene",
    name: "Amethyst Ring",
    photo: Amethyst,
    item: "Ring",
    description:
      "A stunning amethyst ring with delicate filigree, set in gold, found tucked away in Mayor Chester Gruene’s personal desk drawer. The initials 'JG' are engraved on the inner band in ornate script.",
    password: "ring",
    color: "#E4C1F9",
  },
  {
    character: "Townsend",
    name: "Police Reports",
    photo: Police,
    item: "Reports",
    description:
      "A leather-bound portfolio containing several typewritten pages, stamped with the official seal of the Galveston Police Department. The reports detail each murder scene with cold precision.",
    password: "reports",
    color: "#C7CEEA",
  },
  {
    character: "Townsend",
    name: "List of Suspects",
    photo: Townsend,
    item: "Suspects",
    description:
      "A small list of people that Townsend personally accuses. Ricky Fitts, Chris Stutton, Shipyardsmen, Ebenezer Russellton.",
    password: "suspects",
    color: "#FFABAB",
  },
  {
    character: "Townsend",
    name: "Identification Card",
    photo: ID,
    item: "Identity",
    description:
      "A dog-eared identification card belonging to Ricky Fitts, bearing his photograph. The card’s edges are frayed, and its surface is faintly stained.",
    password: "identity",
    color: "#85E3FF",
  },
  {
    character: "Sutton",
    name: "Autopsy Report",
    photo: Autopsy,
    item: "Autopsy",
    description:
      "A tightly bound stack of papers, with clinical notes penned by Chris Strutton. Certain pages are marked with repeated underlines and frantic exclamations in the margins.",
    password: "autopsy",
    color: "#D5AAFF",
  },
  {
    character: "Sutton",
    name: "Medical Bag Contents",
    photo: Medical,
    item: "Medical",
    description:
      "An aged leather bag with scuffs and dark stains on its corners. Inside, its contents include tarnished surgical tools, folded autopsy notes, and a nearly empty laudanum bottle.",
    password: "medical",
    color: "#C8B6FF",
  },
  {
    character: "Hargrave",
    name: "Piece of a Note",
    photo: Hargrave,
    item: "Note",
    description:
      "A jagged scrap of paper, the edges torn unevenly. The ink is faded, but the words '...know too much about the shipments. They’ll silence you like the others' are chillingly clear.",
    password: "note",
    color: "#FF968A",
  },
  {
    character: "Hargrave",
    name: "Broken Glass with Label",
    photo: Broken,
    item: "Vial",
    description:
      "The jagged remains of a small glass vial, its label smeared but legible enough to spell out '...danu.' A faint chemical scent still clings to the shards.",
    password: "vial",
    color: "#FFB5E8",
  },
  {
    character: "Sutton",
    name: "Pathology Book",
    photo: Pathology,
    item: "Pathology Book",
    description:
      "A well-worn copy of Modern Pathological Anatomy, a textbook filled with detailed diagrams and case studies on autopsy procedures. Found in Chris Strutton’s workspace, its margins are cluttered with frantic, handwritten notes. Certain pages are dog-eared, particularly those discussing strangulation and toxicology.",
    password: "book",
    color: "#FFDEA2",
  },
];
