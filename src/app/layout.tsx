'use client'

import './globals.css'
import { store } from "@/store/store";
import { Provider } from "react-redux";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Provider store={store}>
        <body>
          {children}
        </body>
      </Provider>
    </html>
  );
}
