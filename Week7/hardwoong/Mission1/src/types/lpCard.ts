export type LpCardProps = {
  id: number;
  title: string;
  thumbnail: string;
  createdAt: Date;
  likes: { id: number; userId: number; lpId: number }[]; // 또는 likes: any[] 가능
};