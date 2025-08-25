import { stores, types,instants } from "@amazing-chat/shared";
import { getRouteApi } from "@tanstack/react-router";
import { useLayoutEffect } from "react";
import WKSDK, { ChannelInfo, CMDContent, ConnectStatus, Conversation, ConversationAction, Message, SendackPacket } from "wukongimjssdk";
import {useIMStore} from "@/stores";
import { match } from "ts-pattern";

const {StorageManager}=instants
const { ResponseCode } = types;
const { useAppStore } = stores;
type IMAddress = types.IMAddress;
const useIMInit = () => {
	const routeApi = getRouteApi("/base");
	const response = routeApi.useLoaderData();
	useLayoutEffect(() => {
		if (response?.code === ResponseCode.SUCCESS && response?.data) {
			const { data } = response;
			init(data);
			return () => {
				console.warn("离开IM区域，卸载所有监听并断开连接");
				WKSDK.shared().connectManager.removeConnectStatusListener(
					connectStatusListener,
				);
				WKSDK.shared().conversationManager.removeConversationListener(listenConversation)
				WKSDK.shared().chatManager.removeMessageStatusListener(listen)
				WKSDK.shared().chatManager.removeMessageListener(listenMessage)
				WKSDK.shared().chatManager.removeCMDListener(cmdListener)
				WKSDK.shared().channelManager.removeListener(channelInfoListener)
				WKSDK.shared().connectManager.disconnect();
			};
		}
	}, []);
	const init = async (config: IMAddress) => {
		const user = useAppStore.getState().user!;
		console.warn(`用户:${user.id},进入IM区域，开始监听并开始连接`);

		WKSDK.shared().config.addr = config.ws_addr;
		WKSDK.shared().config.uid = user.id;
		WKSDK.shared().config.token = user.access_token;
		WKSDK.shared().config.debug = true;
		//开始连接
		WKSDK.shared().connectManager.connect();
		//监听连接状态
		WKSDK.shared().connectManager.addConnectStatusListener(
			connectStatusListener,
		);
		//监听最近会话
		WKSDK.shared().conversationManager.addConversationListener(listenConversation)
		//监听消息发送状态
		WKSDK.shared().chatManager.addMessageStatusListener(listen)
		//监听消息
		WKSDK.shared().chatManager.addMessageListener(listenMessage)
		//监听cmd
		WKSDK.shared().chatManager.addCMDListener(cmdListener)
		//监听频道信息
		WKSDK.shared().channelManager.addListener(channelInfoListener)
	};
	function cmdListener(message:Message){
		console.warn("[cmd]",message);
		const cmdContent = message.content as CMDContent
		const cmd = cmdContent.cmd
		const param = cmdContent.param
		console.warn("[cmd 内容]",{cmd,param});
	}
	function listenMessage(message:Message){
		console.warn("[消息]",message);
		useIMStore.setState(oldState=>{
			const  chatMessages = oldState.chatMessageMap.get(message.channel.channelID)
			return {
				chatMessageMap:oldState.chatMessageMap.set(message.channel.channelID,chatMessages?[...chatMessages,message]:[message])
			}
		})
	}
	function listen(packet:SendackPacket){
		console.warn("[消息clientSeq]",packet.clientSeq);
		if (packet.reasonCode === 1) {
			console.warn("[消息发送成功]",packet.clientSeq);
		}else{
			console.warn("[消息发送失败]",packet.clientSeq);
		}
		
	}
	async function connectStatusListener(status: ConnectStatus, reasonCode?: number) {
		console.warn("连接状态",status,reasonCode)
		useIMStore.setState({connectStatus:status})
		match(status)
		.with(ConnectStatus.Connected,async()=>{
			console.info("连接成功");
			const conversations =await WKSDK.shared().conversationManager.sync()
			useIMStore.setState({conversationList:conversations})
			
		})
		.with(ConnectStatus.Disconnect,()=>{
			console.error("连接失败", reasonCode); //  reasonCode: 2表示认证失败（uid或token错误）
		})
		.with(ConnectStatus.ConnectFail,()=>{
			console.error("连接失败", reasonCode); //  reasonCode: 2表示认证失败（uid或token错误）
		})
		.with(ConnectStatus.ConnectKick,()=>{
			console.error("被踢下线", reasonCode);
			//如果当时正要退出登录，则关闭退出登录弹窗
			if(useAppStore.getState().logoutOpen){
				useAppStore.setState({logoutOpen:false})
			}
			StorageManager.removeToken()
			useAppStore.setState({kickedOpen:true})
		})
		.with(ConnectStatus.Connecting,()=>{
			console.info("连接中");
		})
	}
	async function listenConversation(conversation:Conversation,action:ConversationAction) {
		match(action)
		.with(ConversationAction.add,()=>{
			console.warn("[conversation 新增]",conversation);
			useIMStore.setState(oldState=>{
				return {
					conversationList:oldState.conversationList.concat(conversation)
				}
			})
		})
		.with(ConversationAction.update,()=>{
			console.warn("[conversation 更新]",conversation);
			useIMStore.setState(oldState=>{
				return {
					conversationList:oldState.conversationList.map(item=>{
						if (item.channel.channelID===conversation.channel.channelID){
							return conversation
						}
						return item
					})
				}
			})
		})
		.with(ConversationAction.remove,()=>{
			console.warn("[conversation 删除]",conversation);
			useIMStore.setState(oldState=>{
				return {
					conversationList:oldState.conversationList.filter(item=>item.channel.channelID!==conversation.channel.channelID)
				}
			})
		})
	}
	function channelInfoListener(channelInfo:ChannelInfo){
		console.warn("[频道详情更新]",channelInfo);
		useIMStore.setState(oldState=>{
			return {
				conversationList:oldState.conversationList.map(item=>{
					if(item.channel.channelID===channelInfo.channel.channelID){
						return {
							...item,
							channelInfo:channelInfo
						} as Conversation
					}
					return item
				})
			}
		})
	}
};
export default useIMInit;
