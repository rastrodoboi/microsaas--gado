'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export default function ListingDetail() {
  const params = useParams()
  const id = params?.id as string
  const [l, setL] = useState<any>(null)

  useEffect(() => {
    if (!id) return
    const run = async () => {
      const { data, error } = await supabase.from('listings').select('*').eq('id', id).single()
      if (error) console.error(error)
      setL(data)
    }
    run()
  }, [id])

  if (!l) return <p>Carregando...</p>

  return (
    <div className="grid gap-4">
      <div className="card">
        <h1 className="text-xl font-semibold capitalize">{l.categoria}</h1>
        <div className="text-sm text-neutral-500">{l.cidade}/{l.uf}</div>
        <div className="mt-2 grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
          <div>Qtd: <b>{l.qtd}</b></div>
          <div>Media @: <b>{l.media_arroba}</b></div>
          <div>Idade: <b>{l.idade_meses} meses</b></div>
          <div>Preco: <b>R$ {l.preco_valor} ({l.preco_tipo})</b></div>
          <div>Status: <b>{l.status}</b></div>
        </div>
        <p className="mt-3 whitespace-pre-wrap">{l.descricao || 'Sem descricao.'}</p>
      </div>

      <div className="card">
        <h2 className="text-lg font-semibold">Enviar Proposta</h2>
        <p className="text-sm text-neutral-600">Placeholder do MVP - salve a proposta no Supabase manualmente por enquanto.</p>
      </div>
    </div>
  )
}
