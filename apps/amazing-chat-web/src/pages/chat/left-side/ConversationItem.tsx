
import { isTextContent } from "@/utils/is";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	cn,
	LucideIcons,
} from "@amazing-chat/ui";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useMemo } from "react";
import WKSDK, { Conversation, MessageContent } from "wukongimjssdk";
import { getTimeStringAutoShort } from "@/utils/format";
import { AmazingEditorManager } from "@amazing-chat/editor";
import { InstanceContainer } from "@/components";


const { BellOff } = LucideIcons;
interface ConversationItemProps {
	conversation:Conversation
	active?:boolean
}
const ConversationItem = (props: ConversationItemProps) => {
	const { conversation,active } = props;
	console.warn("conversation",conversation);
	
	const navigate = useNavigate();
	const username = useMemo(()=>{
		return conversation.channelInfo?.title
	},[conversation.channelInfo])
	const emptyAvatar = useMemo(() => {
		return (
			<div
				className={
					"size-full bg-primary flex items-center justify-center text-xl font-bold"
				}
			>
				{username?.slice(-2)}
			</div>
		);
	}, [username]);
	const avatar = useMemo(()=>{
		return conversation.channelInfo?.logo
	},[conversation.channelInfo])
	useQuery({
		queryKey:[`channelInfo-${conversation.channel.channelID}`],
		queryFn:async()=>{
			let channelInfo = WKSDK.shared().channelManager.getChannelInfo(conversation.channel)
			if (!channelInfo) {
				await WKSDK.shared().channelManager.fetchChannelInfo(conversation.channel)
				channelInfo = WKSDK.shared().channelManager.getChannelInfo(conversation.channel)
				
			}
			return channelInfo
		},
		refetchOnWindowFocus:false,
		retry:false,
	})

	const shortContext = useMemo(()=>{
		const lastMessage = conversation.lastMessage
		if (!lastMessage) {
			return null
		}
		const content = lastMessage.content as MessageContent
		if (isTextContent(content)) {
			const pureText = AmazingEditorManager.getTextFromHtml(content.text || '')
			return pureText
		}
		return content.conversationDigest
	},[conversation.lastMessage])
	const time = useMemo(()=>{
		const timestamp = conversation.lastMessage?.timestamp
		if (!timestamp) {
			return null
		}
		return(
			<InstanceContainer timestamp={timestamp * 1000} />
		)
	},[conversation.lastMessage?.timestamp])
	return (
		<a
			onClick={()=>{
				navigate({
					to:`/base/chat/${conversation.channel.channelID}`
				})
			}}
			className={cn(
				"w-full rounded not-last:mb-1 cursor-pointer overflow-auto hover:bg-sidebar-accent hover:text-sidebar-accent-foreground flex gap-2 border-b p-3 text-sm leading-tight whitespace-nowrap last:border-b-0",
				{
					"bg-primary/20 hover:bg-primary":active
				}
			)}
		>
			<Avatar className={"rounded-md size-12"}>
				<AvatarImage src={avatar} />
				<AvatarFallback>{emptyAvatar}</AvatarFallback>
			</Avatar>
			<div className={"flex-1 flex flex-col overflow-auto"}>
				<div className="flex w-full items-center gap-2 overflow-auto ">
					<span className={"flex-1 truncate text-base"}>{username}</span>{" "}
					{/* <span className="ml-auto text-muted-foreground">
						<BellOff size={16} />
					</span> */}
				</div>
				<div className="flex w-full text-base text-muted-foreground items-end mt-auto gap-2">
					<span className="flex-1 truncate">{shortContext}</span>
					<span className="text-xs ">{time}</span>
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
