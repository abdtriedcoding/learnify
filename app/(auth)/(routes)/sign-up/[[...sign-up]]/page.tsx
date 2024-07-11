import { type Metadata } from 'next'
import { SignUp } from '@clerk/nextjs'

export const metadata: Metadata = {
  title: 'SignUp Page',
}

export default function SignUpPage() {
  return <SignUp />
}
