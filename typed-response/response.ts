interface Payment {
    sum: number;
    from: number;
    to: number;
}

interface PaymentRequest extends Payment {}

enum PaymentStatus {
    SUCCESS = 'success',
    FAILED = 'failed',
}

interface SuccessPayload extends Payment {
    databaseId: number;
}

interface FailedPayload {
    errorMessage: string;
    errorCode: number;
}

interface SuccessResponse {
    status: PaymentStatus.SUCCESS;
    data: SuccessPayload;
}

interface FailedResponse {
    status: PaymentStatus.FAILED;
    data: FailedPayload;
}
