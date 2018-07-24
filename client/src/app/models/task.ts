export class Task {
    id: string;
    name: string;
    description: string;
    projectId: number;
    initialDate: string;
    finalDate: string;
    status: string;
    employeeId: string;
    serviceId: string;
    materialId: string;
    equipmentId: string;
    forgeObjs: [{
        dbId: String,
        externalId: String,
        name: String
      }] 
}