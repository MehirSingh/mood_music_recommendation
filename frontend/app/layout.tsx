export const metadata = {
  title: 'Mood Music Recommendation',
  description: 'Frontend deployed on Vercel',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
