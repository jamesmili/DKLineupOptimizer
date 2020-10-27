export const proxyURL = "https://nameless-mesa-82672.herokuapp.com/";
export const BASE_URL = 'https://www.draftkings.com'
export const API_BASE_URL = 'https://api.draftkings.com'
export const GET_CONTESTS = '/lobby/getcontests'
export const AVAILABLE_PLAYERS = '/lineup/getavailableplayers'
export const DRAFTGROUPS = '/draftgroups/v1/'
export const COUNTRIES = '/addresses/v1/countries/'
export const CONTESTS = '/contests/v1/contests/'
const JSON = '?format=json'
export const draft_group = (draft_group_id) => {
    return (proxyURL + API_BASE_URL + DRAFTGROUPS + draft_group_id + JSON)
}

export const regions_url = (country_code) => {
    return (proxyURL + API_BASE_URL + COUNTRIES + country_code + JSON)
}

export const contest_url = (contest_id) => {
    return (proxyURL + API_BASE_URL + CONTESTS + contest_id + JSON)
}

export const draftTables_url = (draft_group_id) => {
    return (proxyURL + API_BASE_URL + DRAFTGROUPS + 'draftgroups/' + draft_group_id + '/draftables' + JSON)
}
