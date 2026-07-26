import { generatePageSeo } from '@/utils/seo'
import { sudokuConfig, LocaleType } from '@/data/config'
import { SudokuGame } from '@/components/game/sudoku/SudokuGame'

export const generateMetadata = ({ params }: { params: { locale: LocaleType } }) => {
  return generatePageSeo({ title: sudokuConfig.title[params.locale] })
}

export default function Sudoku({ params }: { params: { locale: LocaleType } }) {
  return <SudokuGame locale={params.locale} />
}
