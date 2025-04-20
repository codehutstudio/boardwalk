export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Admin Dashboard</title>
      </head>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}