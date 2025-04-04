'use client'

import './globals.css'
import { store } from "@/store/store";
import { Provider } from "react-redux";
import '@/utils/firebase'
import { ThemeSwitcher } from '@/components/ThemeSwitcher';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Provider store={store}>
        <body>
          <ThemeSwitcher />
          {children}
        </body>
      </Provider>
    </html>
  );
}
