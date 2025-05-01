import * as React from "react"
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components"

interface WelcomeEmailProps {
  name: string
  redirectUrl: string
}

export const WelcomeEmail = ({ name, redirectUrl }: WelcomeEmailProps) => {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="m-auto bg-white px-2 font-sans">
          <Preview>Verify Your Email Address for CollabTube</Preview>
          <Container className="mx-auto my-[20px] max-w-[465px] rounded border border-solid border-[#eaeaea] p-[20px]">
            <Heading className="mx-0 my-[20px] p-0 text-center text-[24px] font-semibold text-black">
              Welcome to CollabTube!
            </Heading>
            <Text className="text-[14px] leading-[24px] text-black">Hello {name},</Text>
            <Text className="text-[14px] leading-[24px] text-black">
              Thank you for signing up! We&apos;re excited to have you on board. Your
              account has been successfully created, and you&apos;re ready to start
              exploring our platform.
            </Text>
            <Section className="my-[32px] text-center">
              <Button
                className="rounded bg-[#000000] px-5 py-3 text-center text-[12px] font-semibold text-white no-underline"
                href={redirectUrl}
              >
                Get Started
              </Button>
            </Section>
            <Text className="text-[14px] leading-[24px] text-black">
              If you have any questions or need assistance, please don&apos;t hesitate to
              reach out to our support team.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

WelcomeEmail.PreviewProps = {
  name: "Alan Turing",
  redirectUrl: "https://avatars.githubusercontent.com/u/18133?v=4",
} as WelcomeEmailProps

export default WelcomeEmail
