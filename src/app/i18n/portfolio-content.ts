export type Lang = 'tr' | 'en';

export interface Education {
	school: string;
	location: string;
	period: string;
	degree?: string;
	gpa: string;
}

export interface WorkExperience {
	company: string;
	location: string;
	period: string;
	role: string;
	description: string;
	descriptionLink?: string;
	descriptionAfter?: string;
}

export interface ProjectLink {
	text: string;
	url: string;
}

export interface Project {
	title: string;
	period: string;
	stack: string;
	description: string;
	link?: ProjectLink;
	thumb?: string;
	alt?: string;
}

export interface Internship {
	company: string;
	location: string;
	period: string;
	role: string;
	description: string;
}

export interface Drawing {
	src: string;
	alt: string;
	className: string;
}

export interface PortfolioContent {
	labels: {
		role: string;
		contact: string;
		location: string;
		nav: {
			home: string;
			homeShort: string;
			projects: string;
			internships: string;
			internshipsShort: string;
			hobbies: string;
		};
		theme: {
			light: string;
			dark: string;
		};
		sections: {
			education: string;
			work: string;
			projects: string;
			internships: string;
			hobbies: string;
			technologies: string;
		};
		gpa: string;
		logoTitle: string;
		sendEmail: string;
	};
	summary: string;
	education: Education[];
	work: WorkExperience[];
	projects: Project[];
	internships: Internship[];
	drawings: Drawing[];
}

const drawings: Drawing[] = [
	{ src: 'assets/drawings/Naruto.jpg', alt: 'Naruto', className: 'naruto' },
	{ src: 'assets/drawings/Edward Elric.jpg', alt: 'Edward Elric', className: 'edward-elric' },
	{ src: 'assets/drawings/Manga 1.jpg', alt: 'Manga 1', className: 'manga-1' },
	{ src: 'assets/drawings/Manga 2.jpg', alt: 'Manga 2', className: 'manga-2' },
	{ src: 'assets/drawings/Manga 3.jpg', alt: 'Manga 3', className: 'manga-3' },
	{ src: 'assets/drawings/Horse.jpg', alt: 'Horse', className: 'horse' },
	{ src: 'assets/drawings/Ice Age.jpg', alt: 'Ice Age', className: 'ice-age' },
	{ src: 'assets/drawings/Pontiac GTC.jpg', alt: 'Pontiac GTC', className: 'pontiac-gtc' },
	{ src: 'assets/drawings/Rose.jpg', alt: 'Rose', className: 'rose' },
	{ src: 'assets/drawings/Sasuke.jpg', alt: 'Sasuke', className: 'sasuke' },
	{ src: 'assets/drawings/Wolf.jpg', alt: 'Wolf', className: 'wolf' },
	{ src: 'assets/drawings/Mazda Rx-8.jpg', alt: 'Mazda Rx-8', className: 'mazda-rx-8' },
];

