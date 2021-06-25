export type Maybe<T> = T | null;

type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
    Date: any;
    DateTime: any;
};

//profile

export type ProfileType = {
  id: Scalars['ID'];
  nickname: Scalars['String'];
  user: {
    id: Scalars['ID'];
  };
  teamBoard: TeamBoardType;
  isCoach: Scalars['Boolean'];
  finishedScheduleCount: Scalars['Int'];
  joinAt: Scalars['DateTime'];
  isGuest: Scalars['Boolean'];
}

export type MyProfileType = {
  myProfile: ProfileType;
}