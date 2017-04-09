export interface IHero{
    realname:string;
    team:string;
    herocode:string;
    heroname:string;
    type:any[];
    basestats:any;
    substats:any;
}

export interface IHeroResponse{
    data:any;
    message:string;
    success:string;
}