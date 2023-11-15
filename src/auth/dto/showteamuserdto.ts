import { IsString} from 'class-validator';

export class Showteamuserdto {
    @IsString()
    email:string;
}