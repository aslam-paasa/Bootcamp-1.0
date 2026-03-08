/**
 * Server Component:
 * > Fetching and displaying backend data.
*/

export default async function Home() {
 
  const res = await fetch('http://localhost:3000/api/fetch-user');
  const data = await res.json();
  
  return (
    <div>
      <p>
        {JSON.stringify(data)}
      </p>
    </div>
  );
}