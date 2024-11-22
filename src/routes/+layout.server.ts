export async function load({ setHeaders }) {
	setHeaders({ 'Cache-Control': 'max-age=7200, stale-while-revalidate=3600' });
}
