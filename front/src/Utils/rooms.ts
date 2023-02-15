import { Room, User } from "../../types";

const getUserByName = (users: User[], name: string): User | undefined => {
  return users.find((object: User) => object.login === name);
};

const thereIsSomeOneOnline = (users: User[], room: Room): boolean => {
  if (room.isGroupChat)
    return room.RoomUsers.some(
      ({ userId, status }) =>
        status === 'Member' && users.some((ele: any) => ele.id === userId && ele.isOnline === true)
    );
  else {
    const user = getUserByName(users, room.name);
    if (user) return user.isOnline;
    return false;
  }
};

export { getUserByName, thereIsSomeOneOnline };
