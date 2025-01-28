import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { HeartIcon, ChatBubbleOvalLeftIcon, ShareIcon, EyeIcon } from '@heroicons/react/24/solid';

interface NewsItem {
  id: number;
  title: string;
  content: string;
}

const mockFetchNews = (page: number, limit: number): Promise<NewsItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newNews = Array.from({ length: limit }, (_, i) => {
        const id = page * limit + i + 1;
        return {
          id,
          title: `News Item ${id}`,
          content: `This is the content of news item ${id}.`,
        };
      });
      resolve(newNews);
    }, 1000); 
  });
};

const InfiniteScrollPage: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const fetchMoreNews = async () => {
    try {
      const newNews = await mockFetchNews(page, 10);
      if (newNews.length > 0) {
        setNews((prevNews) => [...prevNews, ...newNews]);
        setPage((prevPage) => prevPage + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  useEffect(() => {
    fetchMoreNews();
  });

  return (
    <div className="news-feed-container">
      <InfiniteScroll
        dataLength={news.length}
        next={fetchMoreNews}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={<p>No more news to display.</p>}
      >
        <div className="news-container">
          {news.map((item) => (
            <div key={item.id} className="news-item">
              <h2>{item.title}</h2>
              <p>{item.content}</p>
              <div className="news-item-actions">
                <button><HeartIcon /> count</button>
                <button><ChatBubbleOvalLeftIcon /> count</button>
                <button><ShareIcon /> count</button>
                <button><EyeIcon /> count</button>
              </div>
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}

export default InfiniteScrollPage;