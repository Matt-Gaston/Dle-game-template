
// ####################################################
// MUST FILL OUT THIS SECTION FOR YOUR DATA ----


// Must fill this out for your custom data to be used
export interface itemDataStructure{ 
    _id?: string,
    championId?: string,
    championName: string,
    gender: string
    positions: string[],
    species: string[],
    resource: string,
    range_type: string[],
    regions: string[],
    release_date: number
}

// fields that should not be displayed to user that are a part of the above interface (itemDataStructures)
export const doNotDisplayTheseLabels = ["_id", "championId"]

// The field that is treated as the answer/guess
export const answer_field = "championName"


// END OF CUSTOM DATA SECTION
// ####################################################


export const ANSWER_STATUS = {
    CORRECT: 0,
    INCORRECT: 1,
    PARTIALLYCORRECT: 2,
    INCORRECTLOW: 3,
    INCORRECTHIGH: 4
}

export type AnswerStatus = typeof ANSWER_STATUS[keyof typeof ANSWER_STATUS]