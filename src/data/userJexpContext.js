const headers = {
    'Content-Type': 'application/json'
};

export const getUserContext = ({cxs: {sessionId}, userPropScoreName, isResetEnabled, dispatch}) => {
    // Console.log("[getUserContext] cxs :",cxs);
    const contextServerPublicUrl = window.digitalData.contextServerPublicUrl || window.digitalData.wemInitConfig.contextServerUrl;
    const body = {
        requiredProfileProperties: [userPropScoreName],
        sessionId,
        source: {
            itemId: window.digitalData.page.pageInfo.pageID,
            itemType: 'page',
            scope: window.digitalData.scope
        }
    };
    fetch(`${contextServerPublicUrl}/context.json`, {
        method: 'post',
        headers,
        body: JSON.stringify(body)
    }).then(response => {
        if (response.status !== 200) {
            throw new Error(`Failed to retrieve user profile, HTTP error! status: ${response.status}`);
        }

        return response.json();
    }).then(data => {
        dispatch({
            case: 'USER_DATA_SCORE_READY',
            payload: {
                isResetEnabled,
                userScore: data.profileProperties[userPropScoreName]
            }
        });
        // SetUserData(response.data);
    }).catch(error => {
        console.log('Error in the call to retrieve user profiles data: ');
        console.log(error);
    });
};