export const portfolioContent: Record<Lang, PortfolioContent> = {
	tr: {
		labels: {
			role: 'Yazılım Mühendisi',
			contact: 'İletişim',
			location: 'Ankara',
			nav: {
				home: 'Hakkımda',
				homeShort: 'Hakkımda',
				projects: 'Projelerim',
				internships: 'Staj Deneyimlerim',
				internshipsShort: 'Stajlar',
				hobbies: 'Hobilerim',
			},
			theme: {
				light: 'Açık Tema',
				dark: 'Koyu Tema',
			},
			sections: {
				education: 'Eğitimim',
				work: 'İş Deneyimlerim',
				projects: 'Projelerim',
				internships: 'Staj Deneyimlerim',
				hobbies: 'Hobilerim',
				technologies: 'Kullandığım Teknolojiler',
			},
			gpa: 'GPA:',
			logoTitle: 'Doğukan Berat Karataş\'ın Kısaltması',
			sendEmail: 'E-posta Gönder',
		},
		summary: 'Angular, NestJS ve Laravel ile uçtan uca web uygulamaları geliştiriyorum — arayüzden API\'ye, veritabanından sunucu yönetimine kadar. Cubicl ve Monkedo gibi gerçek kullanıcıların her gün kullandığı ürünlerde çalışırken; boş zamanlarımda kendi fikirlerimi hayata geçirmeyi seviyorum.',
		education: [
			{
				school: 'Hacettepe Üniversitesi',
				location: 'Ankara, Türkiye',
				period: '2015 - 2020',
				degree: 'Bilgisayar Mühendisliği (%100 İngilizce)',
				gpa: '3.00',
			},
			{
				school: 'Çağrıbey Anadolu Lisesi',
				location: 'Ankara, Türkiye',
				period: '2011 - 2015',
				gpa: '88,54',
			},
		],
		work: [
			{
				company: 'Z Yazılım LTD. ŞTİ.',
				location: 'ODTÜ Teknokent, Ankara, Türkiye',
				period: '2020 - Günümüz',
				role: 'Yazılım Mühendisi',
				description: 'Şirketimin çeşitli projelerinde (Cubicl, Monkedo, Portal vs.) aktif olarak görev almaktayım. Hem arayüz, hem sunucu geliştirmelerine, hem veri tabanı yönetimi hem de sunucu bakımı ve yayınlama işlerine bakmaktayım. Görev aldığım önemli projelerin detaylarına',
				descriptionLink: 'projelerim',
				descriptionAfter: 'sekmesinden ulaşabilirsiniz.',
			},
		],
		projects: [
			{
				title: 'Cubicl İş Takip Programı',
				period: 'Ağustos 2020 - Günümüz',
				stack: 'Angular 14 - Laravel - MongoDB (mongoose)',
				description: 'Bir "Proje ve Görev Takip Programı" olan bu projede kullanıcılar tarafından bildirilen hataları çözmeye ve yeni özellikler eklemeye çalışıyorum. Ayrıca on-premise ortamında kullanan müşterilerimizin sunucularındaki güncelleme işlerine de bakıyorum. Projeyle ilgili daha fazla bilgi için',
				link: { text: 'cubicl.io', url: 'https://cubicl.io' },
				thumb: 'assets/projects/cubicl.png',
				alt: 'Cubicl | İş Takip Programı',
			},
			{
				title: 'Monkedo Kodsuz Otomasyon Programı',
				period: 'Şubat 2023 - Günümüz',
				stack: 'Angular 16 + NestJS + MongoDB (mongoose)',
				description: 'Şirketimizin yeni projesi olan bu projede başlangıç aşamasından beri görev almaktayım. Bu proje, kullanıcının herhangi bir kod yazmadan uygulamalar arası entegrasyon yapabilmesine ve otomasyon akışları oluşturabilmesine imkan sağlıyor. Projenin her alanında görev alıyorum. Projeyle ilgili daha fazla bilgi için',
				link: { text: 'monkedo.com', url: 'https://monkedo.com' },
				thumb: 'assets/projects/monkedo.png',
				alt: 'Monkedo | Kodsuz Otomasyon',
			},
			{
				title: 'Pazaryeribul.com',
				period: 'Kasım 2024 - Günümüz',
				stack: 'Angular 21 + NestJS + MongoDB (mongoose)',
				description: 'Tamamen hobi amaçlı ve kendi ihtiyacım için yapmış olduğum bir site. Sitedeki veriler normalde "Hal Kayıt" sitesinde bulunuyor ama sitenin işlevsiz olmasından kaynaklı tamamen kendi tasarımımla bu siteyi oluşturdum. Projeyle ilgili daha fazla bilgi için',
				link: { text: 'pazaryeribul.com', url: 'https://pazaryeribul.com' },
				thumb: 'assets/projects/pazaryeribul.png',
				alt: 'Pazar Yeri Sorgulama',
			},
			{
				title: 'Oto-vs',
				period: 'Aralık 2025 - Günümüz',
				stack: 'Angular 21 + NestJS + MongoDB (mongoose)',
				description: 'Sıfır araç liste fiyatlarını takip etmek ve fiyat geçmişini görmek için geliştirdiğim bir uygulama. Marka, model ve paket bazında güncel fiyatları izleyebilir, zam veya indirim dönemlerini grafikte inceleyebilir, araçları yan yana fiyat karşılaştırması yapabilirsiniz.',
				link: { text: 'oto-vs.com', url: 'https://oto-vs.com' },
				thumb: 'assets/projects/oto-vs.png',
				alt: 'Oto-vs',
			},
			{
				title: 'Kolay Pazar',
				period: '2026 - Günümüz',
				stack: 'Angular 21 + NestJS + MongoDB (mongoose)',
				description: 'Marketlerdeki aktüel ürünleri tek yerden takip etmek için geliştirdiğim bir site. Farklı marketlerin güncel fırsat ve aktüel kataloglarını bir araya getirerek hangi ürünün nerede kampanyada olduğunu hızlıca görmeyi amaçlıyor.',
				link: { text: 'kolay-pazar.store', url: 'https://kolay-pazar.store' },
				thumb: 'assets/projects/kolay-pazar.png',
				alt: 'Kolay Pazar',
			},
			{
				title: 'HUBBM Not Paylaşım',
				period: 'Şubat 2019 - Ocak 2026',
				stack: 'Angular 16',
				description: 'Öğrencilik yıllarımda aldığım notları açmış olduğum bir blog sitesinde paylaşıyordum. Bu içerikleri kendi oluşturduğum bir alan adına taşımak istedim ve tasarımıyla birlikte yeni bir site oluşturdum:',
				link: { text: 'hubbm-not-paylasim.dev', url: 'https://hubbm-not-paylasim.dev' },
				thumb: 'assets/projects/hubbm-not-paylasim.png',
				alt: 'HUBBM Not Paylaşım',
			},
			{
				title: 'Proje Yönetimi İçin Doğal Dil İşleme Tabanlı Sanal Asistan',
				period: 'Ocak 2021 - Aralık 2022',
				stack: 'Angular 8 + Flask (Python) + SpaCy (Python)',
				description: 'Cubicl Proje ve Görev Takip projemiz içerisinden kullanıcıların günlük rutin olarak yaptığı işleri otomatize etmek amacıyla geliştirdiğimiz bir sanal asistan. Kullanıcılar, sanal asistana yazılı olarak isteklerini iletebilmektedir. Sanal asistan, kullanıcının isteğini anlayıp, gerekli işlemleri yapmaktadır.',
			},
			{
				title: 'Talaşlı İmalat Sektöründe Algoritma Temelli Üretim Planlaması Web Uygulaması',
				period: 'Ağustos 2020 - Aralık 2021',
				stack: 'Angular 8 + NestJS + MongoDB (mongoose)',
				description: 'Bu proje kısaca bir Talaşlı İmalat Fabrikasında bir ürünün stok takibinden üretim aşamalarının tanımlanmasına, ürün bazında gerekli çalışan ve makinelerin belirlenmesinden en optimum üretim planmasını yapmaya kadar geçen süreci otomatize etmek amacıyla geliştirilen bir projedir.',
				thumb: 'assets/projects/uretim-planlamasi-1507.png',
				alt: 'Üretim Planlama Programı',
			},
			{
				title: 'Evcil Hayvan Sahiplendirme Projesi (Web Uygulaması)',
				period: 'Eylül 2019 - Haziran 2020',
				stack: 'React + Spring Boot + MySQL + Hibernate',
				description: '2 arkadaşımla birlikte Bitirme projesi için geliştirdiğimiz bir platform. Hem kullanıcıların hem de barınakların bir çatı altında buluştuğu bir platform yapmaya çalıştık.',
			},
			{
				title: 'Evcil Hayvan Sahiplendirme Projesi (Mobil Uygulama)',
				period: 'Şubat 2020 - Haziran 2020',
				stack: 'React Native(Expo) + Spring Boot + MySQL + Hibernate',
				description: 'Bitirme projemizin mobil uygulaması. Web sitemizi kullanan kullanıcılar ve barınaklara daha iyi bir deneyim sunabilmek için geliştirdiğimiz bir proje oldu.',
			},
			{
				title: 'Elektronik Ticaret Sitesi Projesi (Prototip)',
				period: 'Şubat 2019 - Haziran 2019',
				stack: 'React + Spring Boot + Postgresql + Hibernate',
				description: 'Üniversite 3. sınıfta, 5 kişilik bir arkadaş grubuyla amatör de olsa bir "Elektronik Ticaret Sitesi" kurma fikriyle geliştirdiğimiz bir proje. Bu proje bir ekip içinde herkesin farklı görevlerinin olduğu ve fikir alışverişinde bulunabildiğim ilk büyük web projem oldu.',
			},
		],
		internships: [
			{
				company: 'İnnova Bilişim Çözümleri',
				location: 'ODTÜ Teknokent, Ankara, Türkiye',
				period: '08-2019 - 09-2019',
				role: 'Web Stajyeri',
				description: 'Bu stajımda Vodafone için geliştirilen bir Sistem Yönetimi web uygulamasında görev aldım. Sunucuda Spring Boot kullanıyorduk. Zaten öncesinden bu teknolojiye aşinaydım. Arayüzde ise Angular kullanıyorduk.',
			},
			{
				company: 'OBSS Teknoloji A.Ş',
				location: 'İstanbul Teknopark, İstanbul, Türkiye',
				period: '07-2019 - 08-2019',
				role: 'Web Stajyeri',
				description: 'Bu stajımda Java teknolojileri üzerine çalışmalarda bulundum. Zaten bu alanda kendimi geliştirmek istediğim için oldukça yararlı bir stajdı. Java SE\'nin yanı sıra Java EE\'nı ve bununla birlikte Spring Framework\'ü ile çalışma, proje geliştirme fırsatım oldu.',
			},
			{
				company: 'Türk Telekom A.Ş',
				location: 'Ankara, Türkiye',
				period: '06-2018 - 08-2018',
				role: 'Ağ Yönetim Sistemleri Stajyeri',
				description: 'Yaz stajımı Türk Telekom\'da yaptım. Türk Telekom, elektronik ve haberleşmede lider şirketlerden biridir. Staj sürem boyunca "Ağ Yönetim Sistemleri" bölümünde çalıştım. Staj sırasında Türkiye\'nin Ağ Altyapısı ve Ağ Protokolleri hakkında bilgi edinmiş oldum.',
			},
		],
		drawings,
	},
	en: {
		labels: {
			role: 'Software Engineer',
			contact: 'Contact',
			location: 'Ankara',
			nav: {
				home: 'About Me',
				homeShort: 'About',
				projects: 'Projects',
				internships: 'Internships',
				internshipsShort: 'Internships',
				hobbies: 'Hobbies',
			},
			theme: {
				light: 'Light Theme',
				dark: 'Dark Theme',
			},
			sections: {
				education: 'Education',
				work: 'Work Experience',
				projects: 'Projects',
				internships: 'Internships',
				hobbies: 'Hobbies',
				technologies: 'Technologies I Use',
			},
			gpa: 'GPA:',
			logoTitle: 'Abbreviation of Doğukan Berat Karataş',
			sendEmail: 'Send Email',
		},
		summary: 'I build full-stack web applications with Angular, NestJS, and Laravel — from UI and APIs to databases and deployment. I work on products people use every day, like Cubicl and Monkedo, and enjoy turning my own ideas into side projects in my spare time.',
		education: [
			{
				school: 'Hacettepe University',
				location: 'Ankara, Turkey',
				period: '2015 - 2020',
				degree: 'Computer Engineering (100% English)',
				gpa: '3.00',
			},
			{
				school: 'Çağrıbey Anatolian High School',
				location: 'Ankara, Turkey',
				period: '2011 - 2015',
				gpa: '88.54',
			},
		],
		work: [
			{
				company: 'Z Software Ltd.',
				location: 'METU Technopolis, Ankara, Turkey',
				period: '2020 - Present',
				role: 'Software Engineer',
				description: 'I actively contribute to various company projects (Cubicl, Monkedo, Portal, etc.). I handle frontend and backend development, database management, as well as server maintenance and deployment. You can find details of the major projects I work on in the',
				descriptionLink: 'projects',
				descriptionAfter: 'tab.',
			},
		],
		projects: [
			{
				title: 'Cubicl Task Management Software',
				period: 'August 2020 - Present',
				stack: 'Angular 14 - Laravel - MongoDB (mongoose)',
				description: 'In this project and task management application, I fix bugs reported by users and add new features. I also handle update operations on servers for on-premise customers. For more information, visit',
				link: { text: 'cubicl.io', url: 'https://cubicl.io' },
				thumb: 'assets/projects/cubicl.png',
				alt: 'Cubicl | Task Management',
			},
			{
				title: 'Monkedo No-Code Automation Platform',
				period: 'February 2023 - Present',
				stack: 'Angular 16 + NestJS + MongoDB (mongoose)',
				description: 'I have been involved in this new company project since its early stages. It enables users to integrate applications and build automation flows without writing code. I work across all areas of the project. For more information, visit',
				link: { text: 'monkedo.com', url: 'https://monkedo.com' },
				thumb: 'assets/projects/monkedo.png',
				alt: 'Monkedo | No-Code Automation',
			},
			{
				title: 'Pazaryeribul.com',
				period: 'November 2024 - Present',
				stack: 'Angular 21 + NestJS + MongoDB (mongoose)',
				description: 'A hobby project I built for my own needs. The data is normally on the official "Hal Kayıt" site, but I created this site with my own design due to usability issues. For more information, visit',
				link: { text: 'pazaryeribul.com', url: 'https://pazaryeribul.com' },
				thumb: 'assets/projects/pazaryeribul.png',
				alt: 'Marketplace Lookup',
			},
			{
				title: 'Oto-vs',
				period: 'December 2025 - Present',
				stack: 'Angular 21 + NestJS + MongoDB (mongoose)',
				description: 'An application I developed to track new car list prices and view price history. You can monitor current prices by brand, model, and trim, review price changes on charts, and compare vehicles side by side.',
				link: { text: 'oto-vs.com', url: 'https://oto-vs.com' },
				thumb: 'assets/projects/oto-vs.png',
				alt: 'Oto-vs',
			},
			{
				title: 'Kolay Pazar',
				period: '2026 - Present',
				stack: 'Angular 21 + NestJS + MongoDB (mongoose)',
				description: 'A site I built to track promotional products from supermarkets in one place. It aggregates current deals and catalogs from different stores so you can quickly see which product is on sale where.',
				link: { text: 'kolay-pazar.store', url: 'https://kolay-pazar.store' },
				thumb: 'assets/projects/kolay-pazar.png',
				alt: 'Kolay Pazar',
			},
			{
				title: 'HUBBM Notes Sharing',
				period: 'February 2019 - January 2026',
				stack: 'Angular 16',
				description: 'During my student years, I shared my class notes on a blog I opened. I wanted to move this content to my own domain and built a new site with a fresh design:',
				link: { text: 'hubbm-not-paylasim.dev', url: 'https://hubbm-not-paylasim.dev' },
				thumb: 'assets/projects/hubbm-not-paylasim.png',
				alt: 'HUBBM Notes Sharing',
			},
			{
				title: 'NLP-Based Virtual Assistant for Project Management',
				period: 'January 2021 - December 2022',
				stack: 'Angular 8 + Flask (Python) + SpaCy (Python)',
				description: 'A virtual assistant we developed within the Cubicl project to automate users\' daily routine tasks. Users can send written requests to the assistant, which understands the intent and performs the required actions.',
			},
			{
				title: 'Algorithm-Based Production Planning Web App for Machining Industry',
				period: 'August 2020 - December 2021',
				stack: 'Angular 8 + NestJS + MongoDB (mongoose)',
				description: 'This project automates the process in a machining factory — from inventory tracking and defining production stages to determining required workers and machines, and creating optimal production plans.',
				thumb: 'assets/projects/uretim-planlamasi-1507.png',
				alt: 'Production Planning Application',
			},
			{
				title: 'Pet Adoption Project (Web Application)',
				period: 'September 2019 - June 2020',
				stack: 'React + Spring Boot + MySQL + Hibernate',
				description: 'A platform we developed with two friends as our graduation project. We aimed to bring users and shelters together under one roof.',
			},
			{
				title: 'Pet Adoption Project (Mobile Application)',
				period: 'February 2020 - June 2020',
				stack: 'React Native (Expo) + Spring Boot + MySQL + Hibernate',
				description: 'The mobile app for our graduation project, built to provide a better experience for users and shelters using our website.',
			},
			{
				title: 'E-Commerce Site Project (Prototype)',
				period: 'February 2019 - June 2019',
				stack: 'React + Spring Boot + PostgreSQL + Hibernate',
				description: 'In my third year at university, our group of five developed this project with the idea of building an e-commerce site. It was my first large web project where everyone had different roles and we exchanged ideas as a team.',
			},
		],
		internships: [
			{
				company: 'Innova Information Solutions',
				location: 'METU Technopolis, Ankara, Turkey',
				period: '08-2019 - 09-2019',
				role: 'Web Intern',
				description: 'During this internship, I worked on a system management web application developed for Vodafone. We used Spring Boot on the server side, which I was already familiar with, and Angular on the frontend.',
			},
			{
				company: 'OBSS Technology Inc.',
				location: 'Istanbul Technopark, Istanbul, Turkey',
				period: '07-2019 - 08-2019',
				role: 'Web Intern',
				description: 'I worked on Java technologies during this internship. It was very valuable since I wanted to improve in this area. I had the opportunity to work with Java SE, Java EE, and the Spring Framework.',
			},
			{
				company: 'Türk Telekom Inc.',
				location: 'Ankara, Turkey',
				period: '06-2018 - 08-2018',
				role: 'Network Management Systems Intern',
				description: 'I completed my summer internship at Türk Telekom, one of the leading companies in electronics and telecommunications. I worked in the Network Management Systems department and learned about Turkey\'s network infrastructure and protocols.',
			},
		],
		drawings,
	},
};
