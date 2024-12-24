import Skeleton from "./Skeleton";

export default function PostsSkeleton() {
  const times = [1, 2, 3, 4, 5, 6];

  return times.map((time) => (
    <div key={time}>
      <div className="skeleton skeleton-text-small mt-6"></div>
      <div className="mt-4">
        <Skeleton />
      </div>
    </div>
  ));
}
