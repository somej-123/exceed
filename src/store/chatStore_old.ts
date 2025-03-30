import { create } from 'zustand';
import { aiClient } from '../api/client';
import { showError, showHtml } from '../utils/swal';
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
    try {
      const response = await aiClient.get('/v1/models');

      const modelListFiltered = response.data.data.filter((model: any) => model.id !== "text-embedding-nomic-embed-text-v1.5");
      set({ currentModel: modelListFiltered[0] });
      // showHtml('확인', '현재 모델은 <b>' + get().currentModel.id + '</b> 입니다.');
    } catch (error) {
      set(produce((state: any) => {
        state.currentModel = {id:'실패'};
      }));
      // showError('오류', '모델 목록을 가져오는데 실패했습니다.');
      console.error('모델 목록을 가져오는데 실패했습니다:', error);
    }
  },

  sendMessage: async (text: any) => {
    try {
      set(produce((state: any) => {
        state.isLoading = true;
        state.error = null;
      }));
      
      const userMessage = {
        type: 'user',
        text,
        timestamp: new Date().toLocaleTimeString()
      };
      get().addMessage(userMessage);

      // 이전 메시지들을 API 형식으로 변환
      const messageHistory = get().messages.map((msg: any) => ({
        role: msg.type === 'user' ? 'user' : 'assistant',
        content: msg.text.replace(/<[^>]*>/g, '') // HTML 태그 제거
      }));

      const response = await aiClient.post('/v1/chat/completions', {
        model: get().currentModel ? get().currentModel.id : 'gemma-3-4b-it',
        messages: messageHistory,
        temperature: 0.7,
        max_tokens: -1,
        stream: false
      });

      console.log(response);

      const botMessage = {
        type: 'bot',
        text: `<pre>${response.data.choices[0].message.content}</pre>`,
        timestamp: new Date().toLocaleTimeString()
      };

      console.log(botMessage);
      get().addMessage(botMessage);

    } catch (error) {
      showError('오류', '메시지 전송에 실패했습니다.');
      set(produce((state: any) => {
        state.error = '메시지 전송에 실패했습니다.';
      }));
    } finally {
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