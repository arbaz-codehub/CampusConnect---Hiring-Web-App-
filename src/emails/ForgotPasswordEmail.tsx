import React from "react";
import { Button, Heading, Hr, Html, Text } from "@react-email/components";

export default function ForgotPasswordEmail({
  params,
}: {
  params: { name: string; url: string };
}) {
  return (
    <Html>
      <Heading as="h2">Hello {params.name}</Heading>
      <Text>
        We received the reset password request. If it's not from you then pls
        ignore it.
      </Text>
      <Button
        style={{ background: "#000", color: "#fff", padding: "16px 20px" }}
        href={params.url}
      >
        Reset Password
      </Button>
      <Hr />
      <Heading as="h3">Regards</Heading>
      <Text>CampusConnect Team</Text>
    </Html>
  );
}
