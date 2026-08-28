{\rtf1\ansi\ansicpg1252\cocoartf2870
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 import \{ useState, useEffect \} from 'react';\
\
export function useTypewriter(text: string, speed = 38, startDelay = 600) \{\
  const [displayed, setDisplayed] = useState('');\
  const [done, setDone] = useState(false);\
\
  useEffect(() => \{\
    let index = 0;\
    let interval: ReturnType<typeof setInterval>;\
\
    const timer = setTimeout(() => \{\
      interval = setInterval(() => \{\
        if (index < text.length) \{\
          setDisplayed(text.substring(0, index + 1));\
          index++;\
        \} else \{\
          setDone(true);\
          clearInterval(interval);\
        \}\
      \}, speed);\
    \}, startDelay);\
\
    return () => \{\
      clearTimeout(timer);\
      if (interval) clearInterval(interval);\
    \};\
  \}, [text, speed, startDelay]);\
\
  return \{ displayed, done \};\
\}}