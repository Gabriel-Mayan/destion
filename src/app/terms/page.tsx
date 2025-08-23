import React from "react";
import { Box, Container } from "@mui/material";

import BaseText from "@components/Bases/Elements/BaseText";
import BaseLink from "@components/Bases/Elements/BaseLink";

const termsContent = {
  title: "Terms of Service",
  sections: [
    {
      heading: "1. Introduction",
      text: "Welcome to the Destion Terms of Service. By using our chat app, you agree to these terms. Please read them carefully before proceeding.",
    },
    {
      heading: "2. Use of Services",
      text: "Our services include messaging, group chats, and communication tools. You agree to use Destion only for lawful purposes and in accordance with these terms.",
    },
    {
      heading: "3. User Responsibilities",
      text: "You are responsible for all activities performed using your account. Do not share your login credentials and notify us immediately if unauthorized access occurs.",
    },
    {
      heading: "4. Privacy and Data",
      text: "We respect your privacy. All data collected is handled according to our ",
      linkText: "Privacy Policy",
      linkHref: "/privacy",
    },
    {
      heading: "5. Intellectual Property",
      text: "All content and software developed by Destion are protected by copyright and may not be reproduced without prior authorization.",
    },
    {
      heading: "6. Limitation of Liability",
      text: "Destion is not responsible for indirect, incidental, or consequential damages resulting from the use or inability to use our services.",
    },
    {
      heading: "7. Changes to the Terms",
      text: "We reserve the right to modify these terms at any time. Significant changes will be communicated via email or through our official channels.",
    },
    {
      heading: "8. Contact",
      text: "If you have any questions regarding these terms, contact us via email at ",
      contactEmail: "gabrielmayan@gmail.com",
    },
  ],
};

export default function ServicesTermsPage() {
  return (
    <Container sx={{ py: 4, display: "flex", flexDirection: "column", alignItems: "center" }}>
      <BaseText variant="h4" font="raleway" text={termsContent.title} sx={{ textAlign: "center", fontWeight: 600, color: "primary.main", mb: 4 }} />

      <Box sx={{ mt: 4 }}>
        {termsContent.sections.map((section, index) => (
          <Box key={index} sx={{ mb: 4 }}>
            <BaseText variant="h6" font="raleway" text={section.heading} sx={{ fontWeight: 600, color: "primary.main", mb: 2 }} />
            <BaseText sx={{ mb: 2 }} text={section.text} />
            {section.linkText && section.linkHref && <BaseLink href={section.linkHref} text={section.linkText} sx={{ color: "primary" }} />}
            {section.contactEmail && <BaseLink href={`mailto:${section.contactEmail}`} text={section.contactEmail} sx={{ color: "primary" }} />}
          </Box>
        ))}
      </Box>
    </Container>
  );
}
