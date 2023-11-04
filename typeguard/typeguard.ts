function isSuccessResponse(res: SuccessResponse | FailedResponse): res is SuccessResponse {
    return 'databaseId' in res.data;
}

function getDatabaseId(res: SuccessResponse | FailedResponse): number {
    if (isSuccessResponse(res)) {
        return res.data.databaseId;
    }
    throw new Error('Failed response');
}
