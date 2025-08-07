import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	LucideIcons,
} from "@amazing-chat/ui";
import { useNavigate } from "@tanstack/react-router";
import { useMemo } from "react";

const { BellOff } = LucideIcons;
interface ConversationItemProps {
	avatar?: string;
	username: string;
	shortContext: string;
	time: string;
}
const ConversationItem = (props: ConversationItemProps) => {
	const { avatar, username, shortContext, time } = props;
	const navigate = useNavigate();
	const emptyAvatar = useMemo(() => {
		return (
			<div
				className={
					"size-full bg-primary flex items-center justify-center text-xl font-bold"
				}
			>
				{username.slice(-2)}
			</div>
		);
	}, [username]);
	return (
		<a
			onClick={() => navigate({ to: "/auth/login" })}
			className="w-full overflow-auto hover:bg-sidebar-accent hover:text-sidebar-accent-foreground flex gap-2 border-b p-3 text-sm leading-tight whitespace-nowrap last:border-b-0"
		>
			<Avatar className={"rounded-md size-12"}>
				<AvatarImage src={avatar} />
				<AvatarFallback>{emptyAvatar}</AvatarFallback>
			</Avatar>
			<div className={"flex-1 flex flex-col overflow-auto"}>
				<div className="flex w-full items-center gap-2 overflow-auto ">
					<span className={"flex-1 truncate text-base"}>{username}</span>{" "}
					<span className="ml-auto text-muted-foreground">
						<BellOff size={16} />
					</span>
				</div>
				<div className="flex w-full text-base text-muted-foreground items-end mt-auto gap-2">
					<span className="flex-1 truncate">{shortContext}</span>
					<span className="ml-auto text-xs ">{time}</span>
				</div>
			</div>
			{/*<div className="flex w-full items-center gap-2">*/}
			{/*    <span>{mail.name}</span>{" "}*/}
			{/*    <span className="ml-auto text-xs">{mail.date}</span>*/}
			{/*</div>*/}
			{/*<span className="font-medium">{mail.subject}</span>*/}
			{/*<span className="line-clamp-2 w-[260px] text-xs whitespace-break-spaces">*/}
			{/*                          {mail.teaser}*/}
			{/*                      </span>*/}
		</a>
	);
};
export default ConversationItem;
