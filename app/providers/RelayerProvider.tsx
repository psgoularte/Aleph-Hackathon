"use client"

import { createContext, useContext, useEffect, useState } from "react"

import { initSDK, createInstance, SepoliaConfig } from "@zama-fhe/relayer-sdk/bundle"

type RelayerCtx = { relayer: any | null; ready: boolean }
const RelayerContext = createContext<RelayerCtx>({ relayer: null, ready: false })

export function RelayerProvider({ children }: { children: React.ReactNode }) {
  const [relayer, setRelayer] = useState<any>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let cancel = false
    ;(async () => {
      await initSDK() 
      const instance = await createInstance(SepoliaConfig)
      if (!cancel) { setRelayer(instance); setReady(true) }
    })()
    return () => { cancel = true }
  }, [])

  if (!ready) return <div>Inicializando privacidade…</div>
  return (
    <RelayerContext.Provider value={{ relayer, ready }}>
      {children}
    </RelayerContext.Provider>
  )
}

export const useRelayer = () => useContext(RelayerContext)
