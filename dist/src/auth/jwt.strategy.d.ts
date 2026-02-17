import { Strategy } from 'passport-jwt';
import { UsersService } from '../users/users.service';
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    private usersService;
    constructor(usersService: UsersService);
    validate(payload: any): Promise<{
        id: string;
        email: string;
        password: string;
        name: string | null;
        phone: string | null;
        role: import("@prisma/client").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
        medal: import("@prisma/client").$Enums.AcademicMedal | null;
        grade: import("@prisma/client").$Enums.AcademicGrade | null;
        academicAssignedAt: Date | null;
        assignedByTeacherId: string | null;
    }>;
}
export {};
