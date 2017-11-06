import { SAVE_PRESET, STORE_PRESETS, UPDATE_PRESET } from '../types/presetTypes';

const initialState = {
    presets: []
}

export const presetReducer = (state = initialState, action) => {
    switch(action.type) {
        case STORE_PRESETS:
            return { ...state, presets: action.presets }
        case SAVE_PRESET:
            return { ...state, presets: state.presets.concat(action.preset) }
        case UPDATE_PRESET:
            let updatedPresets = state.presets;
            updatedPresets[action.id] = action.newPreset;
            return { ...state, presets: updatedPresets }
        default:
            return state;
    }
}