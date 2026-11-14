import { MemberStatus, MemberType } from "../enums/memberTypeEnum";

export interface Member{
    _id: string;
    memberNick: string;
    memberPhone: string;
    memberPassword?: string;
    memberType: MemberType;
    memberStatus: MemberStatus;
    memberAddress: string;
    memberDesc?: string;
    memberImage?: string;
    memberPoints: number;
    createdAt: Date;
    updatedAt: Date;

}


// DTO databasega malumotni tashib oborib beradi
export interface MemberInput{
    memberNick: string;
    memberPhone: string;
    memberPassword: string;
    memberType?: MemberType;
    memberStatus?: MemberStatus;
    memberAddress?: string;
    memberDesc?: string;
    memberImage?: string;
    memberPoints?: number;

}
export interface MemberUpdateInput{
    memberNick?: string;
    memberPhone?: string;
    memberPassword?: string;
    memberAddress?: string;
    memberDesc?: string;
    memberImage?: string;
}

export interface LoginInput{
    memberNick: string;
    memberPassword: string; 
}

/* export interface UserRequest extends Request {
    member?: Omit<Member, "memberPassword">;
    file: Express.Multer.File;
    files: Express.Multer.File[];

} */


/* export interface AdminRequest extends Request {
    member?: Omit<Member, "memberPassword">;
    session: Session & {member?: Omit<Member, "memberPassword">};
    file: Express.Multer.File;
    files: Express.Multer.File[];

} */