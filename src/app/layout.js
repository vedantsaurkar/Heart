import "./globals.css";

export const metadata = {
  title: "Heart Disease Prediction",
  description: "Machine learning based heart disease prediction application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
