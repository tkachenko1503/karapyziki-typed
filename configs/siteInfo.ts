export const siteInfo = {
    email: 'flydancer@rambler.ru',
    baseurl: process.env.NODE_ENV !== 'production' ? 'http://localhost:3000/' : process.env.SERVER_URL,
    paginate: 7,
    paginate_path: 'blog/page/',
    title: 'Karapyziki',
    description: '',
    default_img: '',
    name: 'karapyziki',
    profile_img: '/assets/img/k-logo.png',
    profile: `
        Привет, меня зовут Аннета и это мой блог.
        Здесь я пишу о ветре в волосах, душе нараспашку, закатах у моря,
        поменявшем меня, материнстве, любви, добре, вере, о людях, мыслях, воспоминаниях...
        Это просто мысли вслух, просто буквы, сложенные в строчки,
        разложенные по полочкам, - приссоединяйся, поразмышляем вместе.`,
    socials: [
        {icon: 'vk', link: 'https://vk.com/manneta'},
        {icon: 'facebook', link: 'https://www.facebook.com/anneta.tkachenko.9'},
        {icon: 'instagram', link: 'https://www.instagram.com/karapyziki/'}
    ]
};
