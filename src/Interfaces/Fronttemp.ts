export interface Root {
    ok: boolean
    data: Data
  }
  
  export interface Data {
    matches: Match[]
  }
  
  export interface Match {
    time: string
    title: string
    homeTeam: HomeTeam
    awayTeam: AwayTeam
    homeScore: number
    awayScore: number
    status: string
  }
  
  export interface HomeTeam {
    name: string
    players: Player[]
    points: number
    place: number
    total_kills: number
  }
  
  export interface Player {
    username: string
    kills: number
  }
  
  export interface AwayTeam {
    name: string
    players: Player2[]
    points: number
    place: number
    total_kills: number
  }
  
  export interface Player2 {
    username: string
    kills: number
  }
  