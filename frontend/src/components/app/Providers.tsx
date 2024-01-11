import { Content } from '@carbon/react'
import { TutorialHeader } from '@/components/TutorialHeader/TutorialHeader'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <TutorialHeader />
      <Content>{children}</Content>
    </div>
  )
}
