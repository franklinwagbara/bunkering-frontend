export class uploadFile {
    constructor() { }

    id: number = 0;
    upload
}

export class PreviewModel{
    id: number;
    categoryId: number;
    categoryCode: string;
    phaseId: number;
    phase: string;
    applicationType: string;
    lgaId: number;
    stateId: number;
    location: string;
    applicationforms:any [];
}

export class previewForm{
    
    id: number;
    wellLocationCategory: string;
    field: string;
    block: string;
    terrain: string;
    spudDate: string;
    wellSpudDate: string;
    wellClassApplied: string;
    wellSurfaceCoordinates: string;
    proposedRig: string;
    expectedVoloume: string;
    targetReserves: string;
    afe: string;
    estimatedOperationDays: string;
    wellName: string;
    natureOfOperation: string;
    wellCompletionInterval: string;
    rigForOperation: string;
    preOperationProductionRate: string;
    postOperationProductionRate: string;
    initialReservesAllocationOfWell: string;
    cumulativeProductionForWell: string;
    plugbackInterval: string;
    lastProductionRate: string;
}