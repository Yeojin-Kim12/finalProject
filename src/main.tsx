import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css';
import { RecoilRoot } from 'recoil';
// import axios from 'axios';

// axios.defaults.withCredentials = true; // 쿠기 허용, url에 쿠키를 보내면 전송이 안 되서 이후 수정해야함(원래는 인증 있어야함)

const queryClient = new QueryClient();
async function deferRender() {
  const { worker } = await import('./mocks/browser.ts');
  return worker.start();
}
deferRender().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </RecoilRoot>
    </React.StrictMode>,
  );
});
