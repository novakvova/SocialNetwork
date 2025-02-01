import React, { useState } from 'react';
import { useSearchUsersQuery, useSearchGroupsQuery, useSearchPostsQuery } from '../services/apiSearch';

const Search: React.FC = () => {
    const [query, setQuery] = useState('');
    const [isSearched, setIsSearched] = useState(true);

    const { data: usersData, isLoading: usersLoading } = useSearchUsersQuery(query);
    const { data: groupsData, isLoading: groupsLoading } = useSearchGroupsQuery(query);
    const { data: postsData, isLoading: postsLoading } = useSearchPostsQuery(query);

    const users = usersData ?? [];
    const groups = groupsData ?? [];
    const posts = postsData ?? [];

    const handleSearch = () => {
        if (query.trim().length >= 1) {
            setIsSearched(true);
            console.log(query);
        }
    };

    console.log("Users Data:", usersData);
    console.log("Groups Data:", groupsData);
    console.log("Posts Data:", postsData);
    console.log("Query:", query);

    return (
        <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg">
            <div className="flex items-center space-x-4 mb-6">
                <input
                    type="text"
                    placeholder="Введіть запит для пошуку..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={handleSearch}
                    className="p-3 bg-blue-500 text-white rounded-lg focus:outline-none hover:bg-blue-600"
                >
                    Пошук
                </button>
            </div>
            {isSearched && query.length >= 1 && (
            <div className="space-y-6">
                {(usersLoading || groupsLoading || postsLoading) && (
                    <p className="text-gray-500 text-center">Завантаження...</p>
                )}

                {!usersLoading && users.length > 0 && (
                    <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Користувачі</h3>
                        <div className="space-y-2">
                            {users.map((user) => (
                                <div
                                    key={user.id}
                                    className="p-3 border rounded-md cursor-pointer bg-white hover:bg-blue-100 transition"
                                >
                                    {user.username}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {!groupsLoading && groups.length > 0 && (
                    <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Групи</h3>
                        <div className="space-y-2">
                            {groups.map((group) => (
                                <div
                                    key={group.id}
                                    className="p-3 border rounded-md cursor-pointer bg-white hover:bg-blue-100 transition"
                                >
                                    {group.name}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {!postsLoading && posts.length > 0 && (
                    <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Пости</h3>
                        <div className="space-y-2">
                            {posts.map((post) => (
                                <div
                                    key={post.id}
                                    className="p-3 border rounded-md cursor-pointer bg-white hover:bg-blue-100 transition"
                                >
                                    {post.title}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {!usersLoading && !groupsLoading && !postsLoading &&
                    users.length === 0 && groups.length === 0 && posts.length === 0 && (
                        <p className="text-gray-500 text-center">Нічого не знайдено</p>
                )}
            </div>
            )}
        </div>
    );
};

export default Search;
