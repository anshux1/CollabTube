import * as React from "react"
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components"

interface VercelInviteUserEmailProps {
  name: string
  verificationUrl: string
}

export const VerificationEmail = ({
  name,
  verificationUrl,
}: VercelInviteUserEmailProps) => {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="m-auto bg-white px-2 font-sans">
          <Preview>Verify Your Email Address for CollabTube</Preview>
          <Container className="mx-auto my-[20px] max-w-[465px] rounded border border-solid border-[#eaeaea] p-[20px]">
            <Img src="https://fonts.gstatic.com/s/e/notoemoji/16.0/1fa84/32.png" />
            <Heading className="mx-0 my-[20px] p-0 text-center text-[24px] font-semibold text-black">
              Email Verification
            </Heading>
            <Text className="text-[14px] leading-[24px] text-black">Hello {name},</Text>
            <Text className="text-[14px] leading-[24px] text-black">
              To complete your registration, please verify your email address by clicking
              the button below:
            </Text>
            <Section className="my-[32px] text-center">
              <Button
                className="rounded bg-[#000000] px-5 py-3 text-center text-[12px] font-semibold text-white no-underline"
                href={verificationUrl}
              >
                Verify Your Email
              </Button>
            </Section>
            <Text className="text-[14px] leading-[24px] text-black">
              or copy and paste this URL into your browser:
            </Text>
            <Link href={verificationUrl}>{verificationUrl}</Link>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

VerificationEmail.PreviewProps = {
  name: "Alan Turing",
  verificationUrl: "https://avatars.githubusercontent.com/u/18133?v=4",
  userImage: "https://avatars.githubusercontent.com/u/18133?v=4",
} as VercelInviteUserEmailProps

export default VerificationEmail
