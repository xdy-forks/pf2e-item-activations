// Constant defining the module ID
export const MODULE_ID = "pf2e-item-activations";
export const TEXT = {};
export const IGNORED_TYPES = [
    "consumable",
    "action",
    "feat",
    "heritage",
    "ancestry",
    "background",
    "class",
    "spell",
    "melee",
    "ranged",
];
Hooks.on("ready", () => {
    TEXT.ACTIVATE_TEXT = game.i18n.format("pf2e-item-activations.code.activate");
    TEXT.ACTIVATION_TEXT = game.i18n.format("pf2e-item-activations.code.activation");
    TEXT.FREQUENCY_TEXT = game.i18n.format("pf2e-item-activations.code.frequency");
    TEXT.GRANTED_BY_TEXT = game.i18n.format("pf2e-item-activations.code.granted-by");
    TEXT.COMMAND_TEXT = game.i18n.format("pf2e-item-activations.code.activation-traits.command");
    TEXT.ENVISION_TEXT = game.i18n.format("pf2e-item-activations.code.activation-traits.envision");
    TEXT.INTERACT_TEXT = game.i18n.format("pf2e-item-activations.code.activation-traits.interact");
    TEXT.TIME = {
        turn: game.i18n.format("pf2e-item-activations.code.time.turn"),
        round: game.i18n.format("pf2e-item-activations.code.time.round"),
        minute: game.i18n.format("pf2e-item-activations.code.time.minutes"),
        "ten-minutes": game.i18n.format("pf2e-item-activations.code.time.ten-minutes"),
        hour: game.i18n.format("pf2e-item-activations.code.time.hour"),
        "twenty-four-hours": game.i18n.format("pf2e-item-activations.code.time.twenty-four-hours"),
        day: game.i18n.format("pf2e-item-activations.code.time.day"),
        week: game.i18n.format("pf2e-item-activations.code.time.week"),
        month: game.i18n.format("pf2e-item-activations.code.time.month"),
        year: game.i18n.format("pf2e-item-activations.code.time.year"),
    };
});
/**
 * Sets a module flag for the given item
 * @param {object} item The item to set the flag for
 * @param {string} flagName The name of the flag to set
 * @param {*} value The value to set for the flag
 * @returns {object} The item with the flag set
 */
export function setModuleFlag(item, flagName, value) {
    // Ensure item has a flags object
    if (!item?.flags) item.flags = {};

    // Ensure item has a flags object for the module
    if (!item?.flags?.[MODULE_ID]) item.flags[MODULE_ID] = {};

    // Set the value for the specified flag
    item.flags[MODULE_ID][flagName] = value;

    return item;
}
