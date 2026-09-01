export default function sitemap() {
return [
    {
        url: 'https://omar-dev.site', // رابط موقعك الرئيسي
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 1,
    },
    // لو عندك صفحات تانية ضيفها بنفس الطريقة
    // {
    //   url: 'https://omar-dev.site/projects',
    //   lastModified: new Date(),
    //   changeFrequency: 'weekly',
    //   priority: 0.8,
    // },
]
}