import { create } from 'zustand';
import { apiClient } from '../api/client';
import { showError } from '../utils/swal';
import { produce } from 'immer';

export const useChatStore = create<any>((set: any, get: any) => ({
  messages: [],
  isLoading: false,
  error: null,
  currentModel: null,

  addMessage: (message: any) => {
    set((state: any) => ({
      messages: [...state.messages, message]
    }));
  },

  getModelList: async () => {

    try{
      const response = await apiClient.get('/api/messages/models');
      console.log(response);

      const modelListFiltered = response.data.data.filter((model: any) => model.id !== "text-embedding-nomic-embed-text-v1.5");
      set({ currentModel: modelListFiltered[0] });

    }catch(error){
      console.error('모델 목록을 가져오는데 실패했습니다:', error);
      showError('오류', '모델 목록을 가져오는데 실패했습니다.');
    }
    
  },

  sendMessage: async (text: any) => {
    try{
      set(produce((state: any) => {
        state.isLoading = true;
        state.error = null;
      }));

      const userMessage = {
        role: 'user',
        content:text,
        timestamp: new Date().toLocaleTimeString()
      };

      get().addMessage(userMessage);

      const messageHistory = get().messages.map((msg: any) => ({
        role: msg.role === 'user' ? 'user' : 'assistant',
        content: msg.content.replace(/<[^>]*>/g, '') // HTML 태그 제거
      }));

      const response = await apiClient.post('/api/messages/send', {
        model: get().currentModel.id,
        messages: messageHistory,
        userMessage: userMessage,
        temperature: 0.7,
        max_tokens: -1,
        stream: false
      });

      console.log(response);

      const botMessage = {
        role: 'bot',
        content: `<pre>${response.data.choices[0].message.content}</pre>`,
        timestamp: new Date().toLocaleTimeString()
      };

      get().addMessage(botMessage);


      // console.log(response);
    }catch(error){
      console.error('메시지 전송에 실패했습니다:', error);
      showError('오류', '메시지 전송에 실패했습니다.');
      set(produce((state: any) => {
        state.error = '메시지 전송에 실패했습니다.';
      }));
    }
    finally {
      set(produce((state: any) => {
        state.isLoading = false;
      }));
    }
  },

  // 추가로 원하는 상태나 메서드를 자유롭게 추가할 수 있습니다
  customData: {},
  setCustomData: (data: any) => {
    set({ customData: data });
  }
})); 