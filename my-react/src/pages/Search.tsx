import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLazySearchQuery, useGetRecommendationsQuery } from "../services/apiUser";
import { Input } from 'antd';

const { Search } = Input

const SearchPage: React.FC = () => {
    const [query, setQuery] = useState("");
    const [triggerSearch, { data: searchResults, isLoading: isSearching }] = useLazySearchQuery();
    const { data: recommendations, isLoading: isLoadingRecommendations } = useGetRecommendationsQuery();
    const navigate = useNavigate();

    const handleSearch = () => {
        if (query.trim()) {
            triggerSearch(query);
        }
    };

    return (
        <div className="container mx-auto p-4 max-w-2xl">
            <div className="bg-white text-gray-800 rounded-lg shadow p-6">
                <h1 className="text-2xl font-bold mb-4 text-center">Пошук</h1>

                <div className="relative mb-4">
                    <Search
                        placeholder="Пошук користувачів, груп, або постів..."
                        allowClear
                        enterButton="Пошук"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        size="large"
                        onSearch={handleSearch}
                    />
                </div>

                <div className="mb-6">
                    <h2 className="text-lg font-semibold mb-2">Результат</h2>
                    {isSearching ? (
                        <p className="text-gray-500">Завантаження...</p>
                    ) : (
                        <ul className="space-y-2">
                            {searchResults?.length ? (
                                searchResults.map((result: any, index: number) => (
                                    <li
                                        key={index}
                                        className="border border-gray-300 p-3 rounded-lg hover:bg-gray-100 transition"
                                    >
                                        <span className="font-bold text-blue-500">{result.type}:</span> {result.name}
                                    </li>
                                ))
                            ) : (
                                <p className="text-gray-500">Нічого не знайдено</p>
                            )}
                        </ul>
                    )}
                </div>

                <div className="mb-6">
                    <h2 className="text-lg font-semibold mb-2">Рекомендації</h2>
                    {isLoadingRecommendations ? (
                        <p className="text-gray-500">Завантаження...</p>
                    ) : (
                        <ul className="space-y-2">
                            {recommendations?.length ? (
                                recommendations.map((rec: string, index: number) => (
                                    <li
                                        key={index}
                                        className="border border-gray-300 p-3 rounded-lg hover:bg-gray-100 transition"
                                    >
                                        {rec}
                                    </li>
                                ))
                            ) : (
                                <p className="text-gray-500">Рекомендації відсутні.</p>
                            )}
                        </ul>
                    )}
                </div>

                <div className="text-center">
                    <button
                        className="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 focus:ring-2 focus:ring-gray-400"
                        onClick={() => navigate(-1)}
                    >
                        Назад
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SearchPage;
