import { create } from 'zustand'

const useGetUsers = create((set)=>({
    selectedConversation : null,
    setSelectedConversation : (selectedConversation)=>set({selectedConversation}),
    messages : [],
    setMessages : (messages)=>set({messages})
}));

export default useGetUsers;