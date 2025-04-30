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

interface MagicLinkMailProps {
  email: string
  magicLink: string
}

export function MagicLinkMail({ email, magicLink }: MagicLinkMailProps) {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="m-auto bg-white px-2 font-sans">
          <Preview>Verify Your Email Address for CollabTube</Preview>
          <Container className="mx-auto my-[20px] max-w-[465px] rounded p-[20px]">
            <Section className="flex flex-row items-center">
              <Img src="https://fonts.gstatic.com/s/e/notoemoji/16.0/1fa84/32.png" />
              <Heading className="mx-0 my-[20px] p-0 text-[24px] font-bold text-black">
                Your Magic Link
              </Heading>
            </Section>
            <Section className="">
              <Button
                className="rounded bg-[#000000] px-5 py-3 text-center text-[12px] font-semibold text-white no-underline"
                href={magicLink}
              >
                👉 Click here to sign in 👈
              </Button>
            </Section>
            <Text className="text-[14px] leading-[24px] text-black">
              Or, copy and paste this temporary login link:
            </Text>
            <Section className="rounded-md bg-gray-300 p-3">
              <Link className="underline" href={magicLink}>
                {magicLink}
              </Link>
            </Section>
            <Text className="text-[14px] leading-[24px] text-black">
              This mail is for
              <Link
                href={`mailto:${email}`}
                className="text-[14px] leading-[24px] underline"
              >
                {" "}
                {email}{" "}
              </Link>
              If you din&apos;t try to login, you can safely ignore this email.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

MagicLinkMail.PreviewProps = {
  name: "Alan Turing",
  magicLink: "https://avatars.githubusercontent.com/u/18133?v=4",
  email: "anshukrsingh11@gmail.com",
} as MagicLinkMailProps

export default MagicLinkMail
