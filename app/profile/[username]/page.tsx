type Params = { params: { username: string } };

export default function ProfilePage({ params }: Params) {
  const { username } = params;
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">{username}</h1>
      <p className="text-muted-foreground mt-2">
        Badges, streaks, and submissions coming soon.
      </p>
    </div>
  );
}
