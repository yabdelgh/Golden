export type Friend = {
  user1Id: number;
  user2Id: number;
  status: boolean;
};

export type Msg = {
  id: number;
  msg: string;
  userId: number;
  roomId: number;
  createdAt: string;
  updatedAt: string;
};

export type RoomUser = {
  userId: number;
  role?: string;
  ban?: boolean;
  mute?: boolean;
  status?: string;
};

export type Room = {
  id: number;
  name: string;
  access: string;
  isGroupChat?: boolean;
  RoomUsers: RoomUser[];
  lastMsg?: string;
};

export type User = {
  id: number;
  login: string;
  email?: string;
  imageUrl?: string;
  isOnline: boolean;
  inGame: boolean;
};

export type BlockedUser = {
  blockerId: number;
  blockedId: number;
};
