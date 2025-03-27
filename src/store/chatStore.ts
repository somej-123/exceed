import { create } from 'zustand';
import { aiClient } from '../api/client';
import { useEffect } from 'react';
import { showError, showHtml } from '../utils/swal';

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
      const modelListFiltered = response.data.data.filter((model: any) => model.id.includes("gemma"));
      set({ currentModel: modelListFiltered[0] });
      showHtml('확인', '현재 모델은 <b>' + get().currentModel.id + '</b> 입니다.');
    } catch (error) {
      showError('오류', '모델 목록을 가져오는데 실패했습니다.');
      console.error('모델 목록을 가져오는데 실패했습니다:', error);
    }
  },

  sendMessage: async (text: any) => {
    try {
      set({ isLoading: true, error: null });
      
      // 사용자 메시지 추가
      const userMessage = {
        type: 'user',
        text,
        timestamp: new Date().toLocaleTimeString()
      };
      get().addMessage(userMessage);

      // API 호출
      const response = await aiClient.post('/v1/chat/completions', {
        model: get().currentModel.id,
        messages: [
          { role: "user", content: text }
        ],
        temperature: 0.7,
        max_tokens: -1,
        stream: false
      });

      console.log(response);

      // AI 응답 메시지 추가
      const botMessage = {
        type: 'bot',
        text: `<pre>${response.data.choices[0].message.content}</pre>`,
        timestamp: new Date().toLocaleTimeString()
      };

      console.log(botMessage);
      get().addMessage(botMessage);

    } catch (error) {
      showError('오류', '메시지 전송에 실패했습니다.');
      set({ error: '메시지 전송에 실패했습니다.' });
    } finally {
      set({ isLoading: false });
    }
  },

  // 추가로 원하는 상태나 메서드를 자유롭게 추가할 수 있습니다
  customData: {},
  setCustomData: (data: any) => {
    set({ customData: data });
  }
})); 