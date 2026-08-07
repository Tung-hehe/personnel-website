import { type LucideIcon } from 'lucide-react';

export type IconEntry = { Icon: LucideIcon, color: string }
export type IconMap = Record<string, IconEntry>

export function IconBadge({ icon, size = 16, className = '' }: { icon?: IconEntry | null, size?: number, className?: string }) {
  if (!icon) return null
  const { Icon, color } = icon
  return <Icon size={size} strokeWidth={2} className={`${color} ${className}`.trim()} />
}
