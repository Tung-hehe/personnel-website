'use client'

import { useState } from 'react'

import { LocaleType, aPuzzleADayConfig } from '@/data/config'
import { DAYS_IN_MONTH, MONTH_NAMES } from '@/utils/aPuzzleADay'
import { APuzzleADayBoard } from './APuzzleADayBoard'

function todayMonthDay(): { month: number, day: number } {
  const now = new Date()
  return { month: now.getMonth() + 1, day: now.getDate() }
}

export function APuzzleADayGame({ locale }: { locale: LocaleType }) {
  const initial = todayMonthDay()
  const [month, setMonth] = useState(initial.month)
  const [day, setDay] = useState(Math.min(initial.day, DAYS_IN_MONTH[initial.month - 1]))

  function handleMonthChange(newMonth: number) {
    setMonth(newMonth)
    setDay((prev) => Math.min(prev, DAYS_IN_MONTH[newMonth - 1]))
  }

  function handleToday() {
    const t = todayMonthDay()
    setMonth(t.month)
    setDay(t.day)
  }

  return (
    <div className="pt-6">
      <h1 className="mb-6 text-4xl font-extrabold leading-9 tracking-tight text-gray-100 sm:text-4xl sm:leading-10">
        {aPuzzleADayConfig.title[locale]}
      </h1>
      <p className="mb-4 text-gray-400">{aPuzzleADayConfig.rules[locale]}</p>

      <div className="mx-auto mb-6 flex w-full max-w-xl flex-wrap items-center gap-2">
        <span className="text-sm font-medium text-gray-300">{aPuzzleADayConfig.pickDate[locale]}:</span>
        <select
          value={month}
          onChange={(e) => handleMonthChange(Number(e.target.value))}
          className="rounded-lg border border-gray-700 bg-primary-dark/30 px-3 py-1.5 text-sm text-gray-100 focus:border-primary focus:outline-none"
        >
          {MONTH_NAMES.map((name, i) => (
            <option key={name} value={i + 1}>{name}</option>
          ))}
        </select>
        <select
          value={day}
          onChange={(e) => setDay(Number(e.target.value))}
          className="rounded-lg border border-gray-700 bg-primary-dark/30 px-3 py-1.5 text-sm text-gray-100 focus:border-primary focus:outline-none"
        >
          {Array.from({ length: DAYS_IN_MONTH[month - 1] }, (_, i) => i + 1).map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
        <button
          onClick={handleToday}
          className="rounded-lg border border-gray-700 bg-primary-dark/30 px-3 py-1.5 text-sm font-medium text-gray-200 transition-colors hover:border-primary hover:bg-primary-dark"
        >
          {aPuzzleADayConfig.today[locale]}
        </button>
      </div>

      <APuzzleADayBoard key={`${month}-${day}`} month={month} day={day} locale={locale} config={aPuzzleADayConfig} />
    </div>
  )
}
