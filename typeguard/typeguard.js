"use strict";
function isSuccessResponse(res) {
    return res.status === PaymentStatus.SUCCESS && 'databaseId' in res.data;
}
function getDatabaseId(res) {
    if (isSuccessResponse(res)) {
        return res.data.databaseId;
    }
    throw new Error('Failed response');
}
