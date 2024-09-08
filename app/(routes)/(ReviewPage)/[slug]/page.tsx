export default function ReviewPage({ params }: { params: { "slug": string } }) {
  return (
    <div>{params.slug}</div>
  );
}

