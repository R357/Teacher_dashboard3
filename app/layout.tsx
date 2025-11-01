import type { Metadata } from 'next'

import './globals.css'



export const metadata: Metadata = {

  title: 'EduLearn - Transform Your Future with World-Class Education',

  description: 'Access premium courses from top universities worldwide. Learn at your own pace or pursue university registration for recognized degrees.',

}



export default function RootLayout({

  children,

}: {

  children: React.ReactNode

}) {

  return (

    <html lang="en">

      <body>{children}</body>

    </html>

  )

}