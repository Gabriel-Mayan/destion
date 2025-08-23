import React from "react";
import { Box, Container } from "@mui/material";

import BaseText from "@components/Bases/Elements/BaseText";
import BaseLink from "@components/Bases/Elements/BaseLink";

const privacyPolicyContent = {
  title: "Privacy Policy",
  sections: [
    {
      heading: "1. Introduction",
      text: "Destion values your privacy and is committed to protecting your personal information. This policy explains how we collect, use, and safeguard your data when using our chat app.",
    },
    {
      heading: "2. Data Collected",
      text: "We may collect information such as your name, email, IP address, and usage data when you interact with Destion. This information is used to improve your experience and provide our services.",
    },
    {
      heading: "3. Use of Data",
      text: "Your data is used to:",
      list: [
        "Provide and improve our chat services.",
        "Personalize your experience.",
        "Send important communications, such as updates and notifications.",
      ],
    },
    {
      heading: "4. Data Sharing",
      text: "We do not share your personal information with third parties, except when necessary to provide our services or when required by law.",
    },
    {
      heading: "5. Data Security",
      text: "We implement security measures to protect your data from unauthorized access, alteration, or destruction. However, no system is 100% secure, and we cannot guarantee absolute security.",
    },
    {
      heading: "6. Your Rights",
      text: "You have the right to:",
      list: ["Access and correct your personal data.", "Request deletion of your data.", "Revoke consent for the use of your data."],
      contactText: "To exercise these rights, contact us via email at ",
      contactEmail: "gabrielmayan@gmail.com",
    },
    {
      heading: "7. Cookies and Similar Technologies",
      text: "We use cookies and similar technologies to enhance your experience. You can manage your cookie preferences in your browser settings.",
    },
    {
      heading: "8. Changes to the Policy",
      text: "We reserve the right to modify this policy at any time. Significant changes will be communicated via email or through our official channels.",
    },
    {
      heading: "9. Contact",
      text: "If you have any questions regarding this policy, contact us via email at ",
      contactEmail: "gabrielmayan@gmail.com",
    },
  ],
};

export default function PrivacyPolicyPage() {
  return (
    <Container sx={{ py: 4, display: "flex", flexDirection: "column", alignItems: "center" }}>
      <BaseText
        variant="h4"
        font="raleway"
        text={privacyPolicyContent.title}
        sx={{ textAlign: "center", fontWeight: 600, color: "primary.main", mb: 4 }}
      />

      <Box sx={{ mt: 4 }}>
        {privacyPolicyContent.sections.map((section, index) => (
          <Box key={index} sx={{ mb: 4 }}>
            <BaseText variant="h6" font="raleway" text={section.heading} sx={{ fontWeight: 600, color: "primary.main", mb: 2 }} />
            <BaseText sx={{ mb: section.list ? 2 : 4 }} text={section.text} />
            {section.list && (
              <Box component="ul" sx={{ pl: 4, mb: 4 }}>
                {section.list.map((item, liIndex) => (
                  <BaseText component="li" key={liIndex} text={item} sx={{ mb: 1 }} />
                ))}
              </Box>
            )}
            {section.contactEmail && (
              <BaseText sx={{ mb: 4 }}>
                {section.contactText || ""}
                <BaseLink href={`mailto:${section.contactEmail}`} text={section.contactEmail} sx={{ color: "primary" }} />
              </BaseText>
            )}
          </Box>
        ))}
      </Box>
    </Container>
  );
}
