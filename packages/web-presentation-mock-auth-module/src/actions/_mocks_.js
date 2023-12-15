import {mockRoute, addBehavior} from "@efr/medservice-web-presentation-utils-mock";
import {EFR_SESSION_MARKER_HEADER_NAME} from '@efr/medservice-web-presentation-core/src/auth/constants'

let session_id = 0;

const sessionMarkerBehavior = (req, res) => {
    res.set(EFR_SESSION_MARKER_HEADER_NAME, session_id)
};

const CREATE_SESSION = ({success, request, response}) => {
    session_id++;
    sessionMarkerBehavior(request, response);
    success();
};

const GET_SESSION = ({success}) => success();

addBehavior(sessionMarkerBehavior);

export default {
    CREATE_SESSION: mockRoute.post('/session', CREATE_SESSION),
    GET_SESSION: mockRoute.get('/session', GET_SESSION),
}