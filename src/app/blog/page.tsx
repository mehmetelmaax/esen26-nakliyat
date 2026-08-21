import React from 'react';
import type { Metadata } from 'next';
import { blogMetadata } from '@/lib/blog-metadata';
import Breadcrumb from '@/components/Breadcrumb';
import BlogClient from './BlogClient';

export const metadata: Metadata = {
  title: 'Lojistik İpuçları ve Blog | Esen 26 Nakliyat',
  description: "Eskişehir'de ev taşırken dikkat edilmesi gerekenler, nakliye fiyatları, paketleme rehberleri ve asansörlü taşıma hakkında lojistik tavsiyeleri.",
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'Lojistik İpuçları ve Blog | Esen 26 Nakliyat',
    description: 'Eskişehir',
    url: '/blog',
    type: 'article',
    modifiedTime: '2026-08-21T08:00:00+03:00',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Lojistik İpuçları ve Blog | Esen 26 Nakliyat' }],
  },
};

const posts = Object.values(blogMetadata);

export default function BlogPage() {
  return (
    <>
      <main className="pt-24 bg-off-white">
        <Breadcrumb items={[{ name: 'Blog', url: '/blog' }]} className="pt-4" emitSchema />
        {/* Intro */}
        <section className="py-16 bg-navy text-white text-center space-y-4">
          <span className="text-orange-text font-bold text-xs tracking-widest font-sans">
            FAYDALI BİLGİLER
          </span>
          <h1 className="font-display font-black text-3xl md:text-5xl tracking-tight leading-tight">
            Lojistik & Nakliye Blogu
          </h1>
          <p className="text-gray-300 text-sm md:text-base max-w-xl mx-auto">
            Taşınma sürecinizi kolaylaştıracak pratik ipuçları ve güncel maliyet incelemeleri.
          </p>
        </section>

        {/* Blog Listing with Client Filters & Pagination */}
        <section className="py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <BlogClient posts={posts} />
        </section>
        {/* Visually hidden list of all blog posts for search engine crawler indexing */}
        <div className="sr-only" aria-hidden="true">
          <h2>Tüm Blog Yazılarımız</h2>
          <ul>
            {posts.map((post) => (
              <li key={post.id}>
                <a href={`/blog/${post.id}`}>{post.title}</a>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
}
