import React, { useState } from 'react';
import { useSearchQuery } from '../services/apiSearch';

const Search: React.FC = () => {
    const [query, setQuery] = useState('');
    const { data, error, isLoading } = useSearchQuery(query, { skip: query.length < 1 });

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <input
                type="text"
                placeholder="Введіть запит для пошуку..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {isLoading && <p className="text-gray-500 mt-2 text-center">Завантаження...</p>}
            {error && <p className="text-red-500 mt-2 text-center">Помилка завантаження. Спробуйте ще раз.</p>}
            {data && (data.users.length || data.groups.length || data.posts.length) ? (
                <div className="mt-4">
                    {data.users.length > 0 && (
                        <div>
                            <h3 className="text-lg font-semibold border-b pb-1">Користувачі</h3>
                            <ul className="list-disc pl-5">
                                {data.users.map(user => <li key={user.id} className="py-1">{user.username}</li>)}
                            </ul>
                        </div>
                    )}
                    {data.groups.length > 0 && (
                        <div className="mt-4">
                            <h3 className="text-lg font-semibold border-b pb-1">Групи</h3>
                            <ul className="list-disc pl-5">
                                {data.groups.map(group => <li key={group.id} className="py-1">{group.name}</li>)}
                            </ul>
                        </div>
                    )}
                    {data.posts.length > 0 && (
                        <div className="mt-4">
                            <h3 className="text-lg font-semibold border-b pb-1">Пости</h3>
                            <ul className="list-disc pl-5">
                                {data.posts.map(post => <li key={post.id} className="py-1">{post.content}</li>)}
                            </ul>
                        </div>
                    )}
                </div>
            ) : (
                query.length >= 3 && <p className="text-gray-500 mt-2 text-center">Нічого не знайдено</p>
            )}
        </div>
    );
};

export default Search;
