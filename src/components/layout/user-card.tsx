import { forwardRef, HTMLAttributes, Ref } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Icon } from "@/components/ui/icon";
import { User } from "@/api/user/types";

interface UserCardProps extends HTMLAttributes<HTMLDivElement> {
  user: User;
  isMenu?: boolean;
}

type UserCardRef = Ref<HTMLDivElement>;

const UserCard = forwardRef((props: UserCardProps, ref: UserCardRef) => {
  const { user, isMenu, ...rest } = props;

  return (
    <div className="flex cursor-pointer items-center gap-3" {...rest} ref={ref}>
      <Avatar>
        <AvatarImage src={user.avatar_url ?? undefined} />
        <AvatarFallback>
          <Icon name="User" />
        </AvatarFallback>
      </Avatar>

      <div className="flex flex-col items-start">
        <span className="text-body-semibold-400">{user.username}</span>
        <span className="text-body-regular-200">{user.email}</span>
      </div>

      {isMenu && <Icon name="ChevronDown" />}
    </div>
  );
});

UserCard.displayName = "UserCard";

export default UserCard;
