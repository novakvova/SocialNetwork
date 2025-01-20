export interface Group {
    id: number;
    name: string;
    description: string;
    members: Member[];
  }
  
  export interface Member {
    user: {
      id: number;
      username: string;
    };
    role: 'member' | 'admin';
  }
  