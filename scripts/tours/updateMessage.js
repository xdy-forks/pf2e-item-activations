import { MODULE_ID } from "../helpers/misc.js";
import { TOUR_LIST, TOURS, TOUR_BASICS } from "./tour-setup.js";

export async function sendUpdateMessage() {
    let pastVersion = "0.0.0";
    const version = game.modules.get("pf2e-item-activations").version;
    try {
        pastVersion = game.settings.get(MODULE_ID, "updateMessage");
    } catch (e) {}
    const toursToRun = getNewTourList(splitVersions(version), splitVersions(pastVersion));
    game.settings.set(MODULE_ID, "updateMessage", version);
    await runTour(toursToRun);
}

function getNewTourList(pastVersion, version) {
    const [pastMajor, pastMinor, pastPatch] = pastVersion;
    const [verMajor, verMinor, verPatch] = version;
    return TOUR_LIST.map(splitVersions)
        .filter((item) => {
            const [itemMajor, itemMinor, itemPatch] = item;
            return !!(
                itemMajor >= pastMajor &&
                itemMajor <= verMajor &&
                (itemMajor !== pastMajor ||
                    itemMinor > pastMinor ||
                    (itemMinor === pastMinor && itemPatch > pastPatch)) &&
                (itemMajor !== verMajor || itemMinor < verMinor || (itemMinor === verMinor && itemPatch < verPatch))
            );
        })
        .map((it) => it.join("."));
}

function splitVersions(version) {
    let items = version.split(".");
    return [items[0], items[1], ...items[2].split("-")];
}

async function runTour(tourStepsArray) {
    let tour = TOUR_BASICS;
    tourStepsArray.forEach((t) => tour.steps = tour.steps.concat(TOURS[t]));
    await tour.reset();
    await tour.start();
}