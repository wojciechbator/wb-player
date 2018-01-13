import {SAVE_PRESET, STORE_PRESETS, UPDATE_PRESET} from '../types/presetTypes';

const savePreset = preset => {
    return {
        type: SAVE_PRESET,
        preset
    };
};

const storePresets = presets => {
    return {
        type: STORE_PRESETS,
        presets
    };
};

const updatePreset = (id, newPreset) => {
    return {
        type: UPDATE_PRESET,
        id,
        newPreset
    };
};

export const savePresetCreator = preset => dispatch => dispatch(savePreset(preset));

export const storePresetsCreator = presets => dispatch => dispatch(storePresets(presets));

export const updatePresetCreator = (id, newPreset) => dispatch => dispatch(updatePreset(id, newPreset));