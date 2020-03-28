import { User } from './user';
export class Project {
    
    projectId: number;
    projectName: string;
    priority: number = 0;
    startDate: string;
    endDate: string;
    status: number;
    user: User = new User();
    noOfTask: number;
    nofCompTask: number;
}
