export async function GET() {
  return new Response(
    JSON.stringify({
      status: 'OK',
    })
  );
}
