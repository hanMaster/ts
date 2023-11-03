interface PaymentRequest {
    sum: number;
    from: number;
    to: number;
}

enum PaymentStatus {
    SUCCESS = 'success',
    FAILED = 'failed',
}

interface SuccessPayload extends PaymentRequest {
    databaseId: number;
}

interface FailedPayload {
    errorMessage: string;
    errorCode: number;
}

interface PaumentResponse {
    status: PaymentStatus;
    data: SuccessPayload | FailedPayload;
}
