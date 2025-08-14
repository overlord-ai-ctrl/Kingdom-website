type PageProps = {
  params: Promise<{ username: string }>;
};

export default async function ProfilePage({ params }: PageProps) {
  const { username } = await params;
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">{username}</h1>
      <p className="text-muted-foreground mt-2">
        Badges, streaks, and submissions coming soon.
      </p>
    </div>
  );
}
