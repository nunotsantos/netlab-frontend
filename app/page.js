'use client';
import { useEffect, useState } from 'react';
import { getPosts } from '../lib/wordpress';

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postsData = await getPosts();
        setPosts(postsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="p-4">Carregando...</div>;
  if (error) return <div className="p-4 text-red-500">Erro: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">NetLab - Teste de API</h1>
      
      <div className="bg-blue-100 p-4 rounded mb-4">
        <h2 className="text-xl font-semibold">Informações de Debug:</h2>
        <p>URL da API: {process.env.NEXT_PUBLIC_WORDPRESS_API_URL}</p>
        <p>Posts encontrados: {posts.length}</p>
      </div>

      {posts.length === 0 ? (
        <div className="bg-yellow-100 p-4 rounded">
          <h2 className="text-xl font-semibold">Nenhum post encontrado</h2>
          <p>Isso pode ser devido a:</p>
          <ul className="list-disc list-inside ml-4">
            <li>Problema de CORS no WordPress</li>
            <li>Erro 500 no servidor WordPress</li>
            <li>Não há posts publicados</li>
          </ul>
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Últimos Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map(post => (
              <article key={post.id} className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2">
                  {post.title.rendered}
                </h3>
                <div 
                  className="text-gray-600"
                  dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} 
                />
              </article>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}