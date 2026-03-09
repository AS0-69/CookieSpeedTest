export interface IGameH {
    id: number;
    pseudo: string;
    date: string;
    tempsMoyen: number;
    meilleurTemps: number;
}

export interface IGameD {
    id: number;
    gameHId: number;
    nbClick: number;
    tempsClick: number;
}

export interface IGameResult {
    game: IGameH;
    clicks: IGameD[];
    globalRank: number;
    playerRank: number;
}